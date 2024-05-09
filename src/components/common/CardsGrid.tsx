import { ReactNode } from 'react';

/**
 * @brief Grid where clients cards are located
 * @param children child element that contains elements needed
 * @return Grid
 */

interface CardsGridProps {
  children: ReactNode;
}

const CardsGrid = ({ children }: CardsGridProps) => {
  return (
    <section className='grid grid-rows-[min-content] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 bg-white rounded-xl shadow-xl p-7 flex-1 min-h-0 overflow-y-scroll'>
      {children}
    </section>
  );
};

export default CardsGrid;
