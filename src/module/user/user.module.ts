import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserProviders } from './user.providers';

@Module({
  providers: [UserResolver, UserProviders],
  exports: [UserProviders]
})
export class UserModule {}
