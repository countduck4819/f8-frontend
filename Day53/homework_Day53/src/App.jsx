import React from 'react'
import Login from "./Login/Login"
function App() {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default App



// // import {Droppable} from './Droppable';
// // import {Draggable} from './Draggable';
// import {useDroppable} from '@dnd-kit/core';
// import {useDraggable} from '@dnd-kit/core';
// import React, {useState} from 'react';
// import {DndContext} from '@dnd-kit/core';
// function Droppable(props) {
//   const {isOver, setNodeRef} = useDroppable({
//     id: props.id,
//   });
//   const style = {
//     color: isOver ? 'green' : undefined,
//   };
  
  
//   return (
//     <div ref={setNodeRef} style={style}>
//       {props.children}
//     </div>
//   );
// }

// function Draggable(props) {
//   const {attributes, listeners, setNodeRef, transform} = useDraggable({
//     id: props.id,
//   });
//   const style = transform ? {
//     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//   } : undefined;

  
//   return (
//     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {props.children}
//     </button>
//   );
// }
// function App() {
//   const containers = ['A', 'B', 'C'];
//   const [parent, setParent] = useState(null);
//   const draggableMarkup = (
//     <Draggable id="draggable">Drag me</Draggable>
//   );

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       {parent === null ? draggableMarkup : null}

//       {containers.map((id) => (
//         // We updated the Droppable component so it would accept an `id`
//         // prop and pass it to `useDroppable`
//         <Droppable key={id} id={id}>
//           {parent === id ? draggableMarkup : 'Drop here'}
//         </Droppable>
//       ))}
//     </DndContext>
//   );

//   function handleDragEnd(event) {
//     const {over} = event;
//     console.log(event)
//     // If the item is dropped over a container, set it as the parent
//     // otherwise reset the parent to `null`
//     setParent(over ? over.id : null);
//   }
// };

// export default App;
