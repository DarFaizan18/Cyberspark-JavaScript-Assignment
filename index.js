// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

getUsersRequest().then((users) => {
  //This function has been implemented already for you
  const tableEl = document.getElementById("table");
  for (const user of users) {
    tableEl.appendChild(createTableRow(user));
  }
});

function addNewUser() {
  //TODO: Implement me
  const username = prompt("Add new user");
  if (username) {
    createUserRequest({
      name: username,
    })
      .then(() => {
        console.log("User created");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function editUser(id, userName) {
  //TODO: implement me
  const newUserName = prompt("Edit user");
  if (id && newUserName) {
    updateUserRequest({
      id,
      name: newUserName,
    })
      .then(() => {
        console.log("User Edit");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function deleteUser(id) {
  //TODO: implement me
  if (id && confirm("Are you Sure")) {
    deleteUserRequest(id)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//CRUD HELPER METHODS
function createUserRequest(user) {
  return fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

function getUsersRequest() {
  return fetch(baseUrl, {
    method: "GET",
  }).then((response) => response.json());
}

function deleteUserRequest(id) {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

function updateUserRequest(user) {
  return fetch(`${baseUrl}/${user.id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(user),
  }).then((response) => response.json());
}

//HELPER METHODS
function createTableRow(user) {
  var tr = document.createElement("tr");
  tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
  return tr;
}
