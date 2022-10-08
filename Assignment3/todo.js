class Todo{
    #items;
    #stateUpdate;
    constructor(){
    this.#items= [];
    this.#stateUpdate=null;
    }

    get items(){
        return this.#items;
    }

   addtodo(value){
      const item = {
        title:value,
        status:false,
      }
      return fetch("https://json-server-mocker-masai.herokuapp.com/tasks",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(item),

      }).then((res)=>res.json())
      .then((res)=>{
        console.log("success");
        console.log(res);
        this.#items=res;
       this.gettodo();
      }).catch((err)=>{
        console.log("Failed")
      })


   }


    gettodo(){
    
        return fetch("https://json-server-mocker-masai.herokuapp.com/tasks").then((res)=>res.json())
        .then((res)=>{
            this.#items=res;
            this.stateUpdateEvent();
        }).catch((err)=>{
            console.log("No file found....")
        })



    }


    deletetodo(id){

        return fetch("https://json-server-mocker-masai.herokuapp.com/tasks/"+id,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            console.log("success")
            return this.gettodo();
        }).catch((err)=>{
            console.log("Not deleted")
        })


    }


    toggletodo(id,newstatus){
        return fetch("https://json-server-mocker-masai.herokuapp.com/tasks/"+id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify( {
                status:newstatus,
            }),
        }).then((res)=>{
            console.log("success")
            return this.gettodo();
        }).catch((err)=>{
            console.log("Not deleted")
        })

    }


    stateUpdateEvent(){
        if((this.#stateUpdate)){
            this.#stateUpdate();
        }
    }

    addStateUpdate(func){
        this.#stateUpdate=func;
    }



}

const todo = new Todo();


todo.addStateUpdate(function(){
    displaycards(todo.items);
})

todo.deletetodo(6);


window.addEventListener("load",()=>{

const addbtn = document.getElementById("add-item-todo");

addbtn.addEventListener("click",()=>{


    const text = document.getElementById("input").value;
    todo.addtodo(text);


})



})


function displaycards(items){
    console.log("yes");
    console.log(items);
const parent = document.getElementById("show");
const arr = items.map((ele)=> divBuilder(ele));
parent.innerHTML=null;
parent.append(...arr);

}



function divBuilder(item){

const div = document.createElement("div");
const p = document.createElement("p");
const button = document.createElement("button");
const delbutton = document.createElement("button");



p.innerText=item.title;
button.innerText=item.status;
delbutton.innerText="Delete"

div.append(p,button,delbutton);

button.addEventListener("click",()=>{

    todo.toggletodo(item.id, !item.status);
    
    })

 delbutton.addEventListener("click",()=>{

    todo.deletetodo(item.id);
 })   

return div;

}