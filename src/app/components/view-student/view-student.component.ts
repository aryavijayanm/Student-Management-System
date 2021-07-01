import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/services/web.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  students = [{courseId: [],courseName: [''],id: [],status:[],studCode:[],studName:['']}];
  admin = {};
  constructor(public service: WebService,private route:Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('admin')){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
      this.retrieveStudents();
    }
    else{
      this.route.navigate(['/home-page']);
    }
  }

  retrieveStudents():void{
    this.service.getData('/viewStudents').subscribe((response) => {
      this.students = response;
    })
  }
  
  deleteStudent(data : any){
    const studCode = {studCode : data.studCode};
    this.service.postData('/deleteStudent', '', studCode).subscribe((data) => {
      if(data.code === 200) {
        this.retrieveStudents();
      }
    })
  }

  editStudent(data: any){
    this.route.navigate(['/edit-student',data.studCode]);
  }

  


}
