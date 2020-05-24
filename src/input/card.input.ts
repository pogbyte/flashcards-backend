import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CardInput {

  @Field({ nullable: true })
  readonly id: string;

  @Field({ nullable: true })
  readonly text_front: string;

  @Field({ nullable: true })
  readonly text_back: string;
}