import {Component} from '@angular/core';
import { AppMainComponent } from '../app.main.component';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo" id="logolink" style="cursor: pointer; outline: none;" routerLink="/">
                        <img id="app-logo"
                             [src]="'assets/layout/images/logo-' + (app.topbarTheme === 'light' ? 'poseidon' : 'poseidon-dark') + '.png'"
                             alt="poseidon-layout">
                    </div>
                </div>

                <div class="layout-topbar-right">
                    <a class="menu-button" href="#" (click)="appMain.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public appMain: AppMainComponent, public app: AppComponent) {
    }

}
