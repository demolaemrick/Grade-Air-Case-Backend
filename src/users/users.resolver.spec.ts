import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

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

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all users', () => {
    const result = resolver.users();
    expect(Array.isArray(result)).toEqual(true);
    expect(userServiceMock.findAll).toHaveBeenCalled();
  });

  it('should create a  user', () => {
    const userDto = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'john',
      email: 'john.doe@email.com',
    };
    const user = resolver.createUser(userDto);
    expect(user).toMatchObject(userDto);
    expect(userServiceMock.create).toHaveBeenCalledWith(userDto);
  });

  it('should update a  user', () => {
    const userDto = {
      id: 'bhfu-ghtu-123b',
      first_name: 'John',
      last_name: 'Doe',
      username: 'john',
      email: 'john.doe@email.com',
    };
    const user = resolver.updateUser(userDto);
    expect(user).toMatchObject(userDto);
    expect(userServiceMock.update).toHaveBeenCalledWith(userDto);
  });
  it('should delete a  user', () => {
    const user = {
      id: 'bhfu-ghtu-123b',
      first_name: 'John',
      last_name: 'Doe',
      username: 'john',
      email: 'john.doe@email.com',
    };
    const deletedUser = resolver.deleteUser(user.id);
    expect(deletedUser).toMatchObject(user);
    expect(userServiceMock.delete).toHaveBeenCalledWith(user.id);
  });
});
