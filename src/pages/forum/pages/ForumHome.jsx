import { useEffect ,useState} from "react";
import Layout from "../../../components/Layout";
import { Outlet, useNavigate } from "react-router-dom";

function ForumHome() {

  const [hoverd, setHoverd] = useState(false)

  const navigate = useNavigate();

  




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
             <Outlet/>
           </section>
    {/* //Afficher les groupes w ficher forum generale */}
          </Layout>
    );
}

export default ForumHome;
