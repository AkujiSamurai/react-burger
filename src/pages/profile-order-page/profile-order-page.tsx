import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { CustomScroll } from 'react-custom-scroll';

import { useGetUserOrdersQuery } from '@/api/orderApi';
import { OrderCard } from '@/components/order-card/order-card';

import styles from './profile-order-page.module.css';

export const ProfileOrderPage = (): React.JSX.Element => {
  const { data, isLoading, isError } = useGetUserOrdersQuery();
  if (!data) {
    return <p className="text text_type_main-large mt-20">Лента заказов пуста</p>;
  }

  if (isError) {
    return (
      <div className={`${styles.error} mt-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }

  return (
    <div className={styles.order_page}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className={styles.content}>
            <div className={styles.order_scroll}>
              <CustomScroll flex="1">
                {data.orders.map((order) => (
                  <OrderCard order={order} key={order._id} to="/profile/orders" />
                ))}
              </CustomScroll>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
