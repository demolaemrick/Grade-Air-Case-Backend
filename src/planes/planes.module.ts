import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';
import {Plane} from "./entities/plane.entity"
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plane]), TicketsModule],
  providers: [PlanesResolver, PlanesService]
})
export class PlanesModule {}
