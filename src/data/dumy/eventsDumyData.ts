import { EventInput } from '@fullcalendar/core/index.js';

export const eventDumyData: EventInput[] = [
  {
    title: '회의',
    start: '2024-10-22T10:00:00', // 시작 시간 추가
    end: '2024-10-22T11:00:00', // 종료 시간 추가
  },
  {
    title: '프로젝트 마감일',
    start: '2024-11-01',
  },
  {
    id: 'a',
    title: '휴가',
    start: '2024-10-15',
    color: 'transparent',
    textColor: 'black',
  },
];
