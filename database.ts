import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const DATABASE_URL: string = process.env.DATABASE_URL as string;
export const sequelize = new Sequelize(DATABASE_URL, {
  define: { freezeTableName: true },
});

export async function authenticateDB(sequelize: Sequelize) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}