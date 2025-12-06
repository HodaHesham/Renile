import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToxicAmmoniaComponent } from './toxic-ammonia.component';
import { ToxicAmmoniaRoutingModule } from './toxic-ammonia-routing.module';
import { ChartModule } from 'primeng/chart';
import { CrudModule } from '../pages/crud/crud.module';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EditToxicComponent } from './edit-toxic/edit-toxic.component';
@NgModule({
  declarations: [ToxicAmmoniaComponent, EditToxicComponent],
  imports: [
    CommonModule,
    ToxicAmmoniaRoutingModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    ToolbarModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    CrudModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    CalendarModule,
    DialogModule,
  ],
  providers: [MessageService],
})
export class ToxicAmmoniaModule {}
