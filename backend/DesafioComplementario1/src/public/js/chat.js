const socket = io()

socket.emit("message", "Conectado a socket io")

const form = document.querySelector("#form")
const mes = document.querySelector("#messages")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const message = Object.fromEntries(datForm)
    await socket.emit("nuevoMensaje", message)   
    e.target.reset()
})

function showMessages (message) {
    const array = []
    array.push(message)
    console.log(message);
    array.forEach((mess) => {
      const mensajes = document.createElement("div");
      mensajes.innerHTML = `${mess.email} ${mess.message}`;
      mes.appendChild(mensajes);
 });
}

socket.on("messages", (mes) => {
    showMessages(mes)
})