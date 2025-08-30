import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rapplicants',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './rapplicants.html',
  styleUrl: './rapplicants.css'
})
export class Rapplicants implements OnInit {
  resumes: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/resumes').subscribe({
      next: (res) => {
        this.resumes = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load resumes.';
        this.loading = false;
      }
    });
  }

  viewResume(filePath: string) {
    if (filePath) {
      window.open(`http://localhost:3000/${filePath}`, '_blank');
    } else {
      alert('Resume file not found.');
    }
  }
}
