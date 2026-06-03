"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { studentAchievements, facultyAchievements, institutionalAchievements } from "@/data/achievements";

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="pt-20">
      <div className="bg-navbar py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Achievements</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Celebrating excellence across academics, sports, and institutional milestones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "student" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Student Achievements
          </button>
          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "faculty" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Faculty Achievements
          </button>
          <button
            onClick={() => setActiveTab("institutional")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "institutional" ? "bg-accent text-white" : "bg-gray-100 text-secondary-text hover:bg-gray-200"
            }`}
          >
            Institutional Achievements
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {activeTab === "student" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentAchievements.map((item) => (
                <div key={item.id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-accent font-semibold mb-2 block">{item.date}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "faculty" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facultyAchievements.map((item) => (
                <div key={item.id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-accent font-semibold mb-2 block">{item.date}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "institutional" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {institutionalAchievements.map((item) => (
                <div key={item.id} className="bg-white border border-border-color rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-accent font-semibold mb-2 block">{item.date}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
