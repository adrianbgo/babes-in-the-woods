import React from 'react'

interface IChatBox {
    name: string;
    content: any[];
}

const ChatBox: React.FC<IChatBox> = ({ name, content }) => {
    return (
        <div>{
            content.map((e, idx) => {
                return (
                    <div key={idx}>
                        <p>{e.name}: {e.msg}</p>
                    </div>
                )
            })
        }</div>
    )
}

export default ChatBox