import 'dotenv/config';
// middleware
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
// routes
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import chronicleRouter from './routes/chronicle';
import categoryRouter from './routes/category';
import subChronicleRouter from './routes/sub-chronicle';
import commentRouter from './routes/comment';
// db
import mongoose from 'mongoose';
// bcrypt
import bcrypt from 'bcryptjs';
// models
import User from './models/user';
// passport
import passport from 'passport';
import passportLocal from 'passport-local';
import session from 'express-session';
// typescript
import { Request, Response } from 'express';
// -------------------------------------------------- //

async function dbConnect() {
  await mongoose.connect(mongoURI);
}

const app = express();

// db config
const mongoURI = process.env.MONGO_URI as string;
mongoose.set('strictQuery', false);
dbConnect().catch((err) => console.log(err));

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: process.env.SECRET_PASSPORT,
    resave: false,
    saveUninitialized: true,
  })
);

// passport config
const localStrategy = passportLocal.Strategy;
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        const match = await bcrypt.compare(password, user?.password || '');

        if (!user || !match) {
          return done(null, false, {
            message: 'Incorrect username or password',
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

// routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chronicle', chronicleRouter);
app.use('/category', categoryRouter);
app.use('/sub-chronicle', subChronicleRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
