import { DropDown } from 'components/DropDown/DropDown';
import css from './MobileProductForm.module.css';
import Sprite from '../../images/sprite.svg';

export const MobileProductForm = ({ options }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <>
      <div className={css.containerSVG}>
        <svg width="18" height="12">
          <use href={`${Sprite}#back-arrow`}></use>
        </svg>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={css.containerBG}>
          <input
            type="text"
            name="productName"
            placeholder="Product description"
            className={css.inputName}
          />
          <div className={css.containerDrop}>
            <DropDown options={options} />
          </div>
          <div className={css.priceContainer}>
            <input
              type="text"
              name="price"
              placeholder="00.00"
              className={css.price}
            />
            <div className={css.calcContainer}>
              <svg width="20" height="20">
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
    </>
  );
};
