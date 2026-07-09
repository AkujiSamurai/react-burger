import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { CustomScroll } from 'react-custom-scroll';

import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';

import { IngredientsList } from '../ingredients-list/ingredients-list';
import { Modal } from '../modal/modal';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedIngredient(item);
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <CustomScroll heightRelativeToParent="100%">
        <IngredientsList title="Булки" type="bun" onItemClick={handleOpenModal} />
        <IngredientsList title="Соусы" type="sauce" onItemClick={handleOpenModal} />
        <IngredientsList title="Начинки" type="main" onItemClick={handleOpenModal} />
      </CustomScroll>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
