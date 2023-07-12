import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

//page for login with login credentials
loginUsers: any[] =[];
signUpUsers: any[] =[];

loginObj:any ={
  userName: '',
  passWord: ''
}
signUpObj:any={
  userName:'',
  email: '',
  passWord: ''
}

ngOnInit(): void {
  
}
onSignUp(){
  this.signUpUsers.push(this.signUpObj);
  localStorage.setItem('signUpUsers',JSON.stringify(this.signUpUsers));
}

}
