const useDiscord = () => {
  const redirectToDiscordAuth = () => {
    window.location.href = 'http://localhost:3000/auth/discord';
  };

  return {
    redirectToDiscordAuth,
  };
};

export default useDiscord;
