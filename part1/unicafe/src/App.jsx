import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(<button onClick={onClick}>{text}</button>)
}

const Stats = ({good, neutral, bad, total}) => {
  if(total == 0) {
    return(
      <tr>No feedback given</tr>
    )
  }
  return(
    <>
      <Stat text="good" stat={good}/>
      <Stat text="neutral" stat={neutral}/>
      <Stat text="bad" stat={bad}/>
      <Stat text="all" stat={total}/>
      <Stat text="average" stat={(good - bad) / total}/>
      <Stat text="positive" stat={`${good / total}%`}/>
    </>
  )
}

const Stat = ({text, stat}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBad= () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <>
    <div>
      <h1>
        give feedback
      </h1>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
      <h1>
        statistics
      </h1>
    </div>
    <table>
      <Stats good={good} neutral={neutral} bad={bad} total={total}/>
    </table>
    </>
  )
}

export default App