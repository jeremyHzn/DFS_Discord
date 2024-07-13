import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get('/possede')
  @UseGuards(AuthGuard)
  findAll(@Request() requete) {
    return this.salonService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createSalonDto: any) {
    return this.salonService.create(createSalonDto);
  }
}
