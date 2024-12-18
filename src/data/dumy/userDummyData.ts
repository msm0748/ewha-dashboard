import { UserDataType } from '../../types/User';

export const userDummyData: UserDataType[] = [
  {
    key: '1',
    code: 'P-01-2024',
    birth: '1989-02-27',
    gender: 'F',
    device: 'EF1100',
    consentForm: [
      {
        uid: '-1',
        name: 'P-01-2024 동의서.pdf',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ],
    survey: '미제출',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    etc: '',
    note: '',
    start: '2021-10-01',
    end: '2021-10-31',
  },
  {
    key: '2',
    code: 'P-01-2023',
    birth: '1989-02-27',
    gender: 'F',
    device: 'EF1100',
    consentForm: [],
    survey: '제출',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    etc: '',
    note: '',
    start: '2021-10-01',
    end: '2021-10-31',
  },
];
