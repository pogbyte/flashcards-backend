import { Entity, Column, ObjectIdColumn, BaseEntity, ManyToOne, AfterLoad, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import ObjectID from 'mongodb'
import Deck from './deck.entity';

@ObjectType()
@Entity()
export default class Card extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  id: string;

  @Field()
  @Column({ length: 500 })
  text_front: string;

  @Field()
  @Column({ length: 500 })
  text_back: string;

  @Field()
  @ManyToOne(type => Deck, deck => deck.cards)
  deck: Deck;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  insertId() {
    this.id = this._id
  }
}