import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { UsersService } from 'src/users/users.service';
import { PlanesService } from 'src/planes/planes.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => PlanesService))
    private readonly planesService: PlanesService,
  ) {}

  //    CREATE TICKET
  async create(createTicketInput: CreateTicketInput): Promise<Ticket> {
    const newTicket = await this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(newTicket);
  }
  //   READ TICKETS
  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['plane'],
    });
  }

  //    GET TICKET ASSOCIATED PLANE
  async findPlaneTickets(planeId): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        planeId,
      },
      relations: ['plane'],
    });
  }
  //   READ TICKET BY ID
  async findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOneOrFail(id);
  }

  //    UPDATE TICKET
  async update(
    updateTicketInput: UpdateTicketInput,
  ): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(updateTicketInput.id);
    return this.ticketRepository.save({
      ...ticketToUpdate,
      ...updateTicketInput,
    });
  }

  //   DELETE TICKET
  async remove(id: string): Promise<Ticket> {
    const ticketToUpdate = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.remove(ticketToUpdate);
  }

  // TICKET OWNER
  async getTicketOwner(ownerId: string): Promise<User> {
    return this.userService.findOne(ownerId);
  }

  //   GET TICKET ASSOCIATED PLANE
  async getTicketPlane(planeId: string): Promise<Plane> {
    return this.planesService.findOne(planeId);
  }
}
