const express = require("express");
const NotFound = require("./middleware/not-found.exceptions");
const InternalException = require("./middleware/internal.exceptions");
const { syncModel } = require("./models/index.model");
const { allRoutes } = require("./app.routes");

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(allRoutes);

  syncModel()
    .then(() => {
      console.log("model sync successfully");
    })
    .catch((error) => {
      console.log(`model connect field : ${error}`);
    });
  InternalException(app);
  NotFound(app);
  let PORT = process.env.PORT || 2200;
  app.listen(PORT, () => {
    console.log(`server run : http://localhost:${PORT}`);
  });
}

main();
