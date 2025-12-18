

import { Component, inject, OnInit } from '@angular/core';
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
export class CavemanListComponent implements OnInit  {
  private readonly cavemanFacade: CavemanFacade = inject (CavemanFacade);
  cavemen$: Observable<Caveman[]> = this.cavemanFacade.allCavemans$;
  isLoading$: Observable<boolean> = this.cavemanFacade.isLoading$;
  error$: Observable<string | null> = this.cavemanFacade.error$; 
  constructor() { 
  }
  ngOnInit(): void {
    this.cavemanFacade.loadCavemen(); 
  }

}