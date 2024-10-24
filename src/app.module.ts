// import { Inject, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';

// @Module({
//   imports: [UserModule,TypeOrmModule.forRoot({
//     imports: [UserModule],
//     injects: [UserModule],
//     type: 'postgres',
//     host: process.env.POSTGRES_HOST,
//     port: parseInt(process.env.POSTGRES_PORT!),
//     password: process.env.POSTGRES_PASSWORD,
//     username: process.env.POSTGRES_USER,
//     entities: [],
//     database: process.env.POSTGRES_DATABASE,
//     synchronize: false,
//     logging: true,
//   })],
// })
// export class AppModule {}


import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
