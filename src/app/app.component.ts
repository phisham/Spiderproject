import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { HttpserviceService } from './http/httpservice.service';
import { FormControl, Validators } from "@angular/forms";

@HostListener('window:scroll', ['$event'])

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: HttpserviceService) {}
 
  title = 'portwork';
  show:boolean=false;
  show1:boolean=false;
  show2:boolean=false; 
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  loading = false;
  buttonText = "Submit";
  press(){
    this.show=!this.show;
  }
  press1(){
    this.show1=!this.show1;
  }
  press2(){
    this.show2=!this.show2;
  }
  forsubmit(){
    
      alert("Submitted successfully");
    
  }
  onWindowScroll() {
    
  }
  register() {
    this.loading = true;
    this.buttonText = "Submiting...";
    let user = {
      name: this.nameFormControl.value,
      
    }
    console.log(user.name);
    alert("submitted succesfully");
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
  }
}
