import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'

import Banner from '@/components/banner/Banner'
import Card from '@/components/card/Card'

import coffeStoresData from '../data/coffee-stores.json'
import CoffeStoresResponse from '@/types/coffeData'

//SSR
export async function getStaticProps(context: any) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.API_KEY
    }
  };
  
  const requestInit: RequestInit = {
    method: options.method,
    headers: {
      accept: options.headers.accept,
      Authorization: options.headers.Authorization as string || ''
    }
  };
  
  const response = await fetch('https://api.foursquare.com/v3/places/search?query=coffee&ll=53.120354%2C18.004737&limit=6', 
  requestInit);
  const data:CoffeStoresResponse = await response.json()
  console.log(data.results)
    // .catch(err => console.error(err));

  return {
    props: {
      coffeStores: data.results,
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
                      imgUrl={coffeStore.imgUrl}
                      href={`/coffee-store/${coffeStore.id}`}
                      name={coffeStore.name}
                      key={coffeStore.id}
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
