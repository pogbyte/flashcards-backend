import { ObjectID } from 'mongodb';

export default (input) => {
    let where = Object.assign(input)

    if (where.id) {
        where._id = new ObjectID(where.id)
        delete where.id
    }

    return where
}