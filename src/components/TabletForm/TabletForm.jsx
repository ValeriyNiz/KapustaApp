import { DateComponent } from 'components/DateComponent/DateComponent';
import { DropDown } from 'components/DropDown/DropDown';
import css from './TabletForm.module.css';
import Sprite from '../../images/sprite.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from 'redux/report/report-operations';
import { useLocation } from 'react-router';
import ModalSimple from 'shared/ModalSimple/ModalSimple';
import { getError } from 'redux/report/report-selectors';
// import { getChoice } from 'redux/report/report-selectors';

export const TabletForm = () => {
  const [selectedDropValue, setSelectedDropValue] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  // const choice = useSelector(getChoice);
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const location = useLocation();
  const isIncome = location.search.includes('income');
  let options = [];

  if (!isIncome) {
    options = [
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
  } else {
    options = [
      { value: 'salary', label: 'Salary' },
      { value: 'income', label: 'Income' },
      { value: 'other', label: 'Other' },
    ];
  }

  const resetForm = () => {
    document.getElementById('productForm').reset();
    setSelectedDropValue(null);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const form = evt.target;
    if (selectedDropValue) {
      await dispatch(
        addTransaction({
          dateTransaction: new Date(),
          income: isIncome,
          sum: form.elements.price.value,
          category: selectedDropValue.label,
          description: form.elements.productName.value,
        })
      );
      resetForm();
      setIsModalActive(true);
    }
  };

  return (
    <>
      {error && (
        <ModalSimple active={isModalActive} setActive={setIsModalActive}>
          {error}
        </ModalSimple>
      )}
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
    </>
  );
};
