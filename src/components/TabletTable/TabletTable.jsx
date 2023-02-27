import css from './TabletTable.module.css';
import Sprite from '../../images/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions, getChoice } from 'redux/report/report-selectors';
import {
  deleteTransaction,
  fetchTransactions,
} from 'redux/report/report-operations';
import { useEffect } from 'react';

export const TabletTable = () => {
  const choice = useSelector(getChoice);
  const data = useSelector(getAllTransactions);
  let tableData = null;
  if (choice === 'expenses') {
    tableData = data.filter(({ income }) => !income);
  } else {
    tableData = data.filter(({ income }) => income);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteTransaction(id));
  };

  return (
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
                {choice === 'expenses' ? (
                  <span className={css.value}>- {t.sum} UAH</span>
                ) : (
                  <span className={`${css.value} ${css.income}`}>
                    {t.sum} UAH
                  </span>
                )}
                <svg
                  width="18"
                  height="18"
                  className={css.bin}
                  onClick={() => handleDelete(t._id)}
                >
                  <use href={`${Sprite}#bin`}></use>
                </svg>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
