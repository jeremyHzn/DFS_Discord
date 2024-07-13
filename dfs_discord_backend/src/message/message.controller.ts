// message.controller.ts
import { Body, Controller, Get, Post, UseGuards, Param, Request, NotFoundException } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth.guard';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly utilisateurService: UtilisateurService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createMessageDto: any, @Request() req) {
    const utilisateur = await this.utilisateurService.findByEmail(req.user.sub);
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    createMessageDto.utilisateurEmail = utilisateur.email;
    createMessageDto.utilisateurAvatar = utilisateur.urlAvatar;
    return this.messageService.create(createMessageDto);
  }

  @Get(':salonId')
  @UseGuards(AuthGuard)
  async findAllBySalon(@Param('salonId') salonId: string) {
    return this.messageService.findAllBySalon(salonId);
  }
}
