import { createServerFn } from "@tanstack/react-start";

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((d: { user: string; pass: string }) => d)
  .handler(async ({ data }) => {
    const crypto = await import("node:crypto");
    const secret = process.env.ADMIN_SESSION_SECRET || "mimo-secret-session-2026";
    const adminUser = process.env.ADMIN_USER || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    function secureCompare(a: string, b: string): boolean {
      try {
        const bufA = Buffer.from(a);
        const bufB = Buffer.from(b);
        if (bufA.length !== bufB.length) return false;
        return crypto.timingSafeEqual(bufA, bufB);
      } catch {
        return false;
      }
    }

    const isUserValid = secureCompare(data.user, adminUser);
    const isPassValid = secureCompare(data.pass, adminPass);

    if (!isUserValid || !isPassValid) {
      return { success: false, message: "Usuário ou senha inválidos." };
    }

    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = `${data.user}:${expiresAt}`;
    const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    const token = `${payload}.${signature}`;

    return { success: true, token };
  });

export const verifyAdminSessionFn = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    if (!data.token) return { valid: false };
    try {
      const crypto = await import("node:crypto");
      const secret = process.env.ADMIN_SESSION_SECRET || "mimo-secret-session-2026";
      const parts = data.token.split(".");
      if (parts.length !== 2) return { valid: false };
      const [payload, signature] = parts;
      const [user, expiresAtStr] = payload.split(":");
      if (!user || !expiresAtStr) return { valid: false };
      const expiresAt = Number(expiresAtStr);
      if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return { valid: false };

      const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
      const bufA = Buffer.from(signature);
      const bufB = Buffer.from(expected);
      if (bufA.length !== bufB.length) return { valid: false };
      const valid = crypto.timingSafeEqual(bufA, bufB);
      return { valid };
    } catch {
      return { valid: false };
    }
  });
