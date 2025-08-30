import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-job.html',
  styleUrls: ['./post-job.css']
})
export class PostJob {
  jobData = {
    title: '',
    company: '',
    location: '',
    type: '',
    skills: '',
    description: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (Object.values(this.jobData).some(field => !field.trim())) {
      this.message = 'Please fill in all fields.';
      return;
    }

    this.http.post('http://localhost:3000/api/jobs', this.jobData).subscribe({
      next: () => {
        alert('✅ Job posted successfully!');
        this.jobData = {
          title: '',
          company: '',
          location: '',
          type: '',
          skills: '',
          description: ''
        };
        this.message = '';
      },
      error: (err) => {
        console.error('🔴 Error posting job:', err);
        this.message = err.error?.message || '❌ Failed to post job.';
      }
    });
  }
}