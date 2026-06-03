export default function QuickStats() {
  const stats = [
    { label: "Years of Excellence", value: "25+" },
    { label: "Students Enrolled", value: "5000+" },
    { label: "Qualified Faculty", value: "150+" },
    { label: "Programs Offered", value: "20+" }
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-4xl md:text-5xl font-sans font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-secondary-text uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
