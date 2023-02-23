import css from './DateComponent.module.css';
import Sprite from '../../images/sprite.svg';

export const DateComponent = () => {
  const current = new Date();

  return (
    <div className={css.dateDiv}>
      <svg width="20" height="20">
        <use href={`${Sprite}#calendar`}></use>
      </svg>
      <p className={css.date}>{`${current
        .getDate()
        .toString()
        .padStart(2, '0')}.${(current.getMonth() + 1)
        .toString()
        .padStart(2, '0')}.${current.getFullYear()}`}</p>
    </div>
  );
};
