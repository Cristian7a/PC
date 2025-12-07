import express from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import { healthRoute } from './routes/health-routes';
import { anonymousRouter } from './routes/anonymous-routes';
import { authenticateJWT } from './middleware/authenticate-jwt';
import { userRouter } from './routes/user-routes';
import { authRouter } from './routes/auth-routes';
import { protectedRoutes } from './routes/protected-routes';
import { CORS_ORIGIN } from './env.config';
import { problemDetailsMiddleware } from './middleware/problem-details';

const app = express();

const ROUTES = {
  base: '/api/v1',
  /**
   * Used to allow authentication.
   */
  auth: '/auth',
  /**
   * Used for routes that requires an authenticated user.
   */
  authenticated: '/a',
  // admin: '/s',
};

// Enable CORS
const corsOptions: CorsOptions = {
  origin: CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// TODO Enrique: Intercept requests from non-authenticated users (e.g. Postman?)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ROUTES.base, healthRoute);

app.use(ROUTES.base, anonymousRouter);
app.use(ROUTES.base + ROUTES.auth, authRouter); // These need to be public/anonymously accessible

// Protected routes
app.use(`${ROUTES.base}${ROUTES.authenticated}`, authenticateJWT, protectedRoutes);
// app.use(`${ROUTES.base}${ROUTES.authenticated}${ROUTES.admin}`, authenticateJWT, authenticateAsAdminRole, protectedAdminRoutes);

app.use('/user', userRouter);

// Error handler
app.use(problemDetailsMiddleware);

export { app };
