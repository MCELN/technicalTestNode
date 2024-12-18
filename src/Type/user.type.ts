import { Document, ObjectId } from "mongoose";

export interface UserDocument extends Document {
    _id: string;
    userName: string;
    email: string;
    password: string;
    projects: ObjectId[];
    tasks: ObjectId[];
    createdAt: Date;
    serialize: () => {
        _id: string;
        userName: string;
        email: string;
        projects: ObjectId[];
        tasks: ObjectId[];
        createdAt: Date;
    }
}

export type User = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    projects: string[];
    tasks: string[];
    createdAt: Date;
}

export type UserCreate = {
    userName: string;
    email: string;
    password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}