import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanesService } from './planes.service';
import { PlanesResolver } from './planes.resolver';
import {Plane} from "./entities/plane.entity"
import { TicketsModule } from 'src/tickets/tickets.module';
import {DateScalar} from "./planes.scalar"

@Module({
  imports: [TypeOrmModule.forFeature([Plane]), forwardRef (() => TicketsModule)],
  providers: [PlanesResolver, PlanesService, DateScalar],
  exports: [PlanesService]
})
export class PlanesModule {}
