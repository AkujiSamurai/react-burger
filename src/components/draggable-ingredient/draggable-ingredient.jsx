import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { deleteIngredient } from '@/services/burger-constructor/slice';

import styles from './draggable-ingredient.module.css';

export const DraggableIngredient = ({ ingredient, index, moveIngredient }) => {
  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: 'draggableIngredient',
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'draggableIngredient',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveIngredient(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const ref = (node) => {
    dragRef(node);
    dropRef(node);
  };

  const handleDeleteIngredient = (id) => {
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
      <DragIcon className="mr-2" />
      <ConstructorElement
        handleClose={() => handleDeleteIngredient(ingredient.id)}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </li>
  );
};
