class Extractor {
    constructor() {
        this.resourceMap = {
            "Rock-FFC000.png": "Copper",
            "Rock-FFB1FC.png": "Tin",
            "Rock-65C0C5.png": "Iron",
            "Rock-907F2C.png": "Zinc",
            "Rock-0017FF.png": "Nickel",
            "Rock-AD3A3A.png": "Lead",
            "Rock-47FF36.png": "Silicon",
            "Rock-C5C4AA.png": "Aluminium",
            "Rock-E9E9E9.png": "Silver",
            "Rock-FFEB00.png": "Gold",
            "Rock-FF00DB.png": "Platinum",
            "Rock-00F5FF.png": "Titanium",
            "Rock-FF8E00.png": "Thorium",
            "Rock-8600FF.png": "Neodymium",
            "Rock-FF0026.png": "Chromium",
            "Rock-88A1FF.png": "Uranium",
            "Rock-734400.png": "Lanthanum",
            "Rock-00F5FF.png": "Titanium",
            "Rock-D9D4AD.png": "Samarium",
            "Rock-FF6260.png": "Terbium",
            "Rock-FFCD6D.png": "Erbium",
            "Rock-059896.png": "Yttrium",
            "Rock-FDC7E5.png": "Dysprosium",
            "Rock-1A20B0.png": "Unobtanium",
            "MetalBar-FFC000.png": "Copper Bar",
            "MetalBar-FFB1FC.png": "Tin Bar",
            "MetalBar-65C0C5.png": "Iron Bar",
            "MetalBar-907F2C.png": "Zinc Bar",
            "MetalBar-0017FF.png": "Nickel Bar",
            "MetalBar-AD3A3A.png": "Lead Bar",
            "MetalBar-47FF36.png": "Silicon Bar",
            "MetalBar-C5C4AA.png": "Aluminium Bar",
            "MetalBar-E9E9E9.png": "Silver Bar",
            "MetalBar-FFEB00.png": "Gold Bar",
            "MetalBar-FF00DB.png": "Platinum Bar",
            "MetalBar-00F5FF.png": "Titanium Bar",
            "MetalBar-FF8E00.png": "Thorium Bar",
            "MetalBar-8600FF.png": "Neodymium Bar",
            "MetalBar-FF0026.png": "Chromium Bar",
            "MetalBar-88A1FF.png": "Uranium Bar",
            "MetalBar-734400.png": "Lanthanum Bar",
            "MetalBar-00F5FF.png": "Titanium Bar",
            "MetalBar-D9D4AD.png": "Samarium Bar",
            "MetalBar-FF6260.png": "Terbium Bar",
            "MetalBar-FFCD6D.png": "Erbium Bar",
            "MetalBar-059896.png": "Yttrium Bar",
            "MetalBar-FDC7E5.png": "Dysprosium Bar",
            "MetalBar-1A20B0.png": "Unobtanium Bar",
            "AirCompressor-4D4D4D.png": "Air Compressor",
            "Antenna-4D4D4D.png": "Antenna",
            "BarbedWire-4D4D4D.png": "Barbed Wire",
            "Battery-4D4D4D.png": "Battery",
            "BoilingFlask-4D4D4D.png": "Boiling Flask",
            "Bolt-4D4D4D.png": "Bolt",
            "Capacitor-4D4D4D.png": "Capacitor",
            "Ceramics-4D4D4D.png": "Ceramics",
            "Circuit-4D4D4D.png": "Circuit",
            "CRTScreen-4D4D4D.png": "CRT Screen",
            "Diode-4D4D4D.png": "Diode",
            "ExplosiveBolt-4D4D4D.png": "Explosive Bolt",
            "Fuse-4D4D4D.png": "Fuse",
            "Glass-4D4D4D.png": "Glass",
            "Lense-4D4D4D.png": "Lens",
            "Magnet-4D4D4D.png": "Magnet",
            "MetalSheet-4D4D4D.png": "Metal Sheet",
            "Microchip-4D4D4D.png": "Microchip",
            "Motor-4D4D4D.png": "Motor",
            "Nail-4D4D4D.png": "Nail",
            "Relay-4D4D4D.png": "Relay",
            "Rivet-4D4D4D.png": "Rivet",
            "RoboticArm-4D4D4D.png": "Robotic Arm",
            "Semiconductor-4D4D4D.png": "Semiconductor",
            "Screw-4D4D4D.png": "Screw",
            "Speaker-4D4D4D.png": "Speaker",
            "SolarPanel-4D4D4D.png": "Solar Panel",
            "Solenoid-4D4D4D.png": "Solenoid",
            "Struct-4D4D4D.png": "Struct",
            "TinCan-4D4D4D.png": "Tin Can",
            "Transformer-4D4D4D.png": "Transformer",
            "Transistor-4D4D4D.png": "Transistor",
            "Twine-4D4D4D.png": "Twine",
            "WeldingRod-4D4D4D.png": "Welding Rod",
            "WeldingTorch-4D4D4D.png": "Welding Torch",
            "WireCoil-FFC000.png": "Copper Wire"
        };

        this.recipes = {};
        this.incomes = {};
        this.itemPrices = {};

        this.smelters = 0;
        this.crafters = 0;

        this.status = new Set();
    }

    convertDurationToSeconds(durationText) {
        let totalSeconds = 0;

        const daysMatch = durationText.match(/(\d+)\s*day[s]*/);
        const hoursMatch = durationText.match(/(\d+)\s*hour[s]*/);
        const minutesMatch = durationText.match(/(\d+)\s*minute[s]*/);
        const secondsMatch = durationText.match(/(\d+)\s*second[s]*/);

        if (daysMatch) {
            totalSeconds += parseInt(hoursMatch[1]) * 86400;
        }

        if (hoursMatch) {
            totalSeconds += parseInt(hoursMatch[1]) * 3600;
        }

        if (minutesMatch) {
            totalSeconds += parseInt(minutesMatch[1]) * 60;
        }

        if (secondsMatch) {
            totalSeconds += parseInt(secondsMatch[1]);
        }

        return totalSeconds;
    }

    countSmeltersOrCrafters(element) {
        if (!element) {
            return 0;
        }

        const smelterOrCrafterRows = element.querySelectorAll('div[id^="ujs_WziTabBodySmelterOrCrafterRow"]');
        return smelterOrCrafterRows.length;
    }

    countWorkers() {
        const smeltersBacking = document.querySelector('#ujs_SmeltersBacking');
        const smelters = this.countSmeltersOrCrafters(smeltersBacking);
        const craftersBacking = document.querySelector('#ujs_CraftersBacking');
        const crafters = this.countSmeltersOrCrafters(craftersBacking);
        return [smelters, crafters];
    }

    extractItemPrices() {
        const prices = {};
        const resourceRows = document.querySelectorAll('[id^="ujs_WziTabBodyResourceRow_"]');

        resourceRows.forEach(row => {
            const nameElem = row.querySelector('[id^="ujs_NameLabel_"] .ujsInner');
            const quantityElem = row.querySelector('[id^="ujs_QuantityLabel_"] .ujsInner');
            const sellsForElem = row.querySelector('[id^="ujs_SellsForLabel_"] .ujsInner span');

            if (nameElem && sellsForElem) {
                const itemName = nameElem.textContent.trim();
                const priceText = sellsForElem.textContent.trim();
                const price = priceText.slice(1);
                prices[itemName] = price;
            }
        });

        return prices;
    }

    extractRecipes() {
        const recipes = {};
        const deactivateLabel = document.querySelector('div[id^="ujs_DeactivateLabel"]');
        if (!deactivateLabel) {
            alert("You must open the Change Recipe dialog to extract recipes.");
            return;
        }

        const producer = deactivateLabel.textContent.trim().replace("Deactivate ", "");
        const recipeRows = document.querySelectorAll('.ujsGameObject[id^="ujs_WziSwitchRecipeRow"]');

        recipeRows.forEach(row => {
            const resourceContainers = row.querySelectorAll('div[id^="ujs_ResourcesContainer"]');
            let requirements = {};
            resourceContainers.forEach(resource => {
                let resourceText = '';
                let requirement = '';
                const requirementRows = resource.querySelectorAll('div[id^="ujs_horz"]');
                requirementRows.forEach(requirementRow => {
                    const resourceIconDiv = requirementRow.querySelector('div[id^="ujs_ResourceIcon_"] > div[id^="ujs_ResourceIcon_"][id$="_img"]');
                    const resourceTextDiv = requirementRow.querySelector('div[id^="ujs_Text"]');
                    if (resourceTextDiv) {
                        resourceText = resourceTextDiv.textContent.trim();
                        requirement = resourceText.split("/")[1];
                    }

                    const iconUrl = resourceIconDiv.style.backgroundImage;
                    let iconFileName = iconUrl.substring(iconUrl.lastIndexOf('/') + 1).split('?')[0];
                    let resourceName = this.resourceMap[iconFileName];
                    if (resourceName) {
                        requirements[resourceName] = requirement;
                    }
                });
            });

            const durationContainer = row.querySelector('div[id^="ujs_DurationLabel"]');
            const duration = this.convertDurationToSeconds(durationContainer.textContent.trim()).toString();

            const makingContainer = row.querySelector('div[id^="ujs_MakingContainer"]');
            const textDiv = makingContainer.querySelector('div[id^="ujs_Text"] div.ujsInner.ujsTextInner');
            const fullText = textDiv.textContent.trim();
            const resourceName = fullText.split(' (')[0];

            recipes[resourceName] = {
                "name": resourceName,
                "time": duration,
                "producer": producer,
                "requirements": requirements
            }
        });

        return [recipes, producer];
    }

    extractMineData() {
        let mines = {};
        let mineRows = document.querySelectorAll('[id^="ujs_WziTabBodyMineRow"]');

        mineRows.forEach(row => {
            try {
                let nameElem = row.querySelector('[id^="ujs_NameLabel_"]');
                let name = nameElem ? nameElem.textContent.trim() : "Unknown";

                let levelElem = row.querySelector('[id^="ujs_LevelLabel_"]');
                let level = levelElem ? levelElem.textContent.trim() : "Unknown";

                let upgradeElem = row.querySelector('[id^="ujs_UpgradeBtn_"] span');
                let upgradeCost = upgradeElem ? upgradeElem.textContent.trim() : "Unknown";

                let resources = {};
                let resourceContainers = row.querySelectorAll('[id^="ujs_ResourceLabelContainer"]');
                resourceContainers.forEach(resourceContainer => {
                    try {
                        let resourceIcon = resourceContainer.querySelector('.ujsImgInner');
                        let resourceType = 'unknown';

                        if (resourceIcon && resourceIcon.style.backgroundImage) {
                            let iconUrl = resourceIcon.style.backgroundImage;
                            let iconFileName = iconUrl.substring(iconUrl.lastIndexOf('/') + 1).split('?')[0];

                            if (this.resourceMap[iconFileName]) {
                                resourceType = this.resourceMap[iconFileName];
                            } else {
                                console.log(`Unknown resource icon: ${iconFileName}`);
                            }

                            let productionRateElem = resourceContainer.querySelector('.ujsTextInner');
                            let productionRate = productionRateElem ? productionRateElem.textContent.trim() : "Unknown rate";

                            resources[resourceType] = parseFloat(productionRate.replace("/s", ""));
                        }
                    } catch (innerErr) {
                        console.error("Error processing resource container", innerErr);
                    }
                });

                mines[name] = {
                    "name": name,
                    "level": level,
                    "upgradeCost": upgradeCost.replace("Upgrade\n", ""),
                    "resources": resources
                };
            } catch (err) {
                console.error("Error processing row", err);
            }
        });

        return mines;
    }

    makeIncomeTable(mines) {
        let incomeTable = {};

        for (const [name, mine] of Object.entries(mines)) {
            for (const [resource, income] of Object.entries(mine.resources)) {
                if (incomeTable[resource]) {
                    incomeTable[resource] += income;
                } else {
                    incomeTable[resource] = income;
                }
            }
        }

        return incomeTable;
    }

    makeRecipeData(recipesData, itemPrices) {
        const recipes = Object.values(recipesData);
        const itemPricesMap = itemPrices;

        const recipesOutput = recipes.map(recipe => {
            const requirements = Object.entries(recipe.requirements)
                .map(([resource, amount]) => `${resource}:${amount}`)
                .join(';');

            const price = itemPricesMap[recipe.name] || 0;

            return `${recipe.name}:${recipe.time}:${recipe.producer}:${price}:${requirements}`;
        });

        return `recipes=${recipesOutput.join(",")}`;
    }

    makeIncomeData(income) {
        const incomeQuery = Object.entries(income)
            .map(([key, value]) => `${encodeURIComponent(key)}:${parseFloat(value).toFixed(2)}`)
            .join(',');

        if (!incomeQuery) {
            console.error("No income data found");
            return;
        }

        return `income=${incomeQuery}`;
    }

    makeWorkersData() {
        return `smelters=${this.smelters}&crafters=${this.crafters}`;
    }

    gatherGeneralData() {
        this.gatherNumberOfWorkers();
        this.gatherItemPrices();
        this.gatherIncomes();
    }

    gatherRecipes() {
        const recipes = this.extractRecipes();
        if (!recipes) {
            return;
        }

        const [newRecipes, producer] = recipes;
        this.recipes = Object.assign(this.recipes, newRecipes);
        this.status.add(producer);
    }

    gatherNumberOfWorkers() {
        const [smelters, crafters] = this.countWorkers();
        this.smelters = smelters;
        this.crafters = crafters;
    }

    gatherIncomes() {
        const minesData = this.extractMineData();
        this.incomes = this.makeIncomeTable(minesData);
    }

    gatherItemPrices() {
        const newPrices = this.extractItemPrices();
        this.itemPrices = Object.assign(this.itemPrices, newPrices);
    }

    getAndSend() {
        const gameTab = document.querySelector('[id^="ujs_BottomTabs"]');
        if (!gameTab) {
            console.error("Game tab not found");
            return;
        }

        const recipesData = this.makeRecipeData(this.recipes, this.itemPrices);

        console.log("Recipe data: ", recipesData);
        if (!recipesData) {
            return
        }

        const incomeData = this.makeIncomeData(this.incomes);
        console.log("Income data: ", incomeData);

        const workersData = this.makeWorkersData();
        const newUrl = `https://warzone.jakim.it/market_raid.html?${workersData}&${incomeData}&${recipesData}`;
        window.open(newUrl, '_blank');
    }
}
