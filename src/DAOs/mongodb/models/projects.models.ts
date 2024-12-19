import mongoose from "mongoose";

const projectCollection = "project";

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    tasks: [
        {
            title: String,
            description: String,
            assignedTo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            status: {
                type: String, 
                enum: ["pendiente", "en progreso", "completada"],
                required: true,

                default: "pendiente"
            },
            createdAt: Date,
            deadLine: Date
        }
    ],
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            role: {
                type: String,
                enum: [ "owner", "admin", "member" ], 
                required: true
            }
        }
    ],
    createdAt: Date,
}, 
{ 
    timestamps: true 
});

projectSchema.index({ title: 1 }, { unique: true });

projectSchema.index({members: 1});

const Projects = mongoose.model(projectCollection, projectSchema);

export default Projects;