import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Farm } from '../api/farm';
import { Observable } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable()
export class FarmsService {
    url: string = 'http://143.110.233.153:80/api/farms'
    constructor(
        private http: HttpClient,
        private mockApiService: MockApiService
    ) { }
    
    getFarms(): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.getFarms();
        }
        return this.http.get<any>(this.url);
    }
    
    createFarm(formData: any): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.createFarm(formData);
        }
        return this.http.post<any>(this.url, formData);
    }
    
    editFarm(formData: any, id: any): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.editFarm(formData, id);
        }
        return this.http.patch(this.url + "/" + `${id}`, formData);
    }
    
    deleteFarm(id: any): Observable<any> {
        if (this.mockApiService.isMockMode()) {
            return this.mockApiService.deleteFarm(id);
        }
        return this.http.delete(this.url + "/" + `${id}`);
    }
}
