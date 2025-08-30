import { Component, OnInit } from '@angular/core';
import { JobService } from '../../recruiter/jobservice';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './jlist.html',
  styleUrls: ['./jlist.css']
})
export class Jlist implements OnInit {
  jobs: any[] = [];
  sortedJobs: any[] = [];
  sortedJobsBackup: any[] = [];
  loading = true;
  error = '';

  skill1 = '';
  skill2 = '';
  skill3 = '';
  selectedPriority: string = '';

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

  applySkillBasedPriority(): void {
    const s1 = this.skill1.toLowerCase().trim();
    const s2 = this.skill2.toLowerCase().trim();
    const s3 = this.skill3.toLowerCase().trim();

    const scoredJobs = this.jobs.map(job => {
      const jobSkills = job.skills?.split(',').map((s: string) => s.trim().toLowerCase()) || [];
      let priority = 4;

      if (jobSkills.includes(s1)) priority = 1;
      else if (jobSkills.includes(s2)) priority = 2;
      else if (jobSkills.includes(s3)) priority = 3;

      return { ...job, priority };
    });

    this.sortedJobs = scoredJobs.sort((a, b) => a.priority - b.priority);
    this.sortedJobsBackup = [...this.sortedJobs];
    this.selectedPriority = '';
  }

  filterByPriority(): void {
    if (this.selectedPriority === '') {
      this.sortedJobs = [...this.sortedJobsBackup];
    } else {
      const p = parseInt(this.selectedPriority);
      this.sortedJobs = this.sortedJobsBackup.filter(job => job.priority === p);
    }
  }
}
