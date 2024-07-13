// message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  contenu: string;

  @Prop({ required: true })
  utilisateurEmail: string;

  @Prop({ required: true })
  utilisateurAvatar: string;

  @Prop({ required: true })
  salon: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
