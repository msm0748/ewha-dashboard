import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { UserDataType } from '../types/User';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  users: UserDataType[];
  setUsersToDelete: Dispatch<SetStateAction<React.Key[]>>;
  setSelectedUser: Dispatch<SetStateAction<UserDataType | null>>;
  openUserFormModal: () => void;
}

export default function UserTable({
  users,
  setUsersToDelete,
  setSelectedUser,
  openUserFormModal,
}: Props) {
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
      dataIndex: 'device',
      fixed: 'left',
      width: 100,
    },
    {
      title: '동의서',
      dataIndex: 'consentForm',
      fixed: 'left',
      filters: [
        {
          text: '제출',
          value: '제출',
        },
        {
          text: '미제출',
          value: '미제출',
        },
      ],
      width: 100,
      onFilter: (value, record) =>
        record.consentForm.indexOf(value as string) === 0,
    },
    {
      title: '설문',
      dataIndex: 'survey',
      filters: [
        {
          text: '제출',
          value: '제출',
        },
        {
          text: '미제출',
          value: '미제출',
        },
      ],
      onFilter: (value, record) => record.survey.indexOf(value as string) === 0,
      width: 100,
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
    {
      title: '관리',
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record: UserDataType) => (
        <Button
          size="small"
          className="text-red-500"
          onClick={() => handleEditButtonClick(record)} // 수정 핸들러 호출
        >
          수정
        </Button>
      ),
    },
  ];

  const handleEditButtonClick = (record: UserDataType) => {
    setSelectedUser(record);
    openUserFormModal();
  };

  const rowSelection: TableProps<UserDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setUsersToDelete(selectedRowKeys);
    },
  };

  return (
    <Table<UserDataType>
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
        columnWidth: 40,
        onSelect: () => {
          console.log('asdf');
        },
      }}
      virtual
      scroll={{ x: 2000, y: 400 }}
      columns={columns}
      dataSource={users}
      pagination={false}
    />
  );
}
