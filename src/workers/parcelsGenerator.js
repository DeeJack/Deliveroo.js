const Grid = require('../deliveroo/Grid');
const Tile =  require('../deliveroo/Tile');
const myClock =  require('../deliveroo/Clock');
const config =  require('../../config');



const PARCELS_GENERATION_INTERVAL = process.env.PARCELS_GENERATION_INTERVAL || config.PARCELS_GENERATION_INTERVAL || '2s';
const PARCELS_MAX = process.env.PARCELS_MAX || config.PARCELS_MAX || 'infinite';



/**
 * 
 * @param {Grid} grid 
 */
module.exports = function (grid) {
    
    myClock.on( PARCELS_GENERATION_INTERVAL, () => {
        if (myClock.isPaused()) return;
        
        if ( grid.getParcelsQuantity() >= PARCELS_MAX ) {
            return;
        }
        let tiles_with_no_parcels =
            Array.from( grid.getTiles() )
            // // not a delivery tile
            // .filter( t => ! t.delivery )
            // parcel spawner tile
            .filter( t => t.parcelSpawner )
            // no parcels exists on the tile
            .filter( t =>
                Array.from( grid.getParcels() )
                .find( p =>
                    p.x == t.x && p.y == t.y
                ) == undefined
            )
        if ( tiles_with_no_parcels.length > 0 ) {
            let i = Math.floor( Math.random() * tiles_with_no_parcels.length - 1 )
            let tile = tiles_with_no_parcels.at( i )
            let parcel = grid.createParcel( tile.x, tile.y );
        }
        // 
        // let parcel;
        // let trials = 0
        // while ( ! parcel && trials++ < 100 ) {
        //     var x = Math.floor( Math.random() * (grid.getMapSize().width-2) ) + 1;
        //     var y = Math.floor( Math.random() * (grid.getMapSize().height-2) ) + 1;
        //     parcel = grid.createParcel(x, y);
        // }
        // 
        // console.log('parcel created at', x, y, parcel.reward)
    } )

}
