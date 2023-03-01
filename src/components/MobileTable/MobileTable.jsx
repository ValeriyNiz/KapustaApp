import css from './MobileTable.module.css';
import Sprite from '../../images/sprite.svg';
import { DateComponent } from 'components/DateComponent/DateComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from 'redux/report/report-selectors';
import {
  deleteTransaction,
  fetchTransactions,
} from 'redux/report/report-operations';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const MobileTable = () => {
  const data = useSelector(getAllTransactions);
  const location = useLocation();
  const isIncome = location.search.includes('income');
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  let tableData = isIncome
    ? data.filter(({ income }) => income)
    : data.filter(({ income }) => !income);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.removeItem('transactionDate');
  }, []);

  const handleDelete = (id, sum, income) => {
    dispatch(deleteTransaction({ id, sum, income }));
  };

  const onDateChange = date => {
    sessionStorage.setItem('transactionDate', date.toString());
    setDate(date);
  };

  return (
    <>
      <DateComponent date={date} setDate={onDateChange} />
      <ul className={css.TableList}>
        {tableData.map(t => (
          <li key={t._id}>
            <div className={css.elementDiv}>
              <div>
                <p className={css.name}>{t.description}</p>
                <div className={css.infoDiv}>
                  <p className={css.info}>{t.dateTransaction.slice(0, 10)}</p>
                  <p className={css.info}>{t.category}</p>
                </div>
              </div>
              {!isIncome ? (
                <p className={css.value}>- {t.sum} UAH</p>
              ) : (
                <p className={`${css.value} ${css.income}`}>{t.sum} UAH</p>
              )}
              <svg
                width="18"
                height="18"
                className={css.bin}
                onClick={() => handleDelete(t._id, t.sum, t.income)}
              >
                <use href={`${Sprite}#bin`}></use>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
