import type { UserCreate } from "../Type/user.type";

class UsersDTO {
    userName: string;
    email: string;
    password: string;
    createdAt: Date;

    constructor(newUser: UserCreate) {
        this.userName = newUser.userName;
        this.email = newUser.email;
        this.password = newUser.password;
        this.createdAt = new Date();
    };

    static fromUserCreate(userCreate: UserCreate): UsersDTO {
        return new UsersDTO(userCreate);
    };
};

export default UsersDTO;