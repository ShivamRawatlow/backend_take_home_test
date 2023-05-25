import express from 'express';
import { vendorRouter } from './routers/vendor.js';
import { userRouter } from './routers/user.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const directory = path.dirname(__filename);
export const fileAddress = path.resolve(directory, '..', 'data.json');

const port = 3000;
const app = express();
app.use(express.json());
app.use(vendorRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
