import { useState } from 'react';
import Calendar from '../../components/Calendar';
import AddScheduleModal from '../../components/modal/AddScheduleModal';

export default function CalendarPage() {
  const [isAddScheduleModal, setIsAddScheduleModal] = useState(false);

  const openAddScheduleModal = () => {
    setIsAddScheduleModal(true);
  };

  return (
    <div className="h-full">
      <Calendar openAddScheduleModal={openAddScheduleModal} />
      <AddScheduleModal
        open={isAddScheduleModal}
        closeModal={() => setIsAddScheduleModal(false)}
      />
    </div>
  );
}
