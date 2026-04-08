(function ($) {
"use strict";

const spinner=function(){setTimeout(function(){if($('#spinner').length>0){$('#spinner').removeClass('show')}},1)};spinner();

$(window).scroll(function(){if($(this).scrollTop()>300){$('.back-to-top').fadeIn('slow')}else{$('.back-to-top').fadeOut('slow')}});

$('.back-to-top').click(function(){$('html, body').animate({scrollTop:0},900,'easeInOutExpo');return false});

function setupPagination(contentId,paginationId,itemsPerPage){
const content=document.getElementById(contentId);if(!content)return;
const items=content.querySelectorAll(".news-item");
const pagination=document.getElementById(paginationId);if(!pagination)return;
let currentPage=1;
const totalPages=Math.ceil(items.length/itemsPerPage);

function showPage(page){
currentPage=page;
items.forEach((item,index)=>{
item.style.display=index>=(page-1)*itemsPerPage&&index<page*itemsPerPage?"block":"none"
});
renderPagination()
}

function renderPagination(){
pagination.innerHTML="";
const prevBtn=document.createElement("button");
prevBtn.innerHTML="&#8592;";
prevBtn.classList.add("pagination-arrow");
prevBtn.disabled=currentPage===1;
prevBtn.onclick=()=>showPage(currentPage-1);
pagination.appendChild(prevBtn);

for(let i=1;i<=totalPages;i++){
const btn=document.createElement("button");
btn.innerText=i;
if(i===currentPage){btn.classList.add("active")}
btn.onclick=()=>showPage(i);
pagination.appendChild(btn)
}

const nextBtn=document.createElement("button");
nextBtn.innerHTML="&#8594;";
nextBtn.classList.add("pagination-arrow");
nextBtn.disabled=currentPage===totalPages;
nextBtn.onclick=()=>showPage(currentPage+1);
pagination.appendChild(nextBtn)
}
showPage(1)
}

let testimonialInitDone=false;
function initTestimonialCarousel(){
if(testimonialInitDone)return;
if($(".testimonial-carousel").length){
if(typeof $.fn.owlCarousel==='undefined'){setTimeout(initTestimonialCarousel,100);return}
testimonialInitDone=true;
$(".testimonial-carousel").owlCarousel({
autoplay:true,smartSpeed:1000,center:true,dots:true,loop:true,margin:25,nav:true,
navText:['<i class="bi bi-arrow-left"></i>','<i class="bi bi-arrow-right"></i>'],
responsive:{0:{items:1},768:{items:2},992:{items:3}}
})
}}

function initStickyNavbar(){
const navbar=document.querySelector(".navbar");
const hero=document.querySelector(".hero-carousel");
if(!navbar)return;
const triggerPoint=hero?(hero.offsetHeight-navbar.offsetHeight):100;
window.addEventListener("scroll",()=>{navbar.classList.toggle("sticky-top",window.scrollY>triggerPoint)})
}

function initSocial(){
const wrapper=document.querySelector(".social-wrapper");
const toggle=wrapper?.querySelector(".social-toggle");
if(!wrapper||!toggle)return;
let isDragging=false,startX=0,startY=0;

toggle.addEventListener("click",(e)=>{if(isDragging){e.preventDefault();return}e.stopPropagation();wrapper.classList.toggle("active")});

document.addEventListener("click",(e)=>{if(isDragging)return;if(!wrapper.contains(e.target)){wrapper.classList.remove("active")}});

toggle.addEventListener("touchstart",(e)=>{
const t=e.touches[0];isDragging=false;
const rect=wrapper.getBoundingClientRect();
startX=t.clientX-rect.left;startY=t.clientY-rect.top;
wrapper.style.transition="none"
},{passive:true});

toggle.addEventListener("touchmove",(e)=>{
const t=e.touches[0];isDragging=true;
wrapper.style.left=(t.clientX-startX)+"px";
wrapper.style.top=(t.clientY-startY)+"px";
wrapper.style.right="auto";wrapper.style.bottom="auto";
wrapper.style.transform="none"
},{passive:true});

toggle.addEventListener("touchend",()=>{setTimeout(()=>isDragging=false,80);wrapper.style.transition=""});

window.addEventListener("scroll",()=>{
if(window.scrollY>1000){wrapper.classList.add("scrolled")}
else{wrapper.classList.remove("scrolled");wrapper.classList.remove("active")}
})
}

async function loadLayout(){
try{
if(document.getElementById("topbar")){
const r=await fetch("/topbar.html");
document.getElementById("topbar").innerHTML=await r.text()
}
if(document.getElementById("banner")){
const r=await fetch("/web_ribbon/banner.html");
document.getElementById("banner").innerHTML=await r.text()
}
if(document.getElementById("navbar")){
const r=await fetch("/navbar.html");
document.getElementById("navbar").innerHTML=await r.text()
}
if(document.getElementById("homenavbar")){
const r=await fetch("/homenavbar.html");
document.getElementById("homenavbar").innerHTML=await r.text()
}
if(document.getElementById("footer")){
const r=await fetch("/footer.html");
document.getElementById("footer").innerHTML=await r.text();
initSocial()
}
requestAnimationFrame(()=>{
initStickyNavbar();
initTestimonialCarousel();

if(window.jQuery&&$.fn.owlCarousel){
$(".InternationalTour-carousel").owlCarousel({
autoplay:true,smartSpeed:1000,center:false,dots:true,loop:true,margin:25,nav:false,
navText:['<i class="bi bi-arrow-left"></i>','<i class="bi bi-arrow-right"></i>'],
responsive:{0:{items:1},768:{items:2},1200:{items:3}}
});

$(".packages-carousel").owlCarousel({
autoplay:true,smartSpeed:1000,center:false,dots:false,loop:true,margin:25,nav:true,
navText:['<i class="bi bi-arrow-left"></i>','<i class="bi bi-arrow-right"></i>'],
responsive:{0:{items:1},768:{items:2},1200:{items:3}}
})
}

setupPagination("circular-content","circular-pagination",3);
setupPagination("exam-content","exam-pagination",3);
setupPagination("placement-content","placement-pagination",3);

document.querySelectorAll('.news-item').forEach(item=>{
item.addEventListener('click',function(){
this.style.background='#e0eaff';
setTimeout(()=>this.style.background='',300)
})
});

document.querySelectorAll('.btn-outline-secondary').forEach(btn=>{
btn.addEventListener('click',function(){
const icon=this.querySelector('i');
if(icon){
icon.className='fas fa-check';
setTimeout(()=>icon.className='fas fa-download',1500)
}
})
});

const video=document.getElementById('heroVideo');
if(video){
video.load();video.pause();let isPlaying=false;
video.addEventListener('mouseenter',()=>{
if(!isPlaying){video.play().catch(()=>{});isPlaying=true}
});
video.addEventListener('ended',()=>{
video.pause();video.currentTime=0;isPlaying=false
});
document.addEventListener('visibilitychange',()=>{
if(document.hidden&&!video.paused){video.pause();isPlaying=false}
})
}
})
}catch(e){console.error(e)}
}

document.addEventListener("DOMContentLoaded",loadLayout);

document.addEventListener("click",function(e){
const subToggle=e.target.closest(".submenu-toggle");
if(subToggle){
e.preventDefault();
const submenu=subToggle.parentElement.querySelector(".dropdown-menu");
document.querySelectorAll(".dropdown-submenu .dropdown-menu.show").forEach(m=>{if(m!==submenu)m.classList.remove("show")});
submenu.classList.toggle("show");
return
}
if(!e.target.closest(".navbar")){
document.querySelectorAll(".dropdown-menu.show").forEach(m=>m.classList.remove("show"))
}
});

if(typeof $!=="undefined"&&$.fn.owlCarousel){console.log("OwlCarousel loaded")}

})(jQuery);
