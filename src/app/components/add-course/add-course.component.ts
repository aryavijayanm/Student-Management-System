import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WebService } from 'src/services/web.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  subStatus: boolean;
  errorValid : boolean;
  admin = {};

  constructor(private formBuilder: FormBuilder, public service: WebService,private route:Router) {
    this.subStatus = false;
    this.errorValid = false;
    this.courseForm = this.formBuilder.group({
  		courseName: [''],
  		status: [1],
  	});
   }

  ngOnInit(): void {
    if(localStorage.getItem('admin')){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    }
    else{
      this.route.navigate(['/home-page']);
    }
   } 
    
  onSubmit() {
    if(this.courseForm.invalid){
      this.errorValid = true;
    }
    else{
      this.subStatus = false;
      this.service.postData('/courseInsert', '', this.courseForm.value).subscribe((data) => {
        if(data.code === 200) {
          this.subStatus = true;
          this.courseForm = this.formBuilder.group({
            courseName: [''],
            status: [1],
          });
          this.errorValid = false;
        }
      })
    }
  
  }

}
