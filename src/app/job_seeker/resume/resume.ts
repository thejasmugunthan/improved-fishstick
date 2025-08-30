import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resume.html',
  styleUrls: ['./resume.css']
})
export class Resume {
  formData = {
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    work_experience: ''
  };
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (Object.values(this.formData).some(field => !field.trim())) {
      this.message = 'All fields are required.';
      return;
    }

    this.http.post('http://localhost:3000/api/resume', this.formData).subscribe({
      next: () => {
        this.message = '✅ Resume submitted successfully!';
        this.formData = {
          name: '',
          email: '',
          phone: '',
          education: '',
          skills: '',
          work_experience: ''
        };
      },
      error: err => {
        console.error('🔴 Error posting resume:', err);
        this.message = err.error?.message || '❌ Failed to post resume.';
      }
    });
  }
  
}
