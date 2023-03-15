import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import styles from "./Card.module.css";

interface CardProps {
  href: string;
  name: string;
  imgUrl: string;
  className?: string;
}

const Card = (props: CardProps) => {
  return (
    <div className={styles.card}>
      <Link className={styles.cardLink} href={props.href}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              alt={props.name}
              width={260}
              height={160}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card;