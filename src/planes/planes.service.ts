import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { Plane } from './entities/plane.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plane)
    private readonly planeRepository: Repository<Plane>,
    @Inject(forwardRef(() => TicketsService))
    private readonly ticketsService: TicketsService,
  ) {}

  //    CREATE PLANE
  async create(createPlaneInput: CreatePlaneInput): Promise<Plane> {
    const newPlane = await this.planeRepository.create(createPlaneInput);
    return this.planeRepository.save(newPlane);
  }

  //    RETURNS ALL PLANES
  async findAll() {
    return this.planeRepository.find();
  }

  // FIND PLANE BY ID
  async findOne(id: string) {
    return this.planeRepository.findOneOrFail(id);
  }

  //   UPDATE PLANE
  async update( updatePlaneInput: UpdatePlaneInput) {
    const planeToUpdate = await this.planeRepository.findOneOrFail(updatePlaneInput.id);
    return this.planeRepository.save({
      ...planeToUpdate,
      ...updatePlaneInput,
    });
  }

  //   DELETE PLANE
  async remove(id: string): Promise<Plane> {
    const planeToUpdate = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(planeToUpdate);
  }

  //    GET PLANE TICKETS
  async getPlaneTickets(planeId: string): Promise<Ticket[]> {
    return this.ticketsService.findPlaneTickets(planeId);
  }
}
