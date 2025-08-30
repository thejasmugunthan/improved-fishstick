import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Home } from './home/home';
import { Jobseeker } from './job_seeker/jobseeker/jobseeker';
import { Resume } from './job_seeker/resume/resume';
import { Rdashboard } from './recruiter/rdashboard/rdashboard';
import { PostJob } from './recruiter/post-job/post-job';
import { Rview } from './recruiter/rview/rview';
import { Rapplicants } from './recruiter/rapplicants/rapplicants';
import { provideRouter} from '@angular/router';
import { Signup } from './signup/signup';
import { Jlist } from './job_seeker/jlist/jlist';
import { Profile } from './profile/profile';
import { Detials } from './recruiter/detials/detials';
import { Setting } from './setting/setting';

export const routes: Routes = [
    {
        path:'',component:Dashboard
    },
        {
        path:'login',component:Login
    },
    {
        path:'signup', component:Signup
    },
    {
        path:'home',component:Home
    },
    {
        path:'jobseeker', component:Jobseeker
    },
    {
        path:'detials', component:Detials
    },
    {
        path:'resume', component:Resume
    },
    {
        path:'rdashboard', component:Rdashboard
    },
    {
        path:'post-job', component:PostJob
    },
    {
        path:'rview', component:Rview
    },
    {
        path:'rapplicants', component:Rapplicants
    },
    {
        path:'jlist', component:Jlist
    },
    {
        path:'profile', component:Profile
    },
    {
        path:'dashboard', component:Dashboard
    },
    {
        path:'settings', component:Setting
    }
];

export const appRouter = provideRouter(routes);
