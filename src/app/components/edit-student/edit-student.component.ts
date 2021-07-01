import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WebService } from 'src/services/web.service'
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm: FormGroup; 
  errorValid: boolean;
  id: any;
  private sub : any;
  courses = [{id:[],courseName : ['']}];
  student = {};
  admin = {};
  constructor(private formBuilder: FormBuilder, public service: WebService,private route: ActivatedRoute,private routes:Router) {
    this.studentForm = this.formBuilder.group({
  		studName: [''],
      courseId : [],
  		status: [1],
  	});
    
    this.errorValid = false;
   }

  ngOnInit(): void {
    if(localStorage.getItem('admin')){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
       //retrieve courses
      this.service.getData('/viewCourse').subscribe((response) => {
        this.courses = response;
      })
      //retrieve students
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
      })
      const id = {studCode : this.id};
      this.service.postData('/viewAStudent', '', id).subscribe((data) => {

          this.studentForm = this.formBuilder.group({
            studName: data.data[0].studName,
            courseId : data.data[0].courseId,
            status: [1],
          }); 
          this.errorValid = false;
    })
    }
    else{
      this.routes.navigate(['/home-page']);
    }

   
  }

  onSubmit(){

    if (this.studentForm.invalid) {
      this.errorValid = true;
    }
    else{
      const updateData = {studCode : this.id, data : this.studentForm.value};
      this.service.postData('/updateStudent', '', updateData).subscribe((data) => {
        if(data.code === 200) {
          this.studentForm = this.formBuilder.group({
            studName: [''],
            courseId : [],
            status: [1],
          });
          this.errorValid = false;
          this.routes.navigate(['/view-student']);

        }
      })
    }

    
  }

 

}
