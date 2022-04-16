import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => Int)
  ownerId: number;

  // @Field((type) => Int)
  // planeId: number;
}
