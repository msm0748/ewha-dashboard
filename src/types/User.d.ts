import { UploadFile } from 'antd';

export interface UserDataType {
  key: React.Key;
  code: string;
  birth: string;
  gender: 'M' | 'F';
  device: string;
  consentForm: UploadFile[];
  survey: '제출' | '미제출';
  step1: string;
  step2: string;
  step3: string;
  etc: string;
  note: string;
  start: string;
  end: string;
}
