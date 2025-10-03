const MetricCard = ({ title, value }) => {
  return (
    <div className="w-full p-4 bg-gray-100 rounded shadow-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MetricCard;