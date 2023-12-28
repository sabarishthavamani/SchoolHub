var setting = document.getElementById("edit-option");
var filter = document.getElementById("filter-option");
var stdButton = document.querySelectorAll(".std-btn");
var info = document.getElementById("information");
var correct = document.querySelectorAll(".tik");
function edit(){
    setting.style.display = "none";
}
function hide() {
    setting.style.display = "block";
}
function showfilt(){
    filter.style.display = "none";
}
function hidefilt(){
    filter.style.display = "block";
}
function select(){
    stdButton[0].style.background = "#efeef1";
    correct[0].style.visibility = "visible";
}
function select2(){
    stdButton[1].style.background = "#efeef1";
    correct[1].style.visibility = "visible";
}
function select3(){
    stdButton[2].style.background = "#efeef1";
    correct[2].style.visibility = "visible";
}
function select4(){
    stdButton[3].style.background = "#efeef1";
    correct[3].style.visibility = "visible";
}
function select5(){
    stdButton[4].style.background = "#efeef1";
    correct[4].style.visibility = "visible";
}
function unselect(){
    stdButton[0].style.background = "#fafafa";
    correct[0].style.visibility = "hidden";
}
function unselect2(){
    stdButton[1].style.background = "#fafafa";
    correct[1].style.visibility = "hidden";
}
function unselect3(){
    stdButton[2].style.background = "#fafafa";
    correct[2].style.visibility = "hidden";
}
function unselect4(){
    stdButton[3].style.background = "#fafafa";
    correct[3].style.visibility = "hidden";
}
function unselect5(){
    stdButton[4].style.background = "#fafafa";
    correct[4].style.visibility = "hidden";
}
function infos(){
    info.style.visibility = "visible";
}