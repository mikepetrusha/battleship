const { clientsHelperFunctionGenerator } = require("./serverHelpers");


const io = require("socket.io")({
  cors: {
    origin: '*',
  },
});

const clients = {};

io.on("connection", (socket) => {
  const { addClient, removeClient, newGame, sendShips, shot, end } =
    clientsHelperFunctionGenerator(clients, socket, io);

  addClient();

  socket.on("newGame", newGame);

  socket.on("ships", sendShips);

  socket.on("shot", shot);

  socket.on("end", end);

  socket.on("disconnect", removeClient);
});

io.listen(4001);