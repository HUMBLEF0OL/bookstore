import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";
import RootComponent from "@/components/RootComponent/RootComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <RootComponent />
    </main>
  );
}
