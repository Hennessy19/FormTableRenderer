import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

   contents:any;
   form:any=document.querySelector('formX')
   
 

 
renderForm(){
  // different components can be rendered 
  //Each component obtained from the reading the file 
  // function for creating each component 
  // Switch statement to cater for different cases
  this.contents['components'].forEach((component: any) => {

    switch(component.type){
      case 'textfield': 
      this.createTextField(component);
      break;
      case 'radio':
        createRadiobutton(component);
        break;
    }

  });
    
  }
  


readFile(){
  //gets the json generated from Camunda stored locally on the machine
  const fileInput:any=document.querySelector('input[type="file"]');
  fileInput.addEventListener('change',(event:any)=>{
      
    console.log('Event: ',event);

      const file=event.target.files[0];
      const fileName=file.name;
      const fileExtension=fileName.split('.').pop();

      if(fileExtension ==='json' || fileExtension==='JSON'){

          const reader = new FileReader();
          reader.addEventListener('load',(event:any)=>{
               this.contents=JSON.parse(event.target.result);
             console.log("Contents: ",this.contents);

          });
          reader.readAsText(file);
      }
      else{
          alert("We only want json files here!!!");
      }

  });
}
 
ngOnInit(): void {
    this.readFile()
    // this.renderForm()
    // const form=document.querySelector('formX')
}
 createTextField(component:any){
  const div=document.createElement('div')
  const text=document.createElement('input')
  text.type='text';
  text.id=component.id;
  const label=document.createElement('label');
  label.textContent=component.label;
  div.appendChild(label);
  div.appendChild(text);
  this.form.appendChild(div);
  
}
 

}


function createRadiobutton(component:any){

}