import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { AideComponent } from './aide/aide.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'aide', component: AideComponent},
  {path: 'not-found', component: FourOfourComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
