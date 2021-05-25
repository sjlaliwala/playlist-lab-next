import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Playlist from '../components/playlist'

export default function Home() {
  return (
    <div className={styles.container}>
      <Playlist/>
    </div>
  )
}
