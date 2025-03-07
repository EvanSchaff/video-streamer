import { DiscordUser } from '../types/discordUser';
import { createContext } from 'react';

interface AuthContextType {
  user: DiscordUser | null;
  getAvatarURL: (userId: string, avatar: string) => string;
  isLoading: boolean;
}

const defaultValues: AuthContextType = {
  user: null,
  getAvatarURL: () => '',
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultValues);
