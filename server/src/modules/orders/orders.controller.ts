import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { PageProps } from '@/types/pagination';

import * as orderService from './orders.service';

export const createOrder = async (req: Request, res: Response) => {
  const { userId, mealType } = req.body;

  const data = await orderService.createOrder({ userId, mealType });

  return res.status(HttpStatus.CREATED).json({ data });
};

/**
 * Get all orders.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */

type OrderProps = Partial<PageProps>;

export const fetchOrders = async (req: Request, res: Response) => {
  const { page, size }: OrderProps = req.query;

  const data = await orderService.fetchOrders({ page, size });

  return res.status(HttpStatus.OK).json({ data });
};
