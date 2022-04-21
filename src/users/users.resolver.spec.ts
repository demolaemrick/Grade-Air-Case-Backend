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
    const newUser = resolver.createUser(userDto);
    expect(newUser).toMatchObject(userDto);
    expect(userServiceMock.create).toHaveBeenCalledWith(userDto);
  });

  it('should update a  user', () => {    
    const updatedUser = resolver.updateUser(mockUser);
    expect(updatedUser).toMatchObject(mockUser);
    expect(userServiceMock.update).toHaveBeenCalledWith(mockUser);
  });
  it('should delete a  user', () => {    
    const deletedUser = resolver.deleteUser(mockUser.id);
    expect(deletedUser).toMatchObject(mockUser);
    expect(userServiceMock.delete).toHaveBeenCalledWith(mockUser.id);
  });
});
