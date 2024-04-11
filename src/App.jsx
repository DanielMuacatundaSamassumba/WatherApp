import { useEffect, useState } from 'react'
import './App.css'
import search from './assets/search.png'
import clear from './assets/clear.png'
import clouds from './assets/clouds.png'
import drizzle from './assets/drizzle.png'
import mist from './assets/mist.png'
import rain from './assets/rain.png'
import Humanity from './assets/humidity.png'
import wind from './assets/wind.png'

function App() {
  const [watherimg, setWatherimg] = useState(clear)
  const [Search, SetSearch] = useState('')
  const [Humanitynumber, setHumanitynumber] = useState('0')
  const [Widnnumber, setWindnumber] = useState('')
  const [City, setCity] = useState('')
  const [temp, setTemp] = useState('')
  const [wathericon, seWathericon] = useState('')
  const [speed, setSpeed] = useState('0')
  const hendlevalue = (e) => {
    SetSearch(e.target.value)
  }
  const Bring_data = () => {

    let key = 'e1850b492602c41062fcfa1ad2de3338'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Search}&appid=${key}`).then((res) => {
      res.json().then((ress) => {
        setCity(ress?.name)
        setTemp(ress?.main?.temp)

        if (ress?.weather[0]?.main == "Clouds") {
          setWatherimg(clouds)
        } else if (ress?.weather[0]?.main == "Rain") {
          setWatherimg(rain)
        } else if (ress?.weather[0]?.main == "Clear") {
          setWatherimg(clear)
        } else if (ress?.weather[0]?.main == "Mist") {
          setWatherimg(mist)
        }
        else if (ress.weather[0].main == "Drizzle") {
          setWatherimg(drizzle)
        }
        setHumanitynumber(ress?.main?.humidity)
        setSpeed(ress.wind.speed)
      }).catch((error) => {
        alert("Não encontrado")
        setTemp("0")
      })

    })

  }
  return (
    <>
      <div className="container">
        <div className="contant-card">
          <div className="search-content">
            <input type="search" name="" id="" placeholder='Cidade Ou País' onChange={hendlevalue} required="true" /><img src={search} alt="" onClick={Bring_data} />
          </div>
          <div className="content-wather">
            <img src={watherimg} alt="" />
            <h1>{temp + ' ºC'}
            </h1>
            <h3>{City}</h3>
            <div className="other-elements">
              <div className="humanity">
                <img src={Humanity} alt="" /><h4>{Humanitynumber}</h4>
              </div>
              <div className="wind">
                <img src={wind} alt="" /><h4>{speed}</h4>
              </div>

            </div>
            <div className="last-text">
              <p>Humanidade</p>
              <p>Velocidade do Vento</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
