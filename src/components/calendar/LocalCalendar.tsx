import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './myCalendar.scss';

const localizer = momentLocalizer(moment);

const LocalCalendar = () => {
  return (
    <div className="myCalendar">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={moment().toDate()}
      />
    </div>
  );
};

export default LocalCalendar;
