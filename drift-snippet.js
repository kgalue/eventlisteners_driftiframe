/** Snippet for the parent page to properly resize the iframe and pass context */

// create dummy page context for analytics / targeting
// you can omit / clean data any sensitive data from these values
console.log("drift-snippet.js loaded");
var context = {
  window: {
    location: {
      hash: window.location.hash,
      host: window.location.host,
      //hostname: window.location.hostname,
      //href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      port: window.location.port,
      protocol: window.location.protocol,
      search: window.location.search,
    },
    navigator: {
      language: window.navigator.language,
      browserLanguage: window.navigator.browserLanguage,
      userAgent: window.navigator.userAgent,
    },
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  },
  document: {
    title: document.title,
    referrer: document.referrer,
  },
};

//Event Listener for PB fired
window.addEventListener("message", function (event) {
  // on startup - pass created context into iframe
  var message = event.data;


    //GA EVENTS PROJECT
    //Receiving Playbook Fired from Child Iframe
    if (message.type === "PlaybookFired") {
       console.log("Playbook Fired received - Message from Parent Iframe");
       console.log("Playbook fired Data from Parent: " + JSON.stringify(message.data))
      }

    //Receiving Button Clicked from Child Iframe
    if (message.type === "ButtonClicked") {
       console.log("Button Clicked - Message from Parent Iframe");
       console.log("Button Clicked Data from Parent: " + JSON.stringify(message.data))
      }

    //Receiving Email Captured from Child Iframe
    if (message.type === "EmailCaptured") {
      console.log("Email Captured - Message from Parent Iframe");
      console.log("Email Captured Data from Parent: " + JSON.stringify(message.data))
     }

    // acknowledge that the resize is complete
    // iframe.contentWindow.postMessage(
    //   { type: "driftAcknowledgeIframeResize" },
    //   "*"
    // );
  });






window.addEventListener("message", function (event) {
  var iframe = document.getElementById("drift-iframe");
  if (
    !(iframe && iframe.contentWindow) &&
    event.source === iframe.contentWindow
  ) {
    return;
  }

  // on startup - pass created context into iframe
  var message = event.data;
  if (message.type === "driftIframeReady") {
    iframe.contentWindow.postMessage(
      { type: "driftSetContext", data: context },
      "*"
    );
  }

  // on widget size change - apply new size / positioning to iframe
  if (message.type === "driftIframeResize") {
    console.log("Testing iframe communication")
    var styles = message.data.styles;
    for (var key in styles) {
      if (!styles.hasOwnProperty(key)) {
        continue;
      }
      iframe.style.setProperty(key, styles[key]);
    }

    // acknowledge that the resize is complete
    // iframe.contentWindow.postMessage(
    //   { type: "driftAcknowledgeIframeResize" },
    //   "*"
    // );
  }
});


