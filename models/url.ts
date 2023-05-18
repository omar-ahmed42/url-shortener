import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Url = sequelize.define(
  "url",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING(160),
      field: "short_url",
      unique: true,
      allowNull: false,
    },
    longUrl: {
      type: DataTypes.STRING(2083),
      field: "long_url",
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "url",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
