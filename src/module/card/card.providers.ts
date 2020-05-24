import { Injectable } from "@nestjs/common";
import Card from "src/entity/card.entity";
import CardInput from "../../input/card.input";
import prepareWhere from '../../util/prepareWhere'
import { CardNotExist } from '../../exception'
import { ObjectID } from 'mongodb';

@Injectable()
export class CardProviders {

    async searchCard(input: CardInput): Promise<Card[]>{
        let where = prepareWhere(input)

        return Card.find({
            ...where
        })
    }

    async mutationCard(input: CardInput): Promise<Card> {
        let card;

        if (input.id) {
            card = await Card.findOne({ _id: new ObjectID(input.id) })

            if (!card) {
                throw new CardNotExist()
            }

            card.text_back = input.text_back
            card.text_front = input.text_front
        } else {
            card = new Card()
            card.text_back = input.text_back
            card.text_front = input.text_front

        }

        return card.save()
    }

    async removeCard(id: string): Promise<Card> {
        let card = await Card.findOne({ _id: new ObjectID(id) })

        if (!id) {
            throw new CardNotExist()
        }

        return card.remove()
    }
}