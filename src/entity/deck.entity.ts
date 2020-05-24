import { Entity, Column, ObjectIdColumn, BaseEntity, OneToMany, ManyToOne, AfterLoad, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import ObjectID from 'mongodb'
import User from './user.entity';
import Card from './card.entity';

@ObjectType()
@Entity()
export default class Deck extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  id: string;

  @Field()
  @Column({ length: 500 })
  name: string;

  @ManyToOne(type => User, user => user.decks)
  user: User;

  @OneToMany(type => Card, card => card.deck)
  cards: Card[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  insertId() {
    this.id = this._id
  }
}