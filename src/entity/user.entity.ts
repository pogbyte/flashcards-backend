import { Entity, Column, ObjectIdColumn, BaseEntity, OneToMany, AfterLoad, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import ObjectID from 'mongodb'
import { Field, ObjectType } from '@nestjs/graphql';
import Deck from './deck.entity';

@ObjectType()
@Entity()
export default class User extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  id: string;

  @Field()
  @Column({ length: 500 })
  name: string;

  @Field()
  @Column({ length: 500 })
  username: string;

  @Field()
  @Column({ length: 500 })
  email: string;

  @Field()
  @Column({ length: 500 })
  password: string;

  @OneToMany(type => Deck, deck => deck.user)
  decks: Deck[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  insertId() {
    this.id = this._id
  }
}