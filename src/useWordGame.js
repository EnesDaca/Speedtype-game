import { useState, useRef, useEffect } from 'react'

function useWordGame(startingTime = 10){
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setisTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
  
  
    useEffect(() => {
      if (isTimeRunning === true && timeRemaining> 0){
        setTimeout(()=> {
          setTimeRemaining(time => time - 1)
        }, 1000)
      } else if (timeRemaining === 0){
         endGame()
      }
    }, [timeRemaining, isTimeRunning])
    
  
    function handleChange(e){
      const {value} = e.target
      setText(value)
    }
  
    function calculateWordCount(text){
      const wordsArr = text.trim().split(" ")
      return wordsArr.filter(word => word !== "").length
    }
  
    function startGame(){
      setisTimeRunning(true)
      setTimeRemaining(startingTime)
      setText("")
      textBoxRef.current.disabled = false
      textBoxRef.current.focus()
    }
  
    function endGame(){
      setisTimeRunning(false)
      const numWords = calculateWordCount(text)
      setWordCount(numWords)
    }

    return {handleChange, textBoxRef, text, isTimeRunning, timeRemaining, startGame, wordCount}
  
}

export default useWordGame