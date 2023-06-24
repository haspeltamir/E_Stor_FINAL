import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
logout() {
throw new Error('Method not implemented.');
}
  cartQuantity=0;
isAuth: any;
user: { name: string } = { name: "adam" };
}

