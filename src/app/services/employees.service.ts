import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl = 'https://localhost:44302/api/Employees';  // Base API URL

  constructor(private http: HttpClient) { }

  // Get all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      catchError(this.handleError)
    );
  }

  // Assign employee to one or more projects
  assignEmployeeToProjects(employeeId: number, projectIds: number[]): Observable<void> {
    const url = `${this.apiUrl}/assignEmployeesOnProjects?employeeId=${employeeId}`;
    return this.http.post<void>(url, projectIds).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
