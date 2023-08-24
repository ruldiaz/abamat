import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleWare from '../middleware/auth.js';

const userRoutes = express.Router();

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const addUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hashedPassword,
      admin: admin,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred ' });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

userRoutes.route('/').get(getUsers);
userRoutes.route('/register').post(addUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/protected').get(authMiddleWare, (req, res) => {
  res.status(200).json({ message: 'You have access to this route' });
});

export default userRoutes;
