import css from './ToTransaction.module.css';
import Sprite from '../../images/sprite.svg';
import { useNavigate } from 'react-router-dom';

export const ToTransaction = () => {
  const navigate = useNavigate();

  const goToExpensesPage = () => {
    navigate('mobile-product-form');
  };

  return (
    <div className={css.linkFlex}>
      <button onClick={goToExpensesPage}>
        <svg width="14" height="9">
          <use href={`${Sprite}#back-arrow`}></use>
        </svg>
        <p className={css.transaction}>To Transaction</p>
      </button>
    </div>
  );
};
