import express, { Request, Response } from 'express';
import crypto from 'crypto';
import fs from 'fs';

import {
  apparelVerification,
  multipleApparelVerification,
} from '../middleware/apparel_verification.js';
import { fileAddress } from '../index.js';

export const vendorRouter = express.Router();

export interface IApparel {
  id: string;
  quality: 'HI' | 'ME' | 'AV';
  size: 'XXL' | 'XL' | 'M' | 'S';
  base_price: number;
}

//add new
vendorRouter.post(
  '/vendor/apparel/add',
  apparelVerification,
  (req: Request, res: Response) => {
    const reqData: IApparel = req.body;
    reqData.id = crypto.randomUUID();
    try {
      const dbData: IApparel[] = JSON.parse(
        fs.readFileSync(fileAddress, 'utf8')
      );

      dbData.push(reqData);

      fs.writeFileSync(fileAddress, JSON.stringify(dbData), 'utf8');

      res.status(201).send({ message: 'Data Updated Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
);

//single update
vendorRouter.post(
  '/vendor/apparel/update',
  apparelVerification,
  (req: Request, res: Response) => {
    const reqData: IApparel = req.body;
    if (!reqData.id) {
      res.status(401).send({ error: 'apparel id not provided' });
      return;
    }
    try {
      const dbData: IApparel[] = JSON.parse(
        fs.readFileSync(fileAddress, 'utf8')
      );

      const apparel: IApparel = dbData.find((apparel, index) => {
        if (apparel.id === reqData.id) {
          dbData[index] = {
            id: apparel.id,
            quality: reqData.quality,
            base_price: reqData.base_price,
            size: reqData.size,
          };
          return true;
        }
      });

      if (!apparel) {
        res.status(401).send({ error: 'apparel id does not match' });
        return;
      }

      fs.writeFileSync(fileAddress, JSON.stringify(dbData), 'utf8');

      res.status(201).send({ message: 'Data Updated Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
);

//multiple update
vendorRouter.post(
  '/vendor/apparels/update',
  multipleApparelVerification,
  (req: Request, res: Response) => {
    const reqData: IApparel[] = req.body;

    try {
      const dbData: IApparel[] = JSON.parse(
        fs.readFileSync(fileAddress, 'utf8')
      );
      for (const element of reqData) {
        const apparel: IApparel = dbData.find((apparel, index) => {
          if (apparel.id === element.id) {
            dbData[index] = {
              id: apparel.id,
              quality: element.quality,
              base_price: element.base_price,
              size: element.size,
            };
            return true;
          }
        });

        if (!apparel) {
          res.status(401).send({ error: 'apparel id does not match' });
          return;
        }
      }
      fs.writeFileSync(fileAddress, JSON.stringify(dbData), 'utf8');

      res.status(201).send({ message: 'Data Updated Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
);
