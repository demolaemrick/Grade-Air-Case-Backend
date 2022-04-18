import { Module, forwardRef } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from "./entities/ticket.entity"
import { UsersModule } from './../users/users.module';
import { PlanesModule } from 'src/planes/planes.module'

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UsersModule, forwardRef(() => PlanesModule)],
  providers: [TicketsResolver, TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
