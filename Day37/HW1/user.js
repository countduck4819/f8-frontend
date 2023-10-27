class User {
    constructor() {
        
    }
    
    static component(name, object = {}) {
        customElements.define(name,class extends HTMLElement {
            constructor() {
                super();
            }
            
            addEvent(nameEvent,attributeEvent,element,templatePseudoCloneNode,results) {
                // console.log(count)
                element.addEventListener(nameEvent,function(e) {
                    var result = results.find((result) => {
                        const variableResult = result.match(/{{(.+?)}}/)[1].trim();
                        return attributeEvent.includes(variableResult);
                    })
                    const variableResult = result.match(/{{(.+?)}}/)[1].trim();

                    console.log(templatePseudoCloneNode.innerHTML)
                    var index = Array.from(templatePseudoCloneNode.children).findIndex((value) => {
                        console.log(value)
                        return value.outerHTML.includes(variableResult)
                    })
                    eval(attributeEvent);
                    window[variableResult] = eval(attributeEvent);
                    if (variableResult === "count") {
                        element.parentElement.children[index].innerText = `Đã đếm: ${window[variableResult]} lần`;
                    }else {
                        element.parentElement.children[index].innerText = window[variableResult];
                    }
                })
            }

            connectedCallback() {
                var templateHtml = object.template;
                let dataHtml = object.data?.();
                if (templateHtml) {
                    let pseudoHtml;
                    const templatePseudo = document.createElement("template");
                    const templateEl = document.createElement("template");
                    const results = templateHtml.match(/{{.+?}}/g)
                    if (results && dataHtml) {
                        pseudoHtml = templateHtml;
                        Object.keys(dataHtml).forEach((key) => {
                            window[key] = dataHtml[key];
                        })
                        results.forEach((result) => {
                            const variableResult = result.match(/{{(.+?)}}/)[1].trim();
                            console.log(pseudoHtml)
                            templateHtml = templateHtml.replaceAll(result,dataHtml[variableResult])
                        })
                    }
                    console.log(pseudoHtml)
                    templatePseudo.innerHTML = pseudoHtml;
                    templateEl.innerHTML = templateHtml;
                    const templateCloneNode = templateEl.content.cloneNode(true);
                    const templatePseudoCloneNode = templatePseudo.content.cloneNode(true);
                    Array.from(templateCloneNode.children).forEach((element) => {
                        const htmlOuter = element.outerHTML;
                        if (htmlOuter.includes("v-on:")) {
                            var indexVon = htmlOuter.indexOf("v-on:");
                            var findIndexEqual = htmlOuter.indexOf("=",indexVon)
                            var nameEvent = htmlOuter.slice(indexVon + "v-on:".length,findIndexEqual);
                            const attributeEvent = element.getAttribute(`v-on:${nameEvent}`);
                            this.addEvent(nameEvent,attributeEvent,element,templatePseudoCloneNode,results);
                        }
                    })
                    this.prepend(templateCloneNode)
                }
            }
        })
    }
}
``