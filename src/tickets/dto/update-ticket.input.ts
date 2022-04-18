import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';


@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field()
  id: string;

  @IsBoolean()
  @Field()
  isBooked: boolean;
}
