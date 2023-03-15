const bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(),
  secretKey = process.env["AUTH_SECRET"];

const register = async (username, password) => {
  const promise = new Promise(async (resolve) => {
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      resolve({ error: "User with this username already exists", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1y",
    });

    resolve({ token, user, status: 200 });
  });

  return promise;
};

const login = (username, password) => {
  const promise = new Promise(async (resolve) => {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      resolve({ error: "Invalid username or password", status: 401 });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        resolve({ error: "Invalid username or password", status: 401 });
      }

      const token = jwt.sign({ username: user.username, id: user.id }, secretKey, {
        expiresIn: "1y",
      });

      resolve({ token, status: 200 });
    });
  });

  return promise;
};

module.exports = { register, login };
