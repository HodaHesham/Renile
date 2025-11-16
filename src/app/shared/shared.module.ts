import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ApiToggleComponent } from './api-toggle/api-toggle.component';

@NgModule({
    declarations: [
        ApiToggleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule
    ],
    exports: [
        ApiToggleComponent
    ]
})
export class SharedModule { }