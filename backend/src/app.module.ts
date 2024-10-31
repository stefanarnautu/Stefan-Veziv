import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkService } from './artwork/artwork.service';
import { ArtworkController } from './artwork/artwork.controller';
import { Artwork } from './Entities/Artwork/artwork.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Stefan123',
      database: 'interview',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Artwork]),
  ],
  controllers: [AppController, ArtworkController],
  providers: [AppService, ArtworkService],
})
export class AppModule {}
