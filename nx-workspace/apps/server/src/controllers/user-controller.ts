import { Request, Response } from 'express';

export const getUserProfileController = (req: Request, res: Response) => {
  const user = { name: 'no..' };
  res.json(user);
};
