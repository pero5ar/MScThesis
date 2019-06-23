// lst:callback
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doAnotherThing(newResult, function(finalResult) {
    console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);


// lst:promise
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doAnotherThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);


// lst:await
try {
  const result = await doSomething()
  const newResult = await doSomethingElse(result);
  const finalResult = await doAnotherThing(newResult);
  console.log('Got the final result: ' + finalResult);
} catch (err) {
  failureCallback(err);
}