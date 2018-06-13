'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import basicAuthMiddleware from '../lib/basic-auth-middleware';
import User from '../model/user';
import logger from '../lib/logger';
import Profile from '../model/profile';

const userRouter = new Router();
const jsonParser = json();

userRouter.post('/signup', jsonParser, (request, response, next) => {
  return User.create(request.body.username, request.body.password, request.body.email)
    .then((user) => {
      delete request.body.password;
      logger.log(logger.INFO, 'USER - creating a TOKEN HERE');
      new Profile({ username: request.body.username, user: user._id }).save();
      return user.createTokenProm();
    })
    .then((token) => {
      logger.log(logger.INFO, 'USER - 200 code and a Token');
      response.cookie('X-PubHub-Token', token, { maxAge: 900000 });
      response.send(token);
    })
    .catch(next);
});

userRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.user) {
    return next(new HttpError(404, 'ERROR user not found'));
  }
  return request.user.createTokenProm()
    .then((token) => {
      response.cookie('X-PubHub-Token', token, { maxAge: 900000 });
      response.send(token);
    })
    .catch(next);
});

export default userRouter;
