/* const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = Router();

router.post("/push", async (req, res) => {
  const { temperature, batteryLevel, airHumidity, soilMoisture, brightness } =
      req.body,
    time = new Date(),
    weatherRes = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Mexico%20City&appid=89847c67f02062c63b2342ed2de9090f&units=metric"
    ),
    weather = await weatherRes.json();

  if (
    !temperature ||
    !batteryLevel ||
    !airHumidity ||
    !soilMoisture ||
    !brightness ||
    !weather
  )
    return res.status(400).json({
      status: 400,
      error: "Bad request",
      message: "Missing parameters",
    });

  const register = await prisma.register.create({
    data: {
      temperature,
      weather,
      soilMoisture,
      airHumidity,
      batteryLevel,
      brightness,
      time: time.toDateString(),
    },
  });

  return res.json({
    status: 201,
    message: "Data registered successfully",
    data: register,
  });
});

router.get("/get", async (req, res) => {
  const data = await prisma.register.findMany({});

  return res.json({
    status: 200,
    message: "Data retrieved successfully",
    data,
  });
});

module.exports = router;
 */