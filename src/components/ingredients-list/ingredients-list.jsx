import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { selectIngredientCount } from '@/services/ingredients/slice';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import styles from './ingredients-list.module.css';

export const IngredientsList = forwardRef(({ title, type, onItemClick }, ref) => {
  const ingredientsList = useSelector(selectIngredientCount);
  const ingredients = Array.isArray(ingredientsList)
    ? ingredientsList.filter((item) => item.type === type)
    : [];

  return (
    <section className="pb-10">
      <h2 ref={ref} className="text text_type_main-medium mb-6">
        {title}
      </h2>
      <div className="ml-4 mr-4">
        <ul className={styles.ingredients}>
          {ingredients.map((item) => (
            <IngredientCard item={item} onItemClick={onItemClick} key={item._id} />
          ))}
        </ul>
      </div>
    </section>
  );
});

IngredientsList.displayName = 'IngredientsList';
