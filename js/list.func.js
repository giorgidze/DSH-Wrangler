// EMPTY: create an empty list
// QA a => Q [a]
function dsh_empty() {
  var jsonObject = {"type" : { "type_constructor" : "List" 
                             , "argument" : null
                             }
                   , "value" : []
                   };
  if((dsh_empty.arguments[0] == "Bool") ||
     (dsh_empty.arguments[0] == "Char") ||
     (dsh_empty.arguments[0] == "Double") ||
     (dsh_empty.arguments[0] == "Integer") ||
     (dsh_empty.arguments[0] == "Unit") ||
     (dsh_empty.arguments[0] == "Text") ||
     (dsh_empty.arguments[0] == "List") ||
     (dsh_empty.arguments[0] == "Tuple")) {
    jsonObject.type.argument = new Object();
    jsonObject.type.argument.type_constructor = dsh_empty.arguments[0];
  }
  return jsonObject;
}

// NIL: create an empty list
// QA a => Q [a]
function dsh_nil() {
  return dsh_empty();
}

function dsh_singleton(e) {
  var bs = dsh_cons(e,dsh_empty());
  bs.type.argument = $.extend(true, {}, e.type);	// Set list argument (via deep copy) = type of element e
  return bs;
}

// CONS: add element e at head of a list
// forall a. QA a => Q a -> Q [a] -> Q [a]
function dsh_cons(e, as) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    if(as.type.argument == null) {
      bs.type.argument = $.extend(true, {}, e.type);	// Set list argument (via deep copy) = type of element e
    }
    if(JSON.stringify(e.type) == JSON.stringify(bs.type.argument)) {
      bs.value.unshift(e);
      return bs;
    } else {
      throw new Error("Input is not of same type.");
    }
  } else {
    throw new Error("Input is not of type list.");
  }
}

// SNOC: add element e at the end of a list
// forall a. QA a => Q [a] -> Q a -> Q [a]
function dsh_snoc(as, e) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    if(as.type.argument == null) {
      bs.type.argument = $.extend(true, {}, e.type);	// Set list argument (via deep copy) = type of element e
    }
    if(JSON.stringify(e.type) == JSON.stringify(bs.type.argument)) {
      bs.value.push(e);
      return bs;
    } else {
      throw new Error("Input is not of same type.");
    }
  } else {
    throw new Error("Input is not of type list.");
  }
}

// HEAD: extract the first row
// forall a. QA a => Q [a] -> Q a
function dsh_head(as) {
  if((as.type.type_constructor == "List")) {
    if (as.value.length) return as.value[0];
    else throw new Error("Input is empty.");
  } else {
    throw new Error("Input is not of type list.");
  }
}

// TAKE: take the first n elements of a list
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_take(n, as) {
  if((as.type.type_constructor == "List")) {
    var l = as.value.length;
    if(l>=n) {
      var bs = dsh_empty();
      bs.type.argument = $.extend(true, {}, as.type.argument);	// Deep copy of an object via jquery
      for(var i=0; i<n; i++) {
        bs.value.push(as.value[i]);
      }
    } else {
      var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// TAIL: extract the elements after the head of a list
// forall a. QA a => Q [a] -> Q [a]
function dsh_tail(as) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    bs.value.shift();
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// DROP: drop the first n elements
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_drop(n, as) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    for(var i=0; i<n; i++) {
      bs.value.shift();
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// MAP: applying f to each element of list
// forall a b. (QA a, QA b) => (Q a -> Q b) -> Q [a] -> Q [b]
function dsh_map(f, as) {
  if((as.type.type_constructor == "List")) {
    var l = as.value.length;
    var bs = dsh_empty();
    for (i = 0; i < l; i++) {
      bs.value[i] = f($.extend(true, {}, as.value[i]));
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// function dsh_map(f, as) {
//   if (as.value == null) return list_empty();
//   else return list_cons(f(list_head(as)),list_map(f,list_tail(as))) 
// }

// APPEND: append two tables
// forall a. QA a => Q [a] -> Q [a] -> Q [a]
function dsh_append(as, bs) {
  if((as.type.type_constructor == "List") && (as.type.type_constructor == "List")) {
    var cs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    var l = bs.value.length;
    for(var i=0; i<l; i++) {
      cs = dsh_snoc(cs, bs.value[i]);
    }
    return cs;
  } else {
    throw new Error("Input is not of type list.");
  }
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

// GROUPWITH 
// Ord b => (a -> b) -> [a] -> [[a]]
function dsh_groupWith(f, as) {
  var l = as.value.length;
  var groups = new Object();

  // create an associative array with the result of p as a key (the value of the key is also an array)
  // group the values in these keys (arrays)
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if(eval('groups.'+p.value+" == null")) {
      eval('groups.'+p.value+' = new Array()');
      eval('groups.'+p.value+'.push(as.value[i])');
    } else {
      eval('groups.'+p.value+'.push(as.value[i])');
    }
  }

  var bs = dsh_empty();                     // create a new list (contains the groups later)

  for (result in groups) {                  // create for every group ...
    var cs = dsh_empty();                   // a new list ...
    for(var k=0; k<groups[result].length; k++) {
      cs = dsh_snoc(cs,groups[result][k]);  // and fill with its elements
    }
    bs = dsh_snoc(bs, cs);                  // add the group to main list
  }

  return bs; 
}

// SORTWITH
// Ord b => (a -> b) -> [a] -> [a]
function dsh_sortWith(f, as) {
  var l = as.value.length;
  var groups = new Object();

  // create an associative array with the result of p as a key (the value of the key is also an array)
  // group the values in these keys (arrays)
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if(eval('groups.'+p.value+" == null")) {
      eval('groups.'+p.value+' = new Array()');
      eval('groups.'+p.value+'.push(as.value[i])');
    } else {
      eval('groups.'+p.value+'.push(as.value[i])');
    }
  }

  var bs = dsh_empty();                     // create a new list (contains the groups later)

  for (result in groups) {                  // and fill it with grouped elements ...
    for(var k=0; k<groups[result].length; k++) {
      bs = dsh_snoc(bs,groups[result][k]);  
    }
  }

  return bs
}

// THE
function dsh_the(as) {
  if((as.type.type_constructor == "List")) {
    var e = as.value[0];
    for(var i=1; i<as.value.length; i++) {
      if(JSON.stringify(e) != JSON.stringify(as.value[i])) {
        throw new Error("Non-identical elements.");
      }
    }
    return e;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// LAST: extract the last row
// forall a. QA a => Q [a] -> Q a
function dsh_last(as) {
  if((as.type.type_constructor == "List")) {
    var l = as.value.length;
    return as.value[(l - 1)];
  } else {
    throw new Error("Input is not of type list.");
  }
}

// INIT: all rows of a table expect the last one
// forall a. QA a => Q [a] -> Q [a]
function dsh_init(as) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    return bs.value.pop();
  } else {
    throw new Error("Input is not of type list.");
  }
}

// NULL: test whether a table is empty (zero rows)
// QA a => Q [a] -> Q Bool
function dsh_null(as) {
  if((as.type.type_constructor == "List")) {
    var l = as.value.length;
    if(l > 0) {
      return dsh_bool(false);
    } else {
      return dsh_bool(true);
    }
  } else {
    throw new Error("Input is not of type list.");
  }
}

// LENGTH: returns the number of rows
// QA a => Q [a] -> Q Integer
function dsh_length(as) {
  if((as.type.type_constructor == "List")) {
    return dsh_integer(as.value.length);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// index :: Q [a] -> Q Integer -> Q a
function dsh_index(as,i) {
  if((as.type.type_constructor == "List")) {
    var l = as.value.length;
    if(l>i) {
      return (as.value[i.value]);
    } else {
      throw new Error("Invalid index.");
    }
  } else {
    throw new Error("Input is not of type list.");
  }
}

// REVERSE: the rows of a table in reverse order
// forall a. QA a => Q [a] -> Q [a]
function dsh_reverse(as) {
  if((as.type.type_constructor == "List")) {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    return bs.value.reverse();
  } else {
    throw new Error("Input is not of type list.");
  }
}

// SPLITAT
// forall a. QA a => Q Integer -> Q [a] -> Q ([a], [a])
function dsh_splitAt(n,as) {
  if((as.type.type_constructor == "List")) {
    var bs = dsh_empty();
    bs = dsh_snoc(bs,dsh_take(n,as));
    bs = dsh_snoc(bs,dsh_drop(n,as));
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// TAKEWHILE
function dsh_takeWhile(f, as) {
  var bs = dsh_empty();
  var l = as.value.length;
  var j = 0;
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if (p.value) {
      bs.value[j] = as.value[i];
      j++;
    } else {
      break;
    }
  }
  return bs;  
}

// DROPWHILE
function dsh_dropWhile(f, as) {
  var bs = $.extend(true, {}, as);
  var l = as.value.length;
  for (i = 0; i < l; i++) {
    var p = f(as.value[i]);
    if (p.value) {
      bs = dsh_tail(bs);
    } else {
      break;
    }
  }
  return bs;  
}

// ELEM
// forall a. (Eq a, QA a) => Q a -> Q [a] -> Q Bool
function dsh_elem(e,as) {
  for(var i=0; i<as.value.length; i++) {
      if(JSON.stringify(e) == JSON.stringify(as.value[i])) return dsh_bool(true);
  }
  return dsh_bool(false);
}

// NOTELEM
// forall a. (Eq a, QA a) => Q a -> Q [a] -> Q Bool
function dsh_notElem(e,as) {
  for(var i=0; i<as.value.length; i++) {
      if(JSON.stringify(e) == JSON.stringify(as.value[i])) return dsh_bool(false);
  }
  return dsh_bool(true);
}

// ZIP
// forall a b. (QA a, QA b) => Q [a] -> Q [b] -> Q [(a, b)]
function dsh_zip(as, bs) {
  if((as.type.type_constructor == "List") && (bs.type.type_constructor == "List")) {
    var l = (as.value.length >= bs.value.length) ? bs.value.length : as.value.length;
    var cs = dsh_empty();
    for(var i=0; i<l; i++) {
      cs = dsh_snoc(cs, dsh_tuple(as.value[i],bs.value[i]));
    }
    return cs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// UNZIP
// forall a b. (QA a, QA b) => Q [(a, b)] -> Q ([a], [b])
function dsh_unzip(as) {
  if((as.type.type_constructor == "List")) {
    var m = as.value.length;
    var arr = new Array();
    for(var i=0; i<2; i++) {
      var cs = dsh_empty();
      for(var j=0; j<m; j++) {
        cs = dsh_snoc(cs,as.value[j].value[i]);
      }
      arr.push(cs);
    }
    return dsh_tuple(arr[0], arr[1]);    // make a tuple of lists
  } else {
    throw new Error("Input is not of type list.");
  }
}

// NUB
// forall a. (Eq a, QA a) => Q [a] -> Q [a]
function dsh_nub(as) {
  var bs = dsh_empty();
  var l = as.value.length;
  for(var i=0; i<l; i++) {
    if(!dsh_cond(dsh_elem(as.value[i],bs),false,true)) {
      bs = dsh_snoc(bs,as.value[i]);
    }
  }
  return bs;
}
