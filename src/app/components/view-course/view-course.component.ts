import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/services/web.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  courses = [ {id: 1, courseName:'',status:1}];
  admin ={};
  constructor(public service: WebService,private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin')){
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
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

  deleteCourse(id :number): void{
    const courseId = {id : id};
    this.service.postData('/deleteCourse', '', courseId).subscribe((data) => {
      if(data.code === 200) {
        this.retrieveCourse();
      }
    })
  }

}
