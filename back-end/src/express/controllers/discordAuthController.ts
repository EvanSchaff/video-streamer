import { Request, Response } from 'express';
import { FindUser } from '../../db/models/userModel';


declare global {
    namespace Express {
        interface User {
            userId?: string;  // or whatever property you use for ID
            email?: string;
            [key: string]: any;
        }
    }
}

export function login(req: Request, res: Response) {
    res.redirect('/auth/discord');
}

export function logout(req: Request, res: Response) {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
    });
    res.redirect('http://localhost:5173/');
}

export async function getUser(req: Request, res: Response) {
    if (req.user) {
        try {
            const userData = await FindUser(req.user.id);
            res.json({ ...req.user, site_username: userData.username });
        }
        catch (err) {
            res.status(500).send('Error getting user');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
}