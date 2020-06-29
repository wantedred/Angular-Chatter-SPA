import { Injectable } from '@angular/core';
import { Toaster } from 'src/app/shared/models/toaster';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  public issueToast(toaster: Toaster) {
    this.snackBar.open(toaster.message, toaster.actionText, {
      duration: toaster.duration,
      verticalPosition: toaster.verticalTypes,
      horizontalPosition: toaster.horizontalTypes,
    });
  }

}
