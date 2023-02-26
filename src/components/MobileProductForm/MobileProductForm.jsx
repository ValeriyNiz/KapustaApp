import { DropDown } from 'components/DropDown/DropDown';
import css from './MobileProductForm.module.css';
import Sprite from '../../images/sprite.svg';
import { useState } from 'react';

export const MobileProductForm = () => {
  const [selectedDropValue, setSelectedDropValue] = useState(null);

  const handleSubmit = evt => {
    evt.preventDefault();
  };

  const resetForm = () => {
    document.getElementById('productForm').reset();
    setSelectedDropValue(null);
  };

  const options = [
    { value: 'transport', label: 'Transport' },
    { value: 'products', label: 'Products' },
    { value: 'health', label: 'Health' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'housing', label: 'Housing' },
    { value: 'technique', label: 'Technique' },
    { value: 'comm', label: 'Communal, communication' },
    { value: 'sports', label: 'Sports, hobbies' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <>
      <div className={css.containerSVG}>
        <svg width="18" height="12">
          <use href={`${Sprite}#back-arrow`}></use>
        </svg>
      </div>
      <form onSubmit={handleSubmit} id="productForm">
        <div className={css.containerBG}>
          <input
            type="text"
            name="productName"
            placeholder="Product description"
            className={css.inputName}
          />
          <div className={css.containerDrop}>
            <DropDown
              options={options}
              selectedDropValue={selectedDropValue}
              setSelectedDropValue={setSelectedDropValue}
            />
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
          <button
            type="button"
            className={`${css.button} ${css.clear}`}
            onClick={() => resetForm()}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};
