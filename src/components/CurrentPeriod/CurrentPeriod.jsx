import { Summary } from 'components/Summary/Summary';
import { Report } from 'Pages/Report/Report';
import { TotalSum } from 'components/TotalSum/TotalSum';
import { Diagram } from 'components/Diagram/Diagram';
import Background from 'components/Background/Background';

export const CurrentPeriod = () => {
  return (
    <Background type="Secondary">
      <Summary />
      <TotalSum />
      <Report />
      <Diagram />
    </Background>
  );
};
