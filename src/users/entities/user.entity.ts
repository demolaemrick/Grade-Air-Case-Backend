import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  username: string;



  @Column()
  @Field()
  email: string;

  @OneToOne(() => Ticket, ticket => ticket.owner)
  @Field(type => Ticket, { nullable: true })
  ticket?: string;

  @CreateDateColumn()
  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
