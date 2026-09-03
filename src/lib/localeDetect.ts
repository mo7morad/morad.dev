/* Smart landing: an Arabic-first browser lands on the Arabic side on its first
   visit. An explicit toggle (nav/footer link) always wins over detection,
   because it is stored as the visitor's choice. Runs only on the two home
   paths — deep links are never hijacked. Crawlers report en-US, so indexing of
   / is unaffected; hreflang does the rest.

   Adapted from the pattern proven at trippe.tech. */

export const LOCALE_STORAGE_KEY = "morad.locale";

export const LOCALE_DETECT_SCRIPT = `(function(){try{
var K="${LOCALE_STORAGE_KEY}";
var saved=null;try{saved=localStorage.getItem(K)}catch(e){}
var langs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||""];
var wantsAr=false;for(var i=0;i<langs.length;i++){if(/^ar([-_]|$)/i.test(langs[i]||"")){wantsAr=true;break}}
function store(v){try{localStorage.setItem(K,v)}catch(e){}}
var p=location.pathname;
if(p==="/"||p===""){
if(saved==="ar"){location.replace("/ar/");return}
if(saved===null){store(wantsAr?"ar":"en");if(wantsAr){location.replace("/ar/")}}
}else if(p==="/ar"||p==="/ar/"){
if(saved==="en"){location.replace("/")}
}
}catch(e){}})();`;
