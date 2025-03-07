export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: number | null;
    global_name: string;
    avatar_decoration_data: {
        asset: string;
        sku_id: string;
        expires_at: number;
    } | null;
    collectibles: unknown | null;
    banner_color: string | null;
    clan: unknown | null;
    primary_guild: unknown | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
    email: string;
    verified: boolean;
    provider: string;
    accessToken: string;
    fetchedAt: string;
}