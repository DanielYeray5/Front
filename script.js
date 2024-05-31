const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const updateSelect = document.getElementById('updateSelect');
const deleteSelect = document.getElementById('deleteSelect');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const nombres = formData.get('Nombre');
    try {
        const response = await fetch('https://ejercicio-7xae.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Nombre: nombres })
        });
        const data = await response.json();
        console.log(data);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario agregado",
            showConfirmButton: false,
            timer: 1500
        });
        getUserList();
    } catch (error) {
        console.error(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrio un erorr",
            showConfirmButton: false,
            timer: 1500
        });
    }
});

async function getUserList() {
    try {
        const response = await fetch('https://ejercicio-7xae.onrender.com');
        const data = await response.json();
        console.log(data);
        renderUserList(data);
    } catch (error) {
        console.error(error);
    }
}

function renderUserList(users) {
    userList.innerHTML = '';
    updateSelect.innerHTML = '';
    deleteSelect.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement('div');
        div.textContent = `ID: ${user.ID} - Nombre: ${user.Nombre}`;
        userList.appendChild(div);

        const updateOption = document.createElement('option');
        updateOption.textContent = `ID: ${user.ID} - Nombre: ${user.Nombre}`;
        updateOption.value = user.ID;
        updateSelect.appendChild(updateOption);

        const deleteOption = document.createElement('option');
        deleteOption.textContent = `ID: ${user.ID} - Nombre: ${user.Nombre}`;
        deleteOption.value = user.ID;
        deleteSelect.appendChild(deleteOption);
    });
}

async function updateUser() {
    const ID = updateSelect.value;
    const Nombre = prompt('Ingresa otro nombre:');
    if (!Nombre) return;
    try {
        const response = await fetch('https://ejercicio-7xae.onrender.com', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID, Nombre })
        });
        const data = await response.json();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(data);
        getUserList();
    } catch (error) {
        console.error(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrio un error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

async function deleteUser() {
    const ID = deleteSelect.value;
    if (!confirm('De click en aceptar para continuar')) return;
    try {
        const response = await fetch('https://ejercicio-7xae.onrender.com', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID })
        });
        const data = await response.json();
        console.log(data);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado correctamente",
            showConfirmButton: true
        });
        getUserList();
    } catch (error) {
        console.error(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrio un error",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

getUserList();
