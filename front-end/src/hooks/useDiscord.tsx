const useDiscord = () => {
  const redirectToDiscordAuth = () => {
    window.location.href = 'http://localhost:3000/auth/discord';
  };

  const redirectToLogout = () => {
    window.location.href = 'http://localhost:3000/auth/logout';
  };

  return {
    redirectToDiscordAuth,
    redirectToLogout,
  };
};

export default useDiscord;
