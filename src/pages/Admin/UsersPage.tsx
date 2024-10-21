import { useMemo, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { Input, TableColumnsType, TableProps } from 'antd';
import AddUserModal from '../../components/AddUserModal';
const { Search } = Input;

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
    code: 'P-01-2023',
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

export default function UsersPage() {
  const [users, setUsers] = useState<UserDataType[]>(data);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isRemoveUserModal, setIsRemoveUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<React.Key[]>([]);

  // 검색된 사용자 목록을 메모이제이션
  const filteredUsers = useMemo(() => {
    if (!searchKeyword.trim()) return users;

    return users.filter((user) =>
      user.code.toLowerCase().includes(searchKeyword.toLowerCase().trim())
    );
  }, [users, searchKeyword]);

  const addUser = (user: UserDataType) => {
    setUsers([...users, user]);
  };

  const removeSelectedUsers = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.key)));
    setSelectedUsers([]); // 삭제 후 선택 초기화
    setIsRemoveUserModal(false);
  };

  const rowSelection: TableProps<UserDataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedUsers(selectedRowKeys);
    },
    selectedRowKeys: selectedUsers,
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
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
          {searchKeyword && (
            <div className="mt-2 text-sm text-gray-600">
              검색결과: {filteredUsers.length}건 / 전체: {users.length}건
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => setIsAddUserModal(true)}>
            회원 등록
          </Button>
          <Button
            danger
            onClick={() => setIsRemoveUserModal(true)}
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
        dataSource={filteredUsers}
        pagination={false}
      />

      <AddUserModal
        open={isAddUserModal}
        onCancel={() => setIsAddUserModal(false)}
        addUser={addUser}
      />

      <Modal
        title="유저 삭제"
        centered
        open={isRemoveUserModal}
        onOk={removeSelectedUsers}
        onCancel={() => setIsRemoveUserModal(false)}
      >
        <p>유저를 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
}
