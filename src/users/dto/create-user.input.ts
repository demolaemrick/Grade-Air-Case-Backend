import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field()
  first_name: string;

  @IsAlpha()
  @Field()
  last_name: string;

  @IsEmail()
  @Field()
  email: string;
}
