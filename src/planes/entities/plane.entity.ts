import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from 'typeorm';
import {Ticket} from "src/tickets/entities/ticket.entity"

@Entity()
@ObjectType()
export class Plane {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(type => Int)
  model_number: number;

  @Column()
  @Field()
  plane_name: string;

  @Column()
  @Field(type => Int)
  plane_number: number;

  // @Column()
  // @Field((type) => GraphQLISODateTime)
  // departure_time: Date;

  // @Column()
  // @Field((type) => GraphQLISODateTime)
  // arrival_time: Date;

  // @Column()
  // @Field()
  // departure_airport: string;

  // @Column()
  // @Field()
  // arrival_airport: string;

  // @OneToMany(() => Ticket, ticket => ticket.plane)
  // @Field((type) => [Ticket], { nullable: true })
  // tickets?: Ticket[];
}
