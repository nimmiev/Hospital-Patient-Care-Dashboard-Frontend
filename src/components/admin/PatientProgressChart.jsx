import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Jan', progress: 60 },
  { date: 'Feb', progress: 65 },
  { date: 'Mar', progress: 70 },
  { date: 'Apr', progress: 75 },
  { date: 'May', progress: 80 },
];

export default function PatientProgressChart() {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-bold text-center mb-4 text-primary">Patient Progress Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[50, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
