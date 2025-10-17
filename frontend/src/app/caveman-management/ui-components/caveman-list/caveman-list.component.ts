

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CavemanFacade } from "../../data/application/caveman.facade";
import { Caveman } from "../../data/entities/caveman";

@Component({
  selector: 'app-caveman-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './caveman-list.component.html',
  styleUrls: ['./caveman-list.component.css']
})
export class CavemanListComponent implements OnInit {

  cavemen$!: Observable<Caveman[]>; 

  constructor(private readonly cavemanFacade: CavemanFacade) { 
  }

  ngOnInit(): void {
    this.cavemen$ = this.cavemanFacade.allCavemans$;
    this.cavemanFacade.loadAllCavemans(); 
  }
}