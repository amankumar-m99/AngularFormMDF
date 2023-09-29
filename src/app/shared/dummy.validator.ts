import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dummyValidator():ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null =>{
        return {"dummyValidator" : true};
    };
}