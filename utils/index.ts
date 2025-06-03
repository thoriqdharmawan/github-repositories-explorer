export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const githubOAuthLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const callbackUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_CALLBACK_URI;
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}&scope=read:user`;
  window.location.href = oauthUrl;
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("github_access_token");
};

export const getAuthUser = (): any | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("github_user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("github_access_token");
  localStorage.removeItem("github_user");
  window.location.reload();
};
