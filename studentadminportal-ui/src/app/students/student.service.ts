import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentFormModel } from '../models/api-models/student-form.model';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = "https://localhost:7109/";

  constructor(private httpClient:HttpClient) { }

  getStudents():Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.url + "students");
  }
  getStudent(id:string):Observable<Student>{
    return this.httpClient.get<Student>(this.url + "students" + "/" + id);
  }

  updateStudent(studentId:string,student:StudentFormModel):Observable<Student>{
    return this.httpClient.put<Student>(this.url + "students/" + studentId,student);
  }
  deleteStudent(studentId:string):Observable<Student>{
    return this.httpClient.delete<Student>(this.url + "students/" + studentId);
  }
}
