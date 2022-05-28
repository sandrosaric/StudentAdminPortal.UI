import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentFormModel } from 'src/app/models/api-models/student-form.model';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId :(string | undefined | null);
  student:Student = {
    id:"",
    firstName:"",
    lastName:"",
    dateOfBirth:"",
    email:"",
    mobile:0,
    genderId:"",
    profileImageUrl:"",
    gender:{
      id:"",
      description:"",

    },
    address:{
      id:"",
      physicalAddress:"",
      postalAddress:""
    }
  }

  genderList:Gender[] = [];

  isNewStudent = false;
  header = "";



  constructor(private readonly service:StudentService,
    private readonly route:ActivatedRoute,private readonly genderService:GenderService,
    private snackBar:MatSnackBar,
    private readonly router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.studentId = params.get('id');
    });
    if(this.studentId){
      if(this.studentId.toLowerCase() == "Add".toLowerCase()){
        this.isNewStudent = true;
        this.header = "Add new student";
      }
      else{
        this.header = "Edit student";
        this.isNewStudent = false;
        this.service.getStudent(this.studentId).subscribe((result)=>{
          this.student = result;
        },
        (error:Response)=>{

        });
      }

      this.genderService.getGenders().subscribe((result)=>{
        this.genderList = result;
      },
      (error:Response)=>{

      })
      }



  }

  onUpdate():void{
    let studentFormModel:StudentFormModel ={
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      dateOfBirth: this.student.dateOfBirth,
      mobile: this.student.mobile,
      email: this.student.email,
      genderId: this.student.genderId,
      physicalAddress: this.student.address.physicalAddress,
      postalAddress: this.student.address.postalAddress,
    }
    this.service.updateStudent(this.student.id,studentFormModel).subscribe(
      result =>{
        console.log(result);
        this.snackBar.open("Student updated successfully!",undefined,{duration:2000});
      },
      error => {

      }
    );
  }

  onDelete():void{
    this.service.deleteStudent(this.student.id).subscribe(
      result => {
        this.snackBar.open("Student deleted successfullly!",undefined,{duration:2000});
        setTimeout(()=>{
          this.router.navigateByUrl("/students");
        },2000)

      },
      (error:Response) => {

      }
    );
  }


  onAdd(){
    console.log(this.student);
    this.service.addStudent(this.student).subscribe(
      result =>{
        this.snackBar.open("Student successfully added!",undefined,{duration:2000});
        setTimeout(()=>{
          this.router.navigateByUrl("students");
        },2000);
        console.log(result);
      },
      error => {

      }
    );
  }
}
