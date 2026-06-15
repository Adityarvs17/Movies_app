export default function Title({text1,text2}){
    return (
        <h1 className="font-medium text-2xl text-left">  
            {text1} <span className="underline text-blue-500">{text2}</span>
        </h1>
    )
}