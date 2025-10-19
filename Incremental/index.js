class Upgrade {
    constructor(name, desc, cost, boost, layer, scaling, max, button){
        this.name = name;
        this.desc = desc;
        this.baseCost = cost;
        this.cost = cost;
        this.boost = boost;
        this.layer = layer;
        this.bought = false;
        this.amount = 0;
        this.scaling = scaling;
        this.max = max;
        this.button = button;
    }

    Buy(){
        if (points >= this.cost && (this.max == null || this.amount < this.max))
        {
            points -= this.cost;
            points = Math.round(points * 100) / 100;
            this.boost();
            document.getElementById("points").innerText = `Points: ${points}\n${pointsPerSec} Points/Sec`;
            
            this.amount += 1;
            // console.log(this.amount)
            this.cost = this.scaling(this.baseCost, this.amount);
            document.getElementById("PopUpUpgradeCost").innerText = `${this.cost} Points`;
            if (this.amount != this.max || this.max == null)
            {
                document.getElementById("PopUpUpgradeAmount").innerText = `Amount: ${this.amount}`;
            }
            else
            {
                document.getElementById("PopUpBuyBtn").innerText = `Maxed Out`;
                document.getElementById("PopUpUpgradeAmount").innerText = ``;
                this.button.style.backgroundColor = "rgba(108, 165, 70, 1)";
                
                this.button.onmouseenter = () => {
                    this.button.style.backgroundColor = "rgba(108, 165, 70, 1)";
                };
                this.button.onmouseleave = () => {
                    this.button.style.backgroundColor = "rgba(108, 165, 70, 1)";
                };
                this.button.onmousedown = () => {
                    this.button.style.backgroundColor = "rgba(108, 165, 70, 1)";
                };
                this.button.onmouseup = () => {
                    this.button.style.backgroundColor = "rgba(108, 165, 70, 1)";
                };
            }

            
            if (!this.bought)
            {
                for (const key in allPointUpgrades)
                {
                    // console.log(allPointUpgrades[key]);
                    if (!(key in upgrades))
                    {
                        // console.log("Not found:", key);
                        CreatePointUpgradeButton(key);
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
    if (upgrades[name].max != null && upgrades[name].amount >= upgrades[name].max)
    {
        document.getElementById("PopUpUpgradeAmount").innerText = ``;
        document.getElementById("PopUpBuyBtn").innerText = `Maxed Out`;
    }
    else
    {
        document.getElementById("PopUpUpgradeAmount").innerText = `Amount: ${upgrades[name].amount}`;
        document.getElementById("PopUpBuyBtn").innerText = `Buy`;
    }
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
            pointsPerSec = base * mult * (clicks * 0.02 + 1);
            pointsPerSec = Math.round(pointsPerSec * 100) / 100;
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

function ClickerClick(displayer)
{
    console.log("clicked");
    clicks++;

    displayer.innerText = `${clicks} Clicks`
}

function CreateClickerZone()
{
    CreateSection("Clicker", false);

    const sectionHolder = document.getElementById("ClickerHolder");
    
    const clickerButton = document.createElement("button");
    clickerButton.id = "ClickerButton";

    const clickDisplayer = document.createElement("div");
    clickDisplayer.className = "displayer";
    clickDisplayer.innerText = "0 Clicks";
    clickDisplayer.id = "ClickDisplayer";

    console.log(clickerButton);
    clickerButton.addEventListener("mousedown", () => {
        ClickerClick(clickDisplayer);
    });

    sectionHolder.appendChild(clickerButton);
    sectionHolder.appendChild(clickDisplayer);
}

function CreateSection(name, upgrades)
{
    const section = document.createElement("section");
    if (upgrades)
    {
        section.id = `${name}Upgrades`;
    }
    else
    {
        section.id = `${name}`;
    }

    const sectionHeader = document.createElement("h2");
    sectionHeader.innerText = section.id;
    section.appendChild(sectionHeader);

    document.getElementById("mainZone").appendChild(section);

    const sectionHolder = document.createElement("div");
    sectionHolder.className = "SectionHolder";
    sectionHolder.id = `${section.id}Holder`;

    section.appendChild(sectionHolder);
}

function CreatePointUpgradeButton(name)
{
    desc = allPointUpgrades[name].desc;
    cost = allPointUpgrades[name].cost;
    boost = allPointUpgrades[name].boost;
    layer = allPointUpgrades[name].layer;
    scaling = allPointUpgrades[name].scaling;
    max = allPointUpgrades[name].max;

    const pointsUpgradesHolder = document.getElementById("pointsUpgradesHolder");
    const btnDiv = document.createElement("div");
    const btn = document.createElement("button");
    btn.className = "UpgradeButton";
    btn.innerText = name;
    btn.onclick = () => { 
        OpenPopUp(name, desc, cost);
    }

    btnDiv.appendChild(btn);
    pointsUpgradesHolder.appendChild(btnDiv);

    const newUpgrade = new Upgrade(name, desc, cost, boost, layer, scaling, max, btn);

    upgrades[name] = newUpgrade;
}


let points = 0;
let pointsPerSec = 0;
document.getElementById("points").innerText = `Points: ${points}\n${pointsPerSec} Points/Sec`;

let base = 0;
let mult = 1;

let clicks = 0;

let resume = true;

let valuesUpd;

const upgrades = {};

// CreateClickerZone();

const allPointUpgrades = {
    "Start Game": {
        desc: "Start the game with points gain",
        cost: 0,
        boost: () => { base += 1; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(1.15**amount)).toFixed(2);
        },
        max : 1
    },
    "Points Boost 1": {
        desc: "Increases points per second by 1",
        cost: 10,
        boost: () => { base += 1; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(1.15**amount)).toFixed(2);
        },
        max : null
    },
    "Points Boost 2": {
        desc: "Increases points per second by 2",
        cost: 50,
        boost: () => { base += 2; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(1.2**amount)).toFixed(2);
        },
        max : null
    },
    "Points Mult": {
        desc: "Increases points per second by 20%",
        cost: 200,
        boost: () => { mult += 0.2; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(2.2**amount)).toFixed(2);
        },
        max : null
    },
    "Points Mult 2": {
        desc: "Increases points per second by 40%",
        cost: 300,
        boost: () => { mult += 0.4; },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(2.4**amount)).toFixed(2);
        },
        max : null
    },
    "Clicker": {
        desc: "Creates a clicker area, 1 click = +0.01 mult",
        cost: 500,
        boost: () => { CreateClickerZone() },
        layer: 1,
        scaling: (cost, amount) => {
            return (cost*(2.4**amount)).toFixed(2);
        },
        max : 1
    },
};

CreatePointUpgradeButton("Start Game");

TickStart();

