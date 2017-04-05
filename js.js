var addButton = document.querySelector(".addButton"),
    newItemInput = document.querySelector(".newItemInput"),
    ul = document.querySelector("ul"),
    li = document.querySelectorAll("li"),
    itemsLeft = document.querySelector(".itemsLeft"),
    alerter = document.querySelector(".alerter");
//click V button at top to add new list item
addButton.addEventListener("click", function () {
    if (newItemInput.value.length < 7) {
        alert("List item must be atleast 7 characters long");
    } else {
        createNewItem();
        alertBlue();
        li = document.querySelectorAll("li");
        itemsLeft.innerHTML = li.length;
    }
});

newItemInput.addEventListener("keypress", function () {
    if (event.which === 13) {
        if (newItemInput.value.length < 7) {
            alert("List item must be atleast 7 characters long");
        } else {
            createNewItem();
            alertBlue();
            li = document.querySelectorAll("li");
            itemsLeft.innerHTML = li.length;
        }
    }
});
// add event degredation
ul.addEventListener("click", function () {
    var target = event.target;
    if (target.className === "remove") {

        alertRed();

        target.parentNode.parentNode.removeChild(target.parentNode);
        li = document.querySelectorAll("li");
        itemsLeft.innerHTML = li.length;
    } else if (target.className === "complete" || target.className === "complete completeFull") {
        if (target.className === "complete") {

            alertGreen();
        }
        target.classList.toggle("completeFull");
        target.nextElementSibling.classList.toggle("listItemAcommplished");

    }

});

function createNewItem() {

    if (li.length >= 7) {

        alert("Finish your current objectives!");
    } else {

        //create Element
        var makeLi = document.createElement("li");
        //create left button
        makeLi.append(document.createElement("button"));
        makeLi.lastChild.className += "complete";
        makeLi.lastChild.innerHTML += "C";
        //create center text
        makeLi.append(makeSpan = document.createElement("span"));
        makeLi.lastChild.className += "listItem";
        makeLi.lastChild.innerHTML += newItemInput.value;
        //create delete button
        makeLi.append(document.createElement("button"));
        makeLi.lastChild.className += "remove";
        makeLi.lastChild.innerHTML += "X";

        ul.append(makeLi);
    }
}

function alertBlue() {
    var k = 1,
        j = 0,
        y = false;
    var setTimer = setInterval(function () {
        j += 50;
        if (y === false) {
            alerter.style.background = "blue";
            alerter.style.opacity = k;
            alerter.style.borderColor = "babyBlue";
            alerter.innerHTML = "New Task";
            y = true;
        }
        if (j > 1000) {
            if (k <= 0) {
                clearInterval(setTimer);
            }
            k -= 0.05;
            alerter.style.opacity = k;
        }
    }, 50);

}

function alertGreen() {
    var completeButtons = document.querySelectorAll(".complete"),
        removeButtons = document.querySelectorAll(".remove");

    completeButtons.forEach(function (x) {
        x.disabled = true;
    });
    removeButtons.forEach(function (x) {
        x.disabled = true;
    });

    var k = 1,
        j = 0,
        y = false;
    var setTimer = setInterval(function () {
        j += 50;
        if (y === false) {
            alerter.style.background = "green";
            alerter.style.borderColor = "greenYellow";
            alerter.innerHTML = "Task Complete!";
            alerter.style.opacity = k;
            y = true;

        }


        if (j > 1000) {
            if (k <= 0) {

                clearInterval(setTimer);

                completeButtons.forEach(function (x) {
                    x.disabled = false;
                });
                removeButtons.forEach(function (x) {
                    x.disabled = false;
                });
            }
            k -= 0.05;
            alerter.style.opacity = k;
        }
    }, 50);

}

function alertRed() {
    var completeButtons = document.querySelectorAll(".complete"),
        removeButtons = document.querySelectorAll(".remove");

    completeButtons.forEach(function (x) {
        x.disabled = true;
    });
    removeButtons.forEach(function (x) {
        x.disabled = true;
    });
    var k = 1,
        j = 0,
        y = false;
    var setTimer = setInterval(function () {
        j += 50;
        if (y === false) {
            alerter.style.background = "#cd0e17";
            alerter.style.borderColor = "orange";
            alerter.innerHTML = "Task Removed!";
            alerter.style.opacity = k;
            y = true;
        }
        if (j > 1000) {
            if (k <= 0) {

                clearInterval(setTimer);

                completeButtons.forEach(function (x) {
                    x.disabled = false;
                });
                removeButtons.forEach(function (x) {
                    x.disabled = false;
                });

            }
            k -= 0.05;
            alerter.style.opacity = k;
        }
    }, 50);

}
