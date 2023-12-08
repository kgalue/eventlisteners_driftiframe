/** Snippet for the iframe. Initializes the inner Drift iframe and acts as a communcation layer for the parent page. */
console.log("Drift-Frame-Snippet.js loaded");
window.drift = window.drift || function () {(drift.q = drift.q || []).push(arguments) };

// rebroadcast drift widget API events to parent page
drift("on", "iframeResize", function (data) {
  window.parent.postMessage({ type: "driftIframeResize", data }, "*");
});

window.addEventListener("message", function (event) {
  if (event.source !== window.parent) {
    return;
  }

  var message = event.data;

  // set initial context, put widget in "iframeMode", load widget
  if (message && message.type === "driftSetContext") {
    drift("setContext", message.data);
    drift("config", {
      iframeMode: true,
      iframeSandbox: "allow-scripts",
    });
    drift("page");

    /*
    setTimeout(function() 
    {
      drift("init", "y9vf8wusrym9")}, 100);
      console.log("it ran");
    }*/

  drift("init", "y9vf8wusrym9"); 

  //EVENT LISTENERS - GA PROJECT

drift("on", "ready", function (data) {
  console.log("printing when ready")

  //Playbook Fired Event - Send event to Parent IFrame
  drift("on", "conversation:playbookFired", function(data) {
    //console.log("Playbook fired from child iframe: " + JSON.stringify(data))
    window.parent.postMessage({ type: "PlaybookFired", data }, '*')
  })

  //Button Clicked - Send event to Parent IFrame
  drift("on", "conversation:buttonClicked", function(data) {
    //console.log("Button Clicked from child iframe: " + JSON.stringify(data))
    window.parent.postMessage({ type: "ButtonClicked", data }, '*')
  });

  //Email Captured - Send event to Parent IFrame
  drift("on", "emailCapture", function(data) {
    //console.log("Email Capture from child iframe: " + JSON.stringify(data.data))
    window.parent.postMessage({ type: "EmailCaptured", data }, '*')
  });
  
  


})//end of drift on ready



}

  // acknowledge iframe resize / reposition is complete
  if (message && message.type === "driftAcknowledgeIframeResize") {
    drift("acknowledgeIframeResize");
  }
});



// indicate iframe is ready to receive context
window.parent.postMessage({ type: "driftIframeReady" }, "*");
