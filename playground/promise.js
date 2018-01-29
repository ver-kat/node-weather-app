var asyncAdd = (a, b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
           if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
           } else {
               reject('args invalid')
           }
        }, 1500)
    });
};
asyncAdd(9,'3').then((res)=>{
    console.log(res);
    return asyncAdd(res, 33);
}).then((res)=>{
    console.log('value is ' + res);
}).catch((errorMessage)=>{
    console.log(errorMessage);
});

// asyncAdd(9,'3').then((res)=>{
//     console.log(res);
//     return asyncAdd(res, 33);
// }, (errorMessage)=>{
//     console.log(errorMessage);
// }).then((res)=>{
//     console.log('value is ' + res);
// },(errorMessage)=>{
//     console.log(errorMessage);
// });

// var somePromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         //resolve('it worked');
//         reject('it failed');
//     }, 2500);

// });

// somePromise.then((message)=>{
//     console.log('success', message);
// }, (errorMessage)=>{
//     console.log('error', errorMessage);
// })