import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'https://localhost:44302/api/projects';  // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // Get all projects
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
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
