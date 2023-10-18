import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import './singlePage.scss';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const SinglePage = () => {
  return (
    <div className="singlePage">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img
              src="https://i.pinimg.com/originals/cc/61/e0/cc61e0afec490d5a8e59ba330c67ab2a.jpg"
              alt=""
            />
            <h1>Username</h1>
            <button>Update</button>
          </div>

          <div className="details">
            <div className="item">
              <span className="itemTitle">Username:</span>
              <span className="itemValue">Jone Ton</span>
            </div>
            <div className="item">
              <span className="itemTitle">Username:</span>
              <span className="itemValue">Jone Ton</span>
            </div>
            <div className="item">
              <span className="itemTitle">Username:</span>
              <span className="itemValue">Jone Ton</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        <ul>
          <li>
            <div>
              <p>This is a line of texts</p>
              <time>3 days ago</time>
            </div>
          </li>
          <li>
            <div>
              <p>This is a line of texts</p>
              <time>3 days ago</time>
            </div>
          </li>
          <li>
            <div>
              <p>This is a line of texts</p>
              <time>3 days ago</time>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SinglePage;
