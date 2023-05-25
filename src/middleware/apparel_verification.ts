import { Request, Response, NextFunction } from 'express';
import { IApparel } from '../routers/vendor.js';

export const apparelVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData: IApparel = req.body;
    if (
      reqData.quality !== 'ME' &&
      reqData.quality !== 'AV' &&
      reqData.quality !== 'HI'
    ) {
      throw Error();
    }

    if (
      reqData.size !== 'XXL' &&
      reqData.size !== 'M' &&
      reqData.size !== 'S' &&
      reqData.size !== 'XL'
    ) {
      throw Error();
    }

    if (isNaN(reqData.base_price)) {
      throw Error();
    }

    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid Apparel Values' });
  }
};

export const multipleApparelVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqData: IApparel[] = req.body;
    for (const element of reqData) {
      if (
        element.quality !== 'ME' &&
        element.quality !== 'AV' &&
        element.quality !== 'HI'
      ) {
        throw Error();
      }

      if (
        element.size !== 'XXL' &&
        element.size !== 'M' &&
        element.size !== 'S' &&
        element.size !== 'XL'
      ) {
        throw Error();
      }

      if (isNaN(element.base_price)) {
        throw Error();
      }
    }
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid Apparel Values' });
  }
};
