import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

import { PageProps } from '@/types/pagination';

import * as orderService from './orders.service';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, mealType } = req.body;

    const data = await orderService.createOrder({ userId, mealType });

    return res.status(HttpStatus.CREATED).json({ data });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

/**
 * Get all orders.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */

export const fetchOrders = async (req: Request, res: Response) => {
  const data = await orderService.fetchOrders(req.query);

  return res.status(HttpStatus.OK).json(data);
};
