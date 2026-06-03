import{useState, useEffect} from 'react'

function App() {

  const [data, setData] = useState(null)

  useEffect(()=>{
    const loadData = async ()=>{
      try {
        const res = await fetch('/invitacion.json')
        const json = await res.json()
        setData(json)

      }catch(error){
        console.error(`Error cargando Json: ${error}`)
      }
    }
    loadData()
  },[])

  if (!data) return <p>Cargando...</p>
  return (
    <>
      <h1>{data.titulo}</h1>
    </>
  )
}

export default App


