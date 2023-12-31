"use client"
import Game from "@/components/Game"
import { Press_Start_2P } from "next/font/google"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <div className={pressStart2P.className}>
      <Game />
    </div>
  )
}
