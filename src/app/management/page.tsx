import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const governingBody = [
  { id: 1, name: "Dr. A. K. Sharma", position: "Chairman", qualification: "Ph.D., Education Administration", image: "/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" },
  { id: 2, name: "Mrs. R. Desai", position: "Vice Chairperson", qualification: "M.B.A., Social Sciences", image: "/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" },
  { id: 3, name: "Mr. V. Patel", position: "Secretary", qualification: "LL.B., Commerce", image: "/images/b465b6c6-83ea-4042-99ad-f907e1e65696.png" },
  { id: 4, name: "Dr. K. Iyer", position: "Academic Director", qualification: "Ph.D., Physics", image: "/images/f4b83665-42eb-4514-93eb-afe1ce1f84e2.png" },
];

export default function ManagementPage() {
  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Management</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The visionary leaders guiding our institution towards academic excellence.
          </p>
        </div>
      </div>

      {/* Chairman's Message */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image src="/images/swarthmore-college-Eric-Behrens-flickr-5706ffe35f9b581408d48cb3.jpg" alt="Chairman" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:col-span-8">
              <SectionHeading title="Chairman's Message" />
              <div className="space-y-6 text-secondary-text leading-relaxed text-lg italic">
                <p>
                  "Education is not merely about acquiring degrees, but about building character, fostering critical thinking, and preparing the youth to take on the challenges of tomorrow. At GVH College, we are deeply committed to providing an ecosystem where students can discover their true potential."
                </p>
                <p>
                  "We have continually invested in modern infrastructure, dedicated faculty, and an inclusive campus culture that encourages both academic rigor and extracurricular participation. Our goal is to empower our students so they may step into the world with confidence, integrity, and a sense of responsibility."
                </p>
                <div className="pt-6 font-bold text-primary-text not-italic">
                  <p className="text-xl mb-1">Dr. A. K. Sharma</p>
                  <p className="text-accent text-sm uppercase tracking-wider">Chairman, GVH Educational Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Body */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Governing Body" centered />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {governingBody.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md border border-border-color overflow-hidden">
                <div className="relative h-64 w-full bg-gray-100">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm font-bold text-accent mb-3">{member.position}</p>
                  <p className="text-sm text-secondary-text">{member.qualification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
