import { Test, TestingModule } from '@nestjs/testing';
import { PlanesResolver } from './planes.resolver';
import { PlanesService } from './planes.service';
import { Plane } from './entities/plane.entity';

const mockPlane: Plane = {
  id: 'bb13-6cc-900b',
  plane_name: 'EmirateFC',
  plane_number: 234,
  departure_airport: 'Abidabi',
  arrival_airport: 'Muritala',
  departure_time: new Date(),
  arrival_time: new Date(),
};

const planeServiceMock = {
  create: jest.fn((dto) => dto),
  findAll: jest.fn((): Plane[] => [mockPlane]),
  findOne: jest.fn((id: string): Plane => mockPlane),
  update: jest.fn((): Plane => mockPlane),
  remove: jest.fn((id: string): Plane => mockPlane),
};

describe('PlanesResolver', () => {
  let resolver: PlanesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanesResolver,
        PlanesService,
        {
          provide: PlanesService,
          useValue: planeServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<PlanesResolver>(PlanesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should query all planes', () => {
    const result = resolver.planes();
    expect(Array.isArray(result)).toEqual(true);
    expect(planeServiceMock.findAll).toHaveBeenCalled();
  });

  it('should create a plane', () => {
    const planeDto = {
      plane_name: 'EmirateFC',
      plane_number: 234
    };
    const plane = resolver.createPlane(planeDto);
    expect(plane).toMatchObject(planeDto);
    expect(planeServiceMock.create).toHaveBeenCalledWith(planeDto);
  });

  it('should update a plane', () => {
    const planeDto = {
      id: 'bb13-6cc-900b',
        plane_name: 'EmirateFC',
        plane_number: 234,
        departure_airport: "Abidabi",
        arrival_airport: "Muritala",
        departure_time: "2022-04-20T18:40:40.488Z",
        arrival_time: "2022-04-20T18:40:40.488Z"
    };
    resolver.updatePlane(planeDto);
    expect(planeServiceMock.update).toHaveBeenCalledWith(planeDto);
  });
  it('should delete plane', () => {   
    const deletedPlane = resolver.removePlane(mockPlane.id);
    expect(deletedPlane).toMatchObject(mockPlane);
    expect(planeServiceMock.remove).toHaveBeenCalledWith(mockPlane.id);
  });
});
