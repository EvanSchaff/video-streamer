import { User } from "../db/models/userModel";

export const initializeDB = async () => {
    try {
        await User.sync({ force: false });
    }
    catch (err) {
    }
}