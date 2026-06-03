import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" 
          alt="About College" 
          fill 
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white drop-shadow-md">
            About GVH College
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading title="A Legacy of Excellence" />
            <div className="space-y-6 text-secondary-text leading-relaxed">
              <p>
                Established with the vision of making quality higher education accessible to students, GVH College has been empowering individuals to become responsible members of society for over two decades.
              </p>
              <p>
                Over the years, the college has built a strong reputation for academic excellence, student development, and deep community engagement. We pride ourselves on creating an environment that nurtures intellectual curiosity while providing practical, real-world skills.
              </p>
              <p>
                Our institution is committed to holistic development, ensuring that our graduates are not just degree holders, but future leaders equipped to handle the challenges of a rapidly changing world.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src="/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" 
              alt="College Legacy" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">Our Vision</h3>
              <p className="text-secondary-text">
                To be a center of excellence in higher education that inspires innovation, knowledge, leadership, and lifelong learning across all sections of society.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">Our Mission</h3>
              <ul className="text-secondary-text space-y-2 list-disc pl-5">
                <li>Provide quality education</li>
                <li>Foster critical thinking</li>
                <li>Encourage ethical values</li>
                <li>Promote research & innovation</li>
                <li>Support holistic student development</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color">
              <h3 className="text-2xl font-sans font-bold text-accent mb-4">Core Values</h3>
              <div className="flex flex-wrap gap-2">
                {['Integrity', 'Excellence', 'Responsibility', 'Inclusiveness', 'Innovation', 'Lifelong Learning'].map((val) => (
                  <span key={val} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-primary-text font-medium">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
