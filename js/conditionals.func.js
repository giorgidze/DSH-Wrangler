// QA a => Q Bool -> Q a -> Q a -> Q a
function dsh_cond(bool, arg1, arg2) {
  if(bool.type.type_constructor == "Bool") {
	if(bool.value) {
      return arg2;
    } else {
      return arg1; 
    }
  } else {
    throw new Error("Input is not of type boolean.");
  }
}