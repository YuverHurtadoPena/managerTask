import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable()
export class CustomValidators {
  static spaceValidator(control: FormControl) {
    if ((control.value || "").trim().length === 0) {
      return { havespace: true };
    }

    return null;
  }
}
