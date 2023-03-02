import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getTotalReportObject,
  getSelectedCashflow,
  getSelectedCategory,
} from 'redux/report/report-selectors';

import css from './MobileDiagram.module.css';

import {
  BarChart,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const MobileDiagram = () => {
  const totalReportObject = useSelector(getTotalReportObject);
  const selectedCashflow = useSelector(getSelectedCashflow);
  const selectedCategory = useSelector(getSelectedCategory);

  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    if (!totalReportObject) {
      setDescriptions([]);
      return;
    }
    const data =
      selectedCashflow === 'Expenses'
        ? totalReportObject.expenses
        : totalReportObject.income;
    if (!data || !data.categories) {
      setDescriptions([]);
      return;
    }

    const category = data.categories.find(
      item => item.category === selectedCategory
    );
    if (!category || !category.descriptions) {
      setDescriptions([]);
      return;
    }

    setDescriptions(
      [...category.descriptions].sort((item1, item2) => item2.sum - item1.sum)
    );
  }, [selectedCashflow, selectedCategory, totalReportObject]);

  const renderCustomizedLabelSum = () => {
    return props => {
      const { x, y, width, value } = props;

      return (
        <text
          x={x + width + 40}
          y={y + 15}
          fill="#000000"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${value} UAH`}
        </text>
      );
    };
  };

  const renderCustomizedLabelDescription = () => {
    return props => {
      const { x, y, value } = props;
      console.log(props);
      return (
        <text x={x} y={y - 5} fill="#000000">
          {value}
        </text>
      );
    };
  };

  return (
    <>
      {descriptions.length > 0 && (
        <div className={css.container}>
          <div className={css.wrapperBar}>
            <ResponsiveContainer minHeight={600} width="100%">
              <BarChart
                className={css.barChart}
                data={descriptions}
                layout="vertical"
                margin={{ top: 20, right: 100, left: 20, bottom: 0 }}
              >
                <YAxis
                  dataKey="description"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  hide
                />
                <XAxis hide type="number" tickLine={false} />
                <Bar dataKey="sum" maxBarSize={30} radius={[0, 50, 50, 0]}>
                  {/* // isAnimationActive={false} */}
                  <LabelList
                    dataKey="sum"
                    content={renderCustomizedLabelSum()}
                  />
                  <LabelList
                    dataKey="description"
                    content={renderCustomizedLabelDescription()}
                  />

                  {descriptions.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 3 === 0 ? '#FF751D' : '#FFDAC0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};
