const { Router } = require("express"),
  { createPlant, linkPlantToAccount, listPlants } = require("../../controllers/device"),
  verifyAuth = require("../../middlewares/verifyAuth");

const router = Router();

router.get("/createPlant", async (_, res) => {
  const { token, randomCode } = await createPlant();

  res.send({
    token,
    randomCode,
  });
});

router.post("/linkPlantToAccount", verifyAuth, async (req, res) => {
  const { randomCode } = req.body;
  const { id } = req.user;

  if(!randomCode) return res.status(400).send("Missing link code.");

  const plant = await linkPlantToAccount(id, randomCode);

  res.send(plant);
});

router.get("/listPlants", verifyAuth, async (req, res) => {
  const { id } = req.user;

  const plants = await listPlants(id);

  res.send(plants);
});

module.exports = router;
