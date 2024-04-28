import User from '../models/user.model.js';
import { Response, Request } from 'express';
import { error_MESSAGE } from '../utilities/helpers/database.helper.js';
import jwt from 'jsonwebtoken';
import { verifyAccessToken } from '../utilities/helpers/token.helpers.js';
export const createUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Bad request.',
      error: 'No user body submitted.',
    });
  }
  try {
    const user = new User(req.body);
    const result = await user.save();
    if (result) {
      console.log(result);
      return res.status(201).json({ new_user: result });
    }
  } catch (err: any) {
    console.log(error_MESSAGE('post'), err);
    return res.status(400).json({
      message: 'Error creating user',
      error: err.message,
    });
  }
};
export const updateUserController = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Bad request.',
      error: 'No user body submitted.',
    });
  }
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Bad request.',
      error: 'No user id submitted.',
    });
  }
  const { id } = req.params;
  try {
    const _user = await User.findByIdAndUpdate({ _id: id }, req.body);
    if (_user) {
      res.status(200).send({ message: 'Updated' });
    }
  } catch (err: any) {
    console.log(error_MESSAGE('post'), err);
    return res.status(400).json({
      message: 'Error creating user',
      error: err.message,
    });
  }
};
export const getUserProfile = async (req: Request, res: Response) => {
  console.log('Test backend');
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Bad request, no profile ID provided.',
    });
  }
  const { id } = req.params;
  console.log('id: ', id);
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      message: 'Unexpected error.',
      error: err.message,
    });
  }
};
export const detailedUserController = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send('No access');
  }
  console.log('TRIGGERED!');
  const { authorization } = req.headers;
  const accessToken = authorization.split(' ')[1];
  try {
    const decodedToken: any = await verifyAccessToken(accessToken);
    console.log('Decoded:', decodedToken);
    if (decodedToken) {
      const userId = decodedToken.userId;
      const _user = await User.findById(userId).populate('friends', {
        firstname: 1,
        _id: 0,
      });
      res.status(200).json(_user);
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
export const getUserList = async (req: Request, res: Response) => {
  let page: number = parseInt(req.query.page as string) || 1;
  let pageSize: number = parseInt(req.query.pageSize as string) || 10;
  let pageSkip = page - 1;
  try {
    let _users = await User.find().skip(pageSkip).limit(pageSize);
    res.status(200).json(_users);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      message: 'Unexpected error.',
      error: err.message,
    });
  }
};
