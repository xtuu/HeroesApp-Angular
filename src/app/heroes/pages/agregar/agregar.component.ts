import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.intercafe';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px
  }`]
})

export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(
    private heroeServices: HeroesService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) { return; }
    this.activatedRouter.params.pipe(
      switchMap(({ id }) => this.heroeServices.getHeroePorId(id))
    ).subscribe(heroe => this.heroe = heroe)

  }


  guardar() {

    if (this.heroe.superhero.trim().length === 0) { return; }

    if (this.heroe.id) {
      //actualizar
      this.heroeServices.editarHeroe(this.heroe)
        .subscribe(heroe => console.log('Actulizando', heroe))
    } else {
      //crear
      this.heroeServices.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
        })
    }



  }

}
