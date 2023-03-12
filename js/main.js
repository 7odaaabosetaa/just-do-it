let input = document.querySelector("input.text");
let submit = document.querySelector("input[type='submit']");
let container = document.querySelector(".container-1");



// apend date 
let date = new Date();
let time = document.querySelector(".time");
time.innerHTML = date.toUTCString();
//  bnbbh
    let tasks =[];
    // edit function
     container.addEventListener("click",(e)=>{
        if (e.target.classList.contains("check")){
            e.target.parentElement.parentElement.classList.toggle("done");
            togglestatue(e.target.parentElement.parentElement.getAttribute("data-id"));
        }
    })
    
    
    if (localStorage.getItem("tasks")){
        tasks = JSON.parse(localStorage.getItem("tasks"))
        addElements(tasks);
    }

submit.addEventListener("click",()=>{
    if (input.value !=""){
        if(input.value.length >= 20){
        alert("max character you shoud write is 20 ");
        input.value="";
    }else{addItem(input.value)
    input.value="";}
    }
    else{
        alert("you must say something")
    }
    
});


// add items function
function addItem(value){
    container.innerHTML="";
    const task={
        title: input.value,
        id: Date.now(),
        completed: false
    }
    tasks.push(task);
    addElements(tasks);
}
//  add elements to page 
function addElements(tasks){
    tasks.forEach(element => {
        let div = document.createElement("li");
        div.innerHTML = element.title;
        let icon = document.createElement("div");
        icon.className='icon'
        icon.innerHTML=`
        <i class="fas fa-check check"></i>
        <i class="fas fa-trash trash"></i>
        `;
        div.appendChild(icon)
        div.className="item";
        div.setAttribute("data-id",element.id)
        container.appendChild(div);
    });
    addlocal(tasks)
}

// function add to local storage
    function addlocal(array){
        localStorage.setItem("tasks",JSON.stringify(array));
    }
    function getlocal(){
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    
    //  togglestatue in local storage
    function togglestatue(id){
        tasks = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < tasks.length ; i++){
            if(tasks[i].id = id){
                if(tasks[i].completed == false){
                    tasks.completed = true
                }else{
                    tasks.completed = false
                }
            }
        }
        addlocal(tasks)
    }
    // delete item
    container.addEventListener("click",(e)=>{
        if (e.target.classList.contains("trash")){
            e.target.parentElement.parentElement.remove();
            del(e.target.parentElement.parentElement.getAttribute("data-id")
            );
            console.log(e.target.parentElement.parentElement.getAttribute("data-id"))
    }})
    function del(id){
        tasks = tasks.filter((task)=> task.id != id);
        addlocal(tasks);
    }
    
    // strat changing themse
        let green = document.getElementById("green");
        let black = document.getElementById("black");
        let white = document.getElementById("white");



        green.onclick=()=>{
            green1()
        }
        black.onclick=()=>{
            black1()
        }
        white.onclick=()=>{
            white1()
        }

        function green1(){
            document.body.className="green";
            document.body.style='background-image: linear-gradient(69deg,#505354,#072f3f);'
            localStorage.setItem("mode",document.body.className)
        }  
        function black1(){
            document.body.className='black';
            document.body.style="background-color:#072f3f";
            localStorage.setItem("mode",document.body.className);
        }
        function white1(){
            document.body.className='white';
            document.body.style="background-color: #fff";
            localStorage.setItem("mode",document.body.className)
        }
        if (localStorage.getItem("mode") == "green" ){
            green1()
        }else if(localStorage.getItem("mode") == "black" ){
            black1()
        }else if (localStorage.getItem("mode") == "white" ){
            white1()
        }