import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private useMockData = true; // Set to false to use real APIs

  constructor(private http: HttpClient) {}

  // Mock API method that simulates network delay
  private getMockData(dataFile: string): Observable<any> {
    return this.http.get<any>(`assets/demo/data/${dataFile}`).pipe(
      delay(300), // Simulate network delay
    );
  }

  // Method to toggle between mock and real APIs
  setMockMode(useMock: boolean): void {
    this.useMockData = useMock;
  }

  isMockMode(): boolean {
    return this.useMockData;
  }

  // Generic method to get data with fallback to mock
  getData(realApiCall: () => Observable<any>, mockDataFile: string): Observable<any> {
    if (this.useMockData) {
      return this.getMockData(mockDataFile);
    }
    return realApiCall();
  }

  // Specific mock data getters
  getFarms(): Observable<any> {
    return this.getMockData('farms.json');
  }

  getPonds(): Observable<any> {
    return this.getMockData('ponds.json');
  }

  getFeedRateTable(startDate?: string, endDate?: string): Observable<any> {
    return this.getMockData('feed-rate-table.json');
  }

  getFeedRateChart(startDate?: string, endDate?: string): Observable<any> {
    return this.getMockData('feed-rate-chart.json');
  }

  getGrowthRate(startDate?: string, endDate?: string): Observable<any> {
    return this.getMockData('growth-rate.json');
  }

  getToxicAmmoniaTable(startDate?: string, endDate?: string): Observable<any> {
    return this.getMockData('toxic-ammonia-table.json');
  }

  getToxicAmmoniaChart(startDate?: string, endDate?: string): Observable<any> {
    return this.getMockData('toxic-ammonia-chart.json');
  }

  getDeathRate(): Observable<any> {
    return this.getMockData('death-rate.json');
  }

  // Mock prediction for toxic ammonia
  predictToxicAmmonia(formData: any): Observable<any> {
    const mockPrediction = {
      status: 'success',
      data: {
        prediction: Math.random() > 0.7 ? 'High Risk' : 'Low Risk',
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        ammonia_level: (Math.random() * 0.5 + 0.1).toFixed(3),
        recommendation: Math.random() > 0.5 ? 'Increase water circulation' : 'Monitor closely',
        timestamp: new Date().toISOString(),
      },
    };
    return of(mockPrediction).pipe(delay(800));
  }

  // Mock farm operations
  createFarm(formData: any): Observable<any> {
    const mockResponse = {
      status: 'success',
      message: 'Farm created successfully',
      data: {
        ...formData,
        id: `farm-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    return of(mockResponse).pipe(delay(500));
  }

  editFarm(formData: any, id: any): Observable<any> {
    const mockResponse = {
      status: 'success',
      message: 'Farm updated successfully',
      data: {
        ...formData,
        id: id,
        updatedAt: new Date().toISOString(),
      },
    };
    return of(mockResponse).pipe(delay(500));
  }

  deleteFarm(id: any): Observable<any> {
    const mockResponse = {
      status: 'success',
      message: 'Farm deleted successfully',
      deletedId: id,
    };
    return of(mockResponse).pipe(delay(300));
  }
}
