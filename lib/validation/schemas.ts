import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar 100 caracteres.")
    .regex(/^[\p{L}\s'-]+$/u, "El nombre solo puede contener letras."),

  email: z
    .string()
    .email("El correo electrónico no es válido.")
    .max(254, "El correo no puede superar 254 caracteres."),

  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(5000, "El mensaje no puede superar 5000 caracteres."),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido.")
    .max(254, "El correo no puede superar 254 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
