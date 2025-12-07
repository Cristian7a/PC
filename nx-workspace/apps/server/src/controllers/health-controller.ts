import { Request, Response } from 'express';
import { getHealthStatus } from '../models/health-model';

export const getHealthController = async (req: Request, res: Response) => {
  const r = getHealthStatus();
  res.json(r);
};
