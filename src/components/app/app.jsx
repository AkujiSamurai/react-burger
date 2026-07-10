import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { IngredientsContext } from '@/context/ingredients-context';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { url } from '@utils/url';

import styles from './app.module.css';

export const App = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setIngredientsList(response.data.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className={`${styles.error} mt-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }

  return (
    <IngredientsContext.Provider value={{ ingredientsList, setIngredientsList }}>
      <div className={styles.app}>
        <AppHeader />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
              Соберите бургер
            </h1>
            <main className={`${styles.main} pl-5 pr-5`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </>
        )}
      </div>
    </IngredientsContext.Provider>
  );
};
