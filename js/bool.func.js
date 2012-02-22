// NOT: returns the inversion of a boolean object
// Q Bool -> Q Bool
function dsh_not(boolobj) {
  if(boolobj.type.type_constructor == "Bool") {
    boolobj.value = !boolobj.value;
    return boolobj;
  } else {
    throw new Error("Input is not of type boolean.");
  }
}

// AND (&&): returns the conjunction of a boolean object
// Q Bool -> Q Bool -> Q Bool
function dsh_and(boolobj1, boolobj2) {
  if((boolobj1.type.type_constructor == "Bool") && (boolobj2.type.type_constructor == "Bool")) {
	if(boolobj1.value && boolobj2.value) {
      return dshw_bool(true);
    } else {
      return dshw_bool(false); 
    }
  } else {
    throw new Error("Input is not of type boolean.");
  }
}

// OR (||): returns the disjunction of a boolean object
// Q Bool -> Q Bool -> Q Bool
function dsh_or(boolobj1, boolobj2) {
  if((boolobj1.type.type_constructor == "Bool") && (boolobj2.type.type_constructor == "Bool")) {
	if(boolobj1.value || boolobj2.value) {
      return dshw_bool(true);
    } else {
      return dshw_bool(false); 
    }
  } else {
    throw new Error("Input is not of type boolean.");
  }
}
