import { Router } from 'express';
import passport from 'passport';
import { getUser, logout } from '../controllers/discordAuthController';

const router = Router();


router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: 'http://localhost:5173/',
    successRedirect: 'http://localhost:5173/'
}));

router.get('/logout', logout);
router.get('/user', getUser);
export default router;