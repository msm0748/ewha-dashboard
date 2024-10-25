import StackedBarChart from '../../components/chart/StackedBarChart';
import LineChart from '../../components/chart/LineChart';
import '../../styles/chart.css';
import BarChart from '../../components/chart/BarChart';

export default function ChartPage() {
  return (
    <div>
      <StackedBarChart />
      <LineChart />
      <BarChart />
    </div>
  );
}
