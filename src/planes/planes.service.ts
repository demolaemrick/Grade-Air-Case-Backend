import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { Plane } from './entities/plane.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { TicketsService } from 'src/tickets/tickets.service';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plane)
    private readonly planeRepository: Repository<Plane>,
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
  async findOne(id: number) {
    return this.planeRepository.findOneOrFail(id);
  }

  //   UPDATE PLANE
  async update(id: number, updatePlaneInput: UpdatePlaneInput) {
    const planeToUpdate = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.save({
      ...planeToUpdate,
      ...updatePlaneInput,
    });
  }

  //   DELETE PLANE
  async remove(id: number): Promise<Plane> {
    const planeToUpdate = await this.planeRepository.findOneOrFail(id);
    return this.planeRepository.remove(planeToUpdate);
  }

  //    GET PLANE TICKETS
  async getPlaneTickets(planeId: number): Promise<Ticket> {
    return this.ticketsService.findOne(planeId);
  }
}
