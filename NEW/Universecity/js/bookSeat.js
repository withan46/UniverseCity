//var user = { name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ', 'ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ', 'ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ'] };
document.getElementById("currentDate").innerHTML = new Date().toLocaleString();
// Test classes, todo get data from database with php
//------------------ TEST CLASSES DECLARATION START ------------------

var GLOBAL = GLOBAL || {};


class Course {
    constructor(code, title, department, semester, ects, direction) {
        this.CODE = code;
        this.TITLE = title;
        this.DEPARTMENT = department;
        this.SEMESTER = semester;
        this.ECTS = ects;
        this.DIRECTION = direction;
    }
}


class Classroom {
    constructor(id, name, type, number, capacity) {
        this.ID = id;
        this.NAME = name;
        this.TYPE = type;
        this.NUMBER = number;
        this.CAPACITY = capacity;
    }

}

class User {
    constructor() {
        this.AM;
        this.DEPARTMENT;
        this.EMAIL;
        this.FIRST_NAME;
        this.LAST_NAME;
        this.SEMESTER;
        this.STUDY_DIRECTION;
        this.CourseList = [];
    }

    addCourse(Course) {
        this.CourseList.push(Course);
    }
}

//------------------ TEST CLASSES DECLARATION END ------------------


//------------------ TEST DATA START ------------------
{
    // var AMF12 = new Classroom('Αμφιθέατρο 12', 'AMF', 12, 01, 168);
    // var AMF9 = new Classroom('Αμφιθέατρο 9', 'AMF', 09, 01, 90);
    // var ERG334 = new Classroom('Εργαστήριο 334', 'LAB', 334, 03, 48);
    // var CL1 = new Classroom('Αίθουσα 1', 'CL', 12, 01, 168);


    // var AIC101 = new Course('ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΙΚΤΥΟΥ', 'AIC101');
    // AIC101.setClassroom(ERG334);
    // var AIC102 = new Course('ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ', 'AIC024');
    // AIC102.setClassroom(AMF12);
    // var AIC103 = new Course('ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ', 'DEMO1');
    // AIC103.setClassroom(AMF12);
    // var AIC104 = new Course('ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ', 'AIC104');
    // AIC104.setClassroom(AMF12);
    // var AIC105 = new Course('ΑΛΓΟΡΙΘΜΟΙ', 'AIC105');
    // AIC105.setClassroom(AMF9);



    // var User01 = new User('User01');
    // User01.addCourse(AIC101);
    // User01.addCourse(AIC102);
    // User01.addCourse(AIC103);
    // User01.addCourse(AIC104);
    // User01.addCourse(AIC105);
    //console.log(User01);
}

//------------------ TEST DATA END ------------------

window.onload = getUserInfo(); 


function getUserInfo(){ // Gets User Info from Session Storage
    GLOBAL.user = [];
    GLOBAL.user = JSON.parse(sessionStorage.getItem('user'));
    GLOBAL.user.CourseList = [];
    console.log(GLOBAL.user);
    retriveUserSeat(GLOBAL.user.AM, ()=>{});
    retrieveCourses();
}

function retriveUserSeat(am, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Fail") {
                const dbResult = this.responseText;
                seats = dbResult.split('/');
                GLOBAL.user.seatList = [];
                seats.forEach(row => {
                    let value = row.split(',');
                    GLOBAL.user.seatList.push(parseInt(value[1]));
                })
                console.log(GLOBAL.user.seatList);
                callback();

                }
                
            }
        }
    xmlhttp.open("GET", "assets/backend/get_student_seat.php?student_id=" + am, true);
    xmlhttp.send();
}




function retrieveCourses() {
    // retrieve courses

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Fail") {
                const dbResult = this.responseText;
                subjectArray = dbResult.split('/');
                GLOBAL.user.CourseList = [];
                subjectArray.forEach(subject => {
                    let value = subject.split(',');
                    course = new Course(value[0],
                                        value[1],
                                        value[2],
                                        parseInt(value[3]),
                                        parseInt(value[4]),
                                        value[5]);
                    GLOBAL.user.CourseList.push(course);
                    // CourseList.push({
                    //     'CODE': (value[0]),
                    //     'TITLE': (value[1]),
                    //     'DEPARTMENT': (value[2]),
                    //     'SEMESTER': parseInt(value[3]),
                    //     'ECTS': parseInt(value[4]),
                    //     'DIRECTION': (value[5])

                    // })

                });
                makeList();
        

    
                }
                
            }
        }
    xmlhttp.open("GET", "assets/backend/get_subject_list.php?department=" + GLOBAL.user.DEPARTMENT 
                                                            +"&semester=" + GLOBAL.user.SEMESTER
                                                            +"&direction=" + GLOBAL.user.STUDY_DIRECTION, true);
    xmlhttp.send();
    // end retrieve
    

    }

function makeList() { // New Course List with buttons
    console.log(GLOBAL);

    let CourseListContainer = document.createElement('div');
    CourseListContainer.setAttribute("class", "course_list");




    document.querySelector('.selectCourse').appendChild(CourseListContainer)
    CourseListContainer.setAttribute("id", "SelectCourseList");


    // Dynamic list initialization
    for (i = 0; i < GLOBAL.user.CourseList.length; ++i) {
        // Create listItem
        listItem = document.createElement('button');

        // The value of the option is the Course's code
        listItem.setAttribute('value', GLOBAL.user.CourseList[i].CODE);
        listItem.setAttribute('class', "subjectBtns");
        // The name of the Course is displayed to the user
        listItem.innerHTML = GLOBAL.user.CourseList[i].TITLE;

        // validate() starts the generation of the seats with capacity and type 
        listItem.setAttribute('onclick', 'retrieveClassroom(this.value, validate)');

        // Add listItem to the selectElement
        CourseListContainer.appendChild(listItem);
    }
}

// Find Classroom + Generate Seats 




function retrieveFromDB(courseCode) {
    // retrieve seats from DB

    let rows;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Fail") {
                let seatArray = []; // initialize array every time
                rows = dbResult.split("|");
                rows.forEach(row => {
                    let value = row.split(","); //id, number, state
                    seatArray.push({
                        "id": parseInt(value[0]),
                        "number": parseInt(value[1]),
                        "state": (value[2])
                    });
                })
                GLOBAL.currCapacity = seatArray.length;
                GLOBAL.currSeatArray = seatArray;
                theater(GLOBAL.currCapacity, GLOBAL.Classroom.TYPE, GLOBAL.currSeatArray); //generate seats
            }
        }
    };
    xmlhttp.open("GET", "assets/backend/SeatReservation.php?subject_id=" + courseCode, true);
    xmlhttp.send();
    //capacity = rows.length
    // end retrieve
}


function retrieveClassroom(courseCode, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Fail") {
                console.log(JSON.parse(dbResult));
                GLOBAL.Classroom = JSON.parse(dbResult);
                // let value = dbResult.split(',');
                // console.log(value);
                // GLOBAL.Classroom = new Classroom(   parseInt(value[0]), //id
                //                                     value[1], // name
                //                                     value[2], // type
                //                                     parseInt(value[3]), // number
                //                                     parseInt(value[4])); // capacity
                // console.log('retrieveClassroom');
                // console.log(GLOBAL.Classroom);
                // console.log(courseCode);

                callback(courseCode);
            }
        }
    };
    xmlhttp.open("GET", "assets/backend/get_classroom.php?subject_id=" + courseCode, true);
    xmlhttp.send();
}

function validate(courseCode) {
    // Find the course and return the classroom
    let selectBtn = document.getElementById("selectBtn");
    selectBtn.style.display = 'block';
    

    

    let element = document.querySelector(".seatBoxContainer");
    let leftContainer = document.querySelector(".leftContainer");
    let rightContainer = document.querySelector(".rightContainer");

    if (element.classList.contains("filled")) { // There are seats being displayed
        leftContainer.innerHTML = ""; // clear left seat container
        rightContainer.innerHTML = "";// clear right seat container

        // Remove Desk element, might change
        const desk_element = document.querySelector('.desk');
        if (desk_element) {
            desk_element.remove();
        }
        // Generate Seats
        retrieveFromDB(courseCode);
    }
    else { // Seat container is empty - First load
        // Generate Seats
        retrieveFromDB(courseCode);
    }
}






function initSeatContainer() {
    // main container
    let seatBoxContainer = document.createElement('div');
    seatBoxContainer.setAttribute('class', 'seatBoxContainer');
    // left Container for seats
    let leftContainer = document.createElement('div');
    leftContainer.setAttribute('class', 'leftContainer');
    // right Container for seats
    let rightContainer = document.createElement('div');
    rightContainer.setAttribute('class', 'rightContainer');

    seatBoxContainer.appendChild(leftContainer);
    seatBoxContainer.appendChild(rightContainer);

    document.getElementById('seatContainer01').appendChild(seatBoxContainer);
}




function theater(capacity, type, seatArray) { //not final
    makeDesk();

    // Get the containers
    let seatBoxContainer = document.querySelector(".seatBoxContainer");
    seatBoxContainer.classList.add("filled");
    let leftContainer = document.querySelector(".leftContainer");
    let rightContainer = document.querySelector(".rightContainer");


    // TYPE = A (amphitheater) capacity 112
    if (type == 'A') {


        // Left Container Loop
        for (var i = 0; i < capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat' + (i + 1));
            listItem.setAttribute('data-seatId', seatArray[i].id);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i + 1);
            //listItem.setAttribute('style', 'cursor: pointer;');
            if (i % 14 < 7) { // 7 seats in each side in each row
                leftContainer.appendChild(listItem);
            }
            else {
                // Right Container Loop
                rightContainer.appendChild(listItem);
            }
        }
        

    }

    // TYPE = LAB (Computer lab) capacity 48?

    // Needs if statements for every type. For now --> else = same with AMF
    else {

        // Left Container Loop
        for (var i = 0; i < capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat' + (i + 1));
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i + 1);
            listItem.setAttribute('style', 'cursor: pointer;');
            if (i % 14 < 7) { // 7 seats in each side in each row
                leftContainer.appendChild(listItem);
            }
            else {
                // Right Container Loop
                rightContainer.appendChild(listItem);
            }
        }
        // Forbidden seats -->!!! must change from number(12) to variable (percentage of capacity)!!!
        for (i = 0; i < capacity / 12; i++) { //First 14 seats
            document.getElementById('seat' + (i + 1)).classList.toggle('forbidden');
        }
    }
    let selectBtn = document.getElementById('selectBtn');
    selectBtn.style.display = 'flex'

    seatEventListener(); // Temporary implementation
    markSeats(capacity, seatArray);
    markGranted();



}


function markSeats(capacity, seatArray) {
    // Forbidden seats -->!!! must change from number(12) to variable (percentage of capacity)!!!
    for (i = 0; i < capacity / 12; i++) { //First 14 seats
        document.getElementById('seat' + (i + 1)).classList.add('forbidden');
    }

    // Occupied seats - Seats that other users have already occupied
    for (i = 0; i < capacity; i++) {
        if (seatArray[i].state == 'T') {
            console.log(seatArray[i]);
            document.querySelector("button[data-seatid='" + seatArray[i].id + "']").classList.add("occupied");
        }

    }
}


function markGranted() {
    // User Seat
    //todo make user select only 1 seat
    let seatArray = GLOBAL.currSeatArray;

    
        for (i=0; i<seatArray.length; i++) {

            if (GLOBAL.user.seatList.includes(seatArray[i].id)) { // Should be true only ONE time per Classroom
                // grantedSeat.classList.remove("selected");
                console.log('markGranted() IN IN IN IN');
                let grantedSeat = document.querySelector("button[data-seatid='" + seatArray[i].id + "']");
                grantedSeat.classList.remove("occupied");
                grantedSeat.classList.add("granted");
                grantedSeat.classList.add("grantedTooltip");
                tooltip = document.createElement('span');
                tooltip.innerHTML = ('Η θέση που έχεις κρατήσει!');
                tooltip.classList.add("grantedTooltipText");
                grantedSeat.appendChild(tooltip);

                // Hide Select Button if user has a seat
                selectBtn = document.getElementById('selectBtn');
                selectBtn.style.display = 'block';
                selectBtn.style.display = 'none';

                // Remove ability to click
                const container = document.querySelector('.seatContainer');
                container.removeEventListener('click', listener);

                removePointer(); // Temporary implementation
               
                

            }
        }
    
}

function removePointer(){ // Temporary implementation
    let seat = document.querySelectorAll('.seat');
    seat.forEach(element => {
        element.style.cursor = "default";
    })
}

// Make select button
function makeSelectBtn() {



    let selectBtn = document.createElement('button');
    selectBtn.setAttribute('id', 'selectBtn');
    selectBtn.setAttribute('onclick', 'modalToggle()');
    selectBtn.insertAdjacentHTML('afterbegin', 'Επιλογή Θέσης');
    document.body.appendChild(selectBtn);
    selectBtn.style.display = "none";

}







function modalToggle() {

    // let, const
    var selectModal = document.getElementById('selectModal');
    var closeElement = document.getElementById('closeElement');
    let nobtn = document.getElementById('nobtn');

    if (!validSeat()) { 
        selectModal.style.display = 'block';

    }


    nobtn.onclick = function () {
        selectModal.style.display = 'none';
    }

    closeElement.onclick = function () {
        selectModal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == selectModal) {
            selectModal.style.display = 'none';
        }
    }
}






function submitSeat() {
    let selectedSeat = document.querySelector('.selected');
    let dataSeatID = parseInt(selectedSeat.getAttribute('data-seatid'));






    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const dbResult = this.responseText;
            if (dbResult != "Occupied") {
                var selectModal = document.getElementById('selectModal');
                    selectModal.style.display = 'none';
                    alert("Η κράτηση σας ολοκληρώθηκε με επιτύχια");
                    selectedSeat.classList.remove("selected");
                    selectedSeat.classList.add("granted");
                    retriveUserSeat(GLOBAL.user.AM, markGranted);
            }
            else {
                alert(dbResult);
            }
        }
    };
    xmlhttp.open("GET", "assets/backend/SeatSelected.php?seat_id=" + dataSeatID
        + "&student_id=" + GLOBAL.user.AM, true);
    xmlhttp.send();


}





function makeModal() {


    let selectModal = document.createElement('div');
    selectModal.setAttribute('id', 'selectModal');
    selectModal.setAttribute('class', 'modal');

    let modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');


    let closeElement = document.createElement('span');
    closeElement.setAttribute('class', 'close');
    closeElement.setAttribute('id', 'closeElement');
    closeElement.insertAdjacentHTML('afterbegin', '&times;');
    modalContent.appendChild(closeElement);

    let modalText = document.createElement('p')
    modalText.setAttribute('class', 'modalText');
    modalText.insertAdjacentHTML('afterbegin', 'Έχετε επιλέξει μια θέση είστε σίγουρος ότι θέλετε να συνεχίσετε για την κράτησή της; ');
    let choosebtnYes = document.createElement('button');
    choosebtnYes.setAttribute('class', 'chbtn');
    choosebtnYes.setAttribute('value', 'yes');
    choosebtnYes.setAttribute('id', 'yesbtn');
    choosebtnYes.setAttribute('onclick', 'submitSeat()');
    let choosebtnNo = document.createElement('button');
    choosebtnNo.setAttribute('class', 'chbtn');
    choosebtnNo.setAttribute('value', 'no');
    choosebtnNo.setAttribute('id', 'nobtn');
    // choosebtnYes.value =("Ναι");
    // choosebtnNo.value=("Όχι");
    choosebtnYes.insertAdjacentHTML('afterbegin', 'Ναι');
    choosebtnNo.insertAdjacentHTML('afterbegin', 'Όχι');
    modalContent.appendChild(modalText);
    modalContent.appendChild(choosebtnYes);
    modalContent.appendChild(choosebtnNo);







    selectModal.appendChild(modalContent);
    document.body.append(selectModal);
}


function makeDesk() {
    let deskElement = document.createElement('div');
    deskElement.setAttribute("id", "desk");
    deskElement.setAttribute("class", "desk");
    document.getElementById('screen').appendChild(deskElement);
    var desk_text = document.createElement('p');
    desk_text.setAttribute('class', 'desk_text');
    deskElement.appendChild(desk_text);
    desk_text.appendChild(document.createTextNode('ΕΔΡΑ')); //final text node?
}

// Dokimh01 12/05

function seatEventListener(){ // Temporary implementation
    const container = document.querySelector('.seatContainer');

    // Only one seat can be selected at a time
    container.addEventListener('click', listener); 

}

var listener = (e) => { // Temporary implementation
    if (e.target.classList.contains('seat') && validSeat()
        && !e.target.classList.contains('forbidden')
        && !e.target.classList.contains('occupied')) {

        e.target.classList.toggle('selected');
    }
    else if (e.target.classList.contains('seat')
        && (e.target.classList.contains('selected')
            && !validSeat())) {

        e.target.classList.remove('selected');
    }
};




function validSeat() {
    if (document.querySelectorAll('.selected').length >= 1) {
        return false;
    }
    return true;
}




// window.onload = makeList();
window.onload = makeSelectBtn();
window.onload = makeModal(); // Creates the modal that confirms the seat selection
window.onload = initSeatContainer(); // init seat container


