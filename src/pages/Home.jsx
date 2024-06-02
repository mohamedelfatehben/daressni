import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Layout from "../components/Layout";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce function
  const debounce = (callback, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(this, arguments);
      }, delay);
    };
  };

  // Update debounced search query when search query changes
  const handleSearchQueryChange = debounce((value) => {
    setDebouncedSearchQuery(value);
  }, 300);

  // Fetch courses based on debounced search query
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `API_ENDPOINT?search=${debouncedSearchQuery}`
        );
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    // Fetch courses only if there's a debounced search query
    if (debouncedSearchQuery !== "") {
      fetchCourses();
    } else {
      setCourses([]); // Clear courses if search query is empty
    }
  }, [debouncedSearchQuery]);

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-bold mb-6">
          Which course are you searching for?
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearchQueryChange(e.target.value);
            }}
            className="border border-gray-300 rounded-lg py-2 px-4 w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            courses.map((course) => (
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
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
