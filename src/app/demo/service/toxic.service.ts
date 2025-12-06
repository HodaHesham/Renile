import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class ToxicService {
  url: string = 'http://143.110.233.153:80/api/predict/ammonia';
  toxicUrlTable: string = 'http://143.110.233.153:80/api/waterquality/ammonia/table';
  toxicUrlCahrt: string = 'http://143.110.233.153:80/api/waterquality/ammonia/chart';
  constructor(
    private http: HttpClient,
    private mockApiService: MockApiService,
  ) {}

  getToxicAmmoniaTable(startDate?: string, endDate?: string): Observable<any> {
    if (this.mockApiService.isMockMode()) {
      return this.mockApiService.getToxicAmmoniaTable(startDate, endDate);
    }
    let urlWithParams = this.toxicUrlTable;
    if (startDate && endDate) {
      urlWithParams += `?start_date=${startDate}&end_date=${endDate}`;
    }
    return this.http.get<any>(`${urlWithParams}`);
  }

  getToxicAmmoniaCahrt(startDate?: string, endDate?: string): Observable<any> {
    if (this.mockApiService.isMockMode()) {
      return this.mockApiService.getToxicAmmoniaChart(startDate, endDate);
    }
    let urlWithParams = this.toxicUrlCahrt;
    if (startDate && endDate) {
      urlWithParams += `?start_date=${startDate}&end_date=${endDate}`;
    }
    return this.http.get<any>(`${urlWithParams}`);
  }

  predictToxicAmmonia(formToxicData: any): Observable<any> {
    if (this.mockApiService.isMockMode()) {
      return this.mockApiService.predictToxicAmmonia(formToxicData);
    }
    return this.http.post<any>(this.url, formToxicData);
  }

  deleteToxic(id: any): Observable<any> {
    return this.http.delete(this.url + '/' + `${id}`);
  }

  editToxic(formData: any, id: any): Observable<any> {
    return this.http.patch(this.url + '/' + `${id}`, formData);
  }
}
