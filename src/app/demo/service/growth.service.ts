import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class GrowthService {
    growthUrl: string = 'http://143.110.233.153:80/api/waterquality/weight/table';
    constructor(
        private http: HttpClient,
        private mockApiService: MockApiService
    ) { }
    
    getGrowthRate(startDate?: string, endDate?: string): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.getGrowthRate(startDate, endDate);
        }
        return this.http.get<any>(`${this.growthUrl}?start_date=${startDate}&end_date=${endDate}`);
    }
}
