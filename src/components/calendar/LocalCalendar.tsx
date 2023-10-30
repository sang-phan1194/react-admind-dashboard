import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './myCalendar.scss';
import AlertDialog from '../alertDialog/AlertDialog';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
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
type RetrievedEvent = {
  start: Timestamp;
  end: Timestamp;
  color: string;
  title: string;
  id: string;
};
type ExtendEvent = Event & { id: string };
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

  const handleEventClick = (event: ExtendEvent) => {
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
      '#005B41',
      '#F875AA',
      '#7752FE',
      '#ED7D31',
      '#E95793'
    ];
    const index = Math.floor(Math.random() * colors.length);
    const color = colors[index];
    console.log(index, ':', color);

    return color;
  };

  const renderEvent = (event: Event) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      color: '#FCF5ED',
      fontSize: '15px',
      padding: '10px',
      border: '0.8px solid #008080'
    };
    return {
      style: style
    };
  };

  const convertData = (datas: RetrievedEvent[]) => {
    const eventsForCalendar = datas.map((event: RetrievedEvent) => ({
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
      {open && (
        <AlertDialog
          open={open}
          setOpen={setOpenDialog}
          id={id}
          refetch={refetch}
          type="calendarEvents"
        />
      )}
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
