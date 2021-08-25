local display = false

-- Command
RegisterCommand("inv", function(source)
    SetDisplay(not display)
end)

-- NUI Callbacks

RegisterNUICallback("exit", function(data)
    SetDisplay(false)
end)

-- Focus on NUI, disable Input

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

-- Display function + NUI Call

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "myinv",
        status = bool
    })
end