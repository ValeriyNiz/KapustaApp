import css from './ToTransaction.module.css';
import Sprite from '../../images/sprite.svg';
// import { Link } from 'react-router-dom';

export const ToTransaction = () => {
  return (
    <div className={css.linkFlex}>
      {/* <Link to="/"> */}
      <svg width="14" height="9">
        <use href={`${Sprite}#back-arrow`}></use>
      </svg>
      <p className={css.transaction}>To Transaction</p>
      {/* </Link> */}
    </div>
  );
};
