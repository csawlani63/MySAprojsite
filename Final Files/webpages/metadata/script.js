window.addEventListener("load", consentFunc);

// Consent alert box
function consentFunc() {
  var option;
  if (!readCookie()) {
    option = confirm("Do you give consent for retrieval of sensitive data for informative purposes?");
    if (option) {
      geolocation();
      IP();
      time();
      OS();
      createCookie(true);
    }
  } else {
    geolocation();
    IP();
    time();
    OS();
  }
}
// End of consent alert box

// Create cookie
function createCookie(value) {
  document.cookie = "consent=" + value + "; path=/";
}

// Read cookie
function readCookie() {
  var name = "consent" + '=';
  var allCookies = document.cookie.split(';');
  var i; 
  var cookie;
  for (i = 0; i < allCookies.length; i++) {
      cookie = allCookies[i];
      while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return null;
}

// Button
const button1 = document.querySelector(".button");
button1.addEventListener("click", () => {
  button1.classList.add("hidden-button");
});
const button2 = document.querySelector(".button-2");
button2.addEventListener("click", () => {
  button2.classList.add("hidden-button-2");
});
// End of button

// OS
import { clientHintHeaders } from "./clientHintHeaders.js";
function OS() {
  clientHintHeaders.then(res => {
    document.getElementById("user-agent").innerHTML = Object.entries(res)[0].slice(1);
    document.getElementById("browser").innerHTML = Object.entries(res)[1].slice(1);
    document.getElementById("os-arch").innerHTML = Object.entries(res)[2].slice(1);
    document.getElementById("os").innerHTML = Object.entries(res)[3].slice(1);
    document.getElementById("os-version").innerHTML = Object.entries(res)[4].slice(1);
    document.getElementById("os-bit").innerHTML = Object.entries(res)[5].slice(1);
  });
}

// IP
function IP() {
  $.getJSON("https://api.ipdata.co/?api-key=d57c54c9155807781aae0ab9ca5bf6767bbf90aa5138b8c08322d250&fields=ip", function(location) {
    $("#ip").html(location.ip);
  });
}
// End of IP

// Geolocation and ISP
function geolocation() {
  $.getJSON("https://ipapi.co/json", function(location2) {
    $("#country").html(location2.country_name);
    $("#state").html(location2.region);
    $("#city").html(location2.city);
    $("#latitude").html(location2.latitude);
    $("#longitude").html(location2.longitude);
    $("#country_code").html(location2.country_code);
    $("#state_code").html(location2.region_code);
    $("#network").html(location2.asn);
    $("#isp").html(location2.org);
  });
}
// End of geolocation and ISP

// Timezone
function time() {
  $.getJSON("https://api.ipdata.co/time_zone?api-key=d57c54c9155807781aae0ab9ca5bf6767bbf90aa5138b8c08322d250", function(timezone) {
    $("#abbr").html(timezone.abbr);
    $("#time").html(timezone.current_time);
  });
}
// End of timezone
