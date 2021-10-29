var studentformdetails = document.getElementById('studentformdetails');
studentformdetails.addEventListener('submit',savestudentdata);

//function for save student data

function savestudentdata(e){
    
    
    var d=new Date();
    var getId=d.getTime();

    var std = {
        //get id automatically 
        id:getId,
        student_name: document.getElementById('student_name').value,
        Streams: document.getElementById('Streams').value,
        Marks: document.getElementById('Marks').value,
        uni_number: document.getElementById('uni_number').value
    }
//store in std table its store in array and push in std variable 
    if(localStorage.getItem('Students')===null){
        var Students=[];
        Students.push(std);
        
    }else{
        var Students=JSON.parse(localStorage.getItem('Students'));
        Students.push(std);
        localStorage.setItem('Students', JSON.stringify(Students));
    }
    document.getElementById('exampleModalCenter').close();
    document.getElementById('studentformdetails').reset();
    showstdData();
    e.preventDefault();
}

// search function
function searchfun() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("t-body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
// Displaying 

window.onload = function(){
    this.showstdData();
}

function showstdData(){
    var tbody = document.getElementById('t-body');
    var Students = JSON.parse(localStorage.getItem('Students'));
    
    var eachstdRow = ' ';
    for(let i=0;i<Students.length;i++){
        eachstdRow += 
        `<tr>
            <th scope="row">${i}</th>
                <td>${Students[i].student_name}</td>
                <td>${Students[i].Streams}</td>
                <td>${Students[i].Marks}</td>
                <td>${Students[i].uni_number}</td>
                <td>
                    <button id="${Students[i].id}" onclick="editstd(this.id, this)" class="btn btn-sm btn-primary" title="Edit" ><i class="fa fa-pencil "></i></button>
                    <button id="${Students[i].id}" onclick="deletestd(this.id)" class="btn btn-sm btn-danger" title="Delete"><i class="fa fa-trash"></i></button>
                </td>
        </tr>`;
    }
    tbody.innerHTML = eachstdRow;
}

// Deleting From Local Storage  

function deletestd(id){
    var Students = JSON.parse(localStorage.getItem('Students'));

    for(let i=0;i<Students.length;i++){
        if(Students[i].id == id){
            Students.splice(i, 1);
        }
    }
    localStorage.setItem('Students', JSON.stringify(Students));
    showstdData();
}

// Editing and saving the std Data
function editstd(id, selectedrow){
    var Students = JSON.parse(localStorage.getItem('Students'));

    var activeRow = selectedrow.parentElement.parentElement.rowIndex;
    

    var tbody = document.getElementById('t-body').children[activeRow-1];
    var eachstdRow = ' ';

    for(let i=0;i<Students.length;i++){
        if(id == Students[i].id){
            eachstdRow += 
            `<tr>
                <th scope="row">${i}</th>
                    <td><input type="text" id="edit_std_name" value="${Students[i].student_name}" /></td>
                    <td><input type="text" id="edit_std_email" value="${Students[i].Streams}" /></td>
                    <td><input type="text" id="edit_std_mobile" value="${Students[i].Marks}" /></td>
                    <td><input type="text" id="edit_std_address" value="${Students[i].uni_number}" /></td>
                    <td>
                        <button id="${Students[i].id}" onclick="saveEditstd(this.id)" class="btn btn-sm btn-success edit" title="Save"><i class="fa fa-save"></i></button>
                        <button onclick="cancelEditstd()" class="btn btn-sm btn-warning text-white" title="Cancel">X</button>
                    </td>
            </tr>`;
        }
    }
    tbody.innerHTML = eachstdRow;
}
// save the edited data
function saveEditstd(id){
    var Students = JSON.parse(localStorage.getItem('Students'));
    
    for(let i=0;i<Students.length;i++){
        if(Students[i].id==id){
            Students[i].id=id;
            Students[i].student_name = document.getElementById('edit_std_name').value;
            Students[i].Streams = document.getElementById('edit_std_email').value;
            Students[i].Marks = document.getElementById('edit_std_mobile').value;
            Students[i].uni_number = document.getElementById('edit_std_address').value;
        }
    }
    localStorage.setItem('Students', JSON.stringify(Students));
    showstdData();
}

function cancelEditstd(){
    showstdData();
}
