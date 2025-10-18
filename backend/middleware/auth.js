const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || token !== "supersecrettoken") {
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }

  next();
};

module.exports = auth;
