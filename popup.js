$(function() {

  // on popup loads
  // - set mode
  chrome.storage.sync.get("enabled", function(enabled) {
    $("#enabled").val(enabled['enabled']);
  });
  // - set blocked sites
  chrome.storage.sync.get("sites", function(sites) {
    // turn data array to string
    var sites = sites['sites'].join(", ");
    $("#sites").val(sites);
  });

  // handle navigation within popup
  $(".link").click(function() {
    var page = $(this).data("page");
    // hide all page then show clicked page
    $(".page").hide();
    $("#page-"+page).show();
  });

  // change mode
  $("#enabled").on("change", function() {
    var enabled = $(this).val();
    chrome.storage.sync.set({'enabled': enabled});
  });

  // change blocked sites list
  $("#sites").on("keyup", function() {
    var sites = $(this).val();
    // turn to array
    sites = sites.split(",");
    chrome.storage.sync.set({'sites': sites});
  }); 





}); // end
