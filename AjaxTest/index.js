
const result = document.getElementById('#result');
const pageNumber = document.querySelector('#page-number');
const clickButton = document.querySelector('#click-me');

clickButton.addEventListener("click", () => {
    const promise = getImages(pageNumber.value);
    promise.then(onData);
});

function onData(data) {
    data.forEach(el => {
        const img = document.createElement('img');
        img.src = el.thumbnail;
        document.querySelector('#result').appendChild(img);
    })
}
