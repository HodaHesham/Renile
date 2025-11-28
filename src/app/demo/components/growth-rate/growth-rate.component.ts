import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GrowthService } from '../../service/growth.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-growth-rate',
    templateUrl: './growth-rate.component.html',
    styleUrl: './growth-rate.component.scss',
})
export class GrowthRateComponent implements OnInit, OnDestroy {
    growthDialog: boolean = false;
    growth: any[] = [];
    growthCols: any[] = [];
    chartData: any;
    chartOptions: any;
    subscription: Subscription;
    dateRangeForm: FormGroup;
    chartInfo: any;

    constructor(private layoutService: LayoutService, private GrowthService: GrowthService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.getGrowthRate();
        this.initCharts();
        this.growthCols = [
            { field: 'date', header: 'date' },
            { field: 'ph', header: 'ph' },
            { field: 'dissolved_oxygen', header: 'dissolved_oxygen' },
            { field: 'temperature', header: 'temperature' },
            { field: 'ammonia', header: 'ammonia' },
            { field: 'results', header: 'results' },
        ];
    }

    openNew() {
        this.growthDialog = true;
    }

    hideDialog() {
        this.growthDialog = false;
    }

    saveCast() {
        this.growthDialog = false;
    }

    getGrowthRate() {
        let startDate = '';
        let endData = '';
        this.GrowthService.getGrowthRate(startDate, endData).subscribe((response) => {
            console.log(response);
            if (response.status === 'success') {
                this.growth = response.data;
                // Create chart data from the table data
                this.createChartDataFromTable();
            }
        });
    }

    createChartDataFromTable() {
        if (this.growth && this.growth.length > 0) {
            this.chartInfo = {
                ph: this.growth.map(item => item.ph),
                dissolved_oxygen: this.growth.map(item => item.dissolved_oxygen),
                temperature: this.growth.map(item => item.temperature),
                ammonia: this.growth.map(item => item.ammonia)
            };
            this.initCharts();
        }
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        // Default static data if no dynamic data available
        const defaultData = {
            ph: [7.2, 6.8, 7.5, 7.1, 6.9, 7.3, 7.0, 6.7, 7.4, 7.2, 6.8, 7.1],
            dissolved_oxygen: [8.5, 9.1, 8.0, 8.8, 9.2, 8.3, 8.9, 9.0, 8.1, 8.7, 9.3, 8.6],
            temperature: [18.5, 16.2, 20.8, 19.3, 21.1, 22.5, 24.2, 23.8, 22.1, 20.7, 18.9, 17.6],
            ammonia: [0.15, 0.12, 0.22, 0.18, 0.14, 0.25, 0.16, 0.28, 0.13, 0.19, 0.11, 0.17]
        };

        const dataToUse = this.chartInfo || defaultData;

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
                    data: dataToUse.ph || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'DO',
                    data: dataToUse.dissolved_oxygen || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
                {
                    label: 'Temperature',
                    data: dataToUse.temperature || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--indigo-400'),
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    tension: 0.4,
                },
                {
                    label: 'Ammonia',
                    data: dataToUse.ammonia || [],
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--orange-400'),
                    borderColor: documentStyle.getPropertyValue('--orange-400'),
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
}