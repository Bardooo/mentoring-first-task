import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { User } from '../../models/user';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatInputModule,
    MatDialogTitle,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
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

  onSubmit(): void {
    this.dialogRef.close(this.form.value)
  }
}
