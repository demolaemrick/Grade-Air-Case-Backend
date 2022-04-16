import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field((type) => Int)
  id: number;

  @IsAlpha()
  @Field({ nullable: true })
  first_name?: string;

  @IsAlpha()
  @Field({ nullable: true })
  last_name?: string;

  @IsEmail()
  @Field({ nullable: true })
  email?: string;
}
