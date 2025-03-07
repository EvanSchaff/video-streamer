import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { Profile } from 'passport-discord';
import dotenv from 'dotenv';

dotenv.config();

interface DiscordProfile extends Profile {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    email?: string;
    verified: boolean;
}

const discordStrategy = new DiscordStrategy(
    {
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: process.env.DISCORD_REDIRECT_URI as string,
        scope: ['identify'],
    },
    async (
        accessToken: string,
        refreshToken: string,
        profile: DiscordProfile,
        done: VerifyCallback
    ) => {
        try {
            // Add database stuff later
            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    }
);

export default discordStrategy;