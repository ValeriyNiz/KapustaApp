import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { fetchFullStatistics } from 'redux/report/report-operations';
import {
  getTotalReportObject,
  getSearchedMonth,
  getSearchedYear,
//   getDifference,
} from 'redux/report/report-selectors';

import css from './Report.module.css';
import Sprite from '../../images/currentPeriod.svg';
import { chooseIcon } from './chooseIcon';

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

export const Report = () => {
  
  const dispatch = useDispatch();
  const searchedYear = useSelector(getSearchedYear);
  const searchedMonth = useSelector(getSearchedMonth);
  const totalReportObject = useSelector(getTotalReportObject);
  const [activeStatus, setActiveStatus] = useState('Income');
  const [categoriesArray, setCategoriesArray] = useState();
//   let incomCategoriesSorted;
//   let expensesCategoriesSorted;
  useEffect(() => {
    dispatch(
      fetchFullStatistics({
        year: searchedYear,
        currentMonth: monthNames.findIndex(m => m === searchedMonth) + 1,
      })
    );
  }, [searchedMonth, searchedYear, dispatch]);
  
  useEffect(() => {
    if (totalReportObject) {
      const { income, expenses } = totalReportObject;
      let incomCategoriesSorted = null;
      let expensesCategoriesSorted = null;

      if (income && income.categories) {
        incomCategoriesSorted = [...income.categories].sort(
          (first, second) => first.sum - second.sum
        );
      }
      if (expenses && expenses.categories) {
        expensesCategoriesSorted = [...expenses.categories].sort(
          (first, second) => first.sum - second.sum
        );
      }
      setCategoriesArray(activeStatus === 'Expenses'
        ? expensesCategoriesSorted
        : incomCategoriesSorted);
    }
  }, [activeStatus, totalReportObject]);

  const onStatusChange = () => {
    setActiveStatus(activeStatus === 'Expenses' ? 'Income' : 'Expenses');
  }
  
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <button type="button" onClick={onStatusChange}>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-left`}></use>
            </svg>
          </button>
          <p className={css.header}>{activeStatus}</p>
          <button type="button" onClick={onStatusChange}>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>
        {categoriesArray === undefined ? (
          <div className={css.empty}>There isn`t any data in this period</div>
        ) : (
          <ul className={css.list}>
            {categoriesArray &&
              categoriesArray.map(category => (
                <li className={css.item} key={category.category}>
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
        )}
      </div>
    </div>
  );
};
