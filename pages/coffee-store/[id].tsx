import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from '../../data/coffee-stores.json'

//change any!
export function getStaticProps(staticProps: { params: any; }) {
  const params = staticProps.params
  return {
    props: {
      coffeeStore: coffeeStoresData.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id;
      })
    }
  }
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map(coffeeStore => {
    return {
      params: {
        id: coffeeStore.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

const CoffeStore = (props: any) => {
  const router = useRouter();
  console.log(router);

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { address, name, neighbourhood } = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href={"/"}>
        Back to home
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  )
}

export default CoffeStore;