import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6">Admissions</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Take the first step towards a bright future. Join GVH College and become part of our legacy of excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <SectionHeading title="Admission Process" />
            <div className="space-y-8 mb-16">
              {[
                { step: "Step 1: Application Submission", desc: "Fill out the online application form and submit the required application fee." },
                { step: "Step 2: Document Verification", desc: "Submit all necessary academic documents, certificates, and ID proofs for verification." },
                { step: "Step 3: Admission Confirmation", desc: "Upon successful verification, you will receive an admission confirmation letter." },
                { step: "Step 4: Fee Payment", desc: "Pay the course fee to finalize your enrollment and secure your seat." }
              ].map((process, i) => (
                <div key={i} className="flex bg-gray-50 p-6 rounded-lg border border-border-color">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{process.step}</h3>
                    <p className="text-secondary-text">{process.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <SectionHeading title="Required Documents" />
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border-color mb-16">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['10th Mark Sheet', '12th Mark Sheet', 'Transfer Certificate (TC)', 'Migration Certificate', 'Aadhaar Card Copy', 'Passport Size Photographs (6)'].map((doc, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    <span className="text-primary-text font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <SectionHeading title="Scholarships" />
            <p className="text-secondary-text mb-6">
              GVH College believes that financial constraints should not be a barrier to quality education. We offer various scholarships for deserving students based on merit and financial need.
            </p>
            <ul className="list-disc pl-5 text-secondary-text space-y-2">
              <li><strong>Government Scholarships:</strong> Facilitated for eligible SC/ST/OBC and minority students.</li>
              <li><strong>Merit Scholarships:</strong> Awarded to top-performing students in academics.</li>
              <li><strong>Financial Assistance:</strong> Need-based aid for economically weaker sections.</li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-border-color rounded-lg p-8 sticky top-28">
              <h3 className="text-xl font-sans font-bold mb-6 border-b border-gray-200 pb-4">Fee Structure (Annual)</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Bachelor of Commerce</span>
                  <span className="font-bold text-accent">₹45,000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Bachelor of Arts</span>
                  <span className="font-bold text-accent">₹35,000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Admission Fee (One-time)</span>
                  <span className="font-bold text-accent">₹5,000</span>
                </li>
              </ul>
              <p className="text-sm text-secondary-text italic mt-6">
                * Note: The fee structure is subject to change. Please contact the admissions office for the most current information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
