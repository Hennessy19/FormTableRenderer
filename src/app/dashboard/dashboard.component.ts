import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { PersonModel } from '../person_dashboard';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Checkbox } from 'primeng/checkbox';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
formValue!:FormGroup;
showAdd! :boolean;
showUpdate! :boolean;

personModelObj:PersonModel=new PersonModel();
personData:any;
searchQuery='';

page=1;
pageSize=10;

// filteredData:any;


constructor(private formBuilder:FormBuilder,private api:ApiService){}
ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phoneNumber:[''],
      gender:['']
    })
    this.getAllPeople();

}

clickAddPerson(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;

}
postPersonDetails(){
  this.personModelObj.firstName=this.formValue.value.firstName;
  this.personModelObj.lastName=this.formValue.value.lastName;
  this.personModelObj.email=this.formValue.value.email;
  this.personModelObj.phoneNumber=this.formValue.value.phoneNumber;
  this.personModelObj.gender=this.formValue.value.gender;
  // this.personModelObj.firstNameLabel= this.formValue.

  this.api.postPerson(this.personModelObj).subscribe({
    next:res=>{
    alert("Person Added successfully")
    this.formValue.reset();
    this.getAllPeople();
    const ref=document.getElementById('cancel');
    ref?.click();

  },
  error:err=>{
    alert('Something went wrong')
  }})
}

getAllPeople(){
  this.api.getPerson()
  .subscribe(res=>{
    this.personData=res;
    console.log(res);
    res.forEach((ele: { firstName: any; }) => {
      console.log(ele.firstName)
      
    });
  })
}

deletePerson(row:any){
  this.api.deletePerson(row.id)
  .subscribe(res=>{
    alert("Person Has been deleted")
    this.getAllPeople();
  })
  
}
onEdit(row:any){
  this.personModelObj.id=row.id;

  this.showAdd=false;
  this.showUpdate=true;

  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
  this.formValue.controls['gender'].setValue(row.gender);

}
updatePersonDetails(){

  this.personModelObj.firstName=this.formValue.value.firstName;
  this.personModelObj.lastName=this.formValue.value.lastName;
  this.personModelObj.email=this.formValue.value.email;
  this.personModelObj.phoneNumber=this.formValue.value.phoneNumber;
  this.personModelObj.gender=this.formValue.value.gender;

  this.api.updatePerson(this.personModelObj,this.personModelObj.id)
  .subscribe({
    next:res=>{
      alert("Updated successfully");

    },error:err=>{
      alert("failed to update");
    }
  })
}

selectAction(){
  //delete all the selected records

  // get all the elements of input type checkbox
  // get the ones which are checked 
  // delete the ones which are cheked

  const checkboxes=document.querySelectorAll('input[type=checkbox]');
    let myArray=[];

  for(let i=0;i<checkboxes.length;i++){
    let checkbox=checkboxes[i];
    if(checkbox instanceof HTMLInputElement && checkbox.checked){
      //push the row into myArray as an object
      //pass the whole array into the delete people method

     
  
    }
  }
  
}



}