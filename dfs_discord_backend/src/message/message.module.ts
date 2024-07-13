// message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Utilisateur, UtilisateurSchema } from 'src/utilisateur/utilisateur.schema';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, UtilisateurService],
})
export class MessageModule {}
