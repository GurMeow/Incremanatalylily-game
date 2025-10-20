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

function News()
{
    const newsLine = document.getElementById("NewsLine");
    setInterval(() => {
        if (!resume) return;

        const newsItem = document.createElement("div");
        newsItem.className = "newsItem";

        function makeRickroll() {
            const a = document.createElement("a");
            a.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            a.target = "_blank";
            a.innerText = "The funny";
            a.classList.add("NoUnderline");
            return a;
        }

        const messages = [
            "The Fr*nch are coming.",
            "Did you know? if you're reading this, you are probably bored and an idiot :D",
            "Breaking News: you're a faggot",
            "The Gametony",
            "The Game",
            "Adolf was here",
            "Erez said that ->",
            "Am I racist?",
            "Absolute Cinema",
            "AND THE WINGED HUSSARS ARRIVED!",
            "if if if then if if but if if if perhaps if if",
            "Dear god anthony's code gave me cancer",
            "better then making a chess bot",
            "I love javascript",
            "`You know what I am to lazy` - Shahar 2025 20th of October 9:36 PM",
            "Hail the great Alex",
            "Etidhar exists",
            "America to japan: `Prepare for nuclear attack`",
            "ALL HAIL BRITANNIA",
            "Light Yagami was right",
            "`I LELOCUH VI BRITTANIA COMMAND YOU TO KEEP PLAYING`",
            "Shave the heads of Juden lead them to the shower burn them in the kiln just to show my power",
            "Ligma yagami",
            "SIX SEVEN",
            "6 7",
            "I shall XOR my existence with yours. See what happends",
            "T R I G O N O M E T R Y",
            "The third plane has hit the tower",
            "Jewish space lasers hitting innocent cats in gaza",
            "breaking news: I can't stop HEGALE! the loneliness SHAW!",
            "transposition tables are NOT trans",
            "keep your pans safe, pansexuals are roaming the streets",
            "E=mc^2+AI",
            "as a child, I yearned for the mines",
            "Study shows: 95% of people working with bit-boards are depressed",
            "Visual studio is heavier then your mama",
            "I am shadow the edge lord",
            "I, AM STEVE",
            "If im a human that loves cards against humanity, am I a masochist?",
            "Johnny is not forcing me at gunpoint to say History is fun",
            "Play Omori for fuck sake",
            "Johnny if you're reading this, uhhhhhhhhhhhhhhhhhhhhh",
            "Erez is a bitch",
            "Shahar is a bitch",
            "Michael is NOT a bitch",
            "Anthony is a god",
            "Gur is a [Redacted]",
            "Wordle time! - said Michael Calmly",
            "Jesus christ was found to be guilty as a sock",
            "Wordle 1584 5/6 ⬜⬜⬜⬜⬜⬜⬜🟨⬜⬜⬜🟨⬜⬜⬜⬜🟨⬜🟨🟨🟩🟩🟩🟩🟩 - Jesus Christ I suck",
            "Java sucks smh",
            "Bar Irantony drank my soul and sold it to Allah",
            "I love Meth (totally a typo)",
            "Soon™, a moment now and the heat death of the universe",
            "Michael was supposed to be here 5 days ago",
            "The real nazis were the friends we made a long the way ❤️",
            "That's what she said - Erez Kehati",
            "Idiotony - Michael (I feel sad)",
            "Is this x defined? is f continuous? how do you find out? you can use the limit process!",
            "200 + 200 = 360",
            "`+2^74% tarrifs on china` Orange head threatening",
            "Tanya was just following orders",
            "The Epstein files ->     <-",
            "Climate change was invented by Bibi",
            "Za Juden",
            "u * v = |u| * |v| * cos(a)",
            "To the shadow realm you go",
            "Everyone in yasa is on drugs.",
            "AVAL LAMAAAAA ZE LO MISTADERRR",
            "SILENCE! I KILL YOU!",
            "I'm silking my song",
            "Not so breaking new: Poland got invaded",
            "SHAW",
            "POSHANKA",
            "Fren :D",
            "Nothing comes to my mind",
            "How was your day? I don't really care",
            "Tommy Tommy tesayek",
            "עברית שפה קשה",
            "קשה עברית שפה",
            "קשה שפה עברית",
            "Johnny's Phone number is 676-767-666",
            "Johnny's Discord user is british_piggy",
            "Me is me, beautifuly written by Erez",
            "I want some KFC",
            "Minesweeper",
            "ChatGPT Wrote this.",
            "6x7=67",
            makeRickroll,
            // makeRickroll,
            // makeRickroll,
            // makeRickroll,
            // makeRickroll,
            // makeRickroll,
            // makeRickroll,
        ];

        const msg = messages[Math.floor(Math.random() * messages.length)];

        if (typeof msg === "string") {
            newsItem.innerText = msg;
        } else if (typeof msg === "function") {
            newsItem.appendChild(msg()); // create a fresh <a> each time
        }

        newsLine.appendChild(newsItem);

        newsItem.addEventListener("animationend", () => {
            newsItem.remove();
        });
    }, 3500);
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

News();
