import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner/Banner'
import Card from '@/components/card/Card'

import { fetchCoffeStores } from '@/lib/coffee-stores'

//SSR
export async function getStaticProps(context: any) {

  const coffeStores = await fetchCoffeStores();

  return {
    props: {
      coffeStores,
    },
  }
}

const hanldeOnButtonClick = () => {
  console.log('click');
}

//to change props as global type
export default function Home({ coffeStores }: any) {
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
        {coffeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {
                coffeStores.map((coffeStore: any) => {
                  return (
                    <Card
                      imgUrl={coffeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                      href={`/coffee-store/${coffeStore.fsq_id}`}
                      name={coffeStore.name}
                      key={coffeStore.fsq_id}
                    />
                  );
                })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
