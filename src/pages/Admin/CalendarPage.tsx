import { useState } from 'react';
import Calendar from '../../components/Calendar';
import AddScheduleModal from '../../components/modal/AddScheduleModal';
import { EventInput } from '@fullcalendar/core/index.js';
import { eventDumyData } from '../../data/dumy/eventsDumyData';
import { SelectedDate } from '../../types/Calendar';
import dayjs from 'dayjs';

export default function CalendarPage() {
  const [events, setEvents] = useState<EventInput[]>(eventDumyData);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    allDay: true,
  });
  const [isAddScheduleModal, setIsAddScheduleModal] = useState(false);

  const openAddScheduleModal = () => {
    setIsAddScheduleModal(true);
  };

  const addEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const selectDate = (selectedDate: SelectedDate) => {
    setSelectedDate(selectedDate);
  };

  return (
    <div className="h-full">
      <Calendar
        events={events}
        openAddScheduleModal={openAddScheduleModal}
        selectDate={selectDate}
      />
      {isAddScheduleModal && (
        <AddScheduleModal
          open={isAddScheduleModal}
          closeModal={() => setIsAddScheduleModal(false)}
          addEvent={addEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
