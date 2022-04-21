import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanesService } from './planes.service';
import { TicketsService } from '../tickets/tickets.service';
import { Plane } from './entities/plane.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const mockTicket: Ticket = {
  id: 'bb13-6cc-900b',
  name: 'Emirate ticket',
  ownerId: 'bhfu-ghtu-123b',
  planeId: 'cd12-123b-02c',
  isBooked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  updateIsBooked: () => {},
};
const ticketServiceMock = {
  create: jest.fn((dto) => dto),
  findAll: jest.fn((): Ticket[] => [mockTicket]),
  findOne: jest.fn((id: string): Ticket => mockTicket),
  update: jest.fn((): Ticket => mockTicket),
  delete: jest.fn((id: string): Ticket => mockTicket),
};

describe('PlanesService', () => {
  let service: PlanesService;
  const planeRepositoryMock: MockType<Repository<Plane>> = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => dto),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanesService,
        TicketsService,
        { provide: getRepositoryToken(Plane), useValue: planeRepositoryMock },

        {
          provide: TicketsService,
          useValue: ticketServiceMock,
        },
      ],
    }).compile();

    service = module.get<PlanesService>(PlanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new plane', async () => {
      const planeDto = {
        plane_name: 'EmirateFC',
        plane_number: 234
      };
      planeRepositoryMock.create.mockReturnValue(planeDto);
      const newplane = await service.create(planeDto);
      expect(newplane).toMatchObject(planeDto);
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(planeDto);
    });
  });

  describe('findAll', () => {
    it('should return all planes', async () => {
      const planeDto = {
        id: 'bb13-6cc-900b',
        plane_name: 'EmirateFC',
        plane_number: 234,
        departure_airport: "Abidabi",
        arrival_airport: "Muritala",
        departure_time: new Date(),
        arrival_time: new Date()
      };
      planeRepositoryMock.find.mockReturnValue([planeDto]);
      const planes = await service.findAll();
      expect(planes).toEqual([planeDto]);
      expect(planeRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with a particular id', async () => {
      const plane = {
        id: 'bb13-6cc-900b',
        plane_name: 'EmirateFC',
        plane_number: 234,
        departure_airport: "Abidabi",
        arrival_airport: "Muritala",
        departure_time: new Date(),
        arrival_time: new Date()
      };
      planeRepositoryMock.findOne.mockReturnValue(plane);
      await service.findOne(plane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        plane.id,
      );
    });
  });

  describe('update', () => {
    it('should update a user with a particular id', async () => {
      const planeDto = {
        id: 'bb13-6cc-900b',
        plane_name: 'EmirateFC',
        plane_number: 234,
        departure_airport: "Abidabi",
        arrival_airport: "Muritala",
        departure_time: "2022-11-29",
        arrival_time: "2022-12-1"
      };

      planeRepositoryMock.update.mockReturnValue(planeDto);
      const updatedplane = await service.update(planeDto);
      expect(updatedplane).toMatchObject(planeDto);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        planeDto.id,
      );
      expect(planeRepositoryMock.save).toHaveBeenCalledWith(planeDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const plane = {
        id: 'bb13-6cc-900b',
        plane_name: 'EmirateFC',
        plane_number: 234,
        departure_airport: "Abidabi",
        arrival_airport: "Muritala",
        departure_time: new Date(),
        arrival_time: new Date()
      };

      planeRepositoryMock.delete.mockReturnValue(plane);
      await service.remove(plane.id);
      expect(planeRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        plane.id,
      );
    });
  });
});
