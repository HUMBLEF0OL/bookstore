import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Typography sx={{ textAlign: 'center', margin: 'auto' }} variant={'h3'}>WELCOME!</Typography>
    </main>
  );
}
