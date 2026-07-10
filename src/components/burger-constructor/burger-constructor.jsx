import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useContext, useMemo } from 'react';
import { CustomScroll } from 'react-custom-scroll';

import { IngredientsContext } from '@/context/ingredients-context';
import { useModal } from '@/hooks/useModal';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { ingredientsList } = useContext(IngredientsContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredientBun = Array.isArray(ingredientsList)
    ? ingredientsList.find((item) => item.type === 'bun' && item.__v === 1)
    : [];

  const ingredients = useMemo(() => {
    if (!Array.isArray(ingredientsList)) {
      return [];
    }
    const result = [];
    ingredientsList.forEach((item) => {
      if (item.__v > 0 && item.type !== 'bun') {
        for (let i = 0; i < item.__v; i++) {
          result.push({
            ...item,
            uniqueId: `${item._id}${i}`,
          });
        }
      }
    });
    return result;
  }, [ingredientsList]);

  const totalPrice =
    ingredientBun?.price +
    ingredients.reduce((sum, item) => sum + item.price * item.__v, 0);

  return (
    <section className={styles.burger_constructor}>
      {!ingredientBun && <p className="text text_type_main-medium">Выберите булку</p>}
      {ingredientBun && (
        <>
          <div className={`${styles.constructor_wrapper} mb-10`}>
            <div className="ml-8">
              <ConstructorElement
                handleClose={() => console.log('click')}
                isLocked
                price={ingredientBun.price}
                text={`${ingredientBun.name} (верх)`}
                thumbnail={ingredientBun.image}
                type="top"
              />
            </div>

            {ingredients.length > 0 ? (
              <ul className={styles.scroll_container}>
                <CustomScroll flex="1">
                  {ingredients.map((item) => (
                    <li key={item.uniqueId} className={`${styles.scroll_item} mb-4`}>
                      <DragIcon className="mr-2" />
                      <ConstructorElement
                        handleClose={() => console.log('click')}
                        price={item.price}
                        text={item.name}
                        thumbnail={item.image}
                      />
                    </li>
                  ))}
                </CustomScroll>
              </ul>
            ) : (
              <p className="text text_type_main-medium mt-4 mb-4">Выберите начинку</p>
            )}
            <div className="ml-8">
              <ConstructorElement
                handleClose={() => console.log('click')}
                isLocked
                price={ingredientBun.price}
                text={`${ingredientBun.name} (низ)`}
                thumbnail={ingredientBun.image}
                type="bottom"
              />
            </div>
          </div>
          <div className={`${styles.footer} mr-4 mb-10`}>
            <div className="text text_type_main-large mr-4">
              <span className="pr-1">{totalPrice}</span>
              <CurrencyIcon />
            </div>
            <Button onClick={openModal} size="medium" type="primary">
              Оформить заказ
            </Button>
          </div>
        </>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
