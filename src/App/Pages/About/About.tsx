import React from 'react'
import styles from './About.module.scss'
import ktsCats from 'static/ktsCats_recolored.png'


const About = () => {

  return(
    <div className={styles.about}>
      <h2 className={styles.title}>
        About
      </h2>
        <p className={styles.info}>
        This website was made by Maria Laricheva during her studies at <a href="https://metaclass.kts.studio/">Metaclass</a>
        </p>

        <p className={styles.info}>
          If you like what you see, consider checking out <a href="https://mvlaricheva.netlify.app/">my portfolio</a>
        </p>
        <img src={ktsCats}/>
    </div>
  )
}

export default About