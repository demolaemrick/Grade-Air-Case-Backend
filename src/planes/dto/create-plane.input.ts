import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsInt } from 'class-validator';


@InputType()
export class CreatePlaneInput {
  @IsInt()
  @Field((type) => Int)
  model_number: number;

  @IsAlpha()
  @Field()
  plane_name: string;

  @IsInt()
  @Field((type) => Int)
  plane_number: number;
  
}
