import { createContext } from "react"
import { Duration, Moment } from "moment"

export interface Timer {
  startTime?: null | Moment
  endTime?: null | Moment
  timeElapsed?: () => Duration
  startTimer?: () => any
  stopTimer?: () => any
}

const TimerContext = createContext<Timer>({
  startTime: null,
})

export const TimerProvider = TimerContext.Provider
export const TimerConsumer = TimerContext.Consumer

export default TimerContext
