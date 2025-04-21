import { NextFunction, Request, Response } from 'express';
import { ProductService } from '~/services/product.service';

import { SuccessResponse } from '~/utils/ApiResponse';

export class Controller {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRecord = await ProductService.create(req.body);

      return new SuccessResponse('success', {
        data: newRecord.id,
        error: false,
        msg: 'Successfully',
      }).send(res);
    } catch (err) {
      next(err);
    }
  };

  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await ProductService.getAll();

      return new SuccessResponse('success', {
        data,
        error: false,
      }).send(res);
    } catch (err) {
      next(err);
    }
  };
}
