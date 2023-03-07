import Link from "next/link";
import { useRouter } from "next/router";

const CoffeStore = () => {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <p>Coffe Store {router.query.id}</p>
      <Link href={"/coffee-store/dynamic"}>Go to dynamic page</Link>
    </div>
  )
}

export default CoffeStore;