# Simple OPP RPG running on node

## Repository link

[https://github.com/FaboBorgesLima/oop-node-rpg](https://github.com/FaboBorgesLima/oop-node-rpg)

## Game rules

Each entity will trigger a movement and a element at the same time .

    -   Attack :
        -   vs Attack: deal total damage.
        -   vs Defense: deal partial damage, but deal two times more damage if against weak element.
        -   vs Counter-attack: does total damage if counter is not from a weak element, if it is from a weak element the entity will recive the sum of both attack points.

    -   Defense :
        -   vs Attack: will recive less damage based on defense points.
        -   vs Defense: no damage .
        -   vs Counter-attack: no damage .

    -   Counter-atack :
        -   vs Attack: will recive total damage if attack is not from weak element, if it is the entity will deal damage that is equals to the sum of both entities combined .
        -   vs Defense: no damage .
        -   vs Counter-attack: no damage .
