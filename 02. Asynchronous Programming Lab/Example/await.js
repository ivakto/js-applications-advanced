async function start() { 
    console.log('begin');
    
    const p = new Promise((resolve) => {
        console.log('executor begins');
        setTimeout(resolve, 2000); // Понеже е таймер се изнася в API на интерпретатора
        console.log('executor ends');
    });

    await p;

    console.log('timer ends')
    console.log('end');
}

console.log('before start');
const result = start();
console.log("after start"); // В променливата result ни се връща Promise
// before start
// begin
// executor begins
// executor ends
// after start
// timer ends => await ще каже вземи кода, който остава след await и го изнеси в опашката
// end