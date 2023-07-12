import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router: Router){}

  ngOnInit(): void {
   this.signUpForm=this.formBuilder.group({
    email:[''],
    firstName:[''],
    lastName:[''],
    password:['']
   })
      
  }
  signUp(){
    this.http.post<any>('http://localhost:3000/signUpUsers',this.signUpForm.value)
    .subscribe({
      next:res=>{
        alert('Sign Up complete')
        this.signUpForm.reset();
        this.router.navigate(['login'])
      },   
      error:err=>{
        alert('A problem has occured')
      }  
    })

  }

}


