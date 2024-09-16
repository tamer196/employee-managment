import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AppMainComponent } from './app.main.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: EmployeesComponent},
                    {path: 'projects', component: ProjectsComponent},
                ]
            },
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
