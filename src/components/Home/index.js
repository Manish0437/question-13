import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    try {
      const response = await fetch(teamsApiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch teams data')
      }
      const data = await response.json()
      const formattedData = data.teams.map(eachTeam => ({
        id: eachTeam.id,
        name: eachTeam.name,
        teamImageUrl: eachTeam.team_image_url,
      }))
      this.setState({teamsData: formattedData, isLoading: false})
    } catch (error) {
      console.error('Error fetching teams data: ', error)
    }
  }

  render() {
    const {teamsData, isLoading} = this.state

    return (
      <div className="home-container">
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="app-container">
            <div className="ipl-dashboard-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                className="ipl-logo"
                alt="ipl logo"
              />
              <h1 className="logo-title">IPL Dashboard</h1>
            </div>
            <ul className="teams-list-cont">
              {teamsData.map(eachItem => (
                <Link
                  key={eachItem.id}
                  to={`/team-matches/${eachItem.id}`} // Navigate to TeamMatches with team id
                  className="team-link"
                >
                  <TeamCard teamDetails={eachItem} />
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
