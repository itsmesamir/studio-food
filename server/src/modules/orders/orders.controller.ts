import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import * as orderService from './orders.service';

/**
 * Get all users.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const fetchOrders = async (req: Request, res: Response) => {
  const users = await orderService.fetchOrders(req.query);

  return res.status(HttpStatus.OK).json({ data: users });
};
