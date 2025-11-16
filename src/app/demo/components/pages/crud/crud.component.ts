import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FarmsService } from 'src/app/demo/service/farms.service';
import { Farm } from 'src/app/demo/api/farm';

@Component({
    selector:'app-crud-table',
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    @Input() list: any[];
    @Input() listCol:any[];
    @Output() itemDeleted: EventEmitter<number> = new EventEmitter<number>();

    // selectedFarms: Farm[] = [];

    // farmDialog: boolean = false;

    // deleteFarmDialog: boolean = false;

    // deleteFarmsDialog: boolean = false;

    // submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private FarmsService:FarmsService, private messageService: MessageService) {
        
     }

    ngOnInit() {
       
        
    }
    // deleteItem(index: number) {
    //     console.log('deleteFarm');
    //     this.itemDeleted.emit(index);
    // }
    
    // openNew() {
    //     this.farm = {};
    //     this.submitted = false;
    //     this.farmDialog = true;
    // }

    // deleteSelectedProducts() {
    //     this.deleteFarmsDialog = true;
    // }

    // editProduct(farm: Farm) {
    //     this.farm = { ...farm };
    //     this.farmDialog = true;
    // }

    // deleteProduct(farm: Farm) {
    //     this.deleteFarmDialog = true;
    //     this.farm = { ...farm };
    // }

    // confirmDeleteSelected() {
    //     this.deleteFarmsDialog = false;
    //     this.farms = this.farms.filter(val => !this.selectedFarms.includes(val));
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'farms Deleted', life: 3000 });
    //     this.selectedFarms = [];
    // }

    // confirmDelete() {
    //     this.deleteFarmDialog = false;
    //     this.farms = this.farms.filter(val => val.id !== this.farm.id);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'farm Deleted', life: 3000 });
    //     this.farm = {};
    // }

    // hideDialog() {
    //     this.farmDialog = false;
    //     this.submitted = false;
    // }

    // saveFarm() {
    //     this.submitted = true;

    //     if (this.farm.name?.trim()) {
    //         if (this.farm.id) {
    //             // @ts-ignorehis.farm.inventoryStatus = this.farm.inventoryStatus.value ? this.farm.inventoryStatus.value : this.farm.inventoryStatus;
    //             this.farms[this.findIndexById(this.farm.id)] = this.farm;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'farm Updated', life: 3000 });
    //         } else {
    //             this.farm.id = this.createId();
    //             this.farm.code = this.createId();
    //             // this.farm.logo = 'farm-placeholder.svg';
    //             // @ts-ignore
    //             this.farms.push(this.farm);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'farm Created', life: 3000 });
    //         }

    //         this.farms = [...this.farms];
    //         this.farmDialog = false;
    //         this.farm = {};
    //     }
    // }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.farms.length; i++) {
    //         if (this.farms[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
