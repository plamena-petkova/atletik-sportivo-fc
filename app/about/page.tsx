'use client';

import Navbar from "../components/Navbar";

const coaches = [
  { id: 1, name: 'Иван Петров', img: 'https://cdn.pixabay.com/photo/2020/03/11/17/32/engineer-4922781_1280.jpg' },
  { id: 2, name: 'Стефан Георгиев', img: 'https://cdn.pixabay.com/photo/2020/03/11/17/32/engineer-4922781_1280.jpg' },
  { id: 3, name: 'Георги Иванов', img: 'https://cdn.pixabay.com/photo/2020/03/11/17/32/engineer-4922781_1280.jpg' },
  { id: 4, name: 'Никола Боянов', img: 'https://cdn.pixabay.com/photo/2020/03/11/17/32/engineer-4922781_1280.jpg' },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-neutral mb-6">За нашия детски футболен клуб</h1>

          <div className="text-lg text-neutral space-y-4 mb-12">
            <p>
              Нашият клуб е създаден с мисия да развиваме талантите на децата и да ги вдъхновяваме чрез спорта.
            </p>
            <p>
              Предлагаме професионални тренировки, приятелска атмосфера и участие в регионални турнири.
            </p>
            <p>
              Екипът ни от опитни треньори е посветен на индивидуалното развитие и екипната работа.
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-secondary mb-10">Нашите треньори</h2>

          <div className="flex flex-wrap justify-center gap-8">
            {coaches.map(({ id, name, img }) => (
              <div
                key={id}
                className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
              >
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 shadow-md">
                    <img src={img} alt={name} />
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-medium text-neutral">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
