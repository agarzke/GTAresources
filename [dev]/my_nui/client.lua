local display = false

RegisterCommand("mynui", function(source)
    SetDisplay(not display) -- 1. Command eingegeben, run SetDisplay(bool)
end)

-- Create NUI Callbacks

RegisterNUICallback("main", function(data)      -- 5. Receive JSON Data back from js
    chat(data.text, {0,255,0})                  -- run chat(data.text, color)
    SetDisplay(false)                           -- display(none)
end)

RegisterNUICallback("error", function(data)
    chat(data.error, {255,0,0})
    SetDisplay(false)
end)

RegisterNUICallback("exit", function(data)
    chat("Exited", {0,255,0})
    SetDisplay(false)
end)


Citizen.CreateThread(function()

    while display do
        Citizen.Wait(0)

        DisableControlAction(0, 1, display)     -- LookLeftRight
        DisableControlAction(0, 2, display)     -- LookUpDown
        DisableControlAction(0, 142, display)   -- MeleeAttackAlternate
        DisableControlAction(0, 18, display)    -- Enter
        DisableControlAction(0, 322, display)   -- ESC
        DisableControlAction(0, 106, display)   -- VehicleMouseControlOverride
    end
end)

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({ -- 2. Send JSON via NUI, send whatever Data you want
        type = "mynui", -- id
        status = bool -- Display or no?
    })
end

function chat (str, color)                      -- 6. Receive string and color from Callback s.o.
    TriggerEvent("chat:addMessage", {           -- Trigger 'chat:addMessage' Event in 'chat' resource
        color = color,                          -- with JSON data {color: ...; multiline: ...; args: ...;}
        multiline= true,
        args = {str}
    })
end