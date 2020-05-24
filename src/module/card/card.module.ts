import { Module } from '@nestjs/common';
import { CardResolver } from './card.resolver';
import { CardProviders } from './card.providers';

@Module({
  providers: [CardResolver, CardProviders]
})
export class CardModule {}
