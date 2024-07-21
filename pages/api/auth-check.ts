// pages/api/auth-check.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
