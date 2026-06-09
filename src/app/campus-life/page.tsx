import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CampusLifePage() {
  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Campus Life</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience a vibrant community that nurtures creativity, confidence, and lifelong learning.
          </p>
        </div>
      </div>

      {/* Cultural Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/campus-life/cultural-fest.webp" 
                alt="Cultural Activities" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading title="Cultural Programs & Festivals" />
              <p className="text-secondary-text text-lg leading-relaxed mb-6">
                Our campus is alive with cultural diversity and creative expression. The Annual Cultural Fest is a highlight of the academic year, bringing together students from all disciplines to showcase their talents in music, dance, theater, and fine arts.
              </p>
              <ul className="space-y-2 text-secondary-text list-disc pl-5">
                <li>Annual College Festival</li>
                <li>Talent Hunts & Competitions</li>
                <li>Traditional Day Celebrations</li>
                <li>Art Exhibitions & Drama Club</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Sports & Athletics" />
              <p className="text-secondary-text text-lg leading-relaxed mb-6">
                We believe in the holistic development of our students. Our extensive sports facilities cater to a wide range of indoor and outdoor games, encouraging physical fitness, teamwork, and competitive spirit.
              </p>
              <ul className="space-y-2 text-secondary-text list-disc pl-5">
                <li>Annual Sports Meet</li>
                <li>Inter-college Tournaments</li>
                <li>Indoor Games (Chess, Table Tennis, Badminton)</li>
                <li>Outdoor Athletics & Team Sports</li>
              </ul>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/campus-life/sports.webp" 
                alt="Sports Activities" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NSS & Clubs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Student Organizations" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">NSS & Community</h3>
              <p className="text-secondary-text mb-4">
                The National Service Scheme (NSS) unit actively organizes blood donation camps, awareness drives, and rural outreach programs to instill social responsibility.
              </p>
            </div>
            
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">Academic Clubs</h3>
              <p className="text-secondary-text mb-4">
                Join the Commerce Club, Literary Society, or Science Forum to engage in debates, seminars, and peer-led academic discussions outside the classroom.
              </p>
            </div>
            
            <div className="p-8 border border-border-color rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-accent mb-4">Workshops & Tours</h3>
              <p className="text-secondary-text mb-4">
                Regular industrial visits, educational tours, and skill-building workshops bridge the gap between theoretical knowledge and practical application.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

