import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import {Ticket} from "src/tickets/entities/ticket.entity"

@Resolver(() => Plane)
export class PlanesResolver {
  constructor(private readonly planesService: PlanesService) {}

  //    CREATE PLANE
  @Mutation(() => Plane)
  createPlane(@Args('createPlaneInput') createPlaneInput: CreatePlaneInput) {
    return this.planesService.create(createPlaneInput);
  }

  //   GET PLANES
  @Query(() => [Plane])
  planes() {
    return this.planesService.findAll();
  }

  //   GET PLANE BY ID
  @Query(() => Plane, { name: 'plane' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.planesService.findOne(id);
  }

  @ResolveField((returns) => Ticket)
  tickets(@Parent() plane: Plane) {
    return this.planesService.getPlaneTickets(plane.id);
  }

  //   UPDATE PLANE
  @Mutation(() => Plane)
  updatePlane(@Args('updatePlaneInput') updatePlaneInput: UpdatePlaneInput) {
    return this.planesService.update(updatePlaneInput);
  }

  //   DELETE PLANE
  @Mutation(() => Plane)
  removePlane(@Args('id', { type: () => String }) id: string) {
    return this.planesService.remove(id);
  }
}
