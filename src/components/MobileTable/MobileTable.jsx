import css from './MobileTable.module.css';
import Sprite from '../../images/sprite.svg';
import { DateComponent } from 'components/DateComponent/DateComponent';

export const MobileTable = ({ data, choice }) => {
  return (
    <>
      <DateComponent />
      <ul>
        {data.map((t, idx) => (
          <li key={idx}>
            <div className={css.elementDiv}>
              <div>
                <p className={css.name}>{t.name}</p>
                <div className={css.infoDiv}>
                  <p className={css.info}>{t.date}</p>
                  <p className={css.info}>{t.category}</p>
                </div>
              </div>
              {choice === 'expenses' ? (
                <p className={css.value}>- {t.value}</p>
              ) : (
                <p className={`${css.value} ${css.income}`}>{t.value}</p>
              )}
              <svg width="18" height="18" className={css.bin}>
                <use href={`${Sprite}#bin`}></use>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
