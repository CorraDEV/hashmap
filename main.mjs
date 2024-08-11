import HashMap from "./Hashmap.mjs";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
console.log(test);
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('cat', 'blue');
test.set('grape', 'gold');
test.set('lion', 'golden');
test.set('lion', 'green');
test.set('tiger', 'pippo');
console.log(test.remove('elephant'));
console.log(test);
console.log(test.has('cat'));
test.clear();
console.log(test);