import { Component, OnInit } from '@angular/core'; 
import { Artwork } from '../../artwork.model';
import { ArtworkService } from '../../service/artwork.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[CommonModule]
})
export class HomeComponent implements OnInit {
  artworks: Artwork[] = [];
  loading: boolean = true;

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    this.fetchArtworks();
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
        photo: this.bufferToBase64(artwork.photo.data),
        photo_link:artwork.photo_link
      })).filter(artwork => artwork.status);
      this.loading = false;
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
