import ProjectsDAO from "../DAOs/mongodb/projects.dao";
import ProjectsDTO from "../DTOs/projects.dto";
import { Project, ProjectCreate } from "../Type/project.type";
import * as usersService from "./users.service";


const Projects = new ProjectsDAO();

const getAll = async () => {
    try {
        const projects = await Projects.getAll();
        return projects;
    } catch (error) {
        throw error;
    };
};

const  getAllByUser = async (userId: string) => {
    try {
        const user = await usersService.getById(userId);
        if(!user) throw new Error("User not found");

        const projects = await Projects.getAllByUserId(userId);
        return projects;
    } catch (error) {
        throw error;
    };
};

const getById = async (userId: string, projectId: string) => {
    try {
        const allProjectsUser = await getAllByUser(userId);
        
        const projects = allProjectsUser.find(project => project._id.toString() === projectId);
        if(!projects) throw new Error("Project not found");
        return projects;
    } catch (error) {
        throw error;
    };
};

const getOne = async (userId: string, projectTitle: string) => {
    try {
        const allProjectsUser = await getAllByUser(userId);
        if(!allProjectsUser) throw new Error("Project not found");

        const project = allProjectsUser.find(project => project.title === projectTitle);
        if(!project) throw new Error("Project not found");
        return project;
    } catch (error) {
        throw error;
    };
};

const updateOne = async (userId: string, projectId: string, data: Project) => {
    try {
        const allProjectsUser = await getAllByUser(userId);
        if(!allProjectsUser) throw new Error("Project not found");

        const user = await usersService.getById(userId);
        if(!user) throw new Error("User not found");

        const userProject = allProjectsUser.find(project => project._id.toString() === projectId);
        if(!userProject) throw new Error("Project not found");


        const userRole = allProjectsUser.find(project => project._id.toString() === projectId);
        return await Projects.updateOne(projectId, data);
    } catch (error) {
        throw error;
    };
};

const create = async (userId: string, projectInfo: ProjectCreate) => {
    try {
        const user = await usersService.getById(userId);
        if(!user) throw new Error("User not found");

        const project = new ProjectsDTO(projectInfo);

        const projectData = {
            ...project,
            members: [{
                user: userId,
                role: "owner"
            }]
        };
        const newProject = await Projects.create(projectData);

        console.log(newProject);

        const verUser = await usersService.addProject(userId, newProject._id.toString());
        console.log(verUser);
        return newProject;
    } catch (error) {
        throw error;
    };
};

const addUserToProject = async (userId: string, projectId: string, role: string) => {
    try {
        await usersService.addProject(userId, projectId);
        return await Projects.addUserToProject(userId, projectId, role);
    } catch (error) {
        throw error;
    };
};

const removeUserFromProject = async (userId: string, projectId: string) => {
    try {
        await usersService.exitProject(userId, projectId);
        return await Projects.removeUserFromProject(userId, projectId);
    } catch (error) {
        throw error;
    };
};

const deleteOne = async (projectId: string) => {
    try {
        return await Projects.deleteOne(projectId);
    } catch (error) {
        throw error;
    };
};


export {
    getAll,
    getAllByUser,
    getById,
    getOne,
    updateOne,
    create,
    addUserToProject,
    removeUserFromProject,
    deleteOne
};