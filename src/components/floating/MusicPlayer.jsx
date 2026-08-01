import { useRef, useState , useEffect} from 'react'
import song from '../../assets/audio/song.mp3'
import { Play,Pause } from "lucide-react"

const MusicPlayer = ()=>{

    const audioRef = useRef(null)
    const [isPlaying,setIsPlaying] = useState(false)

    useEffect(()=>{
        const audio =audioRef.current
        if(!audio) return

        const startMusic = async ()=>{
            try{
                await audio.play()
                setIsPlaying(true)
            } catch(error){
                setIsPlaying(false)
                console.error(error)
            }
        }
        startMusic()
    },[])

    const toggleMusic = async ()=>{
        const audio = audioRef.current
        if(!audio) return

        if(isPlaying){
            audio.pause()
            setIsPlaying(false)
            return
        }

        try{
            await audio.play()
            setIsPlaying(true)
        } catch(error){
            setIsPlaying(false)
            console.error('No se pudo reproducir la música:',error)

        }
    }
    return(
        <>
            <audio loop src={song} ref={audioRef} />

            <button 
            type='button'
            className={`musicPlayer__btn floatingButton ${isPlaying ? 'is-playing' : 'inPause'}`}  
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
                {isPlaying ? 
                <Pause color="#c49a7aa3" strokeWidth={1.5}/> 
                : <Play color="#c49a7aa3" strokeWidth={1.5}
                />} 
            </button>

        </>
    )
}

 export default MusicPlayer