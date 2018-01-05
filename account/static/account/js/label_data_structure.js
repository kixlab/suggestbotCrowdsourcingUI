var label_data_structure = {}

add_data_to_data_structure =function(currenttime_string, labeler){
  aro = $("#"+labeler+"_exc").val()
  val = $("#"+labeler+"_pos").val()
  label_data_structure[currenttime_string]={'aro':aro, "val": val}
  console.log(label_data_structure)
}

retrieve_data_from_data_structure =function(string_time, labeler){ // added by Jean 1/5/2017
  aro = label_data_structure[string_time].aro;
  val = label_data_structure[string_time].val;

  input_value_to_labeler(labeler,  parseFloat(val),  parseFloat(aro));

}

delete_data_from_data_structure = function(currenttime_string){
  delete label_data_structure[currenttime_string]
}

submit_stringify_value = function(){
  $("#submit").on("click", function(){
    var stringified = JSON.stringify(label_data_structure)
    $("#result_json_string").val(stringified)
  })

}
