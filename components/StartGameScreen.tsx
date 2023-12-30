import { useRef, useContext } from "react"

import PlayerContext from "./PlayerContext"

interface Props {
  createPlayer: any
  showLeaderboard: any
}

function NewPlayerScreen({ createPlayer, showLeaderboard }: Props) {
  const player = useContext(PlayerContext)

  return (
    <form
      className="max-w-xl mx-auto px-8 text-center"
      onSubmit={(event) => {
        event.preventDefault()

        createPlayer({
          name: "PLAYER1",
        })
      }}
    >
      <img className="mb-6 mx-auto w-24" src="/img/logo.png" />

      <img className="mb-6 mx-auto w-16" src="/img/coffee-cup-anim.gif" />

      <h1 className="mb-6 text-base text-center text-shadow-white">
        COFFEE TO GO<span className="text-orange">!</span>
        <br />
        <span className="text-xl text-orange">PATH TO PURCHASE</span>
      </h1>

      <input
        className="nes-input mb-4 focus:outline-none"
        style={{ background: "white" }}
        placeholder="ENTER NAME..."
        defaultValue="PLAYER 1"
        disabled
        type="text"
      />

      <p className="text-xs mb-6 text-center text-shadow-white">
        ENTER DETAILS TO PLAY
      </p>

      <div className="flex mb-6 px-2 text-white">
        <div className="w-1/2 px-2">
          <button
            className="bg-brown flex h-12 items-center justify-center text-center text-shadow-dark-brown text-xs w-full shadow-button-dark focus:outline-none"
            type="button"
            onClick={showLeaderboard}
          >
            LEADERBOARD
          </button>
        </div>

        <div className="w-1/2 px-2">
          <button
            className="bg-orange flex h-12 items-center justify-center text-center text-shadow-dark-orange shadow-button-orange text-xl w-full focus:outline-none"
            type="submit"
          >
            PLAY
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewPlayerScreen
