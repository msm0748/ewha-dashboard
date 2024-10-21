import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import AddUserModal from '../../components/AddUserModal';

export interface UserDataType {
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
  etc: string;
  note: string;
  start: string;
  end: string;
}

const columns: TableColumnsType<UserDataType> = [
  {
    title: '코드',
    dataIndex: 'code',
    render: (text: string) => <a className="text-blue-500">{text}</a>,
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
    width: 100,
  },
  {
    title: '동의서',
    dataIndex: 'consent',
    fixed: 'left',
    width: 100,
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
    title: '기타',
    dataIndex: 'etc',
  },
  {
    title: '비고',
    dataIndex: 'note',
  },
  {
    title: 'Start',
    dataIndex: 'start',
  },
  {
    title: 'End',
    dataIndex: 'end',
  },
];

const data: UserDataType[] = [
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
    etc: '',
    note: '',
    start: '2021-10-01',
    end: '2021-10-31',
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
    etc: '',
    note: '',
    start: '2021-10-01',
    end: '2021-10-31',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<UserDataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: UserDataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
};

export default function UsersPage() {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const closeAddUserModal = () => setOpenAddUserModal(false);

  const [users, setUsers] = useState<UserDataType[]>(data);

  const addUser = (user: UserDataType) => {
    setUsers([...users, user]);
  };
  return (
    <div>
      <div className="flex my-4 justify-end gap-4">
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setOpenAddUserModal(true)}
        >
          회원 등록
        </Button>
        <Button
          color="danger"
          variant="outlined"
          onClick={() => setOpenDeleteUserModal(true)}
        >
          회원 삭제
        </Button>
      </div>
      <Table<UserDataType>
        rowSelection={{ type: 'checkbox', ...rowSelection, columnWidth: 40 }}
        virtual
        scroll={{ x: 2000, y: 400 }}
        columns={columns}
        dataSource={users}
        pagination={false}
      />

      <AddUserModal
        open={openAddUserModal}
        onOk={closeAddUserModal}
        onCancel={closeAddUserModal}
        addUser={addUser}
      />
    </div>
  );
}
