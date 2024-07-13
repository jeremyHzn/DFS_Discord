// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';
import {
  Serveur,
  ServeurDocument,
} from 'src/serveur/serveur.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
    @InjectModel(Serveur.name)
    private serveurModel: Model<ServeurDocument>,
  ) {}

  async create(createSalonDto: any): Promise<Salon> {
    const createdSalon = new this.salonModel(createSalonDto);
    return createdSalon.save();
  }
  async findAll(): Promise<Salon[]> {
    return this.salonModel.find().exec();
  }
}
