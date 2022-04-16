import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  //    CREATE TICKET
  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    const newTicket = await this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(newTicket);
  }

  //    READ TICKET
  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }
  //   READ TICKET BY ID
  async findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOneOrFail(id);
  }

  //    UPDATE TICKET
  async update(
    id: number,
    updateTicketInput: UpdateTicketInput,
  ): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.save({
      ...ticketToUpdate,
      ...updateTicketInput,
    });
  }

  //   DELETE TICKET
  async remove(id: number): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.remove(ticketToUpdate);
  }

  // TICKET OWNER
  async getTicketOwner(ownerId: number): Promise<User> {
    return this.userService.findOne(ownerId);
  }
}
