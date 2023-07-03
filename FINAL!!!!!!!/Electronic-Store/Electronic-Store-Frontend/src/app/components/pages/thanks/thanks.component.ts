import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent {
  constructor(private location: Location){ 
  }
  ngOnInit(): void {
    //we refresh the page so the cart number get removed because
    //the order was succefully 
    const pageRefreshed = sessionStorage.getItem('pageRefreshed');

    if (!pageRefreshed) {
      sessionStorage.setItem('pageRefreshed', 'true');
      this.refreshPage();
    } else {
      sessionStorage.removeItem('pageRefreshed');
    }
  }
  refreshPage(): void {
    window.location.reload();
  }

}


