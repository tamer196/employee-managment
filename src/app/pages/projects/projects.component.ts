import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppBreadcrumbService } from 'src/app/breadcrumb/app.breadcrumb.service';
import { Project } from 'src/app/models/project';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  projects: Project[];
  project: Project = {};
  projectDialoge: boolean = false;

  submitted: boolean = false;

  constructor(private breadcrumbService: AppBreadcrumbService, private messageService: MessageService,
    private projectService: ProjectsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Projects' }
    ]);
  }

  ngOnInit(): void {
    this.getProjects();
  }

  openNew() {
    this.project = {};
    this.submitted = false;
    this.projectDialoge = true;
  }

  hideDialog() {
    this.projectDialoge = false;
    this.submitted = false;
  }

  saveProject(){
    debugger;
    this.submitted = true;
    this.project.employees = [];
    if (this.project.projectName && this.project.projectStatus && this.project.projectVersion && this.project.projectManager) {
      if (!this.project.id) {
        // Create new project
        this.projectService.addProject(this.project).subscribe(
          (newProject) => {
            this.getProjects();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project created successfully' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create project' });
          }
        );
      } 
      this.submitted = false;
      this.project = {};
      this.hideDialog();
    }

  }


  getProjects() {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Projects Could not be Fetched!!\n' + error, life: 3000 });
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
