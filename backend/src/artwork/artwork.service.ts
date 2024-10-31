import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artwork } from 'src/Entities/Artwork/artwork.entity';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  async create(artworkData: Partial<Artwork>): Promise<Artwork> {
    const artwork = this.artworkRepository.create(artworkData);
    return this.artworkRepository.save(artwork);
  }

  async findAll(): Promise<Artwork[]> {
    return this.artworkRepository.find();
  }

  async findOne(id: number): Promise<Artwork> {
    return this.artworkRepository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Artwork>): Promise<Artwork> {
    await this.artworkRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.artworkRepository.delete(id);
  }

  async getPhoto(id: number): Promise<Buffer> {
    const artwork = await this.artworkRepository.findOneBy({ id });
    if (!artwork || !artwork.photo) {
      throw new Error('Artwork not found or no photo available');
    }
    return artwork.photo; 
  }
  
}
