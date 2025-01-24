

const folderList = document.getElementById('folderList');
const fileList = document.getElementById('fileList');
const addFolderBtn = document.getElementById('addFolderBtn');
const addFileBtn = document.getElementById('addFileBtn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const itemNameInput = document.getElementById('itemName');
const saveBtn = document.getElementById('saveBtn');
const closeModal = document.querySelector('.close');
const currenFolderTitle = document.getElementById('currentFolder');

let folders = [];
let files = [];
let currentFolder = null;
let editMode = false;
let editType = null;
let editId = null;


function init() {
    const storeFolders = localStorage.getItem('folders');
    const storedFiles = localStorage.getItem('files');
    folders = storeFolders ? JSON.parse(storeFolders) : [];
    files = storedFiles ? JSON.parse(storedFiles) : [];
    renderFolders();
    renderFiles();
}

 // ito yung sidebar
function renderFolders() {
    folderList.innerHTML = '';

    const allFilesLi = document.createElement('li');
    allFilesLi.textContent = 'All Files';
    allFilesLi.classList.add(currentFolder === null ? 'active' : '');
    allFilesLi.addEventListener('click', () => {
        currentFolder = null;
        currenFolderTitle.textContent = 'All Files';
        renderFolders();
        renderFiles();
    });
    folderList.appendChild(allFilesLi);

    folders.forEach(folder => {
        const li = document.createElement('li');
        li.textContent = folder.name;
        if (currenFolder === folder.id) {
            li.classList.add('active');
        }

        // ito pag clinick mo yung or open yung folder
        li.addEventListener('click', () => {
            currentFolder = folder.id;
            currenFolderTitle.textContent = folder.name;
            renderFolders();
            renderFiles();
        });

        li.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e,pageX, e.pageX, 'folder', folder.id);
        });

        folderList.appendChild(li);
    });
}


function renderFiles() {
    fileList.innerHTML = '';
    let filteredFiles = files;
    if (currentFolder !== null) {
        filteredFiles = files.filter(file => file.folderId === currentFolder);
    }

    if (filteredFiles.length === 0) {
        fileList.innerHTML = '<p>Wala Files po dito Thank you.</p>';
        return;
    }

    filteredFiles.forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.classList.add('file-item');


        const fileName = document.createElement('p');
        fileName.textContent = file.name;
        fileDiv.appendChild(fileName);


        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        renameBtn = document.createElement('button');
        renameBtn.innerHTML = '&#9998';
        renameBtn.title = 'Rename';
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal('Rename File', file.name, 'file', file.id);
        });


        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10060';
        deleteBtn.title = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem('file', file.id);
        });


        actionsDiv.appendChild(renameBtn);
        actionsDiv.appendChild(deleteBtn);
        fileDiv.appendChild(actionsDiv);

        fileList.appendChild(fileDiv);
    });



    addFolderBtn.addEventListener('click', () => {
        openModal('Add Folder', '', 'folder');
    });


    addFileBtn.addEventListener('click', () => {
        if (currentFolder === null) {
            alert('Pumili ka ng folder hehe Thank you po.');
            return;
        }

        openModal('Add File', '', 'file');
    });


    function openModal(title, name, type, id = null) {
        modalTitle.textContent = title;
        itemNameInput.value = name;
        modal.style.display = 'block';
        editMode = name !== '';
        editType = type;
        editId = id;
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        editMode = false;
        editType = null;
        editId = null;
    });


    saveBtn.addEventListener('click', () => {
        const name = itemNameInput.value.trim();
        if (name === '') {
            alert('Pangalan mo ay wala hehe Thank you po');
            return;
        }

        if (editMode) {

            if (editType === 'folder') {
                const folder = folders.find(f => f.id === editId);
                if (folder) {
                    folder.name = name;
                }
            
            } else if (editType === 'file') {
                const file = files.find(f => f.id ===  editId);
                if (file) {
                    file.name = name;
                }
            }
            
        } else {
            
            if (editType === 'folder') {
                const newFolder = {
                    id: Date.now(),
                    name: name
                };
                folders.push(newFolder);
            } else if (editType === 'file') {
                const newFile = {
                    id: Date.now(),
                    name: name,
                    folderId: currentFolder
                };
                files.push(newFile);
            }
        }


        saveData();
        renderFolders();
        renderFiles();
        modal.style.display = 'none';
        editMode = false;
        editType = null;
        editId = null;
    });


    function saveData() {
        localStorage.setItem('folders', JSON.stringify(folders));
        localStorage.setItem('files', JSON.stringify(files));
    }


    function deleteItem(type, id) {

        if (type === 'folder') {

            files = files.filter(f => f.folderId !== id);
            folders = folders.filter(f => f.id !== id);

            if(currentFolder === id) {
                currentFolder = null;
                currenFolderTitle.textContent = 'All Files';
            }
        } else if (type === 'file') {
            files = files.filter(f => f.id !== id);
        }

        saveData();
        renderFolders();
        renderFiles();
    }

    function showContextMenu(x, y, type, id) {

        const action = prompt(`Right-click on ${type}. Enter "rename" or "delete":`);
        if (action === 'rename') {
            if (type === 'folder') {
                const folder = folders.find(f => f.id === id);
                if (folder) {
                    openModal('Rename Folder', folder.name, 'folder', id)
                }
            }
        }
    }
}

