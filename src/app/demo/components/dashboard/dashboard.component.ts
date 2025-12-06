import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FarmsService } from '../../service/farms.service';
import { Farm } from '../../api/farm';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('dt') table: Table;

  farms: Farm[];

  filteredFarms: Farm[];

  farmsCols: any[] = [];

  selectedItem: Farm;

  selectedFarm: any;

  currentFarm: Farm;

  showEdit: boolean = false;

  chartData: any;

  chartOptions: any;

  loading: boolean = true;

  subscription!: Subscription;

  constructor(
    private FarmsService: FarmsService,
    public layoutService: LayoutService,
    private MessageService: MessageService,
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.getFarms();
    this.farmsCols = [
      { field: 'createdAt', header: 'createdAt' },
      { field: 'updatedAt', header: 'updatedAt' },
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'type', header: 'type' },
      { field: 'code', header: 'code' },
      { field: 'logo', header: 'logo' },
      { field: 'address', header: 'address' },
      { field: 'nPonds', header: 'nPonds' },
      { field: 'nFishPerPond', header: 'nFishPerPond' },
      { field: 'timezone', header: 'timezone' },
      { field: 'contactPhone', header: 'contactPhone' },
      { field: 'contactEmail', header: 'contactEmail' },
      { field: 'order', header: 'order' },
      { field: 'is_archived', header: 'is_archived' },
    ];
    this.initChart();
  }
  formSubmitted(event: boolean) {
    if (event) {
      this.getFarms();
    }
  }
  getItem(item) {
    this.selectedItem = item;
  }
  deleteItem(index: number) {
    this.FarmsService.deleteFarm(index).subscribe((res) => {
      if (res.status == 'success') {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Farm deleted successfully',
        });
        this.getFarms();
      }
    });
  }
  getFarms() {
    this.FarmsService.getFarms().subscribe((data) => {
      this.farms = data.results;
      this.selectedItem = this.farms[this.farms.length - 1];
      this.filteredFarms = [...this.farms];
    });
  }
  editItem(item) {
    this.currentFarm = item;
    this.showEdit = true;
  }
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'PH',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: 0.4,
        },
        {
          label: 'DO',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: 0.4,
        },
        {
          label: 'Tempreture',
          data: [12, 30, 15, 75, 37, 40, 10],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          tension: 0.4,
        },
        {
          label: 'total fish',
          data: [22, 50, 55, 45, 27, 30, 20],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--red-400'),
          borderColor: documentStyle.getPropertyValue('--red-400'),
          tension: 0.4,
        },
        {
          label: 'weight',
          data: [18, 47, 59, 36, 28, 42, 15],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
          borderColor: documentStyle.getPropertyValue('--yellow-400'),
          tension: 0.4,
        },
        {
          label: 'oxygen saturation',
          data: [10, 39, 60, 53, 31, 25, 19],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--cayan-400'),
          borderColor: documentStyle.getPropertyValue('--cayan-400'),
          tension: 0.4,
        },
        {
          label: 'salinity',
          data: [33, 44, 58, 21, 37, 48, 16],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--orange-400'),
          borderColor: documentStyle.getPropertyValue('--orange-400'),
          tension: 0.4,
        },
        {
          label: 'electric conductivity',
          data: [29, 51, 64, 43, 26, 35, 12],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--gray-400'),
          borderColor: documentStyle.getPropertyValue('--gray-400'),
          tension: 0.4,
        },
        {
          label: 'average weight',
          data: [23, 49, 56, 46, 32, 38, 14],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--indigo-200'),
          borderColor: documentStyle.getPropertyValue('--indigo-200'),
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
  onGlobalFilter(event: any) {
    const value = event.target.value.toLowerCase();
    this.table.filterGlobal(value, 'contains');
  }
}
