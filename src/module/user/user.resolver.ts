import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Injectable, UseGuards  } from "@nestjs/common";
import { UserProviders } from "./user.providers";
import User from "src/entity/user.entity";
import UserInput from "../../input/user.input";
import { DataEmptyUser } from '../../exception'
import { GqlAuthGuard } from '../auth/guards/gpl-auth-guard'

@Resolver(() => User)
@Injectable()
export class UserResolver {
    constructor(
        private readonly userProvider: UserProviders,
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [User], { nullable: true })
    async SearchUser(@Args('data') input: UserInput): Promise<User[]> {
        return this.userProvider.searchUser(input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async MutationUser(@Args('data') input: UserInput): Promise<User> {
        if (input) {
            return this.userProvider.mutationUser(input);
        } else {
            throw new DataEmptyUser()
        }
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User)
    async RemoveUser(@Args('id') id: string): Promise<User> {
        if (id) {
            return this.userProvider.removeUser(id);
        } else {
            throw new DataEmptyUser()
        }
    }
}