function MahjongData() {
    var MAHJONG_DATA_VERSION = "1.0.0";
    var STORAGE_DATA = "mahjong.data";
    var STORAGE_STATS = "mahjong.stats";    
    var INITIAL_DATA = {
        "board": {},
        "tiles": {},
        "ellapsedMilliseconds": 0,
        "version": MAHJONG_DATA_VERSION,
        "timestamp": new Date().getTime()
    }
    var INITIAL_STATS = {        
        "ranking": [],
        "version": MAHJONG_DATA_VERSION
    }

    this.loadGameData = function (){
        let data = window.localStorage.getItem(STORAGE_DATA);
        let obj = undefined;
        if (data) {
            obj = JSON.parse(data);
            obj.gameState.board = Object.assign(new MahjongBoard({},[]), obj.gameState.board);
            obj.gameState.tiles = obj.gameState.board.getTilesList().sort(MahjongUtils.compareTilesByRenderOrder);
            obj.gameState.solver = Object.assign(new MahjongSolver(obj.gameState.board));
        } else {
            obj = Object.assign({},INITIAL_DATA);            
        }
        return obj;
    }

    this.saveGameData = function (data){
        window.localStorage.setItem(STORAGE_DATA, JSON.stringify(data));
    }

    this.loadGameStats = function () {
        let data = window.localStorage.getItem(STORAGE_STATS);
        if (data) {
            return JSON.parse(data);
        } else {
            return Object.assign({},INITIAL_STATS);
        }
    }

    this.saveGameStats = function (stats) {
        window.localStorage.setItem(STORAGE_STATS, JSON.stringify(stats));
    }

    this.clearData = function (){
        window.localStorage.setItem(STORAGE_DATA, "");
    }

    this.clearStats = function (){
        window.localStorage.setItem(STORAGE_STATS, "");
    }
}