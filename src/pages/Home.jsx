import CourseCard from "../components/CourseCard";
import Layout from "../components/Layout";
import { useState } from "react";

function Home() {
  // Assuming you have an array of courses
  const courses = [
    {
      id: 1,
      title: "Course 1",
      module: "Math",
      specialty: "Math",
      cover: "https://placehold.co/600x400", // URL or path to the cover image
      teacher: "Teacher Name",
      remainingPlaces: 10,
      lecturePrice: "50",
    },
    {
      id: 2,
      title: "Course 2",
      module: "Math",
      specialty: "Math",
      cover: "https://placehold.co/600x400",
      teacher: "Another Teacher",
      remainingPlaces: 5,
      lecturePrice: "60",
    },
    {
      id: 3,
      title: "Course 3",
      module: "Math",
      specialty: "Math",
      cover: "https://placehold.co/600x400",
      teacher: "Another Teacher",
      remainingPlaces: 2,
      lecturePrice: "60",
    },
    // Add more courses as needed
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-bold mb-6">Find Your Courses</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              module={course.module}
              specialty={course.specialty}
              cover={course.cover}
              teacher={course.teacher}
              remainingPlaces={course.remainingPlaces}
              lecturePrice={course.lecturePrice}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
