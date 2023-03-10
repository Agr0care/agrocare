const express = require("express"),
  { Server } = require("socket.io"),
  cors = require("cors"),
  http = require("http");

const data = require("./routes/v1/data"),
  device = require("./routes/v1/device"),
  auth = require("./routes/v1/auth");

require("dotenv").config();

const app = express(),
  port = process.env.PORT ?? 3000,
  server = http.createServer(app),
  io = new Server(server, {
    cors: {
      origin: "*",
    },
    path: "/socket",
    serveClient: true
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use("/v1/data", data); */
app.use("/v1/auth", auth);

io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.use(socketAuth);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
