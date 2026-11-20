import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildArticleSharePayload,
  resolveAuthorUrn,
  shareArticleOnLinkedIn,
  validAuthorUrn,
} from "../linkedin";

const LINKEDIN_AUTHOR_PATTERN = /^(urn:li:person:[A-Za-z0-9_-]*[A-Za-z_-][A-Za-z0-9_-]*|urn:li:organization:\d+)$/;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("validAuthorUrn", () => {
  it("rejects the numeric member ID used as a person ID (the 422 cause)", () => {
    expect(validAuthorUrn("urn:li:person:270328370")).toBeNull();
    expect(validAuthorUrn('"urn:li:person:270328370"')).toBeNull();
  });

  it("accepts an alphanumeric person ID and organization URNs", () => {
    expect(validAuthorUrn("urn:li:person:782bbtaQ")).toBe("urn:li:person:782bbtaQ");
    expect(validAuthorUrn(' "urn:li:person:5abc_dEfgH" ')).toBe("urn:li:person:5abc_dEfgH");
    expect(validAuthorUrn("urn:li:organization:5515715")).toBe("urn:li:organization:5515715");
  });

  it("rejects missing or malformed values", () => {
    expect(validAuthorUrn(undefined)).toBeNull();
    expect(validAuthorUrn("")).toBeNull();
    expect(validAuthorUrn("270328370")).toBeNull();
    expect(validAuthorUrn("urn:li:company:abc")).toBeNull();
  });
});

describe("resolveAuthorUrn", () => {
  it("falls back to /v2/userinfo `sub` when the configured URN is numeric", async () => {
    const fetchMock = vi.fn(async () => Response.json({ sub: "782bbtaQ" }));
    vi.stubGlobal("fetch", fetchMock);

    const urn = await resolveAuthorUrn("token", "urn:li:person:270328370");

    expect(urn).toBe("urn:li:person:782bbtaQ");
    expect(urn).toMatch(LINKEDIN_AUTHOR_PATTERN);
    expect(fetchMock).toHaveBeenCalledWith("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: "Bearer token" },
    });
  });

  it("does not call the API when the configured URN is valid", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    expect(await resolveAuthorUrn("token", "urn:li:person:782bbtaQ")).toBe("urn:li:person:782bbtaQ");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("explains how to fix the env var when userinfo fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("forbidden", { status: 403 })));
    await expect(resolveAuthorUrn("token", undefined)).rejects.toThrow(/LINKEDIN_AUTHOR_URN/);
  });
});

describe("shareArticleOnLinkedIn", () => {
  const article = {
    text: "Nuevo artículo",
    url: "https://camilopinzon.dev/es/blog/x",
    title: "Título",
    description: "Resumen",
    thumbnailUrl: "https://res.cloudinary.com/x.png",
  };

  it("posts the resolved author to /v2/ugcPosts and returns the post id", async () => {
    const fetchMock = vi.fn(async (_url: string, _init: RequestInit) =>
      Response.json({ id: "urn:li:share:1" }, { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const id = await shareArticleOnLinkedIn("token", "urn:li:person:782bbtaQ", article);

    expect(id).toBe("urn:li:share:1");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.linkedin.com/v2/ugcPosts");
    expect(init.headers).toMatchObject({ "X-Restli-Protocol-Version": "2.0.0" });
    const body = JSON.parse(String(init.body));
    expect(body).toEqual(buildArticleSharePayload("urn:li:person:782bbtaQ", article));
    expect(body.author).toMatch(LINKEDIN_AUTHOR_PATTERN);
  });

  it("falls back to the x-restli-id header", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 201, headers: { "x-restli-id": "urn:li:share:2" } })),
    );
    expect(await shareArticleOnLinkedIn("token", "urn:li:person:782bbtaQ", article)).toBe("urn:li:share:2");
  });

  it("omits thumbnails when there is no cover image", () => {
    const payload = buildArticleSharePayload("urn:li:person:a1", { ...article, thumbnailUrl: undefined });
    expect(payload.specificContent["com.linkedin.ugc.ShareContent"].media[0]).not.toHaveProperty("thumbnails");
  });
});
