import { Component } from '@angular/core';
import { Employee } from './employee';
import { Address } from './address';
import { EmployeeRegistrationService } from './employee-registration.service';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  // employeeForm = new FormGroup({
  //   name: new FormControl('Aman'),
  //   phoneNumber: new FormControl(''),
  //   gender: new FormControl(''),
  //   profile: new FormControl(''),
  //   docsCheck: new FormControl(false),
  //   address: new FormGroup({
  //     houseNumber: new FormControl(''),
  //     city: new FormControl(''),
  //     pinCode: new FormControl('')
  //   })
  // });
  employeeForm:FormGroup;

  constructor(
    private _employeeRegistrationService:EmployeeRegistrationService,
    private formBuilder:FormBuilder
    ){
      this.employeeForm = this.formBuilder.group({
        name: ['Aman K', Validators.required],
        phoneNumber: [''],
        gender: [''],
        profile: [''],
        docsCheck: [false],
        address: this.formBuilder.group({
          houseNumber: [''],
          city: [''],
          pinCode: ['']
        })
      });
    }
  
  validateProfile(value:string){
    let found = false;
    this.employeeProfiles.forEach(profile=>{
      if(profile == value){
        found = true;
      }
    });
    this.profileHasError = !found;
  }

  submit(){
    console.log(this.employeeForm)
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
  setData(){
    this.employeeForm.setValue({
      name: 'Aman Kumar',
      phoneNumber: '8566953776',
      gender: 'male',
      profile: 'Developer',
      docsCheck: true,
      address: {
        houseNumber: '411',
        city: 'Noida',
        pinCode: '201301'
      }
    });
  }
  patchData(){
    this.employeeForm.patchValue({
      name: 'Aman',
      phoneNumber: '8566953776',
      address: {
        city: 'Noida',
        pinCode: '201301'
      }
    });
  }
}
