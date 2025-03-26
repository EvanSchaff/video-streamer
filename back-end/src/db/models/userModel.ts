import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../../config/sequalizeDB";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare discord_id: string;
    declare username?: string | null;
    declare created_at: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    discord_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, { sequelize: db, modelName: "User" });

export const CreateUser = async (discord_id: string) => {
    await User.create({
        discord_id: discord_id
    });
}

export const FindUser = async (discord_id: string): Promise<User | null> => {
    const user = await User.findOne({
        where: {
            discord_id: discord_id
        }
    });
    return user;
}

export const UpdateUsername = async (discord_id: string, username: string): Promise<Boolean> => {
    const [userCount] = await User.update(
        { username: username },
        { where: { discord_id: discord_id } }
    );

    return userCount > 0;
}
