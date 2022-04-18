import { CreatePlaneInput } from './create-plane.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsString } from 'class-validator';


@InputType()
export class UpdatePlaneInput extends PartialType(CreatePlaneInput) {
  @Field()
  id: string;

  @IsString()
  @Field()
  departure_time: string;

  @IsString()
  @Field()
  arrival_time: string;

  @IsAlpha()
  @Field()
  departure_airport: string;

  @IsAlpha()
  @Field()
  arrival_airport: string;
}
