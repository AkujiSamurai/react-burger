import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { CustomScroll } from 'react-custom-scroll';
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useModal } from '@/hooks/useModal';
import {
  addBun,
  addIngredient,
  clearConstructor,
  moveIngredient,
  selectPrice,
} from '@/services/burger-constructor/slice';
import { placeOrder } from '@/services/order/action';
import { getUser } from '@/services/user/slice';

import { DraggableIngredient } from '../draggable-ingredient/draggable-ingredient';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type React from 'react';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(getUser);
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const { isModalOpen, openModal, closeModal } = useModal();
  const totalPrice = useAppSelector(selectPrice);

  const [{ isHoverBun }, dropBunTarget] = useDrop<
    TIngredient,
    void,
    { isHoverBun: boolean }
  >({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
  });
  const [{ isHoverMain }, dropMainTarget] = useDrop<
    TIngredient,
    void,
    { isHoverMain: boolean }
  >({
    accept: ['main', 'sauce'],
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
    }),
  });

  const handleCloseModal = (): void => {
    dispatch(clearConstructor());
    closeModal();
  };

  useEffect(() => {
    console.log(location.state);
    if (location.state?.createOrder) {
      if (bun) {
        const ingredientsId = [bun._id, ...ingredients.map((item) => item._id), bun._id];
        dispatch(placeOrder(ingredientsId));
        openModal();
        navigate(location.pathname, {
          replace: true,
          state: null,
        });
      }
    }
  }, []);

  const handleCreateOrder = (): void => {
    if (!user) {
      navigate('/login', { state: { from: location, createOrder: true } });
      return;
    }
    if (bun) {
      const ingredientsId = [bun._id, ...ingredients.map((item) => item._id), bun._id];
      dispatch(placeOrder(ingredientsId));
      openModal();
    }
  };

  const handleMoveIngredient = (fromIndex: number, toIndex: number): void => {
    dispatch(moveIngredient({ fromIndex, toIndex }));
  };

  const setBunDropTarget = (node: HTMLDivElement | null): void => {
    dropBunTarget(node);
  };

  const setMainDropTarget = (node: HTMLUListElement | null): void => {
    dropMainTarget(node);
  };

  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.constructor_wrapper} mb-10`} ref={setBunDropTarget}>
        <div className="ml-8">
          {!bun ? (
            <div
              className={`${styles.constructor_top} ${isHoverBun ? styles.hover : ''} text text_type_main-default`}
            >
              Выберите булку
            </div>
          ) : (
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="top"
            />
          )}
        </div>

        <ul className={styles.scroll_container} ref={setMainDropTarget}>
          <CustomScroll flex="1">
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <DraggableIngredient
                  key={item.id}
                  ingredient={item}
                  index={index}
                  moveIngredient={handleMoveIngredient}
                />
              ))
            ) : (
              <div
                className={`${styles.constructor_main} ${isHoverMain ? styles.hover : ''} text text_type_main-default ml-8`}
              >
                Выберите начинку
              </div>
            )}
          </CustomScroll>
        </ul>

        <div className="ml-8">
          {!bun ? (
            <div
              className={`${styles.constructor_bottom} ${isHoverBun ? styles.hover : ''} text text_type_main-default`}
            >
              Выберите булку
            </div>
          ) : (
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              type="bottom"
            />
          )}
        </div>
      </div>
      <div className={`${styles.footer} mr-4 mb-10`}>
        <div className="text text_type_main-large mr-4">
          <span className="pr-1">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={!bun}
          onClick={handleCreateOrder}
          size="medium"
          type="primary"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
