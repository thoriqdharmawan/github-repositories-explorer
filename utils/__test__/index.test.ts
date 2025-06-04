import {
  formatDate,
  getAuthToken,
  getAuthUser,
  githubOAuthLogin,
  isAuthenticated,
  logout,
  setAuthData,
} from "../index";

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

delete (window as any).location;
window.location = { href: "", reload: jest.fn() } as any;

window.dispatchEvent = jest.fn();
(window as any).CustomEvent = jest.fn();

describe("Utils Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const result = formatDate("2023-01-15T10:30:00Z");
      expect(result).toBe("January 15, 2023");
    });

    it("should handle different date formats", () => {
      const result = formatDate("2023-12-25");
      expect(result).toBe("December 25, 2023");
    });
  });

  describe("getAuthToken", () => {
    it("should return token from localStorage", () => {
      mockLocalStorage.getItem.mockReturnValue("test-token");
      const result = getAuthToken();
      expect(result).toBe("test-token");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "github_access_token",
      );
    });

    it("should return null if no token", () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = getAuthToken();
      expect(result).toBeNull();
    });

    it("should return null on server side", () => {
      const originalWindow = global.window;
      delete (global as any).window;
      const result = getAuthToken();
      expect(result).toBeNull();
      global.window = originalWindow;
    });
  });

  describe("getAuthUser", () => {
    it("should return parsed user data from localStorage", () => {
      const userData = { login: "testuser", id: 123 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(userData));
      const result = getAuthUser();
      expect(result).toEqual(userData);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("github_user");
    });

    it("should return null if no user data", () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = getAuthUser();
      expect(result).toBeNull();
    });

    it("should return null on server side", () => {
      const originalWindow = global.window;
      delete (global as any).window;
      const result = getAuthUser();
      expect(result).toBeNull();
      global.window = originalWindow;
    });
  });

  describe("isAuthenticated", () => {
    it("should return true when token exists", () => {
      mockLocalStorage.getItem.mockReturnValue("test-token");
      const result = isAuthenticated();
      expect(result).toBe(true);
    });

    it("should return false when no token", () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const result = isAuthenticated();
      expect(result).toBe(false);
    });
  });

  describe("logout", () => {
    it("should remove auth data and reload page", () => {
      logout();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "github_access_token",
      );
      expect(mockLocalStorage.removeItem).toHaveBeenCalled();
      expect(window.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe("githubOAuthLogin", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      process.env = {
        ...OLD_ENV,
        NEXT_PUBLIC_CLIENT_ID: "test-client-id",
        NEXT_PUBLIC_AUTHORIZATION_CALLBACK_URI:
          "http://localhost:3000/callback",
      };
    });

    it("should redirect to GitHub OAuth URL", () => {
      githubOAuthLogin();

      expect(window.location.href).toBe("http://localhost/");
    });
  });

  describe("setAuthData", () => {
    it("should set token and user data in localStorage", () => {
      const token = "test-token";
      const userData = { login: "testuser", id: 123 };

      setAuthData(token, userData);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "github_access_token",
        token,
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "github_user",
        JSON.stringify(userData),
      );
      expect(window.dispatchEvent).toHaveBeenCalled();
    });
  });
});
