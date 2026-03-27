import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Email Configuration", () => {
  it("should have ADMIN_EMAIL configured", () => {
    expect(ENV.adminEmail).toBeDefined();
    expect(ENV.adminEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(ENV.adminEmail).toBe("alyne.carvalho@missionbrasil.com.br");
  });

  it("should have MARKETING_EMAIL configured", () => {
    expect(ENV.marketingEmail).toBeDefined();
    expect(ENV.marketingEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(ENV.marketingEmail).toBe("marketing@missionbrasil.com.br");
  });

  it("should have both emails different", () => {
    expect(ENV.adminEmail).not.toBe(ENV.marketingEmail);
  });
});
