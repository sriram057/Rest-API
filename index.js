const noteTitle = document.getElementById("title");
const noteDescription = document.getElementById("description");
let totalNotes = 0;
let showing = totalNotes;
const serverURL = "https://crudcrud.com/api/ac95a91a694e4503b1dd696b6da61865/bookdetails";

//function to handle form submission
function handleNoteSubmit(event) {
    event.preventDefault();
    const noteDetails = {
        title: noteTitle.value,
        description: noteDescription.value
    };
    axios.post(serverURL, noteDetails)
        .then((result) => {
            totalNotes++;
            showing = totalNotes;
            displayNotesValue();
            displayShowingValue();
            displayNoteDetailsOnDashboard(noteDetails);
        }).catch((err) => {
            console.error("Wrong server URL", err);
            alert("Storing data failed");
        });

    //clearing the input fields
    noteTitle.value = "";
    noteDescription.value = "";
}

//function to display note details on the dashboard
function displayNoteDetailsOnDashboard(noteDetails) {
    const li = document.createElement("li");
    li.className = "notes";
    li.appendChild(
        document.createTextNode(
            `${noteDetails.title}  `
        )
    );
    li.appendChild(
        document.createTextNode(
            `- ${noteDetails.description}  `
        )
    )

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.appendChild(deleteBtn);
    const ul = document.querySelector("#noteList");
    ul.appendChild(li);

    //delete button functionality
    deleteBtn.addEventListener("click", (event) => {
        axios.delete(${serverURL}/${noteDetails._id})
            .then((result) => {
                ul.removeChild(event.target.parentElement);
                totalNotes--;
                showing = totalNotes;
                displayNotesValue();
                displayShowingValue();
            }).catch((err) => {
                console.error("Wrong server URL", err);
                alert("Deletion failed");
            });

    })
}

//search functionality (i.e., filter functionality in this case)
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", function (event) {
    let visibleNotes = 0;
    const searchBarText = event.target.value.toLowerCase();
    const noteList = document.getElementsByClassName("notes");
    for (let i = 0; i < noteList.length; i++) {
        const noteListText = noteList[i].firstChild.textContent.toLowerCase();
        if (noteListText.indexOf(searchBarText) === -1) {
            noteList[i].style.display = "none";
        } else {
            noteList[i].style.display = "flex";
            visibleNotes++;
        }
    }
    showing = visibleNotes;
    displayShowingValue();
});

//function to load details on dashboard on page reload
window.addEventListener("DOMContentLoaded", () => {
    axios.get(serverURL)
        .then((result) => {
            for (let i = 0; i < result.data.length; i++) {
                displayNoteDetailsOnDashboard(result.data[i]);
                totalNotes++;
                showing++;
                displayNotesValue();
                displayShowingValue();
            }
        }).catch((err) => {
            console.error("Wrong server URL", err);
            alert("unable to fetch data");
        });
})

//function to display total number of notes
function displayNotesValue() {
    const totalNotesValue = document.getElementById("totalNotesValue");
    totalNotesValue.innerText = totalNotes;
}

//function to display number of notes being displayed on dashboard
function displayShowingValue() {
    const showingValue = document.getElementById("showingValue");
    showingValue.innerText = showing;
}