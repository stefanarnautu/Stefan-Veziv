import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork } from '../artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  constructor() {
  }

  async getArtworks(): Promise<Artwork[]> {
    const response = await fetch('http://localhost:3000/artworks'); // Adjust your URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Ensure this returns the correct format
  }

  async addArtwork(formData: FormData): Promise<any> {
    const response = await fetch('http://localhost:3000/artworks', {
      method: 'POST',
      body: formData 
    });
    if (!response.ok) {
      throw new Error('Error adding artwork');
    }

    return response.json();
  }

  async updateArtworkStatus(id: number, status: boolean): Promise<any> {
    const response = await fetch(`http://localhost:3000/artworks/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // Important: set content type to JSON
      },
      body: JSON.stringify({ status }),
    });
  
    if (!response.ok) {
      throw new Error('Error updating artwork status');
    }
  
    return response.json();
  }

  async deleteArtworkPhoto(id: number): Promise<any> {
    const response = await fetch(`http://localhost:3000/artworks/${id}`, {
      method: 'DELETE'
  });
  
  if (response.ok) {
      console.log('Artwork photo deleted successfully');
  } else {
      console.error('Error deleting artwork photo:', response.status);
  }
  }
}
