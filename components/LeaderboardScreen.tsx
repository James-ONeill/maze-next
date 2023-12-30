import { useState, useEffect, useContext, useMemo } from "react"
import ordinal from "ordinal"
import { padStart } from "lodash"

import PlayerContext from "./PlayerContext"

interface Props {
  latestTime: any
  exit: any
}

function LeaderboardScreen({ latestTime, exit }: Props) {
  const [times, updateTimes] = useState([])
  const player = useContext(PlayerContext)

  const theme = useMemo(() => {
    if (!Audio) return
    const theme = new Audio("/audio/themetune-end.mp3")
    theme.loop = true
    return theme
  }, [])

  useEffect(() => {
    if (!latestTime) return

    theme?.play()

    return () => theme?.pause()
  }, [latestTime])

  function textColor(index: number) {
    const colors = ["gold", "silver", "bronze"]
    return `text-${colors[index] || "brown-dark"}`
  }

  return (
    <>
      <img className="mb-6 mx-auto w-24" src="/img/logo.png" />

      <div className="px-8">
        <div
          className="bg-white max-w-xl mb-6 mx-auto overflow-scroll px-6 py-8 text-brown-dark uppercase"
          style={{ height: "22rem" }}
        >
          {latestTime && (
            <div className="mb-6">
              <h2 className="mb-4 text-center text-orange">YOUR TIME!</h2>

              <div className="flex justify-between text-xs">
                <div>{ordinal(latestTime.position)}</div>
                <div>{latestTime.name}</div>
                <div>{latestTime.drink}</div>
                <div>
                  {latestTime.minutes}:{padStart(latestTime.seconds, 2, "0")}:
                  {padStart(latestTime.milliseconds, 3, "0")}
                </div>
              </div>
            </div>
          )}

          <h2 className="mb-4 text-center">LEADERBOARD</h2>

          <table className="text-xs w-full">
            <tbody></tbody>
          </table>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="flex justify-center px-2 text-white">
            <div className="w-full px-2">
              <button
                className="bg-orange flex h-12 items-center justify-center text-center text-shadow-dark-orange shadow-button-orange text-xl w-full focus:outline-none"
                type="button"
                onClick={exit}
              >
                {latestTime ? "PLAY AGAIN" : "EXIT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderboardScreen
