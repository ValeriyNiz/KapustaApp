import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getAllTransactions } from 'redux/report/report-selectors';
import css from './SummaryTable.module.css';

const monthMap = [
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

export const SummaryTable = () => {
  const data = useSelector(getAllTransactions);
  const location = useLocation();
  const isIncome = location.search.includes('income');

  const tableData = useMemo(
    () =>
      isIncome
        ? data.filter(({ income }) => income)
        : data.filter(({ income }) => !income),
    [isIncome, data]
  );

  const summaryData = useMemo(() => {
    return tableData.reduce((acc, { dateTransaction, sum }) => {
      const month = new Date(dateTransaction).getMonth();
      acc[month] = acc[month] ? acc[month] + sum : sum;

      return acc;
    }, {});
  }, [tableData]);

  return (
    <ul className={css.list}>
      <li className={css.headerDiv}>
        <p className={css.headerP}>Summary</p>
      </li>
      {Object.keys(summaryData).map((monthIndex, idx) => (
        <li key={idx} className={css.container}>
          <p className={css.info}>{monthMap[monthIndex]}</p>
          <p className={css.info}>{summaryData[monthIndex]}</p>
        </li>
      ))}
    </ul>
  );
};
