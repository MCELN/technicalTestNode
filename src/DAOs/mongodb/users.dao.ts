import { UserCreate } from "../../Type/user.type";
import Users from "./models/users.models";

class UsersDAO {

    async getAll() {
        try {
            const users = await Users.find();
            return users;
        } catch (error) {
            throw error;
        };
    };

    async getById(id: string) {
        try {
            const user = Users.findById(id);
            return user;
        } catch (error) {
            throw error;
        };
    };

    async getOne({ email, userName }: { email?: string, userName?: string }) {
        try {
            const user = await Users.findOne({
                $or: [
                    { email },
                    { userName }
                ]
            });
            return user;
        } catch (error) {
            throw error;
        }
    };

    async updateOne(id: string, data: any) {
        try {
            return await Users.updateOne({ _id: id }, {$set: data});
        } catch (error) {
            throw error;
        };
    };

    async create(userInfo: UserCreate) {
        try {
            const newUser = await Users.create(userInfo);
            return newUser;
        } catch (error) {
            throw error;
        };
    };

    async deleteById(id: string) {
        try {
            return await Users.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        };
    };
};

export default UsersDAO;