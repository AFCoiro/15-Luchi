import { useEffect } from "react"

const Modal = ({ isOpen,onClose,children }) =>{

    useEffect(()=>{
        if(isOpen){
            document.documentElement.style.overflow = 'hidden'

        }else{
            document.documentElement.style.overflow = ''

        }
        return()=>{
            document.documentElement.style.overflow = ''
        }
    },[isOpen])

    if(!isOpen) return null

    return(
        <article className="modal" onClick={onClose}>
            <div className="modal__container" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}> x </button>
                {children}
            </div>
        </article>
    )
}

export default Modal