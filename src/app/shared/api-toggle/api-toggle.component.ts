import { Component } from '@angular/core';
import { MockApiService } from '../../demo/service/mock-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-api-toggle',
  template: `
    <div class="api-toggle-container">
      <div class="field-checkbox">
        <p-checkbox
          [(ngModel)]="useMockData"
          [binary]="true"
          (onChange)="toggleApiMode()"
          inputId="mockToggle"
        >
        </p-checkbox>
        <label for="mockToggle" class="ml-2">
          <i class="pi pi-database mr-1"></i>
          Use Mock Data
        </label>
      </div>
      <small class="text-muted">
        {{ useMockData ? 'Using static mock data' : 'Using real API endpoints' }}
      </small>
    </div>
  `,
  styles: [
    `
      .api-toggle-container {
        padding: 0.5rem;
        border: 1px solid var(--surface-border);
        border-radius: 6px;
        background: var(--surface-card);
        margin-bottom: 1rem;
      }
      .field-checkbox {
        margin-bottom: 0.25rem;
      }
      label {
        font-weight: 500;
      }
    `,
  ],
})
export class ApiToggleComponent {
  useMockData: boolean = true;

  constructor(
    private mockApiService: MockApiService,
    private messageService: MessageService,
  ) {
    this.useMockData = this.mockApiService.isMockMode();
  }

  toggleApiMode(): void {
    this.mockApiService.setMockMode(this.useMockData);
    this.messageService.add({
      severity: 'info',
      summary: 'API Mode Changed',
      detail: this.useMockData ? 'Switched to mock data' : 'Switched to real API',
      life: 3000,
    });
  }
}
