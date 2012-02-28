// EQ: compares two values for equality
// (Eq a, QA a) => Q a -> Q a -> Q Bool
function dsh_eq(a, b) {
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    return dsh_bool((JSON.stringify(a.value) == JSON.stringify(b.value)));
  } else {
    throw new Error("Input is not of same type.");
  }
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
// forall a. (Ord a, QA a) => Q a -> Q a -> Q a
function dhc_min(a, b) {
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var p = dsh_cond(dsh_lt(a,b),false,true);
    if(p) {
      return a;
    } else {
      return b;
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}

// MAXIMUM
// forall a. (Ord a, QA a) => Q a -> Q a -> Q a
function dhc_max(a, b) {
  if(JSON.stringify(a.type) == JSON.stringify(b.type)) {
    var p = dsh_cond(dsh_gt(a,b),false,true);
    if(p) {
      return a;
    } else {
      return b;
    }
  } else {
    throw new Error("Input is not of same type.");
  }
}
