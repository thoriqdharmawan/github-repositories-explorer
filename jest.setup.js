import "@testing-library/jest-dom";

// Set default environment variables for tests
process.env.NEXT_PUBLIC_APP_API_URI = "https://api.github.com";
process.env.NEXT_PUBLIC_HOMEPAGE_URI = "http://localhost:3000";
process.env.NEXT_PUBLIC_AUTHORIZATION_CALLBACK_URI = "http://localhost:3000/callback";
process.env.NEXT_PUBLIC_CLIENT_ID = "test-client-id";
process.env.NEXT_PUBLIC_CLIENT_SECRETS = "client_secrets";

expect.extend({});
