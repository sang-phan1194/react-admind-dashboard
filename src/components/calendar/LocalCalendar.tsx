import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './myCalendar.scss';
import AlertDialog from '../alertDialog/AlertDialog';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useFirebaseQuery } from '../../queryFromFirebase';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

type Event = {
  start: Date;
  end: Date;
  color: string;
  title: string;
};
type DateRange = {
  start: Date;
  end: Date;
};

const LocalCalendar = () => {
  const { data, isLoading, refetch } = useFirebaseQuery(
    'calendarEvents',
    'calendarEvents'
  );
  const [open, setOpenDialog] = useState(false);
  const [id, setId] = useState('');

  const handleEventClick = (event: any) => {
    console.log(event);
    setOpenDialog(true);
    setId(event.id);
  };
  const generateRandomColor = () => {
    const colors = [
      '#0174BE',
      '#FFC436',
      '#86A789',
      '#B15EFF',
      '#00A9FF',
      '#A7D397',
      '#176B87',
      '#005B41'
    ];
    const index = Math.floor(Math.random() * colors.length);
    const color = colors[index];

    return color;
  };

  const renderEvent = (event: Event) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.7,
      color: 'black',
      fontSize: '15px',
      padding: '10px',
      border: '0.5px solid white'
    };
    return {
      style: style
    };
  };

  const convertData = (datas: any) => {
    const eventsForCalendar = datas.map((event: any) => ({
      title: event.title,
      start: event.start.toDate(),
      end: event.end.toDate(),
      color: event.color,
      id: event.id
    }));

    return eventsForCalendar;
  };

  const handleSelectSlot = async ({ start, end }: DateRange) => {
    const title = window.prompt('New Event name');

    if (title) {
      const newEvent = { start, end, title, color: generateRandomColor() };
      console.log(newEvent);

      try {
        const eventRef = doc(collection(db, 'calendarEvents'));
        await setDoc(eventRef, newEvent);
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="myCalendar">
      {open && <AlertDialog open={open} setOpen={setOpenDialog} id={id} refetch={refetch} />}
      {!isLoading ? (
        <Calendar
          defaultView="week"
          eventPropGetter={renderEvent}
          events={convertData(data)}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultDate={moment().toDate()}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick}
          selectable
        />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default LocalCalendar;
