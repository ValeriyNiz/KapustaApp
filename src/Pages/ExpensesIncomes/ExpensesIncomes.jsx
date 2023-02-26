import Background from 'components/Background/Background';
import { ExpIncNav } from 'components/ExpIncNav/ExpIncNav';
import { MobileTable } from 'components/MobileTable/MobileTable';
import ReportsBalanceBlock from 'components/ReportsBalanceBlock/ReportsBalanceBlock';
import { SummaryTable } from 'components/SummaryTable/SummaryTable';
import { TabletForm } from 'components/TabletForm/TabletForm';
import { TabletTable } from 'components/TabletTable/TabletTable';
import { ToTransaction } from 'components/ToTransaction/ToTransaction';
import { useEffect, useState } from 'react';
import css from './ExpensesIncomes.module.css';

export const ExpensesIncomes = () => {
  const [choice, setChoice] = useState('expenses');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1280
  );

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
    setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const data = [
    {
      name: 'Bonus',
      date: '21.11.2019',
      category: 'Add',
      value: '800.00 UAH.',
    },
  ];

  const options = [
    { value: 'transport', label: 'Transport' },
    { value: 'products', label: 'Products' },
    { value: 'health', label: 'Health' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'housing', label: 'Housing' },
    { value: 'technique', label: 'Technique' },
    { value: 'comm', label: 'Communal, communication' },
    { value: 'sports', label: 'Sports, hobbies' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ];

  const summary = [
    { month: 'November', sum: '10 000.00' },
    { month: 'November', sum: '10 000.00' },
    { month: 'November', sum: '10 000.00' },
    { month: 'November', sum: '10 000.00' },
    { month: 'November', sum: '10 000.00' },
    { month: 'November', sum: '10 000.00' },
  ];

  return (
    <>
      {isMobile ? (
        <Background type="Secondary">
          <ToTransaction />
          <ReportsBalanceBlock/>
          <MobileTable data={data} choice={choice} />
          <ExpIncNav choice={choice} setChoice={setChoice} />
        </Background>
      ) : (
        <Background type="Secondary">
            <div className={css.container}>
              <ReportsBalanceBlock/>
            <ExpIncNav choice={choice} setChoice={setChoice} />
            <div className={css.section}>
              <TabletForm options={options} />
              {!isTablet ? (
                <div className={css.bottomContainer}>
                  <TabletTable data={data} choice={choice} />
                  <SummaryTable sum={summary} />
                </div>
              ) : (
                <div className={css.tableContainer}>
                  <TabletTable data={data} choice={choice} />
                </div>
              )}
            </div>
          </div>
          {isTablet && <SummaryTable sum={summary} />}
        </Background>
      )}
    </>
  );
};