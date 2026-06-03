import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function BAPage() {
  return (
    <div className="pt-20">
      <div className="relative h-[40vh] bg-black">
        <Image 
          src="/images/52931d59-6890-4dd1-afc3-6cd109fe6d3b.png" 
          alt="Bachelor of Arts" 
          fill 
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white drop-shadow-md">
            Bachelor of Arts
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SectionHeading title="Program Overview" />
            <p className="text-secondary-text mb-8 leading-relaxed text-lg">
              The Bachelor of Arts program at GVH College provides a strong foundation in humanities and social sciences. The curriculum is designed to develop communication, analytical thinking, cultural awareness, and social understanding, preparing students for diverse career paths in civil services, education, media, and social work.
            </p>

            <h3 className="text-2xl font-sans font-bold mb-6">Program Objectives</h3>
            <ul className="space-y-4 mb-12">
              {[
                "Promote critical thinking and analytical problem solving.",
                "Develop strong leadership qualities and interpersonal skills.",
                "Strengthen verbal and written communication skills.",
                "Provide a comprehensive understanding of human society and culture."
              ].map((obj, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent mr-3 flex-shrink-0" />
                  <span className="text-secondary-text">{obj}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-sans font-bold mb-6">Career Opportunities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {['Civil Services', 'Journalism', 'Teaching', 'Public Administration', 'Social Work', 'Content Writing'].map((career) => (
                <div key={career} className="bg-gray-50 border border-border-color p-4 rounded-md text-center font-medium">
                  {career}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-border-color rounded-lg p-8 sticky top-28">
              <h3 className="text-xl font-sans font-bold mb-6 border-b border-gray-200 pb-4">Program Details</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between">
                  <span className="text-secondary-text">Duration</span>
                  <span className="font-bold">3 Years</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary-text">Eligibility</span>
                  <span className="font-bold">10+2 (Any Stream)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-secondary-text">Intake</span>
                  <span className="font-bold">100 Seats</span>
                </li>
              </ul>
              <Button href="/admissions" className="w-full">
                Apply for Admission <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
