import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, {
  EventDragStopArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/Calendar.css';
import { EventContentArg, EventInput } from '@fullcalendar/core/index.js';

interface Props {
  events: EventInput[];
  openAddScheduleModal: () => void;
}

export default function Calendar({ events, openAddScheduleModal }: Props) {
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
