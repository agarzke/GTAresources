$(function(){
    function display(bool){
        if(bool){
            $("#container").show();
        }
        else{
            $("#container").hide();
        }
    }
    display(false)

    window.addEventListener("message", function(event){ // 3. waiting for JSON(message)
        let item = event.data;                          // save json data in var
        if (item.type === "mynui"){                     // check type value
            
            if(item.status == true){                    // display == true?
                display(true)                           // #container.show() s.o.
            }
            else{                                       // display == false?
                display(false)                          // #container.hide() s.o.
            }
        }
    })

                                                        // Send back Data from JS via jquery $.post("http://RESOURCE_NAME/EVENT_NAME", JSON)

    document.onkeyup = function(data){                  // ESC press: 
        if(data.which == 27){
            $.post("http://my_nui/exit", JSON.stringify({}));
            return;
        }
    }

    $("#close").click(function() {
        $.post("http://my_nui/exit", JSON.stringify({}));
        return;
    })

    $("#submit").click(function(){                          // 4. Submit Pressed
        let inputValue = $("#input").val()                  // save inputValue from #input in var
        
        // Error Handling
        if (inputValue.length >= 100){
            $.post("http://my_nui/error", JSON.stringify({
                error: "Input > 100!"
            }))
            return;
        }
        else if(!inputValue){
            $.post("http://my_nui/error", JSON.stringify({
                error: "Input empty!"
            }))
        }

        // Ok:
        $.post("http://my_nui/main", JSON.stringify({       // Send Back result {text: inputValue} to Client
            text: inputValue
        }))
        return;
    })

})