

function getPostTime (time){
    const hours = parseInt(time / 3600);
    const remainingTime = (time % 3600);
    const minute = parseInt(remainingTime / 60);
    const second = (remainingTime % 60);
    return `${hours} : ${minute} : ${second} sec ago`
}

console.log(getPostTime(4630))