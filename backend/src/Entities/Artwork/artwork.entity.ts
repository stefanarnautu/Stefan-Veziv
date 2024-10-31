import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column()
  description: string;

  @Column({ nullable: true })
  photo_link: string;
}