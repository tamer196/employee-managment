import { Employee } from "./employee";

export interface Project {
    id?: number;
    projectName?: string;
    projectVersion?: number;
    projectDescription?: string;
    projectStatus?: string;
    projectManager?: string;
    employees? : Employee[];
  }
  