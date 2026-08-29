import { forwardRef } from 'react';

import { useAppSelector } from '@/hooks/hooks';
import { selectIngredientCount } from '@/services/ingredients/slice';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import type { TIngredient } from '@/utils/types';

import styles from './ingredients-list.module.css';

type IngredientsListProps = {
  title: string;
  type: string;
  onItemClick: (item: TIngredient) => void;
};

export const IngredientsList = forwardRef<HTMLHeadingElement, IngredientsListProps>(
  ({ title, type, onItemClick }, ref): React.JSX.Element => {
    const ingredientsList = useAppSelector(selectIngredientCount);
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
  }
);

IngredientsList.displayName = 'IngredientsList';
