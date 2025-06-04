import axios from "axios";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    request: jest.fn(),
    head: jest.fn(),
    options: jest.fn(),
  })),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

import { apiApp } from "../apiApp";

describe("apiApp", () => {
  it("should create axios instance with correct baseURL", () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: "https://api.github.com",
    });
  });

  it("should export apiApp as AxiosInstance", () => {
    expect(apiApp).toBeDefined();
    expect(typeof apiApp).toBe("object");
  });
});
