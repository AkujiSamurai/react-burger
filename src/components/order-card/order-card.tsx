import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';
import { getIngredients } from '@/services/ingredients/slice';

import type { Order } from '@/api/orderApi';
import type { TIngredient } from '@/utils/types';

import styles from './order-card.module.css';

type OrderCardProps = {
  order: Order;
  to: string;
};

export const OrderCard = ({ order, to }: OrderCardProps): React.JSX.Element => {
  const { number, name, ingredients, createdAt, _id } = order;
  const ingredientsList = useAppSelector(getIngredients);
  const orderIngredients = ingredients
    .map((id) => ingredientsList.find((ingredient) => id === ingredient._id))
    .filter((item): item is TIngredient => item !== undefined);
  const visibleIngredients = orderIngredients.slice(0, 6);
  const remainingCount = orderIngredients.length - 6;
  const price = orderIngredients.reduce((sum, item) => sum + item.price, 0);
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const location = useLocation();

  return (
    <div className={`${styles.order_card} p-6 mb-4 mr-4`}>
      <Link
        to={`${to}/${_id}`}
        state={{ backgroundLocation: location }}
        className={styles.link}
      >
        <div className={`${styles.header} text text_type_main-small mb-6`}>
          <p>{`#${number}`}</p>
          <p className="text_color_inactive">{formattedDate}</p>
        </div>
        <p className={`${styles.name} text text_type_main-medium mb-6`}>{name}</p>
        <div className={styles.order_info}>
          <div className={styles.ingredients}>
            {visibleIngredients.map((ingredient, index) => {
              const isLastIngredient = index === 5 && remainingCount > 0;

              return (
                <div className={styles.ingredient} key={`${ingredient._id}-${index}`}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                  {isLastIngredient && (
                    <div className={`${styles.more} text text_type_main-small`}>
                      +{remainingCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className={`${styles.price} text text_type_main-default`}>
            {price}
            <CurrencyIcon type="primary" className="ml-2" />
          </p>
        </div>
      </Link>
    </div>
  );
};
