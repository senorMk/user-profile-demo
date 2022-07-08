import jsonwebtoken from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jsonwebtoken.verify(token, `TOP_SECRET`);

    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;
