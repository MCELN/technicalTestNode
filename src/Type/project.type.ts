import { User } from "./user.type";

export type Project = {
    _id: string;
    title: string;
    description: string;
    tasks: string[];
    members: {
        _id: string;
        role: "owner" | "admin" | "member";
    }[];
    createdAt: Date;
}

export type ProjectCreate = {
    title: string;
    description: string;
}

