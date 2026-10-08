const intro=document.getElementById("intro");
const openButton=document.getElementById("openInvitation");
const weddingContent=document.getElementById("weddingContent");
const music=document.getElementById("weddingMusic");
const musicBtn=document.getElementById("musicBtn");
const kiss=document.getElementById("kissSound");
const confirmBtn=document.getElementById("confirmBtn");
const shareBtn=document.getElementById("shareBtn");
const photosBtn=document.getElementById("photosBtn");
const modal=document.getElementById("rsvpModal");
const closeModal=document.getElementById("closeModal");
const rsvpSubmit=document.getElementById("rsvpSubmit");
const guestName=document.getElementById("guestName");
const attendance=document.getElementById("attendance");
const guestCount=document.getElementById("guestCount");
const rsvpNote=document.getElementById("rsvpNote");

// Put the real wedding photo album URL here when you have it.
const PHOTOS_LINK="";

function playKiss(){
  try{kiss.currentTime=0; kiss.play().catch(()=>{});}catch(e){}
}
document.querySelectorAll("[data-kiss]").forEach(el=>el.addEventListener("click",playKiss));

openButton.addEventListener("click",()=>{
  playKiss();
  openButton.disabled=true;
  intro.classList.add("animate");
  music.play().then(()=>musicBtn.classList.add("playing")).catch(()=>{});
  setTimeout(()=>{
    intro.classList.add("finished");
    weddingContent.classList.add("show");
    weddingContent.setAttribute("aria-hidden","false");
    window.scrollTo({top:0,behavior:"instant"});
  },2850);
});

musicBtn.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();musicBtn.classList.add("playing")}catch(e){}}else{music.pause();musicBtn.classList.remove("playing")}
});

const weddingDate=new Date("2026-12-12T20:00:00+02:00").getTime();
const $=id=>document.getElementById(id);
function updateCountdown(){
  const diff=weddingDate-Date.now();
  if(diff<=0){["days","hours","minutes","seconds"].forEach(id=>$(id).textContent="00");return;}
  $("days").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");
  $("hours").textContent=String(Math.floor((diff/3600000)%24)).padStart(2,"0");
  $("minutes").textContent=String(Math.floor((diff/60000)%60)).padStart(2,"0");
  $("seconds").textContent=String(Math.floor((diff/1000)%60)).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);

shareBtn.addEventListener("click",async()=>{
  const data={title:"Amr Kamal & Sereen Ayman — Wedding Invitation",text:"You're invited to celebrate Amr Kamal & Sereen Ayman's wedding on December 12, 2026.",url:window.location.href};
  try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(window.location.href);alert("Invitation link copied!")}}catch(e){}
});

function showModal(){modal.classList.add("show");modal.setAttribute("aria-hidden","false");setTimeout(()=>guestName.focus(),50)}
function hideModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");rsvpNote.textContent=""}
confirmBtn.addEventListener("click",showModal);closeModal.addEventListener("click",hideModal);modal.addEventListener("click",e=>{if(e.target===modal)hideModal()});
rsvpSubmit.addEventListener("click",async()=>{
  const name=guestName.value.trim()||"Guest";const count=Math.max(1,Number(guestCount.value)||1);const status=attendance.value;
  const text=`Wedding RSVP — Amr Kamal & Sereen Ayman\nName: ${name}\nAttendance: ${status}\nGuests: ${count}`;
  try{await navigator.clipboard.writeText(text);rsvpNote.textContent="Your RSVP message is copied. Send it to the couple."}catch(e){rsvpNote.textContent="Your RSVP is ready. Please copy the details and send them to the couple."}
});

photosBtn.addEventListener("click",()=>{
  window.location.href="photos.html";
});

(function makeStars(){
  const wrap=document.getElementById("stars");
  const count=window.innerWidth<600?42:78;
  for(let i=0;i<count;i++){
    const s=document.createElement("span");s.className="star";
    s.style.left=(Math.random()*100)+"vw";s.style.top=(Math.random()*100)+"vh";
    s.style.setProperty("--d",(1.6+Math.random()*3.5)+"s");s.style.setProperty("--delay",(-Math.random()*4)+"s");
    s.style.transform=`scale(${.5+Math.random()})`;
    wrap.appendChild(s);
  }
})();