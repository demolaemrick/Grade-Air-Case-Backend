import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field(type => ID)
  id: string;
}
