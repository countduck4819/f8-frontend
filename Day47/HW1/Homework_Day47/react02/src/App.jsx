import React from 'react'

function App() {
    const [show,setShow] = useState(true);
  return (
    <div>{show && <HelloWorld/>}
        <button onClick={() => setShow(!show)}>
            Toggle
        </button>
    </div>

  )
}

/*
Component đưa vào DOM --> Mouting
COmponent loại bỏ khỏi DOM --> Unmouting

Tình huống : Website có 3 trang
- Home
- About
- Contact

truy cập vào home --> chuyền qua about

Khi setState: 
- Component Mounted
- Component chưa Unmounted1
*/

export default App