

class MoveService {

    constructor(outComeFunc, chosenDifficulty) {
        this.chosenDifficulty = chosenDifficulty
        this.gameMove = null
        this.canReduceMove = null
        this.outComeFunc = outComeFunc

        // Pause Move Count
        this.pauseMoveTimeOut = null

        return this
    }

    sendOutCome = () => {this.outComeFunc("outofmove")}

    // THE MOVES CORE START
    // Initiate  Count
    initiateMoveCount = (initialMove) => {
        this.gameMove = initialMove
        this.canReduceMove = true
        return {gm: this.gameMove, crm : this.canReduceMove}
    }

    // Add Moves
    addMove = (moveAmount, currentGameMove) => {
        this.gameMove = currentGameMove
        this.gameMove = this.gameMove + moveAmount
        return {gm: this.gameMove}
    }

    // Decrease Moves
    reduceMove = (moveAmount, currentGameMove, canReduceMove) => {
        this.canReduceMove = canReduceMove
        this.gameMove = currentGameMove

        if (this.canReduceMove) {
            // If the last move is used and no more move(moves = 0)
            if (this.gameMove === 1) {
                this.gameMove = 0

                // Send the outcome
                // this.sendOutCome();

                return {gm: this.gameMove, crm: this.canReduceMove, outOfMove: true}
            
            }else if (this.gameMove > moveAmount) {
                this.gameMove = (this.gameMove - moveAmount)
                return {gm: this.gameMove, crm: this.canReduceMove}
            }
        }else {
            console.log("move countdown paused")
            return {gm: this.gameMove, crm: this.canReduceMove}
        }
    }


    pauseMove = (time, canReduceMove) => {

        this.canReduceMove = canReduceMove

        // Move reduction has been paused already,
        // and a resume time was passed before,
        // stop that resume time
        if (!this.canReduceMove) {
            if (this.pauseMoveTimeOut) {
                clearTimeout(this.pauseMoveTimeOut)
            }
        }

        // Then stop move reduction
        this.canReduceMove = false
        
        // If a resume time is specified,
        // after the passed time(seconds) enable move reduction 
        if (time) {
            this.pauseMoveTimeOut = setTimeout(() => {
                this.canReduceMove = true
                // this.setCanReduceMove(true)
                return {crm: this.canReduceMove}
            }, time);
        }
        else {
            return {crm: this.canReduceMove}
        }
    }

    // Resume Move Count
    resumeMove = () => {
        this.canReduceMove = true
        // this.setCanReduceMove(true)

        return {crm: this.canReduceMove}
    }
    
    // Reset Moves
    resetMove = (resetTo) => {
        return this.initiateMoveCount(resetTo ? resetTo : (this.chosenDifficulty.moves ? this.chosenDifficulty.moves : 0))
    }

}

export default MoveService 