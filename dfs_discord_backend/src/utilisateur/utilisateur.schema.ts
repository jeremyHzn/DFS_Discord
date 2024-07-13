import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Serveur } from 'src/serveur/serveur.schema';

export type UtilisateurDocument = Utilisateur & Document;

@Schema()
export class Utilisateur {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  urlAvatar: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Serveur' }] })
  serveurs: Serveur[];
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
