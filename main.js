const diceClassName = ["fa-dice-one", "fa-dice-two", "fa-dice-three", "fa-dice-four", "fa-dice-five", "fa-dice-six"];
let secondPlayer = document.querySelector(".second-player-count");
let firstPlayer = document.querySelector(".first-player-count");
let playerList = document.querySelector(".first-player-list");
let selectedListFirst = document.querySelectorAll(".app__item-first");
let selectedListSecond = document.querySelectorAll(".app__item-second");
let refreshDice = document.getElementById("refreshDice");
let selectDice = document.getElementById("selectDice");
let dicesWrap = document.querySelector(".field__list");
let dices = document.querySelectorAll(".field__item");
let countWin = 0;
let countClick = 0;
let countBot = 0;

refreshDice.addEventListener("click", () => {
    if (countClick < 3) {
        AssignRandomVar()
        let result = CountPriceField(DicesAmount());
        AssignVarInList(result, "app__item-first-click", selectedListFirst);
        countClick++;
    }
});

dicesWrap.addEventListener("click", (e) => {
    if (e.target.tagName == "I" && countClick != 0) {
        if(e.target.parentNode.classList.contains('field__item--active')){
            e.target.parentNode.classList.remove("field__item--active");
        } else {
            e.target.parentNode.classList.add("field__item--active");
        }
    }
});

playerList.addEventListener("click", (e) => {
    if (countClick != 0 && !e.target.parentNode.classList.contains('app__item-first-click') && e.target.parentNode.tagName == "LI") {
        for (let i = 0; i < dices.length; i++) {
            if (dices[i].classList.contains('field__item--active')) {
                dices[i].classList.remove("field__item--active");
            }
        }
        CloseSelectedItemFirstPlayer(e);
        countWin++;
        BotGame();
        countBot = 0;
        if (countWin == 13 && Number(firstPlayer.textContent) >= Number(secondPlayer.textContent)) {
            alert("вы победили!!!")
        } else if (countWin == 13 && Number(firstPlayer.textContent) < Number(secondPlayer.textContent)) {
            alert("Бот победил!!!")
        }
        countClick = 0;
    }
});

function CloseSelectedItemFirstPlayer(e){
    let sum = Number(firstPlayer.textContent) + Number(e.target.parentNode.childNodes[3].textContent);
    firstPlayer.innerHTML = sum;
    e.target.parentNode.classList.add('app__item-first-click');
}

function CloseSelectedItemSecondPlayer(i){
    for (let i = 0; i < dices.length; i++) {
        if (dices[i].classList.contains('field__item--active')) {
            dices[i].classList.remove("field__item--active");
        }
    }
    let sum = Number(secondPlayer.textContent) + Number(i.childNodes[3].textContent);
    secondPlayer.innerHTML = sum;
    i.classList.add('app__item-second-click');
    countBot = 0;
}

function BotGame(){
    if (countBot < 3) {
        countBot++;
        AssignRandomVar();
        let countResult = DicesAmount();
        let result = CountPriceField(countResult);
        AssignVarInList(result, "app__item-second-click", selectedListSecond);
        for (let i = 0; i < countResult.length; i++) {
            if (countResult[FiveAmountNumber(countResult)] == 5 && !selectedListSecond[11].classList.contains('app__item-second-click')) {
                CloseSelectedItemSecondPlayer(selectedListSecond[11])
                return
            } else if (FullHouseDicesInField(countResult) && !selectedListSecond[8].classList.contains('app__item-second-click')) {
                CloseSelectedItemSecondPlayer(selectedListSecond[8]);
                return
            } else if (countResult[OnlySameNumber(countResult)] >= 3 && !selectedListSecond[OnlySameNumber(countResult)].classList.contains('app__item-second-click')) {
                for (let j = 0; j < dices.length; j++) {
                    if (dices[j].firstChild.classList.contains(diceClassName[OnlySameNumber(countResult)])) {
                        dices[j].classList.add("field__item--active");
                    }
                }
                BotGame();
                if (countBot == 3) {
                    CloseSelectedItemSecondPlayer(selectedListSecond[OnlySameNumber(countResult)]);
                }
                return
            } else if (countResult[ThreeAmountNumber(countResult)] == 3 && !selectedListSecond[6].classList.contains('app__item-second-click')) {
                for (let j = 0; j < dices.length; j++) {
                    if (dices[j].firstChild.classList.contains(diceClassName[ThreeAmountNumber(countResult)])) {
                        dices[j].classList.add("field__item--active");
                    }
                }
                BotGame();
                CloseSelectedItemSecondPlayer(selectedListSecond[6]);
                return
            } else if (countResult[FourAmountNumber(countResult)] == 4 && !selectedListSecond[7].classList.contains('app__item-second-click')) {
                for (let j = 0; j < dices.length; j++) {
                    if (dices[j].firstChild.classList.contains(diceClassName[FourAmountNumber(countResult)])) {
                        dices[j].classList.add("field__item--active");
                    }
                }
                BotGame();
                CloseSelectedItemSecondPlayer(selectedListSecond[7]);
                return
            } else if (PreFullHouseDicesInField(countResult).length == 2 && !selectedListSecond[8].classList.contains('app__item-second-click')) {
                let checkArr = PreFullHouseDicesInField(countResult);
                for (let j = 0; j < dices.length; j++) {
                    for (let n = 0; n < checkArr.length; n++) {
                        if (dices[j].firstChild.classList.contains(diceClassName[checkArr[n]])) {
                            dices[j].classList.add("field__item--active");
                        }
                    }
                }
                BotGame();
                if (countBot == 3 && !selectedListSecond[checkArr[0]].classList.contains('app__item-second-click')) {
                    CloseSelectedItemSecondPlayer(selectedListSecond[checkArr[0]]);
                } else if (countBot == 3 && !selectedListSecond[checkArr[1]].classList.contains('app__item-second-click')) {
                    CloseSelectedItemSecondPlayer(selectedListSecond[checkArr[1]]);
                } else if (countBot == 3) {
                    CloseSelectedItemSecondPlayer(selectedListSecond[8]);
                }
                return
            } else if (LittleStreetField(countResult) && !selectedListSecond[9].classList.contains('app__item-second-click')) {
                CloseSelectedItemSecondPlayer(selectedListSecond[9]);
                return
            } else if (BigStreetField(countResult) && !selectedListSecond[10].classList.contains('app__item-second-click')) {
                CloseSelectedItemSecondPlayer(selectedListSecond[10]);
                return
            } else if (PreLittleStreetField(countResult).length == 4 && !selectedListSecond[9].classList.contains('app__item-second-click')) {
                let array = PreBigStreetField(countResult);
                for (let j = 0; j < dices.length; j++) {
                    dices[array[j]].classList.add("field__item--active");
                }
                BotGame();
                let arrayAmpty = [];
                for (let j = 0; j < selectedListSecond.length; j++) {
                    if (!selectedListSecond[j].classList.contains('app__item-second-click')) {
                        arrayAmpty.push(j);
                    }
                }
                if (countBot == 3) {
                    let arrayAmpty = [];
                    for (let j = 0; j < selectedListSecond.length; j++) {
                        if (!selectedListSecond[j].classList.contains('app__item-second-click')) {
                            arrayAmpty.push([result[j], j]);
                        }
                    }
                    let max = arrayAmpty[0]
                    for (let j = 0; j < arrayAmpty.length; j++) {
                        if (max[0] < arrayAmpty[i][0]) {
                            max[0] = arrayAmpty[i][0];
                        }
                    }
                    console.log(arrayAmpty);
                    if (countBot == 3) {
                        CloseSelectedItemSecondPlayer(selectedListSecond[max[1]]);
                    }
                }
                return
            } else if (PreBigStreetField(countResult).length == 4 && !selectedListSecond[10].classList.contains('app__item-second-click')) {
                let array = PreBigStreetField(countResult);
                for (let j = 0; j < dices.length; j++) {
                    dices[array[j]].classList.add("field__item--active");
                }
                BotGame();
                let arrayAmpty = [];
                for (let j = 0; j < selectedListSecond.length; j++) {
                    if (!selectedListSecond[j].classList.contains('app__item-second-click')) {
                        arrayAmpty.push(j);
                    }
                }
                if (countBot == 3) {
                    let arrayAmpty = [];
                    for (let j = 0; j < selectedListSecond.length; j++) {
                        if (!selectedListSecond[j].classList.contains('app__item-second-click')) {
                            arrayAmpty.push([result[j], j]);
                        }
                    }
                    let max = arrayAmpty[0]
                    for (let j = 0; j < arrayAmpty.length; j++) {
                        if (max[0] < arrayAmpty[i][0]) {
                            max[0] = arrayAmpty[i][0];
                        }
                    }
                    if (countBot == 3) {
                        CloseSelectedItemSecondPlayer(selectedListSecond[max[1]]);
                    }
                }
                return
            } else if (SumDicesInField() > 18 && !selectedListSecond[12].classList.contains('app__item-second-click')) {
                CloseSelectedItemSecondPlayer(selectedListSecond[12]);
                return
            } else {
                BotGame();
                let arrayAmpty = [];
                for (let j = 0; j < selectedListSecond.length; j++) {
                    if (!selectedListSecond[j].classList.contains('app__item-second-click')) {
                        arrayAmpty.push([result[j], j]);
                    }
                }
                let max = arrayAmpty[0]
                for (let j = 0; j < arrayAmpty.length; j++) {
                    if (max[0] < arrayAmpty[i][0]) {
                        max[0] = arrayAmpty[i][0];
                    }
                }
                console.log(arrayAmpty);
                if (countBot == 3) {
                    CloseSelectedItemSecondPlayer(selectedListSecond[max[1]]);
                }
                return
            }
        }
    }
}

function PreLittleStreetField(countResult){
    let check = [];
    for (let j = countResult.length - 1; j >= 0; j--) {
        if (countResult[5] == 0 && countResult[j] == 1) {
            check.push(j);
        }
    }
    return check;
}

function PreBigStreetField(countResult){
    let check = [];
    for (let j = countResult.length - 1; j >= 0; j--) {
        if (countResult[0] == 0 && countResult[j] == 1) {
            check.push(j);
        }
    }
    return check;
}

function FiveAmountNumber(countResult){
    for (let i = 0; i < countResult.length; i++) {
        if (countResult[i] == 5) {
            return i;
        }
    }
    return 0;
}

function ThreeAmountNumber(countResult){
    for (let i = 0; i < countResult.length; i++) {
        if (countResult[i] == 3) {
            return i;
        }
    }
    return 0;
}

function FourAmountNumber(countResult){
    for (let i = 0; i < countResult.length; i++) {
        if (countResult[i] == 4) {
            return i;
        }
    }
    return 0;
}

function OnlySameNumber(countResult){
    for (let i = 0; i < countResult.length; i++) {
        if (countResult[i] >= 3) {
            return i;
        }
    }
    return 0;
}

function LittleStreetField(countResult){
    let check = 0;
    for (let j = countResult.length - 1; j >= 0; j--) {
        if (countResult[5] == 0 && countResult[j] == 1) {
            check++;
        }
    }
    if (check == 5) {
        return true;
    }
    return false;
}

function BigStreetField(countResult){
    let check = 0;
    for (let j = countResult.length - 1; j >= 0; j--) {
        if (countResult[0] == 0 && countResult[j] == 1) {
            check++;
        }
    }
    if (check == 5) {
        return true;
    }
    return false;
}

function PreFullHouseDicesInField(result){
    let sum = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i] == 2) {
            sum.push(i);
        }
    }
    return sum;
}

function FullHouseDicesInField(result){
    let boolThree = false;
    let boolTwo = false;
    for (let i = 0; i < result.length; i++) {
        if (result[i] == 2) {
            boolTwo = true;
        } 
        if (result[i] == 3) {
            boolThree = true;
        }
    }
    if (boolThree && boolTwo) {
        return true;
    }
    return false;
}

function SumDicesInField(){
    let sum;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            if (dices[i].firstChild.classList.contains(diceClassName[j])) {
                sum += (j + 1);
            }
        }
    }
    return sum;
}

function AssignRandomVar(){
    for (let i = 0; i < dices.length; i++) {
        if (!dices[i].classList.contains('field__item--active')) {
            let random = Math.floor(Math.random() * 6); 
            dices[i].firstChild.className = `fas ${diceClassName[random]}`;
        }
    }
}

function DicesAmount(){
    let countResult = [];
    for (let i = 0; i < 6; i++) {
        countResult.push(0);
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            if (dices[i].firstChild.classList.contains(diceClassName[j])) {
                countResult[j] += 1;
            }
        }
    }
    return countResult;
}

function CountPriceField(countResult) {
    let pointResult = [];
    for (let i = 0; i < 13; i++) {
        if (i < 6) {
            pointResult.push(countResult[i] * (i + 1));
        } else if (i == 6) {
            let sum = 0;
            let sumBool = false;
            for (let j = countResult.length - 1; j >= 0; j--) {
                sum += countResult[j] * (j + 1)
                if (countResult[j] == 3) {
                    sumBool = true;
                }
            }
            if (sumBool) {
                pointResult.push(sum)
            } else {
                pointResult.push(0)
            }
        } else if (i == 7) {
            let sum = 0;
            let sumBool = false;
            for (let j = countResult.length - 1; j >= 0; j--) {
                sum += countResult[j] * (j + 1)
                if (countResult[j] == 4) {
                    sumBool = true;
                }
            }
            if (sumBool) {
                pointResult.push(sum)
            } else {
                pointResult.push(0)
            }
        } else if (i == 8) {
            let three = false;
            let two = false;
            for (let j = countResult.length - 1; j >= 0; j--) {
                if (countResult[j] == 3) {
                    three = true;
                }
                if (countResult[j] == 2) {
                    two = true;
                }
            }
            if (three && two) {
                pointResult.push(25)
            } else {
                pointResult.push(0)
            }
        } else if (i == 9) {
            let check = 0;
            for (let j = countResult.length - 1; j >= 0; j--) {
                if (countResult[5] == 0 && countResult[j] == 1) {
                    check++;
                }
            }
            if (check == 5) {
                pointResult.push(30)
            } else {
                pointResult.push(0)
            }
        } else if (i == 10) {
            let check = 0;
            for (let j = countResult.length - 1; j >= 0; j--) {
                if (countResult[0] == 0 && countResult[j] == 1) {
                    check++;
                }
            }
            if (check == 5) {
                pointResult.push(40)
            } else {
                pointResult.push(0)
            }
        } else if (i == 11) {
            let sumBool = false;
            for (let j = countResult.length - 1; j >= 0; j--) {
                if (countResult[j] == 5) {
                    sumBool = true;
                }
            }
            if (sumBool) {
                pointResult.push(50)
            } else {
                pointResult.push(0)
            }
        } else if (i == 12) {
            let sum = 0;
            for (let j = countResult.length - 1; j >= 0; j--) {
                sum += countResult[j] * (j + 1)
            }
            pointResult.push(sum)
        } 
    }
    return pointResult;
}

function AssignVarInList(result, link, selectedList) {
    for (let i = 0; i < result.length; i++) {
        if (!selectedList[i].classList.contains(link)) {
            selectedList[i].childNodes[3].innerHTML = result[i];
        }
    }
}