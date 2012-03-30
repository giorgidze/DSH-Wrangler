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
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
    if (as.value.length) return as.value[0];
    else throw new Error("Input is empty.");
  } else {
    throw new Error("Input is not of type list.");
  }
}

// TAKE: take the first n elements of a list
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_take(n, as) {
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    if(l>=n) {
      var bs = dsh_empty();
      bs.type.argument = $.extend(true, {}, as.type.argument);	// Deep copy of an object via jquery
      for(var i=0; i<n; i++) {
        bs.value.push(as.value[i]);
      }
    } else if(n==0) {
	  var bs = dsh_empty();
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
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    if(l>1) {
      var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
      bs.value.shift();
    } else { 	// If there is only one element
	  var bs = dsh_empty();
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// DROP: drop the first n elements
// forall a. QA a => Q Integer -> Q [a] -> Q [a]
function dsh_drop(n, as) {
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    if(l>n) {
      var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
      for(var i=0; i<n; i++) {
        bs.value.shift();
      }
    } else {
	  var bs = dsh_empty();
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// MAP: applying f to each element of list
// forall a b. (QA a, QA b) => (Q a -> Q b) -> Q [a] -> Q [b]
function dsh_map(f, as) {
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    var bs = dsh_empty();
    for (i = 0; i < l; i++) {
      bs = dsh_snoc(bs, f($.extend(true, {}, as.value[i])));
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
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var l = as.value.length;
    for (i = 0; i < l; i++) {
      var p = dsh_cond(f(as.value[i]),false,true);
      if (p) {
        bs = dsh_snoc(bs, as.value[i]);
      }
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
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
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    return as.value[(l - 1)];
  } else {
    throw new Error("Input is not of type list.");
  }
}

// INIT: all rows of a table expect the last one
// forall a. QA a => Q [a] -> Q [a]
function dsh_init(as) {
  if(as.type.type_constructor == "List") {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    bs.value.pop();
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// NULL: test whether a table is empty (zero rows)
// QA a => Q [a] -> Q Bool
function dsh_null(as) {
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
    return dsh_integer(as.value.length);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// index :: Q [a] -> Q Integer -> Q a
function dsh_index(as,i) {
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
    var bs = $.extend(true, {}, as);	// Deep copy of an object via jquery
    bs.value.reverse();
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// LIST AND
// Q [Bool] -> Q Bool
function dsh_list_and(as){
  if(as.type.type_constructor == "List") {
    var bs = dsh_bool(true);
    var l = as.value.length;
    for(var i=0; i<l; i++) {
      bs = dsh_and(bs,as.value[i]);
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// LIST OR
// Q [Bool] -> Q Bool
function dsh_list_or(as){
  if(as.type.type_constructor == "List") {
    var bs = dsh_bool(false);
    var l = as.value.length;
    for(var i=0; i<l; i++) {
      bs = dsh_or(bs,as.value[i]);
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// ANY
// QA a => (Q a -> Q Bool) -> Q [a] -> Q Bool
function dsh_any(f, as) {
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    for(i = 0; i < l; i++) {
      var p = dsh_cond(f(as.value[i]),false,true);
      if(p) {
        return dsh_bool(true);  
      }
    }
    return dsh_bool(false);  
  } else {
    throw new Error("Input is not of type list.");
  }
}

// ALL
// QA a => (Q a -> Q Bool) -> Q [a] -> Q Bool
function dsh_all(f, as) {
  if(as.type.type_constructor == "List") {
    var l = as.value.length;
    for(i = 0; i < l; i++) {
      var p = dsh_cond(dsh_not(f(as.value[i])),false,true);
      if(p) {
        return dsh_bool(false);  
      }
    }
    return dsh_bool(true);  
  } else {
    throw new Error("Input is not of type list.");
  }
}

// SUM
// forall a. (QA a, Num a) => Q [a] -> Q a
function dsh_sum(as){
  if(as.type.type_constructor == "List") {
    var sum = 0;
    var l = as.value.length;
    for(var i=0; i<l; i++) {
      if(as.value[i].type.type_constructor == "Integer") {
        sum += parseInt(as.value[i].value);
      } else {
        throw new Error("List element is not of type integer.");
      }
    }
    return dsh_integer(sum);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// CONCAT
// forall a. QA a => Q [[a]] -> Q [a]
function dsh_concat(as){
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var l = as.value.length;
    for(var i=0; i<l; i++) {
      if(as.value[i].type.type_constructor == "List") {
        bs = dsh_append(bs,as.value[i]);
      } else {
        throw new Error("Input is not of type list.");
      }
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// MINIMUM
// forall a. (QA a, Ord a) => Q [a] -> Q a
function dhc_minimum(as) {
  if(as.type.type_constructor == "List") {
    var min_value = as.value[0];
    for(var i=1; i<as.value.length; i++) {
      var cur_value = as.value[i];
      if(dsh_cond(dsh_lt(cur_value, min_value),false,true)) {
        min_value = cur_value;
      }
    }
    return min_value;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// MAXIMUM
// forall a. (QA a, Ord a) => Q [a] -> Q a
function dhc_maximum(as) {
  if(as.type.type_constructor == "List") {
    var max_value = as.value[0];
    for(var i=1; i<as.value.length; i++) {
      var cur_value = as.value[i];
      if(dsh_cond(dsh_gt(cur_value, max_value),false,true)) {
        max_value = cur_value;
      }
    }
    return max_value;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// SPLITAT
// forall a. QA a => Q Integer -> Q [a] -> Q ([a], [a])
function dsh_splitAt(n,as) {
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    bs = dsh_snoc(bs,dsh_take(n,as));
    bs = dsh_snoc(bs,dsh_drop(n,as));
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// TAKEWHILE
// forall a. QA a => (Q a -> Q Bool) -> Q [a] -> Q [a]
function dsh_takeWhile(f, as) {
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var l = as.value.length;
    var j = 0;
    for(i = 0; i < l; i++) {
      var p = dsh_bool(f(as.value[i]),false,true);
      if(p) {
        bs.value[j] = as.value[i];
        j++;
      } else {
        break;
      }
    }
    return bs;  
  } else {
    throw new Error("Input is not of type list.");
  }
}

// DROPWHILE
// forall a. QA a => (Q a -> Q Bool) -> Q [a] -> Q [a]
function dsh_dropWhile(f, as) {
  if(as.type.type_constructor == "List") {
    var bs = $.extend(true, {}, as);
    var l = as.value.length;
    for(i = 0; i < l; i++) {
      var p = dsh_bool(f(as.value[i]),false,true);
      if(p) {
        bs = dsh_tail(bs);
      } else {
        break;
      }
    }
    return bs;  
  } else {
    throw new Error("Input is not of type list.");
  }
}

// SPAN
// forall a. QA a => (Q a -> Q Bool) -> Q [a] -> Q ([a], [a])
function dsh_span(f,as) {
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var cs = $.extend(true, {}, as);
    var l = as.value.length;
    for(i = 0; i < l; i++) {
      var p = dsh_cond(f(as.value[i]),true,false);
      if(p) {
        bs = dsh_snoc(bs,as.value[i]);
        cs = dsh_tail(cs);
      } else {
        break;
      }
    }
    return dsh_tuple(bs,cs);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// BREAK
// forall a. QA a => (Q a -> Q Bool) -> Q [a] -> Q ([a], [a])
function dsh_break(f,as) {
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var cs = $.extend(true, {}, as);
    var l = as.value.length;
    for(i = 0; i < l; i++) {
      var p = dsh_cond(f(as.value[i]),false,true);
      if(p) {
        bs = dsh_snoc(bs,as.value[i]);
        cs = dsh_tail(cs);
      } else {
        break;
      }
    }
    return dsh_tuple(bs,cs);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// ELEM
// forall a. (Eq a, QA a) => Q a -> Q [a] -> Q Bool
function dsh_elem(e,as) {
  if(as.type.type_constructor == "List") {
    for(var i=0; i<as.value.length; i++) {
      if(JSON.stringify(e) == JSON.stringify(as.value[i])) return dsh_bool(true);
    }
    return dsh_bool(false);
  } else {
    throw new Error("Input is not of type list.");
  }
}

// NOTELEM
// forall a. (Eq a, QA a) => Q a -> Q [a] -> Q Bool
function dsh_notElem(e,as) {
  if(as.type.type_constructor == "List") {
    for(var i=0; i<as.value.length; i++) {
      if(JSON.stringify(e) == JSON.stringify(as.value[i])) return dsh_bool(false);
    }
    return dsh_bool(true);
  } else {
    throw new Error("Input is not of type list.");
  }
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
  if(as.type.type_constructor == "List") {
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
  if(as.type.type_constructor == "List") {
    var bs = dsh_empty();
    var l = as.value.length;
    for(var i=0; i<l; i++) {
      if(!dsh_cond(dsh_elem(as.value[i],bs),false,true)) {
        bs = dsh_snoc(bs,as.value[i]);
      }
    }
    return bs;
  } else {
    throw new Error("Input is not of type list.");
  }
}

// FST
// forall a b. (QA a, QA b) => Q (a, b) -> Q a
function dsh_fst(as) {
  if((as.type.type_constructor == "Tuple")) {
    return as.value[0];
  } else {
    throw new Error("Input is not of type tuple.");
  }
}

// SND
// forall a b. (QA a, QA b) => Q (a, b) -> Q b
function dsh_snd(as) {
  if((as.type.type_constructor == "Tuple")) {
    return as.value[1];
  } else {
    throw new Error("Input is not of type tuple.");
  }
}

function dsh_minid(as) {
  var min_id = 0;
  for(var j=1; j<as.value.length; j++) {
    if(dsh_cond(dsh_lt(as.value[j], as.value[min_id]),false,true)) {
      min_id = j;
    }
  }
  return min_id;
}

// SORT ASCENDING
// forall a. (Ord a, QA a) => Q a -> Q a -> Q a
function dsh_sortasc(as) {
  var bs;
  var cs = $.extend(true, {}, as);	// Deep copy of an object via jquery 
  if((as.type.type_constructor == "List")) {
    bs = dsh_empty();
  } else if((as.type.type_constructor == "Tuple")) {
    bs = dsh_tuple();
  }

  for(var i=0; i<as.value.length; i++) {
    var min_id = dsh_minid(cs);
    bs = dsh_snoc(bs,cs.value[min_id]);
    cs.value.splice(min_id,1);
  }
  return bs;
}
