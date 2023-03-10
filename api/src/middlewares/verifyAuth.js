const verifyToken = require("../lib/verifyToken");

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(/\s/)[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);

    if (!(decoded instanceof Error)) {
      req.user = decoded;

      return next();
    }

    return res.status(401).json({ error: "Invalid token" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
