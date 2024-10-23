import { useState } from 'react';
import Calendar from '../../components/Calendar';
import AddScheduleModal from '../../components/modal/AddScheduleModal';
import { EventInput } from '@fullcalendar/core/index.js';
import { eventDumyData } from '../../data/dumy/eventsDumyData';

export default function CalendarPage() {
  const [events, setEvents] = useState<EventInput[]>(eventDumyData);
  const [isAddScheduleModal, setIsAddScheduleModal] = useState(false);

  const openAddScheduleModal = () => {
    setIsAddScheduleModal(true);
  };

  const addEvent = (event: EventInput) => {
    setEvents([...events, event]);
  };

  return (
    <div className="h-full">
      <Calendar events={events} openAddScheduleModal={openAddScheduleModal} />
      <AddScheduleModal
        open={isAddScheduleModal}
        closeModal={() => setIsAddScheduleModal(false)}
      />
    </div>
  );
}
