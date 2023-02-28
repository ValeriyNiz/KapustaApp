import { useEffect, useState } from 'react';

import { Summary } from 'components/Summary/Summary';
import { Report } from 'Pages/Report/Report';
import { TotalSum } from 'components/TotalSum/TotalSum';
import { TabletDiagram } from 'components/TabletDiagram/TabletDiagram';
import { MobileDiagram } from 'components/MobileDiagram/MobileDiagram';
import Background from 'components/Background/Background';

export const CurrentPeriod = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <Background type="Secondary">
      <Summary />
      <TotalSum />
      <Report />
      {isMobile ? <MobileDiagram /> : <TabletDiagram />}
    </Background>
  );
};
