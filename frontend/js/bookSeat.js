var user = {name: "charisis", courses: ['ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΥΚΤΙΟΥ','ΤΕΧΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ','ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ']};

// Test classes, todo get data from database with php
//------------------ TEST CLASSES DECLARATION START ------------------

class Course {
        constructor(name, code, availableSeats) {
            this.name = name;
            this.code = code;
            this.availableSeats = availableSeats;
            Classroom;
            
        }

        setClassroom(Classroom) {
            this.Classroom = Classroom;
        }

        setAvailableSeats(num) {
            availableSeats = num;
        }



        getAvailableSeats() {
            return availableSeats;
        }
    }


class Classroom {
        constructor(name, type, code, floor, capacity) {
                this.name = name;
                this.type = type;
                this.code = code;
                this.floor = floor;
                this.capacity = capacity;
        }
        
    }

class User {
        constructor(name) {
            this.name;
            this.CourseList = [];
        }

         addCourse(Course) {
             this.CourseList.push(Course);
         }
    }

//------------------ TEST CLASSES DECLARATION END ------------------


//------------------ TEST DATA START ------------------
{ 
  var AMF12 = new Classroom('Αμφιθέατρο 12', 'AMF', 12, 01, 168);
  var AMF9 = new Classroom('Αμφιθέατρο 9', 'AMF', 09, 01, 90);
  var ERG334 = new Classroom('Εργαστήριο 334', 'LAB', 334, 03, 48);
  
  
  var AIC101 = new Course('ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΔΙΑΔΙΚΤΥΟΥ', 'AIC101');
  AIC101.setClassroom(ERG334);
  var AIC102 = new Course('ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ', 'AIC102');
  AIC102.setClassroom(AMF12);
  var AIC103 = new Course('ΑΝΑΛΥΣΗ ΑΛΓΟΡΙΘΜΩΝ', 'AIC103');
  AIC103.setClassroom(AMF12);
  var AIC104 = new Course('ΑΣΦΑΛΕΙΑ ΠΛΗΡΟΦΟΡΙΩΝ', 'AIC104');
  AIC104.setClassroom(AMF12);
  var AIC105 = new Course('ΑΛΓΟΡΙΘΜΟΙ', 'AIC105');
  AIC105.setClassroom(AMF9);



  var User01 = new User('User01');
  User01.addCourse(AIC101);
  User01.addCourse(AIC102);
  User01.addCourse(AIC103);
  User01.addCourse(AIC104);
  User01.addCourse(AIC105);
  //console.log(User01);
}

//------------------ TEST DATA END ------------------

//date
let dateElement = new Date;
document.querySelector('.date').insertAdjacentHTML('afterbegin', dateElement.toDateString());

  // List Initialization
  let listData = [];
  for (var i = 0; i <User01.CourseList.length; i++) {
      listData[i] = User01.CourseList[i];
      //console.log(listData[i]);
  }


    // List containing the courses
    function makeList() {
      let formElement = document.createElement('form'),
      selectElement = document.createElement('select'),
      listItem;
      document.getElementById('list').appendChild(formElement).appendChild(selectElement);
      selectElement.setAttribute("id", "SelectCourseList");
      for (i = 0; i < listData.length; ++i) {
          listItem = document.createElement('option');
  
          listItem.innerHTML = listData[i].name;
          // Add listItem to the selectElement
          selectElement.appendChild(listItem);
      }
  }


  // Find Course. Return Classroom item
  function findCourse(x) {
    for (i=0; listData.length; i++) {
        if (listData[i].name == x) {
             return listData[i].Classroom;
        }
    }
        return (0)
  }


  // Validate List. Check if there is a seat container already drawn
  function validateList() {
      let x = document.getElementById("SelectCourseList").value;
      selectedClassroom = findCourse(x);
      console.log(x);
      if (!document.querySelector('.seatBoxContainer')) {
       theater(selectedClassroom.capacity, selectedClassroom.type);
      }
      else if(document.querySelector('.seatBoxContainer')) {
        const element = document.querySelector('.seatBoxContainer');
        element.remove();
        const desk_element = document.querySelector('.desk');
        desk_element.remove();
        theater(selectedClassroom.capacity, selectedClassroom.type);
      }
  }

 


//TEST 01

function theater(capacity, type){ //not final
    makeDesk();
    
    // TYPE = AMF (amphitheater) capacity 180
    if(type=='AMF') {
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

        // Left Container Loop
        for (var i=0; i<capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+(i+1));
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i+1);
            listItem.setAttribute('style', 'cursor: pointer;');
            if(i%14<7){ // 7 seats in each side in each row
                leftContainer.appendChild(listItem);
            }
            else{
                rightContainer.appendChild(listItem);
            }
        }
        // Forbidden seats
        for (i=0; i<capacity/12; i++) { //First 14 seats
            document.getElementById('seat'+(i+1)).classList.toggle('forbidden');
        }

    }
    
    // TYPE = LAB (Computer lab) capacity 48?

    // Needs if statements for every type. For now --> else = same with AMF
    else {
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

        // Left Container Loop
        for (var i=1; i<=capacity/2; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            leftContainer.appendChild(listItem);
        }

        // Right Container Loop
        for (i; i<=capacity; i++) {
            let listItem = document.createElement('button');
            listItem.setAttribute('id', 'seat'+i);
            listItem.setAttribute('class', 'seat');
            listItem.insertAdjacentHTML('afterbegin', i);
            listItem.setAttribute('style', 'cursor: pointer;');
            rightContainer.appendChild(listItem);
        }
    }
     let selectBtn = document.getElementById('selectBtn');
     selectBtn.style.display = 'flex'
  
    
  }

  // Make select button
  function makeSelectBtn() {
    //   //Create a div which contains the button
    // let buttonContainer=document.createElement('div');
    // buttonContainer.setAttribute('id','buttonContainer');
    // let selectBtn = document.createElement('button');
    // selectBtn.setAttribute('id', 'selectBtn');
    // selectBtn.insertAdjacentHTML('afterbegin', 'Επιλογή Θέσης');
   
    // document.getElementById('seatContainer01').appendChild(buttonContainer);
  
 
    let selectBtn = document.createElement('button');
    selectBtn.setAttribute('id', 'selectBtn');
    selectBtn.insertAdjacentHTML('afterbegin', 'Επιλογή Θέσης');
    document.getElementById('seatContainer01').append(selectBtn); 
    //  selectBtn.style.bottom='50px';

     selectBtn.style.position='absolute';
     
    
  }



  //todo Yes/No button inside modal (php later)
  // fix button position
  // button works only when seat selected!!

  
  function modalHide(selectModal, closeElement) {

        var selectBtn = document.getElementById('selectBtn');

        selectBtn.onclick = function() {
            selectModal.style.display = 'block';
        }

        closeElement.onclick = function() {
            selectModal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == selectModal) {
                selectModal.style.display = 'none';
            }
        }
    }
  
function makeModal() {
    let selectModal = document.createElement('div');
    selectModal.setAttribute('id', 'selectModal');
    selectModal.setAttribute('class', 'modal');

    let modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    

    let closeElement = document.createElement('span');
    closeElement.setAttribute('class', 'close');
    closeElement.insertAdjacentHTML('afterbegin','&times;');
    modalContent.appendChild(closeElement);

    let modalText = document.createElement('p')
    modalText.setAttribute('class', 'modalText');
    modalText.insertAdjacentHTML('afterbegin', 'Έχετε επιλέξει μια θέση είστε σίγουρος ότι θέλετε να συνεχίσετε για την κράτησή της; ' + '\n');
    let choosebtnYes= document.createElement('button');
    choosebtnYes.setAttribute('class','chbtn');
    let choosebtnNo= document.createElement('button');
    choosebtnNo.setAttribute('class','chbtn');
    let textYes =("Ναι");
    let textNo=("Όχι");
    choosebtnYes.insertAdjacentHTML('afterbegin',textYes);
    choosebtnNo.insertAdjacentHTML('afterbegin',textNo);
    modalContent.appendChild(modalText);
    modalContent.appendChild(choosebtnYes);
    modalContent.appendChild(choosebtnNo);
    
   
    
   


    selectModal.appendChild(modalContent);
    document.body.append(selectModal);
    modalHide(selectModal, closeElement);
    }

  function makeDesk(){
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

  const container = document.querySelector('.seatContainer');

  // Only one seat can be selected at a time
  container.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && validSeat() && !e.target.classList.contains('forbidden')) {
      e.target.classList.toggle('selected');
      }
      else if(e.target.classList.contains('seat') && (e.target.classList.contains('selected') && !validSeat())) {
        e.target.classList.remove('selected');
      }
  })

  function validSeat() {
      if (document.getElementsByClassName('selected').length>=1) {
        return false; 
      }
        return true;
  }


  window.onload = makeList();
  window.onload = makeSelectBtn();
  document.getElementById('selectBtn').addEventListener("click",makeModal);
 document.getElementById("chooseButton").addEventListener("click", validateList);
     