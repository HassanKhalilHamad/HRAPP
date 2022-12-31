import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  employees: any;
  branches: any;
  viewSt: string = "view";

  form = new FormGroup({
    "name": new FormControl("", Validators.required),
    "buldingNum": new FormControl("", Validators.required),
    "street": new FormControl("", Validators.required),
    "area": new FormControl("", Validators.required),
    "city": new FormControl("", Validators.required),
    "branchId": new FormControl(),
    "country": new FormControl("", Validators.required),
    
});

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('https://localhost:7192/api/Branch').subscribe(data => {
        this.branches = data;
    },error =>{alert("Error Can not Load Branches")}) 
  }

  changestat(s:any,Data:any) {
    if(s === "add")
    {
      this.viewSt = s;
    }
    else if (s === "edit")
  { 
      this.form.controls['name'].setValue(Data.name);
      this.form.controls['buldingNum'].setValue(Data.buldingNum);
      this.form.controls['street'].setValue(Data.street);
      this.form.controls['area'].setValue(Data.area);
      this.form.controls['city'].setValue(Data.city);
      this.form.controls['branchId'].setValue(Data.branchId);
      this.form.controls['country'].setValue(Data.country);
      this.viewSt = s;
    
  }
    
  }

  onSubmitModelBased() {
    var obj = {
      'name':this.form.value.name,
      'buldingNum':this.form.value.buldingNum,
      'street':this.form.value.street,
      'area':this.form.value.area,
      'city':this.form.value.city,
      'country':this.form.value.country,
    }
    this.http.post<any>('https://localhost:7192/api/Branch',obj).subscribe(data => {
          this.branches = data;
          location.reload()
      },error =>{alert("Error Can not add branch")})
  }

  onEditModelBased() {
    this.http.put<any>('https://localhost:7192/api/Branch',this.form.value).subscribe(data => {
          this.branches = data;
          location.reload()
      },error =>{alert("Error Can not edit employe")})
  }

  Oncancel()
{
  location.reload()
}

Ondelete()
{
 var num =  this.form.controls.branchId.value;
 var numst = num.toString();

  this.http.delete<any>('https://localhost:7192/api/Branch/'+numst).subscribe(data => {
          this.employees = data;
          location.reload()
      },error =>{alert("Error Can not delete employe")})
}

}
