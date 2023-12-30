import CheckoutScreen from "@/components/CheckoutScreen"
import CoffeeMachineScreen from "@/components/CoffeeMachineScreen"
import GameScreen from "@/components/GameScreen"
import LeaderboardScreen from "@/components/LeaderboardScreen"
import MazeContext from "@/components/MazeContext"
import {
  Direction,
  PlayerProvider,
  PlayerState,
} from "@/components/PlayerContext"
import StartGameScreen from "@/components/StartGameScreen"
import { Timer, TimerProvider } from "@/components/TimerContext"
import moment from "moment"
import Image from "next/image"
import { useContext, useEffect, useMemo, useState } from "react"

function Game() {
  const [screen, setScreen] = useState<string>("start-game")
  const [latestTime, updateLatestTime] = useState(null)
  const [drink, updateDrink] = useState<
    "COF" | "TEA" | "CAP" | "LAT" | "ESP" | "CHO" | "MOC" | null
  >(null)
  const [timer, setTimer] = useState<Timer>({
    startTime: null,
    endTime: null,
  })

  const { footstepAudio, coffeeMachineAudio, themeAudio, endThemeAudio } =
    useMemo(() => {
      if (!Audio) return {}

      const footstepAudio = new Audio("/audio/footsteps.wav")
      footstepAudio.load()
      footstepAudio.addEventListener("ended", footstepAudio.load)

      const coffeeMachineAudio = new Audio("/audio/reach-coffee-machine.wav")
      coffeeMachineAudio.load()
      coffeeMachineAudio.addEventListener("ended", coffeeMachineAudio.load)

      const themeAudio = new Audio("/audio/themetune-background-gameplay.mp3")
      themeAudio.load()
      themeAudio.loop = true

      const endThemeAudio = new Audio("/audio/themetune-end.mp3")
      endThemeAudio.load()
      endThemeAudio.loop = true

      return {
        footstepAudio,
        coffeeMachineAudio,
        themeAudio,
        endThemeAudio,
      }
    }, [])

  useEffect(() => {
    window.addEventListener("focus", () => {
      if (screen === "game") {
        // themeAudio.play();
      }

      if (screen === "leaderboard" && latestTime != null) {
        endThemeAudio?.play()
      }
    })

    window.addEventListener("blur", () => {
      themeAudio?.pause()
      endThemeAudio?.pause()
    })
  }, [screen, latestTime, endThemeAudio, themeAudio])

  const maze = useContext(MazeContext)

  const [player, setPlayer] = useState<PlayerState>({
    name: "James",
    x: maze.entrance.x,
    y: maze.entrance.y,
    direction: "up",
  })

  function timeElapsed() {
    const compare = timer.endTime ? timer.endTime : moment()

    return moment.duration(compare.diff(timer.startTime))
  }

  function startTimer() {
    if (timer.startTime) return
    themeAudio?.play()

    setTimer({
      ...timer,
      startTime: moment(),
      endTime: null,
    })
  }

  function stopTimer() {
    themeAudio?.pause()
    setTimer({
      ...timer,
      endTime: moment(),
    })
  }

  function createPlayer(name: string) {
    setPlayer({ ...player, name })

    localStorage.setItem("name", name)

    setScreen("game")
  }

  useEffect(() => {
    try {
      const name = localStorage.getItem("name")

      if (typeof name === "string") setPlayer({ ...player, name })
    } catch (e) {}
  }, [player])

  function setName(name: string) {
    setPlayer({ ...player, name })
  }

  const [animating, updateAnimating] = useState<boolean>(false)

  function showLeaderboard() {
    setScreen("leaderboard")
  }

  const move = (direction: Direction) => () => {
    if (player.hasCompleted || animating) return

    function playerAnimating() {
      updateAnimating(true)
      setTimeout(() => updateAnimating(false), 500)
    }

    startTimer()

    const newPlayer = { ...player }

    switch (direction) {
      case "up":
        newPlayer.y = player.y - 1
        break
      case "right":
        newPlayer.x = player.x + 1
        break
      case "down":
        newPlayer.y = player.y + 1
        break
      case "left":
        newPlayer.x = player.x - 1
        break
      default:
    }

    if (
      !maze.tiles[newPlayer.y] ||
      !maze.tiles[newPlayer.y][newPlayer.x] ||
      !maze.traversableTiles.includes(maze.tiles[newPlayer.y][newPlayer.x].type)
    ) {
      footstepAudio?.play()
      setPlayer({ ...player, direction })

      return
    }

    if (
      newPlayer.x == maze.coffeeMachine.x &&
      newPlayer.y == maze.coffeeMachine.y
    ) {
      coffeeMachineAudio?.play()
      setScreen("coffee-machine")
      newPlayer.hasCoffee = true
      setPlayer({ ...newPlayer, direction: "down" })
      playerAnimating()

      return
    }

    if (
      player.hasCoffee &&
      newPlayer.x == maze.checkout.x &&
      newPlayer.y == maze.checkout.y
    ) {
      coffeeMachineAudio?.load()
      coffeeMachineAudio?.play()
      setScreen("checkout")
      setPlayer({ ...newPlayer, direction })
      playerAnimating()

      return
    }

    if (
      player.hasCoffee &&
      newPlayer.x === maze.exit.x &&
      newPlayer.y === maze.exit.y
    ) {
      newPlayer.hasCompleted = true
      stopTimer()
      showLeaderboard()
    }

    playerAnimating()

    footstepAudio?.play()
    setPlayer({ ...newPlayer, direction })
  }

  useEffect(() => {
    if (!player.hasCompleted) return
  }, [player])

  function resetGame() {
    endThemeAudio?.pause()
    setPlayer({
      ...player,
      x: maze.entrance.x,
      y: maze.entrance.y,
      direction: "up",
      hasCompleted: false,
    })

    setTimer({
      startTime: null,
      endTime: null,
    })

    setScreen("start-game")
  }

  return (
    <div>
      <TimerProvider value={{ ...timer, startTimer, stopTimer, timeElapsed }}>
        <PlayerProvider value={{ ...player, move, setName }}>
          {screen === "start-game" && (
            <StartGameScreen
              createPlayer={createPlayer}
              showLeaderboard={showLeaderboard}
            />
          )}

          {screen === "game" && <GameScreen />}

          {screen === "coffee-machine" && (
            <CoffeeMachineScreen
              updateDrink={updateDrink}
              onComplete={() => setScreen("game")}
            />
          )}

          {screen === "checkout" && drink && (
            <CheckoutScreen drink={drink} onPaid={() => setScreen("game")} />
          )}

          {screen === "leaderboard" && (
            <LeaderboardScreen latestTime={latestTime} exit={resetGame} />
          )}
        </PlayerProvider>
      </TimerProvider>
    </div>
  )
}

export default Game
