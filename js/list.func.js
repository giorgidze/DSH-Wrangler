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

function dsh_singleton(e) {
  var bs = dsh_cons(e,dsh_empty());
  bs.type.argument = e.type;	// Set list argument = type of elements
  return bs;
}

// CONS: add element e at head of a list
// forall a. QA a => Q a -> Q [a] -> Q [a]
function dsh_cons(e, as) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  if(as.type.argument == null) {
    bs.type.argument = e.type;
  }
  if(JSON.stringify(e.type) == JSON.stringify(as.type.argument)) {
    bs.value.unshift(e);
    return bs;
  } else {
    throw new Error("Input is not of same type.");
  }
}

// SNOC: add element e at the end of a list
// forall a. QA a => Q [a] -> Q a -> Q [a]
function dsh_snoc(as, e) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  if(as.type.argument == null) {
    bs.type.argument = e.type;
  }
  if(JSON.stringify(e.type) == JSON.stringify(as.type.argument)) {
    bs.value.push(e);
    return bs;
  } else {
    throw new Error("Input is not of same type.");
  }
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

// TODO
function dsh_groupWith(f, as) {
  var l = as.value.length;
  var groups = new Object();

  // create an associative array with the result of p as a key (the value of the key is also an array)
  // group the values in these keys (arrays)
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if(!eval('groups.'+p.value)) {
      eval('groups.'+p.value+' = new Array()');
      eval('groups.'+p.value+'.push(as.value[i])');
    } else {
      eval('groups.'+p.value+'.push(as.value[i])');
    }
  }

  var bs = dsh_empty();                     // new list (contains the groups later)
  for (j=0; j < groups.length; j++) {
    var cs = dsh_empty();                   // create a new list for every group
    for(k=0; k<groups[j]; k++) {
      cs = dsh_snoc(cs,groups[j][k]));      // fill group list with elements
    }
    bs = dsh_snoc(bs, cs);                  // add group to main list
  }

  return bs; 
}


function dsh_sortWith(f, as) {
  // TODO
}

// LAST: extract the last row
// forall a. QA a => Q [a] -> Q a
function dsh_last(as) {
  var l = list.value.length;
  return as.value[(l - 1)];
}

// INIT: all rows of a table expect the last one
// forall a. QA a => Q [a] -> Q [a]
function dsh_init(as) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  return bs.value.pop();
}

// NULL: test whether a table is empty (zero rows)
// QA a => Q [a] -> Q Bool
function dsh_null(as) {
  var l = as.value.length;
  if(l > 0) {
    return false;
  } else {
    return true;
  }
}

// LENGTH: returns the number of rows
// QA a => Q [a] -> Q Integer
function dsh_length(as) {
  return dsh_integer(as.value.length);
}

// index :: Q [a] -> Q Integer -> Q a
function dsh_index(as,i) {
  return (as.value[i.value]);
}

// REVERSE: the rows of a table in reverse order
// forall a. QA a => Q [a] -> Q [a]
function dsh_reverse(as) {
  var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
  return bs.value.reverse();
}
