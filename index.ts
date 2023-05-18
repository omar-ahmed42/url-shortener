import express, { Express } from "express";
import { authenticateDB, sequelize } from "./database";
import { urlRouter } from "./routers/url";
import {
    UidConfiguration,
    UidGenerator,
} from "./uid/distributed-uid-snowflake/uid";

export const uidConfiguration: UidConfiguration = new UidConfiguration(1, 1);
export const uidGenerator: UidGenerator = new UidGenerator(uidConfiguration);

const app: Express = express();
app.use(express.json());
app.use("/api/v1", urlRouter);

const port = process.env.BACKEND_PORT;
const start = async () => {
  try {
    await authenticateDB(sequelize);
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`Server is now listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
