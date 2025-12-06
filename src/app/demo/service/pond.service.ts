import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root',
})
export class PondService {
  url: string = 'http://143.110.233.153:80/api/pond';
  constructor(
    private http: HttpClient,
    private mockApiService: MockApiService,
  ) {}

  getPond(): Observable<any> {
    if (this.mockApiService.isMockMode()) {
      return this.mockApiService.getPonds();
    }
    return this.http.get<any>(this.url);
  }
}
