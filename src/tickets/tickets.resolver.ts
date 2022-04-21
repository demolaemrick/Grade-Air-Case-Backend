import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket])
  tickets() {
    return this.ticketsService.findAll();
  }

  // returns tickets that are associated with a particular plane
  @Query(() => [Ticket])
  ticketsByPlaneId(@Args('planeId', { type: () => String }) id: string) {
    return this.ticketsService.findPlaneTickets(id);
  }

  @Query(() => Ticket)
  getTicket(@Args('id', { type: () => String }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketsService.update(updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => String }) id: string) {
    return this.ticketsService.remove(id);
  }

  @ResolveField((returns) => User)
  owner(@Parent() ticket: Ticket) {
    return this.ticketsService.getTicketOwner(ticket.ownerId);
  }

  @ResolveField((returns) => Plane)
  plane(@Parent() ticket: Ticket) {
    return this.ticketsService.getTicketPlane(ticket.planeId);
  }
}
