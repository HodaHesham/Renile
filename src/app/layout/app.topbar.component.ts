import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [`
        .api-toggle-wrapper {
            padding: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        @media (max-width: 768px) {
            .api-toggle-wrapper {
                width: 100%;
                border-bottom: 1px solid var(--surface-border);
                margin-bottom: 0.5rem;
                padding-bottom: 1rem;
            }
        }
    `]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
}
