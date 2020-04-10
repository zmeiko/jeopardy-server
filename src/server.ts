import * as Koa from "koa";
import { createConnection } from "typeorm";
import { createServer } from "http";

createConnection()
  .then(async () => {
    const app = new Koa();

    const server = createServer(app.callback());
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const io = require("socket.io")(server);

    io.on("connection", function (socket) {
      io.emit("chat message", "HI");
      socket.on("disconnect", function () {
        console.log("user disconnected");
      });
      socket.on("chat", function (msg) {
        console.log("chat message", msg);
        io.emit("chat message", msg);
      });
    });

    server.listen(3000);
    console.log("Koa application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
