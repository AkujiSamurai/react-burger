import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { CustomScroll } from 'react-custom-scroll';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { useModal } from '@/hooks/useModal';
import {
  addBun,
  addIngredient,
  clearConstructor,
  moveIngredient,
  selectPrice,
} from '@/services/burger-constructor/slice';
import { placeOrder } from '@/services/order/action';

import { DraggableIngredient } from '../draggable-ingredient/draggable-ingredient';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { isModalOpen, openModal, closeModal } = useModal();
  const totalPrice = useSelector(selectPrice);

  const [{ isHoverBun }, dropBunTarget] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch(addBun(item));
    },
    collect: (monitor) => ({
      isHoverBun: monitor.isOver(),
    }),
  });
  const [{ isHoverMain }, dropMainTarget] = useDrop({
    accept: ['main', 'sause'],
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHoverMain: monitor.isOver(),
    }),
  });

  const handleCloseModal = () => {
    dispatch(clearConstructor());
    closeModal();
  };

  const handleCreateOrder = () => {
    const ingredientsId = [bun._id, ...ingredients.map((item) => item._id), bun._id];
    dispatch(placeOrder(ingredientsId));
    openModal();
  };

  const handleMoveIngredient = (fromIndex, toIndex) => {
    dispatch(moveIngredient({ fromIndex, toIndex }));
  };

  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.constructor_wrapper} mb-10`} ref={dropBunTarget}>
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

        <ul className={styles.scroll_container} ref={dropMainTarget}>
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
          <CurrencyIcon />
        </div>
        <Button onClick={handleCreateOrder} size="medium" type="primary">
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
