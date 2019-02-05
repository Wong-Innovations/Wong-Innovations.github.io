const canvas = document.getElementById('display')
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Media Constants
const sprites = {
    tree: new Image(),
    house: new Image(),
    flagHouse: new Image(),
    castle: new Image(),
    pesant: new Image(),
    spearMan: new Image(),
    // ...
}

function random_int(min, max)
{
    return Math.round(Math.random() * (max - min)) + min;
}

class Map
{

    constructor(rows, cols, tile_colors, tileSize, map_file)
    {
        this.rows = rows;
        this.cols = cols;
        this.tile_colors = tile_colors;
        this.tileSize = tileSize;
        if (typeof map_file == 'undefined')
        {
            this.map = this.generate_from_scratch();
            this.map_file = false;
        }
        else
        {
            this.map = null;
            this.map_file = true;
        }
    }

    generate_from_scratch()
    {
        var map = [];
        for (var row = 0; row < this.rows; row++)
        {
            // Add a new row...
            map.push([]);

            // ...to be filled by this "for" loop
            for (var col = 0; col < this.cols; col++)
            {
                map[row].push(random_int(0, this.tile_colors.length));
            }
        }
        return map;
    }
}

// class GUI
// {

//     constructor()
//     {
//         this.minimap = Render.
//     }

// }

class Player
{

    constructor()
    {
        this.savings = 0;
        this.income = 0;
    }

}

class Component
{

    constructor(mapObject)
    {
        this.rows = mapObject.rows;
        this.cols = mapObject.cols;
        if (map.map_file)
        {
            this.map = null;
        }
        else
        {
            this.map = this.generate_from_scratch();
        }
    }

    generate_from_scratch()
    {
        var map = [];
        for (var row = 0; row < this.rows; row++)
        {
            map.push([]);
            for (var col = 0; col < this.cols; col++)
            {
                map[row].push(random_int(0, 2)); // 0: Nothing 1: Tree 2: House
            }
        }
        return map;
    }

}

class Render
{

    static hexagon(xpos, ypos, size, color, stroke)
    {
        ctx.beginPath();
        ctx.moveTo(xpos + size * Math.cos(0), ypos + size * Math.sin(0));

        for (var side = 0; side < 7; side++) {
            ctx.lineTo(xpos + size * Math.cos(side * 2 * Math.PI / 6), ypos + size * Math.sin(side * 2 * Math.PI / 6));
        }

        if (stroke)
        {
            ctx.lineWidth = "4";
            ctx.strokeStyle = "black";
            ctx.stroke();
        }

        ctx.fillStyle = color;
        ctx.fill();
    }

    static statPanel(miniMap, player)
    {
        var statPanelX = canvasWidth - miniMap.xLength - miniMap.margin;
        var statPanelY = 2*miniMap.margin + miniMap.yLength;
        ctx.fillStyle = "#a1a1a1";
        ctx.fillRect(statPanelX, statPanelY, miniMap.xLength, miniMap.xLength);

        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";

        ctx.fillText("Savings:", statPanelX + 10, statPanelY + 35);
        ctx.fillText("Income:", statPanelX + 10, statPanelY + 65);
        ctx.fillText("Wages:", statPanelX + 10, statPanelY + 95);
        ctx.fillText("________________", statPanelX + 10, statPanelY + 105);
        ctx.fillText("Balance:", statPanelX + 10, statPanelY + 140);
        ctx.fillText("________________", statPanelX + 10, statPanelY + 140);
        ctx.fillText("Money:", statPanelX + 10, statPanelY + miniMap.xLength - 10);

        ctx.textAlign = "right";
        ctx.fillText(`${player.savings}`, statPanelX + miniMap.xLength - 35, statPanelY + 35);
        ctx.fillText(`+${player.income}`, statPanelX + miniMap.xLength - 35, statPanelY + 65);
        ctx.fillText("--", statPanelX + miniMap.xLength - 35, statPanelY + 95);
        ctx.fillText("0", statPanelX + miniMap.xLength - 35, statPanelY + 140);
        ctx.fillText("0", statPanelX + miniMap.xLength - 35, statPanelY + miniMap.xLength - 10);
    
    }

    static leaderboard()
    {

    }

    static background(mapObject)
    {
        var offset = 0;
        for (var col = 0; col < mapObject.cols; col++)
        {
            for (var row = 0; row < mapObject.rows; row++)
            {
                if (mapObject.map[row][col] != 0)
                {
                    this.hexagon((2*col+1) * mapObject.tileSize - (col*mapObject.tileSize*.5), (2*row+1) * mapObject.tileSize - (row*mapObject.tileSize*.3) + offset, mapObject.tileSize, mapObject.tile_colors[mapObject.map[row][col] - 1], true);
                }
            }
            offset = (offset === 0) ? mapObject.tileSize * .85 : 0;
        }
    }

}

class MiniMap
{

    constructor(xLength, yLength, margin, tileSize, map)
    {
        this.xLength = xLength;
        this.yLength = yLength;
        this.margin = margin;
        this.tileSize = tileSize;
        this.mapObject = map;
    }

    draw()
    {
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black";
        ctx.rect(canvasWidth - this.xLength - this.margin, this.margin, this.xLength, this.yLength);
        ctx.stroke();
        var offset = 0;
        for (var col = 0; col < this.mapObject.cols; col++)
        {
            for (var row = 0; row < this.mapObject.rows; row++)
            {
                if (this.mapObject.map[row][col] != 0)
                {
                    Render.hexagon((2*col+1) * this.tileSize - (col*this.tileSize*.5) + canvasWidth - this.xLength*.915 - this.margin, (2*row+1) * this.tileSize - (row*this.tileSize*.3) + offset + this.margin + this.yLength*.1, this.tileSize, this.mapObject.tile_colors[this.mapObject.map[row][col] - 1]);
                }
            }
            offset = (offset === 0) ? this.tileSize * .85 : 0;
        }
    }

}

// window.onload = openFullscreen;
var player = new Player();
var map = new Map(18, 33, ["#7CFC00", "#FF1493", "#eee"], 31);
var miniMap = new MiniMap(300, 200, 10, 5, map);
var componentMap = new Component(map);
Render.background(map);
miniMap.draw();
Render.statPanel(miniMap, player);