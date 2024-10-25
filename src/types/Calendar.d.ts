export type SelectedDate = {
  startDate: string;
  endDate: string;
  allDay: boolean;
};

export type UpdateEventArg = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};
