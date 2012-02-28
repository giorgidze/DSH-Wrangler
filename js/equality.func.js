// EQ: compares two values for equality
// (Eq a, QA a) => Q a -> Q a -> Q Bool
function dsh_eq(a, b) {
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) return dsh_bool((a.value == b.value));
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
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value < b.value));
    } else if((type_constructor == "Char") || (type_constructor == "Text")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(a.value.charCodeAt(i) != b.value.charCodeAt(i)) {
            return dsh_bool((a.value.charCodeAt(i) < b.value.charCodeAt(i)));
          }
        }
        return dsh_bool(false);
      } else {
        return dsh_bool((a.value.length < b.value.length));
      }
    } else if((type_constructor == "Tuple") || (type_constructor == "List")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(dsh_cond(dsh_lt(a.value[i], b.value[i]),false,true)) {
            return dsh_bool(true);
          }
        }
        return dsh_bool(false);
      } else {
        return dsh_bool((a.value.length < b.value.length));
      }
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
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value > b.value));
    } else if((type_constructor == "Char") || (type_constructor == "Text")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(a.value.charCodeAt(i) != b.value.charCodeAt(i)) {
            return dsh_bool((a.value.charCodeAt(i) > b.value.charCodeAt(i)));
          }
        }
        return dsh_bool(false);
      } else {
        return dsh_bool((a.value.length > b.value.length));
      }
    } else if((type_constructor == "Tuple") || (type_constructor == "List")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(dsh_cond(dsh_gt(a.value[i], b.value[i]),false,true)) {
            return dsh_bool(true);
          }
        }
        return dsh_bool(false);
      } else {
        return dsh_bool((a.value.length > b.value.length));
      }
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
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value <= b.value));
    } else if((type_constructor == "Char") || (type_constructor == "Text")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(a.value.charCodeAt(i) != b.value.charCodeAt(i)) {
            return dsh_bool((a.value.charCodeAt(i) <= b.value.charCodeAt(i)));
          }
        }
        return dsh_bool(true);
      } else {
        return dsh_bool((a.value.length <= b.value.length));
      }
    } else if((type_constructor == "Tuple") || (type_constructor == "List")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(dsh_cond(dsh_gt(a.value[i], b.value[i]),false,true)) {
            return dsh_bool(false);
          }
        }
        return dsh_bool(true);
      } else {
        return dsh_bool((a.value.length <= b.value.length));
      }
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
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var type_constructor = a.type.type_constructor;
    if((type_constructor == "Integer") || (type_constructor == "Double")) {
      return dsh_bool((a.value >= b.value));
    } else if((type_constructor == "Char") || (type_constructor == "Text")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(a.value.charCodeAt(i) != b.value.charCodeAt(i)) {
            return dsh_bool((a.value.charCodeAt(i) >= b.value.charCodeAt(i)));
          }
        }
        return dsh_bool(true);
      } else {
        return dsh_bool((a.value.length >= b.value.length));
      }
    } else if((type_constructor == "Tuple") || (type_constructor == "List")) {
      if(a.value.length == b.value.length) {
        for(var i=0; i<a.value.length; i++) {
          if(dsh_cond(dsh_lt(a.value[i], b.value[i]),false,true)) {
            return dsh_bool(false);
          }
        }
        return dsh_bool(true);
      } else {
        return dsh_bool((a.value.length >= b.value.length));
      }
    } else {
      throw new Error("Input is not a valid type.");
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}


// MINIMUM
function dhc_min(as) {
  if (as.value != null) {
    var min_value = as.value[0];
    for(var i=1; i<as.value.length; i++) {
      var cur_value = as.value[i];
      if(dsh_cond(dsh_lt(cur_value, min_value),false,true)) {
        min_value = cur_value;
      }
    }
    return min_value;
  } else {
    throw new Error("Input is empty.");
  }
}


// MAXIMUM
function dhc_max(as) {
  if (as.value != null) {
    var max_value = as.value[0];
    for(var i=1; i<as.value.length; i++) {
      var cur_value = as.value[i];
      if(dsh_cond(dsh_gt(cur_value, max_value),false,true)) {
        max_value = cur_value;
      }
    }
    return max_value;
  } else {
    throw new Error("Input is empty.");
  }
}
