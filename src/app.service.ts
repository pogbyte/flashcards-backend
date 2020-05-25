import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Está funcionando, mas você está no lugar errado!!';
  }
}
