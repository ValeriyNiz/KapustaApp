import css from './MobileTable.module.css';
import Sprite from '../../images/sprite.svg';
import { DateComponent } from 'components/DateComponent/DateComponent';
import { getAllTransactions, getChoice } from 'redux/report/report-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from 'redux/report/report-operations';

export const MobileTable = () => {
  const choice = useSelector(getChoice);
  const data = useSelector(getAllTransactions);
  let tableData = null;
  if (choice === 'expenses') {
    tableData = data.filter(({ income }) => !income);
  } else {
    tableData = data.filter(({ income }) => income);
  }

  const dispatch = useDispatch();
  const handleDelete = id => {
    dispatch(deleteTransaction(id));
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
              {choice === 'expenses' ? (
                <p className={css.value}>- {t.sum} UAH</p>
              ) : (
                <p className={`${css.value} ${css.income}`}>{t.sum} UAH</p>
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
          </li>
        ))}
      </ul>
    </>
  );
};
