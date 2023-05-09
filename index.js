let fırstTodoGovde=document.querySelectorAll(".todo_govde")[0];
let secondTodoGovde=document.querySelectorAll(".todo_govde")[1];
let addForm=document.querySelector("#add-todo-form");
let addInput=document.querySelector("#add-todo-input");
let searchInput=document.querySelector("#search-input");
let todoList=document.querySelector("#todo-list");
let clearButton=document.querySelector("#clear-button");

let list=[]

eventList();
function eventList(){
  addForm.addEventListener("submit",ekle)  
  document.addEventListener("DOMContentLoaded",doldur)
  secondTodoGovde.addEventListener("click",veriSil)
  clearButton.addEventListener("click",hepsiniSil)
  searchInput.addEventListener("keyup",filtrele)
}

function ekle(e){
let inputText=addInput.value.trim()
if(inputText==null||inputText=="") bilgiMesajı("warning","Lütfen Değer Giriniz")
else{
  ekleONYuz(inputText);
  ekleStorage(inputText)
  bilgiMesajı("success","Başarıyla Eklendi")
}

  e.preventDefault();
}

function ekleONYuz(veri){
let li=document.createElement("li")
li.className="list-item mt-3"
li.textContent=veri
let a=document.createElement("a")
a.className="float-right"
let i=document.createElement("i")
i.className="fa fa-trash"
a.appendChild(i)
li.appendChild(a)
todoList.appendChild(li)
addInput.value="";
}

function ekleStorage(data){
veriAl();
list.push(data)
localStorage.setItem("list",JSON.stringify(list))
}

function veriAl(){
  if(localStorage.getItem("list")==null) list=[]
  else{
    list=JSON.parse(localStorage.getItem("list"))
  }
}

function veriSil(e){
 
  if(e.target.className==="fa fa-trash"){
    // önyüzden silme
    let tdoSil=e.target.parentElement.parentElement;
    tdoSil.remove();
    // storageden silme
    storagedenSil(tdoSil.textContent);
    
    bilgiMesajı("dark","Başarıyla Silindi")
  }
}
function storagedenSil(veri){
  veriAl();
  list.forEach(function(todo,index){
    if(veri===todo){
      list.splice(index,1);
    }
  })
  localStorage.setItem("list",JSON.stringify(list))
}

function doldur(){
  veriAl()
  list.forEach(function(todo){
    ekleONYuz(todo)
  })
}

function bilgiMesajı(type,message){
let div=document.createElement("div")
div.className="alert alert-"+type;
div.textContent=message
fırstTodoGovde.appendChild(div)
setTimeout(function(){
   div.remove();
},2500)
}

function hepsiniSil(){
let todolistesi=document.querySelectorAll(".list-item");
if(todolistesi.length>0){
  todolistesi.forEach(function(todo){
    todo.remove();
  })

  list=[]
  localStorage.setItem("list",JSON.stringify(list))

  bilgiMesajı("primary","Hepsi Silindi")
}else{
  bilgiMesajı("warning","Silinecek Değer Bulunmamaktadır..")
}
}
function filtrele(e){
  let filterValue=e.target.value.toLowerCase().trim();
  let todolistesi=document.querySelectorAll(".list-item");

  if(todolistesi.length>0){
    todolistesi.forEach(function(todo){
      if(todo.textContent.toLowerCase().trim().includes(filterValue)){
        todo.setAttribute("style","display:block")
      }else{
        todo.setAttribute("style","display:none !important")
      }
    })
  }else{
    bilgiMesajı("warning","Aranacak Değer Bulunammaktadır..")
  }
}