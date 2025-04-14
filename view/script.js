const start = () => {
    fetch('http://localhost:3000/orak')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba történt az adatok lekérésekor');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            // Az adatokat átalakítjuk a megfelelő formátumra
            console.log(data)
            const formattedData = formatData(data);
            populateTable(formattedData);
        })
        .catch(error => console.error('Hiba az adatok lekérésekor:', error));
};

start();
function formatData(data) {
    // Az adatokat napok szerint csoportosítjuk
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.day]) {
            groupedData[item.day] = { day: item.day, classes: [] };
        }
        groupedData[item.day].classes.push({
            number: item.classesnumber,
            subject: item.classessubject,
        });
    });

    // Az objektumot tömbbé alakítjuk
    return Object.values(groupedData);
}
function populateTable(data) {
    const table = document.getElementById('orarendTable');
    const tableBody = table.querySelector('tbody');

    // Töröljük az esetleges korábbi adatokat
    tableBody.innerHTML = '';

    // Sorok (óraszámok és tantárgyak)
    const maxClasses = Math.max(...data.map(day => day.classes.length)); 
    for (let i = 1; i <= maxClasses; i++) {
        const row = document.createElement('tr');

        // Óraszám 
        const hourCell = document.createElement('th');
        hourCell.textContent = i;
        row.appendChild(hourCell);

        // Tantárgyak
        data.forEach(day => {
            const cell = document.createElement('td');
            const classItem = day.classes.find(c => c.number === i);
            if (classItem) {
                cell.textContent = classItem.subject;

                // Szerkesztés és törlés gombok
                const editButton = document.createElement('button');
                editButton.textContent = 'Szerkesztés';
                editButton.addEventListener('click', () => editLesson(day.day, i));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Törlés';
                deleteButton.addEventListener('click', () => deleteLesson(day.day, i));

                cell.appendChild(editButton);
                cell.appendChild(deleteButton);
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    }
}

function addLesson(day, hour, subject) {
    const dayData = Orarend.find(d => d.day === day);
    if (dayData) {
        // Toljuk az utána következő órákat eggyel későbbre
        dayData.classes.forEach(classItem => {
            if (classItem.number >= hour) {
                classItem.number += 1;
            }
        });

        // Adjuk hozzá az új órát
        dayData.classes.push({ number: hour, subject });

        // Rendezés óraszám szerint
        dayData.classes.sort((a, b) => a.number - b.number);

        // Frissítsük a táblázatot
        populateTable(Orarend);
    }
}

function deleteLesson(day, hour) {
    const dayData = Orarend.find(d => d.day === day);
    if (dayData) {
        // Az adott óra tantárgyát üresre állítjuk
        const classItem = dayData.classes.find(c => c.number === hour);
        if (classItem) {
            classItem.subject = ''; // Üres tantárgy
        }

        // Frissítsük a táblázatot és mentsük el az adatokat
        populateTable(Orarend);
        saveOrarend();
    }
}

function editLesson(day, hour) {
    const dayData = Orarend.find(d => d.day === day);
    if (dayData) {
        const classItem = dayData.classes.find(c => c.number === hour);
        if (classItem) {
            const newSubject = prompt('Add meg az új tantárgy nevét:', classItem.subject);
            if (newSubject) {
                classItem.subject = newSubject;
                populateTable(Orarend);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateTable(Orarend);

    const addLessonForm = document.getElementById('addLessonForm');
    addLessonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const day = document.getElementById('day').value;
        const hour = parseInt(document.getElementById('hour').value, 10);
        const subject = document.getElementById('subject').value;
        addLesson(day, hour, subject);
        addLessonForm.reset();
    });
});