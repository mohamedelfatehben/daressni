import React from 'react'
import { Link } from 'react-router-dom'

const GroupCard = ({group}) => {
  return (
    <div key={group.idGroupe} className="relative min-w-60 h-40">
    <Link 
    to={`/forum/${`${group.name === "general" ? group.name : group.idGroupe}`}`} 
    className="grid-post_link">
      <img
        src="/img/placeholder-groups.jpg"
        alt="post"
        className="h-full w-full object-cover"
      />
    </Link>
  
    <div className="grid-post_user">
      <p className="line-clamp-1 text-white font-bold">{group.name}</p>
      <p className="line-clamp-1 text-white font-bold">{"members (" + group.students.length + ")"}</p>
    </div>
  
  </div>
  )
}

export default GroupCard