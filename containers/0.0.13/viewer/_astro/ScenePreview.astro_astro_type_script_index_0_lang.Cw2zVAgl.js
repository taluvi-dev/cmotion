import{b as y}from"./cmotion-viewer.DMZZwwgK.js";const l=`runner "0.0.3";

use std.shapes.*;
use std.mesh3d.*;
use std.text;
use std.lighting.*;
use std.scene3d.*;
use std.anim.*;

scene title(duration: Duration = 6s) -> Frame {
  let bg = rect(width: 1920px, height: 1080px, fill: oklch(0.10, 0.04, 280));

  let rot   = animate { 0s => 0deg,   6s => 360deg } with { repeat: forever };
  let hue   = animate { 0s => 280deg, 4s => 640deg } with { repeat: forever };
  let pulse = animate {
                0s    => 1.00,
                500ms => 1.06,
                1s    => 1.00,
              } with { easing: easing.out_cubic, repeat: forever };

  let wobble = wave(amplitude: 8.6deg, period: 12s);

  let glyph = extrude(text.glyph("C", font: "Inter Bold"), depth: 16px)
                .material(fill: oklch(0.78, 0.20, hue),
                          metalness: 0.25,
                          roughness: 0.35,
                          emissive: oklch(0.65, 0.18, hue),
                          emissive_intensity: 0.6)
                .rotate(x: wobble, y: rot)
                .scale(pulse);

  let lights = [
    ambient(0.35),
    directional(from: vec3(3, 4, 5),    intensity: 1.6),
    directional(from: vec3(-4, -2, -3), intensity: 0.9),
  ];

  compose [
    bg,
    render3d(glyph, lights: lights),
  ]
}
`;function p(t){for(const o of document.querySelectorAll('a[href^="/editor/"]'))o.href=`/editor/#source=${encodeURIComponent(t)}`}async function g(t){const o=t.querySelector("canvas[data-scene-preview]"),i=t.querySelector("textarea[data-scene-source]"),a=t.querySelector("button[data-scene-render]"),n=t.querySelector("figcaption span");if(!o||!i||!a||!n)return;const v=n.innerHTML;i.value=l,p(l);let r;try{r=await y(o),r.load(l)}catch(e){console.error("[cmotion homepage preview]",e);return}let d=!0;const u=new IntersectionObserver(e=>{for(const s of e)d=s.isIntersecting},{threshold:0});u.observe(o);let m=!0,c=0,f=performance.now();function h(e){if(m){if(d){const s=(e-f)/1e3%r.durationSeconds;try{r.seek(s)}catch{}}c=requestAnimationFrame(h)}}c=requestAnimationFrame(h),a.addEventListener("click",()=>{a.disabled=!0,n.classList.remove("err"),n.innerHTML=v;const e=i.value;try{r.load(e),f=performance.now(),p(e)}catch(s){n.textContent=String(s?.message??s),n.classList.add("err")}finally{a.disabled=!1}}),i.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key==="Enter"&&(e.preventDefault(),a.click())}),document.addEventListener("astro:before-swap",()=>{m=!1,cancelAnimationFrame(c),u.disconnect(),r.destroy()},{once:!0})}for(const t of document.querySelectorAll("figure.scene-preview"))g(t);
