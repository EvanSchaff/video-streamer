import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/database.sqlite'
});

export default db;