import { useParams } from 'react-router-dom';
import useUsersStore from '../../store/useUsersStore';
import { useEffect, useState } from 'react';
import { UserDataType } from '../../types/User';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function UserPage() {
  usePageTitle('회원 정보');

  const [user, setUser] = useState<UserDataType | null>(null);
  const { users } = useUsersStore();
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    const foundUser = users.find((user) => user.code === userId);

    if (foundUser) {
      setUser(foundUser);
    }
  }, [userId, users]);

  return (
    <div>
      <div className="w-9/12">
        <table className="w-full border-t-2 border-indigo-800 border-b border-b-slate-700 text-left border-collapse">
          <colgroup>
            <col className="w-2/12" />
            <col className="" />
          </colgroup>
          <tbody>
            <tr>
              <th className="py-2.5 px-6 text-base">코드</th>
              <td className="py-2.5 px-6 border-l text-base">{user?.code}</td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">생년월일</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.birth}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">성별</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.gender}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">기기</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.device}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">동의서</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.consentForm}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">설문</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.survey}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">기타</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.etc}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">비고</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.note}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">시작 날짜</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.start}
              </td>
            </tr>
            <tr>
              <th className="py-2.5 px-6 text-base border-t">종료 날짜</th>
              <td className="py-2.5 px-6 border-l text-base border-t">
                {user?.end}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
