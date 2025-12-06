import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FeedService } from '../../service/feed.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-feed-rate',
  templateUrl: './feed-rate.component.html',
  styleUrl: './feed-rate.component.scss',
})
export class FeedRateComponent implements OnInit, OnDestroy {
  feedDialog: boolean = false;
  feeds: any[] = [];
  feedCols: any[];
  chartData: any;
  chartOptions: any;
  subscription: Subscription;

  dateRangeForm: FormGroup;
  chartInfo: any;

  constructor(
    private layoutService: LayoutService,
    private FeedService: FeedService,
    private formBuilder: FormBuilder,
    private MessageService: MessageService,
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initCharts();
      });
  }
  ngOnInit() {
    this.getFeedRateChart();
    this.getFeedRateTable();
    this.feedCols = [
      { field: 'date', header: 'date' },
      { field: 'ph', header: 'ph' },
      { field: 'dissolved_oxygen', header: 'dissolved_oxygen' },
      { field: 'temperature', header: 'temperature' },
      { field: 'ammonia', header: 'ammonia' },
      { field: 'weight', header: 'weight' },
      { field: 'results', header: 'results' },
    ];
    this.dateRangeForm = this.formBuilder.group({
      rangeDates: [[]],
    });
  }
  openNew() {
    this.feedDialog = true;
  }
  hideDialog() {
    this.feedDialog = false;
  }
  saveCast() {
    this.feedDialog = false;
  }
  getFeedRateTable() {
    let startDate = this.dateRangeForm?.value?.rangeDates[0];
    let endDate = this.dateRangeForm?.value?.rangeDates[1];
    this.FeedService.getFeedRateTable(startDate, endDate).subscribe((res) => {
      if (res.status == 'success') {
        this.feeds = res.data;
      }
    });
  }
  getFeedRateChart() {
    let startDate = this.dateRangeForm?.value?.rangeDates[0];
    let endDate = this.dateRangeForm?.value?.rangeDates[1];
    this.FeedService.getFeedRateChart(startDate, endDate).subscribe((res) => {
      if (res.status == 'success') {
        this.chartInfo = res.data;
        this.initCharts();
      }
    });
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Check if chartInfo exists before using it
    if (!this.chartInfo) {
      this.chartData = {
        labels: [],
        datasets: [],
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
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: 0.4,
        },
        {
          label: 'DO',
          data: this.chartInfo.do || [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: 0.4,
        },
        {
          label: 'Temperature',
          data: this.chartInfo.temperature || [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          tension: 0.4,
        },
        {
          label: 'Ammonia',
          data: this.chartInfo.ammonia || [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--orange-400'),
          borderColor: documentStyle.getPropertyValue('--orange-400'),
          tension: 0.4,
        },
        {
          label: 'Predicted Feed',
          data: this.chartInfo.predicted_feed || [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: 0.4,
        },
        {
          label: 'Weight',
          data: this.chartInfo.weight || [],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--teal-600'),
          borderColor: documentStyle.getPropertyValue('--teal-600'),
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
        this.getFeedRateTable();
        this.getFeedRateChart();
      } else {
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

  editItem(item: any) {
    console.log(item);
  }
}
