import css from './Report.module.css';
import Sprite from '../../images/currentPeriod.svg';
import { chooseIcon } from './chooseIcon';
import { data } from './file';
export const Report = () => {
  const { income } = data;
  const { categories } = income;
  console.log(categories);

  categories.map(cat => console.log(cat.category));
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <button>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-left`}></use>
            </svg>
          </button>
          <p className={css.header}>Expenses</p>
          <button>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>
        <ul className={css.list}>
          {categories.map(category => (
            <li className={css.item}>
              <p className={css.sum}>{category.sum}</p>
              <div className={css.backGround}>
                <svg className={css.icon} width={55} height={56}>
                  <use href={chooseIcon(category.category)}></use>
                </svg>
              </div>
              <p className={css.category}>{category.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
