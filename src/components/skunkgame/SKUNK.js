let rootDiv = null
let gameRoot = null

function setUpGame() {
  if (!rootDiv) {
    rootDiv = document.querySelector("#game")
  } else {
    rootDiv.innerHTML = ""
  }
  gameRoot = document.createElement("div")
  rootDiv.appendChild(gameRoot)

  new GameLibrary()
}
class GameLibrary {
  SKUNK_ID = 1
  TIC_TAC_TOE_ID = 2

  playerInput
  choosing
  gameRoot

  constructor() {
    console.log("Starting game!")
    this.playerInput = new Input()
    console.log("Input created")
    this.choosing = true

    this.introduction()
  }

  /**
   * Run the introduction to the Game Library to choose a game.
   */
  introduction() {
    console.log("running intro")
    Print.printNewLine("Welcome to Games World!")
    Print.printNewLine("What game would you like to play?")
    Print.printNewLine(this.SKUNK_ID + ". SKUNK")
    Print.printNewLine(this.TIC_TAC_TOE_ID + ". Tic Tac Toe")

    this.playerInput.createInput(
      "Enter your choice: (" + Controls.QUIT + " to quit) ",
      this.executeChoice.bind(this)
    )
  }

  executeChoice() {
    if (this.playerInput.hasNextInt()) {
      let input = this.playerInput.getIntInput()

      if (input === this.SKUNK_ID) {
        this.playerInput.removeListener(this.executeChoice)
        new SkunkConfig().startSkunk(this.playerInput)
      } else if (input === this.TIC_TAC_TOE_ID) {
        Print.printNewLine("Uh oh! Tic Tac Toe isn't finished yet!")
        this.playerInput.clearInput()
      } else {
        Print.printNewLine("Hmm... doesn't seem to be an option. Try again!")
        this.playerInput.clearInput()
      }
    } else {
      let input = this.playerInput.getStringInput()

      if (input === Controls.QUIT) {
        Print.printNewLine("Goodbye")
        setTimeout(() => {
          Print.clearLines()
        }, 1000)
      } else {
        Print.printNewLine(
          "Hmm..." + input + " is not a valid option. Try again!"
        )
        this.playerInput.clearInput()
      }
    }
  }
}

class Print {
  static printNewLine(line, html = false) {
    const fragment = document.createDocumentFragment()
    const newLine = document.createElement("p")
    if (html) {
      newLine.innerHTML = line
    } else {
      newLine.textContent = line
    }
    fragment.appendChild(newLine)
    gameRoot.appendChild(newLine)

    return newLine
  }

  static addToLine(line, textToAdd) {
    let node = this.getLine(line)
    node.textContent += textToAdd
  }

  static addToNode(node, textToAdd) {
    node.textContent += textToAdd
  }

  static clearLines() {
    gameRoot.innerHTML = ""
  }

  static getLine(search) {
    let nodes = document.evaluate(
      "//p[contains(.,'" + search + "')]",
      gameRoot,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    return nodes.iterateNext()
  }

  static clearLine(search) {
    let node = this.getLine(search)

    gameRoot.removeChild(node)
  }

  static clearNode(node) {
    gameRoot.removeChild(node)
  }
}

class Game {
  players
  playing

  constructor() {
    this.playing = true
    this.players = []
  }

  setPlaying(playing) {
    this.playing = playing
  }

  isPlaying() {
    return this.playing
  }

  addPlayer(player) {
    this.players.push(player)
  }

  setPlayers(players) {
    if (typeof players === "object") {
      this.players = players
    }
  }

  getPlayers() {
    return this.players
  }

  displayAllScores() {
    Print.printNewLine("Scores <br /> -------")

    for (let player in this.players) {
      Print.printNewLine(player.getName() + ": " + player.getScore())
    }
  }

  getPlayerByName(name) {
    if (!name) {
      throw new Error("Invalid name")
    }

    let foundPlayer = null

    this.players.map(player => {
      if (player.getName().toLowerCase() === name.toLowerCase()) {
        foundPlayer = player
      }
      return player
    })

    return foundPlayer
  }
}

class Player {
  score
  computer
  name

  constructor(name, startingScore, computer) {
    this.score = new Score(startingScore)
    this.name = name
    this.computer = computer
  }

  isComputer() {
    return this.computer
  }

  getScore() {
    return this.score
  }

  getScoreValue() {
    return this.score.getScore()
  }

  getName() {
    return this.name
  }

  setName(name) {
    this.name = name
  }
}

class Score {
  score

  constructor(startingScore) {
    this.checkScore(startingScore)
    this.score = startingScore
  }

  incrementScore(scoreToAdd) {
    if (scoreToAdd < 0) {
      throw new Error("Score " + scoreToAdd + " is invalid for this method.")
    }

    let newScore = this.score + scoreToAdd

    this.setScore(newScore)
  }

  decrementScore(scoreToSubtract) {
    if (scoreToSubtract < 0) {
      throw new Error(
        "Score " + scoreToSubtract + " is invalid for this method."
      )
    }

    let newScore = this.score - scoreToSubtract

    console.log(newScore, this.score, scoreToSubtract)

    this.setScore(newScore)
  }

  getScore() {
    return this.score
  }

  setScore(score) {
    this.checkScore(score)

    this.score = score
  }

  checkScore(startingScore) {
    if (startingScore < 0) {
      throw new Error("Score cannot start below 0")
    }
  }
}

const Controls = {
  DISPLAY_BOARD: "B",
  DISPLAY_CONTROLS: "C",
  USE_DEFAULT: "D",
  YES: "Y",
  NO: "N",
  QUIT: "Q",
  DISPLAY_RULES: "R",
  DISPLAY_SCORES: "S",
}

class SkunkControls {
  runOtherControls(input, board, players) {
    if (null == input) {
      Print.printNewLine("Hmmm... input can't be null")
    }

    if (input === Controls.DISPLAY_BOARD) {
      board.drawBoard()
    } else if (input === Controls.DISPLAY_CONTROLS) {
      this.listControls()
    } else if (input === Controls.DISPLAY_SCORES) {
      for (let player in players) {
        Print.printNewLine(player.getName() + ": " + player.getScoreValue())
      }
    } else if (input === Controls.DISPLAY_RULES) {
      this.listRules(2)
    } else if (input === Controls.QUIT) {
      Print.printNewLine("Goodbye")
    } else {
      Print.printNewLine("Hmmm... " + input + " doesn't work here...")
    }
  }

  listControls() {
    Print.printNewLine("Display Board: " + Controls.DISPLAY_BOARD)
    Print.printNewLine("Display Controls: " + Controls.DISPLAY_CONTROLS)
    Print.printNewLine("Display Scores: " + Controls.DISPLAY_SCORES)
    Print.printNewLine("Display Rules: " + Controls.DISPLAY_RULES)
    Print.printNewLine("Answer Yes: " + Controls.YES)
    Print.printNewLine("Answer No: " + Controls.NO)
    Print.printNewLine("Quit: " + Controls.QUIT)
    Print.printNewLine()
  }

  listRules(numberOfDice) {
    Print.printNewLine(
      "There are " +
        Skunk.ROUNDS +
        " rounds in the game. One round corresponds with each letter of the word SKUNK."
    )
    Print.printNewLine(
      "Players start the game standing up. " +
        numberOfDice +
        " dice are rolled."
    )
    Print.printNewLine(
      "The players have a choice before each roll whether to remain standing or whether to sit down."
    )
    Print.printNewLine(
      "If a player is standing when a roll that does NOT contain a " +
        Skunk.SKUNK_ROLL +
        " is rolled, they get those points."
    )
    Print.printNewLine(
      "If all players are standing when a " +
        Skunk.SKUNK_ROLL +
        " is rolled, the roll does not count."
    )
    Print.printNewLine(
      "If a player sits down, they get to keep their total points from that round."
    )
    Print.printNewLine(
      "If a player is standing when a " +
        Skunk.SKUNK_ROLL +
        " is rolled, they lose ALL their points for that round."
    )
    Print.printNewLine(
      "If a player is standing when two " +
        Skunk.SKUNK_ROLL +
        "s (snake eyes) are rolled, they lose ALL their points from ALL rounds!"
    )
    Print.printNewLine(
      "Each round ends when a " +
        Skunk.SKUNK_ROLL +
        " is rolled or when all players are sitting."
    )
    Print.printNewLine()
  }
}

class RandomGenerator {
  value
  min
  max

  constructor(min, max) {
    this.min = min
    this.max = max
  }

  getNewRandom() {
    return Math.round(Math.random() * (this.max - this.min) + this.min)
  }

  getNewSmallRandom() {
    return Math.random()
  }
}

class Input {
  textbox
  input
  button
  hasInput

  constructor() {
    this.textbox = null
    this.button = null
    this.input = ""
    this.hasInput = false
  }

  createInput(message, callback) {
    Print.printNewLine(message)
    this.textbox = document.createElement("input")
    gameRoot.appendChild(this.textbox)
    this.button = document.createElement("button")
    this.button.textContent = "Go"
    this.button.addEventListener("click", () => {
      this.input = this.textbox.value
      callback()
    })
    gameRoot.appendChild(this.button)
    return true
  }

  hasNext() {
    return this.input !== null || this.input !== undefined
  }

  hasNextInt() {
    let unparsed = this.input
    return !isNaN(parseInt(unparsed))
  }

  getIntInput() {
    return parseInt(this.input)
  }

  getStringInput() {
    return this.input
  }

  clearInput() {
    this.hasInput = false
    this.textbox.value = ""
    this.input = ""
  }

  removeListener(callback) {
    this.button.removeEventListener("click", () => {
      this.input = this.textbox.value
      callback()
    })
  }

  removeInput() {
    Print.clearNode(this.textbox)
    Print.clearNode(this.button)
  }
}

const SkunkConstants = {
  MIN_DICE: 2,
  MAX_DICE: 3,
  MIN_DIE_VALUE: 1,
  MAX_DIE_VALUE: 6,
  MIN_COMPUTER_PLAYERS: 1,
  MAX_COMPUTER_PLAYERS: 3,
  COMPUTER_PLAYERS: 1,
  SKUNK_ROLL: 1,
  ROUNDS: 5,
  INITIAL_ROUND_VALUE: 0,
  INITIAL_SCORE_VALUE: 0,
  TRIPLE_SCORE: 100,
  ONE_SKUNK_ODDS: 0.167,
  DOUBLE_SKUNK_ODDS: 0.03125,
}

class Skunk extends Game {
  static get MIN_DICE() {
    return SkunkConstants.MIN_DICE
  }
  static get MAX_DICE() {
    return SkunkConstants.MAX_DICE
  }
  static get MIN_DIE_VALUE() {
    return SkunkConstants.MIN_DIE_VALUE
  }
  static get MAX_DIE_VALUE() {
    return SkunkConstants.MAX_DIE_VALUE
  }
  static get MIN_COMPUTER_PLAYERS() {
    return SkunkConstants.MIN_COMPUTER_PLAYERS
  }
  static get MAX_COMPUTER_PLAYERS() {
    return SkunkConstants.MAX_COMPUTER_PLAYERS
  }
  static get COMPUTER_PLAYERS() {
    return SkunkConstants.COMPUTER_PLAYERS
  }
  static get SKUNK_ROLL() {
    return SkunkConstants.SKUNK_ROLL
  }
  static get ROUNDS() {
    return SkunkConstants.ROUNDS
  }
  static get INITIAL_ROUND_VALUE() {
    return SkunkConstants.INITIAL_ROUND_VALUE
  }
  static get INITIAL_SCORE_VALUE() {
    return SkunkConstants.INITIAL_SCORE_VALUE
  }
  static get TRIPLE_SCORE() {
    return SkunkConstants.TRIPLE_SCORE
  }
  static get ONE_SKUNK_ODDS() {
    return SkunkConstants.ONE_SKUNK_ODDS
  }
  static get DOUBLE_SKUNK_ODDS() {
    return SkunkConstants.DOUBLE_SKUNK_ODDS
  }

  numberOfDice
  numberOfComputerPlayers
  die
  currentRound
  playerInput
  currentRolls
  board
  controls
  playerName
  roundScore

  constructor(numberofDice, numberOfComputerPlayers, playerInput, playerName) {
    super()

    if (!playerInput) {
      throw new Error("Invalid input")
    }
    if (
      numberofDice < SkunkConstants.MIN_DICE ||
      numberofDice > SkunkConstants.MAX_DICE
    ) {
      throw new Error("Invalid number of dice")
    }

    if (
      numberOfComputerPlayers < SkunkConstants.MIN_COMPUTER_PLAYERS ||
      numberOfComputerPlayers > SkunkConstants.MAX_COMPUTER_PLAYERS
    ) {
      throw new Error("Invalid number of computer players")
    }

    this.numberOfDice = numberofDice
    this.numberOfComputerPlayers = numberOfComputerPlayers
    this.playerInput = playerInput
    this.playerName = playerName
    this.roundScore = 0

    this.setPlayers([])

    this.addPlayer(
      new SkunkPlayer(
        this.playerName,
        SkunkConstants.INITIAL_SCORE_VALUE,
        false
      )
    )

    for (let i = 0; i < numberOfComputerPlayers; i++) {
      let computer = true

      this.addPlayer(
        new SkunkPlayer(
          "Computer " + i,
          SkunkConstants.INITIAL_SCORE_VALUE,
          computer
        )
      )
    }

    this.board = this.createSkunkBoard()
    this.die = new RandomGenerator(
      SkunkConstants.MIN_DIE_VALUE,
      SkunkConstants.MAX_DIE_VALUE
    )
    this.controls = new SkunkControls()
    this.currentRound = SkunkConstants.INITIAL_ROUND_VALUE
    this.currentRolls = []

    this.setPlaying(true)
  }

  startGame() {
    Print.printNewLine("Welcome to SKUNK!")

    this.playSkunkRound(true)
  }

  endGame() {
    let winningPlayer = this.getWinningPlayer()

    Print.clearLines()

    Print.printNewLine("==================")

    if (winningPlayer.getName() === this.playerName) {
      Print.printNewLine("|   YOU WIN!!!!  |")
    } else {
      Print.printNewLine("|   You lost...  |")
    }

    Print.printNewLine("==================")

    Print.printNewLine()

    this.playerInput.createInput(
      "Play again with the same dice and players? (" +
        Controls.YES +
        " / " +
        Controls.NO +
        " / " +
        Controls.DISPLAY_CONTROLS +
        " for controls): ",
      handlePlayAgain.bind(this)
    )

    function handlePlayAgain() {
      if (this.playerInput.hasNext()) {
        let input = this.playerInput.getStringInput()

        if (input === Controls.YES) {
          this.getPlayers().map(player => {
            player.getScore().setScore(this.INITIAL_SCORE_VALUE)
          })

          this.currentRound = this.INITIAL_ROUND_VALUE
          this.board = this.createSkunkBoard()
        } else if (input === Controls.NO) {
          this.setPlaying(false)
        } else {
          this.controls.runOtherControls(input, this.board, this.getPlayers())
        }
      }
    }
  }

  getWinningPlayer() {
    let winningPlayer = null

    for (let player in this.getPlayers()) {
      if (null === winningPlayer) {
        winningPlayer = player
      } else {
        if (player.getScoreValue() > winningPlayer.getScoreValue()) {
          winningPlayer = player
        }
      }
    }

    return winningPlayer
  }

  async playSkunkRound(newRound) {
    let playingRound = true

    if (this.areAllPlayersSitting() && newRound) {
      this.roundScore = 0
      this.currentRound++
      this.resetPlayers()
    }

    this.playerInput.removeListener()
    this.playerInput.clearInput()
    Print.clearLines()

    Print.printNewLine("================")
    Print.printNewLine(
      (newRound ? "Starting" : "Continuing") +
        " round " +
        (this.currentRound + 1)
    )
    Print.printNewLine("================")

    await this.roll()

    let numberOfSkunkRolls = this.checkSkunkRolls()
    let score = this.getCurrentRollScore()
    let triple = this.checkTriple()

    if (numberOfSkunkRolls > 0) {
      if (!this.areAllPlayersStanding()) {
        playingRound = false

        if (
          numberOfSkunkRolls === this.numberOfDice ||
          (this.numberOfDice === SkunkConstants.MAX_DICE &&
            numberOfSkunkRolls === this.numberOfDice - 1)
        ) {
          console.log("Skunk game")
          this.skunkPlayersGame()
        } else {
          console.log("Skunk round")
          this.skunkPlayersRound(this.roundScore)
        }
      }
    } else {
      if (this.numberOfDice === this.MAX_DICE && triple) {
        score = this.TRIPLE_SCORE
      }

      this.scorePlayers(score)
      this.roundScore += score
    }

    this.updateBoard(this.roundScore)
    this.board.drawBoard()

    if (playingRound) {
      this.runChoices()
      newRound = false
    } else {
      newRound = true
      if (this.currentRound === SkunkConstants.ROUNDS) {
        this.endGame()
        return
      }
      this.playSkunkRound(newRound)
    }
  }

  runChoices() {
    let player = this.getPlayerByName(this.playerName)
    let playerScore = player.getScoreValue()
    let playerSitting = !player.isStanding()

    this.getPlayers().map(player => {
      if (player instanceof SkunkPlayer) {
        let skunkPlayer = player
        let standing = skunkPlayer.isStanding()

        if (standing) {
          if (player.isComputer()) {
            skunkPlayer.computerChoice(
              this.currentRound,
              playerScore,
              this.numberOfDice,
              playerSitting,
              this
            )
          } else {
            this.playerChoice()
          }
        }
      }
      return player
    })
  }

  async roll() {
    for (let i = 0; i < this.numberOfDice; i++) {
      let node = Print.printNewLine("Rolling")

      for (let j = 0; j < 3; j++) {
        await this.sleep(500)

        Print.addToNode(node, ".")
      }

      this.currentRolls[i] = this.die.getNewRandom()
      Print.printNewLine("DIE #" + (i + 1) + ": " + this.currentRolls[i] + " ")
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getCurrentRollScore() {
    let score = 0

    for (let i = 0; i < this.numberOfDice; i++) {
      score += this.currentRolls[i]
    }

    return score
  }

  checkSkunkRolls() {
    let numberOfSkunkRolls = 0

    for (let i = 0; i < this.currentRolls.length; i++) {
      if (this.currentRolls[i] === SkunkConstants.SKUNK_ROLL) {
        numberOfSkunkRolls++
      }
    }

    return numberOfSkunkRolls
  }

  checkTriple() {
    let triple = true
    let first = this.currentRolls[0]

    for (let i = 0; i < this.currentRolls.length; i++) {
      if (first !== this.currentRolls[i]) {
        triple = false
      }
    }

    return triple
  }

  areAllPlayersStanding() {
    let allStanding = true

    this.getPlayers().map(player => {
      if (player instanceof SkunkPlayer) {
        let skunkPlayer = player

        if (!skunkPlayer.isStanding()) {
          allStanding = false
        }
      }
      return player
    })

    return allStanding
  }

  areAllPlayersSitting() {
    let allSitting = true

    this.getPlayers().map(player => {
      if (player.isStanding()) {
        allSitting = false
      }
      return player
    })

    return allSitting
  }

  scorePlayers(score) {
    this.getPlayers().map(player => {
      if (player instanceof SkunkPlayer) {
        let skunkPlayer = player

        if (skunkPlayer.isStanding()) {
          skunkPlayer.getScore().incrementScore(score)
          skunkPlayer.getRoundScore().incrementScore(score)
        }
      }
      return player
    })
  }

  skunkPlayersRound(roundScore) {
    this.getPlayers().map(player => {
      if (player.isStanding()) {
        let score = player.getScore()
        score.decrementScore(roundScore)
        let rs = player.getRoundScore()
        rs.decrementScore(roundScore)
        player.setStanding(false)
      }

      return player
    })
  }

  skunkPlayersGame() {
    this.getPlayers().map(player => {
      if (player.isStanding()) {
        player.getScore().setScore(0)
        player.getRoundScore().setScore(0)
      }

      return player
    })
  }

  resetPlayers() {
    this.getPlayers().map(player => {
      if (player instanceof SkunkPlayer) {
        let skunkPlayer = player

        skunkPlayer.setStanding(true)
        skunkPlayer.setRoundScore(0)
      }
      return player
    })
  }

  playerChoice() {
    let player = this.getPlayerByName(this.playerName)

    player.checkPlayerStandChoice(
      this.playerInput,
      this.board,
      this.getPlayers(),
      this.controls,
      this
    )
  }

  createSkunkBoard() {
    let numberOfRows = this.getPlayers().length + 1

    let board = new Board(numberOfRows, 5)

    board.setPosition(0, 0, "S")
    board.setPosition(0, 1, "K")
    board.setPosition(0, 2, "U")
    board.setPosition(0, 3, "N")
    board.setPosition(0, 4, "K")

    return board
  }

  updateBoard(roundScore) {
    let rowString = ""
    let scoreString = ""

    this.getPlayers().map((player, index) => {
      if (null == player) {
        throw new Error("Player cannot be null")
      }

      if (player instanceof SkunkPlayer) {
        console.log(player.getName() + "is skunk player")
        let skunkPlayer = player
        scoreString = "(+" + skunkPlayer.getRoundScoreValue() + ")"

        rowString =
          player.getName() + ": " + player.getScoreValue() + " " + scoreString

        this.board.setPosition(index + 1, this.currentRound, rowString)
      }

      return player
    })
  }
}

class Board {
  COLUMN_DIVIDER = " | "
  ROW_DIVIDER = "-"
  EXTRA_SPACE = 1

  columns
  rows
  board

  constructor(rows, columns) {
    if (columns < 0) {
      throw new Error("Invalid columns")
    }
    if (rows < 0) {
      throw new Error("Invalid rows")
    }

    this.board = []

    for (let i = 0; i < rows; i++) {
      let newArr = []
      for (let y = 0; y < columns; y++) {
        newArr.push("")
      }
      this.board.push(newArr)
    }

    this.columns = columns
    this.rows = rows

    this.setAllEmpty()
  }

  drawBoard() {
    const longestRow =
      this.getLengthOfRows() +
      this.columns * this.COLUMN_DIVIDER.length -
      this.EXTRA_SPACE
    const spacer = Array(longestRow).join(this.ROW_DIVIDER)

    for (let i = 0; i < this.rows; i++) {
      // For each row, append a spacer
      Print.printNewLine(spacer)

      this.drawColumns(i)
    }
  }

  drawColumns(rowIndex) {
    let columnString = ""
    for (let i = 0; i < this.columns; i++) {
      let longest = this.getLongestForColumn(i)
      let current = this.board[rowIndex][i]

      if (current === null) {
        let divider = Array(longest).join("") + this.COLUMN_DIVIDER
        columnString += divider

        this.checkFinalRow(i)

        continue
      }

      let length = current.length
      let difference = longest - length

      if (length === longest) {
        columnString += current + this.COLUMN_DIVIDER
      } else {
        const lineText =
          current + (Array(difference).join(" ") + this.COLUMN_DIVIDER)
        columnString += lineText
      }
      this.checkFinalRow(i)
    }
    Print.printNewLine(columnString)
  }

  checkFinalRow(i) {
    if (i === this.columns - 1) {
      Print.printNewLine("")
    }
  }

  getLongestForColumn(columnIndex) {
    if (
      this.board[0][columnIndex] === null ||
      this.board[0][columnIndex] === undefined
    ) {
      throw new Error("Column is null")
    }

    let longest = this.board[0][columnIndex]

    for (let i = 0; i < this.rows; i++) {
      if (null == this.board[i][columnIndex]) {
        continue
      }

      let current = this.board[i][columnIndex]

      if (current.length > longest.length) {
        longest = current
      }
    }

    return longest.length
  }

  getLengthOfRows() {
    let lengthOfRows = 0

    for (let colIndex = 0; colIndex < this.columns; colIndex++) {
      let longestInCol = 0

      for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
        let current = this.board[rowIndex][colIndex]

        if (null == current) {
          continue
        }

        if (current.length > longestInCol) {
          longestInCol = current.length
        }
      }

      lengthOfRows += longestInCol
    }

    return lengthOfRows
  }

  setPosition(row, column, data) {
    this.checkBounds(column, row)

    if (!data) {
      throw new Error("Can't store null at position" + column + " , " + row)
    }

    this.board[row][column] = data
  }

  getPosition(column, row) {
    this.checkBounds(column, row)

    return this.board[row][column]
  }

  getRows() {
    return this.rows
  }

  getColumns() {
    return this.columns
  }

  setAllEmpty() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.board[row][column] = ""
      }
    }
  }

  checkBounds(column, row) {
    if (column < 0 || column > this.columns) {
      throw new Error("Column " + column + " doesn't exist.")
    }

    if (row < 0 || row > this.rows) {
      throw new Error("Row " + row + " doesn't exist.")
    }
  }
}

class SkunkPlayer extends Player {
  POINT_GAP_DIVISOR = 100
  COMPUTER_SIT_THRESHOLD = 1

  COMPUTER_TIE_VALUE = 0.3
  COMPUTER_WINNING_VALUE = 0.6

  ONE_SKUNK_ODDS = 0.167
  DOUBLE_SKUNK_ODDS = 0.03125
  TRIPLE_ODDS = 0.0278

  standing
  roundScore
  playerInput

  /**
   * Create a player for the game of SKUNK and set up a new
   * Score to track the player's round score
   * @param name          - the name or identifier of the player
   * @param startingScore - the starting score of the player
   * @param computer      - is the player playable or computer controlled
   */
  constructor(name, startingScore, computer) {
    super(name, startingScore, computer)

    this.standing = true

    this.roundScore = new Score(0)
  }

  /**
   * Set the round score value for this player
   * @param score - the value of the round score for this player
   */
  setRoundScore(score) {
    this.roundScore.setScore(score)
  }

  /**
   * Get the Score object for the round score
   * @return the Score object for the round score
   */
  getRoundScore() {
    return this.roundScore
  }

  /**
   * Get the value of the round Score object
   * @return the value of the round Score object
   */
  getRoundScoreValue() {
    return this.roundScore.getScore()
  }

  /**
   * Set whether the player is standing or sitting
   * @param standing - if the player is standing
   */
  setStanding(standing) {
    this.standing = standing
  }

  /**
   * Get whether the player is sitting or standing
   * @return true if the player is standing
   */
  isStanding() {
    return this.standing
  }

  /**
   * Check whether the player would like to sit or stand
   * @param playerInput - the player input object
   * @return true if the player would like to remain standing
   */
  checkPlayerStandChoice(playerInput, board, players, controls, game) {
    this.playerInput = playerInput

    this.playerInput.createInput(
      "Would you like to sit? (" +
        Controls.YES +
        " / " +
        Controls.NO +
        " / " +
        Controls.DISPLAY_CONTROLS +
        " for controls) ",
      handleSit.bind(this)
    )

    function handleSit() {
      if (this.playerInput.hasNext()) {
        let input = this.playerInput.getStringInput()

        if (input === Controls.YES) {
          this.setStanding(false)
          game.playSkunkRound(game.areAllPlayersSitting())
        } else if (input === Controls.NO) {
          Print.clearLines()
          game.playSkunkRound(game.areAllPlayersSitting())
        } else {
          controls.runOtherControls(input, board, players)
          this.playerInput.clearInput()
        }
      }
    }
  }

  /**
   * Make a sitting or standing choice for a computer player
   * @param currentRound - the current round of the game
   * @param playerScore  - the score of the playable player
   * @param numberOfDice - the number of dice the game is played with
   */
  computerChoice(currentRound, playerScore, numberOfDice, playerSitting, game) {
    let r = new RandomGenerator(0, 1)

    let threshold = this.COMPUTER_SIT_THRESHOLD
    let decision = this.ONE_SKUNK_ODDS + this.DOUBLE_SKUNK_ODDS
    let computerScore = this.getScoreValue()
    let pointGap = 0
    let message = ""

    if (numberOfDice === Skunk.MAX_DICE) {
      decision -= this.TRIPLE_ODDS
    }

    if (computerScore > playerScore) {
      if (currentRound === Skunk.ROUNDS) {
        decision += this.COMPUTER_SIT_THRESHOLD
      } else {
        decision += this.COMPUTER_WINNING_VALUE
      }
    } else if (computerScore === playerScore) {
      decision += this.COMPUTER_TIE_VALUE
    } else {
      pointGap = playerScore - computerScore

      decision -= pointGap / this.POINT_GAP_DIVISOR
    }

    let random = r.getNewSmallRandom()
    decision += random

    // For debugging:
    //System.out.println("Computer decision..." + decision + ". Random was " + random);

    if (decision > threshold) {
      this.setStanding(false)

      message = "sit"
    } else {
      message = "stay standing"
    }

    Print.printNewLine(this.getName() + " has chosen to " + message)

    if (game.areAllPlayersSitting()) {
      game.playSkunkRound(true)
    } else if (playerSitting) {
      game.playSkunkRound(false)
    }
  }
}

class SkunkConfig {
  PLAYER_NAME_MAX_LENGTH = 12
  PLAYER_DEFAULT_NAME = "Player"

  numberOfDice
  numberOfComputerPlayers
  playerInput
  playerName

  /**
   * Start the config for a game of SKUNK
   * @param playerInput - the player input object
   * @return true if the game is still running
   */
  startSkunk(playerInput) {
    this.playerInput = playerInput

    Print.clearLines()
    Print.printNewLine("You chose SKUNK!")
    Print.printNewLine("Let's get you set up")

    this.setUpNumberOfDice()
  }

  /**
   * Get a number of dice from the player
   */
  setUpNumberOfDice() {
    this.playerInput.createInput(
      "Choose a number of dice (" +
        Skunk.MIN_DICE +
        " or " +
        Skunk.MAX_DICE +
        "): ",
      handleDiceSetup.bind(this)
    )

    function handleDiceSetup() {
      if (this.playerInput.hasNextInt()) {
        let input = this.playerInput.getIntInput()

        if (input === Skunk.MIN_DICE || input === Skunk.MAX_DICE) {
          this.numberOfDice = input
          this.playerInput.removeListener()
          this.playerInput.removeInput()
          Print.clearLine("Choose a number of dice")
          this.setUpNumberOfComputerPlayers()
        } else {
          Print.printNewLine("Hmmm..." + input + " isn't an option.")
          this.playerInput.clearInput()
        }
      }
    }
  }

  /**
   * Get a number of computer players from the player
   */
  setUpNumberOfComputerPlayers() {
    this.playerInput.createInput(
      "Choose a number of computer players (" +
        Skunk.MIN_COMPUTER_PLAYERS +
        " or " +
        Skunk.MAX_COMPUTER_PLAYERS +
        "): ",
      handlePlayerSetup.bind(this)
    )

    function handlePlayerSetup() {
      if (this.playerInput.hasNextInt()) {
        let input = this.playerInput.getIntInput()

        if (
          input >= Skunk.MIN_COMPUTER_PLAYERS &&
          input <= Skunk.MAX_COMPUTER_PLAYERS
        ) {
          this.numberOfComputerPlayers = input
          this.playerInput.removeListener()
          this.playerInput.removeInput()
          Print.clearLine("Choose a number of computer players")
          this.setUpPlayerName()
        } else {
          Print.printNewLine("Hmmm..." + input + " isn't an option.")
          this.playerInput.clearInput()
        }
      }
    }
  }

  /**
   * Get a name from the player
   */
  setUpPlayerName() {
    this.playerInput.createInput(
      "What's your name? (" +
        "Enter " +
        Controls.USE_DEFAULT +
        " for default name): ",
      handlePlayerNameSetup.bind(this)
    )

    function handlePlayerNameSetup() {
      if (this.playerInput.hasNext()) {
        let input = this.playerInput.getStringInput()

        if (input === Controls.USE_DEFAULT) {
          this.playerName = this.PLAYER_DEFAULT_NAME
          this.startGame()
        } else if (input.length <= this.PLAYER_NAME_MAX_LENGTH) {
          this.playerName = input
          this.startGame()
        } else {
          Print.printNewLine("Hmmm..." + input + " is too long.")
          this.playerInput.clearInput()
        }
      }
    }
  }

  startGame() {
    this.playerInput.removeListener()
    Print.clearLines()

    let skunk = new Skunk(
      this.numberOfDice,
      this.numberOfComputerPlayers,
      this.playerInput,
      this.playerName
    )

    skunk.startGame()
  }
}

export { setUpGame }
