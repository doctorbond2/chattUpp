import { NextFunction, Response, Request } from 'express';
export const existingConversationMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  console.log('using convo middleware');
  if (!req.body) {
    return res.status(400).json({
      message: 'Bad request.',
      error: 'No body submitted.',
    });
  }
  const { userId, conversation } = req.body;
  try {
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
