import User from '../models/user.model.js';
import { Response, Request } from 'express';
import { error_MESSAGE } from '../utilities/helpers/database.helper.js';
import jwt from 'jsonwebtoken';
import { verifyAccessToken } from '../utilities/helpers/token.helpers.js';
import Conversation from '../models/conversation.model.js';
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
    const _user = await User.findOne({ _id: id });
    if (_user) {
      Object.assign(_user, req.body);
      await _user.save();
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
export const addFriendController = async (req: any, res: Response) => {
  if (!req.body) {
    return res.status(404).json({ message: 'Friend not found' });
  }
  const { userId } = req;
  const { friendId } = req.body;
  try {
    const _friend = await User.findById({ _id: friendId });
    const _you = await User.findById({ _id: userId });
    if (_friend && _you) {
      const hisFriends = _friend.friends;
      const yourFriends = _you.friends;
      if (
        !hisFriends.includes(_you._id) &&
        !yourFriends.includes(_friend._id)
      ) {
        _friend.friends.push(userId);
        _you.friends.push(_friend._id);
        await _friend.save();
        await _you.save();
        return res
          .status(200)
          .json({ message: 'Added friend: ' + _friend.firstname });
      }
    } else {
      return res.status(404).json({ message: 'Neither found' });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
export const removeFriendController = async (req: any, res: Response) => {
  const { userId } = req;
  const { friendId } = req.body;
  console.log('asd');
  try {
    const _friend = await User.findById({ _id: friendId });
    const _you = await User.findById({ _id: userId });

    if (_friend && _you) {
      const hisFriends = _friend.friends;
      const yourFriends = _you.friends;

      if (hisFriends.includes(_you._id) && yourFriends.includes(_friend._id)) {
        hisFriends.forEach((f) => {
          console.log(f);
          console.log(_you._id);
        });
        const friendIndex = yourFriends.findIndex(
          (f) => _friend._id.toString() === f.toString()
        );
        const yourIndex = hisFriends.findIndex(
          (f) => _you._id.toString() === f.toString()
        );

        console.log(friendIndex);
        console.log(yourIndex);
        if (yourIndex !== -1 && friendIndex !== -1) {
          console.log('test 2');
          _friend.friends.splice(yourIndex, 1);
          _you.friends.splice(friendIndex, 1);
          await _friend.save();
          await _you.save();
          return res
            .status(204)
            .json({ message: 'Removed friend: ' + _friend.firstname });
        }
      }
    } else {
      return res.status(404).json({ message: 'Neither found' });
    }
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const detailedUserController = async (req: any, res: Response) => {
  try {
    const _user = await User.findById(req.userId)
      .populate('friends', {
        firstname: 1,
        friends: 1,
      })
      .populate('conversations');
    res.status(200).json(_user);
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};
export const getUserList = async (req: Request, res: Response) => {
  console.log('You try here');
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
