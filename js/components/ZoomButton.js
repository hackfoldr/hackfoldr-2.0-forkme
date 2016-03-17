
import storage from '../storage';

let set_scale = (scale) => {
  $(".frame, #iframe").removeClass("normal large larger").addClass(`${scale} size`);
  storage.setFoldrScale(scale);
};

export default {
  register() {
    // firefox fix for iframe initial size
    $("#wrapper .frame").addClass("normal size");

    // zoom in button
    $(".frame, #iframe").addClass(`${storage.getFoldrScale()} size`);

    $("#nav, #topbar").on("click tap", ".zoom.dropdown .normal", function(){
      set_scale("normal");
    });

    $("#nav, #topbar").on("click tap", ".zoom.dropdown .large", function(){
      set_scale("large");
    });

    $("#nav, #topbar").on("click tap", ".zoom.dropdown .larger", function(){
      set_scale("larger");
    });
  }
};
