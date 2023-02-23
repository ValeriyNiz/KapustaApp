import { DateComponent } from 'components/DateComponent/DateComponent';
import { DropDown } from 'components/DropDown/DropDown';
import css from './TabletForm.module.css';
import Sprite from '../../images/sprite.svg';

export const TabletForm = ({ options }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.bigFlex}>
        <DateComponent />
        <div className={css.formFlex}>
          <input
            type="text"
            name="productName"
            placeholder="Product description"
            className={css.inputName}
          />
          <DropDown options={options} />
          <div className={css.priceDiv}>
            <input
              type="text"
              name="price"
              placeholder="00.00"
              className={css.price}
            />
            <svg width="20" height="20" className={css.calculator}>
              <use href={`${Sprite}#calculator`}></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={css.buttonsDiv}>
        <button type="submit" className={`${css.button} ${css.submit}`}>
          Input
        </button>
        <button type="button" className={`${css.button} ${css.clear}`}>
          Clear
        </button>
      </div>
    </form>
  );
};
