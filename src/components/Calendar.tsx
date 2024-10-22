import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import '../styles/Calendar.css';

export default function Calendar() {
  const events = [
    {
      title: '회의',
      start: '2024-10-28',
      end: '2024-10-28',
    },
    {
      title: '프로젝트 마감일',
      start: '2024-11-01',
      end: '2024-11-01',
    },
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height="100%"
      locale="ko"
      events={events}
    />
  );
}
