import { Component } from '@angular/core';
import { AppServiceService } from 'src/services/app-service.service';
import { WebService } from 'src/services/web.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'stud';
    admin = {id: [], displayName: [''], email: [''], phoneNumber: [''], password: ['']};
    checkAdmin = false;
    submitted = false;
    notAdmin = false;
	  adminData = {
    	username: '',
    	password: ''
  	}

    constructor(public service: WebService,private route:Router){
    
    }

  ngOnInit(): void {
    if(localStorage.getItem('admin'))
    {
      this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
      this.checkAdmin = true;
    }
  }
  
  logout(): void{
  	localStorage.removeItem('admin');
  	this.submitted = false;
    this.checkAdmin = false;
    this.adminData = {
    	username: '',
    	password: ''
  	}
    this.admin = {id: [], displayName: [''], email: [''], phoneNumber: [''], password: ['']};
    this.route.navigate(['/home-page']);

  }

  verifyAdmin(): void {
     if(this.adminData.username=="" || this.adminData.password == ""){
      this.submitted = true;
    }
    else{
      const admindata = {
        username: this.adminData.username,
        password: this.adminData.password
      };

      this.service.postData('/checkAdmin', '', admindata).subscribe((data) => {
        if(data.code === 200 && data.data.length!==0) {
          localStorage.setItem("admin",JSON.stringify(data.data[0]));
          this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
          console.log(this.admin);
          this.checkAdmin = true;
        } 
        else{
          this.notAdmin = true;
        }
      })

      

    }
  }
  
  }

  
  

