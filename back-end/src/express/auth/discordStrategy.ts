import { Strategy as DiscordStrategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { Profile } from 'passport-discord';
import dotenv from 'dotenv';
import { CreateUser, FindUser } from '../../db/models/userModel';

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
            const user = await FindUser(profile.id);
            if (!user) {
                await CreateUser(profile.id);
            }

            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    }
);

export default discordStrategy;