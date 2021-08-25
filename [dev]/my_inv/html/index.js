function allowDrop(ev) {
    ev.preventDefault();
    }

    function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

$(function(){
    function display(bool){
        if(bool){
            $("#inventory").show();
        }
        else{
            $("#inventory").hide();
        }
    }
    display(false)

    window.addEventListener("message", function(event){
        let item = event.data;

        if(item.type === "myinv"){
            if(item.status == true){
                display(true)
            }
            else{
                display(false)
            }
        }
    })

    document.onkeyup = function(data){                  // ESC press: 
        if(data.which == 27){
            $.post("http://my_inv/exit", JSON.stringify({}));
            return;
        }
    }
})