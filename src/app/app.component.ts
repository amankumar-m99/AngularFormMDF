import { Component } from '@angular/core';
import { Employee } from './employee';
import { Address } from './address';
import { EmployeeRegistrationService } from './employee-registration.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeProfiles = ["Developer", "Tester", "Bussiness Analyst", "Manager"];
  employeeModel = new Employee("","","",false, new Address("", "", ""));
  profileHasError = true;
  formData:any = [];
  modalTitle = "";
  modalTitleStyleClass = "";
  modalBody = "";
  modalStyleClass = "";
  constructor(private _employeeRegistrationService:EmployeeRegistrationService){}
  
  validateProfile(value:string){
    let found = false;
    this.employeeProfiles.forEach(profile=>{
      if(profile == value){
        found = true;
      }
    });
    this.profileHasError = !found;
  }

  submit(employeeForm?:NgForm){
    console.log(employeeForm)
    this.formData.push(this.employeeModel);
    this._employeeRegistrationService.registerEmployee(this.employeeModel)
        .subscribe(
          data=>{
            this.modalTitle="Success";
            this.modalTitleStyleClass="text-sucess";
            this.modalBody = "Form submitted successfully."
            this.modalStyleClass="btn-success";
            ($('#staticBackdrop') as any).modal('show');
            // console.log("Success",data);
            // this.employeeModel=new Employee("","","",false, new Address("", "", ""));
            // employeeForm.reset();
          },
          error=> {
            this.modalTitle = "Error " + error.status + ": "+ error.statusText;
            this.modalTitleStyleClass = "text-danger";
            this.modalBody = error.message;
            this.modalStyleClass="btn-danger";
            ($('#staticBackdrop') as any).modal('show');
            // console.log("Error!", error);
          }
        );
  }
}
