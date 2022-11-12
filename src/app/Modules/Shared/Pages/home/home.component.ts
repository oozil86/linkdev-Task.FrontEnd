import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }

	ngOnDestroy(): void {
  }

}
