import { EventBus } from '../EventBus';
import { Scene, Math } from 'phaser';

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
        this.addSound();
        this.add.image(512, 384, 'parkinglot');
        this.parkingSpots = this.physics.add.staticGroup();
        this.inTheWayTrucks = this.physics.add.group();
        const spots = [
            { x: 250, y: 100 },
            { x: 250, y: 200 },
            { x: 250, y: 300 },
            { x: 250, y: 400 },
            { x: 250, y: 500 },
            { x: 250, y: 600 },
            { x: 150, y: 150 }
          ];
    
        const inTheWayTruckPositions = [
          { x: 150, y: 100, targetSpot: 0, truckType: 'normalTruck'},
          { x: 150, y: 200, targetSpot: 1, truckType: 'normalTruck'},
          { x: 150, y: 300, targetSpot: 2, truckType: 'normalTruck'},
          { x: 150, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 150, y: 500, targetSpot: 4, truckType: 'normalTruck'},
          { x: 150, y: 600, targetSpot: 5, truckType: 'normalTruck'},
          { x: 150, y: 700, targetSpot: 6, truckType: 'starTruck'},
        ];

        spots.forEach((spot) => {
            //xyz added for visual, not real
            this.parkingSpots.create(spot.x, spot.y, 'xyz');
          });
    

        inTheWayTruckPositions.forEach((truckPos) => {
          const truck = this.inTheWayTrucks.create(truckPos.x, truckPos.y, truckPos.truckType);
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

    addSound() {
        this.sound.add('background', { loop: true }).play();
        this.beep = this.sound.add('beep');
        this.car = this.sound.add('car');
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
                this.car.stop();
                if(this.source.targetSpot == 6)
                {
                    this.changeScene();
                }
            }
        }
        if (this.physics.collide(this.inTheWayTrucks))
        {
            this.inTheWayTrucks.getChildren().forEach((truck) => {
                truck.body.reset(truck.x, truck.y);
                this.beep.play();
                this.car.stop();
            });
        }
    }

    movingTruck(truck){
        const spot = this.parkingSpots.getChildren()[truck.targetSpot];
        this.source = truck;
        this.target = spot;
        this.car.play();
        this.physics.moveToObject(this.source, this.target, 200);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
