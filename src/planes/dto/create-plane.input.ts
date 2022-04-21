import { InputType, Int, Field } from '@nestjs/graphql';
import { Length, IsInt } from 'class-validator';


@InputType()
export class CreatePlaneInput {
  @Length(3, 20)
  @Field()
  plane_name: string;

  @IsInt()
  @Field((type) => Int)
  plane_number: number;
  
}
