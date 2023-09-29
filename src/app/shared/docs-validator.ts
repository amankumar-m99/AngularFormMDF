import { AbstractControl, ValidatorFn } from "@angular/forms";

export function docsValidator():ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} | null =>{
        const compulsoryProfile = "Manager";
        const docs = control.get('docsCheck');
        const profile = control.get('profile');
        if(!docs?.value && profile?.value == compulsoryProfile){
            return {"invalidCheck" : true};
        }
        return null;
    };
}