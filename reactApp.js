function Team(props) {
  let shotPercentageDiv

  if (props.stats.shots) {
    const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
    shotPercentageDiv = (
      <div>
        <strong> Shooting %: {shotPercentage}</strong>
      </div>

    )
  }



  return (
    <div className="Team">
      <h2>{props.name}</h2>
      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>
      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>
      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>

      {shotPercentageDiv}


      <button onClick={props.shotHandler}>Shoot!</button>{" "}
    </div>
  );

}


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }

    this.shotSound = new Audio('Swish+2.mp3')
    this.scoreSound = new Audio('Swish+2.mp3')
  }

  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score
    this.shotSound.play()

    if (Math.random() > 0.5) {
      score += 1;
      this.scoreSound.play()

      setTimeout(() => {
        this.scoreSound.play()
      }, 100)


    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,

      }
    }))
  }

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score:0
      },
      visitingTeamStats: {
        shots: 0,
        score:0
      }
    }))
  }
  render() {


    return (
      <div className="Game">
        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot('visiting')}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets:</strong>{this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot('home')}
          />
        </div>
      </div>
    )
  }
}

// Deafault App component that all other compents are rendered through
function App(props) {
  const raccoons = {
    name: 'Russiaville Raccoons',
    logoSrc: 'https://cdn.mos.cms.futurecdn.net/YYH9o4wmSXJfvbzRTq5BTY-320-80.jpg'
  }

  const squirrels = {
    name: "Sheridan Squirrels",
    logoSrc: 'https://images.app.goo.gl/NggJ6zakoeyM36w59'
  }

  const souls = {
    name: 'Soul Reapers',
    logoSrc: 'https://images.app.goo.gl/NggJ6zakoeyM36w59'
  }

  const hollows = {
    name: 'Hollows',
    logoSrc: 'https://images.app.goo.gl/77V3a7q7AZpwid2aA'
  }
  return (
    <div className="App">
      <Game
        venue="Union 525 Gem"
        homeTeam={squirrels}
        visitingTeam={raccoons}
      />
      <Game venue="Sheridan Arena"
        homeTeam={souls}
        visitingTeam={hollows}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
