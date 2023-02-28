import Sprite from '../../images/currentPeriod.svg';
import css from '../../components/Summary/Summary.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSearchedMonth,
  getSearchedYear,
} from 'redux/report/report-selectors';
import {
  setSearchedMonth,
  setSearchedYear,
} from '../../redux/report/report-slice';
import { useNavigate } from 'react-router-dom';

import { getBalance } from 'redux/auth/auth-selector';

export const Summary = () => {
  const dispatch = useDispatch();
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
  const currentYear = 2023;
  const currentMonth = 'March';

  const balance = useSelector(getBalance);
  const searchedYear = useSelector(getSearchedYear);
  const searchedMonth = useSelector(getSearchedMonth);

  const navigate = useNavigate();

  const goToExpensesPage = () => {
    navigate('/');
  };

  const toNext = () => {
    if (searchedMonth === 'December' && searchedYear !== currentYear) {
      dispatch(setSearchedMonth('January'));
      dispatch(setSearchedYear(searchedYear + 1));
      return;
    }
    const monthNow = monthNames.findIndex(month => month === searchedMonth);
    dispatch(setSearchedMonth(monthNames[monthNow + 1]));
  };
  const toPrev = () => {
    if (searchedMonth === 'January') {
      dispatch(setSearchedMonth('December'));
      dispatch(setSearchedYear(searchedYear - 1));
      return;
    }
    const monthNow = monthNames.findIndex(month => month === searchedMonth);
    dispatch(setSearchedMonth(monthNames[monthNow - 1]));
  };

  return (
    <div className={css.container}>
      <div className={css.backDiv}>
        <button onClick={goToExpensesPage} className={css.arrowButton}>
          <svg width={18} height={12}>
            <use href={`${Sprite}#icon-arrow-back`}></use>
          </svg>
          <p className={css.arrowDesc}>Main Page</p>
        </button>
      </div>
      <div className={css.reversing}>
        <div className={css.balanceDiv}>
          <p className={css.balanceTitle}>Balance:</p>
          <div className={css.totalBalanceSumDiv}>
            <span>{balance || '00.00'}</span>
            <span style={{ marginLeft: 4 }}>UAH</span>
          </div>
        </div>
        <div className={css.titleDiv}>
          <p className={css.currentTitle}>Current period:</p>
          <div className={css.dateDiv}>
            <button className={css.arrowButton} type="button" onClick={toPrev}>
              <svg width={10} height={10} className={css.smallArrow}>
                <use href={`${Sprite}#icon-arrow-left`}></use>
              </svg>
            </button>
            <p className={css.date}>
              {searchedMonth} {searchedYear}
            </p>
            <button
              className={css.arrowButton}
              type="button"
              onClick={toNext}
              disabled={
                searchedMonth === currentMonth && searchedYear === currentYear
              }
            >
              <svg width={10} height={10} className={css.smallArrow}>
                <use href={`${Sprite}#icon-arrow-right`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
