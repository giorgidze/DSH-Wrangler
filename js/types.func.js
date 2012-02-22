// UNIT: returns an unit json object
function dsh_unit() {
  var jsonObject = {"type" : {"type_constructor" : "Unit"}
             , "value" : null,
             };
  return jsonObject;
}


// BOOL: returns a "false" or "true" json object
function dsh_bool(bool_value) {
  if(typeof bool_value=="boolean") {
    var jsonObject = {"type" : {"type_constructor" : "Bool"}
             , "value" : null,
             };

    // JS boolean --> JSON boolean
    if(bool_value) {
      bool_value = true;
    } else {
      bool_value = false;
    }

    jsonObject.value = bool_value;
    return jsonObject;
  } else {
    throw new Error("Input is not of type boolean.");
  }
}


// INTEGER: returns an integer json object
function dsh_integer(integer_value) {
  if(parseInt(integer_value) == integer_value) {
    var jsonObject = {"type" : {"type_constructor" : "Integer"}
             , "value" : null,
             };
    jsonObject.value = integer_value;
    return jsonObject;
  } else {
    throw new Error("Input is not of type integer.");
  }
}


// DOUBLE: returns an double json object
function dsh_double(double_value) {
  if(parseFloat(double_value) == double_value) {
    var jsonObject = {"type" : {"type_constructor" : "Double"}
             , "value" : null,
             };
    jsonObject.value = double_value;
    return jsonObject;
  } else {
    throw new Error("Input is not of type double.");
  }
}


// CHAR: returns an character json object
function dsh_char(character_value) {
  if((typeof character_value=="string") && (character_value.length == 1)) {
    var jsonObject = {"type" : {"type_constructor" : "Char"}
             , "value" : null,
             };
    jsonObject.value = character_value;
    return jsonObject;
  } else {
    throw new Error("Input is not of type character.");
  }
}


// TEXT: returns an text json object
function dsh_text(text_value) {
  if(typeof text_value=="string") {
    var jsonObject = {"type" : {"type_constructor" : "Text"}
             , "value" : null,
             };
    jsonObject.value = text_value;
    return jsonObject;
  } else {
    throw new Error("Input is not of type string.");
  }
}
