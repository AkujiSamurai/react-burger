import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { CustomScroll } from 'react-custom-scroll';

import { useGetOrdersQuery } from '@/api/orderApi';
import { OrderCard } from '@/components/order-card/order-card';

import styles from './feed-page.module.css';

export const FeedPage = (): React.JSX.Element => {
  const { data, isLoading, isError } = useGetOrdersQuery();
  if (!data) {
    return <p className="text text_type_main-large mt-20">Лента заказов пуста</p>;
  }

  const ordersDone = data.orders.filter((order) => order.status === 'done').slice(0, 10);
  const orderPending = data.orders
    .filter((order) => order.status === 'pending')
    .slice(0, 10);

  if (isError) {
    return (
      <div className={`${styles.error} mt-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }

  return (
    <div className={styles.feed_page}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
          <div className={styles.content}>
            <div className={styles.order_scroll}>
              <CustomScroll flex="1">
                {data.orders.map((order) => (
                  <OrderCard order={order} key={order._id} to="/feed" />
                ))}
              </CustomScroll>
            </div>
            <div className={styles.info_orders}>
              <div className={`${styles.orders_status} mb-15`}>
                <div>
                  <h3 className="text text_type_main-default">Готовы:</h3>
                  <ul className={`${styles.orders_done} text text_type_main-default`}>
                    {ordersDone.map((order) => (
                      <li key={order._id}>{order.number}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text text_type_main-default">В работе:</h3>
                  <ul className={`${styles.orders_pending} text text_type_main-default`}>
                    {orderPending.map((order) => (
                      <li key={order._id}>{order.number}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h3 className="text text_type_main-default">Выполнено за все время:</h3>
              <p className={`${styles.total_number} text text_type_main-large mb-15`}>
                {data.total}
              </p>
              <h3 className="text text_type_main-default">Выполнено за сегодня:</h3>
              <p className={`${styles.total_number} text text_type_main-large`}>
                {data.totalToday}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
