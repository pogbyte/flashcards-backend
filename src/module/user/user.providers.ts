import { Injectable, UseGuards } from "@nestjs/common";
import User from "src/entity/user.entity";
import UserInput from "../../input/user.input";
import { UserNotExist } from '../../exception'
import prepareWhere from '../../util/prepareWhere'
import { ObjectID } from 'mongodb';

@Injectable()
export class UserProviders {

    async searchUser(input: UserInput) {
        let where = prepareWhere(input)

        return User.find({
            ...where
        })
    }

    async mutationUser(input: UserInput) {
        let user;
        if (input.id) {
            user = await User.findOne({where: { _id: new ObjectID(input.id) }})

            if (!user) {
                throw new UserNotExist()
            }

            user.name = input.name ? input.name : user.name
            user.username = input.username ? input.username : user.username
            user.email = input.email ? input.email : user.email
            user.password = input.password ? input.password : user.password

        } else {
            user = new User()
            user.name = input.name;
            user.username = input.username;
            user.email = input.email;
            user.password = input.password;
        }

        return user.save()
    }

    async findOne(username: String) {
        return User.findOne({
            where: {
                username,
            }
        })
    }

    async removeUser(id: string): Promise<User> {
        let card = await User.findOne({ _id: new ObjectID(id) })

        if (!id) {
            throw new UserNotExist()
        }

        return card.remove()
    }
}