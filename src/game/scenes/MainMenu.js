import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        //add objects
        this.mudflaplogo = this.add.rectangle(656, 455, 20, 20);
        this.mudflaplogo2 = this.add.rectangle(730, 455, 20, 20);
        this.logo = this.add.image(512, 570, 'logo').setDepth(100);
        this.text = this.add.text(512, 660, 'CLICK LOGO TO START', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#601D14', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        
        //make clickable
        this.logo.setInteractive();
        this.text.setInteractive();
        this.mudflaplogo.setInteractive();
        this.mudflaplogo2.setInteractive();

        //add what happens on mouse down, and pass thru what "this" we're referencing
        this.logo.on('pointerdown', this.changeScene, this);
        this.text.on('pointerdown', this.changeTextOnTextClick, this);
        this.mudflaplogo.on('pointerdown', this.changeTextOnOtherLogoClick, this);
        this.mudflaplogo2.on('pointerdown', this.changeTextOnOtherLogoClick, this);
        
        //tell the event bus we're ready
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('Game');
    }

    changeTextOnTextClick(){
        if(this.text.text == 'Uhm not where I said to click but okay')
            this.text.setText('Thx now press the logo?');
        else
            this.text.setText('Uhm not where I said to click but okay');
    }

    changeTextOnOtherLogoClick(){
        if(this.text.text == '👀 pedantic')
            this.text.setText('Staaaaaaaaaaaaaaaaahp');
        else
            this.text.setText('👀 pedantic');
    }
}
