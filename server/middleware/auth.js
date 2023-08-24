import jwt from 'jsonwebtoken';

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export default authMiddleWare;
