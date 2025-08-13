import { useState } from 'react'

import AccidentLeadForm from './components/AccidentLeadForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
        <AccidentLeadForm />
      </div>
    </>
  )
}

export default App
