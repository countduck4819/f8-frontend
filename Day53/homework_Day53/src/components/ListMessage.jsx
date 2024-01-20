import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { memo, useLayoutEffect } from "react";
import Message from "./Message";
import "./ConfigTrello.scss";

function ListMessage({ dataMessages,listMessage, statusCol }) {
    let listInColumn ;
    listInColumn = dataMessages?.filter(
        ({ _id, content, column }, index) => {
            return column === statusCol;
        }
    );
    if (dataMessages === undefined) {
        listInColumn = listMessage?.filter(
            ({ _id, content, column }, index) => {
                return column === statusCol;
            }
        );
    }
    return (
        <SortableContext
            items={listInColumn?.map(({ _id }) => {
                return _id
            })}
            strategy={verticalListSortingStrategy}
        >
            {listInColumn?.map((dataMessage) => {
                return (
                    <Message key={dataMessage._id} dataMessage={dataMessage} />
                );
            })}
        </SortableContext>
    );
}





export default ListMessage;



// import {
//     SortableContext,
//     verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import React, { memo, useEffect, useLayoutEffect, useState } from "react";
// import Message from "./Message";
// import "./ConfigTrello.scss";
// import { useDispatch, useSelector } from "react-redux";

// function ListMessage({ dataMessages,listMessage, statusCol }) {
//     const dataColumn = useSelector(state => state.input.dataBlog);
//     const [check, setCheck] = useState(false);
//     const dispatch = useDispatch();
//     let [arrayIdColumnEmpty, setArrayIdColumnEmpty] = useState([])
//     let listInColumn;
//     const columnNotMessage = dataColumn.filter(({column})  => {
//         return listMessage.every((message) => message.column !== column)
//     })
//     console.log(dataMessages)
//     listInColumn = dataMessages?.filter(
//         ({ _id, content, column }, index) => {
//             return column === statusCol;
//         }
//     );
//     if (dataMessages === undefined) {
//         listInColumn = listMessage?.filter(
//             ({ _id, content, column }, index) => {
//                 return column === statusCol;
//             }
//         );
//     }

//     useEffect(() => {
//         if (columnNotMessage?.length) {
//             setCheck(true)
//         }
//         else {
//             setCheck(false)
//         }
//     })
//     useEffect(() => {
//         const columnNotMessage = dataColumn.filter(({column})  => {
//             return listMessage.every((message) => message.column !== column)
//         })
//         if (columnNotMessage?.length && check === true) {
//             setArrayIdColumnEmpty((prev) => {
//                 return columnNotMessage.map(({_id,column}) => {
//                     if (column === statusCol) {
//                         listInColumn.push(
//                             {
//                                 _id: `${_id}-placeholder-message`,
//                                 column: column,
//                             }
//                         )
//                         dispatch({
//                             type: "add/task",
//                             payload: {
//                                 _id: `${_id}-placeholder-message`,
//                                 column: column,
//                             }
//                         })

//                     }
//                     return {
//                         _id: `${_id}-placeholder-message`,
//                         column: column,
//                     }
//                 })
//             })
//             setCheck(false)
//         }
//     },[check])
//     return (
//         <SortableContext
//             items={listInColumn?.map(({ _id }) => {
//                 return _id
//             })}
//             strategy={verticalListSortingStrategy}
//         >
//             {listInColumn?.map((dataMessage) => {
//                 if (dataMessage._id.includes("-placeholder-message")) {
//                     return (
//                         <Message key={dataMessage._id} checkHidden={true} dataMessage={dataMessage} />
//                     );
//                 } else {
//                     return (
//                         <Message key={dataMessage._id} dataMessage={dataMessage} />
//                     );
//                 }
//             })}
//         </SortableContext>
//     );
// }

// export default ListMessage;
