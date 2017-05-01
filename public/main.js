'use strict';
var addButton = document.querySelector('.addButton'),
    newItemInput = document.querySelector('.newItemInput'),
    ul = document.querySelector('ul'),
    li = document.querySelectorAll('li'),
    itemsLeft = document.querySelector('.itemsLeft'),
    alerter = document.querySelector('.alerter'),
    optionsButton = document.querySelector('.options-button'),
    optionsOverlay = document.querySelector('.options-overlay'),
    optionsContainer = document.querySelector('.options-container'),
    signupForm = document.querySelector('.sign-up-form'),
    loginButton = document.querySelector('.login'),
    signupButton = document.querySelector('.sign-up');

//DOM controllers - adds shortcuts for manipulatiing dom and helps manage state
function controller(name) {
    this.dom = name;
    this.coin = true;
    this.display = function (a) {
        if (a === true) {
            name.classList.add('display-off');
        } else if (a === false) {
            name.classList.remove('display-off');
        } else {
            name.classList.toggle('display-off');
        }
    };
    this.opacity = function (a) {
        if (a === true) {
            name.classList.add('opacity-off');
        } else if (a === false) {
            name.classList.remove('opacity-off');
        } else {
            name.classList.toggle('opacity-off');
        }
    };
    this.height = function (a) {
        if (a === true) {
            name.classList.add('height-off');
        } else if (a === false) {
            name.classList.remove('height-off');
        } else {
            name.classList.toggle('height-off');
        }
    };
    // this.default = function (a, b) {
    //     var x = this.coin;
    //     //checks to see if there was a specified boolean passed
    //     if (typeof a === 'boolean') {
    //         x = a;
    //     } else if (typeof b === 'boolean') {
    //         x = b;
    //     }
    //     //checks to see if there was a specified object passed
    //     /* passed in object will become disabled during the run of the function to prevent issues with concurring setIntervals */
    //     if (typeof a === 'object') {
    //         var z = a;
    //         z.disabled = true;
    //     } else if (typeof b === 'object') {
    //         var z = b;
    //         z.disabled = true;
    //     }
    //     if (x === true) {
    //         optionsOverlay.classList.add('height-on');
    //         var timer = setInterval(function () {
    //             optionsContainer.classList.remove('opacity-off');
    //             if (z) {
    //                 z.disabled = false;
    //             }
    //             clearInterval(timer);
    //         }, 500);
    //         this.coin = false;
    //     } else if (x === false) {
    //         optionsContainer.classList.add('opacity-off');
    //         var timer = setInterval(function () {
    //             optionsOverlay.classList.remove('height-on');
    //             if (z) {
    //                 z.disabled = false;
    //             }
    //             clearInterval(timer);
    //         }, 500);
    //         this.coin = true;
    //     }
    // };
}

var optionsOverlayController = new controller(optionsOverlay),
    optionsContainerController = new controller(optionsContainer),
    signupFormController = new controller(signupForm);

//Event listeners 
optionsButton.addEventListener('click', function () {
    // pass in the object you want to be disabled durring execution
    // optionsOverlayController.default(optionsButton);
    if (optionsOverlayController.coin === true) {
        //show
        optionsButton.disabled = true;
        optionsOverlayController.display();
        setTimeout(function () {
            optionsOverlayController.height();
            setTimeout(function () {
                optionsContainerController.opacity()
            }, 500);
            setTimeout(function () {
                optionsOverlayController.coin = false;
                optionsContainerController.coin = false;
                optionsButton.disabled = false;
            }, 500)
        }, 10);
    } else {
        //hide
        optionsButton.disabled = true;
        optionsContainerController.opacity(true);
        setTimeout(function () {
            optionsOverlayController.height();
        }, 100);
        //waits for transtions to complete
        setTimeout(function () {
            optionsOverlayController.display(true);
            optionsOverlayController.coin = true;
            optionsContainerController.coin = true;
            optionsButton.disabled = false;
        }, 500);
    }
});

signupButton.addEventListener('click', function () {
    optionsContainerController.display(true);
    signupFormController.display();
});
//click N (new) button at top to add new list item
addButton.addEventListener('click', function () {
    if (newItemInput.value.length < 5) {
        alert('List item must be atleast 5 characters long');
    } else {
        createNewItem();
        alertBlue();
        li = document.querySelectorAll('li');
        itemsLeft.innerHTML = li.length;
    }
});
//or press enter to add new item
newItemInput.addEventListener('keypress', function () {
    if (event.which === 13) {
        if (newItemInput.value.length < 5) {
            alert('List item must be atleast 5 characters long');
        } else {
            createNewItem();
            alertBlue();
            li = document.querySelectorAll('li');
            itemsLeft.innerHTML = li.length;
        }
    }
});
// add event degredation
ul.addEventListener('click', function () {
    var target = event.target;
    if (target.className === 'remove') {

        alertRed();

        target.parentNode.parentNode.removeChild(target.parentNode);
        li = document.querySelectorAll('li');
        itemsLeft.innerHTML = li.length;
    } else if (target.className === 'complete' || target.className === 'complete completeFull') {
        if (target.className === 'complete') {
            alertGreen();
        }
        target.classList.toggle('completeFull');
        target.nextElementSibling.classList.toggle('listItemAcommplished');
    }
});

function createNewItem() {

    if (li.length >= 7) {

        alert('Finish your current objectives!');
    } else {

        //create Element
        var makeLi = document.createElement('li');
        //create left button
        makeLi.append(document.createElement('input'));
        makeLi.lastChild.setAttribute('type', 'checkbox');
        makeLi.lastChild.className += 'complete';
        //create center text
        makeLi.append(document.createElement('span'));
        makeLi.lastChild.className += 'listItem';
        makeLi.lastChild.innerHTML += newItemInput.value;
        //create delete button
        makeLi.append(document.createElement('button'));
        makeLi.lastChild.className += 'remove';
        makeLi.lastChild.innerHTML += 'X';

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
            alerter.style.background = 'blue';
            alerter.style.opacity = k;
            alerter.style.borderColor = 'babyBlue';
            alerter.innerHTML = 'New Task';
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
    var completeButtons = document.querySelectorAll('.complete'),
        removeButtons = document.querySelectorAll('.remove');

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
            alerter.style.background = 'green';
            alerter.style.borderColor = 'greenYellow';
            alerter.innerHTML = 'Task Complete!';
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
    var completeButtons = document.querySelectorAll('.complete'),
        removeButtons = document.querySelectorAll('.remove');

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
            alerter.style.background = '#cd0e17';
            alerter.style.borderColor = 'orange';
            alerter.innerHTML = 'Task Removed!';
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