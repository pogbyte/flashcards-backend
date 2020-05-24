import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserInput  {

  @Field({ nullable: true })
  readonly id: string;

  @Field({ nullable: true })
  readonly username: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly email: string;

  @Field({ nullable: true })
  readonly password: string;
}