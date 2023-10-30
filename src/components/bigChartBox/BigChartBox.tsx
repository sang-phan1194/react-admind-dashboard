import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import './bigChartBox.scss';

const data = [
  {
    name: 'Sun',
    niche: 4000,
    designer: 4400,
    others: 1400
  },
  {
    name: 'Mon',
    niche: 3000,
    designer: 2398,
    others: 1398
  },
  {
    name: 'Tue',
    niche: 2000,
    designer: 8800,
    others: 1000
  },
  {
    name: 'Wed',
    niche: 2780,
    designer: 4608,
    others: 1908
  },
  {
    name: 'Thu',
    niche: 1890,
    designer: 4200,
    others: 1800
  },
  {
    name: 'Fri',
    niche: 2390,
    designer: 3800,
    others: 800
  },
  {
    name: 'Sat',
    niche: 3490,
    designer: 4000,
    others: 300
  }
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <XAxis dataKey="name"  />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="designer"
              stackId="1"
              stroke="#89CFF3"
              fill="#89CFF3"
            />
            <Area
              type="monotone"
              dataKey="niche"
              stackId="1"
              stroke="#FFCD4B"
              fill="#FFCD4B"
            />
            <Area
              type="monotone"
              dataKey="others"
              stackId="1"
              stroke="#A7D397"
              fill="#A7D397"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
