import UsersDAO from "../DAOs/mongodb/users.dao";
import UsersDto from "../DTOs/users.dto";
import { User, UserCreate } from "../Type/user.type";
import { getHashPassword } from "../utils/bcrypt.util";


const Users = new UsersDAO();

const getAll = async () => {
    try {
        const allUsers = await Users.getAll();
        const users = allUsers.map(user => user.serialize());
        return users;
    } catch (error) {
        throw error;
    };
};

const getById = async (id: string) => {
    try {
        const user = await Users.getById(id);
        const response = user && user.serialize();
        return response;
    } catch (error) {
        throw error;
    };
};

const getOne = async ({ email, userName }: { email?: string, userName?: string }) => {
    try {
        const user = await Users.getOne({ email, userName });
        const response = user && user.serialize();
        return response;
    } catch (error) {
        throw error;
    };
};

const updateOne = async ({id, userInfo}: {id: string, userInfo: User}) => {
    try {
        const currentUser = await Users.getById(id);
        if(userInfo.email === currentUser?.email) {
            const updatedUser = await Users.updateOne(id, userInfo);
            return updatedUser;
        }
    } catch (error) {
        throw error;
    };
};

const create = async (userInfo: UserCreate) => {
    try {
        const isEmailExist = await Users.getOne({ email: userInfo.email });
        if(!isEmailExist) {
            userInfo.password = getHashPassword(userInfo.password);
            const newUser = new UsersDto(userInfo);
            const response = await Users.create(newUser);
            return response;
        } else {
            return "Email in use"
        }
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id: string) => {
    try {
        return await Users.deleteById(id);
    } catch (error) {
        throw error;
    };
};

export { 
    getAll, 
    getById, 
    getOne, 
    updateOne, 
    create, 
    deleteById 
};