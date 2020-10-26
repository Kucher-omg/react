
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

// createTask('learn Js').then((data) => {
//     // debugger;
//    console.log(data); 
// });

function onTask(tasks) {
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = task.title;
        document.querySelector('#result2').appendChild(li);
    })
}


function onImages(data) {
    data.forEach(el => {
        const img = document.createElement('img');
        img.src = el.thumbnail;
        document.querySelector('#result').appendChild(img);
    })
}
