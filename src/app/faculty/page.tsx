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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {facultyList.map((faculty: any) => (
              <div key={faculty._id} className="bg-white rounded-lg shadow-md border border-border-color overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full bg-gray-100">
                  <Image 
                    src={faculty.image} 
                    alt={faculty.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-accent mb-1">{faculty.name}</h3>
                  <p className="text-sm font-semibold text-primary-text mb-4">{faculty.designation}</p>
                  
                  <div className="space-y-2 text-sm text-secondary-text">
                    {faculty.qualification && (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Qualification:</span>
                        <span>{faculty.qualification}</span>
                      </div>
                    )}
                    {faculty.experience && (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Experience:</span>
                        <span>{faculty.experience}</span>
                      </div>
                    )}
                    {faculty.specialization && (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Specialization:</span>
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
