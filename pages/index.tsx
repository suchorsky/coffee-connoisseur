import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

import Banner from '@/components/banner/Banner';
import Card from '@/components/card/Card';

import { fetchCoffeStores } from '@/lib/coffee-stores';
import useTrackLocation from '@/hooks/use-track-location';
import { useEffect, useState } from 'react';

//SSR
export async function getStaticProps(context: any) {
  const coffeStores = await fetchCoffeStores();
  console.log('hi static props');
  return {
    props: {
      coffeStores,
    },
  };
}

//to change props as global type
export default function Home(props: any) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState<any>([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState<any>(null);

  console.log({ latLong, locationErrorMsg });

  const hanldeOnButtonClick = () => {
    console.log('click');
    handleTrackLocation();
  };

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const fetchedCoffeStores: any = await fetchCoffeStores(latLong);
          setCoffeeStores(fetchedCoffeStores);
        } catch (error: any) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    fetchData();
  }, [latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffe Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating' : 'View stores nearby'}
          handleOnClick={hanldeOnButtonClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='coffe-banner'
          />
        </div>
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores Near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeStore: any) => {
                return (
                  <Card
                    imgUrl={
                      coffeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/coffee-store/${coffeStore.fsq_id}`}
                    name={coffeStore.name}
                    key={coffeStore.fsq_id}
                  />
                );
              })}
            </div>
          </>
        )}
        {props.coffeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeStores.map((coffeStore: any) => {
                return (
                  <Card
                    imgUrl={
                      coffeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
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
