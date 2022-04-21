import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from './tickets.service';
import { UsersService } from '../users/users.service';
import { PlanesService } from '../planes/planes.service';
import { Plane } from '../planes/entities/plane.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
const mockUser: User = {
  id: 'bhfu-ghtu-123b',
  first_name: 'John',
  last_name: 'Doe',
  username: 'john',
  email: 'john.doe@email.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userServiceMock = {
  create: jest.fn((dto) => dto),
  findAll: jest.fn((): User[] => [mockUser]),
  findOne: jest.fn((id: string): User => mockUser),
  update: jest.fn((): User => mockUser),
  delete: jest.fn((id: string): User => mockUser),
};
const mockPlane: Plane = {
  id: 'bhfu-ghtu-123',
  plane_name: 'DND',
  plane_number: 24,
  departure_time: new Date(),
  arrival_time: new Date(),
  departure_airport: 'Emirate',
  arrival_airport: 'Abudabi',
};
const planeServiceMock = {
  create: jest.fn((dto) => dto),
  findAll: jest.fn((): Plane[] => [mockPlane]),
  findOne: jest.fn((id: string): Plane => mockPlane),
  update: jest.fn((): Plane => mockPlane),
  delete: jest.fn((id: string): Plane => mockPlane),
};

describe('TicketsService', () => {
  let service: TicketsService;
  const ticketRepositoryMock: MockType<Repository<Ticket>> = {
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
        TicketsService,
        UsersService,
        PlanesService,
        { provide: getRepositoryToken(Ticket), useValue: ticketRepositoryMock },
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: PlanesService,
          useValue: planeServiceMock,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a new ticket', async () => {
      const ticketDto = {
        name: 'Emirate ticket',
        ownerId: 'bhfu-ghtu-123b',
        planeId: 'cd12-123b-02c',
        isBooked: false,
      };
      ticketRepositoryMock.create.mockReturnValue(ticketDto);
      const newTicket = await service.create(ticketDto);
      expect(newTicket).toMatchObject(ticketDto);
      expect(ticketRepositoryMock.save).toHaveBeenCalledWith(ticketDto);
    });
  });

  describe('findAll', () => {
    it('should return all tickets', async () => {
      const ticket = {
        id: 'bb13-6cc-900b',
        name: 'Emirate ticket',
        ownerId: 'bhfu-ghtu-123b',
        planeId: 'cd12-123b-02c',
        isBooked: false,
      };
      ticketRepositoryMock.find.mockReturnValue([ticket]);
      const tickets = await service.findAll();
      expect(tickets).toEqual([ticket]);
      expect(ticketRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with a particular id', async () => {
      const ticket = {
        id: 'bb13-6cc-900b',
        name: 'Emirate ticket',
        ownerId: 'bhfu-ghtu-123b',
        planeId: 'cd12-123b-02c',
        isBooked: false,
      };
      ticketRepositoryMock.findOne.mockReturnValue(ticket);
      await service.findOne(ticket.id);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        ticket.id,
      );
    });
  });

  describe('update', () => {
    it('should update a user with a particular id', async () => {
      const ticket = {
        id: 'bb13-6cc-900b',
        name: 'Emirate ticket',
        ownerId: 'bhfu-ghtu-123b',
        planeId: 'cd12-123b-02c',
        isBooked: false,
      };

      ticketRepositoryMock.update.mockReturnValue(ticket);
      const updatedTicket = await service.update(ticket);
      expect(updatedTicket).toMatchObject(ticket);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        ticket.id,
      );
      expect(ticketRepositoryMock.save).toHaveBeenCalledWith(ticket);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const ticket = {
        id: 'bb13-6cc-900b',
        name: 'Emirate ticket',
        ownerId: 'bhfu-ghtu-123b',
        planeId: 'cd12-123b-02c',
        isBooked: false,
      };

      ticketRepositoryMock.delete.mockReturnValue(ticket);
      await service.remove(ticket.id);
      expect(ticketRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        ticket.id,
      );
    });
  });
});
