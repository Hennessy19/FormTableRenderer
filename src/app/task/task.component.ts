import { Component, ViewChild,ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { task } from '../task';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private api:ApiService,private formBuilder:FormBuilder){}
   
  formValue!:FormGroup;
  formObject:task=new task();

  collection:any[]=[];

  options=[{name:'Racheal',value:'Racheal'},{name:'Iperu',value:'Iperu'},{name:'Cris',value:'Cris'}]

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      email:['']
    })
}

  submitForm(){
    this.formObject.name=this.formValue.value.name;
    this.formObject.email=this.formValue.value.email;
    
    console.log(this.formObject);
    // const name=JSON.parse(this.formObject.name)

    // console.log("Here: ",name);

    this.api.addData(this.formObject).subscribe({
      next:res=>{
      console.log('That is kawa')
      
    },error:err=>{
      // console.log('That is not kawa');
      console.warn('Its not looking good bruv!!');
      
    }
  })
    // const form=document.getElementById('myForm');
    
    const inputs= document.querySelectorAll('input');

    for(let i= 0; i<inputs.length;i++){
         let variables={}

        const input= inputs[i];
        let id=input.id;
        let label=document.querySelector('label[for="'+ id+ '"]')?.innerHTML
        let value=input.value
        let type= input.type

        variables={key:label,id:id,value:value,type:type};
        this.collection.push(variables);

        console.log(variables);

        
        console.log("label: ", label)
        console.log("Value :", value)
        console.log('ID: ',id)
        console.log('Type ',type)

    }
    console.log("Collection ",this.collection) 

    console.log('JSON ',JSON.stringify(this.collection))
        

  }

}
