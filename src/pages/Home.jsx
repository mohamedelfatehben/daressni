import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Layout from "../components/Layout";
import { searchGroupes } from "../apis/groups.js";
import JoinGroup from "../components/student/JoinGroup.jsx";
import { specialties } from "../utils/index.js";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  //To join the group
  const [group, setGroup] = useState(null);

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
    setPage(0); // Reset to first page on new search
  }, 2000);

  // Fetch courses based on debounced search query and page
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await searchGroupes(debouncedSearchQuery, page, 9);
        console.log(res.data);
        setCourses([...res.data.content]);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearchQuery, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Layout>
      <div className="w-full p-4">
        <h1 className="text-3xl font-bold mb-6">
          Which course are you searching for?
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search courses by Teacher, Module,Title..."
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
                key={course.idGroupe}
                title={course.name}
                module={course.module.name}
                specialty={specialties[`${course.module.speciality.name}`]}
                cover={course.image}
                teacher={
                  course.teacher?.firstName + " " + course.teacher?.lastName
                }
                remainingPlaces={course.max - course.students.length}
                lecturePrice={course.lecturePrice}
                JoinGroup={() => {
                  setGroup(course);
                }}
              />
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2">
            {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <JoinGroup
        ioOpen={!!group}
        close={() => {
          setGroup(null);
        }}
        group={group}
      />
    </Layout>
  );
}

export default Home;
