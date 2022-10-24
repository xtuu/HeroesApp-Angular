import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe } from '../../interfaces/heroes.intercafe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img {
    width :100%;
    border-radius : 5px;
  }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe

  constructor(
    private actiactivadRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.actiactivadRoute.params.pipe(
      switchMap(({ id }) => this.heroeService.getHeroePorId(id))
    ).subscribe(heroe => this.heroe = heroe)

  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }

}
