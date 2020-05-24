import { HttpStatus, HttpException } from '@nestjs/common';

export class UserNotExist extends HttpException{
    constructor(){
        super('The user was not found', HttpStatus.BAD_REQUEST);
    }
}

export class DeckNotExist extends HttpException{
    constructor(){
        super('The deck was not found', HttpStatus.BAD_REQUEST);
    }
}

export class CardNotExist extends HttpException{
    constructor(){
        super('The card was not found', HttpStatus.BAD_REQUEST);
    }
}

export class DataEmptyUser extends HttpException{
    constructor(){
        super('The input for creating or updating a user cannot be empty', HttpStatus.BAD_REQUEST);
    }
}

export class DataEmptyCard extends HttpException{
    constructor(){
        super('The input for creating a new card cannot be empty', HttpStatus.BAD_REQUEST);
    }
}


export class DataEmptyDeck extends HttpException{
    constructor(){
        super('The input for creating a new deck cannot be empty', HttpStatus.BAD_REQUEST);
    }
}

