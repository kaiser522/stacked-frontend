import { useEffect } from 'react';

/**
 * Intercom Chat Component
 * @param {boolean} enableFin - Enable Fin AI assistant (only for landing page)
 */
const IntercomChat = ({ enableFin = false }) => {
  useEffect(() => {
    const appId = import.meta.env.VITE_INTERCOM_APP_ID || "xxw3camq";
    
    if (!appId) {
      console.warn("Intercom App ID is not configured. Please set VITE_INTERCOM_APP_ID in your .env file");
      return;
    }
    
    // Set Intercom settings
    window.intercomSettings = {
      app_id: appId,
      ...(enableFin && { api_base: "https://api-iam.intercom.io" }),
    };

    // Load Intercom widget script
    (function() {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        var d = document;
        var i = function() {
          i.c(arguments);
        };
        i.q = [];
        i.c = function(args) {
          i.q.push(args);
        };
        w.Intercom = i;
        var l = function() {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = `https://widget.intercom.io/widget/${appId}`;
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();

    // Cleanup function
    return () => {
      if (window.Intercom && typeof window.Intercom === 'function') {
        window.Intercom('shutdown');
        delete window.Intercom;
      }
    };
  }, [enableFin]);

  return null; // This component doesn't render anything visible
};

export default IntercomChat;

