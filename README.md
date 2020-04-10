# extra-slot-for-WW
This script is executed for each folder in WW save datapack folder to modify the script and allow fifth player in.

parser.js is executed per folder and modifies all existing .mcfunction files.


Example :
```
execute as @s[tag=newState,scores={playerID=1}] run scoreboard players operation anticAdvertisement p1Quests = anticAdvertisement sharedQuests
execute as @s[tag=newState,scores={playerID=2}] run scoreboard players operation anticAdvertisement p2Quests = anticAdvertisement sharedQuests
execute as @s[tag=newState,scores={playerID=3}] run scoreboard players operation anticAdvertisement p3Quests = anticAdvertisement sharedQuests
execute as @s[tag=newState,scores={playerID=4}] run scoreboard players operation anticAdvertisement p4Quests = anticAdvertisement sharedQuests
execute as @s[tag=newState,scores={playerID=5}] run scoreboard players operation anticAdvertisement p5Quests = anticAdvertisement sharedQuests
execute as @s[tag=newState] run tag @s remove newState
```
