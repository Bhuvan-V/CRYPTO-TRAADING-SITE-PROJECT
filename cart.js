function addcart(){
    let qty = prompt("How much do you want to buy?");
    if(qty>0){
        alert("Added " + qty + " " + " coins  to your cart !!");
    }
    else{
        alert("Invalid Input !");
    }
}
function openNav() {
    document.getElementById("mySidebar").style.width = "500px";
    document.getElementById("main").style.marginRight = "500px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
  }