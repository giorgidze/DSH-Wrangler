// EQ: compares two values for equality
// (Eq a, QA a) => Q a -> Q a -> Q Bool
function dsh_eq(a, b) {
  if (a.type == b.type) return dsh_bool((a.value == b.value));
  else throw new Error("Input is not of same type.");
}

// NEQ: compares two values for inequality
// (Eq a, QA a) => Q a -> Q a -> Q Bool
function dsh_neq(a,b) {
  return dsh_not(dsh_eq(a,b));
}

// LT: is a lesser than b?
// (Ord a, QA a) => Q a -> Q a -> Q Bool
function dsh_lt(a, b) {
  if(a.type == b.type) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value < b.value));
    } else if(type_constructor == "Char") {
      return dsh_bool((a.value.charCodeAt(0) < b.value.charCodeAt(0)));
    } else if((type_constructor == "Text") || (type_constructor == "List")) {
      return dsh_bool((a.value.length < b.value.length));
    } else if(type_constructor.substr(0,5) != "Tuple") {
        // TODO
    } else {
      throw new Error("Input is not a valid type.");
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}


// GT: is a greater than b?
// (Ord a, QA a) => Q a -> Q a -> Q Bool
function dsh_gt(a, b) {
  if(a.type == b.type) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value > b.value));
    } else if(type_constructor == "Char") {
      return dsh_bool((a.value.charCodeAt(0) > b.value.charCodeAt(0)));
    } else if((type_constructor == "Text") || (type_constructor == "List")) {
      return dsh_bool((a.value.length > b.value.length));
    } else if(type_constructor.substr(0,5) != "Tuple") {
        // TODO
    } else {
      throw new Error("Input is not a valid type.");
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}


// LTE: is a lesser than b or equal?
// (Ord a, QA a) => Q a -> Q a -> Q Bool
function dsh_lte(a, b) {
  if(a.type == b.type) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value <= b.value));
    } else if(type_constructor == "Char") {
      return dsh_bool((a.value.charCodeAt(0) <= b.value.charCodeAt(0)));
    } else if((type_constructor == "Text") || (type_constructor == "List")) {
      return dsh_bool((a.value.length <= b.value.length));
    } else if(type_constructor.substr(0,5) != "Tuple") {
        // TODO
    } else {
      throw new Error("Input is not a valid type.");
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}


// GTE: is a greater than b or equal?
// (Ord a, QA a) => Q a -> Q a -> Q Bool
function dsh_gte(a, b) {
  if(a.type == b.type) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value >= b.value));
    } else if(type_constructor == "Char") {
      return dsh_bool((a.value.charCodeAt(0) >= b.value.charCodeAt(0)));
    } else if((type_constructor == "Text") || (type_constructor == "List")) {
      return dsh_bool((a.value.length >= b.value.length));
    } else if(type_constructor.substr(0,5) != "Tuple") {
        // TODO
    } else {
      throw new Error("Input is not a valid type.");
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}
