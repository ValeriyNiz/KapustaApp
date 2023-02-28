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
          <ReportsBalanceBlock />
          <MobileTable />
          <ExpIncNav />
        </Background>
      ) : (
        <Background type="Secondary">
          <div className={css.container}>
            <ReportsBalanceBlock />
            <ExpIncNav />
            <div className={css.section}>
              <TabletForm />
              {!isTablet ? (
                <div className={css.bottomContainer}>
                  <TabletTable />
                  <SummaryTable sum={summary} />
                </div>
              ) : (
                <div className={css.tableContainer}>
                  <TabletTable />
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
