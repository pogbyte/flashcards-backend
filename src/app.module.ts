import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { CardModule } from './module/card/card.module';
import { AuthModule } from './module/auth/auth.module';
import { DeckModule } from './module/deck/deck.module';
import { UserModule } from './module/user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule,
    AuthModule,
    DatabaseModule,
    CardModule,
    DeckModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
