import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

import { getConnection } from 'typeorm';

import { User } from '../src/users/entities/user.entity';

const users = [
  {
    id: '1bc-347b-ccb',
    first_name: 'John',
    last_name: 'Doe',
    username: 'john',
    email: 'john.doe@example.com',
    createdAt: '2022-04-21T16:10:37.000Z',
    updatedAt: '2022-04-21T16:10:37.000Z',
  },
  {
    id: '2bc-347b-cbd',
    first_name: 'Jane',
    last_name: 'Doe',
    username: 'jane',
    email: 'jane.doe@example.com',
    createdAt: '2022-04-21T16:10:37.000Z',
    updatedAt: '2022-04-21T16:10:37.000Z',
  },
];

describe('Users resolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const gql = '/graphql';

  const createUserQuery = `
  mutation createUser($CreateUserInput: CreateUserInput!) {
    createUser(createUserInput: $CreateUserInput) {
      first_name,
      last_name,
      username,
      email
    }
  }
`;

  describe('createUser', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          operationName: 'createUser',
          variables: {
            CreateUserInput: {
              first_name: 'John',
              last_name: 'Doe',
              username: 'john',
              email: 'john.doe@example.com',
            },
          },
          query: createUserQuery,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            first_name: 'John',
            last_name: 'Doe',
            username: 'john',
            email: 'john.doe@example.com',
          });
        });
    });
  });

  describe('users', () => {
    it('should return all users', async () => {
      const connection = await getConnection();
      users.map(async (item) => {
        await connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(item)
          .execute();
      });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            '{users {id first_name last_name username email createdAt updatedAt }}',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users.length).toEqual(users.length);
          expect(Array.isArray(res.body.data.users)).toEqual(true);
        });
    });
  });

  describe('deleteUser', () => {
    const deleteUserQuery = () => `
      mutation deleteUser(
        $id: ID!,
      ) {
        deleteUser(id: $id) {
          first_name
          last_name
          username
          email        
        }
      }
    `;
    it('should delete a  user', async () => {
      const connection = await getConnection();
      users.map(async (item) => {
        await connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(item)
          .execute();
      });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          operationName: 'deleteUser',
          variables: { id: '1bc-347b-ccb' },
          query: deleteUserQuery(),
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.deleteUser).toEqual({
            first_name: "John",
            last_name: "Doe",
            username: 'john',
            email: 'john.doe@example.com',
          });
        });
    });
  });
});
