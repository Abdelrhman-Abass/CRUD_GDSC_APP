let addBtn = document.getElementById("submit-button");
let delAllBtn = document.getElementById("delAll")
let updateBtn = document.getElementById("update")


let name = document.getElementById('name')
let email = document.getElementById('email')
let address = document.getElementById('address')
let phone = document.getElementById('phone')

// initialize the array that will store in the localStorage
let arrayOfEmployees = [];
checkData()


addBtn.onclick = function () {
  if (name.value !== "" || email.value !== "" || address.value!== ""|| phone.value !=="" ) {
    addEmployeeToArray({name: name.value , email:email.value , address:address.value ,phone:phone.value}); // Add Employees To Array 
    addDataToPage()
    name.value = ""; // Empty Input Field
    email.value = ""; // Empty Input Field
    address.value = ""; // Empty Input Field
    phone.value = ""; // Empty Input Field
  }
  else{
    alert("Something went wrong, Please Check the Data")
  }

};

function addEmployeeToArray(employeeData){
    
    // init the object
    const employee = {
        id: Date.now(),
        name: employeeData.name,
        email: employeeData.email,
        address: employeeData.address,
        phone: employeeData.phone,
        };

    // push data we get the data from user 
    arrayOfEmployees.push(employee)
    addDataToLocalStorage(arrayOfEmployees);
}


function addDataToLocalStorage(){
    window.localStorage.setItem("Employee", JSON.stringify(arrayOfEmployees));
}




delAllBtn.onclick = ()=> deleteDataFromLocalStorage()


function deleteDataFromLocalStorage(){
    window.localStorage.removeItem('Employee');
    arrayOfEmployees = []
    addDataToPage()
}


function addDataToPage() {
    const tableBody = document.querySelector("#crudTable tbody");
    tableBody.innerHTML = "";

  
    arrayOfEmployees.forEach((element, index) => {
      tableBody.insertRow().innerHTML = `
        <td class"text-truncate">${element.name}</td>
        <td class"text-truncate">${element.email}</td>
        <td class"text-truncate">${element.address}</td>
        <td class"text-truncate">${element.phone}</td>
        <td>
          <button class="btn btn-danger me-2" onclick="deleteEmployeeWithIndex(${index})">Delete</button>
          <button class="btn btn-warning" onclick="updateDataWithIndex(${index})">Update</button>
        </td>
      `;
    });
  }
  

function checkData(){
    let data = window.localStorage.getItem("Employee")
    if (data) {
        arrayOfEmployees = JSON.parse(localStorage.getItem("Employee"));
        addDataToPage()
      };
}



window.onload=addDataToPage()

function deleteEmployeeWithIndex(index){
    arrayOfEmployees.splice(index, 1);
    addDataToLocalStorage(arrayOfEmployees);
    addDataToPage();
}

function updateDataWithIndex(index){
    let data = arrayOfEmployees[index]
    
    name.value = data.name;
    email.value = data.email; 
    address.value = data.address; 
    phone.value = data.phone; 

    addBtn.style.display="none"
    updateBtn.style.display="block"

    updateBtn.addEventListener('click' , ()=>{
        arrayOfEmployees[index].name =  name.value;
        arrayOfEmployees[index].email =  email.value;
        arrayOfEmployees[index].address =  address.value;
        arrayOfEmployees[index].phone =  phone.value;
        addDataToLocalStorage()
        addDataToPage()
        name.value = ''
        email.value = ''
        address.value = ''
        phone.value = ''
    })
    
}


  