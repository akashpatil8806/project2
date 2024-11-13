import { MdMessage } from 'react-icons/md'
import Button from '../Button/Button'
import styles from './ContactFrom.module.css'
import React from 'react'
import { MdCall } from "react-icons/md";


const Contactfrom = () => {
  return (
    <section className={styles.container}>
      <div className={styles.Contact_from}>
      <Button text="VIA SUPPORT CHAT" icons={<MdMessage fontSize="24px"/>}/>
      <Button text="VIA CALL" icons={<MdCall/>}/>
      <Button text="VIA SUPPORT CHAT" icons={<MdCall />}/>


      </div>
       
        </section>
  )
}

export default Contactfrom