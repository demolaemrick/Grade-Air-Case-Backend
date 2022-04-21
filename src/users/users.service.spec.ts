import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersService', () => {
  let service: UsersService;
  const userRepositoryMock: MockType<Repository<User>> = {
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
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'john',
        email: 'john.doe@email.com',
      };
      userRepositoryMock.create.mockReturnValue(userDto);
      const newUser = await service.create(userDto);
      expect(newUser).toMatchObject(userDto);
      expect(userRepositoryMock.save).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const user = {
        id: 'bhfu-ghtu-123b',
        first_name: 'John',
        last_name: 'Doe',
        username: 'john',
        email: 'john.doe@email.com',
      };
      userRepositoryMock.find.mockReturnValue([user]);
      const users = await service.findAll();
      expect(users).toEqual([user]);
      expect(userRepositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user with a particular id', async () => {
      const user = {
        id: 'bhfu-ghtu-123b',
        first_name: 'John',
        last_name: 'Doe',
        username: 'john',
        email: 'john.doe@email.com',
      };
      const id: string = 'bhfu-ghtu-123b';

      userRepositoryMock.findOne.mockReturnValue(user);
      await service.findOne(user.id);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(user.id);
    });
  });

  describe('update', () => {
    it('should update a user with a particular id', async () => {
      const userUpdateDto = {
        id: 'bhfu-ghtu-123b',
        first_name: 'John',
        last_name: 'Doe',
        username: 'john',
        email: 'john.doe@email.com',
      };

      userRepositoryMock.update.mockReturnValue(userUpdateDto);
      const updatedUser = await service.update(userUpdateDto);
      expect(updatedUser).toMatchObject(userUpdateDto);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(
        userUpdateDto.id,
      );
      expect(userRepositoryMock.save).toHaveBeenCalledWith(userUpdateDto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = {
        id: 'bhfu-ghtu-123b',
        first_name: 'John',
        last_name: 'Doe',
        username: 'john',
        email: 'john.doe@email.com',
      };

      userRepositoryMock.delete.mockReturnValue(user);
      await service.delete(user.id);
      expect(userRepositoryMock.findOneOrFail).toHaveBeenCalledWith(user.id);
    });
  });
});
