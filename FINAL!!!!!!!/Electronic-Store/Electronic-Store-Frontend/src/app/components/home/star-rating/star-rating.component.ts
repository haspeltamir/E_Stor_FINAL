import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})

export class StarRatingComponent {

  @Input()
  stars!: number;
  
  size: number = 1;

  get styles() {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight.rem': this.size / 6,
    }
  }

  getStarImage(current: number): string{
    const imageName =
    current<2
    ? 'star-full'
    : current<3
    ? 'star-half'
    : 'star-empty';
    return `../../../../assets/${imageName}.svg`;
  }

}
