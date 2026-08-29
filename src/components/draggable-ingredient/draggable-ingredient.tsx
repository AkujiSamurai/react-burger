import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '@/hooks/hooks';
import {
  deleteIngredient,
  type IngredientsForOrder,
} from '@/services/burger-constructor/slice';

import styles from './draggable-ingredient.module.css';

type DraggableIngredientProps = {
  ingredient: IngredientsForOrder;
  index: number;
  moveIngredient: (fromIndex: number, toIndex: number) => void;
};

type DragedItem = {
  index: number;
};

export const DraggableIngredient = ({
  ingredient,
  index,
  moveIngredient,
}: DraggableIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [{ isDrag }, dragRef] = useDrag<DragedItem, void, { isDrag: boolean }>({
    type: 'draggableIngredient',
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<DragedItem>({
    accept: 'draggableIngredient',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveIngredient(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const ref = (node: HTMLLIElement | null): void => {
    dragRef(node);
    dropRef(node);
  };

  const handleDeleteIngredient = (id: string): void => {
    dispatch(deleteIngredient(id));
  };

  return (
    <li
      className={`${styles.scroll_item} mb-4`}
      ref={ref}
      style={{
        visibility: isDrag ? 'hidden' : 'visible',
      }}
    >
      <DragIcon className="mr-2" type="primary" />
      <ConstructorElement
        handleClose={() => handleDeleteIngredient(ingredient.id)}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};
