import { Request, Response } from 'express';

export function login(req: Request, res: Response) {
    res.redirect('/auth/discord');
}

export function logout(req: Request, res: Response) {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
    });
    res.redirect('/');
}

export function getUser(req: Request, res: Response) {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).send('Unauthorized');
    }
}