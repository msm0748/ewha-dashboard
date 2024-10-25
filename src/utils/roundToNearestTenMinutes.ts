import dayjs from 'dayjs';

/** 주어진 시간을 가장 가까운 10분 단위로 변환하는 함수 */
export const roundToNearestTenMinutes = (time: dayjs.Dayjs) => {
  const minute = time.minute(); // 주어진 시간의 분 가져오기
  const roundedMinute = Math.ceil(minute / 10) * 10; // 10분 단위로 올림

  return time.minute(roundedMinute).second(0); // 분과 초를 조정한 새로운 객체 반환
};
