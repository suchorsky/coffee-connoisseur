import Link from "next/link";
import { useRouter } from "next/router";

import coffeStoresData from '../../data/coffee-stores.json'

//change any!
export function getStaticProps(staticProps: { params: any; }) {
  const params = staticProps.params
  return {
    props: {
      coffeeStore: coffeStoresData.find(coffeStore => {
        return coffeStore.id.toString() === params.id;
      })
    }
  }
}

export function getStaticPaths() {
  return {
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
    ],
    fallback: false,
  }
}

const CoffeStore = (props: any) => {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <p>Coffe Store {router.query.id}</p>
      <Link href={"/coffee-store/dynamic"}>Go to dynamic page</Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  )
}

export default CoffeStore;