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
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core/index.js';
import { SelectedDate, UpdateEventArg } from '../types/Calendar';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { roundToNearestTenMinutes } from '../utils/roundToNearestTenMinutes';

interface Props {
  events: EventInput[];
  openAddScheduleModal: () => void;
  selectDate: (selectedDate: SelectedDate) => void;
  updateEvent: (event: UpdateEventArg) => void;
  openModal: () => void;
  setSelectedEvent: Dispatch<SetStateAction<EventInput | null>>;
}

export default function Calendar({
  events,
  openAddScheduleModal,
  selectDate,
  updateEvent,
  openModal,
  setSelectedEvent,
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

    const newEvent = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    };
    updateEvent(newEvent);
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { event } = arg;

    const newEvent = {
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    };

    updateEvent(newEvent);
  };

  const handleDateSelect = (arg: DateSelectArg) => {
    // allDay 일 경우 시간을 현재 시간으로 설정하고 아닌 경우 선택한 시간으로 설정 - allDay로 선택 후 폼에서 allDay 체크 해제 시 현재 시간으로 설정하기 위함
    const startDate = arg.allDay
      ? `${dayjs(arg.startStr).format('YYYY-MM-DD')} ${roundToNearestTenMinutes(
          dayjs()
        ).format('HH:mm')}`
      : dayjs(arg.startStr).format('YYYY-MM-DD HH:mm');

    // allDay 일 경우 시간을 현재 시간 + 1시간으로 설정하고 아닌 경우 선택한 시간으로 설정 - allDay로 선택 후 폼에서 allDay 체크 해제 시 현재 시간 + 1시간으로 설정하기 위함
    const endDate = arg.allDay
      ? `${dayjs(arg.endStr).format('YYYY-MM-DD')} ${roundToNearestTenMinutes(
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

  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    });
    openModal();
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
      select={handleDateSelect}
      eventClick={handleEventClick}
    />
  );
}
