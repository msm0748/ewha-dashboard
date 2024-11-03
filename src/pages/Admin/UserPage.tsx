import { useParams } from 'react-router-dom';
import useUsersStore from '../../store/useUsersStore';
import { useEffect, useState } from 'react';
import { UserDataType } from '../../types/User';
import { usePageTitle } from '../../hooks/usePageTitle';
import StackedBarChart from '../../components/chart/StackedBarChart';
import LineChart from '../../components/chart/LineChart';
import BarChart from '../../components/chart/BarChart';
import '../../styles/chart.css';

export default function UserPage() {
  const [user, setUser] = useState<UserDataType | null>(null);
  const { users } = useUsersStore();
  const { userId } = useParams();

  usePageTitle(`${userId} 회원 정보`);

  useEffect(() => {
    if (!userId) return;
    const foundUser = users.find((user) => user.code === userId);

    if (foundUser) {
      setUser(foundUser);
    }
  }, [userId, users]);

  return (
    <div>
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">회원 정보</h2>
        <div className="w-9/12">
          <table className="w-full border-t-2 border-t-[#0a1646] border-b border-b-[#7c8091] text-left border-collapse">
            <colgroup>
              <col className="w-2/12" />
              <col className="" />
            </colgroup>
            <tbody>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091]">코드</th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base">
                  {user?.code}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  생년월일
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.birth}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  성별
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.gender}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  기기
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.device}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  동의서
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.consentForm}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  설문
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.survey}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  기타
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.etc}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  비고
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.note}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  시작 날짜
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.start}
                </td>
              </tr>
              <tr>
                <th className="py-2.5 px-6 text-base border-[#7c8091] border-t">
                  종료 날짜
                </th>
                <td className="py-2.5 px-6 border-l border-[#7c8091] text-base border-t">
                  {user?.end}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">차트 데이터</h2>
        <div>
          <StackedBarChart />
          <LineChart />
          <BarChart />
        </div>
      </section>
    </div>
  );
}
