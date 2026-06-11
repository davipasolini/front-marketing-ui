const API_URL = "https://flow-marketing-ai.onrender.com/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {

```
const div = document.createElement("div");

div.classList.add("message");

if(sender === "user"){
    div.classList.add("user");
}else{
    div.classList.add("bot");
}

div.innerText = text;

chat.appendChild(div);

chat.scrollTop = chat.scrollHeight;
```

}

async function sendMessage() {

```
const message = input.value.trim();

if(!message) return;

addMessage(message,"user");

input.value = "";

const loading = document.createElement("div");
loading.classList.add("message","bot");
loading.innerText = "🧠 Flow Marketing AI está pensando...";
chat.appendChild(loading);

chat.scrollTop = chat.scrollHeight;

try{

    const response = await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message
        })
    });

    const data = await response.json();

    loading.remove();

    addMessage(
        data.reply || "Nenhuma resposta recebida.",
        "bot"
    );

}catch(error){

    loading.remove();

    addMessage(
        "Erro ao conectar com o servidor.",
        "bot"
    );

    console.error(error);
}
```

}

sendBtn.addEventListener("click",sendMessage);

input.addEventListener("keypress",(e)=>{
if(e.key === "Enter"){
sendMessage();
}
});

document.querySelectorAll(".nav-btn").forEach(btn=>{

```
btn.addEventListener("click",()=>{

    input.value = btn.dataset.prompt;

    sendMessage();
});
```

});

