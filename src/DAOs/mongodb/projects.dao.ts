import Projects from "./models/projects.models";
import type { ProjectCreate } from "../../Type/project.type";

class ProjectsDAO {

    async getAll() {
        try {
            const projects = await Projects.find();
            return projects;
        } catch (error) {
            throw error;
        };
    };

    async getAllByUserId(userId: string) {
        try {
            const projects = await Projects.find({
                members: {
                    $elemMatch: {
                        user: userId
                    }
                }
            });
            return projects;
        } catch (error) {
            throw error;
        };
    };

    async getById(id: string) {
        try {
            const project = await Projects.findById(id);
            return project;
        } catch (error) {
            throw error;
        };
    };

    async getOne(projectTitle: string, userId: string) {
        try {
            const project = await Projects.findOne({
                title: projectTitle,
                members: {
                    $elemMatch: {
                        $eq: userId
                    }
                }
            });
            return project;
        } catch (error) {
            throw error;
        };
    };

    async updateOne(projectId: string, data: ProjectCreate) {
        try {
            const project = await Projects.findOne({
                _id: projectId
            });
            const response = await Projects.updateOne({ _id: projectId }, {$set: data});
            return response;
        } catch (error) {
            throw error;
        };
    };

    async addUserToProject(userId: string, projectId: string, role: string) {
        try {
            const response = await Projects.updateOne(
                { _id: projectId },
                { $push: {members: {user: userId, role: role}}}
            );
            return response;
        } catch (error) {
            throw error;
        };
    }

    async removeUserFromProject(userId: string, projectId: string) {
        try {
            const response = await Projects.updateOne(
                { _id: projectId },
                { $pull: {members: {user: userId}}}
            );

            return response;
        } catch (error) {
            throw error;
        };
    };

    async create(projectInfo: ProjectCreate) {
        try {
            const newProject = await Projects.create(projectInfo);
            return newProject;
        } catch (error) {
            throw error;
        };
    };



    async deleteOne(id: string) {
        try {
            return await Projects.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        };
    };
};

export default ProjectsDAO;