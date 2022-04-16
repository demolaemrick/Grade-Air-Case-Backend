import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/users/user.entity';
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

  @Query(() => Ticket)
  getTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  @ResolveField(returns => User)
  owner(@Parent() ticket: Ticket) {
    return this.ticketsService.getTicketOwner(ticket.ownerId);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }
}
