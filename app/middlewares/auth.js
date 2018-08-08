const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth');

module.exports = {
  async auth(req, res, next) {
    // retrieving the information in the authorization header
    const { authorization } = req.headers;

    // check if anything was provided
    if (!authorization) {
      return res.status(401).json({ Error: 'No token provided' });
    }

    const providedToken = authorization.split(' ');

    // checks if the token has two parts: 'Bearer' and TOKEN NUMBER
    if (providedToken.length !== 2) {
      return res.status(401).json({ Error: 'Invalid token format' });
    }

    // if a token of 2 parts is provided, we proceed with other checks
    const [type, token] = providedToken;

    // checks if its a Bearer authorization method
    if (type !== 'Bearer') {
      return res.status(401).json({
        Error: 'Invalid auth type, Bearer required',
      });
    }

    // checks the token number (e.g.: provided or not)
    if (!token) {
      return res.status(401).json({
        Error: 'Something went wrong with the provided token number',
      });
    }

    // after all final verifications we check the given token number
    try {
      const decoded = await promisify(jwt.verify)(token, secret);
      req.userId = decoded.id;
      return next();
    } catch (err) {
      return res.status(400).json({ Error: err });
    }
  },
};
