import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, HttpStatus, HttpException, Res, Patch } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { Artwork } from 'src/Entities/Artwork/artwork.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('artworks')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artworkData: Partial<Artwork>,
  ) {
    const photo = file ? file.buffer : null;
    return this.artworkService.create({
      ...artworkData,
      photo,
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Artwork>) {
    return this.artworkService.update(id, updateData);
  }

  @Patch(':id/status')
  async updateArtworkStatus(
      @Param('id') id: number,
      @Body() updateData: { status: boolean }
  ) {
      return this.artworkService.update(id, { status: updateData.status });
  }

  @Get()
  findAll() {
    return this.artworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.artworkService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.artworkService.delete(id);
  }

  @Get(':id/photo')
  async getPhoto(@Param('id') id: number, @Res() res: Response) {
    try {
      const photoBuffer = await this.artworkService.getPhoto(id);
      res.set('Content-Type', 'image/png');
      res.send(photoBuffer);
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }
}