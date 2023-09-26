import { Component, ElementRef, HostListener, Input } from "@angular/core";
import { Movie } from "../movie-list/movie-list.component";

@Component({
  selector: "app-preview-sidebar",
  templateUrl: "./preview-sidebar.component.html",
  styleUrls: ["./preview-sidebar.component.scss"],
})
export class PreviewSidebarComponent {
  @Input() movie: Movie;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}
  closePreview() {
    this.movie = null;
  }
}
