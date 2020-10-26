
const result = document.getElementById('#result');
const pageNumber = document.querySelector('#page-number');
const clickButton = document.querySelector('#click-me');
const getTask =  document.querySelector('#click-me2');

clickButton.addEventListener("click", () => {
    const promise = getImages(pageNumber.value);
    promise.then(onImages);
});

getTask.addEventListener("click", () => {
    const promise = getTasks();
    promise.then(onTask);
});
// updateTask('Learn HTMl','7b3118c8-82cd-4b43-ad7d-89217246987a');
// deleteTask('4c69dd31-150b-429d-bd48-b0810741edaf');
// createTask('learn HTML').then((data) => {
//     // debugger;
//    console.log(data); 
// });

function onTask(tasks) {
    const result = document.querySelector('#result2');
    result.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = task.title;
        li.dataset.id = task.id;
        result.appendChild(li);
    })
}




function onImages(data) {
    data.forEach(el => {
        const img = document.createElement('img');
        img.src = el.thumbnail;
        document.querySelector('#result').appendChild(img);
    })
}
