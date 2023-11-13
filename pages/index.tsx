import React, { useEffect, useRef, useState } from "react"
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client';

export default function Home() {
  // interface FormElements extends HTMLFormControlsCollection {
  //   name: HTMLInputElement;
  // }

  // interface NameFormElement extends HTMLFormElement {
  //   readonly elements: FormElements;
  // }

  // let socket: Socket = io();
  // const initialized = useRef(false);
  // const [names, setNames] = useState<string[]>([]);
  // const [name, setName] = useState<string>('');

  // const socketInitializer = async () => {
  //   await fetch('/api/socket');
  //   socket = io();

  //   socket.on('connect', () => {
  //     console.log('connected');
  //   })

  //   // socket.on('update-input', msg => {
  //   //   setInput(msg);
  //   // })
  // }

  // useEffect(() => {
  //   if (!initialized.current) {
  //     socketInitializer();
  //     initialized.current = true;
  //   }
  // }, [])

  // const onSubmitHandler = (e: React.FormEvent<NameFormElement>) => {
  //   setNames([...names, e.currentTarget.elements.name.value]);
  // }
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <button onClick={() => { }} className='p-3 bg-slate-500 rounded-md w-1/5 m-3 text-white hover:bg-slate-700'>Create New Room</button>
      <button onClick={() => { }} className='p-3 bg-slate-500 rounded-md w-1/5 m-3 text-white hover:bg-slate-700'>Join Room</button>
    </div>
  )
}
