import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Plane } from 'src/planes/entities/plane.entity';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;


  @Column()
  @Field(type => Int)
  ownerId: number;

  @OneToOne(() => User, user => user.ticket)
  @Field((type) => User, { nullable: true })
  owner?: User;

  @Column()
  @Field(type => Int)
  planeId: number;

  @ManyToOne(() => Plane, plane => plane.tickets, {
    onDelete: 'CASCADE',
    // createForeignKeyConstraints: false,
  })
  @Field((type) => Plane, {nullable: true})
  plane?: Plane;

  @CreateDateColumn()
  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
