import { Clock } from "./components/clock"

function App() {

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl mt-10 font-bold underline w-full text-center'>Simulação de Merge Conflict</h1>
      <p className='text-center mt-5 mb-5 font-bold'>Projeto React com TailwindCSS</p>
      <Clock />
    </div>
  )
}

export default App
