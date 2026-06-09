import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PrincipalPage() {
  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Principal's Message</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A warm welcome from the desk of the Principal.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl border border-border-color overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 relative min-h-[500px]">
                <Image 
                  src="/images/academics/ba-banner.webp" 
                  alt="Principal" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-primary-text">Welcome to GVH College</h2>
                
                <div className="space-y-6 text-secondary-text leading-relaxed">
                  <p>
                    It is my great privilege to welcome you to GVH College. As the Principal, I am immensely proud of our institution's rich heritage and our steadfast commitment to providing transformative education. We believe that true learning occurs when students are encouraged to ask questions, challenge norms, and explore beyond the syllabus.
                  </p>
                  <p>
                    Our experienced faculty members are not just teachers, but mentors who are deeply invested in the holistic development of every student. Through a rigorous academic curriculum blended with robust extracurricular programs, we strive to nurture critical thinkers, compassionate citizens, and capable leaders.
                  </p>
                  <p>
                    In today's rapidly changing world, adaptability and continuous learning are paramount. We constantly upgrade our facilities, pedagogical approaches, and industry partnerships to ensure that our students are well-prepared for the global challenges ahead. 
                  </p>
                  <p>
                    I invite you to explore our campus, interact with our community, and become a part of the GVH family. Together, let us embark on a journey of discovery, growth, and excellence.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-primary-text mb-1">Dr. S. K. Verma</h3>
                  <p className="text-accent font-semibold mb-2">M.Sc., Ph.D., Post-Doc (UK)</p>
                  <p className="text-sm text-secondary-text">Principal, GVH College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
