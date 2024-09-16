import { Project } from "./project";

export interface Employee {
    id?: number;
    name?: string;
    email?: string;
    position?: string;
    department?: string;
    phone?: string;
    projects?: Project[]; // An array of Project objects
  }