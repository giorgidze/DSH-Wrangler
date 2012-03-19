// debugging function to display array elements
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}


function renderTable(as) {
  if((as.type.type_constructor == 'List') && (as.type.argument.type_constructor == 'Tuple')) {
    var atable = '';
    var tablehead = '';
    var tablebody = '';

    // generate table headings
    for(var h=0; h<as.type.argument.argument.length; h++) {
      tablehead += '<th>Column '+(h+1)+' ('+as.type.argument.argument[h].type_constructor+')</th>';
    }
    var tablehead = '<thead><tr><th class="nonhover"> #</th>'+tablehead+'</tr></thead>';

    // get row
    for(var i=0; i<as.value.length; i++) {
      // check if the type of the elements is correct
      if(JSON.stringify(as.type.argument) == JSON.stringify(as.value[i].type)) {
        if(as.value[i].value.length == as.value[i].type.argument.length) {
          var tablecol = '';
          // get columns of these row
          for(var j=0; j<as.value[i].value.length; j++) {
            if(as.value[i].value[j].type.type_constructor == as.value[i].type.argument[j].type_constructor) {
              tablecol += '<td>'+as.value[i].value[j].value+'</td>';
            } else {
              throw new Error("Type of tuple element and type of value doesn't match");
            }
          }
          var tablerow = '<tr><th>'+(i+1)+'</th>'+tablecol+'</tr>';
          tablebody += tablerow;
        } else {
          throw new Error("Quantity of type arguments and values doesn't match");
        }
      } else {
        throw new Error("Type of list elements and type of values doesn't match");
      }
    }
    tablebody = '<tbody>'+tablebody+'</tbody>';
    atable = '<table>'+tablehead+tablebody+'</table><br />'
    return atable;
  } else {
    throw new Error("Input is not a valid table representation");
  }
}


function reloadTables(tabarr) {
  $('#table_column').fadeOut(600, function() {
    $('#table_column').empty();
    $('#table_column').show();
    for (entry in tabarr) {
      $('#table_column').append('<p><a href="javascript:delete_table(\''+entry+'\');"><img src="img/cross-button.png" class="control-icon" title="Delete table" /></a> Table <b>"'+entry+'"</b>:</p>');
      $(renderTable(tabarr[entry])).hide().appendTo('#table_column').fadeIn(1000);
    }
  });
}
