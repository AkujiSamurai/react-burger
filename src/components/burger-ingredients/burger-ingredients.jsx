import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { CustomScroll } from 'react-custom-scroll';
import { useDispatch } from 'react-redux';

import { setIngredientSelected } from '@/services/ingredient-selected/slice';

import { IngredientsList } from '../ingredients-list/ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('bun');

  const wrapperRef = useRef(null);

  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);

  const handleOpenModal = (item) => {
    dispatch(setIngredientSelected(item));
  };

  const updateActiveTab = () => {
    if (!wrapperRef.current) return;

    const containerRect = wrapperRef.current.getBoundingClientRect();
    const targetTop = containerRect.top;

    let activeType = 'bun';
    let minDistance = 10000;

    const section = [
      { type: 'bun', ref: bunRef },
      { type: 'main', ref: mainRef },
      { type: 'sauce', ref: sauceRef },
    ];

    section.forEach(({ type, ref }) => {
      if (!ref.current) return;

      const sectionRest = ref.current.getBoundingClientRect();
      const distance = Math.abs(targetTop - sectionRest.top);

      if (distance < minDistance) {
        minDistance = distance;
        console.log(minDistance);
        activeType = type;
      }
    });

    setActiveTab(activeType);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav ref={wrapperRef} className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={activeTab === 'bun'}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTab === 'main'}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTab === 'sauce'}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <CustomScroll heightRelativeToParent="100%" onScroll={updateActiveTab}>
        <IngredientsList
          ref={bunRef}
          title="Булки"
          type="bun"
          onItemClick={handleOpenModal}
        />
        <IngredientsList
          ref={mainRef}
          title="Начинки"
          type="main"
          onItemClick={handleOpenModal}
        />
        <IngredientsList
          ref={sauceRef}
          title="Соусы"
          type="sauce"
          onItemClick={handleOpenModal}
        />
      </CustomScroll>
    </section>
  );
};
