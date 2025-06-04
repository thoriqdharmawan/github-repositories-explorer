/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "../route";

global.fetch = jest.fn();

const mockEnv = {
  NEXT_PUBLIC_CLIENT_ID: "test-client-id",
  CLIENT_SECRET: "test-client-secret",
};

describe("POST /api/auth/callback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...process.env, ...mockEnv };
  });

  it("should return 400 when code is missing", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Authorization code is required");
  });

  it("should return 500 when OAuth configuration is missing", async () => {
    delete process.env.NEXT_PUBLIC_CLIENT_ID;

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ code: "test-code" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("OAuth configuration is missing");
  });

  it("should return 500 when GitHub API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ code: "test-code" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Internal server error during OAuth callback");
  });

  it("should return 400 when GitHub returns error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          error: "invalid_grant",
          error_description: "The code passed is incorrect or expired.",
        }),
    });

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ code: "invalid-code" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("The code passed is incorrect or expired.");
  });

  it("should return access token on successful OAuth", async () => {
    const mockTokenData = {
      access_token: "gho_test_token",
      token_type: "bearer",
      scope: "repo,user",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTokenData),
    });

    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ code: "valid-code" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockTokenData);
    expect(fetch).toHaveBeenCalledWith(
      "https://github.com/login/oauth/access_token",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "GitHub-Repositories-Explorer",
        },
        body: JSON.stringify({
          client_id: "test-client-id",
          client_secret: "test-client-secret",
          code: "valid-code",
        }),
      }),
    );
  });
});
