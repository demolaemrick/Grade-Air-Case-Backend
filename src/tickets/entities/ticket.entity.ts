import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Plane } from 'src/planes/entities/plane.entity';

@Entity()
@ObjectType()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  ownerId: string;

  @OneToOne(() => User, (user) => user.ticket, { onDelete: 'CASCADE' })
  @Field((type) => User, { nullable: true })
  owner?: User;

  @Column()
  @Field()
  planeId: string;

  @ManyToOne(() => Plane, (plane) => plane.tickets, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Plane, { nullable: true })
  plane?: Plane;

  @Column()
  @Field()
  isBooked: boolean;

  @BeforeInsert()
  updateHodApproved() {
    this.isBooked = false;
  }

  @CreateDateColumn()
  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
