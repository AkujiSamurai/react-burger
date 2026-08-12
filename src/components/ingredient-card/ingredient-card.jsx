import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import styles from './ingredient-card.module.css';

export const IngredientCard = ({ item, onItemClick }) => {
  const [, dragRef] = useDrag({
    type: item.type,
    item: item,
  });
  const location = useLocation();

  return (
    <li ref={dragRef} onClick={() => onItemClick(item)}>
      <Link
        className={styles.ingredient}
        to={`/ingredient/${item._id}`}
        state={{ backgroundLocation: location }}
      >
        {item.__v > 0 && <Counter count={item.__v} size="default" />}
        <img src={item.image} alt={item.name} className="ml-4 mr-4" />
        <div className={`mt-1 mb-1 ${styles.price}`}>
          <span className="pr-1">{item.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{item.name}</p>
      </Link>
    </li>
  );
};
