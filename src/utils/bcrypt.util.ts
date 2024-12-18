import bcrypt from "bcrypt";

const getHashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compareSync(password, hashPassword);
};

export { getHashPassword, comparePassword };