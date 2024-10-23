import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, {
  EventDragStopArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/Calendar.css';
import { EventContentArg, EventInput } from '@fullcalendar/core/index.js';
import { SelectedDate } from '../types/Calendar';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface Props {
  events: EventInput[];
  openAddScheduleModal: () => void;
  selectDate: (selectedDate: SelectedDate) => void;
}

export default function Calendar({
  events,
  openAddScheduleModal,
  selectDate,
}: Props) {
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

  /**
   * FullCalendar에서 종료일이 하루 일찍 표시되는 문제를 해결하기 위해
   * 이벤트의 종료일을 하루 뒤로 조정하는 함수
   */
  const adjustEventEndDate = (events: EventInput[]) => {
    return events.map((event) => {
      if (!event.end) return event;

      return {
        ...event,
        end: dayjs(event.end as string)
          .add(1, 'day')
          .format('YYYY-MM-DD'),
      };
    });
  };

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        start: 'today prev,next',
        center: 'title',
        end: 'dayGridMonth timeGridWeek timeGridDay',
      }}
      timeZone="local"
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
      select={(arg) => {
        // const adjustedEndDate = dayjs(arg.endStr)
        //   .subtract(1, 'day')
        //   .format('YYYY-MM-DD'); // 하루 빼기
        selectDate({
          startDate: arg.startStr,
          endDate: arg.endStr,
        });
        openAddScheduleModal();
      }}
    />
  );
}
