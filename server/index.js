import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Server running on port', port);
});
