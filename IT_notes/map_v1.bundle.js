(()=>{"use strict";const e={searchFormDOM:window,searchForm_labelsDOM:window,regexQuery:"",singleLineMode:!1,matchCaseMode:!1,fullWordMode:!1,labelANDMode:!0,labelAndOrText:{true:"Note contains ALL selected topics",false:"Note contains ANY selected topic"},copyLabels:function(){var e="";i.labelMap_key_list.forEach((t=>{e+=t+"\n"})),alert("select and copy:\n\n"+e)},switchANDORSearch:function(){e.labelANDMode=!e.labelANDMode,document.getElementById("idLabelSearchAndMode").innerHTML=e.labelAndOrText[e.labelANDMode],c.executeSearch()},onRegexInputChanged:function(){null!==e.regexInputTimer&&(clearTimeout(e.regexInputTimer),e.regexInputTimer=null),e.regexQuery=this.value,e.regexInputTimer=setTimeout(c.executeSearch,1e3)},renderSearchForm:function(){const t=document.createElement("div");t.setAttribute("id","searchForm"),t.classList.add("noprint"),document.body.insertBefore(t,document.body.children[0]);let n=' <div id="divClose1">✕</div> <div id="unhide" hidden >&nbsp;show all&nbsp;</div>  <div id="divRegexForm">  <input id="inputQuery"  type="text" placeholder="(regex)search"  />  <div   id="matchNumber" ></div>  <br/>  <input id="singleLineOnly" type="checkbox" />   <label for="singleLineOnly">single-line</label>  <input id="caseSensitive"  type="checkbox" />  <label for="caseSensitive">Case-Match</label>  <input id="fullWord"  type="checkbox" />  <label for="fullWord">Full Word</label>  </div>  <br/>  <div id="copyLabels">Copy Labels</div>';i.DDBB.labelMap_key_list.length>0?n+='<input id="searchAndMode" type="checkbox"><span id="idLabelSearchAndMode" mono></span><br/>\n<div id="searchFormLabels">\n</div>\n':n+="(No topics found).<br/>\n",t.innerHTML=n,document.getElementById("divClose1").addEventListener("click",e.hideSearchForm),document.getElementById("unhide").addEventListener("click",(function(){c.resetTextFoundAttr(!0),this.setAttribute("hidden","true")})),document.getElementById("copyLabels").addEventListener("click",e.copyLabels),i.DDBB.labelMap_key_list.length>0&&document.getElementById("searchAndMode").addEventListener("change",e.switchANDORSearch);const o=document.getElementById("singleLineOnly"),l=document.getElementById("caseSensitive"),r=document.getElementById("fullWord");o.addEventListener("click",(()=>{e.singleLineMode=o.checked})),l.addEventListener("click",(()=>{e.matchCaseMode=l.checked})),r.addEventListener("click",(()=>{e.fullWordMode=r.checked}));const d=document.getElementById("inputQuery");d.addEventListener("input",e.onRegexInputChanged),d.focus(),e.searchFormDOM=t,e.searchForm_labelsDOM=document.getElementById("searchFormLabels")},regexInputTimer:null,sorterForRootTopicCache:{},generateSorterForRootTopic:function(t){let n=e.sorterForRootTopicCache[t];return null!=n||(n=function(e,n){const o=0==e.indexOf(t),i=0==n.indexOf(t);return o&&!i?-1:!o&&i||e>n?1:e<n?-1:0},e.sorterForRootTopicCache[t]=n),n},showSearchForm:function(){e.searchFormDOM.style.display="block",document.getElementById("inputQuery").value=e.regexQuery,document.getElementById("searchAndMode").checked=e.labelANDMode,document.getElementById("singleLineOnly").checked=e.singleLineMode,document.getElementById("caseSensitive").checked=e.matchCaseMode,document.getElementById("fullWord").checked=e.fullWordMode,document.getElementById("idLabelSearchAndMode").innerHTML=e.labelAndOrText[e.labelANDMode];const t='<div class="labelBlock">';var n=t;Object.keys(i.DDBB.topicTree).sort().filter((e=>1==i.DDBB.topicTree[e].length)).forEach((e=>{n+=i.renderLabel(e,!1,!0,"prefixIgnoredForTrue")})),n+="</div>",Object.keys(i.DDBB.topicTree).sort().filter((e=>1!=i.DDBB.topicTree[e].length)).forEach((o=>{const l=o.replace(".*","");n+=t+"<div class='labelBlockTitle'>"+l+":</div>",i.DDBB.topicTree[o].sort(e.generateSorterForRootTopic(o)).forEach((e=>{n+=i.renderLabel(e,!0,!1,l)})),n+="</div>"})),e.searchForm_labelsDOM.innerHTML=n,document.querySelectorAll(".labelButton").forEach((e=>{e.addEventListener("click",i.onLabelClicked)}))},hideSearchForm:function(){e.searchFormDOM.style.display="none"}},t={dom:window,getMouseType:function(){return window.matchMedia("(pointer: coarse)").matches?"finger":window.matchMedia("(pointer: fine)").matches?"mouse":"none"},textSizeSlider:document.body,renderZoomBox:function(){const e=document.createElement("div");e.setAttribute("id","zoomDiv"),e.innerHTML="<div class='noprint' id='zoomDivControls' style='margin-bottom:0.5rem'> <div id='divClose2'>✕ </div> <pre id=\"switchMaximize\" >╔╗</pre> <div id='historyBackFor' style='display:inline; '><span id='GoBack'>←</span>&nbsp;<span id='GoForw'>→</span><span id='cellNofM'>?</span>  </div> <div id=\"cellIDPanell\"></div> <div id=\"butSwitchLectureMode\" >?</div> <input id=\"textSizeSlider\" type=\"range\"    style=\"width:100px\" value=\"100\" min=\"30\" max=\"250\"></div> <div id='divElementLabels' class='noprint'></div><div id='zoomHTMLContent'/>",t.dom=e,document.body.insertBefore(e,document.body.children[0]),document.getElementById("divClose2").addEventListener("click",t.doCloseZoom),document.getElementById("GoBack").addEventListener("click",o.goBack),document.getElementById("GoForw").addEventListener("click",o.goForward),t.textSizeSlider=document.getElementById("textSizeSlider"),t.textSizeSlider.addEventListener("input",(()=>{document.getElementById("zoomHTMLContent").querySelector("*[zoom]").style.fontSize=t.textSizeSlider.value/100+"rem"})),document.getElementById("switchMaximize").addEventListener("click",(function(){const e=document.getElementById("zoomDiv").getAttribute("maximized");document.getElementById("zoomDiv").setAttribute("maximized","true"==e?"false":"true")})),document.getElementById("butSwitchLectureMode").addEventListener("click",t.switchLectureMode),t.updateButtonSwitchLectureMode()},doOpenZoom:function(e){null!=e.target&&(e=e.target);for(let t=0;t<4&&null==e.getAttribute("zoom");t++)e=e.parentNode;n.zoomStatus=1,o.visited.indexOf(e)>=0?o.visited_idx=o.visited.indexOf(e):(o.visited.push(e),o.visited_idx=o.visited.length-1),o.visited.length>1?(document.getElementById("historyBackFor").style.display="inline",document.getElementById("cellNofM").innerHTML=o.visited_idx+1+"/"+o.visited.length):document.getElementById("historyBackFor").style.display="none";let l="";e.attributes&&e.attributes.labels&&Array.from(new Set(e.attributes.labels.value.split(","))).filter((e=>!!e)).forEach((e=>{l+=i.renderLabel(e,!0,!0)})),document.getElementById("divElementLabels").innerHTML=l;const r=document.getElementById("zoomHTMLContent");return r.innerHTML=e.outerHTML,document.getElementById("cellIDPanell").innerHTML=e.id?"id:"+e.id:"",r.querySelectorAll(".innerSearch").forEach((e=>{e.addEventListener("click",(function(){c.executeSearch(e.innerHTML)}))})),r.querySelectorAll(".innerLink").forEach((e=>{const n=document.getElementById(e.getAttribute("value"));e.addEventListener("click",(function(){t.doOpenZoom(n)}))})),t.dom.style.display="block",t.dom.style.opacity="0",setTimeout((()=>{t.dom.style.opacity="1"}),300),setTimeout((function(){r.scrollIntoView({behavior:"smooth",block:"start"}),document.getElementById("zoomDiv").scrollTop=0}),1),!1},lectureModePtr:0,lecturModeDescriptionList:["&nbsp;⍈&nbsp;","&nbsp;⍇&nbsp;","&nbsp;🕮&nbsp;"],getNextLectureMode:function(){return(t.lectureModePtr+1)%t.lecturModeDescriptionList.length},switchLectureMode:function(){const e=document.getElementById("zoomHTMLContent").querySelector("pre[zoom]");e.classList.remove("lectureMode"+t.lectureModePtr),t.lectureModePtr=t.getNextLectureMode(),e.classList.add("lectureMode"+t.lectureModePtr),t.updateButtonSwitchLectureMode()},updateButtonSwitchLectureMode:function(){document.getElementById("butSwitchLectureMode").innerHTML=t.lecturModeDescriptionList[t.getNextLectureMode()]},doCloseZoom:function(){t.dom.style.display="none",t.dom.style.opacity="0",r.onZoomClosed()}},n={idxZoomRule:-1,idxXTitleRule:-1,zoomStatus:0,cssRules:[],initialZoomSize:.6,initCSSIndexes:function(){n.cssRules=document.styleSheets[0].cssRules[0].cssRules;for(let e=0;e<n.cssRules.length;e++)"[zoom]"==n.cssRules[e].selectorText&&(n.idxZoomRule=e),"[xsmall], [zoom] > [title]"==n.cssRules[e].selectorText&&(n.idxXTitleRule=e)},onZoom:function(){if(n.slider.value<90){const e=n.slider.value/100;n.cssRules[n.idxXTitleRule].style["font-size"]=e+"rem",n.cssRules[n.idxZoomRule].style["font-size"]="0.0001rem"}else{const e=n.slider.value-90,t=Math.pow(e,1.3)/1e3;n.cssRules[n.idxZoomRule].style["font-size"]=t+"rem"}}},o={visited:[],visited_idx:-1,goBack:function(){if(0==o.visited_idx)return;o.visited_idx--;let e=o.visited[o.visited_idx];t.doOpenZoom(e)},goForward:function(){if(o.visited_idx==o.visited.length-1)return;o.visited_idx++;let e=o.visited[o.visited_idx];t.doOpenZoom(e)}},i={state:{labelMapSelected:{}},DDBB:{flatMap:{},topicTree:{},labelMap_key_list:[],countPerLabelStat:{},endInitialization:function(e){i.DDBB.flatMap=e;const t=Object.keys(e).sort();t.forEach((t=>{i.DDBB.countPerLabelStat[t]=e[t].length})),t.filter((e=>e.indexOf(".*")==e.indexOf(".")&&e.indexOf(".*")==e.length-2)).forEach((e=>{const n=e.replace(".*",""),o=[];if(t.forEach((e=>{(0==e.indexOf(n+".")||e.indexOf("."+n)>0)&&o.push(e)})),0==o.length)throw new Error("at least root_topic must match its prefix");i.DDBB.topicTree[e]=o})),i.DDBB.labelMap_key_list=t,window.LM=i}},isAnyLabelSelected:function(){return Object.keys(i.state.labelMapSelected).length>0},setLabelSelectedOnOff:function(e,t){t?i.state.labelMapSelected[e]=t:delete i.state.labelMapSelected[e]},refreshLabelsUI:function(){document.querySelectorAll(".labelButton").forEach((e=>{e.addEventListener("click",i.onLabelClicked),e.attributes||(e.attributes={selected:{value:"false"}});const t=e.getAttribute("value"),n=!!i.state.labelMapSelected[t];e.attributes.selected.value=""+n}))},onLabelClicked:function(e){const t=e.target,n=t.value?t.value:t.getAttribute("value");t.attributes||(t.attributes={selected:{value:"false"}}),"false"==t.attributes.selected.value?i.setLabelSelectedOnOff(n,!0):i.setLabelSelectedOnOff(n,!1),i.isAnyLabelSelected()?document.getElementById("idLabelsFilter").setAttribute("active","true"):document.getElementById("idLabelsFilter").removeAttribute("active"),i.refreshLabelsUI(),c.executeSearch()},renderLabel:function(e,t,n,o){let l=t?e:e.replace(".*","");n||(l=l.replace(o+".","").replace("."+o,""));let r="<div "+(e.indexOf("todo")>=0?" red":"")+" class='labelButton' selected="+!!i.state.labelMapSelected[e]+" type='button' value='"+e+"' />"+l+"</div>";return"*"!=l&&(r+="<span labelcount>"+i.DDBB.countPerLabelStat[e]+"</span>"),r},getDomListForLabelPrefix:function(e){const t=i.DDBB.labelMap_key_list.filter((t=>t.startsWith(e.replace(".*",""))));var n=[];for(let e=0;e<t.length;e++){const o=t[e];i.DDBB.flatMap[o]&&(n=n.union(i.DDBB.flatMap[o]))}return n},labelMapSelectedToCSV:function(){return Object.keys(i.state.labelMapSelected).sort().join(",")},createLabelIndex:function(){const e=document.querySelectorAll("*[labels]"),t={};for(let o in e){const i=e[o];if(!i.getAttribute)continue;const l=i.getAttribute("labels").toLowerCase().trim().replace(",,",",");if(!l||""==l)continue;if(","==l)continue;const r=l.split(","),d=[];var n=0;if(r.forEach((e=>{for(e=e.trim();e.endsWith(".");)e=e.substring(0,e.length-1);if(""==e)return;e=e.indexOf(".")>=0?e:e+".*";let o=t[e]?t[e]:[];d.push(e),o.push(i),t[e]=o;const l=e.substring(0,e.indexOf("."))+".*";t[l]||(t[l]=[]),n++})),i.setAttribute("labels",d.join()),n>0){const e=document.createElement("div");e.setAttribute("tagCount",""),e.innerHTML=n,i.insertBefore(e,i.children[0])}}i.DDBB.endInitialization(t)}},l={onKeyUp:function(e){"Escape"===e.code&&(0===n.zoomStatus?c.resetTextFoundAttr(!0):t.doCloseZoom()),"PageDown"!==e.key?"PageUp"!==e.key?("Enter"===e.code&&t.doCloseZoom(),"F1"===e.code&&doHelp()):o.goBack():o.goForward()},showPreviewTimeout:null,showPreviewEvent:null,showPreviewInZoom:function(){t.doOpenZoom(l.showPreviewEvent)},initInputControl:function(){document.addEventListener("keyup",l.onKeyUp);const e=document.querySelectorAll("*[zoom]");for(let t in e){const n=e[t];n.addEventListener&&(l.LPC.enableDblClick(n),l.LPC.enableLongTouch(n))}},LPC:{longpress:!1,presstimer:null,click:function(e){if(null!==l.LPC.presstimer&&(clearTimeout(l.LPC.presstimer),l.LPC.presstimer=null),l.LPC.longpress)return!1},start:function(e){var n=this;if("click"!==e.type||0===e.button)return l.LPC.longpress=!1,null===l.LPC.presstimer&&(l.LPC.presstimer=setTimeout((function(){t.doOpenZoom(n),l.LPC.longpress=!0}),1e3)),!1},cancel:function(e){null!==l.LPC.presstimer&&(clearTimeout(l.LPC.presstimer),l.LPC.presstimer=null)},enableDblClick:function(e){e.addEventListener("dblclick",t.doOpenZoom,!0)},enableLongTouch:function(e){e.addEventListener("touchstart",l.LPC.start),e.addEventListener("mouseleave",l.LPC.cancel),e.addEventListener("touchend",l.LPC.cancel),e.addEventListener("touchleave",l.LPC.cancel),e.addEventListener("touchcancel",l.LPC.cancel)}}},r={renderMenuBar:function(){const t=document.createElement("div");t.setAttribute("id","upper_bar"),t.classList.add("noprint"),t.innerHTML='<img id="idLabelsFilter" class="noprint" src="/labelIcon.svg" /><a href="../help.html" class="noprint" style="cursor:help" target="_blank" >❓</a><span blue id="printButton">Print</span><span id="loupe"  blue>🔍︎</span><input id="zoomSlider" type="range"   style="width:100px" value="70.0" min="30.0" max="250"><br/>',document.body.insertBefore(t,document.body.children[0]),document.getElementById("idLabelsFilter").addEventListener("click",e.showSearchForm),document.getElementById("idLabelsFilter").addEventListener("click",e.showSearchForm),n.slider=document.getElementById("zoomSlider"),n.slider.addEventListener("input",n.onZoom);{const e=document.createElement("meta");e.setAttribute("name","viewport"),e.setAttribute("content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"),document.head.insertBefore(e,document.head.children[0])}document.getElementById("printButton").addEventListener("click",r.spbQuickPrint)},spbQuickPrint:function(){window.confirm("Use browser [print...] for print-previsualization.-")&&window.print()},onZoomClosed:function(){}};function d(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}window.addEventListener("load",(function(){if(window.spbLoaded)console.log("Already loaded");else{console.log("Initializing SPB"),window.spbLoaded=!0;try{console.log("debug custom preLoad")}catch(e){console.dir(e)}l.initInputControl(),function(){const e=document.querySelectorAll("a"),t=document.location.origin+document.location.pathname;for(let n in e){const o=e[n].href;o&&o.startsWith("http")&&(o.startsWith(t)||(e[n].target="_blank"))}}(),function(){window.location.pathname.split("/").pop();const e=document.querySelectorAll("*[zoom]");for(let t in e){let n=e[t],o=n.innerHTML;o&&(o=o.replace(/\[\[([^\?]*)\?\]\]/g,"<div class='innerSearch'>$1</div><a target='_blank'  href='"+window.location.href.split("?")[0]+"?query=$1&labels="+i.labelMapSelectedToCSV()+"'> (⏏ )</a>"),o=o.replace(/@\[(http.?[^\]]*)\]/g,"<a target='_new' href='$1'> [$1]</a>"),o=o.replace(/@\[([^\]]*)\]/g,"<a target='_new' href='$1'> [$1]</a>"),o=o.replace(/@\[#([^\]]*)\]/g,"<div class='innerLink' value='$1'> [$1]</div>"),o=o.replace(/Gº([^º\n]*)º/g,"  <b green >$1</b> "),o=o.replace(/Rº([^º\n]*)º/g,"  <b red   >$1</b> "),o=o.replace(/Bº([^º\n]*)º/g,"  <b blue  >$1</b> "),o=o.replace(/Oº([^º\n]*)º/g,"  <b orange>$1</b> "),o=o.replace(/Qº([^º\n]*)º/g,"  <b brown >$1</b> "),o=o.replace(/Yº([^º\n]*)º/g,"  <b yellow>$1</b> "),o=o.replace(/[$]º([^º\n]*)º/g,"  <span console>$1</span>"),o=o.replace(/_º([^º\n]*)º/g,"<span sub>$1   </span>"),o=o.replace(/^º([^º\n]*)º/g,"<span super>$1 </span>"),o=o.replace(/º([^º\n]*)º/g," <b        >$1</b> "),o=o.replace(/[˂]/g,"&lt;"),o=o.replace(/[˃]/g,"&gt;"),o=o.replace(/[⅋]/g,"&amp;"),o=o.replace(/☜/g,"👈"),o=o.replace(/☝/g,"👆"),o=o.replace(/☞/g,"👉"),o=o.replace(/☟/g,"👇"),o=o.replace(/[.]\n/g,".<br/>"),o=o.replace(/[:]\n/g,":<br/>"),o=o.replace(/\n\s*\n/g,"<br/><br/>"),n.innerHTML=o)}}(),n.initCSSIndexes(),i.createLabelIndex(),t.renderZoomBox(),e.renderSearchForm(),r.renderMenuBar(),function(){let n=window.location.hash.replace("#","");if(""==n&&(n=d("id")||""),n){const e=document.getElementById(n);if(e)return void t.doOpenZoom(e)}let o=d("topics")||"";o=o.toLowerCase();let l=o?o.split(","):[];l.forEach((e=>{i.onLabelClicked({target:{value:e}})}));let r=d("query");r&&(e.regexQuery=r),(r||l)&&c.executeSearch();let s=d("showSearchMenu")||"";["0","false"].indexOf(s.toLowerCase())<0&&e.showSearchForm();try{!function(){console.log("debug custom postLoad");let e='<image style="height:0; width:0; size:0;" src="http://www.oficina24x7.com/visited/'+escape(document.location)+'" ></image><span class="noprint" style="float:left;"><a href="https://github.com/SinglePageBookProject/IT_notes/stargazers" target="_blank"><svg style="stroke: blue; fill:blue  " height="32" viewBox="32 31 448 448" version="1.1" width="40" aria-hidden="true">  <path d="M 256 32 C 132.3,32 32,134.9 32,261.7 C 32,363.2 96.2,449.2 185.2,479.6 C 186.6,479.9 187.8,480 189,480 C 197.3,480 200.5,473.9 200.5,468.6 C 200.5,463.1 200.3,448.7 200.2,429.5 C 191.8,431.4 184.3,432.2 177.6,432.2 C 134.5,432.2 124.7,398.7 124.7,398.7 C 114.5,372.2 99.8,365.1 99.8,365.1 C 80.3,351.4 99.7,351 101.2,351 L 101.3,351 C 123.8,353 135.6,374.8 135.6,374.8 C 146.8,394.4 161.8,399.9 175.2,399.9 C 185.7,399.9 195.2,396.5 200.8,393.9 C 202.8,379.1 208.6,369 215,363.2 C 165.3,357.4 113,337.7 113,249.7 C 113,224.6 121.7,204.1 136,188.1 C 133.7,182.3 126,158.9 138.2,127.3 C 138.2,127.3 139.8,126.8 143.2,126.8 C 151.3,126.8 169.6,129.9 199.8,150.9 C 217.7,145.8 236.8,143.3 255.9,143.2 C 274.9,143.3 294.1,145.8 312,150.9 C 342.2,129.9 360.5,126.8 368.6,126.8 C 372,126.8 373.6,127.3 373.6,127.3 C 385.8,158.9 378.1,182.3 375.8,188.1 C 390.1,204.2 398.8,224.7 398.8,249.7 C 398.8,337.9 346.4,357.3 296.5,363 C 304.5,370.1 311.7,384.1 311.7,405.5 C 311.7,436.2 311.4,461 311.4,468.5 C 311.4,473.9 314.5,480 322.8,480 C 324,480 325.4,479.9 326.8,479.6 C 415.9,449.2 480,363.1 480,261.7 C 480,134.9 379.7,32 256,32"/></path></svg></a></span>';document.getElementById("printButton").insertAdjacentHTML("afterend",e)}()}catch(e){console.dir(e)}}()}})),Array.prototype.union=function(e){var t=this.slice(0);return e.forEach((function(e){t.indexOf(e)<0&&t.push(e)})),t},Array.prototype.intersection=function(e){var t=[],n=this.slice(0);return e.forEach((function(e){n.indexOf(e)>=0&&t.push(e)})),t};const c={searchAndMark:function(t,n){const i=e.singleLineMode?t.innerHTML:t.innerHTML.replace(/\n/gm," "),l=n.test(i);if(n.lastIndex=0,t.setAttribute("textFound",l?"true":"false"),l){for(let e=t.parentElement;null!=e&&e!=document.body;e=e.parentElement)e.setAttribute("textFound","true");o.visited.push(t),window.lastElementFound=t}return l},executeSearch:function(n){const l=document.getElementById("unhide");l.setAttribute("hidden",""),"string"!=typeof n&&(n=""),n&&(e.regexQuery=n);let r=e.regexQuery.replace(/ +/g,".*");c.resetTextFoundAttr(!1);const d=/^\s*$/.test(r);if(e.fullWordMode&&(r="\\b"+r+"\\b"),!i.isAnyLabelSelected()&&d)return!1;[document.querySelectorAll("div[group]"),document.querySelectorAll("div[groupv]")].forEach((e=>{e.forEach((e=>{e.setAttribute("textFound","false")}))})),document.querySelectorAll("*[zoom]").forEach((e=>{e.setAttribute("textFound","false")}));var s=[];if(i.isAnyLabelSelected()){let t=Object.keys(i.state.labelMapSelected);s=i.getDomListForLabelPrefix(t[0]);for(let n=0;n<t.length;n++)s=e.labelANDMode?s.intersection(i.getDomListForLabelPrefix(t[n])):s.union(i.getDomListForLabelPrefix(t[n]))}else s=document.querySelectorAll("*[zoom]");var a="g";e.matchCaseMode||(a+="i"),e.singleLineMode||(a+="m");const u=d?new RegExp(".*"):new RegExp("[^=>;]?("+r+")",a);var m=0;o.visited=[];for(let e in s){const t=s[e];null!=t.innerHTML&&t.setAttribute&&c.searchAndMark(t,u)&&m++}1==m&&t.doOpenZoom(lastElementFound);let p="<span red>no matches</span>";return m>0&&(p=m+" found",document.getElementById("searchForm").setAttribute("resultFound","true"),setTimeout((()=>{document.getElementById("searchForm").removeAttribute("resultFound")}),4500)),document.getElementById("matchNumber").innerHTML=p,l.removeAttribute("hidden",""),!1},resetTextFoundAttr:function(e){const t=document.querySelectorAll("*[textFound]");if(0!=t.length)for(let n in t)t[n].setAttribute&&(e&&"true"==t[n].getAttribute("textFound")||t[n].removeAttribute("textFound"))}}})();