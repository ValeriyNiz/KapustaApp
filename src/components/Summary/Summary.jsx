import Sprite from '../../images/currentPeriod.svg';
import css from '../../components/Summary/Summary.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSearchedMonth,
  getSearchedYear,
} from 'redux/report/report-selectors';
import {
  setSearchedMonth,
  setSearchedYear,
} from '../../redux/report/report-slice';
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
  const currentMonth = 'February';
  const startedBalance = 15000;

  const searchedYear = useSelector(getSearchedYear);
  const searchedMonth = useSelector(getSearchedMonth);
  const [balance, setBalance] = useState(startedBalance);

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
  const onBlanceChange = evt => {
    console.log(evt.target.value);
    setBalance(evt.target.value);
  };
  const onBalanceSubmit = () => {};
  return (
    <div className={css.container}>
      <div className={css.backDiv}>
        <button>
          <svg width={18} height={12}>
            <use href={`${Sprite}#icon-arrow-back`}></use>
          </svg>
        </button>
        <p className={css.arrowDesc}>Main Page</p>
      </div>
      <div className={css.reversing}>
        <div className={css.balanceDiv}>
          <p className={css.balanceTitle}>Balance:</p>
          <div className={css.totalBalanceSumDiv}>
            {/* <span className={css.totalBalanceSum}>55000 UAH</span> */}
            <input
              className={css.totalBalanceSum}
              value={balance}
              onChange={onBlanceChange}
              type="number"
            />
            <span className={css.totalBalanceSum}>UAH</span>
          </div>
          <button
            className={css.totalBalanceConfirmDiv}
            type="submit"
            onSubmit={onBalanceSubmit}
          >
            <span className={css.totalBalanceConfirm}>confirm</span>
          </button>
        </div>
        <div className={css.titleDiv}>
          <p className={css.currentTitle}>Current period:</p>
          <div className={css.dateDiv}>
            <button type="button" onClick={toPrev}>
              <svg width={10} height={10} className={css.leftArrow}>
                <use href={`${Sprite}#icon-arrow-left`}></use>
              </svg>
            </button>
            <p className={css.date}>
              {searchedMonth} {searchedYear}
            </p>
            <button
              type="button"
              onClick={toNext}
              disabled={
                searchedMonth === currentMonth && searchedYear === currentYear
              }
            >
              <svg width={10} height={10} className={css.rightArrow}>
                <use href={`${Sprite}#icon-arrow-right`}></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
