// EMPTY: create an empty list
// QA a => Q [a]
function dsh_empty() {
  var jsonObject = { "type" : { "type_constructor" : "List" 
                             , "argument" : null
                             }
                   , "value" : []
                   };
  return jsonObject;
}

// NIL: create an empty list
// QA a => Q [a]
function dsh_nil() {
  return dsh_empty();
}

function dsh_singleton(a) {
  var bs = dsh_cons(a,dsh_empty());
  bs.type.argument = a.type;	// Set list argument = type of elements
  return as;
}

// CONS: add element e at head of a list
// forall a. QA a => Q a -> Q [a] -> Q [a]
function dsh_cons(e, as) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  bs.value.unshift(e);
  return bs;
}

// SNOC: add element e at the end of a list
// forall a. QA a => Q [a] -> Q a -> Q [a]
function dsh_snoc(as, e) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  bs.value.push(e);
  return bs;
}

// HEAD: extract the first row
// forall a. QA a => Q [a] -> Q a
function dsh_head(as) {
  if (as.value.length) return as.value[0];
  else throw new Error("Input is empty.");
}

// TAKE: take the first n elements of a list
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_take(n, as) {
  var l = as.value.length;
  if(l>=n) {
    var bs = dsh_empty();
    for(i=0; i<(l - n); i++) {
      bs.value.push(as.value[i]);
    }
  } else {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  }
  return bs;
}

// TAIL: extract the elements after the head of a list
// forall a. QA a => Q [a] -> Q [a]
function dsh_tail(list) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  bs.value.shift();
  return bs;
}

// DROP: drop the first n elements
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_drop(n, as) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  for(i=0; i<n; i++) {
    bs.value.shift();
  }
  return bs;
}

// MAP: applying f to each element of list
// forall a b. (QA a, QA b) => (Q a -> Q b) -> Q [a] -> Q [b]
function dsh_map(f, as) {
  var l = as.value.length;
  var bs = dsh_empty();
  for (i = 0; i < l; i++) {
    bs.value[i] = f(as.value[i]);
  }
  return bs;
}

// function dsh_map(f, as) {
//   if (as.value == null) return list_empty();
//   else return list_cons(f(list_head(as)),list_map(f,list_tail(as))) 
// }


// APPEND: append two tables
// forall a. QA a => Q [a] -> Q [a] -> Q [a]
function dsh_append(as, bs) {
  var cs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  var l = bs.value.length;
  for(i=0; i<l; i++) {
    cs.value.push(bs.value[i]);
  }
  return cs;
}

// FILTER: applied to a predicate and a list, returns the list of those elements that satisfy the predicate
// forall a. QA a => (Q a -> Q Bool) -> Q [a] -> Q [a]
function dsh_filter(f, as) {
  var bs = dsh_empty();
  var l = as.value.length;
  var j = 0;
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if (p.value) {
      bs.value[j] = as.value[i];
      j++;
    }
  }
  return bs;  
}
