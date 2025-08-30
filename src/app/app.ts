import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Home } from './home/home';
import { Jobseeker } from './job_seeker/jobseeker/jobseeker';
import { Resume } from './job_seeker/resume/resume';
import { Rdashboard } from './recruiter/rdashboard/rdashboard';
import { PostJob } from './recruiter/post-job/post-job';
import { Rview } from './recruiter/rview/rview';
import { HttpClientModule } from '@angular/common/http';
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Jlist } from './job_seeker/jlist/jlist';
import { Profile } from './profile/profile';
import { Detials } from './recruiter/detials/detials';
import { Setting } from './setting/setting';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [HttpClientModule,FormsModule,RouterOutlet,Detials,Dashboard,Login,Home,Jobseeker,Resume,Rdashboard,Profile,Jlist,PostJob,Rview,Setting],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'InternLink';
 

}
