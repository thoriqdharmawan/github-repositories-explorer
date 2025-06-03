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
