import { Component, OnInit } from '@angular/core';
import { JobService } from '../jobservice';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-rview',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './rview.html',
  styleUrl: './rview.css'
})
export class Rview implements OnInit {
  jobs: any[] = [];
  loading = true;
  error = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe({
      next: (res) => {
        this.jobs = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load jobs.';
        this.loading = false;
      }
    });
  }
}

