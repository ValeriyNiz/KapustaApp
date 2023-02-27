import css from './TotalSum.module.css';
import { getTotalReportObject } from 'redux/report/report-selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
export const TotalSum = () => {
  const totalReportObject = useSelector(getTotalReportObject);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  useEffect(() => {
    if (totalReportObject) {
      const income = totalReportObject.income;
      const expenses = totalReportObject.expenses;
      if (income !== undefined) {
        setTotalIncome(income.totalSum);
      }
      if (expenses !== undefined) {
        setTotalExpenses(expenses.totalSum);
      }
    }
  }, [totalReportObject]);
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.sumDiv}>
          <p className={css.name}>Expenses:</p>
          <p className={css.sumEx}>
            - {totalExpenses ? totalExpenses : 0} UAH.{' '}
          </p>
        </div>
        <div className={css.line}></div>
        <div className={css.sumDiv}>
          <p className={css.name}>Income:</p>
          <p className={css.sumIn}>+ {totalIncome ? totalIncome : 0} UAH. </p>
        </div>
      </div>
    </div>
  );
};
