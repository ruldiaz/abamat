import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const newsRoutes = express.Router();

const apiKey = process.env.API_KEY;

const getNews = async (req, res) => {
  try {
    const news = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=mx&apiKey=${apiKey}`
    );
    const data = news.data.articles;
    // console.log(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

newsRoutes.route('/').get(getNews);

export default newsRoutes;
