import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Injectable, UseGuards  } from "@nestjs/common";
import { DeckProviders } from "./deck.providers";
import Deck from "src/entity/deck.entity";
import DeckInput from "../../input/deck.input";
import { GqlAuthGuard } from '../auth/guards/gpl-auth-guard'
import { DataEmptyDeck } from "src/exception";

@Resolver(() => Deck)
@Injectable()
export class DeckResolver {
    constructor(
        private readonly deckProvider: DeckProviders,
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Deck], { nullable: true })
    async SearchDeck(@Args('data') input: DeckInput): Promise<Deck[]> {
        return this.deckProvider.searchDeck(input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Deck)
    async MutationDeck(@Args('data') input: DeckInput): Promise<Deck> {
        if (input) {
            return this.deckProvider.mutationDeck(input);
        } else {
            throw new DataEmptyDeck()
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Deck)
    async RemoveDeck(@Args('id') id: string): Promise<Deck> {
        if (id) {
            return this.deckProvider.removeDeck(id);
        } else {
            throw new DataEmptyDeck()
        }
    }
}

