// Question 1
/*
async function fetchData() {
    let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return data.json();
}

fetchData().then(data => console.log(data));
*/



//Question 2
/*async function fetchData() {
    let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return data.json();
}

fetchData().then(data => {
    console.log(data["userId"]);
    setTimeout(() => {
        console.log(data["id"]);
        setTimeout(() => {
            console.log(data["title"]);
            setTimeout(() => {
                console.log(data["completed"]);
            }, 4000)
        }, 3000)
    }, 2000)
});*/



// Question 3
/*async function fetchData() {
    return (await fetch("https://jsonplaceholder.typicode.com/todos/1")).json();
}

async function processData() {
    try{
        let data = await fetchData();
        console.log(data);
    }catch (err){
        console.log(err);
    }
}

processData();*/



// Question 4
/*function fetchData() {
    return new Promise((resolve, reject) => {
        let data = fetch("https://jsonplaceholder.typicode.com/todos/1");
        data.then((response) => {
            if (response.ok) {
                resolve(response.json());
            }
            else{
                reject("Failed to fetch data");
            }
        })
    });
}

fetchData().then(data => {
    console.log(data);
});*/



// ሙከራ
/*function fetchData(){
    return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => {return res.json()});
}


fetchData().then(data => {
    console.log(data);
});*/
