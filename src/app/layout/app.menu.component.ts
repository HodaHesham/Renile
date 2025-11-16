import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-desktop', routerLink: ['/'] },
                    { label: 'Toxic Ammonia', icon: 'pi pi-fw pi-home', routerLink: ['/toxic-ammonia'] },
                    { label: 'Feed Rate', icon: 'pi pi-fw pi-list', routerLink: ['/feed-rate'] },
                    { label: 'Growth Rate', icon: 'pi pi-fw pi-share-alt', routerLink: ['/growth-rate'] },
                    { label: 'Ponds', icon: 'pi pi-fw pi-clone', routerLink: ['/Ponds'] },
                ]
            },
        ];
    }
}
