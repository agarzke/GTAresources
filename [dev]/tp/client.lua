RegisterCommand('tpm', function(source, args, raw)

local playerPed = PlayerPedId()
local waypoint = GetFirstBlipInfoId(8)
local waypointCoords = GetBlipInfoIdCoord(waypoint)

    if not DoesBlipExist(waypoint) then
        return
    else
        for height = 1, 1000 do
            SetPedCoordsKeepVehicle(playerPed, waypointCoords.x, waypointCoords.y, height+0.0)

            local foundGround = GetGroundZFor_3dCoord(waypointCoords.x, waypointCoords.y, height+0.0)

            if foundGround then
                break
            end

            Citizen.Wait(5)
        end
    end
end)
