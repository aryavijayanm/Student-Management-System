import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'add-student', component: AddStudentComponent },
  { path: 'view-student', component: ViewStudentComponent },
  { path:  'add-course', component: AddCourseComponent},
  { path:  'view-course', component: ViewCourseComponent},
  { path:  'home-page', component: HomePageComponent} ,
  { path:  'edit-student/:id', component: EditStudentComponent} 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
