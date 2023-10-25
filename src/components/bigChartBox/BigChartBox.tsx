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
    designer: 2400
  },
  {
    name: 'Mon',
    niche: 3000,
    designer: 1398
  },
  {
    name: 'Tue',
    niche: 2000,
    designer: 9800
  },
  {
    name: 'Wed',
    niche: 2780,
    designer: 3908
  },
  {
    name: 'Thu',
    niche: 1890,
    designer: 4800
  },
  {
    name: 'Fri',
    niche: 2390,
    designer: 3800
  },
  {
    name: 'Sat',
    niche: 3490,
    designer: 4300
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
            <XAxis dataKey="name" />
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
              stroke="#005B41"
              fill="#005B41"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
