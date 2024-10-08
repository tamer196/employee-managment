import {Component, OnInit} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Favorites', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: ['/']},
                    {label: 'Projects', icon: 'pi pi-fw pi-folder', routerLink: ['projects']},
                ]
            },
        ];
    }
}
