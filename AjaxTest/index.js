let a = 5;
console.log(a);
 
$.ajax('https://repetitora.net/api/JS/Images', {
    success: (data) => {
        data.forEach(el => {
            const img = document.createElement('img');
            img.src = el.thumbnail;
            document.querySelector('body').appendChild(img);
        })
        console.log(data);
    }
});

a = 8;

console.log(a);

// console.log('0');
// setTimeout(() => {
//     console.log('1');
// }, 1000);

// console.log('2');