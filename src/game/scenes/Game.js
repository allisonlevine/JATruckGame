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
            { x: 900, y: 650 }, //0 - goal point
            { x: 100, y: 700 }, //1 - bottom row left
            { x: 850, y: 700 }, //2 - bottom row right
            { x: 370, y: 100 }, //3 - left vertical column
            { x: 300, y: 400 }, //4 - left vertical column free
            { x: 300, y: 450 }, //5 - left vertical column free
            { x: 530, y: 100 }, //6 - Middle road thing left
            { x: 590, y: 100 }, //7 - middle road thing right
            { x: 840, y: 220 }, //8 - Right Lot vertical trucks
            { x: 830, y: 500 }, //9 - Right Lot second bottom row
            { x: 830, y: 550 }, //10 - Right Lot Bottom Row
            { x: 750, y: 550 }  //11 - Last truck in the way
          ];
    
        const inTheWayTruckPositions = [
          //Left Column
          { x: 120, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 120, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 120, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 120, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 120, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 120, y: 450, targetSpot: 4, truckType: 'normalTruck'},
          { x: 120, y: 500, targetSpot: 5, truckType: 'normalTruck'},
          { x: 120, y: 550, targetSpot: 6, truckType: 'normalTruck'},

        //Second Left Column
          { x: 210, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 210, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 210, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 210, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 210, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 210, y: 450, targetSpot: 4, truckType: 'normalTruck'},
          { x: 210, y: 500, targetSpot: 5, truckType: 'normalTruck'},
          { x: 210, y: 550, targetSpot: 6, truckType: 'normalTruck'},

        //Third Left Column
          { x: 300, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 300, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 300, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 300, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 350, y: 400, targetSpot: 4, truckType: 'normalTruck'},
          { x: 350, y: 450, targetSpot: 5, truckType: 'normalTruck'},
          { x: 300, y: 500, targetSpot: 5, truckType: 'normalTruck'},
          { x: 300, y: 550, targetSpot: 6, truckType: 'normalTruck'},

        //Fourth Left Column
          { x: 440, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 440, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 440, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 440, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 440, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 440, y: 450, targetSpot: 4, truckType: 'normalTruck'},
          { x: 440, y: 500, targetSpot: 5, truckType: 'normalTruck'},
          { x: 440, y: 550, targetSpot: 6, truckType: 'normalTruck'},

        //bottom row wall
          { x: 200, y: 700, targetSpot: 2, truckType: 'normalTruck'},
          { x: 300, y: 700, targetSpot: 1, truckType: 'normalTruck'},
          { x: 400, y: 700, targetSpot: 1, truckType: 'normalTruck'},
          { x: 500, y: 700, targetSpot: 1, truckType: 'normalTruck'},
          { x: 600, y: 700, targetSpot: 1, truckType: 'normalTruck'},
          { x: 700, y: 700, targetSpot: 1, truckType: 'normalTruck'},
          { x: 800, y: 700, targetSpot: 1, truckType: 'normalTruck'},

        //Left Vertical column
          { x: 370, y: 630, targetSpot: 3, truckType: 'verticalTruck'},
          { x: 370, y: 530, targetSpot: 3, truckType: 'verticalTruck'},

        //Middle Road Thing
          { x: 530, y: 180, targetSpot: 6, truckType: 'verticalTruck'},
          { x: 530, y: 270, targetSpot: 6, truckType: 'verticalTruck'},
          { x: 530, y: 360, targetSpot: 6, truckType: 'verticalTruck'},
          { x: 530, y: 450, targetSpot: 6, truckType: 'verticalTruck'},
          { x: 530, y: 540, targetSpot: 6, truckType: 'verticalTruck'},
          { x: 530, y: 630, targetSpot: 6, truckType: 'verticalTruck'},

          { x: 590, y: 180, targetSpot: 7, truckType: 'verticalTruck'},
          { x: 590, y: 270, targetSpot: 7, truckType: 'verticalTruck'},
          { x: 590, y: 360, targetSpot: 7, truckType: 'verticalTruck'},
          { x: 590, y: 450, targetSpot: 7, truckType: 'verticalTruck'},
          { x: 590, y: 540, targetSpot: 7, truckType: 'verticalTruck'},
          { x: 590, y: 630, targetSpot: 7, truckType: 'verticalTruck'},

        //Right Lot Left Column
          { x: 680, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 680, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 680, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 680, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 680, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 680, y: 450, targetSpot: 4, truckType: 'normalTruck'},
          { x: 680, y: 500, targetSpot: 5, truckType: 'normalTruck'},
          { x: 680, y: 550, targetSpot: 6, truckType: 'normalTruck'},

        //Right Lot Middle Column
          { x: 770, y: 200, targetSpot: 3, truckType: 'normalTruck'},
          { x: 770, y: 250, targetSpot: 4, truckType: 'normalTruck'},
          { x: 770, y: 300, targetSpot: 5, truckType: 'normalTruck'},
          { x: 770, y: 350, targetSpot: 6, truckType: 'normalTruck'},
          { x: 770, y: 400, targetSpot: 3, truckType: 'normalTruck'},
          { x: 770, y: 450, targetSpot: 4, truckType: 'normalTruck'},
          { x: 770, y: 500, targetSpot: 9, truckType: 'normalTruck'},
          { x: 770, y: 550, targetSpot: 10, truckType: 'normalTruck'},
        
        //Right Lot Right Column
          { x: 840, y: 320, targetSpot: 8, truckType: 'verticalTruck'},
          { x: 840, y: 410, targetSpot: 8, truckType: 'verticalTruck'},
          { x: 840, y: 500, targetSpot: 8, truckType: 'verticalTruck'},

        //Last truck in the way
          { x: 750, y: 630, targetSpot: 11, truckType: 'verticalTruck'},

        //Goal truck
          { x: 200, y: 650, targetSpot: 0, truckType: 'starTruck'},
        ];

        spots.forEach((spot) => {
            if(spot.x == 900)
                {
                    this.parkingSpots.create(spot.x, spot.y, 'circle');
                }
                else
                {
                    this.parkingSpots.create(spot.x, spot.y, 'nothing');
                }
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
                if(this.source.targetSpot == 0)
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
