import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    feedUrlTable: string = 'http://143.110.233.153:80/api/waterquality/feed/table';
    feedUrlCahrt: string = 'http://143.110.233.153:80/api/waterquality/feed/chart';
    constructor(
        private http: HttpClient,
        private mockApiService: MockApiService
    ) { }
    
    getFeedRateTable(startDate?: string, endDate?: string): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.getFeedRateTable(startDate, endDate);
        }
        let urlWithParams = this.feedUrlTable;
        if (startDate && endDate) {
            urlWithParams += `?start_date=${startDate}&end_date=${endDate}`
        }
        return this.http.get<any>(`${urlWithParams}`);
    }
    
    getFeedRateChart(startDate?: string, endDate?: string): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.getFeedRateChart(startDate, endDate);
        }
        let urlWithParams = this.feedUrlCahrt;
        if (startDate && endDate) {
            urlWithParams += `?start_date=${startDate}&end_date=${endDate}`
        }
        return this.http.get<any>(`${urlWithParams}`);
    }
}
