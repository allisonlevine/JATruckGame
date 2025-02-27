import { EventBus } from '../EventBus';
import { Scene, Phaser, Math } from 'phaser';

export class Game extends Scene
{
    target;
    source;

    constructor ()
    {
        super('Game');
    }


    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'parkinglot');
        this.parkingSpots = this.physics.add.staticGroup();
        this.inTheWayTrucks = this.physics.add.group();
        const spots = [
            { x: 900, y: 100 },
            { x: 0, y: 100 },
            { x: 300, y: 100 },
          ];
    
        const inTheWayTruckPositions = [
          { x: 150, y: 100, targetSpot: 0},
          { x: 250, y: 100, targetSpot: 1},
          { x: 350, y: 100, targetSpot: 2}
        ];

        spots.forEach((spot) => {
            //xyz added for visual, not real
            this.parkingSpots.create(spot.x, spot.y, 'xyz');
          });
    

        inTheWayTruckPositions.forEach((truckPos) => {
          const truck = this.inTheWayTrucks.create(truckPos.x, truckPos.y, 'redTruck');
          truck.setInteractive();
          truck.targetSpot = truckPos.targetSpot;
          truck.initialX = truckPos.x;
          truck.initialY = truckPos.y;
    
          truck.on('pointerdown', () => {
            //this.selectedTruck = truck;
            this.movingTruck(truck);
          }, this);
        });
    
    

        EventBus.emit('current-scene-ready', this);
    }

    setDestination(target){
        this.target = target;
    }

    update ()
    {
        if(this.source == null || this.target == null)
            return;
        //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.
        const tolerance = 4;

        // const tolerance = 200 * 1.5 / this.game.loop.targetFps;

        const distance = Math.Distance.BetweenPoints(this.source, this.target);

        
        if (this.source.body.speed > 0)
        {

            if (distance < tolerance)
            {
                this.source.body.reset(this.target.x, this.target.y);
            }
        }
    }

    movingTruck(truck){
        const spot = this.parkingSpots.getChildren()[truck.targetSpot];
        this.source = truck;
        this.target = spot;
        this.physics.moveToObject(this.source, this.target, 200);



    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
