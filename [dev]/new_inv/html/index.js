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
    // big gamechanger in develop
    display(false) // DEBUG! Set to false!
// hmmm test ok
    window.addEventListener("message", function(event){
        let item = event.data;

        if(item.type === "newinv"){
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
            $.post("http://new_inv/exit", JSON.stringify({}));
            return;
        }
    }

    $("#draggable").draggable( {
        opacity: .4,
        create: function(){$(this).data('position',$(this).position())},
        cursor:'move',
        revert: "invalid",
        revertDuration: 100,
        start:function(){$(this).stop(true,true)}
   });

     $('.inventory-grid td').droppable({
         drop:function(event, ui){
             snapToMiddle(ui.draggable,$(this));
         }
     });
})

function snapToMiddle(dragger, target){
    var topMove = target.position().top - dragger.data('position').top + (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
    var leftMove= target.position().left - dragger.data('position').left + (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
    dragger.animate({top:topMove,left:leftMove},{duration:100,easing:'easeOutBack'});
}
