'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const images = [
  'athlete-6562693_1280.jpg',
  'boys-7056005_1280.jpg',
  'football-5596790_1280.jpg',
  'football-7509423_1280.jpg',
  'goalkeeper-7893178_1280.jpg',
];

const Gallery = () => {
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
                    src={`/images/${image}`}
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
      <Footer/>
    </>
  );
};

export default Gallery;
