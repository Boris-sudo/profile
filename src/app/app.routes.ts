import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about/about';
import { ContactsPageComponent } from './pages/contacts/contacts';
import { HomePageComponent } from './pages/home/home';
import { ProjectsPageComponent } from './pages/projects/projects';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contacts',
    component: ContactsPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
