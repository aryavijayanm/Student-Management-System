import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { HttpClientModule } from '@angular/common/http';
//import { AdminFormComponent } from './admin-form/admin-form.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    AddStudentComponent,
    ViewStudentComponent,
    EditStudentComponent,
    ViewCourseComponent,
   // AdminFormComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
