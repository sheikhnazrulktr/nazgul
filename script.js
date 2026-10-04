const scenes=[...document.querySelectorAll(".scene")];
let current=0;
let musicStarted=false;

window.addEventListener("load",()=>{
 setTimeout(()=>document.getElementById("loader").classList.add("hide"),900);
 for(let i=0;i<8;i++) setTimeout(createHeart,i*800);
});

function nextScene(id){
 scenes.forEach(s=>s.classList.remove("active"));
 const target=document.getElementById(id);
 target.classList.add("active");
 current=scenes.indexOf(target);
 startMusic();
}

function startProposal(){
 nextScene("scene6");
 let n=3;
 const count=document.querySelector(".count");
 if(count){
   count.textContent="03";
   const timer=setInterval(()=>{
     n--;
     if(n>0) count.textContent="0"+n;
     else {count.textContent="♥";clearInterval(timer);}
   },700);
 }
}

function yesAnswer(){
 for(let i=0;i<35;i++) setTimeout(createHeart,i*60);
 setTimeout(()=>nextScene("scene7"),700);
}

function startMusic(){
 if(musicStarted)return;
 const audio=document.getElementById("music");
 audio.volume=.35;
 audio.play().then(()=>musicStarted=true).catch(()=>{});
}

function toggleMusic(){
 const audio=document.getElementById("music");
 if(audio.paused){audio.play();document.getElementById("musicBtn").textContent="♫";}
 else{audio.pause();document.getElementById("musicBtn").textContent="♪";}
}

function createHeart(){
 const h=document.createElement("span");
 h.className="heart";
 h.textContent="♥";
 h.style.left=Math.random()*100+"%";
 h.style.fontSize=(8+Math.random()*15)+"px";
 h.style.animationDuration=(5+Math.random()*5)+"s";
 document.querySelector(".hearts").appendChild(h);
 setTimeout(()=>h.remove(),10000);
}

document.addEventListener("keydown",e=>{
 if(e.key==="ArrowRight" && current<scenes.length-1) nextScene(scenes[current+1].id);
 if(e.key==="ArrowLeft" && current>0) nextScene(scenes[current-1].id);
});
