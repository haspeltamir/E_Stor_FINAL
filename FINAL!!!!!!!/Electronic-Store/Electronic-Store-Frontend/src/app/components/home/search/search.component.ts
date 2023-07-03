import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchName = '';
  constructor(activatedRoute:ActivatedRoute,private router:Router){
    activatedRoute.params.subscribe((params)=>
    {
      if(params.searchName)
        this.searchName=params.searchName;
    })
  }

  search(name:string):void{
    if(name)
      this.router.navigateByUrl('/search/' + name);
      console.log('/search/' + name);
  }
}
