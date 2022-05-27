import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
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

  constructor(private readonly service:StudentService,private readonly route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.studentId = params.get('id');
    });
    if(this.studentId){
      this.service.getStudent(this.studentId).subscribe((result)=>{
        this.student = result;
      },
      (error:Response)=>{

      });
    }

  }

}
