import BarChart from '../../components/chart/BarChart';
import LineChart from '../../components/chart/LineChart';
import '../../styles/chart.css';

export default function ChartPage() {
  return (
    <div>
      <BarChart />
      <LineChart />
    </div>
  );
}
