import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      cache: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];