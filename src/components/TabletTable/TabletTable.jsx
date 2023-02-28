import css from './TabletTable.module.css';
import Sprite from '../../images/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from 'redux/report/report-selectors';
import {
  deleteTransaction,
  fetchTransactions,
} from 'redux/report/report-operations';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const TabletTable = () => {
  const data = useSelector(getAllTransactions);
  const location = useLocation();
  const isIncome = location.search.includes('income');
  const dispatch = useDispatch();

  const tableData = isIncome
    ? data.filter(({ income }) => income)
    : data.filter(({ income }) => !income);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id, sum, income) => {
    dispatch(deleteTransaction({ id, sum, income }));
  };

  return (
    <div className={css.tableDiv}>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(t => (
            <tr key={t._id}>
              <td>{t.dateTransaction.slice(0, 10)}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td>
                <div className={css.deleteDiv}>
                  {!isIncome ? (
                    <span className={css.value}>- {t.sum} UAH</span>
                  ) : (
                    <span className={`${css.value} ${css.income}`}>
                      {t.sum} UAH
                    </span>
                  )}
                  <button onClick={() => handleDelete(t._id, t.sum, t.income)}>
                    <svg width="18" height="18" className={css.bin}>
                      <use href={`${Sprite}#bin`}></use>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
