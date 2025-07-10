'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddPicture from '../components/AddPicture';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '../context/AuthContext';


const Gallery = () => {
  const {user} = useAuth();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .storage
        .from('gallery-images')
        .list('', { limit: 100, offset: 0 });

      if (error) {
        console.error('Error listing images:', error.message);
        setLoading(false);
        return;
      }

      const urls = data
        .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i)) 
        .map(file => {
          const { data } = supabase
            .storage
            .from('gallery-images')
            .getPublicUrl(file.name);

          const publicUrl = data.publicUrl;
          return publicUrl;
        });

      setImages(urls);
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center py-6 px-4">
        <div className="carousel rounded-box w-full max-w-4xl overflow-hidden shadow-lg">
          {images.map((image, index) => {
            const prev = index === 0 ? images.length - 1 : index - 1;
            const next = index === images.length - 1 ? 0 : index + 1;

            return (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <div className="w-full">
                  <img
                    src={image}
                    className="w-full h-full object-contain rounded-box"
                    alt={`Слайд ${index + 1}`}
                  />
                </div>

                <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                  <a href={`#slide${prev + 1}`} className="btn btn-circle bg-primary text-white border-none shadow">
                    ❮
                  </a>
                  <a href={`#slide${next + 1}`} className="btn btn-circle bg-primary text-white border-none shadow">
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
       {user &&<AddPicture />}
      <Footer />
    </>
  );
};

export default Gallery;
