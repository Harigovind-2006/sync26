'use client';

import React, { createContext, useContext, useState } from 'react';
import { CardItem } from '../types';
import { mockCards } from '../lib/mockData';

interface ImageContextType {
  photos: CardItem[];
  addPhoto: (photo: CardItem) => void;
  removePhoto: (id: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<CardItem[]>(mockCards.slice(0, 3));

  const addPhoto = (photo: CardItem) => {
    setPhotos((prev) => [photo, ...prev]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <ImageContext.Provider value={{ photos, addPhoto, removePhoto }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}
