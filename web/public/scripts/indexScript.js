const host = "192.168.2.101";
const port = 8080;
const baseURL = `http://${host}:${port}`

function handlerSwitchs(event){
    if(event.target.checked){
        fetch(`${baseURL}/api/actuators/${event.target.id}/enable`, 
        {method: "POST"}).then(response => {
            if(response.status !== 200)
                return event.target.checked = false;
        }).catch(err =>{
            return event.target.checked = false;
        })
    }else{
        fetch(`${baseURL}/api/actuators/${event.target.id}/disable`, 
        {method: "POST"}).then(response => {
            if(response.status !== 200)
                return event.target.checked = false;
        }).catch(err =>{
            return event.target.checked = false;
        })
    }

}

let loader;
window.onload = function(){
    loader = document.getElementsByClassName("loadCircle")[0];
    loaderHome();
    let bottomBar = document.querySelectorAll('.bottomBar div');
    for(let i = 0; i < bottomBar.length; i++){
        let buttonInBar = bottomBar[i];
        buttonInBar.addEventListener('click', ()=> {
            let lateralMenu = document.getElementsByClassName("lateralMenu")[0];
            if(lateralMenu.style.width === '200px'){
                toggleMenu();
                return setTimeout(() =>{
                    let line = document.querySelector(".bottomBar line");
                    line.style.left = buttonInBar.offsetLeft + 'px';
                    line.style.width = buttonInBar.offsetWidth + 'px';
                    switch (buttonInBar.getAttribute("type")) {
                        case "home":
                            loaderHome();
                            break;
                        case "rooms":
                            loaderRooms();
                            break;
                    }
                }, 500);
                
            }
            let line = document.querySelector(".bottomBar line");
            line.style.left = buttonInBar.offsetLeft + 'px';
            line.style.width = buttonInBar.offsetWidth + 'px';
            switch (buttonInBar.getAttribute("type")) {
                case "home":
                    loaderHome();
                    break;
                case "rooms":
                    loaderRooms();
                    break;
            }
        });
    }
};


async function loaderHome(){
    loader.style.visibility = 'visible';
    document.getElementById("error").style.visibility = 'hidden';
    await loadSensors();
    await loadRooms();
}

async function loaderRooms() {
    loader.style.visibility = 'visible';
    document.getElementById("error").style.visibility = 'hidden';
    await loadRooms();
}

function loadSensors(){
    fetch(`${baseURL}/api/sensors`, { method: "GET" }).then(response => response.json()).then(json =>{
        if(json.sensors.length < 1) return;
        let sensors = document.querySelector(".sensors");
        sensors.innerHTML = "";
        let div = document.createElement("div");
        json.sensors.forEach(sensor =>{
           div.innerText = Math.floor((Math.random() * 100)) + " °C";
           let label = document.createElement("label");
           label.innerText = sensor.name;
           div.appendChild(label);
        });
        sensors.appendChild(div);
    }).catch(error =>{
        console.log("Não foi possivel buscar os sensores", error.message);
        document.getElementById("error").style.visibility = 'visible';
        loader.style.visibility = 'hidden';
    });
}

function loadActuators() {
    fetch(`${baseURL}/api/actuators`, { method: "GET" }).then(response => response.json()).then(json =>{
        loader.style.visibility = 'hidden';
        if(json.actuators.length < 1) return;
        json.actuators.map(actuators =>{
        });
    }).catch(error =>{
        console.log("Não foi possivel buscar os atuadores ", error.message);
        document.getElementById("error").style.visibility = 'visible';
        loader.style.visibility = 'hidden';
    });
}

function loadRooms() {
    fetch(`${baseURL}/api/rooms`, { method: "GET" }).then(response => response.json()).then(json =>{
        loader.style.visibility = 'hidden';
        if(json.rooms.length < 1) return;
        let rooms = document.querySelector(".rooms");
        rooms.innerHTML = "";
        json.rooms.forEach((room) =>{
            let firstdiv = document.createElement("div");
            let title = document.createElement("title");
            title.innerText = room.name;
            firstdiv.appendChild(title);
            if(room.devices.length > 0) {
                let seconddiv = document.createElement("div");
                room.devices.forEach((device) => {
                    seconddiv.innerText = device.name;
                    let togglediv = document.createElement("div");
                    togglediv.className = 'switchToggle';
                    let input = document.createElement("input");
                    input.setAttribute("type", "checkbox");
                    input.id = device._id;
                    input.addEventListener('change', handlerSwitchs);
                    let labelToggle = document.createElement("label");
                    labelToggle.setAttribute("for", device._id);
                    togglediv.appendChild(input);
                    togglediv.appendChild(labelToggle);
                    seconddiv.appendChild(togglediv);

                });
                firstdiv.appendChild(seconddiv);
                rooms.appendChild(firstdiv);
            }
        });
    }).catch(error =>{
        console.log("Não foi possivel buscar as salas", error);
        document.getElementById("error").style.visibility = 'visible';
        loader.style.visibility = 'hidden';
    });
}