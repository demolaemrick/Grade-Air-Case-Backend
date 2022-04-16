import { CreatePlaneInput } from './create-plane.input';
import { InputType, Field, Int, PartialType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class UpdatePlaneInput extends PartialType(CreatePlaneInput) {
  @Field(() => Int)
  id: number;

  // @Field((type) => GraphQLISODateTime)
  // departure_time: Date;

  // @Field((type) => GraphQLISODateTime)
  // arrival_time: Date;

  // @Field()
  // departure_airport: string;
}
