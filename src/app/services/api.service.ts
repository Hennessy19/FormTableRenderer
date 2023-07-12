import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  postPerson(data:any){
    return this.http.post<any>("http://localhost:3000/posts/",data) 
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deletePerson(id:number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getPerson(){
    return this.http.get<any>('http://localhost:3000/posts')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updatePerson(data:any, id:number){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addData(data:any){
    return this.http.post<any>("http://localhost:3000/posts/",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deletePeople(ids:number[]):Observable<any[]>{
    const deleteRequests:Observable<any>[]=[];
    for(let i=0;i<ids.length;i++){
      const deleteRequest= this.http.delete<any>('http://localhost:3000/posts/'+ids[i]);
      deleteRequests.push(deleteRequest);

    }
    return forkJoin(deleteRequests);
  }
  
}
