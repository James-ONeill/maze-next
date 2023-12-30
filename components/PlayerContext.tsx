import { createContext } from "react"

type Direction = "up" | "down" | "left" | "right"

interface PlayerState {
  name?: string
  x: number
  y: number
  hasCoffee: boolean
  direction?: "up" | "down" | "left" | "right"
  move?: (direction: Direction) => any
  setName?: (name: string) => any
}

const PlayerContext = createContext<PlayerState>({
  x: 0,
  y: 0,
  hasCoffee: false,
})

export const PlayerProvider = PlayerContext.Provider
export const PlayerConsumer = PlayerContext.Consumer

export default PlayerContext
