class Input{
    constructor(datatype, variable){
        this.datatype = datatype;
        this.variable = variable;
        this.class = this.constructor.name;
    }
}

class Value{
    constructor(value, childs = []){
        this.value = value;
        this.childs = childs;
        this.class = this.constructor.name;
    }
}

class Operation{
    constructor(value){
        this.value = value;
        this.class = this.constructor.name;
    }
}

class If{
    constructor(condition, values = []){ //values = [value, childs] --> childs als array von Objekten :::::::> new If("Willst du ein NSD machen?", [["Ja", [new Operation("Testblock")]],["Nein", [new Operation("Testblock")]],["Other", [new Operation("Testblock")]]]);
        this.condition = condition;
        this.class = this.constructor.name;
        this.values = [];
        for(let i in values){
            this.values[i] = new Value(values[i][0], values[i][1]);
        }
    }
}

var nsd = [];

nsd[0] = new Input("int", "TEST");
nsd[1] = new If("Willst du ein NSD machen?", [
    ["Ja", 
        [
            new Operation("Testblock")
        ]
    ],
    ["Nein", 
        [
            new Operation("Testblock")
        ]
    ],
    ["Other", 
        [
            new Operation("Codeblock"), 
            new If("Willst du ein NSD machen?", 
            [
                ["Ja", [
                    new Operation("Testblock")]
                ],
                ["Nein", [
                    new Operation("Testblock")]
                ],
                ["Other", [
                    new Operation("Testblock")]
                ]
            ])
        ]
    ]
]);
nsd[2] = new Operation("Codeblock");


console.log(nsd);

function go(){
    var html = "";
    nsd.forEach(element => {
        //element.class = element.constructor.name;
        if(!element.childs){
            html += getNSDHTML(element);
        }
    });
    console.log(html);
    document.getElementsByClassName("n_shell")[0].innerHTML = html;
}

function getNSDHTML(element){
    var htmlString = "";
    if(element.class == "Input"){
        htmlString += '<div class="n_block">'+ element.datatype +' '+ element.variable +' '+ element.value +'</div>';
    }else if(element.class == "If"){
        htmlString+= '<div class="n_if" style="grid-template-columns: repeat('+ element.values.length +', auto)"><div class="n_if_head" style="grid-column: 1 / span '+ element.values.length +'"><div class="n_block">'+ element.condition +'</div></div>';
        element.values.forEach(value => {
            htmlString += getNSDHTML(value);
        });
        htmlString+= '</div>';
    }else if(element.class == "Value"){
        htmlString+= '<div class="n_if_collumn"><div class="n_block">'+ element.value +'</div>';
        element.childs.forEach(child => {
            htmlString += getNSDHTML(child);
        });
        htmlString+= '</div>';
    }else if(element.class == "Operation"){
        htmlString += '<div class="n_block">'+ element.value +'</div>';
    }
    return htmlString;
}


