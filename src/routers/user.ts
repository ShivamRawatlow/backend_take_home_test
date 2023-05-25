import express, { Request, Response } from 'express';
import fs from 'fs';
import { IApparel } from './vendor.js';
import { findLowestPriceApparel } from '../utils/find_lowest_price_apparel.js';
import { fileAddress } from '../index.js';

export const userRouter = express.Router();

export interface IUserConfiguration {
  quality: 'HI' | 'ME' | 'AV';
  size: 'XXL' | 'XL' | 'M' | 'S';
}

userRouter.post('/user/apparel/find', (req: Request, res: Response) => {
  const reqData: IUserConfiguration = req.body;
  try {
    const dbData: IApparel[] = JSON.parse(fs.readFileSync(fileAddress, 'utf8'));

    const matches = dbData.filter((element) => {
      if (
        element.quality === reqData.quality &&
        element.size === reqData.size
      ) {
        return true;
      }
    });

    if (matches.length === 0) {
      res.status(401).send({ message: 'Configuration not found' });
      return;
    }

    const lowestPriceApparel = findLowestPriceApparel(matches);

    res.status(200).send({ data: lowestPriceApparel });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});
