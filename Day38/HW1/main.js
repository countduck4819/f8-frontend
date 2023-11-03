const btnComplete = document.querySelector(".btn-complete");
const completeTodo = btnComplete.querySelector(".complete-todo");
const dataCurrent = document.querySelector(".data-current");
const dataSave = document.querySelector(".data-save");
const addTodo = document.querySelector(".btn.btn-add");
const addItem = document.querySelector(".add-item");
const textNode = document.createTextNode(` ${dataSave.children.length}`)
completeTodo.append(textNode)
var arrowElement = document.createElement("span");
arrowElement.innerHTML = `<i class="fa-regular fa-circle-down" style="margin-left: 5px;color: #ffffff;"></i>`;
arrowElement.children[0].classList.add("rotate");
completeTodo.append(arrowElement);
const getDataAPI = async (nameData) => {
    const response = await fetch(`https://jw8mf6-3000.csb.app/${nameData}`);
    const data = await response.json();
    return data;
}
const fixId = async(nameData) => {
    console.log(nameData)
    const data = await getDataAPI(nameData);
    console.log(data)
    const fixAPI = async(id,index) => {
        const response = await fetch(`https://jw8mf6-3000.csb.app/${nameData}/${id}`,{
            method: "PATCH",
            headers: {
            "Content-type": "application/json"
             },
            body: JSON.stringify({
                id: `${index+1}`
             })
        });
    }
    data.forEach(({id},index) => {
        fixAPI(id,index)
    })
}
const setDataAPI = async (typeData,nameData) => {
    const response = await fetch(`https://jw8mf6-3000.csb.app/${nameData}`);
    const data = await response.json();
    data.forEach(({name},_) => {
        createDataItem(name,typeData);
    })
}
setDataAPI(dataSave,"dataSave")
setDataAPI(dataCurrent,"dataCurrent")
function convertClassToName (DOMElement) {
    let nameClass = DOMElement.className.split(" ")[0].split("-");
    nameClass[1] = nameClass[1][0].toUpperCase() + nameClass[1].slice(1);
    return nameClass.join("");
}

const deleteItem = (tagDelete) => {
    tagDelete.addEventListener("click", (e) => {
        const elementParent = tagDelete.parentElement.parentElement.parentElement;
        tagDelete.parentElement.parentElement.remove();
        const deleteAPI = async() => {
            let data = await getDataAPI(convertClassToName(elementParent));
            let id = data.findIndex(({name}) => {
                return name === tagDelete.parentElement.parentElement.querySelector(".text").innerText;
            });

            id = data[id].id;

            const response = await fetch(`https://jw8mf6-3000.csb.app/${convertClassToName(elementParent)}/${id}`,{
                method: "delete",
                mode: "cors", 
                cache: "no-cache" 
            });
        }
        deleteAPI();
        tagDelete.parentElement.parentElement.remove();
        textNode.nodeValue = " "+dataSave.children.length;
    });
};
const fixItem = (tagFix, divItem) => {
    tagFix.addEventListener("click", (e) => {
        const btnCancel = document.querySelector(".btn-cancel");
        const btnOk = document.querySelector(".btn-ok");
        const inputTodo = document.querySelector(".input-todo");
        let dataBefore =  divItem.querySelector(".text").innerText;
        console.log(divItem.querySelector(".text").value,divItem.querySelector(".text"))
        inputTodo.value = divItem.querySelector(".text").innerText;
        addItem.classList.remove("hidden");
        const fixAPI = async(newValue) => {
            let data = await getDataAPI(convertClassToName(divItem.parentElement))
            let id = data.findIndex(({name}) => {
                return name === dataBefore;
            });

            id = data[id].id;
            const response = await fetch(`https://jw8mf6-3000.csb.app/${convertClassToName(divItem.parentElement)}/${id}`,{
                method: "PATCH",
                headers: {
                "Content-type": "application/json"
                 },
                body: JSON.stringify({
                    name: `${inputTodo.value}`
                 })
            });
            inputTodo.value = "";
        }
        function Cancel() {
            addItem.classList.add("hidden");
            inputTodo.value = "";
            btnOk.removeEventListener("click", Ok);
            btnCancel.removeEventListener("click", Cancel);
        }
        
        function Ok() {
            if (inputTodo.value !== "") {
                const a = inputTodo.value
                addItem.classList.add("hidden");
                divItem.querySelector(".text").innerText = inputTodo.value;
                btnOk.removeEventListener("click", Ok);
                btnCancel.removeEventListener("click", Cancel);
                fixAPI(a);
            }
        }
        btnCancel.addEventListener("click", Cancel);
        btnOk.addEventListener("click", Ok);
    });
};
let convertData = function(data1 ,data2,divItem) {
    const value = divItem.querySelector(".text").innerText;
    const deleteAPI = async() => {
        let data = await getDataAPI(convertClassToName(data1))
        let value = data.find(({name}) => {
            return name === value;
        });
        const response = await fetch(`https://jw8mf6-3000.csb.app/${convertClassToName(data1)}/${value.id}`,{
            method: "delete",
            mode: "cors", 
            cache: "no-cache" 
        });
    }
    deleteAPI()
    data1.removeChild(divItem);
    const createAPI = async() => {
        const response = await fetch(`https://jw8mf6-3000.csb.app/${convertClassToName(data2)}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: `${value}`
            })
        });
    }
    createAPI();
    data2.appendChild(divItem);
}
const importItem = (tagImport,divItem) => {
    tagImport.addEventListener("click", (e) => {
        if (dataCurrent.className.includes(divItem.parentElement.className)) {
            convertData(dataCurrent,dataSave,divItem)
        }
        else {
            convertData(dataSave,dataCurrent,divItem)
        }

        textNode.nodeValue = " "+dataSave.children.length;
    });
};
const createDataItem = (value,data) => {
    const divItem = document.createElement("div");
    divItem.className = "data-item";
    divItem.innerHTML = `<div class="text">${value}</div>
    <div class="action">
    <div class="btn delete"><i class="fa-solid fa-trash"></i></div>
    <div class="btn fix"><i class="fa-solid fa-pen-to-square"></i></div>
    <div class="btn import"><i class="fa-solid fa-check-to-slot"></i></div>
    </div>`;
    const action = divItem.querySelector(".action");
    data.append(divItem);
    deleteItem(action.children[0]);
    fixItem(action.children[1], divItem);
    importItem(action.children[2],divItem);
    textNode.nodeValue = " "+dataSave.children.length;
};
const createItem = (value,data) => {
    const divItem = document.createElement("div");
    divItem.className = "data-item";
    divItem.innerHTML = `<div class="text">${value}</div>
    <div class="action">
    <div class="btn delete"><i class="fa-solid fa-trash"></i></div>
    <div class="btn fix"><i class="fa-solid fa-pen-to-square"></i></div>
    <div class="btn import"><i class="fa-solid fa-check-to-slot"></i></div>
    </div>`;
    const action = divItem.querySelector(".action");
    data.append(divItem);
    const createAPI = async() => {
        const response = await fetch(`https://jw8mf6-3000.csb.app/${convertClassToName(data)}`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: `${value}`
            })
        });
    }
    createAPI();
    deleteItem(action.children[0]);
    fixItem(action.children[1], divItem);
    importItem(action.children[2],divItem);
    textNode.nodeValue = " "+dataSave.children.length;
};

completeTodo.addEventListener("click", (e) => {
    dataSave.classList.toggle("hidden");
    completeTodo.classList.toggle("color-btn");
    arrowElement.children[0].classList.toggle("rotate");
});

addTodo.addEventListener("click", (e) => {
    addItem.classList.remove("hidden");
    const btnCancel = document.querySelector(".btn-cancel");
    const btnOk = document.querySelector(".btn-ok");
    const inputTodo = document.querySelector(".input-todo");
    function Cancel() {
        addItem.classList.add("hidden");
        inputTodo.value = "";
        btnOk.removeEventListener("click", Ok);
        btnCancel.removeEventListener("click", Cancel);
    }

    function Ok() {
        if (inputTodo.value !== "") {
            addItem.classList.add("hidden");
            createItem(inputTodo.value,dataCurrent);
            inputTodo.value = "";
            btnOk.removeEventListener("click", Ok);
            btnCancel.removeEventListener("click", Cancel);
        }
    }
    btnCancel.addEventListener("click", Cancel);
    btnOk.addEventListener("click", Ok);
});
