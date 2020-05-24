import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Injectable, UseGuards  } from "@nestjs/common";
import { CardProviders } from "./card.providers";
import Card from "src/entity/card.entity";
import CardInput from "../../input/card.input";
import { GqlAuthGuard } from '../auth/guards/gpl-auth-guard'
import { DataEmptyCard } from "src/exception";

@Resolver(() => Card)
@Injectable()
export class CardResolver {
    constructor(
        private readonly cardProvider: CardProviders,
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Card], { nullable: true })
    async SearchCard(@Args('data') input: CardInput): Promise<Card[]> {
        return this.cardProvider.searchCard(input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Card)
    async MutationCard(@Args('data') input: CardInput): Promise<Card> {
        if (input) {
            return this.cardProvider.mutationCard(input);
        } else {
            throw new DataEmptyCard()
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Card)
    async RemoveCard(@Args('id') id: string): Promise<Card> {
        if (id) {
            return this.cardProvider.removeCard(id);
        } else {
            throw new DataEmptyCard()
        }
    }
}