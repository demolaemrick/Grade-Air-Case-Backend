import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  name: string;


  @Field()
  ownerId: string;

  @Field()
  planeId: string;
}
