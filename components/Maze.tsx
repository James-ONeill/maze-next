import React, { useContext } from "react"
import MazeContext from "./MazeContext"
import TimerContext from "./TimerContext"

function Maze() {
  const { tiles } = useContext(MazeContext)
  const { startTime, startTimer } = useContext(TimerContext)

  return (
    <div className="maze relative">
      {startTime === null && (
        <img
          className="absolute inset-0 z-10"
          src="/img/how-to-play.png"
          onClick={startTimer}
        />
      )}
      {tiles.map((rowTiles, row) =>
        rowTiles.map((tile, col) => (
          <div key={`${row}-${col}`} className="tile" data-obstacle={!tile} />
        ))
      )}
    </div>
  )
}

export default Maze
