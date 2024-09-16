import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppBreadcrumbService } from 'src/app/breadcrumb/app.breadcrumb.service';
import { Employee } from 'src/app/models/employee';
import { Project } from 'src/app/models/project';
import { EmployeesService } from 'src/app/services/employees.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  projects: Project[];
  employee: Employee = {};
  selectedProjects: Project[] = [];
  availableProjects: Project[] = [];
  employeeDialoge: boolean = false;
  assignProjectDialog: boolean = false;

  submitted: boolean = false;

  viewFlag: boolean = false;

  displayProjects: boolean = false;

  deleteemployeeDialog: boolean = false;

  constructor(private breadcrumbService: AppBreadcrumbService, private messageService: MessageService,
    private employeesService: EmployeesService, private projectService: ProjectsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Favourit' },
      { label: 'Employees' }
    ]);
  }
  ngOnInit(): void {
    this.getEmployees();
    this.getProjects();
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialoge = true;
    this.viewFlag = false;
  }

  hideDialog() {
    this.employeeDialoge = false;
    this.assignProjectDialog = false;
    this.submitted = false;
  }

  viewEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialoge = true;
    this.viewFlag = true;
  }


  viewEmployeeProject(employee: Employee) {
    this.employee = { ...employee };
    this.displayProjects = true;
  }

  assignProject(employee: Employee) {
    debugger;
    this.employee = { ...employee };
    this.assignProjectDialog = true;
    const assignedProjectIds = employee.projects.map(project => project.id);

    this.availableProjects = this.projects.filter(project => !assignedProjectIds.includes(project.id));
  }

  assignProjects() {

    if(this.selectedProjects.length > 0){
      this.employeesService.assignEmployeeToProjects(this.employee.id, this.selectedProjects.map(project => project.id)).subscribe(
        response => {
          this.getEmployees();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Assigned', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Project Could not be Assigned!!\n' + error, life: 3000 });
          console.log(error);
        }
      );
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Select a project', life: 3000 });
    }

    this.assignProjectDialog = false;
    this.employee = {};
    this.projects = [];
  }

  saveEmployee(): void {
    this.submitted = true;
    if (this.employee.name && this.employee.email && this.employee.position && this.employee.department && this.employee.phone) {
      if (!this.employee.id) {
        this.employee.projects = [];
        this.employeesService.addEmployee(this.employee).subscribe(
          response => {
            this.getEmployees();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee Could not be Created!!\n' + error, life: 3000 });
            console.log(error);
          }
        );
      }

      this.employeeDialoge = false;
      this.employee = {};
    }
  }

  getEmployees() {
    this.employeesService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employee);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee Could not be Fetched!!\n' + error, life: 3000 });
      }
    );
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
