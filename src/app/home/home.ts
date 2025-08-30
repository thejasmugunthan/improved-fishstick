import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
      constructor(private router: Router) {}

  getjob() {
    this.router.navigate(['./jobseeker']);
  }
  getrecruiter()
  {
    this.router.navigate(['./rdashboard']);
  }

}
