import { Component, OnInit } from '@angular/core';
import { ArtworkService } from '../../service/artwork.service';
import { Artwork } from '../../artwork.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  artworks:Artwork[] = [];

  newArtwork : Artwork = {
    id: 0, 
    title: '',
    artist: '',
    status: true, 
    photo: '',
    description: '',
    photo_link: ''
  };;

  file: File | null = null;

  constructor(private artworkService: ArtworkService){}
  
  ngOnInit(): void {
    this.fetchArtworks();
  }

  async onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (!this.newArtwork || !this.newArtwork.title || !this.newArtwork.artist || 
      !this.newArtwork.description || !this.newArtwork.photo_link || 
      this.newArtwork.status === undefined || !this.file) {
    console.warn('Please fill out all required fields');
    return;
  }
    
    const formData = new FormData();
    formData.append('title', this.newArtwork.title);
    formData.append('artist', this.newArtwork.artist);
    formData.append('description', this.newArtwork.description);
    formData.append('photo_link', this.newArtwork.photo_link);
    formData.append('status', String(this.newArtwork.status));
    
    if (this.file) {
      formData.append('photo', this.file, this.file.name);
    }
  
    try {
      const response = await this.artworkService.addArtwork(formData);
      console.log('Artwork added successfully');
    } catch (error) {
      console.error('Error adding artwork', error);
    }
  }

  async changeStatus(artwork: Artwork) {
    const newStatus = !artwork.status;
    try {
      await this.artworkService.updateArtworkStatus(artwork.id, newStatus);
      artwork.status = newStatus; 
      console.log('Artwork status updated successfully');
    } catch (error) {
      console.error('Error updating artwork status', error);
    }
  }

  async deletePhoto(artwork: Artwork) {
    try {
      await this.artworkService.deleteArtworkPhoto(artwork.id);
      this.artworks = this.artworks.filter(a => a.id !== artwork.id);
      
    } catch (error) {
      console.error('Error deleting artwork photo', error);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  onDragOver(event: DragEvent): void {
      event.preventDefault();
      (event.currentTarget as HTMLElement).classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
      event.preventDefault();
      (event.currentTarget as HTMLElement).classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
          this.file = files[0];
          (event.currentTarget as HTMLElement).classList.remove('drag-over');
      }
  }
  

  async fetchArtworks(): Promise<void> {
    try {
      const data = await this.artworkService.getArtworks();
      this.artworks = data.map((artwork: any) => ({
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist,
        status: artwork.status,
        description: artwork.description,
        photo: artwork.photo ? this.bufferToBase64(artwork.photo.data) : '', // Check if artwork.photo exists
        photo_link: artwork.photo_link
      }));
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  }

  bufferToBase64(buffer: number[]): string {  
    if (!buffer || buffer.length === 0) {
      console.error('Empty buffer received');
      return '';
    }

    const byteArray = new Uint8Array(buffer);
    
    const binaryString = Array.from(byteArray)
      .map(byte => String.fromCharCode(byte))
      .join('');
    
    return 'data:image/jpeg;base64,' + window.btoa(binaryString);
  }
}
