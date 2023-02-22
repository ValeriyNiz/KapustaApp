import css from './Report.module.css';
import Sprite from '../../images/currentPeriod.svg';
import { chooseIcon } from './chooseIcon';
import {
  getTotalReportObject,
  getSearchedMonth,
  getSearchedYear,
  getDifference,
} from 'redux/report/report-selectors';

import { useSelector, useDispatch } from 'react-redux';
import { fetchFullStatistics } from 'redux/report/report-operations';
import { useState } from 'react';
import { useEffect } from 'react';
export const Report = () => {
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
  const dispatch = useDispatch();
  const searchedYear = useSelector(getSearchedYear);
  const searchedMonth = useSelector(getSearchedMonth);
  const totalReportObject = useSelector(getTotalReportObject);
  const [activeStatus, setActiveStatus] = useState('Income');
  const [categoriesArray, setCategoriesArray] = useState();
  let incomCategoriesSorted;
  let expensesCategoriesSorted;
  useEffect(() => {
    dispatch(
      fetchFullStatistics({
        year: searchedYear,
        currentMonth: monthNames.findIndex(m => m === searchedMonth) + 1,
      })
    );
  }, [searchedMonth, searchedYear, dispatch]);
  if (totalReportObject) {
    const income = totalReportObject.income;
    const expenses = totalReportObject.expenses;

    const incomeCategories = income.categories;
    const expensesCategories = expenses.categories;

    if (incomeCategories !== undefined) {
      incomCategoriesSorted = [...incomeCategories].sort(
        (first, second) => first.sum - second.sum
      );
    }
    if (expensesCategories !== undefined) {
      expensesCategoriesSorted = [...expensesCategories].sort(
        (first, second) => first.sum - second.sum
      );
    }``
  }

  const onStatusChange = () => {
    if (activeStatus === 'Expenses') {
      setActiveStatus('Income');
    } else {
      setActiveStatus('Expenses');
    }
  };
  useEffect(() => {
    if (activeStatus === 'Expenses') {
      setCategoriesArray(expensesCategoriesSorted);
    } else {
      setCategoriesArray(incomCategoriesSorted);
    }
  }, [activeStatus, totalReportObject]);
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
