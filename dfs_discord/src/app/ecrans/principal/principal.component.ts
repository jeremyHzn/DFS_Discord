import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Serveur } from '../../models/serveur.type';
import { Salon } from '../../models/salon.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Message } from '../../models/message.type';
import { Utilisateur } from '../../models/utilisateur.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  listeServeur: Serveur[] = [];
  listeSalon: Salon[] = [];
  listeMessage: Message[] = [];
  // utilisateur: Utilisateur = {} as Utilisateur;
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);

  selectedServeur: string = '';
  selectedSalon: string = '';
  selectedSalonNom: string = '';

  showMessageInput: boolean = true;

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
  });

  formulaireMessage: FormGroup = this.formBuilder.group({
    contenu: [''],
  });

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => (this.listeServeur = listeServeur));

      this.http
        .get<Salon[]>('http://localhost:3000/salon/possede')
        .subscribe((listeSalon) => ( this.listeSalon = listeSalon));
    }
  }

  onSelectionServeur(serveurId: string) {
    this.selectedServeur = serveurId;
    this.showMessageInput = false;
  }

  onSelectionSalon(salonId: string, selectedSalonNom: string) {
    this.showMessageInput = true;
    this.selectedSalon = salonId;
    this.selectedSalonNom = selectedSalonNom;
    this.loadMessages(salonId);
  }

  loadMessages(salonId: string) {
    this.http
      .get<Message[]>(`http://localhost:3000/message/${salonId}`)
      .subscribe((messages) => {(this.listeMessage = messages)});
  }

  onCreateMessage() {
    const jwt = localStorage.getItem('jwt');

    if (jwt && this.selectedSalon) {
      const messageData = {
        contenu: this.formulaireMessage.get('contenu')?.value,
        salon: this.selectedSalon
      };

      this.http
        .post('http://localhost:3000/message', messageData)
        .subscribe((nouveauMessage) => {
          this.listeMessage.push(nouveauMessage as Message);
          this.formulaireMessage.reset();
        });
    }
  }

  onCreateSalon() {
    const jwt = localStorage.getItem('jwt');

    if (jwt && this.selectedServeur) {
      const salonData = {
        nom: this.formulaire.get('nom')?.value,
        serveur: this.selectedServeur, // Inclure l'ID du serveur sélectionné
      };

      this.http
        .post('http://localhost:3000/salon', salonData)
        .subscribe((nouveauSalon) => {
          this.listeSalon.push(nouveauSalon as Salon);
          this.formulaire.reset();
        });
    }
  }
}
