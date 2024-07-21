// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
