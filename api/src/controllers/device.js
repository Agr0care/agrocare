const jwt = require("jsonwebtoken"),
  { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPlant = async () => {
  const randomCode = Math.floor(Math.random() * 1000000).toString(),
    token = jwt.sign({ randomCode }, process.env.AUTH_SECRET);

  const createdPlant = await prisma.plant.create({
    data: {
      name: "Plant",
      token,
      randomCode,
    },
  });

  return { token, randomCode };
};

const linkPlantToAccount = async (userId, randomCode) => {
  const plant = await prisma.plant.findFirst({
    where: {
      randomCode,
    },
  });

  if (!plant) {
    return {
      error: "Invalid random code",
    };
  }

  const updatedPlant = await prisma.plant.update({
    where: {
      id: plant.id,
    },
    data: {
      userId,
    },
  });

  return updatedPlant;
};

const listPlants = async (userId) => {
  const plants = await prisma.plant.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      token: true,
      randomCode: false,
      userId: false,
      type: true
    }
  });

  return plants;
};

module.exports = { createPlant, linkPlantToAccount, listPlants };
