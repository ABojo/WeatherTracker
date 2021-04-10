(()=>{"use strict";const e=(e,t)=>{let a;var n;return a=t&&t.useUTCHours?e.getUTCHours():e.getHours(),`${(e=>0===e?12:e>12?e-12:e)(a)}:${1===(n=e.getMinutes()).toString().length?`0${n}`:n} ${a>11?"PM":"AM"}`},t=function(){const e=document.querySelector(".searchBar"),t=document.querySelector(".results-grid"),a=document.querySelector(".update-status"),n=function(e){const t=document.createElement(e.type);return Object.keys(e).forEach((a=>{e[a]instanceof Object?Object.keys(e[a]).forEach((n=>{t[a][n]=e[a][n]})):"type"!==a&&(t[a]=e[a])})),t},r=function(){const e=document.querySelector(".searchButton");this.value?e.classList.add("active"):e.classList.remove("active")};return e.addEventListener("input",r),{addSearchListeners:e=>{document.querySelector(".searchButton").addEventListener("click",e),document.querySelector(".searchBar").addEventListener("keypress",(function(t){"Enter"==t.key&&e()}))},getSearchValue:()=>e.value,clearSearchBar:()=>e.value="",buildCard:(e,a)=>{const r=n({type:"div",className:`results-box ${e.background}`,dataset:{locationName:e.locationName}}),o=n({type:"div",className:"results-layer"}),s=n({type:"h1",className:"delete",innerHTML:'<i class="fas fa-times"></i>'}),c=n({type:"h1",className:"results-heading",innerHTML:`<i class="fas fa-map-marker-alt location-mark"></i>${e.locationName}`}),i=n({type:"h1",className:"results-temp",innerHTML:`${e.currentTemp}&deg;`}),d=n({type:"h1",className:"results-time",textContent:e.timestamp});s.addEventListener("click",a),r.append(o),o.append(s,c,i,d),t.append(r)},addSpinner:()=>{document.body.insertAdjacentHTML("beforeEnd",'<div class="lds-roller">\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>')},removeSpinner:()=>{document.querySelector(".lds-roller").remove()},buildPopUp:(e,t)=>{const a=n({type:"div",className:"popup"}),r=n({type:"div",className:"popup-box",dataset:{locationName:e.locationName}}),o=n({type:"p",className:"popup-message",textContent:e.message}),s=n({type:"div",className:"popup-buttons"}),c=n({type:"button",className:"popup-button confirm",textContent:"Yes"}),i=n({type:"button",className:"popup-button reject",textContent:"No"});c.addEventListener("click",t),i.addEventListener("click",(function(){this.parentElement.parentElement.parentElement.remove()})),s.append(c,i),r.append(o,s),a.append(r),document.body.append(a)},removeCard:e=>{document.querySelector(`[data-location-name="${e}"]`).remove()},showError:e=>{const t=n({type:"div",className:"error-box"}),a=n({type:"h1",className:"error-message",textContent:`Sorry, we were unable to find weather data for "${e}"`});t.append(a),document.body.append(t)},removeError:()=>{document.querySelector(".error-box").remove()},toggleSearchButton:r,setStatus:e=>{a.textContent=e}}}(),a=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch{localStorage.setItem(e,t)}},n=e=>{try{return JSON.parse(localStorage.getItem(e))}catch{return localStorage.getItem(e)}};(function(){let r=n("trackedLocations")||[];const o=()=>{a("trackedLocations",r)},s=async function(t,a){const n=("728aeae965e9bd7a68b2c802b392a730",{getWeatherJSON:async function(e,t){const a=`https://api.openweathermap.org/data/2.5/weather?q=${e}&APPID=728aeae965e9bd7a68b2c802b392a730&units=${t}`,n=await fetch(a,{mode:"cors"});return await n.json()}});const r=function(t){const a=new Date(Date.now()+1e3*t.timezone),n=e(a,{useUTCHours:!0}),r=(o=a.getUTCHours())>6&&o<20?"day":"night";var o;return{locationName:t.name,currentTemp:Math.round(t.main.temp),highTemp:t.main.temp_max,lowTemp:t.main.temp_min,humidity:t.main.humidity,timestamp:n,background:r}}(await n.getWeatherJSON(t,a));return console.log(r),r},c=function(){const e=this.parentElement.parentElement.dataset.locationName;(e=>{const t=r.findIndex((t=>t===e));r.splice(t,1),o()})(e),this.parentElement.parentElement.parentElement.remove(),t.removeCard(e),t.setStatus(`${e} has been removed!`)},i=function(e){t.buildPopUp({message:`Are you sure you want to remove ${e.locationName}?`,locationName:e.locationName},c)},d=async function(){const e=t.getSearchValue();if(e){t.addSpinner();try{const a=await s(e,"imperial");t.removeSpinner(),t.toggleSearchButton(),t.clearSearchBar(),t.buildCard(a,(function(){i(a)})),(e=>{r.push(e),o()})(a.locationName),t.setStatus(`${a.locationName} has been added!`)}catch{t.removeSpinner(),t.showError(e),await new Promise((function(e){setTimeout(e,3e3)})),t.removeError()}}};return{startApp:()=>{(()=>{if(0===r.length)t.setStatus("You are not tracking any weather");else{const a=new Date(Date.now());t.setStatus(`Weather updated at ${e(a)}`)}})(),async function(){(await(async()=>{t.addSpinner();const e=await(async e=>{const t=e.map((e=>s(e,"imperial")));return await Promise.all(t)})(r);return t.removeSpinner(),e})()).forEach((e=>t.buildCard(e,(function(){i(e)}))))}(),t.addSearchListeners(d)}}})().startApp()})();