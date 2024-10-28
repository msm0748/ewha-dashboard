import { useParams } from 'react-router-dom';
import useUsersStore from '../../store/userStore';
import { useEffect, useState } from 'react';
import { UserDataType } from '../../types/User';

export default function UserPage() {
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
            <col className="w-3/12" />
            <col className="" />
          </colgroup>
          <tbody>
            <tr>
              <th>코드</th>
              <td className="border-l">{user?.code}</td>
            </tr>
            <tr>
              <th className="border-t">생년월일</th>
              <td className="border-l border-t">{user?.birth}</td>
            </tr>
            <tr>
              <th className="border-t">성별</th>
              <td className="border-l border-t">{user?.gender}</td>
            </tr>
            <tr>
              <th className="border-t">기기</th>
              <td className="border-l border-t">{user?.device}</td>
            </tr>
            <tr>
              <th className="border-t">동의서</th>
              <td className="border-l border-t">{user?.consentForm}</td>
            </tr>
            <tr>
              <th className="border-t">설문</th>
              <td className="border-l border-t">{user?.survey}</td>
            </tr>
            <tr>
              <th className="border-t">기타</th>
              <td className="border-l border-t">{user?.etc}</td>
            </tr>
            <tr>
              <th className="border-t">비고</th>
              <td className="border-l border-t">{user?.note}</td>
            </tr>
            <tr>
              <th className="border-t">시작 날짜</th>
              <td className="border-l border-t">{user?.start}</td>
            </tr>
            <tr>
              <th className="border-t">종료 날짜</th>
              <td className="border-l border-t">{user?.end}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
