// list all donation URL's
var donation_urls = [
'https://www.unicefusa.org/donate/donate-unicef-tap-project',
'https://donate.water.org/',
'http://www.compassion.com/water-of-life.htm',
'http://donate.worldvision.org/water-and-sanitation',
'https://www.wateraid.org/donate/'
];


// listen for changes to url
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // make sure changeInfo is defined
  var url = changeInfo.url;
  // make sure we have a URL to work with.
  if(url != undefined) {
    // retrieve settings from chrome popup
    chrome.storage.sync.get(null, function(settings) {
      if(settings['enabled'] == 1) {
         //("inside storage");
            //alert(url);
         //alert("tab id: " + tabId);
         //alert(donation_urls[2]);

         //alert(random_donation);
         // loop through all blocked sites
         var sites = settings['sites'];
         for(var i=0; i<sites.length; i++)
         {
           // check to see if any of our banned URL's
           // are part of the url we are visiting. 
           var curr_site = sites[i].trim();
           if(url.indexOf(curr_site) != -1)
           {
             // this is a banned site
             // get random donation URL.
             //alert("BANNED URL");
             var random_donation = donation_urls[Math.floor(Math.random()*donation_urls.length)];
             // redirect user to donation URL.
             chrome.tabs.update(tabId, { url: random_donation }, null);
           }
         } // end loop
      
      }  //end settings enabled
    }); // end chrome storage sync
  } // end url undefined
}); // end chrome sync listener




