import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'src/app/movie-list/movie-list.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(movies: Movie[], filter: {genre: string}): Movie[] {
    if (!movies || !filter || !filter.genre) {
      return movies;
    }
    return movies.filter(movie => movie.genres.some(genre => genre === filter.genre));
  }

}
