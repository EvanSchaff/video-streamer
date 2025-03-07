import passport from 'passport';
import discordStrategy from './discordStrategy';

passport.use(discordStrategy);

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
    done(null, obj);
});

export default passport;