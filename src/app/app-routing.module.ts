import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailsComponent } from './song-details/song-details.component';
import { SongListComponent } from './song-list/song-list.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'songs',
    component: SongListComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'songs/:songId',
    component: SongDetailsComponent,
  },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
