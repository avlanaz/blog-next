"use client"

import React from 'react'

const Carousel = (props) => {
  const [currIndex, setCurrIndex] = React.useState(0);

  const handleClickLeft = () => {
    const nextIndex = (currIndex-1+props.data.length) % props.data.length

    window.location.href = `#item-${nextIndex}`
    setCurrIndex(nextIndex)
  }

  const handleClickRight = () => {
    const nextIndex = (currIndex+1) % props.data.length

    window.location.href = `#item-${nextIndex}`
    setCurrIndex(nextIndex)
  }

  return (
    <div className='flex flex-col items-center relative'>
      <button 
        className='#LEFT_BUTTON rounded-full w-12 h-12 bg-slate-700/[0.6]
          absolute top-1/2 left-1/3 z-50'
        onClick={handleClickLeft}
      >&lt;</button>
      <button 
        className='#RIGHT_BUTTON rounded-full w-12 h-12 bg-slate-700/[0.6]
          absolute top-1/2 right-1/3 z-50'
        onClick={handleClickRight}
      >&gt;</button>
        <div className="#CAROUSEL-CONTAINER flex items-center gap-12 
        overflow-x-hidden p-6 w-80 max-w-screen-lg snap-x
        scroll-smooth">
          {props.data.map( (item, index) => (
            <div className='#CARD flex flex-col flex-shrink-0 
                bg-sky-500 w-60 h-60 rounded-md justify-center 
                items-center text-2xl snap-center
                transition ease-in-out duration-300 hover:scale-110'
                id={`item-${index}`}>
                {item}
            </div>
          ))}
        </div>
    </div>
  )
}

export default Carousel