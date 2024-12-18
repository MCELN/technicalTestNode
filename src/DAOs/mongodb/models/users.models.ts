import mongoose, { Model } from "mongoose";
import type { UserDocument } from "../../../Type/user.type";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String, 
        unique: true
    },
    password: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    createdAt: Date,
}, 
{ 
    timestamps: true 
});

userSchema.methods.serialize = function () {
    return {
        _id: this._id,
        userName: this.userName,
        email: this.email,
        projects: this.projects,
        tasks: this.tasks,
        createdAt: this.createdAt
    };
};

const Users: Model<UserDocument> = mongoose.model<UserDocument>(userCollection, userSchema);

export default Users;
