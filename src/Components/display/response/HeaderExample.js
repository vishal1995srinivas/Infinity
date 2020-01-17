let header = { a: "Content-Type", b: "application/json" };
let one = header.a;
let two = header.b;
let three = { one: two };
console.log(three);
console.log(Object.keys(header));
console.log(one, two);
//console.log(JSON.stringify(list));
//console.log(header[0].key, header[0].value);
