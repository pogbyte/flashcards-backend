import { Module } from '@nestjs/common';
import { DeckResolver } from './deck.resolver';
import { DeckProviders } from './deck.providers';

@Module({
  providers: [DeckResolver, DeckProviders]
})
export class DeckModule {}
