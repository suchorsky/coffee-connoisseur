import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeStores } from '@/lib/coffee-stores';

//change any!
export async function getStaticProps(staticProps: { params: any }) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  console.log('PATHS!', paths);
  return {
    paths,
    fallback: true,
  };
}

const CoffeStore = (props: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { location, name } = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log('handle upvote');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={'/'}>Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            alt={name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>{location.locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='icon'
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up votee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeStore;
