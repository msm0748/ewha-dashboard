import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  key: React.Key;
  code: string;
  birth: string;
  gender: string;
  machinery: string;
  consent: string;
  survey: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '코드',
    dataIndex: 'code',
    render: (text: string) => <a className="text-sky-400">{text}</a>,
    fixed: 'left',
    width: 120,
  },
  {
    title: '생년월일',
    dataIndex: 'birth',
    fixed: 'left',
    width: 130,
  },
  {
    title: '성별',
    dataIndex: 'gender',
    fixed: 'left',
    width: 60,
  },
  {
    title: '기기',
    dataIndex: 'machinery',
    fixed: 'left',
  },
  {
    title: '동의서',
    dataIndex: 'consent',
    fixed: 'left',
  },
  {
    title: '설문',
    dataIndex: 'survey',
  },
  {
    title: '생체신호',
    dataIndex: 'step1',
  },
  {
    title: '신체계측',
    dataIndex: 'step2',
  },
  {
    title: '약물복용력',
    dataIndex: 'step3',
  },
  {
    title: '알레르기력',
    dataIndex: 'step4',
  },
  {
    title: '기타',
    dataIndex: 'step5',
  },
  {
    title: '기타',
    dataIndex: 'step6',
  },
  {
    title: '기타',
    dataIndex: 'step7',
  },
];

const data: DataType[] = [
  {
    key: '1',
    code: 'P-01-2024',
    birth: '1989-02-27',
    gender: 'F',
    machinery: 'EF1100',
    consent: '동의함',
    survey: '완료',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    step4: '완료',
    step5: '완료',
    step6: '완료',
    step7: '완료',
  },
  {
    key: '2',
    code: 'P-01-2024',
    birth: '1989-02-27',
    gender: 'F',
    machinery: 'EF1100',
    consent: '동의함',
    survey: '완료',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    step4: '완료',
    step5: '완료',
    step6: '완료',
    step7: '완료',
  },
  {
    key: '3',
    code: 'P-01-2024',
    birth: '1989-02-27',
    gender: 'F',
    machinery: 'EF1100',
    consent: '동의함',
    survey: '완료',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    step4: '완료',
    step5: '완료',
    step6: '완료',
    step7: '완료',
  },
  {
    key: '4',
    code: 'P-01-2024',
    birth: '1989-02-27',
    gender: 'F',
    machinery: 'EF1100',
    consent: '동의함',
    survey: '완료',
    step1: '완료',
    step2: '완료',
    step3: '완료',
    step4: '완료',
    step5: '완료',
    step6: '완료',
    step7: '완료',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
};

export default function UsersPage() {
  return (
    <div>
      <Table<DataType>
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        scroll={{ x: 1500, y: 400 }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}
