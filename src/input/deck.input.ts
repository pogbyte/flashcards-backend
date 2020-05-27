import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class DeckInput {

  @Field({ nullable: true })
  readonly id: string;

  @Field({ nullable: true })
  readonly name: string;

}