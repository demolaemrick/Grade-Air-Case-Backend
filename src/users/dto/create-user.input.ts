import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Length(3, 20)
  @Field()
  first_name: string;

  @IsAlpha()
  @Length(3, 20)
  @Field()
  last_name: string;

  @IsAlpha()
  @Field()
  username: string;

  @IsEmail()
  @Field()
  email: string;
}
