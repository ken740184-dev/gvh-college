import { getFaculty } from "@/actions/faculty";
import FacultyClient from "./FacultyClient";

export const revalidate = 60;

export default async function FacultyPage() {
  const res = await getFaculty();
  const facultyList = res.success ? res.faculty : [];

  return <FacultyClient initialFaculty={facultyList} />;
}
