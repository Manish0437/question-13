// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = ({teamDetails}) => {
  const {id, name, teamImageUrl} = teamDetails

  return (
    <Link className="team-link" to={`/team-matches/${id}`}>
      <li className="teamCard-cont">
        <img src={teamImageUrl} className="team-img" alt={name} />
        <p className="team-title">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
