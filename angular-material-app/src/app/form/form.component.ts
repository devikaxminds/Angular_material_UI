import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface User {
  name: string;
  email: string;
  phone: string;
  country: string;
}

@Component({
  selector: 'app-user-dialog',
  template: `
    <h2 mat-dialog-title>User Details</h2>
    <mat-dialog-content>
      <div class="user-details">
        <p><strong>Name:</strong> {{data.name}}</p>
        <p><strong>Email:</strong> {{data.email}}</p>
        <p><strong>Phone:</strong> {{data.phone}}</p>
        <p><strong>Country:</strong> {{data.country}}</p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
      <button mat-button mat-dialog-close="delete" color="warn">Delete</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class UserDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  
  contactForm: FormGroup;
  
  displayedColumns: string[] = ['name', 'email', 'phone', 'country', 'actions'];
  dataSource = new MatTableDataSource<User>([
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', country: 'United States' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', country: 'Canada' },
    { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567', country: 'United Kingdom' }
  ]);

  countries = [
    { value: 'us', viewValue: 'United States' },
    { value: 'uk', viewValue: 'United Kingdom' },
    { value: 'ca', viewValue: 'Canada' },
    { value: 'au', viewValue: 'Australia' },
    { value: 'de', viewValue: 'Germany' },
    { value: 'fr', viewValue: 'France' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly dialog: MatDialog) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newsletter: [false]
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      
      // Add the form data to the table
      const countryName = this.countries.find(c => c.value === formData.country)?.viewValue || formData.country;
      const newUser: User = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: countryName
      };
      
      // Update the MatTableDataSource
      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newUser];
      
      console.log('Form Data:', formData);
      alert('Form submitted successfully and added to table!');
      this.contactForm.reset();
    }
  }

  // Filter functionality
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUserDialog(user: User, index: number) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteUser(index);
      }
    });
  }

  deleteUser(index: number) {
    const currentData = this.dataSource.data;
    currentData.splice(index, 1);
    this.dataSource.data = [...currentData];
  }
}
