import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../models/user'

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder)
  public readonly data = inject(MAT_DIALOG_DATA)
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent, {user: User, isEdit: boolean}>)
  
  public form: FormGroup = this.fb.group({
    id: this.randomInteger(1, 1000),
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    website: ['', Validators.required],
  })

  randomInteger(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }

  ngOnInit(): void {
    this.form.patchValue(this.data.user)
  }

  submitForm(): void {
    this.dialogRef.close(this.form.value)
  }
}
