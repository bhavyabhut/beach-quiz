import React from 'react'
type Props = {
    question:string,
    answer:string[],
    callback:any,
    userAnswer:string,
    questionNum:number,
    totalQuestions:number
}
const Question:React.FC<Props> = ({question,answer,callback,userAnswer,questionNum,totalQuestions})=>{
    return <h1>Question</h1>
}

export default  Question