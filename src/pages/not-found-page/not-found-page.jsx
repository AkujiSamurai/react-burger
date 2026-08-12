import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <p className="text text_type_main-medium mb-4">Ошибка 404. Страница не найдена </p>
      <Link className={`${styles.link} text text_type_main-medium`} to="/">
        Перейти на главную страницу
      </Link>
    </div>
  );
};
