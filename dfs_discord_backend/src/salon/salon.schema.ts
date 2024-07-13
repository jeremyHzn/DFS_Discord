import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SalonDocument = Salon & Document;

@Schema()
export class Salon {
  @Prop({ required: true,  maxlength: 50 })
  nom: string;

  @Prop({ required: true})
  serveur: string;
}

export const SalonSchema = SchemaFactory.createForClass(Salon);
