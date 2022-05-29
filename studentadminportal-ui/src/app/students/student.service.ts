import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentFormModel } from '../models/api-models/student-form.model';
import { StudentPostFormModel } from '../models/api-models/student-post-form-model';
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
  addStudent(student:Student):Observable<Student>{

    let studentPostFormModel:StudentPostFormModel ={
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      mobile: student.mobile,
      email: student.email,
      genderId: student.genderId,
      physicalAddress: student.address.physicalAddress,
      postalAddress: student.address.postalAddress,
    }

    return this.httpClient.post<Student>(this.url + "Students",studentPostFormModel);
  }

  uploadImage(studentId:string,file:File ):Observable<any>{
    const formData = new FormData();
    formData.append("profileImage",file);

    return this.httpClient.post(this.url + "students/" + studentId + "/upload-image",formData,{
      responseType:"text"
    });
  }


  getImagePath(relativePath:string){
    return `${this.url}${relativePath}`;
  }
}
