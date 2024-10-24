import { useState } from 'react';
import Calendar from '../../components/Calendar';
import AddScheduleModal from '../../components/modal/AddScheduleModal';
import { EventInput } from '@fullcalendar/core/index.js';
import { eventDumyData } from '../../data/dumy/eventsDumyData';
import { SelectedDate } from '../../types/Calendar';
import dayjs from 'dayjs';
import { useModal } from '../../hooks/useModal';

export default function CalendarPage() {
  const [events, setEvents] = useState<EventInput[]>(eventDumyData);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    allDay: true,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const addEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const updateEvent = (id: string, start: string, end: string) => {
    setEvents((event) => {
      return event.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            start,
            end,
          };
        }
        return item;
      });
    });
  };

  const selectDate = (selectedDate: SelectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <div className="h-full">
      <Calendar
        events={events}
        openAddScheduleModal={openModal}
        selectDate={selectDate}
        updateEvent={updateEvent}
      />
      {isOpen && (
        <AddScheduleModal
          open={isOpen}
          closeModal={closeModal}
          addEvent={addEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
