import { ReactNode } from 'react';
<<<<<<< HEAD

/**
 * @brief Grid where clients cards are located
 * @param children child element that contains elements needed
 * @return Grid
 */
=======
>>>>>>> 5a10eda96cca19e0910f31d9acd4774c98f7b3ee

interface CardsGridProps {
  children: ReactNode;
}
<<<<<<< HEAD

const CardsGrid = ({ children }: CardsGridProps) => {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 bg-white rounded-xl shadow-xl p-7'>
      {children}
    </section>
  );
};

=======
const CardsGrid = ({ children }: CardsGridProps) => {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 bg-white rounded-xl shadow-xl p-7'>
      {children}
    </section>
  );
};

>>>>>>> 5a10eda96cca19e0910f31d9acd4774c98f7b3ee
export default CardsGrid;
