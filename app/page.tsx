import Image from "next/image";
import styles from "./page.module.css";
import Calendar from "@/components/Elements/Calendar/Calendar";
import {Roboto} from 'next/font/google'
import Tasks from "@/components/Layouts/Tasks";


const roboto = Roboto({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
    display: 'swap',
})

export default function Home() {
  return (
      <main className={roboto.className}>
        <Tasks/>
      </main>

  );
}
