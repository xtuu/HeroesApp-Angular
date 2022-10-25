import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.intercafe';
import { HeroesService } from '../../services/heroes.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
        .subscribe(heroe => this.mostrarSnakbar('Registro actualizado'))
    } else {
      //crear
      this.heroeServices.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnakbar('Registro creado')
        })
    }
  }

  eliminar() {


    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    })

    dialog.afterClosed().subscribe(
      (resultado) => {
        if (resultado) {
          this.heroeServices.eliminarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes'])
            })
        }
      }
    )

  }

  mostrarSnakbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
