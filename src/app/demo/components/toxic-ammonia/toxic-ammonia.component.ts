import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ToxicService } from '../../service/toxic.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-toxic-ammonia',
    templateUrl: './toxic-ammonia.component.html',
    styleUrl: './toxic-ammonia.component.scss',
})
export class ToxicAmmoniaComponent implements OnInit, OnDestroy {
    foreCastDialog: boolean = false;

    showEditToxic: boolean = false;
    currentToxic: any;
    toxic: any[];

    toxicCols: any[] = [];

    chartData: any;

    chartOptions: any;

    loading: boolean = true;
    toxicForm: FormGroup;
    subscription!: Subscription;

    dateRangeForm: FormGroup;
    chartInfo: any
    constructor(
        public layoutService: LayoutService,
        private ToxicService: ToxicService,
        private formBuilder: FormBuilder,
        private MessageService: MessageService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }
    ngOnInit() {
        this.getToxicAmmoniaTable();
        this.getToxicAmmoniaCahrt();
        this.toxicCols = [
            { field: 'date', header: 'date' },
            { field: 'ph', header: 'ph' },
            { field: 'do', header: 'do' },
            { field: 'temp', header: 'temp' },
            { field: 'result', header: 'result' },
        ];
        this.toxicForm = this.formBuilder.group({
            ph: ['', Validators.required],
            do: ['', Validators.required],
            temp: ['', Validators.required],
            date: [new Date(), Validators.required],
        });
        this.dateRangeForm = this.formBuilder.group({
            rangeDates: [[]]
        })
        this.toxicForm.controls['date'].disable();
    }
    openNew() {
        this.foreCastDialog = true;
    }
    hideDialog() {
        this.foreCastDialog = false;
    }
    editItem(item) {
        this.currentToxic = item;
        this.showEditToxic = true;
    }
    deleteItem(index: number) {
        this.ToxicService.deleteToxic(index).subscribe((res) => {
            if (res.status == 'success') {
                this.MessageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Farm deleted successfully',
                });
                this.getToxicAmmoniaTable();
                this.getToxicAmmoniaCahrt();
            }
        });
    }
    formSubmitted(event: boolean) {
        if (event) {
            this.getToxicAmmoniaTable();
            this.getToxicAmmoniaCahrt();
        }
    }
    getToxicAmmoniaTable() {
        let startDate = this.dateRangeForm?.value?.rangeDates[0];
        let endDate = this.dateRangeForm?.value?.rangeDates[1];
        this.ToxicService.getToxicAmmoniaTable(startDate, endDate).subscribe((res) => {
            if (res.status == 'success') {
                this.toxic = res.data;
            }
        });
    }
    getToxicAmmoniaCahrt() {
        let startDate = this.dateRangeForm?.value?.rangeDates[0];
        let endDate = this.dateRangeForm?.value?.rangeDates[1];
        this.ToxicService.getToxicAmmoniaCahrt(startDate, endDate).subscribe((res) => {
            if (res.status == 'success') {
                this.chartInfo = res.data
                this.initChart();
            }
        });
    }
    saveCast() {
        this.toxicForm.value.date = this.toxicForm.getRawValue().date;
        let data = {
            ph: +this.toxicForm.value.ph,
            do: +this.toxicForm.value.do,
            temp: +this.toxicForm.value.temp,
            date: this.toxicForm.value.date,
        };
        this.ToxicService.predictToxicAmmonia(data).subscribe((res) => {
            if (res.status == 'success') {
                this.MessageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Ammonia level predicted successfully',
                });
                this.getToxicAmmoniaTable();
                this.getToxicAmmoniaCahrt();
            } else {
                this.MessageService.add({
                    severity: 'danger',
                    summary: 'danger',
                    detail: 'Failed to predict ammonia level',
                });
            }
        });
        this.toxicForm.reset();
        this.toxicForm.patchValue({ date: new Date() });
        this.foreCastDialog = false;
    }
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
        
        // Check if chartInfo exists before using it
        if (!this.chartInfo) {
            this.chartData = {
                labels: [],
                datasets: []
            };
            return;
        }
        
        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'PH',
                    data: this.chartInfo.ph || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'DO',
                    data: this.chartInfo.do || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
                {
                    label: 'Temperature',
                    data: this.chartInfo.temperature || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    tension: 0.4,
                },
                {
                    label: 'Predicted Ammonia',
                    data: this.chartInfo.predicted_ammonia || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--purple-700'),
                    borderColor: documentStyle.getPropertyValue('--purple-700'),
                    tension: 0.4,
                },
                {
                    label: 'Actual Ammonia',
                    data: this.chartInfo.actual_ammonia || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--orange-700'),
                    borderColor: documentStyle.getPropertyValue('--orange-700'),
                    tension: 0.4,
                },
            ],
        };
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    selectDateRange() {
        if (this.dateRangeForm.value.rangeDates && this.dateRangeForm.value.rangeDates.length === 2) {
            let [startDate, endDate] = this.dateRangeForm.value.rangeDates;
            if (startDate && endDate) {
                startDate = moment(startDate).format('YYYY-MM-DD');
                endDate = moment(endDate).format('YYYY-MM-DD');
                this.dateRangeForm.value.rangeDates[0] = startDate;
                this.dateRangeForm.value.rangeDates[1] = endDate;
                this.getToxicAmmoniaTable();
                this.getToxicAmmoniaCahrt();
            }
            else {
                this.MessageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Please Select Valid Date',
                });
            }
        } else {
            console.log('Date range is incomplete:', this.dateRangeForm.value.rangeDates);
        }
    }
}
