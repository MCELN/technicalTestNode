import { UserCreate } from "../Type/user.type";

class UsersDto {
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

    static fromUserCreate(userCreate: UserCreate): UsersDto {
        return new UsersDto(userCreate);
    };

    toResponseObject(): object {
        return {
            userName: this.userName,
            email: this.email,
            createdAt: this.createdAt
        };
    };
};

export default UsersDto;