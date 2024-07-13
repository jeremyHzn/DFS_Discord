import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salon, SalonSchema } from './salon.schema';
import { SalonController } from './salon.controller';
import { SalonService } from './salon.service';
import {
  Serveur,
  ServeurSchema,
} from 'src/serveur/serveur.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Salon.name, schema: SalonSchema },
      { name: Serveur.name, schema: ServeurSchema },
    ]),
  ],
  providers: [SalonService],
  controllers: [SalonController],
})
export class SalonModule {}
