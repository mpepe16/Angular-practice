import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Caveman, CavemanService } from "../../data/infrastructure/caveman.services";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-caveman-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './caveman-list.component.html',
  styleUrls: ['./caveman-list.component.css']
})
export class CavemanListComponent implements OnInit {
  cavemen$!: Observable<Caveman[]>;

  constructor(private cavemanService: CavemanService) { }

  ngOnInit(): void {
    this.cavemen$ = this.cavemanService.getAllCavemen();
  }
}
