import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaculty } from "@/actions/faculty";

export const revalidate = 60;

export default async function FacultyPage() {
  const res = await getFaculty();
  const facultyList = res.success ? res.faculty : [];

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Faculty Directory</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet our dedicated team of educators and researchers committed to academic excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading title="Our Esteemed Faculty" centered />
        
        {facultyList.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No faculty members have been added yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {facultyList.map((faculty: any) => (
              <div key={faculty._id} className="bg-white rounded-none shadow-md border border-border-color overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Padded Image Container (not aligned with card border) */}
                <div className="p-5 pb-0">
                  <div className="relative h-72 w-full bg-gray-100 rounded-none overflow-hidden border border-gray-200/60">
                    <Image 
                      src={faculty.image} 
                      alt={faculty.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-accent mb-1.5">{faculty.name}</h3>
                  <p className="text-sm font-semibold text-primary-text mb-5 uppercase tracking-wider">{faculty.designation}</p>
                  
                  <div className="space-y-2.5 text-sm text-secondary-text border-t border-gray-100 pt-4">
                    {faculty.qualification && (
                      <div className="leading-relaxed">
                        <span className="font-semibold text-gray-900">Qualification: </span>
                        <span>{faculty.qualification}</span>
                      </div>
                    )}
                    {faculty.experience && (
                      <div className="leading-relaxed">
                        <span className="font-semibold text-gray-900">Experience: </span>
                        <span>{faculty.experience}</span>
                      </div>
                    )}
                    {faculty.specialization && (
                      <div className="leading-relaxed">
                        <span className="font-semibold text-gray-900">Specialization: </span>
                        <span>{faculty.specialization}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
