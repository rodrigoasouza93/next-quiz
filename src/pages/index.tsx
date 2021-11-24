import { Button } from '../components/Button';

import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Bem vindo ao jogo de questionário</h1>
      <Button text="Iniciar jogo" href="/game" />
    </div>
  )
}
