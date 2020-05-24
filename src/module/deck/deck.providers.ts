
import { Injectable } from "@nestjs/common";
import Deck from "src/entity/deck.entity";
import DeckInput from "../../input/deck.input";
import prepareWhere from '../../util/prepareWhere'
import { DeckNotExist } from '../../exception'
import { ObjectID } from 'mongodb';

@Injectable()
export class DeckProviders {

    async searchDeck(input: DeckInput) {
        let where = prepareWhere(input)

        return Deck.find({
            ...where
        })
    }

    async mutationDeck(input: DeckInput) {
        let deck;

        if (input.id) {
            deck = await Deck.findOne({ _id: new ObjectID(input.id)})

            if (!deck) {
                throw new DeckNotExist()
            }

            deck.name = input.name

        } else {
            deck = new Deck()
            deck.name = input.name
        }
    
        return deck.save()
    }

    async removeDeck(id: string): Promise<Deck> {
        let card = await Deck.findOne({ _id: new ObjectID(id) })

        if (!id) {
            throw new DeckNotExist()
        }

        return card.remove()
    }
}