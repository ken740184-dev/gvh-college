import mongoose from "mongoose";

const YearlyGraduateSchema = new mongoose.Schema({
  year: { type: String, required: true },
  count: { type: Number, required: true, min: 0 },
  note: { type: String, default: "" },
  addedAt: { type: Date, default: Date.now },
});

const StatsSchema = new mongoose.Schema(
  {
    yearsOfExcellence: { type: Number, default: 25 },
    totalStudents: { type: Number, default: 5000 },
    faculty: { type: Number, default: 150 },
    programs: { type: Number, default: 20 },
    // Yearly graduate log – each entry accumulates into totalStudents
    yearlyGraduates: { type: [YearlyGraduateSchema], default: [] },
    // Base offset for the students count (before yearly additions)
    studentsBase: { type: Number, default: 5000 },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Guard against hot-reload re-registration
if (mongoose.models.Stats) {
  delete mongoose.models.Stats;
}

const Stats = mongoose.model("Stats", StatsSchema);
export default Stats;
