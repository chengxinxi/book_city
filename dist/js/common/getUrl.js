"use strict";define(function(){return function(n){var t=location.search.slice(1).split("&"),c="";return t.map(function(t,i){t.split("=")[0]==n&&(c=t.split("=")[1])}),c}});