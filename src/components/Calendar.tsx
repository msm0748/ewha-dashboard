import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, {
  EventDragStopArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/Calendar.css';
import { EventContentArg, EventSourceInput } from '@fullcalendar/core/index.js';

interface Props {
  openAddScheduleModal: () => void;
}

export default function Calendar({ openAddScheduleModal }: Props) {
  const events: EventSourceInput = [
    {
      title: '회의',
      start: '2024-10-22T10:00:00', // 시작 시간 추가
      end: '2024-10-22T11:00:00', // 종료 시간 추가
    },
    {
      title: '프로젝트 마감일',
      start: '2024-11-01',
    },
    {
      id: 'a',
      title: '휴가',
      start: '2024-10-15',
      color: 'transparent',
      textColor: 'black',
    },
  ];

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="flex items-center">
        {eventInfo.event.title === '휴가' && (
          <span className="bg-red-500 rounded-full w-3 h-3 inline-block mr-2"></span>
        )}
        <span className="text-xs">{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleEventDrop = (info: EventDragStopArg) => {
    console.log(info.event, 'eventDrop');
    console.log(`${info.event.title} dropped to ${info.event.start}`);
    // Update the event on the server or in your state as needed
  };

  const handleEventResize = (info: EventResizeDoneArg) => {
    console.log(info.event, 'eventResize');
    console.log(`${info.event.title} resized to ${info.event.start}`);
    // Update the event on the server or in your state as needed
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth timeGridWeek timeGridDay',
      }}
      initialView="dayGridMonth"
      height="100%"
      locale="ko"
      events={events}
      eventContent={renderEventContent}
      editable={true}
      droppable={true}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      selectable={true}
      dateClick={(arg) => {
        openAddScheduleModal();
        console.log(arg);
      }}
    />
  );
}
