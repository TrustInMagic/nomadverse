import 'dotenv/config';
// middleware
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// routes
import indexRouter from './routes/index';
// db
import mongoose from 'mongoose';
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

// routes
app.use('/', indexRouter);

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
