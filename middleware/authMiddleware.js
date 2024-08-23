const jwt = require('jsonwebtoken');
const { ROLES } = require('../config/constants');

exports.authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      
      if (req.user.role === ROLES.ADMINISTRATOR) {
        return next();
      }

      
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Anda tidak memiliki akses.' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Tidak terautentikasi.' });
    }
  };
};