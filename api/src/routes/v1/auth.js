const { Router } = require("express");
const { register, login } = require("../../controllers/auth");

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body,
    data = await login(username, password);

  res.send(data);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body,
    data = await register(username, password);

  res.send(data);
});

module.exports = router;
