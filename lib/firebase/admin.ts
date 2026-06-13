import "server-only";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// Parse the service account JSON string from the environment variable
const getServiceAccount = () => {
  try {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!key || key === '{}') return null;
    
    const parsed = JSON.parse(key);
    if (!parsed.project_id) return null;
    
    return parsed;
  } catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    return null;
  }
};

const serviceAccount = getServiceAccount();

export const adminApp =
  getApps().length === 0
    ? initializeApp(
        serviceAccount
          ? { credential: cert(serviceAccount) }
          : undefined // Si es undefined, Firebase intentará usar Application Default Credentials
      )
    : getApps()[0];

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("Unauthorized: No session cookie found");
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    throw new Error("Unauthorized: Invalid session cookie");
  }
}
