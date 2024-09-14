import { Request, Response, NextFunction } from 'express';

import { PageProps } from '@/types/pagination';

import * as orderService from 'services/order';

type OrderProps = Partial<PageProps>;

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { page, size }: OrderProps = req.query;

  try {
    const data = await orderService.getAllOrders({ page, size });

    res.json({
      data,
      message: 'Orders fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};
