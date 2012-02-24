// EMPTY: create an empty list
// QA a => Q [a]
function dsh_empty() {
  var jsonObject = {"type" : {"type_constructor" : "List"}
             , "value" : null,
             };
  return jsonObject;
}

// NIL: create an empty list
// QA a => Q [a]
function dsh_nil() {
  return dsh_empty();
}

function dsh_singleton(a) {
  return dsh_cons(a,list_empty());
}

// CONS: add element e at head of a list
// forall a. QA a => Q a -> Q [a] -> Q [a]
function dsh_cons(e, as) {
  var bs = new Array();
  bs.concat(as);
  bs.value.unshift(e);
  return bs;
}

// SNOC: add element e at the end of a list
// forall a. QA a => Q [a] -> Q a -> Q [a]
function dsh_snoc(as, e) {
  var bs = new Array();
  bs.concat(as);
  bs.value.push(e);
  return bs;
}

// HEAD: extract the first row
// forall a. QA a => Q [a] -> Q a
function dsh_head(as) {
  if (as.value != null) return as.value[0];
  else throw new Error("Input is empty.");
}

// TAKE: take the first n elements of a list
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_take(n, as) {
  var l = as.value.length;
  var bs = new Array();
  if(l>=n) {
    for(i=0; i<(l - n); i++) {
      bs.value.push(as.value[i]);
    }
  } else {
    bs.concat(as);
  }
  return bs;
}

// TAIL: extract the elements after the head of a list
// forall a. QA a => Q [a] -> Q [a]
function dsh_tail(list) {
  var bs = new Array();
  bs.concat(as);
  bs.value.shift();
  return bs;
}

// DROP: drop the first n elements
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_drop(n, as) {
  var bs = [].concat(as);
  for(i=0; i<n; i++) {
    bs.value.shift();
  }
  return bs;
}

// MAP: applying f to each element of list
// forall a b. (QA a, QA b) => (Q a -> Q b) -> Q [a] -> Q [b]
function dsh_map(f, as) {
  var l = as.value.length;
  var bs = new Array();
  for (i = 0; i < l; i++) bs[i] = f(as.value[i]);
  return bs;
}

// function dsh_map(f, as) {
//   if (as.value == null) return list_empty();
//   else return list_cons(f(list_head(as)),list_map(f,list_tail(as))) 
// }
