import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ name, capital, area, languages, flag}) => {
  return(
    <div key={name}>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h2>Languages</h2>
      <ul>
        {
          Object.values(languages).map((language) => <li key={language}>{language}</li>)
        }
      </ul>
      <img src={flag}/> 
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [view, setView] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  function handleChange(e) {
    const lowerCaseStr = e.target.value.toLowerCase()
    setFilter(e.target.value)
    // console.log(countries)
    const data = countries.filter(c => c.name.common.toLowerCase().includes(lowerCaseStr))
    const view = data.map(({ name, capital, area, languages, flags }) =>{
      return({name: name.common,
              capital: capital ? capital[0] : "Capital does not apply",
              area: area,
              languages: languages,
              flag: flags.png,
              show: false
      })
    })

    const filtered = view.map((c) => c.name)

    if(view.length === 1) {
      view[0].show = true
      setView(view)
      setFiltered([])
    } else if(view.length <= 10) {
      setView(view)
      setFiltered(filtered)
    } else {
      setView([])
      setFiltered([])
    }

  }

  function handleClick(name) {
    const updated = view.map(c => c.name === name ? {...c, show: !c.show} : c)
    setView(updated)
  }


  // <Country name={country.name} capital={country.capital} area={country.area} languages={country.languages} flag={country.flag}/>
  return(
    <div>
      <label>find countries </label>
      <input value={filter} onChange={handleChange}/>
      {
        filtered.map((name) =>
          <div key={name}>
            <p>
              {name}
              <button onClick={() => handleClick(name)}> show</button>
            </p>
          </div>
        )
      }
      {
        view.filter((c) => c.show).map(c => <Country key={c.name} name={c.name} capital={c.capital} area={c.area} languages={c.languages} flag={c.flag}/>)
      }
    </div>
  )
}


export default App
