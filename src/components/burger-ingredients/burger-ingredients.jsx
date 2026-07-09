import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { CustomScroll } from 'react-custom-scroll';

import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { useModal } from '@/hooks/useModal';

import { IngredientsList } from '../ingredients-list/ingredients-list';
import { Modal } from '../modal/modal';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpenModal = (item) => {
    openModal();
    setSelectedIngredient(item);
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
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
