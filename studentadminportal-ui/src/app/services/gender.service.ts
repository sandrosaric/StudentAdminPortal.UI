import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private url = "https://localhost:7109/";
  constructor(private httpClient:HttpClient) { }

  getGenders():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.url  + "genders");
  }
}
