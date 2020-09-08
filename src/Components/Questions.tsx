import React from 'react'
import {AnswerObject} from '../App'
type Props = {
    question:string,
    answer:string[],
    callback:(e:React.MouseEvent<HTMLButtonElement>)=>void,
    userAnswer:AnswerObject|undefined,
    questionNum:number,
    totalQuestions:number
}
const Question:React.FC<Props> = ({question,answer,callback,userAnswer,questionNum,totalQuestions})=>{
    return (
        <div>
            <p className='number'>
                Questions: {questionNum}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answer.map(ans=>(
                    <div key={ans}>
                        <button disabled={!!userAnswer} value={ans} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:ans}}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default  Question