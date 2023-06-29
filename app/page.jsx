import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
 <div className='principalContainer'>
  <div className='firstContainer'>
    <div className='searchContainer'>
      <div className='searchGroup'>
        <button className='buttonSearch'>Seach for places</button>
        <div id='containerLocation'>
        <img id='mylocation' src="/mylocation.svg" alt="" />
        </div>
        
      </div>
      
    </div>
    <div className='climeImage'>
      <img src="" alt="cloudBackground" />
      <img src="" alt="shower" />
    </div>
    <div className='boxshowerText'>
      <div>
        <h2>15°C</h2>
      </div>
      <div>
        <h3>Shower</h3>
      </div>
      <div>
        <h4>Today</h4>
        <h4>Fri.5 Jun</h4>
      </div>
      <div>
        <img src="" alt="icono" />
        <h4>Helsinki</h4>

      </div>

    </div>

  </div>
  <div className='secondContainer'>

  </div>

 </div>
 
  )
}
