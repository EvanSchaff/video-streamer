import { DiscordUser } from '../types/discordUser';
import { AuthContext } from './AuthContext';
import React, { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/user', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Error fetching user:', err);
      setUser(null);
      setIsLoading(false);
    }
  };

  const getAvatarURL = (userId: string, avatar: string): string => {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${avatar.startsWith('a_') ? 'gif' : 'png'}`;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getAvatarURL, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
