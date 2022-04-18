import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlanesModule } from './planes/planes.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    PlanesModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
