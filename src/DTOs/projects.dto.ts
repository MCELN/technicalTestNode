import type { ProjectCreate } from "../Type/project.type";


class ProjectsDTO {
    title: string;
    description: string;
    tasks: string[];
    members: string[];
    createdAt: Date;

    constructor(projectInfo: ProjectCreate) {
        this.title = projectInfo.title;
        this.description = projectInfo.description;
        this.tasks = [];
        this.members = [];
        this.createdAt = new Date();        
    };
};

export default ProjectsDTO;