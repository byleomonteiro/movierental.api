const { verify } = require("../security/JWTSecurity")

module.exports = async (req, res, next) => {
  const verified = await verify(req.headers);

  if (!verified.valid)
    return res.status(401).json({
      error: true,
      statusCode: 401,
      message: verified.message
    });

  req.currentUser = verified.user;

  next();
};
