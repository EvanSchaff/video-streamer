import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import videoRoutes from './routes/api/streamRoutes';
import nginxRoutes from './routes/api/nginxRoutes';
import discordAuthRoutes from './routes/discordAuthRoutes';
import session from 'express-session';
import passport from './auth/passport';

export const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));


// Setup session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/stream', videoRoutes);
app.use('/api/nginx', nginxRoutes)
app.use('/auth', discordAuthRoutes)



export function startExpressServer(port: number) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}


