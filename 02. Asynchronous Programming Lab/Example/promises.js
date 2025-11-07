console.log('before promise'); // 1

const myPromise = new Promise(executor);
// executor функцията се изпълнява незабавно и синхронно


myPromise
    .then((data) => console.log('promise resolved'))
    .catch((error) => console.log('promise rejected'))
    .finally(() => console.log('promise settled'));

console.log('after promise'); //3

function executor(resolve, reject) {
    console.log('inside executor'); //2
    
    // Тука имаме две асинхронни функции. Предават се на Web API за обработка, а стека продължава напред
    setTimeout(resolve, 2000);
    // setTimeout(reject, 2000);

    // Resolve печели: Event Loop взема първата готова задача от опашката и я премества в Call Stack. 
    // При Promises, веднъж щом състоянието се промени (от Pending към Resolved или Rejected), то не може да бъде променено отново.
    // Затова reject се игнорира
}