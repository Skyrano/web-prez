import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { AideComponent } from './aide/aide.component';
import { MentionLegalesComponent } from './mention-legales/mention-legales.component';


const routes: Routes = [   //on créé une table de routing des différentes vues
  {path: '', component: MainComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'aide', component: AideComponent},
  {path: 'mention_legales', component: MentionLegalesComponent},
  {path: 'not-found', component: FourOfourComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({     //on indique au module de rootage notre table de routing
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
