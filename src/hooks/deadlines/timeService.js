
class TimeService {

    constructor(setGameTime, 
        setGameCurrentMinutes, setGameCurrentSeconds,
        setIsTimeUp, chosenDifficultyTime, outComeFunc) {
        this.currentMinutes = 0
        this.currentSeconds = 0
        this.setGameTime = setGameTime
        this.setGameCurrentMinutes = setGameCurrentMinutes
        this.setGameCurrentSeconds = setGameCurrentSeconds
        this.setIsTimeUp = setIsTimeUp
        this.chosenDifficultyTime = chosenDifficultyTime
        this.outComeFunc = outComeFunc
    }

    sendOutCome = (func) => {this.outComeFunc("timeup")}

    startTimer = (duration, isOpponentTime) => {
        this.pauseTime()

        let start = Date.now(), diff, minutes, seconds;

        const timer = () => {
        // GET THE NUMBER OF SECONDS THAT HAVE ELAPSED SINCE
        // startTimer() WAS CALLED.
            diff = duration - (((Date.now() - start) / 1000) | 0);

        // MAKE THE TIME WHOLE NUMBERS,
        // DOES THE SAME JOB AS parseInt TRUNCATES THE FLOAT
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

        // MODIFY THE LOOK IF LESS THAN 10
            minutes = minutes < 10 ? minutes : minutes;

        // PREFIX ZERO TO THE SECONDS IF IT IS LESS THAN 10
        // SO IT LOOKS LIKE A DOUBLE DIGIT NUMBER
            seconds = seconds < 10 ? '0' + seconds : seconds;

        // IF THE NO MORE TIME
            if(seconds <= 0 && minutes <= 0){
        // SEND THE OUTCOME
                this.isTimeUp = true
                this.setIsTimeUp(true)
                this.pauseTime()
                this.sendOutCome()
            }

        // INSERT THE TIME TO THE SPECIFIED TIME ELEMENT.
            this.setGameTime(minutes + ':' + seconds)
            this.setGameCurrentMinutes(minutes)
            this.setGameCurrentSeconds(seconds)

            if (diff <= 0) {
        // ADD ONE SECOND, SO THAT THE COUNT DOWN 
        // STARTS AT THE FULL DURATION ; example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        }
        // START THE TIMER IMMEDIATELY
        // DON'T WANT TO WAIT A FULL SECOND BEFORE THE TIMER STARTS
        timer();
        // GIVE THE TIMER AN INTERVAL AND AN INTERVAL NAME (myTimer) 
        // SO WE CAN CONTROL IT LATER.
        // if (isOpponentTime) {
        //     window.opponentTimer = setInterval(timer, 1000);  
        // }else {
            window.myTimer = setInterval(timer, 1000);
        // }
    }
    
    // Start Time
    initiateTimeCount = (time, isOpponentTime) => {
        let duration = 60 * time
        this.startTimer(duration, isOpponentTime ? isOpponentTime : false);
    }

    // Add Time
    addTime = (addedTime, currentGameMinutes, currentGameSeconds) => {
        this.pauseTime()
        let currentTime = (currentGameMinutes * 60) + (currentGameSeconds);
        let oldTime = currentTime / 60;
        this.initiateTimeCount(oldTime + addedTime);
    }
    
    // Reduce Time
    reduceTime = (reducedTime, currentGameMinutes, currentGameSeconds) => {
        this.pauseTime()
        let currentTime = (currentGameMinutes * 60) + (currentGameSeconds);
        let oldTime = currentTime / 60;
        if (oldTime > reducedTime) {
            this.initiateTimeCount(oldTime - reducedTime);
        }else{
            this.resumeTime()
        }
    }

    // Pause Time
    pauseTime = () => {
        if(window.myTimer) {
            clearInterval(window.myTimer);
            window.myTimer = null;
        }
    }

    // Resume Time
    resumeTime = (currentGameMinutes, currentGameSeconds) =>  {
        let currentTime = (currentGameMinutes * 60) + (currentGameSeconds);
        let newTime = currentTime / 60;
        this.initiateTimeCount(newTime);
    }

    // Reset Time
    resetTime = (resetTo) => {
        this.initiateTimeCount(resetTo ? resetTo : (this.chosenDifficultyTime ? this.chosenDifficultyTime : 0))
    }
}

export default TimeService 