import Users from "./models/users.models";
import type { User, UserCreate } from "../../Type/user.type";

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

    async updateOne(id: string, data: User) {
        try {
            const response = await Users.updateOne({ _id: id }, {$set: data});
            return response;
        } catch (error) {
            throw error;
        };
    };

    async addNewProject(id: string, projectId: string) {
        try {
            return await Users.updateOne({_id: id}, {
                $push: {
                    projects: projectId
                }
            });
        } catch (error) {
            throw error;
        };
    }

    async create(userInfo: UserCreate) {
        try {
            const newUser = await Users.create(userInfo);
            return newUser;
        } catch (error) {
            throw error;
        };
    };

    async exitProject(id: string, projectId: string) {
        try {
            return await Users.updateOne({ _id: id }, {
                $pull: {
                    projects: projectId
                }
            });
        } catch (error) {
            throw error;
        };
    }

    async deleteById(id: string) {
        try {
            return await Users.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        };
    };
};

export default UsersDAO;