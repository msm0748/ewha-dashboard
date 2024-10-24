import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin, {
  EventDragStopArg,
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/calendar.css';
import {
  DateSelectArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import { SelectedDate } from '../types/Calendar';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface Props {
  events: EventInput[];
  openAddScheduleModal: () => void;
  selectDate: (selectedDate: SelectedDate) => void;
  updateEvent: (id: string, start: string, end: string) => void;
}

export default function Calendar({
  events,
  openAddScheduleModal,
  selectDate,
  updateEvent,
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

  const handleEventDrop = (arg: EventDragStopArg) => {
    const { event } = arg;
    console.log(event, 'eventDrop');
    console.log(`${event.title} dropped to ${event.start}`);
    // Update the event on the server or in your state as needed
    updateEvent(event.id, event.startStr, event.endStr);
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { event } = arg;
    console.log(event, 'eventResize');
    console.log(`${event.title} resized to ${event.start}`);
    // Update the event on the server or in your state as needed
    updateEvent(event.id, event.startStr, event.endStr);
  };

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  /** 주어진 시간을 가장 가까운 10분 단위로 변환하는 함수 */
  const roundToNearestTenMinutes = (time: dayjs.Dayjs) => {
    const minute = time.minute(); // 주어진 시간의 분 가져오기
    const roundedMinute = Math.ceil(minute / 10) * 10; // 10분 단위로 올림

    return time.minute(roundedMinute).second(0); // 분과 초를 조정한 새로운 객체 반환
  };

  const handleDateSelect = (arg: DateSelectArg) => {
    console.log(arg, 'arg');
    // allDay 일 경우 시간을 현재 시간으로 설정하고 아닌 경우 선택한 시간으로 설정 - allDay로 선택 후 폼에서 allDay 체크 해제 시 현재 시간으로 설정하기 위함
    const startDate = arg.allDay
      ? `${dayjs(arg.startStr).format('YYYY-MM-DD')} ${roundToNearestTenMinutes(
          dayjs()
        ).format('HH:mm')}`
      : dayjs(arg.startStr).format('YYYY-MM-DD HH:mm');

    // allDay 일 경우 시간을 현재 시간 + 1시간으로 설정하고 아닌 경우 선택한 시간으로 설정 - allDay로 선택 후 폼에서 allDay 체크 해제 시 현재 시간 + 1시간으로 설정하기 위함
    const endDate = arg.allDay
      ? `${dayjs(arg.endStr)
          // fullcalendar에서 endStr은 선택한 날짜의 1일을 더해주기 때문 -1일을 해줌
          .subtract(1, 'day')
          .format('YYYY-MM-DD')} ${roundToNearestTenMinutes(
          dayjs().add(1, 'hour')
        ).format('HH:mm')}`
      : dayjs(arg.endStr).format('YYYY-MM-DD HH:mm');

    selectDate({
      startDate,
      endDate,
      allDay: arg.allDay,
    });

    openAddScheduleModal();
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
      events={events.map((event) => ({
        ...event,
        // allDay가 true일 경우, end 날짜를 +1 해주는 이유는 fullcalendar에서 end 날짜는 선택한 날짜의 1일을 더해야 그 날짜까지 포함해서 그려주기 때문
        end: event.allDay
          ? dayjs(event.end as string)
              .add(1, 'day')
              .format('YYYY-MM-DD')
          : event.end,
      }))}
      eventContent={renderEventContent}
      editable={true}
      droppable={true}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      selectable={true}
      select={handleDateSelect}
    />
  );
}
