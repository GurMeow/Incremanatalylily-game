class Upgrade {
    constructor(name, desc, cost, boost, layer, buying){
        this.name = name;
        this.desc = desc;
        this.baseCost = cost;
        this.cost = cost;
        this.boost = boost;
        this.layer = layer;
        this.bought = false;
        this.amount = 0;
        this.buying = buying;
    }

    Buy(){
        if (points >= this.cost)
        {
            points -= this.cost;
            points = Math.round(points * 100) / 100;
            this.boost();
            document.getElementById("points").innerText = `Points: ${points}\n${pointsPerSec} Points/Sec`;
            
            this.amount += 1;
            // console.log(this.amount)
            this.cost = this.buying(this.baseCost, this.amount);
            document.getElementById("PopUpUpgradeCost").innerText = `${this.cost} Points`;

            
            if (!this.bought)
            {
                for (const key in allUpgrades)
                {
                    // console.log(allUpgrades[key]);
                    if (!(key in upgrades))
                    {
                        // console.log("Not found:", key);
                        CreateUpgradeButton(key);
                        break;
                    }
                }
            }

            this.bought = true;
        }
    }
}

function BuyUpgrade(name)
{
    upgrades[name].Buy();
}

function OpenPopUp(name)
{
    document.getElementById("PopUp").style.display = "";
    document.getElementById("PopUpBuyBtn").onclick = () => { BuyUpgrade(name)};
    document.getElementById("PopUpUpgradeTitle").innerText = name;
    document.getElementById("PopUpUpgradeDescription").innerText = upgrades[name].desc;
    document.getElementById("PopUpUpgradeCost").innerText = `${upgrades[name].cost} Points`;
}
function ClosePopUp()
{
    document.getElementById("PopUp").style.display = "none";
}

function TickStart()
{
    valuesUpd = setInterval(() => {
        if (resume)
        {
            pointsPerSec = base * mult;
            points += pointsPerSec / 5;
            points = Math.round(points * 100) / 100
            document.getElementById("points").innerText = `Points: ${points}\n${pointsPerSec} Points/Sec`;
        }
        else
        {
            clearInterval(valuesUpd);
        }
    }, 200);
}

function CreateUpgradeButton(name)
{
    desc = allUpgrades[name].desc;
    cost = allUpgrades[name].cost;
    boost = allUpgrades[name].boost;
    layer = allUpgrades[name].layer;
    scaling = allUpgrades[name].scaling;

    const upgradesHolder = document.getElementById("upgradesHolder");
    const btnDiv = document.createElement("div");
    const btn = document.createElement("button");
    btn.className = "UpgradeButton";
    btn.innerText = name;
    btn.onclick = () => { 
        OpenPopUp(name, desc, cost);
    }

    btnDiv.appendChild(btn);
    upgradesHolder.appendChild(btnDiv);

    const newUpgrade = new Upgrade(name, desc, cost, boost, layer, scaling);

    upgrades[name] = newUpgrade;
}


let points = 0;
let pointsPerSec = 1;
document.getElementById("points").innerText = `Points: ${points}\n${pointsPerSec} Points/Sec`;

let base = 1;
let mult = 1;

let resume = true;

let valuesUpd;

const upgrades = {};

const allUpgrades = {
    "Points Boost 1": {
        desc: "Increases points per second by 1",
        cost: 10,
        boost: () => { base += 1; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(1.15**amount)).toFixed(2);
        }
    },
    "Points Boost 2": {
        desc: "Increases points per second by 2",
        cost: 50,
        boost: () => { base += 2; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*1.2**amount).toFixed(2);
        }
    },
    "Points Mult": {
        desc: "Increases points per second by 20%",
        cost: 200,
        boost: () => { mult += 0.2; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*2.2**amount).toFixed(2);
        }
    },
    "Points Mult 2": {
        desc: "Increases points per second by 40%",
        cost: 300,
        boost: () => { mult += 0.4; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*2.4**amount).toFixed(2);
        }
    },
};

CreateUpgradeButton("Points Boost 1");

TickStart();

