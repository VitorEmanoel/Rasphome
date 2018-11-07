function toggleMenu(){
    let lateralMenu = document.getElementsByClassName("lateralMenu")[0];
    let navBar = document.getElementsByClassName("navBar")[0];
    let line = document.querySelector(".bottomBar line");
    if(lateralMenu.style.width === '200px'){
        lateralMenu.style.width = '0px';
        navBar.style.marginLeft = '0px';
        line.style.marginLeft = '0px';
    }else{
        lateralMenu.style.width = '200px';
        navBar.style.marginLeft = '200px';
        line.style.marginLeft = '200px';
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
            }
            setTimeout(() =>{
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
    fetch("http://localhost/api/sensors", { method: "GET" }).then(response => response.json()).then(json =>{
        if(!json.sensors) return;
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
    fetch("http://localhost/api/actuators", { method: "GET" }).then(response => response.json()).then(json =>{
        loader.style.visibility = 'hidden';
        if(!json.actuators) return;
        json.actuators.map(actuators =>{
        });
    }).catch(error =>{
        console.log("Não foi possivel buscar os atuadores ", error.message);
        document.getElementById("error").style.visibility = 'visible';
        loader.style.visibility = 'hidden';
    });
}

function loadRooms() {
    fetch("http://localhost/api/rooms", { method: "GET" }).then(response => response.json()).then(json =>{
        loader.style.visibility = 'hidden';
        if(!json.rooms) return;
        let rooms = document.querySelector(".rooms");
        rooms.innerHTML = "";
        json.rooms.forEach((room) =>{
            let firstdiv = document.createElement("div");
            let title = document.createElement("title");
            title.innerText = room.name;
            firstdiv.appendChild(title);
            if(room.devices) {
                let seconddiv = document.createElement("div");
                room.devices.forEach((device) => {
                    seconddiv.innerText = device.name;
                    let togglediv = document.createElement("div");
                    togglediv.className = 'switchToggle';
                    let input = document.createElement("input");
                    input.setAttribute("type", "checkbox");
                    input.id = device.id;
                    let labelToggle = document.createElement("label");
                    labelToggle.setAttribute("for", device.id);
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