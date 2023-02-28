import css from './MobileTable.module.css';
import Sprite from '../../images/sprite.svg';
import { DateComponent } from 'components/DateComponent/DateComponent';
import { getAllTransactions } from 'redux/report/report-selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  fetchTransactions,
} from 'redux/report/report-operations';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export const MobileTable = () => {
  // const choice = useSelector(getChoice);
  const data = useSelector(getAllTransactions);
  const location = useLocation();
  const isIncome = location.search.includes('income');
  const dispatch = useDispatch();

  let tableData = null;
  if (isIncome) {
    tableData = data.filter(({ income }) => income);
  } else {
    tableData = data.filter(({ income }) => !income);
  }

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id, sum, income) => {
    dispatch(deleteTransaction({id, sum, income}));
  };

  return (
    <>
      <DateComponent />
      <ul>
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
