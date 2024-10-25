import { useEffect, useState } from 'react';
import Calendar from '../../components/Calendar';
import ScheduleFormModal from '../../components/modal/ScheduleFormModal';
import { EventInput } from '@fullcalendar/core/index.js';
import { eventDumyData } from '../../data/dumy/eventsDumyData';
import { SelectedDate, UpdateEventArg } from '../../types/Calendar';
import dayjs from 'dayjs';
import { useModal } from '../../hooks/useModal';

export default function CalendarPage() {
  const [events, setEvents] = useState<EventInput[]>(eventDumyData);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    allDay: true,
  });

  const { isOpen, openModal, closeModal } = useModal();

  const addEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const updateEvent = (event: UpdateEventArg) => {
    const { id, title, start, end, allDay } = event;
    setEvents((event) => {
      return event.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title,
            start,
            end,
            allDay,
          };
        }
        return item;
      });
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const selectDate = (selectedDate: SelectedDate) => {
    setSelectedDate(selectedDate);
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedEvent(null);
  };

  useEffect(() => {
    console.log(events, 'events');
  }, [events]);

  return (
    <div className="h-full">
      <Calendar
        events={events}
        openAddScheduleModal={openModal}
        selectDate={selectDate}
        updateEvent={updateEvent}
        openModal={openModal}
        setSelectedEvent={setSelectedEvent}
      />
      {isOpen && (
        <ScheduleFormModal
          open={isOpen}
          closeModal={handleCloseModal}
          addEvent={addEvent}
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
      )}
    </div>
  );
}
