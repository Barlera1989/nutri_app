import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: `Invalid or expired Token `, status: 403 });

    req.user = user;

    next();
  });
};

export default authToken;
