import { Test, TestingModule } from '@nestjs/testing';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';

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
  remove: jest.fn((id: string): Ticket => mockTicket),
};
describe('TicketsResolver', () => {
  let resolver: TicketsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsResolver,
        TicketsService,
        {
          provide: TicketsService,
          useValue: ticketServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<TicketsResolver>(TicketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all users', () => {
    const result = resolver.tickets();
    expect(Array.isArray(result)).toEqual(true);
    expect(ticketServiceMock.findAll).toHaveBeenCalled();
  });

  it('should create a ticket', () => {
    const ticketDto = {
      name: 'Emirate ticket',
      ownerId: 'bhfu-ghtu-123b',
      planeId: 'cd12-123b-02c',
    };
    const ticket = resolver.createTicket(ticketDto);
    expect(ticket).toMatchObject(ticketDto);
    expect(ticketServiceMock.create).toHaveBeenCalledWith(ticketDto);
  });

  it('should update a ticket', () => {
    const ticket = resolver.updateTicket(mockTicket);
    expect(ticket).toMatchObject(mockTicket);
    expect(ticketServiceMock.update).toHaveBeenCalledWith(mockTicket);
  });
  it('should delete a ticket', () => {
    const deletedTicket = resolver.removeTicket(mockTicket.id);
    expect(deletedTicket).toMatchObject(mockTicket);
    expect(ticketServiceMock.remove).toHaveBeenCalledWith(mockTicket.id);
  });
});
