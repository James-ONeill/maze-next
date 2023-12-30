import { createContext } from "react"

export type Direction = "up" | "down" | "left" | "right"

export interface PlayerState {
  name?: string
  x: number
  y: number
  hasCoffee?: boolean
  direction?: Direction
  move?: (direction: Direction) => any
  setName?: (name: string) => void
  hasCompleted?: boolean
}

const PlayerContext = createContext<PlayerState>({
  x: 0,
  y: 0,
  hasCoffee: false,
})

export const PlayerProvider = PlayerContext.Provider
export const PlayerConsumer = PlayerContext.Consumer

export default PlayerContext
