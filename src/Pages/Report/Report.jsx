import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { fetchFullStatistics } from 'redux/report/report-operations';
import {
  getTotalReportObject,
  getSearchedMonth,
  getSearchedYear,
  getSelectedCashflow,
} from 'redux/report/report-selectors';

import {
  setSearchedMonth,
  setSelectedCashflow,
  setSelectedCategory,
  setSearchedYear,
} from '../../redux/report/report-slice';

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
  const currentMonth = 'March';
  const currentYear = 2023;
  const searchedYear = useSelector(getSearchedYear);
  const searchedMonth = useSelector(getSearchedMonth);
  const totalReportObject = useSelector(getTotalReportObject);
  const selectedCashflow = useSelector(getSelectedCashflow);
  const [categoriesArray, setCategoriesArray] = useState();
  const [isActive,setIsActive]=useState()

  useEffect(() => {
    dispatch(
      fetchFullStatistics({
        year: searchedYear,
        currentMonth: monthNames.findIndex(m => m === searchedMonth) + 1,
      })
    );
  }, [searchedMonth, searchedYear, dispatch]);

  useEffect(() => {
    dispatch(setSearchedMonth(currentMonth));
    dispatch(setSearchedYear(currentYear));
  }, [dispatch]);

  useEffect(() => {
    if (totalReportObject) {
      const { income, expenses } = totalReportObject;
      let incomCategoriesSorted = null;
      let expensesCategoriesSorted = null;

      if (income && income.categories) {
        incomCategoriesSorted = [...income.categories].sort(
          (first, second) => second.sum - first.sum
        );
      }
      if (expenses && expenses.categories) {
        expensesCategoriesSorted = [...expenses.categories].sort(
          (first, second) => second.sum - first.sum
        );
      }

      setCategoriesArray(
        selectedCashflow === 'Expenses'
          ? expensesCategoriesSorted
          : incomCategoriesSorted
      );
      
    }
  }, [selectedCashflow, totalReportObject]);
  useEffect(()=>{
    if(categoriesArray)
    {
      setIsActive(categoriesArray[0].category)
    }
  },[categoriesArray])

  const onCashflowChange = () => {
    dispatch(
      setSelectedCashflow(
        selectedCashflow === 'Expenses' ? 'Income' : 'Expenses'
      )
    );
  };

  const onCategoryChange = category => {
    dispatch(setSelectedCategory(category));
    setIsActive(category)
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.titleContainer}>
          <button type="button" onClick={onCashflowChange}>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-left`}></use>
            </svg>
          </button>
          <p className={css.header}>{selectedCashflow}</p>
          <button type="button" onClick={onCashflowChange}>
            <svg width={10} height={10} className={css.leftArrow}>
              <use href={`${Sprite}#icon-arrow-right`}></use>
            </svg>
          </button>
        </div>
        {categoriesArray === null ? (
          <div className={css.empty}>There isn`t any data in this period</div>
        ) : (
          <ul className={css.list}>
            {categoriesArray &&
              categoriesArray.map(category => (
                <li
                  className={css.item}
                  key={category.category}
                  onClick={() => onCategoryChange(category.category)}
                >
                  <p className={css.sum}>{category.sum}</p>
                  <div className={css.backGround}>
                    <svg className={clsx(css.icon,category.category===isActive && css.icon_active)} width={55} height={56}>
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
