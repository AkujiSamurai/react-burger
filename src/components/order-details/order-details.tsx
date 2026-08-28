import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@/hooks/hooks';

import done from '../../assets/images/done.svg';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const { orderNumber, isLoading, isError } = useAppSelector((state) => state.order);

  if (isLoading) {
    return (
      <div className="m-20">
        <Preloader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`${styles.error} mb-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }
  return (
    <div className={styles.info}>
      <p className={`${styles.order_id} text text_type_digits-large mt-25 mb-8`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={styles.image} alt="done" src={done} />
      <p className="text text_type_main-default mt-15 mb-8">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
