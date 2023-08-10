import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import newsRoutes from './routes/news-routes.js';

// Routes

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 3001;

app.use('/abamat/news', newsRoutes);

app.listen(port, () => {
  console.log('Server running on port', port);
});
