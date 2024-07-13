// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serveur, ServeurDocument } from './serveur.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class ServeurService {
  constructor(
    @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

async create(createServeurDto: any, email: string): Promise<Serveur> {
    const utilisateur = await this.utilisateurModel.findOne({ email }).exec();
    const createdServeur = new this.serveurModel({
      ...createServeurDto,
      admin: utilisateur._id,
    });
    const savedServeur = await createdServeur.save();

    await this.utilisateurModel.findOneAndUpdate(
      { email },
      { $addToSet: { serveurs: savedServeur._id } },
    );

    return savedServeur;
  }

  async findAllPublic(): Promise<Serveur[]> {
    return this.serveurModel.find({ public: true });
  }

  async findAllServerOfUser(email: string): Promise<Serveur[]> {
    const utilisateur = await this.utilisateurModel.findOne({ email });

    const serveurs = await this.serveurModel.find({
      _id: { $in: utilisateur.serveurs },
    });

    return serveurs;
  }
}
