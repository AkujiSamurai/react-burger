import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getIngredients } from '@/services/ingredients/slice';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const ingredients = useSelector(getIngredients);
  const { id } = useParams();

  const selectedIngredient = useMemo(() => {
    return ingredients.find((ingredient) => ingredient._id.toString() === id.toString());
  }, [id, ingredients]);

  return (
    <div className={styles.content}>
      {!selectedIngredient ? (
        <Preloader />
      ) : (
        <>
          <h2 className="text text_type_main-large mt-15">Детали ингредиента</h2>
          <img
            src={selectedIngredient.image_large}
            alt={selectedIngredient.name}
            className={styles.img}
          />
          <p className="text text_type_main-medium mt-4 mb-8">
            {selectedIngredient.name}
          </p>
          <div className={`${styles.info} mb-15`}>
            <div className="text text_type_main-small text_color_inactive mr-5">
              <div>Калории,ккал</div>
              <div>{selectedIngredient.calories}</div>
            </div>
            <div className="text text_type_main-small text_color_inactive mr-5">
              <div>Белки, г</div>
              <div>{selectedIngredient.proteins}</div>
            </div>
            <div className="text text_type_main-small text_color_inactive mr-5">
              <div>Жиры, г</div>
              <div>{selectedIngredient.fat}</div>
            </div>
            <div className="text text_type_main-small text_color_inactive mr-5">
              <div>Углеводы, г</div>
              <div>{selectedIngredient.carbohydrates}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
