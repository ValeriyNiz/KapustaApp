import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTotalReportObject,
  getSelectedCashflow,
  getSelectedCategory,
} from 'redux/report/report-selectors';

import css from './TabletDiagram.module.css';
import { setSelectedCategory } from 'redux/report/report-slice';
import {
  BarChart,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const TabletDiagram = () => {
  const dispatch = useDispatch();
  const totalReportObject = useSelector(getTotalReportObject);
  const selectedCashflow = useSelector(getSelectedCashflow);
  const selectedCategory = useSelector(getSelectedCategory);

  const [descriptions, setDescriptions] = useState([]);
  useEffect(() => {
    if (totalReportObject) {
      const data =
        selectedCashflow === 'Expenses'
          ? totalReportObject.expenses
          : totalReportObject.income;
          console.log(data)
      if (data.categories) {
        console.log("AAA")
        dispatch(setSelectedCategory(data.categories[0].category));
      }
    }
  }, [dispatch, totalReportObject, selectedCashflow]);

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
        <g>
          <text
            x={x + width / 2}
            y={y - 30}
            fill="#000000"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {value}
          </text>
          <text
            x={x + width / 2}
            y={y - 15}
            fill="#000000"
            textAnchor="middle"
            dominantBaseline="central"
          >
            UAH
          </text>
        </g>
      );
    };
  };

  return (
    <>
      {descriptions.length > 0 && (
        <div className={css.container}>
          <div className={css.wrapperBar}>
            <ResponsiveContainer width="100%" aspect={2}>
              <BarChart
                className={css.barChart}
                data={descriptions}
                layout={'horizontal'}
                margin={{
                  top: 40,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="description"
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis hide={true} tickCount={8} />

                <Bar
                  dataKey="sum"
                  maxBarSize={60}
                  minPointSize={5}
                  radius={[10, 10, 0, 0]}
                >
                  <LabelList
                    dataKey="sum"
                    content={renderCustomizedLabelSum()}
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
