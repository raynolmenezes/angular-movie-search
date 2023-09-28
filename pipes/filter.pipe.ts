import { Pipe, PipeTransform } from "@angular/core";
import { Movie } from "src/app/movie-list/movie-list.component";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(movies: Movie[], filter: { genres: string[] }): Movie[] {
    if (
      !movies ||
      !filter ||
      !filter.genres ||
      filter.genres.length == 0 ||
      filter.genres.includes("")
    ) {
      return movies;
    }
    return movies.filter((movie) =>
      movie.genres.some((genre) => filter.genres.includes(genre))
    );
  }
}
