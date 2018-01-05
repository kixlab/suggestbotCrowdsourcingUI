var label_data_structure = {}

add_data_to_data_structure =function(currenttime_string, labeler){
  aro = $("#"+labeler+"_exc").val()
  val = $("#"+labeler+"_pos").val()
  label_data_structure[currenttime_string]={'aro':aro, "val": val}
  console.log(label_data_structure)
}

delete_data_from_data_structure = function(currenttime_string){
  delete label_data_structure[currenttime_string]
}
