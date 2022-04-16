import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaneInput {
  @Field((type) => Int)
  model_number: number;

  @Field()
  plane_name: string;

  @Field((type) => Int)
  plane_number: number;

  // @Field()
  // arrival_airport: string;
}
