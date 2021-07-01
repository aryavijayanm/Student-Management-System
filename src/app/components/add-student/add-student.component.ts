import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WebService } from 'src/services/web.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup; 
  subStatus: boolean;
  errorValid : boolean;
  admin = {};
  courses = [{id:[],courseName : ['']}];

  constructor(private formBuilder: FormBuilder, public service: WebService,private route:Router) {
    this.studentForm = this.formBuilder.group({
  		studName: [''],
      courseId : [],
  		status: [1],
  	});
    this.subStatus = false;
    this.errorValid = false;
    
   }

  ngOnInit(): void {
    if(localStorage.getItem('admin')){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
      this.subStatus = false;
      this.errorValid = false;
      this.retrieveCourse();
    }
    else{
      this.route.navigate(['/home-page']);
    }
  }

  retrieveCourse():void{
    this.service.getData('/viewCourse').subscribe((response) => {
      this.courses = response;
    })
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.errorValid = true;
    }
    else{
      this.subStatus = false;
      this.service.postData('/studentInsert', '', this.studentForm.value).subscribe((data) => {
        if(data.code === 200) {
          this.subStatus = true;
          this.studentForm = this.formBuilder.group({
            studName: [''],
            courseId : [],
            status: [1],
          });
          this.errorValid = false;
        }
      })
    }
  }

}
