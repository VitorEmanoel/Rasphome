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