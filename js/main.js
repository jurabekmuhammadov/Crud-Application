const groupsFilter = document.querySelector(".groups-select");
const groupsSelect = document.querySelector(".groups-select-modal");
const addStudentForm = document.querySelector(".add-student-form");
const studentTableBody = document.querySelector(".table-students tbody");
const studentModal = document.getElementById("studentModal");
const addStudentBtn = document.querySelector(".add-student-btn");
const openModal = document.querySelector(".open-modal");
const searchInput = document.querySelector(".search-input");
const addressFilter = document.querySelector(".address-filter");
const addressSelect = document.querySelector("#address");
const loading = document.querySelector(".loading");
let studentJson = localStorage.getItem(STUDENTS);
let students = JSON.parse(studentJson) || [];
let selected = null;
let search = "";
let category = "All";
let address = "Address";

groupsFilter.innerHTML += `<option value="All">All</option>`;
addressFilter.innerHTML += `<option value="Address">Address</option>`;
GROUPS.map((gr) => {
  groupsFilter.innerHTML += `<option value="${gr}">${gr}</option>`;
  groupsSelect.innerHTML += `<option value="${gr}">${gr}</option>`;
});
ADDRESS.map((ad) => {
  addressFilter.innerHTML += `<option value="${ad}">${ad}</option>`;
  addressSelect.innerHTML += `<option value="${ad}">${ad}</option>`;
});

addStudentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (this.checkValidity()) {
    let student = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      address: this.address.value,
      birthday: this.birthday.value,
      position: this.position.value,
      level: this.level.value,
      salary: this.salary.value,
      groups: this.groups.value,
      isMarried: this.isMarried.checked,
    };
    if (selected === null) {
      students.push(student);
    } else {
      students = students.map((std, i) => {
        if (i === selected) {
          return student;
        } else {
          return std;
        }
      });
    }
    bootstrap.Modal.getInstance(studentModal).hide();
    this.reset();
    location.reload();
  } else {
    this.classList.add("was-validated");
  }
  localStorage.setItem(STUDENTS, JSON.stringify(students));
  getStudents();
});

function getStudentRow(
  {
    firstname,
    lastname,
    birthday,
    address,
    position,
    level,
    salary,
    groups,
    isMarried,
  },
  id
) {
  return `
  <tr>
    <th scope="row">${id + 1}</th>
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${birthday}</td>
    <td>${address}</td>
    <td>${groups}</td>
    <td>${position}</td>
    <td>${level}</td>
    <td>${salary}$</td>
    <td>${isMarried === true ? "Yes" : "No"}</td>
    <td class="end">
      <button
      onClick="editStudent(${id})"
        type="button"
        class="btn btn-primary edit"
        data-bs-toggle="modal"
        data-bs-target="#studentModal"
      >
        <img src="img/edit-button.svg" alt="" /> Edit
      </button>
      <button onClick="deleteStudent(${id})" type="button" class="btn btn-danger delete">
        <img src="img/delete-button.svg" alt="" /> Delete
      </button>
    </td>
  </tr>
  `;
}

function getStudents() {
  let result = students.filter(
    (student) =>
      student.firstname.toLowerCase().includes(search) ||
      student.lastname.toLowerCase().includes(search)
  );
  if (category !== "All") {
    result = result.filter((student) => student.groups == category);
  }
  if (address !== "Address") {
    result = result.filter((student) => student.address == address);
  }
  studentTableBody.innerHTML = "";
  if (result.length !== 0) {
    result.map((student, id) => {
      studentTableBody.innerHTML += getStudentRow(student, id);
    });
  } else {
    studentTableBody.innerHTML = `<td class="no-students" colspan="12"><div class="text-center alert alert-warning" role="alert">
  No Students !
</div></td>`;
  }
}

getStudents();

function deleteStudent(id) {
  let check = confirm("Do you want to delete this student ?");
  if (check) {
    students.splice(id, 1);
    localStorage.setItem(STUDENTS, JSON.stringify(students));
    location.reload();
    getStudents();
  }
}

function editStudent(id) {
  selected = id;
  let {
    firstname,
    lastname,
    address,
    birthday,
    position,
    level,
    salary,
    groups,
    isMarried,
  } = students[id];
  addStudentForm.firstname.value = firstname;
  addStudentForm.lastname.value = lastname;
  addStudentForm.address.value = address;
  addStudentForm.birthday.value = birthday;
  addStudentForm.position.value = position;
  addStudentForm.level.value = level;
  addStudentForm.salary.value = salary;
  addStudentForm.groups.value = groups;
  addStudentForm.isMarried.checked = isMarried;
  addStudentBtn.textContent = "Save changes";
}

openModal.addEventListener("click", () => {
  addStudentForm.reset();
  selected = null;
  addStudentBtn.textContent = "Add";
});

searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  getStudents();
});

groupsFilter.addEventListener("change", function () {
  category = this.value;
  getStudents();
});

addressFilter.addEventListener("change", function () {
  address = this.value;
  getStudents();
});

setTimeout(() => {
  loading.classList.add("loading-none");
}, 3000);
