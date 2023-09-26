import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MovieListComponent } from './movie-list/movie-list.component'
import { MovieDetailComponent } from './movie-detail/movie-detail.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
