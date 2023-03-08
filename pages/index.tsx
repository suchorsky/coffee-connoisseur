import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'

import Banner from '@/components/banner/Banner'
import Card from '@/components/card/Card'

import coffeStores from '../data/coffee-stores.json'

const hanldeOnButtonClick = () => {
  console.log('click');
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffe Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={hanldeOnButtonClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='coffe-banner'
          />
        </div>
        <div className={styles.cardLayout}>
          {
            coffeStores.map((coffeStore) => {
              return (
                <Card
                  imgUrl={coffeStore.imgUrl}
                  href={`/coffee-store/${coffeStore.id}`}
                  name={coffeStore.name}
                  className={styles.card}
                  key={coffeStore.id}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}
