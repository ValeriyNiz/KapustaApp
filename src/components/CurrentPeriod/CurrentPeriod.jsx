import { Summary } from 'components/Summary/Summary';
import { Report } from 'components/Report/Report';
import { TotalSum } from 'components/TotalSum/TotalSum';
import Background from 'components/Background/Background';
export const CurrentPeriod = () => {
  return (
    <Background type="Secondary">
      <Summary />
      <TotalSum />
      <Report />
    </Background>
  );
};
