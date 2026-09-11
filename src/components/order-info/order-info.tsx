import { CurrencyIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { CustomScroll } from 'react-custom-scroll';
import { useParams } from 'react-router-dom';

import { getOrder } from '@/api/api';
import { useGetOrdersQuery, type Order } from '@/api/orderApi';
import { useAppSelector } from '@/hooks/hooks';
import { getIngredients } from '@/services/ingredients/slice';

import type React from 'react';

import type { TIngredient } from '@/utils/types';

import styles from './order-info.module.css';

type ingredientsMap = {
  count: number;
  ingredient: TIngredient;
};

export const OrderInfo = (): React.JSX.Element => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrdersQuery();
  const ingredientsList = useAppSelector(getIngredients);
  const [order, setOrder] = useState<Order | null>(null);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [isErrorGetOrder, setIsErrorGetOrder] = useState(false);

  useEffect(() => {
    if (!id || order || isLoading || !data?.success) {
      return;
    }

    const socketOrder = data && data.orders.find((order) => order._id === id);
    if (socketOrder) {
      setOrder(socketOrder);
      return;
    }

    const fetchOrder = async (): Promise<void> => {
      try {
        setIsOrderLoading(true);
        const response = await getOrder(id);
        setOrder(response);
      } catch {
        setIsErrorGetOrder(true);
      } finally {
        setIsOrderLoading(false);
      }
    };

    fetchOrder();
  }, [id, isLoading, order, data]);

  if (isError || isErrorGetOrder) {
    return (
      <div className={`${styles.error} mt-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }

  const orderIngredients =
    order &&
    order.ingredients.reduce<Map<string, ingredientsMap>>((map, id) => {
      const ingredient = ingredientsList.find((item) => item._id === id);

      if (!ingredient) {
        return map;
      }

      const existing = map.get(id);

      if (existing) {
        existing.count += 1;
      } else {
        map.set(id, {
          ingredient: ingredient,
          count: 1,
        });
      }

      return map;
    }, new Map());

  const uniqueOrderIngredients = orderIngredients && [...orderIngredients.values()];
  const price =
    uniqueOrderIngredients &&
    uniqueOrderIngredients.reduce(
      (sum, item) => sum + item.ingredient.price * item.count,
      0
    );
  const dateCreated = order && new Date(order.createdAt);
  const fomattedDate =
    dateCreated &&
    dateCreated.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className={styles.content}>
      {isLoading || !uniqueOrderIngredients || isOrderLoading ? (
        <div className="m-20">
          <Preloader />
        </div>
      ) : (
        <div className={styles.order_info}>
          <h2 className="text text_type_main-medium mb-10 mt-15">{`#${order.number}`}</h2>
          <p className={`${styles.name} text text_type_main-medium mb-3`}>
            {order.name}
          </p>
          <p className={`${styles.status} text text_type_main-default mb-15`}>
            {order.status}
          </p>
          <p className="text text_type_main-medium mb-6">Состав:</p>
          <div className={styles.scroll_items}>
            <CustomScroll flex="1">
              {uniqueOrderIngredients.map((item, id) => (
                <div
                  key={id}
                  className={`${styles.ingredient} text text_type_main-default mb-4 mr-4`}
                >
                  <div className={styles.info_ingredients}>
                    <div className={styles.img}>
                      <img
                        src={item.ingredient.image_mobile}
                        alt={item.ingredient.name}
                      />
                    </div>
                    <p>{item.ingredient.name}</p>
                  </div>
                  <p className={styles.price}>
                    {`${item.count} х ${item.ingredient.price}`}{' '}
                    <CurrencyIcon type="primary" />
                  </p>
                </div>
              ))}
            </CustomScroll>
          </div>
          <div
            className={`${styles.date_info} text text_type_main-default mb-10 text_color_inactive mt-10`}
          >
            {fomattedDate}
            <p className={`${styles.price} text text_type_main-default`}>
              {price}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
