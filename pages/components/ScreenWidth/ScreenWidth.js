import styles from "./ScreenWidth.module.css"
import { useState, useEffect, useCallback } from "react"
import { throttle } from "throttle-debounce"
import { console } from "next/dist/compiled/@edge-runtime/primitives/console"

const ScreenWidth = (callback, deps) => {
  const [ width, setWidth ] = useState(0)
  const [ showComponent, setShowComponent ] = useState(true)

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  const throttleHandleResize = throttle(500, handleResize)

  const onLoadHandler = () => {
    window.addEventListener("resize", throttleHandleResize)
    console.log("Resize")
  }

  const onUnloadHandler = useCallback(() => {
    window.removeEventListener("resize", throttleHandleResize)
    console.log("RemoveResize")
  })

  const clearWidth = () => {
    setWidth(width => {
      return 0
    })
  }

  const handleClick = () => {
    setShowComponent(false)
    clearWidth()
    onUnloadHandler()
    console.log("If you see this message, it means the component has been removed")
  }

  useEffect(handleResize, [])

  useEffect(() => {
    console.log("useEffect")
    onLoadHandler()
    return onUnloadHandler
  }, [])

  return <button onClick={ handleClick }>{ showComponent &&
    <p className={ styles.ScreenWidth }>: { width } px</p> }</button>
}

export default ScreenWidth