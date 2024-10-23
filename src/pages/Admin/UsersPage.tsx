import { useState } from 'react';
import { Button, Table } from 'antd';
import { Input, TableColumnsType, TableProps } from 'antd';
import AddUserModal from '../../components/modal/AddUserModal';
import { UserDataType } from '../../types/User';
import { useUsers } from '../../hooks/useUsers';
import { userDummyData } from '../../data/dumy/userDummyData';
import DeleteUserModal from '../../components/modal/DeleteUserModal';
const { Search } = Input;

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
];

export default function UsersPage() {
  const {
    users,
    selectedUsers,
    searchKeyword,
    setSelectedUsers,
    addUser,
    deleteSelectedUsers,
    handleSearch,
  } = useUsers(userDummyData);

  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isDeleteUserModal, setIsDeleteUserModal] = useState(false);

  const rowSelection: TableProps<UserDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedUsers(selectedRowKeys);
    },
  };

  return (
    <div>
      <div className="flex items-start gap-12 mb-4">
        <div className="flex-1">
          <Search
            placeholder="코드로 검색"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchKeyword}
            enterButton
            allowClear
          />
        </div>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => setIsAddUserModal(true)}>
            회원 등록
          </Button>
          <Button
            danger
            onClick={() => setIsDeleteUserModal(true)}
            disabled={selectedUsers.length === 0}
          >
            회원 삭제
          </Button>
        </div>
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
        open={isAddUserModal}
        closeModal={() => setIsAddUserModal(false)}
        addUser={addUser}
      />

      <DeleteUserModal
        open={isDeleteUserModal}
        onCancel={() => setIsDeleteUserModal(false)}
        onOk={deleteSelectedUsers}
      />
    </div>
  );
}
