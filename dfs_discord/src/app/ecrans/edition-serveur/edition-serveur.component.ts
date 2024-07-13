import { Component, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Serveur } from '../../models/serveur.type';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { server } from 'typescript';

@Component({
  selector: 'app-edition-serveur',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortHeader,
    MatSort,
  ],
  templateUrl: './edition-serveur.component.html',
  styleUrl: './edition-serveur.component.scss',
})
export class EditionServeurComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  dataSource: any;

  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Serveur[]>('http://localhost:3000/serveur')
        .subscribe((listeServeur) => {
          this.dataSource = new MatTableDataSource(listeServeur);

          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        });
    }
  }

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', [Validators.maxLength(100)]],
    public: [false, []],
    urlLogo: ['', []],
  });

  onAjoutServeur() {
    if (this.formulaire.valid) {
      if(this.formulaire.value.urlLogo === '') {
        this.formulaire.value.urlLogo = 'data:image/png;base64,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';
      }
      const jwt = localStorage.getItem('jwt');
      this.http
        .post('http://localhost:3000/serveur', this.formulaire.value, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .subscribe(
          (nouveauServeur) => {
            this.snackBar.open('Le serveur a bien été ajouté', undefined, {
              duration: 3000,
            });
            this.router.navigateByUrl('/principal');
          },
          (error) => {
            this.snackBar.open('Erreur lors de la création du serveur', undefined, {
              duration: 3000,
            });
          },
        );
    }
  }

  onRejoindreServeur(serveur: Serveur) {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .post('http://localhost:3000/rejoindre-serveur', serveur)
        .subscribe((nouveauServeur) => {
          this.snackBar.open('Vous avez rejoins le serveur', undefined, {
            duration: 3000,
          });

          this.router.navigateByUrl('/principal');
        });
    }
  }
}
