import { useEffect ,useState} from "react";
import Layout from "../../../components/Layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentGroups } from "@/apis/groups";
import GroupCard from "../components/GroupCard";

function ForumHome() {
  
  const user = useSelector((state) => state.authReducer);

  const [hoverd, setHoverd] = useState(false)

  const [groups, setGroups] = useState([
    {
      idGroupe: "1",
      name: "general",
      image: "/img/placeholder-groups.jpg",
      lecturePrice: 600,
      max: 25,
      students: [1, 2, 3, 4, 5, 6, 7],
      status: "ACTIVE",
      specialty: "History",
    },
    {
      idGroupe: 2,
      name: "Group 2",
      image: "/img/placeholder-groups.png",
      lecturePrice: 600,
      max: 25,
      students: [1, 2, 3, 4, 5, 6, 7],
      status: "ACTIVE",
      specialty: "History",
    },
        {
      idGroupe: 3,
      name: "Group 3",
      image: "/img/placeholder-groups.png",
      lecturePrice: 600,
      max: 25,
      students: [1, 2, 3, 4, 5, 6, 7],
      status: "INACTIVE",
      specialty: "History",
    }
  ]);
  
  const activeGroups=groups.filter((group=>group.status==="ACTIVE"));

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      if (user.role === "student") {
        getStudentGroups(user.id).then((res) => {
          if (res.status === 200) {
            // setGroups(res.data);
          }
        });
      } else {
        getTeacherGroups(user.id).then((res) => {
          if (res.status === 200) {
            setGroups(res.data);
          }
        });
      }
    }
    console.log(user)
  }, [user.id, user.role]);




  return (<Layout >
           <div className={` flex flex-1  items-center w-full h-14  pl-36 left-0 hover:bg-purple-600 bg-purple-400 backdrop-blur-md rounded-b-md shadow-md `} 
           onMouseEnter={()=>setHoverd(true)}
           onMouseLeave={()=>setHoverd(false)}
           >
              <div className={`${ hoverd ? 'bg-purple-400' : 'bg-purple-600'} p-1 rounded-md text-white font-semibold hover:cursor-pointer`}
              onClick={()=>navigate('/forum/create')}
              >
                Create Post
                </div>
           </div>
           <section>
            <div className="flex flex-1 relative w-full">
              <Outlet/>
              <div className="border-l border-gray-300"></div>
              <div className="p-3 w-[40%] overflow-y-scroll h-screen absolute right-0">
                <div className="flex flex-1 w-full justify-start items-center gap-5 mt-6">
                  <img src="/img/group-logo.png" alt="groups"            
                     width={36}
                     height={36} /> 
                  <h2 className="text-2xl font-bold">Forums</h2> 
                </div>
                <div className="flex flex-wrap gap-7 p-4 scroll">
                         {
                          activeGroups.map(group=>(
                             <GroupCard key={group.idGroupe} group={group}/>
                          ))
                         }
                </div>
              </div>
            </div>            
           </section>
    {/* //Afficher les groupes w ficher forum generale */}
          </Layout>
    );
}

export default ForumHome;
