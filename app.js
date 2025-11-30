const express = require("express");
const NotFound = require("./middleware/not-found.exceptions");
const InternalException = require("./middleware/internal.exceptions");

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  InternalException(app);
  NotFound(app);
  let PORT = process.env.PORT || 2200;
  app.listen(PORT, () => {
    console.log(`server run : http://localhost:${PORT}`);
  });
}

main();
