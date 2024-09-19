import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data for visitors per month
const monthlyData = [
  { month: "Jan", visitors: 400 },
  { month: "Feb", visitors: 300 },
  { month: "Mar", visitors: 500 },
  { month: "Apr", visitors: 450 },
  { month: "May", visitors: 600 },
  { month: "Jun", visitors: 550 },
  { month: "Jul", visitors: 700 },
  { month: "Aug", visitors: 650 },
  { month: "Sep", visitors: 600 },
  { month: "Oct", visitors: 550 },
  { month: "Nov", visitors: 500 },
  { month: "Dec", visitors: 450 },
];

// Data for sales by month
const salesData = [
  { month: "Jan", sales: 3000 },
  { month: "Feb", sales: 2000 },
  { month: "Mar", sales: 4000 },
  { month: "Apr", sales: 3500 },
  { month: "May", sales: 5000 },
  { month: "Jun", sales: 4500 },
  { month: "Jul", sales: 6000 },
  { month: "Aug", sales: 5500 },

];

// Define colors for PieChart segments
const COLORS = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
  "#c2c2c2",
  "#ff6f61",
  "#6b5b95",
  "#feb236",
];

export function CombinedCharts() {
  return (
    <div style={{display: "flex", gap: "20px",width:"100%"}}>
      {/* Bar Chart for Monthly Visitors */}
      <BarChart width={500} height={350} data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visitors" fill="#8884d8" />
      </BarChart>

      {/* Pie Chart for Monthly Sales */}
      <PieChart width={400} height={400}>
        <Pie
          data={salesData}
          dataKey="sales"
          nameKey="month"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {salesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
