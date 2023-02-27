import { DateComponent } from 'components/DateComponent/DateComponent';
import { DropDown } from 'components/DropDown/DropDown';
import css from './TabletForm.module.css';
import Sprite from '../../images/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from 'redux/report/report-operations';
import { useLocation } from 'react-router';

export const TabletForm = ({ options }) => {
  const [selectedDropValue, setSelectedDropValue] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const isIncome = location.search.includes('income');

  const resetForm = () => {
    document.getElementById('productForm').reset();
    setSelectedDropValue(null);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    if (selectedDropValue) {
      dispatch(
        addTransaction({
          dateTransaction: new Date(),
          income: isIncome,
          sum: form.elements.price.value,
          category: selectedDropValue.label,
          description: form.elements.productName.value,
        })
      );
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form} id="productForm">
      <div className={css.bigFlex}>
        <DateComponent />
        <div className={css.formFlex}>
          <input
            type="text"
            name="productName"
            placeholder="Product description"
            className={css.inputName}
          />
          <DropDown
            options={options}
            selectedDropValue={selectedDropValue}
            setSelectedDropValue={setSelectedDropValue}
          />
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
        <button
          type="button"
          className={`${css.button} ${css.clear}`}
          onClick={() => resetForm()}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
