import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Generated,
  Column,
  OneToMany,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity()
@ObjectType()
export class Plane {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  plane_name: string;

  @Column()
  @Field((type) => Int)
  plane_number: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  departure_time: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  arrival_time: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  departure_airport: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  arrival_airport: string;

  @OneToMany(() => Ticket, (ticket) => ticket.plane, {
    createForeignKeyConstraints: false,
  })
  @Field((type) => [Ticket], { nullable: true })
  tickets?: Ticket[];
}
