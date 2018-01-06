var label_data_structure = {}

add_data_to_data_structure =function(currenttime_string, labeler){
  aro = $("#"+labeler+"_exc").val()
  val = $("#"+labeler+"_pos").val()
  label_data_structure[currenttime_string]={'aro':aro, "val": val}
  console.log(label_data_structure)
}

retrieve_data_from_data_structure =function(string_time, labeler){ // added by Jean 1/5/2017
  if(label_data_structure[string_time]!=null){
  aro = label_data_structure[string_time].aro;
  val = label_data_structure[string_time].val;

  input_value_to_labeler(labeler,  parseFloat(val),  parseFloat(aro));
  return true;
}
  return false;
}

delete_data_from_data_structure = function(currenttime_string){
  if(label_data_structure[currenttime_string]!=null){
    delete label_data_structure[currenttime_string]
  }
  console.log(label_data_structure)
}

submit_stringify_value = function(){
  $("#submit").on("click", function(){
    var stringified = JSON.stringify(label_data_structure)
    $("#result_json_string").val(stringified)
  })

}
