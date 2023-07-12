import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { PersonModel } from '../person_dashboard';
import { ApiService } from '../services/api.service';
import { first } from 'rxjs';

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
filteredData:any;


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
    this.filteredData= this.personData
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

onSearch(){
  // this.filteredData = this.personData.filter((item: { firstName: string; }) =>
  //   item.firstName.toLowerCase().includes(this.searchQuery.toLowerCase())
  // );
}



}
