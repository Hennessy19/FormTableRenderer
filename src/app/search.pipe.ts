import { Pipe, PipeTransform } from '@angular/core';
import { PersonModel } from './person_dashboard';
import { DashboardComponent } from './dashboard/dashboard.component';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(People:PersonModel[],searchQuery:string): PersonModel[] {
   if(!People||!searchQuery){
    return People;
   }
   return People.filter((person: { firstName: string; })=> person.firstName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))||
          People.filter((person: { lastName: string; })=> person.lastName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))||
          People.filter((person: { email: string; })=> person.email.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
  }

}
