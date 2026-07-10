import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useContext } from 'react';

import { IngredientsContext } from '@/context/ingredients-context';

import styles from './ingredients-list.module.css';

export const IngredientsList = ({ title, type, onItemClick }) => {
  const { ingredientsList, setIngredientsList } = useContext(IngredientsContext);
  const ingredients = Array.isArray(ingredientsList)
    ? ingredientsList.filter((item) => item.type === type)
    : [];

  const handleClickBuy = (item, event) => {
    event.stopPropagation();
    if (type === 'bun') {
      setIngredientsList((prev) =>
        prev.map((ingredient) => {
          if (ingredient._id === item._id) {
            return { ...ingredient, __v: 1 };
          }
          if (ingredient.type === 'bun') {
            return { ...ingredient, __v: 0 };
          }

          return ingredient;
        })
      );
    } else {
      setIngredientsList((prev) =>
        prev.map((ingredient) =>
          ingredient._id === item._id
            ? { ...ingredient, __v: ingredient.__v + 1 }
            : ingredient
        )
      );
    }
  };

  return (
    <section className="pb-10">
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <div className="ml-4 mr-4">
        <ul className={styles.ingredients}>
          {ingredients.map((item) => (
            <li
              key={item._id}
              className={styles.ingredient}
              onClick={() => onItemClick(item)}
            >
              {item.__v > 0 && <Counter count={item.__v} size="default" />}
              <img src={item.image} alt={item.name} className="ml-4 mr-4" />
              <div
                className={`mt-1 mb-1 ${styles.price}`}
                onClick={(e) => handleClickBuy(item, e)}
              >
                <span className="pr-1">{item.price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className={styles.name}>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
