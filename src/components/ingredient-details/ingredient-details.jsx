import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ item }) => {
  return (
    <div className={styles.content}>
      <img src={item.image_large} alt={item.name} className={styles.img} />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <div className={`${styles.info} mb-15`}>
        <div className="text text_type_main-small text_color_inactive mr-5">
          <div>Калории,ккал</div>
          <div>{item.calories}</div>
        </div>
        <div className="text text_type_main-small text_color_inactive mr-5">
          <div>Белки, г</div>
          <div>{item.proteins}</div>
        </div>
        <div className="text text_type_main-small text_color_inactive mr-5">
          <div>Жиры, г</div>
          <div>{item.fat}</div>
        </div>
        <div className="text text_type_main-small text_color_inactive mr-5">
          <div>Углеводы, г</div>
          <div>{item.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
};
