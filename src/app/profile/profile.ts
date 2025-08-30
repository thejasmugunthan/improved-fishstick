import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  profileForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      preference: ['', Validators.required]
    });
  }

  submit() {
  if (this.profileForm.invalid) {
    this.message = '⚠️ Please fill all fields correctly.';
    return;
  }

  const payload = this.profileForm.value;
  console.log('Submitting payload:', payload);  // Add this

  this.http.post('http://localhost:3000/api/profile', payload).subscribe({
    next: () => {
      this.message = '✅ Profile saved successfully!';
      this.profileForm.reset();
    },
    error: (err) => {
      console.error('❌ Error submitting profile:', err);
      this.message = '❌ Failed to save profile.';
    }
  });
}
}