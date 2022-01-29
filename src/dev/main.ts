const content: UI.WindowContent = {
    location: {x: 900, y: 100, width: 64, height: 64},
    elements: {
        button: {
            type: "button",
            x: 0, y: 0, scale: 62.5,
            bitmap: "default_button_up", bitmap2: "default_button_down",
            clicker: {
                onClick: () => {
                    let player = Player.get();
                    let pos = Entity.getPosition(player);
                    let lookVector = Entity.getLookVector(player);
                    let item = Player.getCarriedItem();
                    if(IDRegistry.getIdInfo(item.id).substring(0, 5) === "block"){
                        let tileId = Block.convertItemToBlockId(item.id);
                        let maxAbs = Math.max(Math.abs(lookVector.x), Math.abs(lookVector.y), Math.abs(lookVector.z));
                        let _v = {x: 0, y: 0, z: 0};
                        switch(maxAbs){
                            case lookVector.x:
                                _v.x = 1;
                                break;
                            case -lookVector.x:
                                _v.x = -1;
                                break;
                            case lookVector.y:
                                _v.y = 1;
                                break;
                            case -lookVector.y:
                                _v.y = -2;
                                break;
                            case lookVector.z:
                                break;
                            case -lookVector.z:
                                _v.z = -1;
                                break;
                        }
                        if([0, 8, 9, 10, 11].indexOf(World.getBlockID(pos.x + _v.x, pos.y + _v.y, pos.z + _v.z)) !== -1){
                            World.setBlock(pos.x + _v.x, pos.y + _v.y, pos.z + _v.z, tileId, item.data);
                            if(Game.getGameMode() === 0){
                                Player.decreaseCarriedItem();
                            }
                        }
                    }
                }
            }
        }
    }
};

const invButton = new UI.Window(content); //invoke button

invButton.setAsGameOverlay(true);

Callback.addCallback("NativeGuiChanged", (screen: string) => {
    screen === "in_game_play_screen" ? invButton.open() : invButton.close();
});
