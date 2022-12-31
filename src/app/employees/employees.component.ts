import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any;
  branches: any;
  viewSt: string = "view";

  form = new FormGroup({
    "name": new FormControl("", Validators.required),
    "age": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.email,Validators.required]),
    "phoneNumber": new FormControl("", Validators.required),
    "branchId": new FormControl("", Validators.required),
    "employId": new FormControl(),
    
});
 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('https://localhost:7192/api/Employ').subscribe(data => {
        this.employees = data;
    },error =>{alert("Error Can not Load Employees")})        
}

changestat(s:any,Data:any) {
  if(s === "add")
  {
    this.http.get<any>('https://localhost:7192/api/Branch').subscribe(data => {
        this.branches = data;
        this.viewSt = s;
    },error =>{alert("Error Can not Load Branches")})
  }
  else if (s === "edit")
  {
    this.http.get<any>('https://localhost:7192/api/Branch').subscribe(data => {
      this.branches = data;  
      this.form.controls['name'].setValue(Data.name);
      this.form.controls['age'].setValue(Data.age);
      this.form.controls['email'].setValue(Data.email);
      this.form.controls['phoneNumber'].setValue(Data.phoneNumber);
      this.form.controls['branchId'].setValue(Data.branchId);
      this.form.controls['employId'].setValue(Data.employId);
      this.viewSt = s;
    },error =>{alert("Error Can not Load Branches")})
    
  }
  
}

onSubmitModelBased() {
  var obj = {
    'name':this.form.value.name,
    'age':this.form.value.age,
    'email':this.form.value.email,
    'phoneNumber':this.form.value.phoneNumber,
    'branchId':this.form.value.branchId,
  }
  this.http.post<any>('https://localhost:7192/api/Employ',obj).subscribe(data => {
        this.employees = data;
        location.reload()
    },error =>{alert("Error Can not add employe")})
}

onEditModelBased() {
  this.http.put<any>('https://localhost:7192/api/Employ',this.form.value).subscribe(data => {
        this.employees = data;
        location.reload()
    },error =>{alert("Error Can not edit employe")})
}

Oncancel()
{
  location.reload()
}

Ondelete()
{
 var num =  this.form.controls.employId.value;
 var numst = num.toString();

  this.http.delete<any>('https://localhost:7192/api/Employ/'+numst).subscribe(data => {
          this.employees = data;
          location.reload()
      },error =>{alert("Error Can not delete employe")})
}

}
