const $t="srgb",Mr="srgb-linear",Ps="linear",ft="srgb";const Yo="300 es";function Ih(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Er(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Uh(){const n=Er("canvas");return n.style.display="block",n}const jo={};function $o(...n){const e="THREE."+n.shift();console.log(e,...n)}function Vc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function $e(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function lt(...n){n=Vc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Xa(...n){const e=n.join(" ");e in jo||(jo[e]=!0,$e(...n))}function Fh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Oh={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zo=1234567;const xr=Math.PI/180,Ar=180/Math.PI;function yi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function at(n,e,t){return Math.max(e,Math.min(t,n))}function lo(n,e){return(n%e+e)%e}function Nh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function kh(n,e,t){return n!==e?(t-n)/(e-n):0}function vr(n,e,t){return(1-t)*n+t*e}function Bh(n,e,t,i){return vr(n,e,1-Math.exp(-t*i))}function Gh(n,e=1){return e-Math.abs(lo(n,e*2)-e)}function zh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Vh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Hh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Wh(n,e){return n+Math.random()*(e-n)}function Xh(n){return n*(.5-Math.random())}function qh(n){n!==void 0&&(Zo=n);let e=Zo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yh(n){return n*xr}function jh(n){return n*Ar}function $h(n){return(n&n-1)===0&&n!==0}function Zh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Kh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jh(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),h=a((e-i)/2),d=s((i-e)/2),p=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*f,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*f,o*c);break;case"ZXZ":n.set(l*f,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*p,l*d,o*c);break;case"YXY":n.set(l*d,o*u,l*p,o*c);break;case"ZYZ":n.set(l*p,l*d,o*u,o*c);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Hi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Yt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Qh={DEG2RAD:xr,RAD2DEG:Ar,generateUUID:yi,clamp:at,euclideanModulo:lo,mapLinear:Nh,inverseLerp:kh,lerp:vr,damp:Bh,pingpong:Gh,smoothstep:zh,smootherstep:Vh,randInt:Hh,randFloat:Wh,randFloatSpread:Xh,seededRandom:qh,degToRad:Yh,radToDeg:jh,isPowerOfTwo:$h,ceilPowerOfTwo:Zh,floorPowerOfTwo:Kh,setQuaternionFromProperEuler:Jh,normalize:Yt,denormalize:Hi};class he{static{he.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(at(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ir{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],d=s[a+1],p=s[a+2],x=s[a+3];if(f!==x||l!==h||c!==d||u!==p){let m=l*h+c*d+u*p+f*x;m<0&&(h=-h,d=-d,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){const _=Math.acos(m),v=Math.sin(_);g=Math.sin(g*_)/v,o=Math.sin(o*_)/v,l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+x*o}else{l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+x*o;const _=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=_,c*=_,u*=_,f*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{static{q.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ko.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ko.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(at(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ta=new q,Ko=new ir;class Ze{static{Ze.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],x=r[0],m=r[3],g=r[6],_=r[1],v=r[4],S=r[7],R=r[2],M=r[5],w=r[8];return s[0]=a*x+o*_+l*R,s[3]=a*m+o*v+l*M,s[6]=a*g+o*S+l*w,s[1]=c*x+u*_+f*R,s[4]=c*m+u*v+f*M,s[7]=c*g+u*S+f*w,s[2]=h*x+d*_+p*R,s[5]=h*m+d*v+p*M,s[8]=h*g+d*S+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+i*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=f*x,e[1]=(r*c-u*i)*x,e[2]=(o*i-r*a)*x,e[3]=h*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new Ze,Jo=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qo=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ef(){const n={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ft&&(r.r=kn(r.r),r.g=kn(r.g),r.b=kn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(r.r=Wi(r.r),r.g=Wi(r.g),r.b=Wi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Ps:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Xa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Xa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mr]:{primaries:e,whitePoint:i,transfer:Ps,toXYZ:Jo,fromXYZ:Qo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:Jo,fromXYZ:Qo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),n}const ot=ef();function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Wi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ai;class tf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ai===void 0&&(Ai=Er("canvas")),Ai.width=e.width,Ai.height=e.height;const r=Ai.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ai}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Er("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=kn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(kn(t[i]/255)*255):t[i]=kn(t[i]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nf=0;class co{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=yi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ia(r[a].image)):s.push(ia(r[a]))}else s=ia(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function ia(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?tf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}let rf=0;const ra=new q;class Wt extends _i{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=Wt.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=yi(),this.name="",this.source=new co(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=300;Wt.DEFAULT_ANISOTROPY=1;class bt{static{bt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,S=(d+1)/2,R=(g+1)/2,M=(u+h)/4,w=(f+x)/4,y=(p+m)/4;return v>S&&v>R?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=M/i,s=w/i):S>R?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=M/r,s=y/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=w/s,r=y/s),this.set(i,r,s,t),this}let _=Math.sqrt((m-p)*(m-p)+(f-x)*(f-x)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(f-x)/_,this.z=(h-u)/_,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(at(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sf extends _i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Wt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new co(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kt extends sf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Hc extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class af extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class St{static{St.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,h,d,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,x,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,x,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=d,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ci.setFromMatrixColumn(e,0).length(),s=1/Ci.setFromMatrixColumn(e,1).length(),a=1/Ci.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,p=c*u,x=c*f;t[0]=h+x*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,p=c*u,x=c*f;t[0]=h-x*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,p=o*u,x=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+x,t[1]=l*f,t[5]=x*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-x*f}else if(e.order==="XZY"){const h=a*l,d=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+x,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=x*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(of,e,lf)}lookAt(e,t,i){const r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Hn.crossVectors(i,Qt),Hn.lengthSq()===0&&(Math.abs(i.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Hn.crossVectors(i,Qt)),Hn.normalize(),$r.crossVectors(Qt,Hn),r[0]=Hn.x,r[4]=$r.x,r[8]=Qt.x,r[1]=Hn.y,r[5]=$r.y,r[9]=Qt.y,r[2]=Hn.z,r[6]=$r.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],x=i[6],m=i[10],g=i[14],_=i[3],v=i[7],S=i[11],R=i[15],M=r[0],w=r[4],y=r[8],P=r[12],D=r[1],F=r[5],B=r[9],G=r[13],k=r[2],I=r[6],X=r[10],H=r[14],Y=r[3],le=r[7],pe=r[11],ve=r[15];return s[0]=a*M+o*D+l*k+c*Y,s[4]=a*w+o*F+l*I+c*le,s[8]=a*y+o*B+l*X+c*pe,s[12]=a*P+o*G+l*H+c*ve,s[1]=u*M+f*D+h*k+d*Y,s[5]=u*w+f*F+h*I+d*le,s[9]=u*y+f*B+h*X+d*pe,s[13]=u*P+f*G+h*H+d*ve,s[2]=p*M+x*D+m*k+g*Y,s[6]=p*w+x*F+m*I+g*le,s[10]=p*y+x*B+m*X+g*pe,s[14]=p*P+x*G+m*H+g*ve,s[3]=_*M+v*D+S*k+R*Y,s[7]=_*w+v*F+S*I+R*le,s[11]=_*y+v*B+S*X+R*pe,s[15]=_*P+v*G+S*H+R*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],x=e[7],m=e[11],g=e[15],_=l*d-c*h,v=o*d-c*f,S=o*h-l*f,R=a*d-c*u,M=a*h-l*u,w=a*f-o*u;return t*(x*_-m*v+g*S)-i*(p*_-m*R+g*M)+r*(p*v-x*R+g*w)-s*(p*S-x*M+m*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],x=e[13],m=e[14],g=e[15],_=t*o-i*a,v=t*l-r*a,S=t*c-s*a,R=i*l-r*o,M=i*c-s*o,w=r*c-s*l,y=u*x-f*p,P=u*m-h*p,D=u*g-d*p,F=f*m-h*x,B=f*g-d*x,G=h*g-d*m,k=_*G-v*B+S*F+R*D-M*P+w*y;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/k;return e[0]=(o*G-l*B+c*F)*I,e[1]=(r*B-i*G-s*F)*I,e[2]=(x*w-m*M+g*R)*I,e[3]=(h*M-f*w-d*R)*I,e[4]=(l*D-a*G-c*P)*I,e[5]=(t*G-r*D+s*P)*I,e[6]=(m*S-p*w-g*v)*I,e[7]=(u*w-h*S+d*v)*I,e[8]=(a*B-o*D+c*y)*I,e[9]=(i*D-t*B-s*y)*I,e[10]=(p*M-x*S+g*_)*I,e[11]=(f*S-u*M-d*_)*I,e[12]=(o*P-a*F-l*y)*I,e[13]=(t*F-i*P+r*y)*I,e[14]=(x*v-p*R-m*_)*I,e[15]=(u*R-f*v+h*_)*I,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,x=a*u,m=a*f,g=o*f,_=l*c,v=l*u,S=l*f,R=i.x,M=i.y,w=i.z;return r[0]=(1-(x+g))*R,r[1]=(d+S)*R,r[2]=(p-v)*R,r[3]=0,r[4]=(d-S)*M,r[5]=(1-(h+g))*M,r[6]=(m+_)*M,r[7]=0,r[8]=(p+v)*w,r[9]=(m-_)*w,r[10]=(1-(h+x))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ci.set(r[0],r[1],r[2]).length();const o=Ci.set(r[4],r[5],r[6]).length(),l=Ci.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ln.copy(this);const c=1/a,u=1/o,f=1/l;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,t.setFromRotationMatrix(ln),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=2e3,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,x;if(l)p=s/(a-s),x=a*s/(a-s);else if(o===2e3)p=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===2001)p=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=2e3,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let p,x;if(l)p=1/(a-s),x=a/(a-s);else if(o===2e3)p=-2/(a-s),x=-(a+s)/(a-s);else if(o===2001)p=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ci=new q,ln=new St,of=new q(0,0,0),lf=new q(1,1,1),Hn=new q,$r=new q,Qt=new q,el=new St,tl=new ir;class ii{constructor(e=0,t=0,i=0,r=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-at(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(at(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-at(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(at(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return el.makeRotationFromQuaternion(e),this.setFromRotationMatrix(el,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tl.setFromEuler(this),this.setFromQuaternion(tl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cf=0;const nl=new q,Ri=new ir,Ln=new St,Zr=new q,lr=new q,uf=new q,hf=new ir,il=new q(1,0,0),rl=new q(0,1,0),sl=new q(0,0,1),al={type:"added"},ff={type:"removed"},wi={type:"childadded",child:null},sa={type:"childremoved",child:null};class Xt extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new q,t=new ii,i=new ir,r=new q(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ze}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ri.setFromAxisAngle(e,t),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(e,t){return Ri.setFromAxisAngle(e,t),this.quaternion.premultiply(Ri),this}rotateX(e){return this.rotateOnAxis(il,e)}rotateY(e){return this.rotateOnAxis(rl,e)}rotateZ(e){return this.rotateOnAxis(sl,e)}translateOnAxis(e,t){return nl.copy(e).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(il,e)}translateY(e){return this.translateOnAxis(rl,e)}translateZ(e){return this.translateOnAxis(sl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zr.copy(e):Zr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(lr,Zr,this.up):Ln.lookAt(Zr,lr,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Ri.setFromRotationMatrix(Ln),this.quaternion.premultiply(Ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(al),wi.child=e,this.dispatchEvent(wi),wi.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ff),sa.child=e,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(al),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,e,uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,hf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Xt.DEFAULT_UP=new q(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mi extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const df={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(df)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function oa(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=i,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ot.workingColorSpace){if(e=lo(e,1),t=at(t,0,1),i=at(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=oa(a,s,e+1/3),this.g=oa(a,s,e),this.b=oa(a,s,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=$t){function i(s){s!==void 0&&parseFloat(s)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const i=Xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return ot.workingToColorSpace(Vt.copy(this),e),Math.round(at(Vt.r*255,0,255))*65536+Math.round(at(Vt.g*255,0,255))*256+Math.round(at(Vt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Vt.copy(this),t);const i=Vt.r,r=Vt.g,s=Vt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=$t){ot.workingToColorSpace(Vt.copy(this),e);const t=Vt.r,i=Vt.g,r=Vt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Kr);const i=vr(Wn.h,Kr.h,t),r=vr(Wn.s,Kr.s,t),s=vr(Wn.l,Kr.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new Je;Je.NAMES=Xc;class pf extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const cn=new q,Dn=new q,la=new q,In=new q,Pi=new q,Li=new q,ol=new q,ca=new q,ua=new q,ha=new q,fa=new bt,da=new bt,pa=new bt;class fn{constructor(e=new q,t=new q,i=new q){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),cn.subVectors(e,t),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){cn.subVectors(r,t),Dn.subVectors(i,t),la.subVectors(e,t);const a=cn.dot(cn),o=cn.dot(Dn),l=cn.dot(la),c=Dn.dot(Dn),u=Dn.dot(la),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return fa.setScalar(0),da.setScalar(0),pa.setScalar(0),fa.fromBufferAttribute(e,t),da.fromBufferAttribute(e,i),pa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(fa,s.x),a.addScaledVector(da,s.y),a.addScaledVector(pa,s.z),a}static isFrontFacing(e,t,i,r){return cn.subVectors(i,t),Dn.subVectors(e,t),cn.cross(Dn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),cn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return fn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Pi.subVectors(r,i),Li.subVectors(s,i),ca.subVectors(e,i);const l=Pi.dot(ca),c=Li.dot(ca);if(l<=0&&c<=0)return t.copy(i);ua.subVectors(e,r);const u=Pi.dot(ua),f=Li.dot(ua);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Pi,a);ha.subVectors(e,s);const d=Pi.dot(ha),p=Li.dot(ha);if(p>=0&&d<=p)return t.copy(s);const x=d*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(Li,o);const m=u*p-d*f;if(m<=0&&f-u>=0&&d-p>=0)return ol.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(ol,o);const g=1/(m+x+h);return a=x*g,o=h*g,t.copy(i).addScaledVector(Pi,a).addScaledVector(Li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fr{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Jr.copy(i.boundingBox)),Jr.applyMatrix4(e.matrixWorld),this.union(Jr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),Qr.subVectors(this.max,cr),Di.subVectors(e.a,cr),Ii.subVectors(e.b,cr),Ui.subVectors(e.c,cr),Xn.subVectors(Ii,Di),qn.subVectors(Ui,Ii),oi.subVectors(Di,Ui);let t=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-oi.z,oi.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,oi.z,0,-oi.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-oi.y,oi.x,0];return!ma(t,Di,Ii,Ui,Qr)||(t=[1,0,0,0,1,0,0,0,1],!ma(t,Di,Ii,Ui,Qr))?!1:(es.crossVectors(Xn,qn),t=[es.x,es.y,es.z],ma(t,Di,Ii,Ui,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new q,new q,new q,new q,new q,new q,new q,new q],un=new q,Jr=new Fr,Di=new q,Ii=new q,Ui=new q,Xn=new q,qn=new q,oi=new q,cr=new q,Qr=new q,es=new q,li=new q;function ma(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){li.fromArray(n,s);const o=r.x*Math.abs(li.x)+r.y*Math.abs(li.y)+r.z*Math.abs(li.z),l=e.dot(li),c=t.dot(li),u=i.dot(li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Lt=new q,ts=new he;let mf=0;class pn extends _i{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ts.fromBufferAttribute(this,t),ts.applyMatrix3(e),this.setXY(t,ts.x,ts.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Hi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Yt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),r=Yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),i=Yt(i,this.array),r=Yt(r,this.array),s=Yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class qc extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yc extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class yt extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const gf=new Fr,ur=new q,ga=new q;class uo{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):gf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ur,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(ga)),this.expandByPoint(ur.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xf=0;const an=new St,xa=new Xt,Fi=new q,en=new Fr,hr=new Fr,Ft=new q;class kt extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ih(e)?Yc:qc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,i){return an.makeTranslation(e,t,i),this.applyMatrix4(an),this}scale(e,t,i){return an.makeScale(e,t,i),this.applyMatrix4(an),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(en.min,hr.min),en.expandByPoint(Ft),Ft.addVectors(en.max,hr.max),en.expandByPoint(Ft)):(en.expandByPoint(hr.min),en.expandByPoint(hr.max))}en.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ft.fromBufferAttribute(o,c),l&&(Fi.fromBufferAttribute(e,c),Ft.add(Fi)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new q,l[y]=new q;const c=new q,u=new q,f=new q,h=new he,d=new he,p=new he,x=new q,m=new q;function g(y,P,D){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,P),f.fromBufferAttribute(i,D),h.fromBufferAttribute(s,y),d.fromBufferAttribute(s,P),p.fromBufferAttribute(s,D),u.sub(c),f.sub(c),d.sub(h),p.sub(h);const F=1/(d.x*p.y-p.x*d.y);isFinite(F)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(F),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(F),o[y].add(x),o[P].add(x),o[D].add(x),l[y].add(m),l[P].add(m),l[D].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,P=_.length;y<P;++y){const D=_[y],F=D.start,B=D.count;for(let G=F,k=F+B;G<k;G+=3)g(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const v=new q,S=new q,R=new q,M=new q;function w(y){R.fromBufferAttribute(r,y),M.copy(R);const P=o[y];v.copy(P),v.sub(R.multiplyScalar(R.dot(P))).normalize(),S.crossVectors(M,P);const F=S.dot(l[y])<0?-1:1;a.setXYZW(y,v.x,v.y,v.z,F)}for(let y=0,P=_.length;y<P;++y){const D=_[y],F=D.start,B=D.count;for(let G=F,k=F+B;G<k;G+=3)w(e.getX(G+0)),w(e.getX(G+1)),w(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new q,s=new q,a=new q,o=new q,l=new q,c=new q,u=new q,f=new q;if(e)for(let h=0,d=e.count;h<d;h+=3){const p=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,p=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*u;for(let g=0;g<u;g++)h[p++]=c[d++]}return new pn(h,u,f)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let vf=0;class Or extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fn=new q,va=new q,ns=new q,Yn=new q,_a=new q,is=new q,ya=new q;class _f{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){va.copy(e).add(t).multiplyScalar(.5),ns.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(va);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ns),o=Yn.dot(this.direction),l=-Yn.dot(ns),c=Yn.lengthSq(),u=Math.abs(1-a*a);let f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){const x=1/u;f*=x,h*=x,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(va).addScaledVector(ns,h),d}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,r,s){_a.subVectors(t,e),is.subVectors(i,e),ya.crossVectors(_a,is);let a=this.direction.dot(ya),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,e);const l=o*this.direction.dot(is.crossVectors(Yn,is));if(l<0)return null;const c=o*this.direction.dot(_a.cross(Yn));if(c<0||l+c>a)return null;const u=-o*Yn.dot(ya);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Nr extends Or{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ll=new St,ci=new _f,rs=new uo,cl=new q,ss=new q,as=new q,os=new q,Sa=new q,ls=new q,ul=new q,cs=new q;class Ot extends Xt{constructor(e=new kt,t=new Nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ls.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Sa.fromBufferAttribute(f,e),a?ls.addScaledVector(Sa,u):ls.addScaledVector(Sa.sub(t),u))}t.add(ls)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),rs.copy(i.boundingSphere),rs.applyMatrix4(s),ci.copy(e.ray).recast(e.near),!(rs.containsPoint(ci.origin)===!1&&(ci.intersectSphere(rs,cl)===null||ci.origin.distanceToSquared(cl)>(e.far-e.near)**2))&&(ll.copy(s).invert(),ci.copy(e.ray).applyMatrix4(ll),!(i.boundingBox!==null&&ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=h.length;p<x;p++){const m=h[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),v=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let S=_,R=v;S<R;S+=3){const M=o.getX(S),w=o.getX(S+1),y=o.getX(S+2);r=us(this,g,e,i,c,u,f,M,w,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){const _=o.getX(m),v=o.getX(m+1),S=o.getX(m+2);r=us(this,a,e,i,c,u,f,_,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=h.length;p<x;p++){const m=h[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),v=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=_,R=v;S<R;S+=3){const M=S,w=S+1,y=S+2;r=us(this,g,e,i,c,u,f,M,w,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=p,g=x;m<g;m+=3){const _=m,v=m+1,S=m+2;r=us(this,a,e,i,c,u,f,_,v,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function yf(n,e,t,i,r,s,a,o){let l;if(e.side===1?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===0,o),l===null)return null;cs.copy(o),cs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(cs);return c<t.near||c>t.far?null:{distance:c,point:cs.clone(),object:n}}function us(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,ss),n.getVertexPosition(l,as),n.getVertexPosition(c,os);const u=yf(n,e,t,i,ss,as,os,ul);if(u){const f=new q;fn.getBarycoord(ul,ss,as,os,f),r&&(u.uv=fn.getInterpolatedAttribute(r,o,l,c,f,new he)),s&&(u.uv1=fn.getInterpolatedAttribute(s,o,l,c,f,new he)),a&&(u.normal=fn.getInterpolatedAttribute(a,o,l,c,f,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new q,materialIndex:0};fn.getNormal(ss,as,os,h.normal),u.face=h,u.barycoord=f}return u}class Sf extends Wt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=1003,u=1003,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ba=new q,bf=new q,Tf=new Ze;class fi{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ba.subVectors(i,t).cross(bf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ba),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Tf.getNormalMatrix(e),r=this.coplanarPoint(ba).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ui=new uo,Mf=new he(.5,.5),hs=new q;class ho{constructor(e=new fi,t=new fi,i=new fi,r=new fi,s=new fi,a=new fi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],x=s[9],m=s[10],g=s[11],_=s[12],v=s[13],S=s[14],R=s[15];if(r[0].setComponents(c-a,d-u,g-p,R-_).normalize(),r[1].setComponents(c+a,d+u,g+p,R+_).normalize(),r[2].setComponents(c+o,d+f,g+x,R+v).normalize(),r[3].setComponents(c-o,d-f,g-x,R-v).normalize(),i)r[4].setComponents(l,h,m,S).normalize(),r[5].setComponents(c-l,d-h,g-m,R-S).normalize();else if(r[4].setComponents(c-l,d-h,g-m,R-S).normalize(),t===2e3)r[5].setComponents(c+l,d+h,g+m,R+S).normalize();else if(t===2001)r[5].setComponents(l,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){ui.center.set(0,0,0);const t=Mf.distanceTo(e.center);return ui.radius=.7071067811865476+t,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(hs.x=r.normal.x>0?e.max.x:e.min.x,hs.y=r.normal.y>0?e.max.y:e.min.y,hs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jc extends Wt{constructor(e=[],t=301,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yi extends Wt{constructor(e,t,i=1014,r,s,a,o=1003,l=1003,c,u=1026,f=1){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new co(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ef extends Yi{constructor(e,t=1014,i=301,r,s,a=1003,o=1003,l,c=1026){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class $c extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class kr extends kt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(u,3)),this.setAttribute("uv",new yt(f,2));function p(x,m,g,_,v,S,R,M,w,y,P){const D=S/w,F=R/y,B=S/2,G=R/2,k=M/2,I=w+1,X=y+1;let H=0,Y=0;const le=new q;for(let pe=0;pe<X;pe++){const ve=pe*F-G;for(let Te=0;Te<I;Te++){const Ne=Te*D-B;le[x]=Ne*_,le[m]=ve*v,le[g]=k,c.push(le.x,le.y,le.z),le[x]=0,le[m]=0,le[g]=M>0?1:-1,u.push(le.x,le.y,le.z),f.push(Te/w),f.push(1-pe/y),H+=1}}for(let pe=0;pe<y;pe++)for(let ve=0;ve<w;ve++){const Te=h+ve+I*pe,Ne=h+ve+I*(pe+1),j=h+(ve+1)+I*(pe+1),N=h+(ve+1)+I*pe;l.push(Te,Ne,N),l.push(Ne,j,N),Y+=6}o.addGroup(d,Y,P),d+=Y,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class fo extends kt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new q,u=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const d=i+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new yt(a,3)),this.setAttribute("normal",new yt(o,3)),this.setAttribute("uv",new yt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$e("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],h=i[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new he:new q);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new q,r=[],s=[],a=[],o=new q,l=new St;for(let d=0;d<=e;d++){const p=d/e;r[d]=this.getTangentAt(p,new q)}s[0]=new q,a[0]=new q;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(at(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(at(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class po extends Rn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Af extends po{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function mo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const hl=new q,fl=new q,Ta=new mo,Ma=new mo,Ea=new mo;class Cf extends Rn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new q){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(fl.subVectors(r[0],r[1]).add(r[0]),c=fl);const f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(hl.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=hl),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),d),x=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),Ta.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,x,m),Ma.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,x,m),Ea.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,x,m)}else this.curveType==="catmullrom"&&(Ta.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),Ma.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Ea.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Ta.calc(l),Ma.calc(l),Ea.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new q().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function dl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function Rf(n,e){const t=1-n;return t*t*e}function wf(n,e){return 2*(1-n)*n*e}function Pf(n,e){return n*n*e}function _r(n,e,t,i){return Rf(n,e)+wf(n,t)+Pf(n,i)}function Lf(n,e){const t=1-n;return t*t*t*e}function Df(n,e){const t=1-n;return 3*t*t*n*e}function If(n,e){return 3*(1-n)*n*n*e}function Uf(n,e){return n*n*n*e}function yr(n,e,t,i,r){return Lf(n,e)+Df(n,t)+If(n,i)+Uf(n,r)}class Zc extends Rn{constructor(e=new he,t=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new he){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(yr(e,r.x,s.x,a.x,o.x),yr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ff extends Rn{constructor(e=new q,t=new q,i=new q,r=new q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new q){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(yr(e,r.x,s.x,a.x,o.x),yr(e,r.y,s.y,a.y,o.y),yr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Kc extends Rn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Of extends Rn{constructor(e=new q,t=new q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new q){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jc extends Rn{constructor(e=new he,t=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new he){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(_r(e,r.x,s.x,a.x),_r(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nf extends Rn{constructor(e=new q,t=new q,i=new q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new q){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(_r(e,r.x,s.x,a.x),_r(e,r.y,s.y,a.y),_r(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qc extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(dl(o,l.x,c.x,u.x,f.x),dl(o,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new he().fromArray(r))}return this}}var qa=Object.freeze({__proto__:null,ArcCurve:Af,CatmullRomCurve3:Cf,CubicBezierCurve:Zc,CubicBezierCurve3:Ff,EllipseCurve:po,LineCurve:Kc,LineCurve3:Of,QuadraticBezierCurve:Jc,QuadraticBezierCurve3:Nf,SplineCurve:Qc});class kf extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qa[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new qa[r.type]().fromJSON(r))}return this}}let Xi=class extends kf{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Kc(this.currentPoint.clone(),new he(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Jc(this.currentPoint.clone(),new he(e,t),new he(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Zc(this.currentPoint.clone(),new he(e,t),new he(i,r),new he(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Qc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new po(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};class gi extends Xi{constructor(e){super(e),this.uuid=yi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Xi().fromJSON(r))}return this}}function Bf(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=eu(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Wf(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,f=l;for(let h=t;h<r;h+=t){const d=n[h],p=n[h+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>f&&(f=p)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return Cr(s,a,t,o,l,c,0),a}function eu(n,e,t,i,r){let s;if(r===td(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=pl(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=pl(a/i|0,n[a],n[a+1],s);return s&&ji(s,s.next)&&(wr(s),s=s.next),s}function xi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ji(t,t.next)||Mt(t.prev,t,t.next)===0)){if(wr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Cr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&$f(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?zf(n,i,r,s):Gf(n)){e.push(l.i,n.i,c.i),wr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Vf(xi(n),e),Cr(n,e,t,i,r,s,2)):a===2&&Hf(n,e,t,i,r,s):Cr(xi(n),e,t,i,r,s,1);break}}}function Gf(n){const e=n.prev,t=n,i=n.next;if(Mt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),f=Math.min(o,l,c),h=Math.max(r,s,a),d=Math.max(o,l,c);let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&mr(r,o,s,l,a,c,p.x,p.y)&&Mt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function zf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(Mt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,h=a.y,d=Math.min(o,l,c),p=Math.min(u,f,h),x=Math.max(o,l,c),m=Math.max(u,f,h),g=Ya(d,p,e,t,i),_=Ya(x,m,e,t,i);let v=n.prevZ,S=n.nextZ;for(;v&&v.z>=g&&S&&S.z<=_;){if(v.x>=d&&v.x<=x&&v.y>=p&&v.y<=m&&v!==r&&v!==a&&mr(o,u,l,f,c,h,v.x,v.y)&&Mt(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=d&&S.x<=x&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&mr(o,u,l,f,c,h,S.x,S.y)&&Mt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=g;){if(v.x>=d&&v.x<=x&&v.y>=p&&v.y<=m&&v!==r&&v!==a&&mr(o,u,l,f,c,h,v.x,v.y)&&Mt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=_;){if(S.x>=d&&S.x<=x&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&mr(o,u,l,f,c,h,S.x,S.y)&&Mt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Vf(n,e){let t=n;do{const i=t.prev,r=t.next.next;!ji(i,r)&&nu(i,t,t.next,r)&&Rr(i,r)&&Rr(r,i)&&(e.push(i.i,t.i,r.i),wr(t),wr(t.next),t=n=r),t=t.next}while(t!==n);return xi(t)}function Hf(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Jf(a,o)){let l=iu(a,o);a=xi(a,a.next),l=xi(l,l.next),Cr(a,e,t,i,r,s,0),Cr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Wf(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=eu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Kf(c))}r.sort(Xf);for(let s=0;s<r.length;s++)t=qf(r[s],t);return t}function Xf(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function qf(n,e){const t=Yf(n,e);if(!t)return e;const i=iu(t,n);return xi(i,i.next),xi(t,t.next)}function Yf(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(ji(n,t))return t;do{if(ji(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&tu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);Rr(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&jf(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function jf(n,e){return Mt(n.prev,n,e.prev)<0&&Mt(e.next,n,n.next)<0}function $f(n,e,t,i){let r=n;do r.z===0&&(r.z=Ya(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Zf(r)}function Zf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function Ya(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Kf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function tu(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function mr(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&tu(n,e,t,i,r,s,a,o)}function Jf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Qf(n,e)&&(Rr(n,e)&&Rr(e,n)&&ed(n,e)&&(Mt(n.prev,n,e.prev)||Mt(n,e.prev,e))||ji(n,e)&&Mt(n.prev,n,n.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ji(n,e){return n.x===e.x&&n.y===e.y}function nu(n,e,t,i){const r=ds(Mt(n,e,t)),s=ds(Mt(n,e,i)),a=ds(Mt(t,i,n)),o=ds(Mt(t,i,e));return!!(r!==s&&a!==o||r===0&&fs(n,t,e)||s===0&&fs(n,i,e)||a===0&&fs(t,n,i)||o===0&&fs(t,e,i))}function fs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ds(n){return n>0?1:n<0?-1:0}function Qf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&nu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Rr(n,e){return Mt(n.prev,n,n.next)<0?Mt(n,e,n.next)>=0&&Mt(n,n.prev,e)>=0:Mt(n,e,n.prev)<0||Mt(n,n.next,e)<0}function ed(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function iu(n,e){const t=ja(n.i,n.x,n.y),i=ja(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function pl(n,e,t,i){const r=ja(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function wr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ja(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function td(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class nd{static triangulate(e,t,i=2){return Bf(e,t,i)}}class dn{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return dn.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];ml(e),gl(i,e);let a=e.length;t.forEach(ml);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,gl(i,t[l]);const o=nd.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ml(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function gl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Pr extends kt{constructor(e=new gi([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new yt(r,3)),this.setAttribute("uv",new yt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:id;let v,S=!1,R,M,w,y;if(g){v=g.getSpacedPoints(u),S=!0,h=!1;const z=g.isCatmullRomCurve3?g.closed:!1;R=g.computeFrenetFrames(u,z),M=new q,w=new q,y=new q}h||(m=0,d=0,p=0,x=0);const P=o.extractPoints(c);let D=P.shape;const F=P.holes;if(!dn.isClockWise(D)){D=D.reverse();for(let z=0,Z=F.length;z<Z;z++){const ee=F[z];dn.isClockWise(ee)&&(F[z]=ee.reverse())}}function G(z){const ee=10000000000000001e-36;let ae=z[0];for(let O=1;O<=z.length;O++){const U=O%z.length,L=z[U],Re=L.x-ae.x,Pe=L.y-ae.y,He=Re*Re+Pe*Pe,fe=Math.max(Math.abs(L.x),Math.abs(L.y),Math.abs(ae.x),Math.abs(ae.y)),rt=ee*fe*fe;if(He<=rt){z.splice(U,1),O--;continue}ae=L}}G(D),F.forEach(G);const k=F.length,I=D;for(let z=0;z<k;z++){const Z=F[z];D=D.concat(Z)}function X(z,Z,ee){return Z||lt("ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(Z,ee)}const H=D.length;function Y(z,Z,ee){let ae,O,U;const L=z.x-Z.x,Re=z.y-Z.y,Pe=ee.x-z.x,He=ee.y-z.y,fe=L*L+Re*Re,rt=L*He-Re*Pe;if(Math.abs(rt)>Number.EPSILON){const C=Math.sqrt(fe),b=Math.sqrt(Pe*Pe+He*He),Q=Z.x-Re/C,ce=Z.y+L/C,xe=ee.x-He/b,Se=ee.y+Pe/b,be=((xe-Q)*He-(Se-ce)*Pe)/(L*He-Re*Pe);ae=Q+L*be-z.x,O=ce+Re*be-z.y;const oe=ae*ae+O*O;if(oe<=2)return new he(ae,O);U=Math.sqrt(oe/2)}else{let C=!1;L>Number.EPSILON?Pe>Number.EPSILON&&(C=!0):L<-Number.EPSILON?Pe<-Number.EPSILON&&(C=!0):Math.sign(Re)===Math.sign(He)&&(C=!0),C?(ae=-Re,O=L,U=Math.sqrt(fe)):(ae=L,O=Re,U=Math.sqrt(fe/2))}return new he(ae/U,O/U)}const le=[];for(let z=0,Z=I.length,ee=Z-1,ae=z+1;z<Z;z++,ee++,ae++)ee===Z&&(ee=0),ae===Z&&(ae=0),le[z]=Y(I[z],I[ee],I[ae]);const pe=[];let ve,Te=le.concat();for(let z=0,Z=k;z<Z;z++){const ee=F[z];ve=[];for(let ae=0,O=ee.length,U=O-1,L=ae+1;ae<O;ae++,U++,L++)U===O&&(U=0),L===O&&(L=0),ve[ae]=Y(ee[ae],ee[U],ee[L]);pe.push(ve),Te=Te.concat(ve)}let Ne;if(m===0)Ne=dn.triangulateShape(I,F);else{const z=[],Z=[];for(let ee=0;ee<m;ee++){const ae=ee/m,O=d*Math.cos(ae*Math.PI/2),U=p*Math.sin(ae*Math.PI/2)+x;for(let L=0,Re=I.length;L<Re;L++){const Pe=X(I[L],le[L],U);ie(Pe.x,Pe.y,-O),ae===0&&z.push(Pe)}for(let L=0,Re=k;L<Re;L++){const Pe=F[L];ve=pe[L];const He=[];for(let fe=0,rt=Pe.length;fe<rt;fe++){const C=X(Pe[fe],ve[fe],U);ie(C.x,C.y,-O),ae===0&&He.push(C)}ae===0&&Z.push(He)}}Ne=dn.triangulateShape(z,Z)}const j=Ne.length,N=p+x;for(let z=0;z<H;z++){const Z=h?X(D[z],Te[z],N):D[z];S?(w.copy(R.normals[0]).multiplyScalar(Z.x),M.copy(R.binormals[0]).multiplyScalar(Z.y),y.copy(v[0]).add(w).add(M),ie(y.x,y.y,y.z)):ie(Z.x,Z.y,0)}for(let z=1;z<=u;z++)for(let Z=0;Z<H;Z++){const ee=h?X(D[Z],Te[Z],N):D[Z];S?(w.copy(R.normals[z]).multiplyScalar(ee.x),M.copy(R.binormals[z]).multiplyScalar(ee.y),y.copy(v[z]).add(w).add(M),ie(y.x,y.y,y.z)):ie(ee.x,ee.y,f/u*z)}for(let z=m-1;z>=0;z--){const Z=z/m,ee=d*Math.cos(Z*Math.PI/2),ae=p*Math.sin(Z*Math.PI/2)+x;for(let O=0,U=I.length;O<U;O++){const L=X(I[O],le[O],ae);ie(L.x,L.y,f+ee)}for(let O=0,U=F.length;O<U;O++){const L=F[O];ve=pe[O];for(let Re=0,Pe=L.length;Re<Pe;Re++){const He=X(L[Re],ve[Re],ae);S?ie(He.x,He.y+v[u-1].y,v[u-1].x+ee):ie(He.x,He.y,f+ee)}}}T(),E();function T(){const z=r.length/3;if(h){let Z=0,ee=H*Z;for(let ae=0;ae<j;ae++){const O=Ne[ae];J(O[2]+ee,O[1]+ee,O[0]+ee)}Z=u+m*2,ee=H*Z;for(let ae=0;ae<j;ae++){const O=Ne[ae];J(O[0]+ee,O[1]+ee,O[2]+ee)}}else{for(let Z=0;Z<j;Z++){const ee=Ne[Z];J(ee[2],ee[1],ee[0])}for(let Z=0;Z<j;Z++){const ee=Ne[Z];J(ee[0]+H*u,ee[1]+H*u,ee[2]+H*u)}}i.addGroup(z,r.length/3-z,0)}function E(){const z=r.length/3;let Z=0;V(I,Z),Z+=I.length;for(let ee=0,ae=F.length;ee<ae;ee++){const O=F[ee];V(O,Z),Z+=O.length}i.addGroup(z,r.length/3-z,1)}function V(z,Z){let ee=z.length;for(;--ee>=0;){const ae=ee;let O=ee-1;O<0&&(O=z.length-1);for(let U=0,L=u+m*2;U<L;U++){const Re=H*U,Pe=H*(U+1),He=Z+ae+Re,fe=Z+O+Re,rt=Z+O+Pe,C=Z+ae+Pe;se(He,fe,rt,C)}}}function ie(z,Z,ee){l.push(z),l.push(Z),l.push(ee)}function J(z,Z,ee){ge(z),ge(Z),ge(ee);const ae=r.length/3,O=_.generateTopUV(i,r,ae-3,ae-2,ae-1);me(O[0]),me(O[1]),me(O[2])}function se(z,Z,ee,ae){ge(z),ge(Z),ge(ae),ge(Z),ge(ee),ge(ae);const O=r.length/3,U=_.generateSideWallUV(i,r,O-6,O-3,O-2,O-1);me(U[0]),me(U[1]),me(U[3]),me(U[1]),me(U[2]),me(U[3])}function ge(z){r.push(l[z*3+0]),r.push(l[z*3+1]),r.push(l[z*3+2])}function me(z){s.push(z.x),s.push(z.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return rd(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new qa[r.type]().fromJSON(r)),new Pr(i,e.options)}}const id={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new he(s,a),new he(o,l),new he(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],d=e[r*3+1],p=e[r*3+2],x=e[s*3],m=e[s*3+1],g=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-f),new he(h,1-p),new he(x,1-g)]:[new he(o,1-l),new he(u,1-f),new he(d,1-p),new he(m,1-g)]}};function rd(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class rr extends kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],x=[],m=[];for(let g=0;g<u;g++){const _=g*h-a;for(let v=0;v<c;v++){const S=v*f-s;p.push(S,-_,0),x.push(0,0,1),m.push(v/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){const v=_+c*g,S=_+c*(g+1),R=_+1+c*(g+1),M=_+1+c*g;d.push(v,S,M),d.push(S,R,M)}this.setIndex(d),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.width,e.height,e.widthSegments,e.heightSegments)}}class go extends kt{constructor(e=new gi([new he(0,.5),new he(-.5,-.5),new he(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new yt(r,3)),this.setAttribute("normal",new yt(s,3)),this.setAttribute("uv",new yt(a,2));function c(u){const f=r.length/3,h=u.extractPoints(t);let d=h.shape;const p=h.holes;dn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=p.length;m<g;m++){const _=p[m];dn.isClockWise(_)===!0&&(p[m]=_.reverse())}const x=dn.triangulateShape(d,p);for(let m=0,g=p.length;m<g;m++){const _=p[m];d=d.concat(_)}for(let m=0,g=d.length;m<g;m++){const _=d[m];r.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=x.length;m<g;m++){const _=x[m],v=_[0]+f,S=_[1]+f,R=_[2]+f;i.push(v,S,R),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return sd(t,e)}static fromJSON(e,t){const i=[];for(let r=0,s=e.shapes.length;r<s;r++){const a=t[e.shapes[r]];i.push(a)}return new go(i,e.curveSegments)}}function sd(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}class xo extends kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new q,h=new q,d=[],p=[],x=[],m=[];for(let g=0;g<=i;g++){const _=[],v=g/i;let S=0;g===0&&a===0?S=.5/t:g===i&&l===Math.PI&&(S=-.5/t);for(let R=0;R<=t;R++){const M=R/t;f.x=-e*Math.cos(r+M*s)*Math.sin(a+v*o),f.y=e*Math.cos(a+v*o),f.z=e*Math.sin(r+M*s)*Math.sin(a+v*o),p.push(f.x,f.y,f.z),h.copy(f).normalize(),x.push(h.x,h.y,h.z),m.push(M+S,1-v),_.push(c++)}u.push(_)}for(let g=0;g<i;g++)for(let _=0;_<t;_++){const v=u[g][_+1],S=u[g][_],R=u[g+1][_],M=u[g+1][_+1];(g!==0||a>0)&&d.push(v,S,M),(g!==i-1||l<Math.PI)&&d.push(S,R,M)}this.setIndex(d),this.setAttribute("position",new yt(p,3)),this.setAttribute("normal",new yt(x,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(xl(r))r.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(xl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function jt(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const r in i)e[r]=i[r]}return e}function xl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ad(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ru(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const Lr={clone:$i,merge:jt};var od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bt extends Or{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=od,this.fragmentShader=ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=ad(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class su extends Bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Zi extends Or{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cd extends Or{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ud extends Or{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Sr={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(vl(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!vl(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function vl(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class hd{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const fd=new hd;class Br{constructor(e){this.manager=e!==void 0?e:fd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Br.DEFAULT_MATERIAL_NAME="__DEFAULT";const On={};class dd extends Error{constructor(e,t){super(e),this.response=t}}class pd extends Br{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Sr.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(On[e]!==void 0){On[e].push({onLoad:t,onProgress:i,onError:r});return}On[e]=[],On[e].push({onLoad:t,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&$e("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=On[e],f=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=h?parseInt(h):0,p=d!==0;let x=0;const m=new ReadableStream({start(g){_();function _(){f.read().then(({done:v,value:S})=>{if(v)g.close();else{x+=S.byteLength;const R=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:d});for(let M=0,w=u.length;M<w;M++){const y=u[M];y.onProgress&&y.onProgress(R)}g.enqueue(S),_()}},v=>{g.error(v)})}}});return new Response(m)}else throw new dd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o==="")return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(o),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Sr.add(`file:${e}`,c);const u=On[e];delete On[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=On[e];if(u===void 0)throw this.manager.itemError(e),c;delete On[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Oi=new WeakMap;class md extends Br{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Sr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let f=Oi.get(a);f===void 0&&(f=[],Oi.set(a,f)),f.push({onLoad:t,onError:r})}return a}const o=Er("img");function l(){u(),t&&t(this);const f=Oi.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Oi.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),Sr.remove(`image:${e}`);const h=Oi.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onError&&p.onError(f)}Oi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Sr.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class gd extends Br{constructor(e){super(e)}load(e,t,i,r){const s=new Wt,a=new md(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class vo extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Aa=new St,_l=new q,yl=new q;class au{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ho,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;_l.setFromMatrixPosition(e.matrixWorld),t.position.copy(_l),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),Aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Aa,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Aa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ps=new q,ms=new ir,yn=new q;class ou extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ps,ms,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ps,ms,yn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ps,ms,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ps,ms,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const jn=new q,Sl=new he,bl=new he;class tn extends ou{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(jn.x,jn.y).multiplyScalar(-e/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(jn.x,jn.y).multiplyScalar(-e/jn.z)}getViewSize(e,t){return this.getViewBounds(e,Sl,bl),t.subVectors(bl,Sl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xd extends au{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class vd extends vo{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new xd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class qs extends ou{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _d extends au{constructor(){super(new qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yd extends vo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new _d}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Sd extends vo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ni=-90,ki=1;class bd extends Xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new tn(Ni,ki,e,t);r.layers=this.layers,this.add(r);const s=new tn(Ni,ki,e,t);s.layers=this.layers,this.add(s);const a=new tn(Ni,ki,e,t);a.layers=this.layers,this.add(a);const o=new tn(Ni,ki,e,t);o.layers=this.layers,this.add(o);const l=new tn(Ni,ki,e,t);l.layers=this.layers,this.add(l);const c=new tn(Ni,ki,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Td extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Md{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Ed.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ed(){this._document.hidden===!1&&this.reset()}class lu{static{lu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}const Tl=new he;class Ad{constructor(e=new he(1/0,1/0),t=new he(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Tl.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tl).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}class Kn{constructor(){this.type="ShapePath",this.color=new Je,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new Xi,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,i,r){return this.currentPath.quadraticCurveTo(e,t,i,r),this}bezierCurveTo(e,t,i,r,s,a){return this.currentPath.bezierCurveTo(e,t,i,r,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(g){const _=[];for(let v=0,S=g.length;v<S;v++){const R=g[v],M=new gi;M.curves=R.curves,_.push(M)}return _}function i(g,_){const v=_.length;let S=!1;for(let R=v-1,M=0;M<v;R=M++){let w=_[R],y=_[M],P=y.x-w.x,D=y.y-w.y;if(Math.abs(D)>Number.EPSILON){if(D<0&&(w=_[M],P=-P,y=_[R],D=-D),g.y<w.y||g.y>y.y)continue;if(g.y===w.y){if(g.x===w.x)return!0}else{const F=D*(g.x-w.x)-P*(g.y-w.y);if(F===0)return!0;if(F<0)continue;S=!S}}else{if(g.y!==w.y)continue;if(y.x<=g.x&&g.x<=w.x||w.x<=g.x&&g.x<=y.x)return!0}}return S}const r=dn.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new gi,l.curves=o.curves,c.push(l),c;let u=!r(s[0].getPoints());u=e?!u:u;const f=[],h=[];let d=[],p=0,x;h[p]=void 0,d[p]=[];for(let g=0,_=s.length;g<_;g++)o=s[g],x=o.getPoints(),a=r(x),a=e?!a:a,a?(!u&&h[p]&&p++,h[p]={s:new gi,p:x},h[p].s.curves=o.curves,u&&p++,d[p]=[]):d[p].push({h:o,p:x[0]});if(!h[0])return t(s);if(h.length>1){let g=!1,_=0;for(let v=0,S=h.length;v<S;v++)f[v]=[];for(let v=0,S=h.length;v<S;v++){const R=d[v];for(let M=0;M<R.length;M++){const w=R[M];let y=!0;for(let P=0;P<h.length;P++)i(w.p,h[P].p)&&(v!==P&&_++,y?(y=!1,f[P].push(w)):g=!0);y&&f[v].push(w)}}_>0&&g===!1&&(d=f)}let m;for(let g=0,_=h.length;g<_;g++){l=h[g].s,c.push(l),m=d[g];for(let v=0,S=m.length;v<S;v++)l.holes.push(m[v].h)}return c}}function Ml(n,e,t,i){const r=Cd(i);switch(t){case 1021:return n*e;case 1028:return n*e/r.components*r.byteLength;case 1029:return n*e/r.components*r.byteLength;case 1030:return n*e*2/r.components*r.byteLength;case 1031:return n*e*2/r.components*r.byteLength;case 1022:return n*e*3/r.components*r.byteLength;case 1023:return n*e*4/r.components*r.byteLength;case 1033:return n*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(n,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(n,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(n/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(n/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cd(n){switch(n){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");function cu(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Rd(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],x=f[d];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++h,f[h]=x)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const x=f[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var wd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Od=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Jd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ep=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ip=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Sp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ep=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ap=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ip=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,im=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,am=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_m=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ym=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Om=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Nm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,km=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,jm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Km=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,og=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:wd,alphahash_pars_fragment:Pd,alphamap_fragment:Ld,alphamap_pars_fragment:Dd,alphatest_fragment:Id,alphatest_pars_fragment:Ud,aomap_fragment:Fd,aomap_pars_fragment:Od,batching_pars_vertex:Nd,batching_vertex:kd,begin_vertex:Bd,beginnormal_vertex:Gd,bsdfs:zd,iridescence_fragment:Vd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Wd,clipping_planes_pars_fragment:Xd,clipping_planes_pars_vertex:qd,clipping_planes_vertex:Yd,color_fragment:jd,color_pars_fragment:$d,color_pars_vertex:Zd,color_vertex:Kd,common:Jd,cube_uv_reflection_fragment:Qd,defaultnormal_vertex:ep,displacementmap_pars_vertex:tp,displacementmap_vertex:np,emissivemap_fragment:ip,emissivemap_pars_fragment:rp,colorspace_fragment:sp,colorspace_pars_fragment:ap,envmap_fragment:op,envmap_common_pars_fragment:lp,envmap_pars_fragment:cp,envmap_pars_vertex:up,envmap_physical_pars_fragment:Sp,envmap_vertex:hp,fog_vertex:fp,fog_pars_vertex:dp,fog_fragment:pp,fog_pars_fragment:mp,gradientmap_pars_fragment:gp,lightmap_pars_fragment:xp,lights_lambert_fragment:vp,lights_lambert_pars_fragment:_p,lights_pars_begin:yp,lights_toon_fragment:bp,lights_toon_pars_fragment:Tp,lights_phong_fragment:Mp,lights_phong_pars_fragment:Ep,lights_physical_fragment:Ap,lights_physical_pars_fragment:Cp,lights_fragment_begin:Rp,lights_fragment_maps:wp,lights_fragment_end:Pp,lightprobes_pars_fragment:Lp,logdepthbuf_fragment:Dp,logdepthbuf_pars_fragment:Ip,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:Fp,map_fragment:Op,map_pars_fragment:Np,map_particle_fragment:kp,map_particle_pars_fragment:Bp,metalnessmap_fragment:Gp,metalnessmap_pars_fragment:zp,morphinstance_vertex:Vp,morphcolor_vertex:Hp,morphnormal_vertex:Wp,morphtarget_pars_vertex:Xp,morphtarget_vertex:qp,normal_fragment_begin:Yp,normal_fragment_maps:jp,normal_pars_fragment:$p,normal_pars_vertex:Zp,normal_vertex:Kp,normalmap_pars_fragment:Jp,clearcoat_normal_fragment_begin:Qp,clearcoat_normal_fragment_maps:em,clearcoat_pars_fragment:tm,iridescence_pars_fragment:nm,opaque_fragment:im,packing:rm,premultiplied_alpha_fragment:sm,project_vertex:am,dithering_fragment:om,dithering_pars_fragment:lm,roughnessmap_fragment:cm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:hm,shadowmap_pars_vertex:fm,shadowmap_vertex:dm,shadowmask_pars_fragment:pm,skinbase_vertex:mm,skinning_pars_vertex:gm,skinning_vertex:xm,skinnormal_vertex:vm,specularmap_fragment:_m,specularmap_pars_fragment:ym,tonemapping_fragment:Sm,tonemapping_pars_fragment:bm,transmission_fragment:Tm,transmission_pars_fragment:Mm,uv_pars_fragment:Em,uv_pars_vertex:Am,uv_vertex:Cm,worldpos_vertex:Rm,background_vert:wm,background_frag:Pm,backgroundCube_vert:Lm,backgroundCube_frag:Dm,cube_vert:Im,cube_frag:Um,depth_vert:Fm,depth_frag:Om,distance_vert:Nm,distance_frag:km,equirect_vert:Bm,equirect_frag:Gm,linedashed_vert:zm,linedashed_frag:Vm,meshbasic_vert:Hm,meshbasic_frag:Wm,meshlambert_vert:Xm,meshlambert_frag:qm,meshmatcap_vert:Ym,meshmatcap_frag:jm,meshnormal_vert:$m,meshnormal_frag:Zm,meshphong_vert:Km,meshphong_frag:Jm,meshphysical_vert:Qm,meshphysical_frag:eg,meshtoon_vert:tg,meshtoon_frag:ng,points_vert:ig,points_frag:rg,shadow_vert:sg,shadow_frag:ag,sprite_vert:og,sprite_frag:lg},De={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},En={basic:{uniforms:jt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:jt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:jt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:jt([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:jt([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Je(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:jt([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:jt([De.points,De.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:jt([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:jt([De.common,De.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:jt([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:jt([De.sprite,De.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:jt([De.common,De.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:jt([De.lights,De.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};En.physical={uniforms:jt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const gs={r:0,b:0,g:0},cg=new St,uu=new Ze;uu.set(-1,0,0,0,1,0,0,0,1);function ug(n,e,t,i,r,s){const a=new Je(0);let o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(_){let v=_.isScene===!0?_.background:null;if(v&&v.isTexture){const S=_.backgroundBlurriness>0;v=e.get(v,S)}return v}function p(_){let v=!1;const S=d(_);S===null?m(a,o):S&&S.isColor&&(m(S,1),v=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(_,v){const S=d(v);S&&(S.isCubeTexture||S.mapping===306)?(c===void 0&&(c=new Ot(new kr(1,1,1),new Bt({name:"BackgroundCubeMaterial",uniforms:$i(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,M,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cg.makeRotationFromEuler(v.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(uu),c.material.toneMapped=ot.getTransfer(S.colorSpace)!==ft,(u!==S||f!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Ot(new rr(2,2),new Bt({name:"BackgroundMaterial",uniforms:$i(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ot.getTransfer(S.colorSpace)!==ft,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,v){_.getRGB(gs,ru(n)),t.buffers.color.setClear(gs.r,gs.g,gs.b,v,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),o=v,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:p,addToRenderList:x,dispose:g}}function hg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(F,B,G,k,I){let X=!1;const H=f(F,k,G,B);s!==H&&(s=H,c(s.object)),X=d(F,k,G,I),X&&p(F,k,G,I),I!==null&&e.update(I,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(F,B,G,k),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return n.createVertexArray()}function c(F){return n.bindVertexArray(F)}function u(F){return n.deleteVertexArray(F)}function f(F,B,G,k){const I=k.wireframe===!0;let X=i[B.id];X===void 0&&(X={},i[B.id]=X);const H=F.isInstancedMesh===!0?F.id:0;let Y=X[H];Y===void 0&&(Y={},X[H]=Y);let le=Y[G.id];le===void 0&&(le={},Y[G.id]=le);let pe=le[I];return pe===void 0&&(pe=h(l()),le[I]=pe),pe}function h(F){const B=[],G=[],k=[];for(let I=0;I<t;I++)B[I]=0,G[I]=0,k[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:G,attributeDivisors:k,object:F,attributes:{},index:null}}function d(F,B,G,k){const I=s.attributes,X=B.attributes;let H=0;const Y=G.getAttributes();for(const le in Y)if(Y[le].location>=0){const ve=I[le];let Te=X[le];if(Te===void 0&&(le==="instanceMatrix"&&F.instanceMatrix&&(Te=F.instanceMatrix),le==="instanceColor"&&F.instanceColor&&(Te=F.instanceColor)),ve===void 0||ve.attribute!==Te||Te&&ve.data!==Te.data)return!0;H++}return s.attributesNum!==H||s.index!==k}function p(F,B,G,k){const I={},X=B.attributes;let H=0;const Y=G.getAttributes();for(const le in Y)if(Y[le].location>=0){let ve=X[le];ve===void 0&&(le==="instanceMatrix"&&F.instanceMatrix&&(ve=F.instanceMatrix),le==="instanceColor"&&F.instanceColor&&(ve=F.instanceColor));const Te={};Te.attribute=ve,ve&&ve.data&&(Te.data=ve.data),I[le]=Te,H++}s.attributes=I,s.attributesNum=H,s.index=k}function x(){const F=s.newAttributes;for(let B=0,G=F.length;B<G;B++)F[B]=0}function m(F){g(F,0)}function g(F,B){const G=s.newAttributes,k=s.enabledAttributes,I=s.attributeDivisors;G[F]=1,k[F]===0&&(n.enableVertexAttribArray(F),k[F]=1),I[F]!==B&&(n.vertexAttribDivisor(F,B),I[F]=B)}function _(){const F=s.newAttributes,B=s.enabledAttributes;for(let G=0,k=B.length;G<k;G++)B[G]!==F[G]&&(n.disableVertexAttribArray(G),B[G]=0)}function v(F,B,G,k,I,X,H){H===!0?n.vertexAttribIPointer(F,B,G,I,X):n.vertexAttribPointer(F,B,G,k,I,X)}function S(F,B,G,k){x();const I=k.attributes,X=G.getAttributes(),H=B.defaultAttributeValues;for(const Y in X){const le=X[Y];if(le.location>=0){let pe=I[Y];if(pe===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(pe=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(pe=F.instanceColor)),pe!==void 0){const ve=pe.normalized,Te=pe.itemSize,Ne=e.get(pe);if(Ne===void 0)continue;const j=Ne.buffer,N=Ne.type,T=Ne.bytesPerElement,E=N===n.INT||N===n.UNSIGNED_INT||pe.gpuType===1013;if(pe.isInterleavedBufferAttribute){const V=pe.data,ie=V.stride,J=pe.offset;if(V.isInstancedInterleavedBuffer){for(let se=0;se<le.locationSize;se++)g(le.location+se,V.meshPerAttribute);F.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let se=0;se<le.locationSize;se++)m(le.location+se);n.bindBuffer(n.ARRAY_BUFFER,j);for(let se=0;se<le.locationSize;se++)v(le.location+se,Te/le.locationSize,N,ve,ie*T,(J+Te/le.locationSize*se)*T,E)}else{if(pe.isInstancedBufferAttribute){for(let V=0;V<le.locationSize;V++)g(le.location+V,pe.meshPerAttribute);F.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let V=0;V<le.locationSize;V++)m(le.location+V);n.bindBuffer(n.ARRAY_BUFFER,j);for(let V=0;V<le.locationSize;V++)v(le.location+V,Te/le.locationSize,N,ve,Te*T,Te/le.locationSize*V*T,E)}}else if(H!==void 0){const ve=H[Y];if(ve!==void 0)switch(ve.length){case 2:n.vertexAttrib2fv(le.location,ve);break;case 3:n.vertexAttrib3fv(le.location,ve);break;case 4:n.vertexAttrib4fv(le.location,ve);break;default:n.vertexAttrib1fv(le.location,ve)}}}}_()}function R(){P();for(const F in i){const B=i[F];for(const G in B){const k=B[G];for(const I in k){const X=k[I];for(const H in X)u(X[H].object),delete X[H];delete k[I]}}delete i[F]}}function M(F){if(i[F.id]===void 0)return;const B=i[F.id];for(const G in B){const k=B[G];for(const I in k){const X=k[I];for(const H in X)u(X[H].object),delete X[H];delete k[I]}}delete i[F.id]}function w(F){for(const B in i){const G=i[B];for(const k in G){const I=G[k];if(I[F.id]===void 0)continue;const X=I[F.id];for(const H in X)u(X[H].object),delete X[H];delete I[F.id]}}}function y(F){for(const B in i){const G=i[B],k=F.isInstancedMesh===!0?F.id:0,I=G[k];if(I!==void 0){for(const X in I){const H=I[X];for(const Y in H)u(H[Y].object),delete H[Y];delete I[X]}delete G[k],Object.keys(G).length===0&&delete i[B]}}}function P(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:D,dispose:R,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function fg(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function dg(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==1023&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const y=w===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==1009&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==1015&&!y)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&($e("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&$e("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:S,maxSamples:R,samples:M}}function pg(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new fi,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const _=s?0:i,v=_*4;let S=g.clippingState||null;l.value=S,S=u(p,h,v,d);for(let R=0;R!==v;++R)S[R]=t[R];g.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,p){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=l.value,p!==!0||m===null){const g=d+x*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let v=0,S=d;v!==x;++v,S+=4)a.copy(f[v]).applyMatrix4(_,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Qn=4,El=[.125,.215,.35,.446,.526,.582],di=20,mg=256,fr=new qs,Al=new Je;let Ca=null,Ra=0,wa=0,Pa=!1;const gg=new q;class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=gg}=s;Ca=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ca,Ra,wa),this._renderer.xr.enabled=Pa,e.scissorTest=!1,Bi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ca=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Mr,depthBuffer:!1},r=Rl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=xg(s)),this._blurMaterial=_g(s,e,t),this._ggxMaterial=vg(s,e,t)}return r}_compileMaterial(e){const t=new Ot(new kt,e);this._renderer.compile(t,fr)}_sceneToCubeUV(e,t,i,r,s){const l=new tn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Al),f.toneMapping=0,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new kr,new Nr({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let g=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,g=!0):(m.color.copy(Al),g=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):S===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const R=this._cubeSize;Bi(r,S*R,v>2?R:0,R,R),f.setRenderTarget(r),g&&f.render(x,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Bi(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,fr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,x=this._sizeLods[i],m=3*x*(i>p-Qn?i-p+Qn:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,Bi(s,m,g,3*x,2*x),r.setRenderTarget(s),r.render(o,fr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,Bi(e,m,g,3*x,2*x),r.setRenderTarget(e),r.render(o,fr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const h=c.uniforms,d=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*di-1),x=s/p,m=isFinite(s)?1+Math.floor(u*x):di;m>di&&$e(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const g=[];let _=0;for(let w=0;w<di;++w){const y=w/x,P=Math.exp(-y*y/2);g.push(P),w===0?_+=P:w<m&&(_+=2*P)}for(let w=0;w<g.length;w++)g[w]=g[w]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=g,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:v}=this;h.dTheta.value=p,h.mipInt.value=v-i;const S=this._sizeLods[r],R=3*S*(r>v-Qn?r-v+Qn:0),M=4*(this._cubeSize-S);Bi(t,R,M,3*S,2*S),l.setRenderTarget(t),l.render(f,fr)}}function xg(n){const e=[],t=[],i=[];let r=n;const s=n-Qn+1+El.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Qn?l=El[a-n+Qn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,x=3,m=2,g=1,_=new Float32Array(x*p*d),v=new Float32Array(m*p*d),S=new Float32Array(g*p*d);for(let M=0;M<d;M++){const w=M%3*2/3-1,y=M>2?0:-1,P=[w,y,0,w+2/3,y,0,w+2/3,y+1,0,w,y,0,w+2/3,y+1,0,w,y+1,0];_.set(P,x*p*M),v.set(h,m*p*M);const D=[M,M,M,M,M,M];S.set(D,g*p*M)}const R=new kt;R.setAttribute("position",new pn(_,x)),R.setAttribute("uv",new pn(v,m)),R.setAttribute("faceIndex",new pn(S,g)),i.push(new Ot(R,null)),r>Qn&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Rl(n,e,t){const i=new Kt(n,e,t);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function vg(n,e,t){return new Bt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ys(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function _g(n,e,t){const i=new Float32Array(di),r=new q(0,1,0);return new Bt({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wl(){return new Bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Pl(){return new Bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ys(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class hu extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new jc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new kr(5,5,5),s=new Bt({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;const a=new Ot(r,s),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new bd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function yg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===303||d===304)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const x=new hu(p.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",c),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,p=d===303||d===304,x=d===301||d===302;if(p||x){let m=t.get(h);const g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new Cl(n)),m=p?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const _=h.image;return p&&_&&_.height>0||x&&_&&l(_)?(i===null&&(i=new Cl(n)),m=p?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===303?h.mapping=301:d===304&&(h.mapping=302),h}function l(h){let d=0;const p=6;for(let x=0;x<p;x++)h[x]!==void 0&&d++;return d===p}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Sg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Xa("WebGLRenderer: "+i+" extension not supported."),r}}}function bg(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,p=f.attributes.position;let x=0;if(p===void 0)return;if(d!==null){const _=d.array;x=d.version;for(let v=0,S=_.length;v<S;v+=3){const R=_[v+0],M=_[v+1],w=_[v+2];h.push(R,M,M,w,w,R)}}else{const _=p.array;x=p.version;for(let v=0,S=_.length/3-1;v<S;v+=3){const R=v+0,M=v+1,w=v+2;h.push(R,M,M,w,w,R)}}const m=new(p.count>=65535?Yc:qc)(h,1);m.version=x;const g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Tg(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*a),t.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*a,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let x=0;for(let m=0;m<d;m++)x+=h[m];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Mg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Eg(n,e,t){const i=new WeakMap,r=new bt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let P=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",P)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let v=0;d===!0&&(v=1),p===!0&&(v=2),x===!0&&(v=3);let S=o.attributes.position.count*v,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const M=new Float32Array(S*R*4*f),w=new Hc(M,S,R,f);w.type=1015,w.needsUpdate=!0;const y=v*4;for(let D=0;D<f;D++){const F=m[D],B=g[D],G=_[D],k=S*R*4*D;for(let I=0;I<F.count;I++){const X=I*y;d===!0&&(r.fromBufferAttribute(F,I),M[k+X+0]=r.x,M[k+X+1]=r.y,M[k+X+2]=r.z,M[k+X+3]=0),p===!0&&(r.fromBufferAttribute(B,I),M[k+X+4]=r.x,M[k+X+5]=r.y,M[k+X+6]=r.z,M[k+X+7]=0),x===!0&&(r.fromBufferAttribute(G,I),M[k+X+8]=r.x,M[k+X+9]=r.y,M[k+X+10]=r.z,M[k+X+11]=G.itemSize===4?r.w:1)}}h={count:f,texture:w,size:new he(S,R)},i.set(o,h),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function Ag(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Cg={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function Rg(n,e,t,i,r){const s=new Kt(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Yi(e,t):void 0}),a=new Kt(e,t,{type:1016,depthBuffer:!1,stencilBuffer:!1}),o=new kt;o.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new yt([0,2,0,0,2,0],2));const l=new su({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Ot(o,l),u=new qs(-1,1,1,-1,0,1);let f=null,h=null,d=!1,p,x=null,m=[],g=!1;this.setSize=function(_,v){s.setSize(_,v),a.setSize(_,v);for(let S=0;S<m.length;S++){const R=m[S];R.setSize&&R.setSize(_,v)}},this.setEffects=function(_){m=_,g=m.length>0&&m[0].isRenderPass===!0;const v=s.width,S=s.height;for(let R=0;R<m.length;R++){const M=m[R];M.setSize&&M.setSize(v,S)}},this.begin=function(_,v){if(d||_.toneMapping===0&&m.length===0)return!1;if(x=v,v!==null){const S=v.width,R=v.height;(s.width!==S||s.height!==R)&&this.setSize(S,R)}return g===!1&&_.setRenderTarget(s),p=_.toneMapping,_.toneMapping=0,!0},this.hasRenderPass=function(){return g},this.end=function(_,v){_.toneMapping=p,d=!0;let S=s,R=a;for(let M=0;M<m.length;M++){const w=m[M];if(w.enabled!==!1&&(w.render(_,R,S,v),w.needsSwap!==!1)){const y=S;S=R,R=y}}if(f!==_.outputColorSpace||h!==_.toneMapping){f=_.outputColorSpace,h=_.toneMapping,l.defines={},ot.getTransfer(f)===ft&&(l.defines.SRGB_TRANSFER="");const M=Cg[h];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(x),_.render(c,u),x=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const fu=new Wt,$a=new Yi(1,1),du=new Hc,pu=new af,mu=new jc,Ll=[],Dl=[],Il=new Float32Array(16),Ul=new Float32Array(9),Fl=new Float32Array(4);function sr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ll[r];if(s===void 0&&(s=new Float32Array(r),Ll[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function js(n,e){let t=Dl[e];t===void 0&&(t=new Int32Array(e),Dl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function Lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function Dg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function Ig(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;Fl.set(i),n.uniformMatrix2fv(this.addr,!1,Fl),It(t,i)}}function Ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;Ul.set(i),n.uniformMatrix3fv(this.addr,!1,Ul),It(t,i)}}function Fg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;Il.set(i),n.uniformMatrix4fv(this.addr,!1,Il),It(t,i)}}function Og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Gg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function Wg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?($a.compareFunction=t.isReversedDepthBuffer()?518:515,s=$a):s=fu,t.setTexture2D(e||s,r)}function Xg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||pu,r)}function qg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||mu,r)}function Yg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||du,r)}function jg(n){switch(n){case 5126:return wg;case 35664:return Pg;case 35665:return Lg;case 35666:return Dg;case 35674:return Ig;case 35675:return Ug;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return Ng;case 35668:case 35672:return kg;case 35669:case 35673:return Bg;case 5125:return Gg;case 36294:return zg;case 36295:return Vg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Wg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}function $g(n,e){n.uniform1fv(this.addr,e)}function Zg(n,e){const t=sr(e,this.size,2);n.uniform2fv(this.addr,t)}function Kg(n,e){const t=sr(e,this.size,3);n.uniform3fv(this.addr,t)}function Jg(n,e){const t=sr(e,this.size,4);n.uniform4fv(this.addr,t)}function Qg(n,e){const t=sr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function e0(n,e){const t=sr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function t0(n,e){const t=sr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function n0(n,e){n.uniform1iv(this.addr,e)}function i0(n,e){n.uniform2iv(this.addr,e)}function r0(n,e){n.uniform3iv(this.addr,e)}function s0(n,e){n.uniform4iv(this.addr,e)}function a0(n,e){n.uniform1uiv(this.addr,e)}function o0(n,e){n.uniform2uiv(this.addr,e)}function l0(n,e){n.uniform3uiv(this.addr,e)}function c0(n,e){n.uniform4uiv(this.addr,e)}function u0(n,e,t){const i=this.cache,r=e.length,s=js(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=$a:a=fu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function h0(n,e,t){const i=this.cache,r=e.length,s=js(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||pu,s[a])}function f0(n,e,t){const i=this.cache,r=e.length,s=js(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mu,s[a])}function d0(n,e,t){const i=this.cache,r=e.length,s=js(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||du,s[a])}function p0(n){switch(n){case 5126:return $g;case 35664:return Zg;case 35665:return Kg;case 35666:return Jg;case 35674:return Qg;case 35675:return e0;case 35676:return t0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return r0;case 35669:case 35673:return s0;case 5125:return a0;case 36294:return o0;case 36295:return l0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return d0}}class m0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jg(t.type)}}class g0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=p0(t.type)}}class x0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const La=/(\w+)(\])?(\[|\.)?/g;function Ol(n,e){n.seq.push(e),n.map[e.id]=e}function v0(n,e,t){const i=n.name,r=i.length;for(La.lastIndex=0;;){const s=La.exec(i),a=La.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ol(t,c===void 0?new m0(o,n,e):new g0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new x0(o),Ol(t,f)),t=f}}}class Ms{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);v0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Nl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const _0=37297;let y0=0;function S0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const kl=new Ze;function b0(n){ot._getMatrix(kl,ot.workingColorSpace,n);const e=`mat3( ${kl.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(n)){case Ps:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Bl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+S0(n.getShaderSource(e),o)}else return s}function T0(n,e){const t=b0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const M0={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function E0(n,e){const t=M0[e];return t===void 0?($e("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xs=new q;function A0(){ot.getLuminanceCoefficients(xs);const n=xs.x.toFixed(4),e=xs.y.toFixed(4),t=xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function C0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function R0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function w0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function gr(n){return n!==""}function Gl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(n){return n.replace(P0,D0)}const L0=new Map;function D0(n,e){let t=it[e];if(t===void 0){const i=L0.get(e);if(i!==void 0)t=it[i],$e('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Za(t)}const I0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(n){return n.replace(I0,U0)}function U0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Hl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const F0={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function O0(n){return F0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const N0={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function k0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":N0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const B0={302:"ENVMAP_MODE_REFRACTION"};function G0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":B0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const z0={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function V0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":z0[n.combine]||"ENVMAP_BLENDING_NONE"}function H0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function W0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=O0(t),c=k0(t),u=G0(t),f=V0(t),h=H0(t),d=C0(t),p=R0(s),x=r.createProgram();let m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(gr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(gr).join(`
`),g.length>0&&(g+=`
`)):(m=[Hl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),g=[Hl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?it.tonemapping_pars_fragment:"",t.toneMapping!==0?E0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,T0("linearToOutputTexel",t.outputColorSpace),A0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gr).join(`
`)),a=Za(a),a=Gl(a,t),a=zl(a,t),o=Za(o),o=Gl(o,t),o=zl(o,t),a=Vl(a),o=Vl(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Yo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=_+m+a,S=_+g+o,R=Nl(r,r.VERTEX_SHADER,v),M=Nl(r,r.FRAGMENT_SHADER,S);r.attachShader(x,R),r.attachShader(x,M),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function w(F){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(x)||"",G=r.getShaderInfoLog(R)||"",k=r.getShaderInfoLog(M)||"",I=B.trim(),X=G.trim(),H=k.trim();let Y=!0,le=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,M);else{const pe=Bl(r,R,"vertex"),ve=Bl(r,M,"fragment");lt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+I+`
`+pe+`
`+ve)}else I!==""?$e("WebGLProgram: Program Info Log:",I):(X===""||H==="")&&(le=!1);le&&(F.diagnostics={runnable:Y,programLog:I,vertexShader:{log:X,prefix:m},fragmentShader:{log:H,prefix:g}})}r.deleteShader(R),r.deleteShader(M),y=new Ms(r,x),P=w0(r,x)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let P;this.getAttributes=function(){return P===void 0&&w(this),P};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(x,_0)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=y0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=M,this}let X0=0;class q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Y0(e),t.set(e,i)),i}}class Y0{constructor(e){this.id=X0++,this.code=e,this.usedTimes=0}}function j0(n){return n===1030||n===37490||n===36285}function $0(n,e,t,i,r,s){const a=new Wc,o=new q0,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,P,D,F,B,G){const k=F.fog,I=B.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Y=e.get(y.envMap||X,H),le=Y&&Y.mapping===306?Y.image.height:null,pe=d[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&$e("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const ve=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Te=ve!==void 0?ve.length:0;let Ne=0;I.morphAttributes.position!==void 0&&(Ne=1),I.morphAttributes.normal!==void 0&&(Ne=2),I.morphAttributes.color!==void 0&&(Ne=3);let j,N,T,E;if(pe){const Qe=En[pe];j=Qe.vertexShader,N=Qe.fragmentShader}else j=y.vertexShader,N=y.fragmentShader,o.update(y),T=o.getVertexShaderID(y),E=o.getFragmentShaderID(y);const V=n.getRenderTarget(),ie=n.state.buffers.depth.getReversed(),J=B.isInstancedMesh===!0,se=B.isBatchedMesh===!0,ge=!!y.map,me=!!y.matcap,z=!!Y,Z=!!y.aoMap,ee=!!y.lightMap,ae=!!y.bumpMap,O=!!y.normalMap,U=!!y.displacementMap,L=!!y.emissiveMap,Re=!!y.metalnessMap,Pe=!!y.roughnessMap,He=y.anisotropy>0,fe=y.clearcoat>0,rt=y.dispersion>0,C=y.iridescence>0,b=y.sheen>0,Q=y.transmission>0,ce=He&&!!y.anisotropyMap,xe=fe&&!!y.clearcoatMap,Se=fe&&!!y.clearcoatNormalMap,be=fe&&!!y.clearcoatRoughnessMap,oe=C&&!!y.iridescenceMap,de=C&&!!y.iridescenceThicknessMap,Fe=b&&!!y.sheenColorMap,Be=b&&!!y.sheenRoughnessMap,Ae=!!y.specularMap,Me=!!y.specularColorMap,Ke=!!y.specularIntensityMap,tt=Q&&!!y.transmissionMap,ut=Q&&!!y.thicknessMap,W=!!y.gradientMap,Ee=!!y.alphaMap,ue=y.alphaTest>0,Oe=!!y.alphaHash,Ce=!!y.extensions;let _e=0;y.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(_e=n.toneMapping);const Xe={shaderID:pe,shaderType:y.type,shaderName:y.name,vertexShader:j,fragmentShader:N,defines:y.defines,customVertexShaderID:T,customFragmentShaderID:E,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:se,batchingColor:se&&B._colorsTexture!==null,instancing:J,instancingColor:J&&B.instanceColor!==null,instancingMorph:J&&B.morphTexture!==null,outputColorSpace:V===null?n.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:ge,matcap:me,envMap:z,envMapMode:z&&Y.mapping,envMapCubeUVHeight:le,aoMap:Z,lightMap:ee,bumpMap:ae,normalMap:O,displacementMap:U,emissiveMap:L,normalMapObjectSpace:O&&y.normalMapType===1,normalMapTangentSpace:O&&y.normalMapType===0,packedNormalMap:O&&y.normalMapType===0&&j0(y.normalMap.format),metalnessMap:Re,roughnessMap:Pe,anisotropy:He,anisotropyMap:ce,clearcoat:fe,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:be,dispersion:rt,iridescence:C,iridescenceMap:oe,iridescenceThicknessMap:de,sheen:b,sheenColorMap:Fe,sheenRoughnessMap:Be,specularMap:Ae,specularColorMap:Me,specularIntensityMap:Ke,transmission:Q,transmissionMap:tt,thicknessMap:ut,gradientMap:W,opaque:y.transparent===!1&&y.blending===1&&y.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ue,alphaHash:Oe,combine:y.combine,mapUv:ge&&p(y.map.channel),aoMapUv:Z&&p(y.aoMap.channel),lightMapUv:ee&&p(y.lightMap.channel),bumpMapUv:ae&&p(y.bumpMap.channel),normalMapUv:O&&p(y.normalMap.channel),displacementMapUv:U&&p(y.displacementMap.channel),emissiveMapUv:L&&p(y.emissiveMap.channel),metalnessMapUv:Re&&p(y.metalnessMap.channel),roughnessMapUv:Pe&&p(y.roughnessMap.channel),anisotropyMapUv:ce&&p(y.anisotropyMap.channel),clearcoatMapUv:xe&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:Se&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:de&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&p(y.sheenRoughnessMap.channel),specularMapUv:Ae&&p(y.specularMap.channel),specularColorMapUv:Me&&p(y.specularColorMap.channel),specularIntensityMapUv:Ke&&p(y.specularIntensityMap.channel),transmissionMapUv:tt&&p(y.transmissionMap.channel),thicknessMapUv:ut&&p(y.thicknessMap.channel),alphaMapUv:Ee&&p(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(O||He),vertexNormals:!!I.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!I.attributes.uv&&(ge||Ee),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||I.attributes.normal===void 0&&O===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ie,skinning:B.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Ne,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:_e,decodeVideoTexture:ge&&y.map.isVideoTexture===!0&&ot.getTransfer(y.map.colorSpace)===ft,decodeVideoTextureEmissive:L&&y.emissiveMap.isVideoTexture===!0&&ot.getTransfer(y.emissiveMap.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===2,flipSided:y.side===1,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ce&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&y.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Xe.vertexUv1s=l.has(1),Xe.vertexUv2s=l.has(2),Xe.vertexUv3s=l.has(3),l.clear(),Xe}function m(y){const P=[];if(y.shaderID?P.push(y.shaderID):(P.push(y.customVertexShaderID),P.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)P.push(D),P.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(g(P,y),_(P,y),P.push(n.outputColorSpace)),P.push(y.customProgramCacheKey),P.join()}function g(y,P){y.push(P.precision),y.push(P.outputColorSpace),y.push(P.envMapMode),y.push(P.envMapCubeUVHeight),y.push(P.mapUv),y.push(P.alphaMapUv),y.push(P.lightMapUv),y.push(P.aoMapUv),y.push(P.bumpMapUv),y.push(P.normalMapUv),y.push(P.displacementMapUv),y.push(P.emissiveMapUv),y.push(P.metalnessMapUv),y.push(P.roughnessMapUv),y.push(P.anisotropyMapUv),y.push(P.clearcoatMapUv),y.push(P.clearcoatNormalMapUv),y.push(P.clearcoatRoughnessMapUv),y.push(P.iridescenceMapUv),y.push(P.iridescenceThicknessMapUv),y.push(P.sheenColorMapUv),y.push(P.sheenRoughnessMapUv),y.push(P.specularMapUv),y.push(P.specularColorMapUv),y.push(P.specularIntensityMapUv),y.push(P.transmissionMapUv),y.push(P.thicknessMapUv),y.push(P.combine),y.push(P.fogExp2),y.push(P.sizeAttenuation),y.push(P.morphTargetsCount),y.push(P.morphAttributeCount),y.push(P.numDirLights),y.push(P.numPointLights),y.push(P.numSpotLights),y.push(P.numSpotLightMaps),y.push(P.numHemiLights),y.push(P.numRectAreaLights),y.push(P.numDirLightShadows),y.push(P.numPointLightShadows),y.push(P.numSpotLightShadows),y.push(P.numSpotLightShadowsWithMaps),y.push(P.numLightProbes),y.push(P.shadowMapType),y.push(P.toneMapping),y.push(P.numClippingPlanes),y.push(P.numClipIntersection),y.push(P.depthPacking)}function _(y,P){a.disableAll(),P.instancing&&a.enable(0),P.instancingColor&&a.enable(1),P.instancingMorph&&a.enable(2),P.matcap&&a.enable(3),P.envMap&&a.enable(4),P.normalMapObjectSpace&&a.enable(5),P.normalMapTangentSpace&&a.enable(6),P.clearcoat&&a.enable(7),P.iridescence&&a.enable(8),P.alphaTest&&a.enable(9),P.vertexColors&&a.enable(10),P.vertexAlphas&&a.enable(11),P.vertexUv1s&&a.enable(12),P.vertexUv2s&&a.enable(13),P.vertexUv3s&&a.enable(14),P.vertexTangents&&a.enable(15),P.anisotropy&&a.enable(16),P.alphaHash&&a.enable(17),P.batching&&a.enable(18),P.dispersion&&a.enable(19),P.batchingColor&&a.enable(20),P.gradientMap&&a.enable(21),P.packedNormalMap&&a.enable(22),P.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),P.fog&&a.enable(0),P.useFog&&a.enable(1),P.flatShading&&a.enable(2),P.logarithmicDepthBuffer&&a.enable(3),P.reversedDepthBuffer&&a.enable(4),P.skinning&&a.enable(5),P.morphTargets&&a.enable(6),P.morphNormals&&a.enable(7),P.morphColors&&a.enable(8),P.premultipliedAlpha&&a.enable(9),P.shadowMapEnabled&&a.enable(10),P.doubleSided&&a.enable(11),P.flipSided&&a.enable(12),P.useDepthPacking&&a.enable(13),P.dithering&&a.enable(14),P.transmission&&a.enable(15),P.sheen&&a.enable(16),P.opaque&&a.enable(17),P.pointsUvs&&a.enable(18),P.decodeVideoTexture&&a.enable(19),P.decodeVideoTextureEmissive&&a.enable(20),P.alphaToCoverage&&a.enable(21),P.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function v(y){const P=d[y.type];let D;if(P){const F=En[P];D=Lr.clone(F.uniforms)}else D=y.uniforms;return D}function S(y,P){let D=u.get(P);return D!==void 0?++D.usedTimes:(D=new W0(n,P,y,r),c.push(D),u.set(P,D)),D}function R(y){if(--y.usedTimes===0){const P=c.indexOf(y);c[P]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function M(y){o.remove(y)}function w(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:v,acquireProgram:S,releaseProgram:R,releaseShaderCache:M,programs:c,dispose:w}}function Z0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function K0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Wl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Xl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,x,m,g){let _=n[e];return _===void 0?(_={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:g},n[e]=_):(_.id=h.id,_.object=h,_.geometry=d,_.material=p,_.materialVariant=a(h),_.groupOrder=x,_.renderOrder=h.renderOrder,_.z=m,_.group=g),e++,_}function l(h,d,p,x,m,g){const _=o(h,d,p,x,m,g);p.transmission>0?i.push(_):p.transparent===!0?r.push(_):t.push(_)}function c(h,d,p,x,m,g){const _=o(h,d,p,x,m,g);p.transmission>0?i.unshift(_):p.transparent===!0?r.unshift(_):t.unshift(_)}function u(h,d){t.length>1&&t.sort(h||K0),i.length>1&&i.sort(d||Wl),r.length>1&&r.sort(d||Wl)}function f(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function J0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Xl,n.set(i,[a])):r>=s.length?(a=new Xl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Q0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new Je};break;case"SpotLight":t={position:new q,direction:new q,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new q,halfWidth:new q,halfHeight:new q};break}return n[e.id]=t,t}}}function ex(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let tx=0;function nx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ix(n){const e=new Q0,t=ex(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const r=new q,s=new St,a=new St;function o(c){let u=0,f=0,h=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let d=0,p=0,x=0,m=0,g=0,_=0,v=0,S=0,R=0,M=0,w=0;c.sort(nx);for(let P=0,D=c.length;P<D;P++){const F=c[P],B=F.color,G=F.intensity,k=F.distance;let I=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===1030?I=F.shadow.map.texture:I=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)u+=B.r*G,f+=B.g*G,h+=B.b*G;else if(F.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(F.sh.coefficients[X],G);w++}else if(F.isDirectionalLight){const X=e.get(F);if(X.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const H=F.shadow,Y=t.get(F);Y.shadowIntensity=H.intensity,Y.shadowBias=H.bias,Y.shadowNormalBias=H.normalBias,Y.shadowRadius=H.radius,Y.shadowMapSize=H.mapSize,i.directionalShadow[d]=Y,i.directionalShadowMap[d]=I,i.directionalShadowMatrix[d]=F.shadow.matrix,_++}i.directional[d]=X,d++}else if(F.isSpotLight){const X=e.get(F);X.position.setFromMatrixPosition(F.matrixWorld),X.color.copy(B).multiplyScalar(G),X.distance=k,X.coneCos=Math.cos(F.angle),X.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),X.decay=F.decay,i.spot[x]=X;const H=F.shadow;if(F.map&&(i.spotLightMap[R]=F.map,R++,H.updateMatrices(F),F.castShadow&&M++),i.spotLightMatrix[x]=H.matrix,F.castShadow){const Y=t.get(F);Y.shadowIntensity=H.intensity,Y.shadowBias=H.bias,Y.shadowNormalBias=H.normalBias,Y.shadowRadius=H.radius,Y.shadowMapSize=H.mapSize,i.spotShadow[x]=Y,i.spotShadowMap[x]=I,S++}x++}else if(F.isRectAreaLight){const X=e.get(F);X.color.copy(B).multiplyScalar(G),X.halfWidth.set(F.width*.5,0,0),X.halfHeight.set(0,F.height*.5,0),i.rectArea[m]=X,m++}else if(F.isPointLight){const X=e.get(F);if(X.color.copy(F.color).multiplyScalar(F.intensity),X.distance=F.distance,X.decay=F.decay,F.castShadow){const H=F.shadow,Y=t.get(F);Y.shadowIntensity=H.intensity,Y.shadowBias=H.bias,Y.shadowNormalBias=H.normalBias,Y.shadowRadius=H.radius,Y.shadowMapSize=H.mapSize,Y.shadowCameraNear=H.camera.near,Y.shadowCameraFar=H.camera.far,i.pointShadow[p]=Y,i.pointShadowMap[p]=I,i.pointShadowMatrix[p]=F.shadow.matrix,v++}i.point[p]=X,p++}else if(F.isHemisphereLight){const X=e.get(F);X.skyColor.copy(F.color).multiplyScalar(G),X.groundColor.copy(F.groundColor).multiplyScalar(G),i.hemi[g]=X,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const y=i.hash;(y.directionalLength!==d||y.pointLength!==p||y.spotLength!==x||y.rectAreaLength!==m||y.hemiLength!==g||y.numDirectionalShadows!==_||y.numPointShadows!==v||y.numSpotShadows!==S||y.numSpotMaps!==R||y.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+R-M,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=w,y.directionalLength=d,y.pointLength=p,y.spotLength=x,y.rectAreaLength=m,y.hemiLength=g,y.numDirectionalShadows=_,y.numPointShadows=v,y.numSpotShadows=S,y.numSpotMaps=R,y.numLightProbes=w,i.version=tx++)}function l(c,u){let f=0,h=0,d=0,p=0,x=0;const m=u.matrixWorldInverse;for(let g=0,_=c.length;g<_;g++){const v=c[g];if(v.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),f++}else if(v.isSpotLight){const S=i.spot[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(v.isRectAreaLight){const S=i.rectArea[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(v.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),p++}else if(v.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function ql(n){const e=new ix(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function rx(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ql(n),e.set(r,[o])):s>=a.length?(o=new ql(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const sx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ax=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ox=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],lx=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],Yl=new St,dr=new q,Da=new q;function cx(n,e,t){let i=new ho;const r=new he,s=new he,a=new bt,o=new cd,l=new ud,c={},u=t.maxTextureSize,f={0:1,1:0,2:2},h=new Bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:sx,fragmentShader:ax}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new kt;p.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ot(p,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let g=this.type;this.render=function(M,w,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===2&&($e("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=1);const P=n.getRenderTarget(),D=n.getActiveCubeFace(),F=n.getActiveMipmapLevel(),B=n.state;B.setBlending(0),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const G=g!==this.type;G&&w.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(I=>I.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,I=M.length;k<I;k++){const X=M[k],H=X.shadow;if(H===void 0){$e("WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const Y=H.getFrameExtents();r.multiply(Y),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,H.mapSize.y=s.y));const le=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=le,H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===3){if(X.isPointLight){$e("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Kt(r.x,r.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),H.map.texture.name=X.name+".shadowMap",H.map.depthTexture=new Yi(r.x,r.y,1015),H.map.depthTexture.name=X.name+".shadowMapDepth",H.map.depthTexture.format=1026,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=1003,H.map.depthTexture.magFilter=1003}else X.isPointLight?(H.map=new hu(r.x),H.map.depthTexture=new Ef(r.x,1014)):(H.map=new Kt(r.x,r.y),H.map.depthTexture=new Yi(r.x,r.y,1014)),H.map.depthTexture.name=X.name+".shadowMap",H.map.depthTexture.format=1026,this.type===1?(H.map.depthTexture.compareFunction=le?518:515,H.map.depthTexture.minFilter=1006,H.map.depthTexture.magFilter=1006):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=1003,H.map.depthTexture.magFilter=1003);H.camera.updateProjectionMatrix()}const pe=H.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<pe;ve++){if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,ve),n.clear();else{ve===0&&(n.setRenderTarget(H.map),n.clear());const Te=H.getViewport(ve);a.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),B.viewport(a)}if(X.isPointLight){const Te=H.camera,Ne=H.matrix,j=X.distance||Te.far;j!==Te.far&&(Te.far=j,Te.updateProjectionMatrix()),dr.setFromMatrixPosition(X.matrixWorld),Te.position.copy(dr),Da.copy(Te.position),Da.add(ox[ve]),Te.up.copy(lx[ve]),Te.lookAt(Da),Te.updateMatrixWorld(),Ne.makeTranslation(-dr.x,-dr.y,-dr.z),Yl.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Yl,Te.coordinateSystem,Te.reversedDepth)}else H.updateMatrices(X);i=H.getFrustum(),S(w,y,H.camera,X,this.type)}H.isPointLightShadow!==!0&&this.type===3&&_(H,y),H.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(P,D,F)};function _(M,w){const y=e.update(x);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,d.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Kt(r.x,r.y,{format:1030,type:1016})),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(w,null,y,h,x,null),d.uniforms.shadow_pass.value=M.mapPass.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(w,null,y,d,x,null)}function v(M,w,y,P){let D=null;const F=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(F!==void 0)D=F;else if(D=y.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const B=D.uuid,G=w.uuid;let k=c[B];k===void 0&&(k={},c[B]=k);let I=k[G];I===void 0&&(I=D.clone(),k[G]=I,w.addEventListener("dispose",R)),D=I}if(D.visible=w.visible,D.wireframe=w.wireframe,P===3?D.side=w.shadowSide!==null?w.shadowSide:w.side:D.side=w.shadowSide!==null?w.shadowSide:f[w.side],D.alphaMap=w.alphaMap,D.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,D.map=w.map,D.clipShadows=w.clipShadows,D.clippingPlanes=w.clippingPlanes,D.clipIntersection=w.clipIntersection,D.displacementMap=w.displacementMap,D.displacementScale=w.displacementScale,D.displacementBias=w.displacementBias,D.wireframeLinewidth=w.wireframeLinewidth,D.linewidth=w.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const B=n.properties.get(D);B.light=y}return D}function S(M,w,y,P,D){if(M.visible===!1)return;if(M.layers.test(w.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&D===3)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);const G=e.update(M),k=M.material;if(Array.isArray(k)){const I=G.groups;for(let X=0,H=I.length;X<H;X++){const Y=I[X],le=k[Y.materialIndex];if(le&&le.visible){const pe=v(M,le,P,D);M.onBeforeShadow(n,M,w,y,G,pe,Y),n.renderBufferDirect(y,null,G,pe,M,Y),M.onAfterShadow(n,M,w,y,G,pe,Y)}}}else if(k.visible){const I=v(M,k,P,D);M.onBeforeShadow(n,M,w,y,G,I,null),n.renderBufferDirect(y,null,G,I,M,null),M.onAfterShadow(n,M,w,y,G,I,null)}}const B=M.children;for(let G=0,k=B.length;G<k;G++)S(B[G],w,y,P,D)}function R(M){M.target.removeEventListener("dispose",R);for(const y in c){const P=c[y],D=M.target.uuid;D in P&&(P[D].dispose(),delete P[D])}}}function ux(n,e){function t(){let W=!1;const Ee=new bt;let ue=null;const Oe=new bt(0,0,0,0);return{setMask:function(Ce){ue!==Ce&&!W&&(n.colorMask(Ce,Ce,Ce,Ce),ue=Ce)},setLocked:function(Ce){W=Ce},setClear:function(Ce,_e,Xe,Qe,Ct){Ct===!0&&(Ce*=Qe,_e*=Qe,Xe*=Qe),Ee.set(Ce,_e,Xe,Qe),Oe.equals(Ee)===!1&&(n.clearColor(Ce,_e,Xe,Qe),Oe.copy(Ee))},reset:function(){W=!1,ue=null,Oe.set(-1,0,0,0)}}}function i(){let W=!1,Ee=!1,ue=null,Oe=null,Ce=null;return{setReversed:function(_e){if(Ee!==_e){const Xe=e.get("EXT_clip_control");_e?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Ee=_e;const Qe=Ce;Ce=null,this.setClear(Qe)}},getReversed:function(){return Ee},setTest:function(_e){_e?V(n.DEPTH_TEST):ie(n.DEPTH_TEST)},setMask:function(_e){ue!==_e&&!W&&(n.depthMask(_e),ue=_e)},setFunc:function(_e){if(Ee&&(_e=Oh[_e]),Oe!==_e){switch(_e){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Oe=_e}},setLocked:function(_e){W=_e},setClear:function(_e){Ce!==_e&&(Ce=_e,Ee&&(_e=1-_e),n.clearDepth(_e))},reset:function(){W=!1,ue=null,Oe=null,Ce=null,Ee=!1}}}function r(){let W=!1,Ee=null,ue=null,Oe=null,Ce=null,_e=null,Xe=null,Qe=null,Ct=null;return{setTest:function(pt){W||(pt?V(n.STENCIL_TEST):ie(n.STENCIL_TEST))},setMask:function(pt){Ee!==pt&&!W&&(n.stencilMask(pt),Ee=pt)},setFunc:function(pt,Pn,vn){(ue!==pt||Oe!==Pn||Ce!==vn)&&(n.stencilFunc(pt,Pn,vn),ue=pt,Oe=Pn,Ce=vn)},setOp:function(pt,Pn,vn){(_e!==pt||Xe!==Pn||Qe!==vn)&&(n.stencilOp(pt,Pn,vn),_e=pt,Xe=Pn,Qe=vn)},setLocked:function(pt){W=pt},setClear:function(pt){Ct!==pt&&(n.clearStencil(pt),Ct=pt)},reset:function(){W=!1,Ee=null,ue=null,Oe=null,Ce=null,_e=null,Xe=null,Qe=null,Ct=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,v=null,S=null,R=null,M=null,w=null,y=new Je(0,0,0),P=0,D=!1,F=null,B=null,G=null,k=null,I=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Y=0;const le=n.getParameter(n.VERSION);le.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(le)[1]),H=Y>=1):le.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),H=Y>=2);let pe=null,ve={};const Te=n.getParameter(n.SCISSOR_BOX),Ne=n.getParameter(n.VIEWPORT),j=new bt().fromArray(Te),N=new bt().fromArray(Ne);function T(W,Ee,ue,Oe){const Ce=new Uint8Array(4),_e=n.createTexture();n.bindTexture(W,_e),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<ue;Xe++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,Oe,0,n.RGBA,n.UNSIGNED_BYTE,Ce):n.texImage2D(Ee+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ce);return _e}const E={};E[n.TEXTURE_2D]=T(n.TEXTURE_2D,n.TEXTURE_2D,1),E[n.TEXTURE_CUBE_MAP]=T(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),E[n.TEXTURE_2D_ARRAY]=T(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),E[n.TEXTURE_3D]=T(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),V(n.DEPTH_TEST),a.setFunc(3),ae(!1),O(1),V(n.CULL_FACE),Z(0);function V(W){u[W]!==!0&&(n.enable(W),u[W]=!0)}function ie(W){u[W]!==!1&&(n.disable(W),u[W]=!1)}function J(W,Ee){return h[W]!==Ee?(n.bindFramebuffer(W,Ee),h[W]=Ee,W===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Ee),W===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function se(W,Ee){let ue=p,Oe=!1;if(W){ue=d.get(Ee),ue===void 0&&(ue=[],d.set(Ee,ue));const Ce=W.textures;if(ue.length!==Ce.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,Xe=Ce.length;_e<Xe;_e++)ue[_e]=n.COLOR_ATTACHMENT0+_e;ue.length=Ce.length,Oe=!0}}else ue[0]!==n.BACK&&(ue[0]=n.BACK,Oe=!0);Oe&&n.drawBuffers(ue)}function ge(W){return x!==W?(n.useProgram(W),x=W,!0):!1}const me={100:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};me[103]=n.MIN,me[104]=n.MAX;const z={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,204:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,205:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function Z(W,Ee,ue,Oe,Ce,_e,Xe,Qe,Ct,pt){if(W===0){m===!0&&(ie(n.BLEND),m=!1);return}if(m===!1&&(V(n.BLEND),m=!0),W!==5){if(W!==g||pt!==D){if((_!==100||R!==100)&&(n.blendEquation(n.FUNC_ADD),_=100,R=100),pt)switch(W){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:lt("WebGLState: Invalid blending: ",W);break}else switch(W){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case 3:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",W);break}v=null,S=null,M=null,w=null,y.set(0,0,0),P=0,g=W,D=pt}return}Ce=Ce||Ee,_e=_e||ue,Xe=Xe||Oe,(Ee!==_||Ce!==R)&&(n.blendEquationSeparate(me[Ee],me[Ce]),_=Ee,R=Ce),(ue!==v||Oe!==S||_e!==M||Xe!==w)&&(n.blendFuncSeparate(z[ue],z[Oe],z[_e],z[Xe]),v=ue,S=Oe,M=_e,w=Xe),(Qe.equals(y)===!1||Ct!==P)&&(n.blendColor(Qe.r,Qe.g,Qe.b,Ct),y.copy(Qe),P=Ct),g=W,D=!1}function ee(W,Ee){W.side===2?ie(n.CULL_FACE):V(n.CULL_FACE);let ue=W.side===1;Ee&&(ue=!ue),ae(ue),W.blending===1&&W.transparent===!1?Z(0):Z(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),a.setFunc(W.depthFunc),a.setTest(W.depthTest),a.setMask(W.depthWrite),s.setMask(W.colorWrite);const Oe=W.stencilWrite;o.setTest(Oe),Oe&&(o.setMask(W.stencilWriteMask),o.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),o.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),L(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?V(n.SAMPLE_ALPHA_TO_COVERAGE):ie(n.SAMPLE_ALPHA_TO_COVERAGE)}function ae(W){F!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),F=W)}function O(W){W!==0?(V(n.CULL_FACE),W!==B&&(W===1?n.cullFace(n.BACK):W===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ie(n.CULL_FACE),B=W}function U(W){W!==G&&(H&&n.lineWidth(W),G=W)}function L(W,Ee,ue){W?(V(n.POLYGON_OFFSET_FILL),(k!==Ee||I!==ue)&&(k=Ee,I=ue,a.getReversed()&&(Ee=-Ee),n.polygonOffset(Ee,ue))):ie(n.POLYGON_OFFSET_FILL)}function Re(W){W?V(n.SCISSOR_TEST):ie(n.SCISSOR_TEST)}function Pe(W){W===void 0&&(W=n.TEXTURE0+X-1),pe!==W&&(n.activeTexture(W),pe=W)}function He(W,Ee,ue){ue===void 0&&(pe===null?ue=n.TEXTURE0+X-1:ue=pe);let Oe=ve[ue];Oe===void 0&&(Oe={type:void 0,texture:void 0},ve[ue]=Oe),(Oe.type!==W||Oe.texture!==Ee)&&(pe!==ue&&(n.activeTexture(ue),pe=ue),n.bindTexture(W,Ee||E[W]),Oe.type=W,Oe.texture=Ee)}function fe(){const W=ve[pe];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function rt(){try{n.compressedTexImage2D(...arguments)}catch(W){lt("WebGLState:",W)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(W){lt("WebGLState:",W)}}function b(){try{n.texSubImage2D(...arguments)}catch(W){lt("WebGLState:",W)}}function Q(){try{n.texSubImage3D(...arguments)}catch(W){lt("WebGLState:",W)}}function ce(){try{n.compressedTexSubImage2D(...arguments)}catch(W){lt("WebGLState:",W)}}function xe(){try{n.compressedTexSubImage3D(...arguments)}catch(W){lt("WebGLState:",W)}}function Se(){try{n.texStorage2D(...arguments)}catch(W){lt("WebGLState:",W)}}function be(){try{n.texStorage3D(...arguments)}catch(W){lt("WebGLState:",W)}}function oe(){try{n.texImage2D(...arguments)}catch(W){lt("WebGLState:",W)}}function de(){try{n.texImage3D(...arguments)}catch(W){lt("WebGLState:",W)}}function Fe(W){return f[W]!==void 0?f[W]:n.getParameter(W)}function Be(W,Ee){f[W]!==Ee&&(n.pixelStorei(W,Ee),f[W]=Ee)}function Ae(W){j.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),j.copy(W))}function Me(W){N.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),N.copy(W))}function Ke(W,Ee){let ue=c.get(Ee);ue===void 0&&(ue=new WeakMap,c.set(Ee,ue));let Oe=ue.get(W);Oe===void 0&&(Oe=n.getUniformBlockIndex(Ee,W.name),ue.set(W,Oe))}function tt(W,Ee){const Oe=c.get(Ee).get(W);l.get(Ee)!==Oe&&(n.uniformBlockBinding(Ee,Oe,W.__bindingPointIndex),l.set(Ee,Oe))}function ut(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},pe=null,ve={},h={},d=new WeakMap,p=[],x=null,m=!1,g=null,_=null,v=null,S=null,R=null,M=null,w=null,y=new Je(0,0,0),P=0,D=!1,F=null,B=null,G=null,k=null,I=null,j.set(0,0,n.canvas.width,n.canvas.height),N.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:V,disable:ie,bindFramebuffer:J,drawBuffers:se,useProgram:ge,setBlending:Z,setMaterial:ee,setFlipSided:ae,setCullFace:O,setLineWidth:U,setPolygonOffset:L,setScissorTest:Re,activeTexture:Pe,bindTexture:He,unbindTexture:fe,compressedTexImage2D:rt,compressedTexImage3D:C,texImage2D:oe,texImage3D:de,pixelStorei:Be,getParameter:Fe,updateUBOMapping:Ke,uniformBlockBinding:tt,texStorage2D:Se,texStorage3D:be,texSubImage2D:b,texSubImage3D:Q,compressedTexSubImage2D:ce,compressedTexSubImage3D:xe,scissor:Ae,viewport:Me,reset:ut}}function hx(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,b){return p?new OffscreenCanvas(C,b):Er("canvas")}function m(C,b,Q){let ce=1;const xe=rt(C);if((xe.width>Q||xe.height>Q)&&(ce=Q/Math.max(xe.width,xe.height)),ce<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Se=Math.floor(ce*xe.width),be=Math.floor(ce*xe.height);h===void 0&&(h=x(Se,be));const oe=b?x(Se,be):h;return oe.width=Se,oe.height=be,oe.getContext("2d").drawImage(C,0,0,Se,be),$e("WebGLRenderer: Texture has been resized from ("+xe.width+"x"+xe.height+") to ("+Se+"x"+be+")."),oe}else return"data"in C&&$e("WebGLRenderer: Image in DataTexture is too big ("+xe.width+"x"+xe.height+")."),C;return C}function g(C){return C.generateMipmaps}function _(C){n.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(C,b,Q,ce,xe,Se=!1){if(C!==null){if(n[C]!==void 0)return n[C];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let be;ce&&(be=e.get("EXT_texture_norm16"),be||$e("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=b;if(b===n.RED&&(Q===n.FLOAT&&(oe=n.R32F),Q===n.HALF_FLOAT&&(oe=n.R16F),Q===n.UNSIGNED_BYTE&&(oe=n.R8),Q===n.UNSIGNED_SHORT&&be&&(oe=be.R16_EXT),Q===n.SHORT&&be&&(oe=be.R16_SNORM_EXT)),b===n.RED_INTEGER&&(Q===n.UNSIGNED_BYTE&&(oe=n.R8UI),Q===n.UNSIGNED_SHORT&&(oe=n.R16UI),Q===n.UNSIGNED_INT&&(oe=n.R32UI),Q===n.BYTE&&(oe=n.R8I),Q===n.SHORT&&(oe=n.R16I),Q===n.INT&&(oe=n.R32I)),b===n.RG&&(Q===n.FLOAT&&(oe=n.RG32F),Q===n.HALF_FLOAT&&(oe=n.RG16F),Q===n.UNSIGNED_BYTE&&(oe=n.RG8),Q===n.UNSIGNED_SHORT&&be&&(oe=be.RG16_EXT),Q===n.SHORT&&be&&(oe=be.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(Q===n.UNSIGNED_BYTE&&(oe=n.RG8UI),Q===n.UNSIGNED_SHORT&&(oe=n.RG16UI),Q===n.UNSIGNED_INT&&(oe=n.RG32UI),Q===n.BYTE&&(oe=n.RG8I),Q===n.SHORT&&(oe=n.RG16I),Q===n.INT&&(oe=n.RG32I)),b===n.RGB_INTEGER&&(Q===n.UNSIGNED_BYTE&&(oe=n.RGB8UI),Q===n.UNSIGNED_SHORT&&(oe=n.RGB16UI),Q===n.UNSIGNED_INT&&(oe=n.RGB32UI),Q===n.BYTE&&(oe=n.RGB8I),Q===n.SHORT&&(oe=n.RGB16I),Q===n.INT&&(oe=n.RGB32I)),b===n.RGBA_INTEGER&&(Q===n.UNSIGNED_BYTE&&(oe=n.RGBA8UI),Q===n.UNSIGNED_SHORT&&(oe=n.RGBA16UI),Q===n.UNSIGNED_INT&&(oe=n.RGBA32UI),Q===n.BYTE&&(oe=n.RGBA8I),Q===n.SHORT&&(oe=n.RGBA16I),Q===n.INT&&(oe=n.RGBA32I)),b===n.RGB&&(Q===n.UNSIGNED_SHORT&&be&&(oe=be.RGB16_EXT),Q===n.SHORT&&be&&(oe=be.RGB16_SNORM_EXT),Q===n.UNSIGNED_INT_5_9_9_9_REV&&(oe=n.RGB9_E5),Q===n.UNSIGNED_INT_10F_11F_11F_REV&&(oe=n.R11F_G11F_B10F)),b===n.RGBA){const de=Se?Ps:ot.getTransfer(xe);Q===n.FLOAT&&(oe=n.RGBA32F),Q===n.HALF_FLOAT&&(oe=n.RGBA16F),Q===n.UNSIGNED_BYTE&&(oe=de===ft?n.SRGB8_ALPHA8:n.RGBA8),Q===n.UNSIGNED_SHORT&&be&&(oe=be.RGBA16_EXT),Q===n.SHORT&&be&&(oe=be.RGBA16_SNORM_EXT),Q===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),Q===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function R(C,b){let Q;return C?b===null||b===1014||b===1020?Q=n.DEPTH24_STENCIL8:b===1015?Q=n.DEPTH32F_STENCIL8:b===1012&&(Q=n.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===1014||b===1020?Q=n.DEPTH_COMPONENT24:b===1015?Q=n.DEPTH_COMPONENT32F:b===1012&&(Q=n.DEPTH_COMPONENT16),Q}function M(C,b){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==1003&&C.minFilter!==1006?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function w(C){const b=C.target;b.removeEventListener("dispose",w),P(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&f.delete(b)}function y(C){const b=C.target;b.removeEventListener("dispose",y),F(b)}function P(C){const b=i.get(C);if(b.__webglInit===void 0)return;const Q=C.source,ce=d.get(Q);if(ce){const xe=ce[b.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&D(C),Object.keys(ce).length===0&&d.delete(Q)}i.remove(C)}function D(C){const b=i.get(C);n.deleteTexture(b.__webglTexture);const Q=C.source,ce=d.get(Q);delete ce[b.__cacheKey],a.memory.textures--}function F(C){const b=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(b.__webglFramebuffer[ce]))for(let xe=0;xe<b.__webglFramebuffer[ce].length;xe++)n.deleteFramebuffer(b.__webglFramebuffer[ce][xe]);else n.deleteFramebuffer(b.__webglFramebuffer[ce]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[ce])}else{if(Array.isArray(b.__webglFramebuffer))for(let ce=0;ce<b.__webglFramebuffer.length;ce++)n.deleteFramebuffer(b.__webglFramebuffer[ce]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ce=0;ce<b.__webglColorRenderbuffer.length;ce++)b.__webglColorRenderbuffer[ce]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[ce]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Q=C.textures;for(let ce=0,xe=Q.length;ce<xe;ce++){const Se=i.get(Q[ce]);Se.__webglTexture&&(n.deleteTexture(Se.__webglTexture),a.memory.textures--),i.remove(Q[ce])}i.remove(C)}let B=0;function G(){B=0}function k(){return B}function I(C){B=C}function X(){const C=B;return C>=r.maxTextures&&$e("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),B+=1,C}function H(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function Y(C,b){const Q=i.get(C);if(C.isVideoTexture&&He(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&Q.__version!==C.version){const ce=C.image;if(ce===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{ie(Q,C,b);return}}else C.isExternalTexture&&(Q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,Q.__webglTexture,n.TEXTURE0+b)}function le(C,b){const Q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Q.__version!==C.version){ie(Q,C,b);return}else C.isExternalTexture&&(Q.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,Q.__webglTexture,n.TEXTURE0+b)}function pe(C,b){const Q=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Q.__version!==C.version){ie(Q,C,b);return}t.bindTexture(n.TEXTURE_3D,Q.__webglTexture,n.TEXTURE0+b)}function ve(C,b){const Q=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&Q.__version!==C.version){J(Q,C,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture,n.TEXTURE0+b)}const Te={1e3:n.REPEAT,1001:n.CLAMP_TO_EDGE,1002:n.MIRRORED_REPEAT},Ne={1003:n.NEAREST,1004:n.NEAREST_MIPMAP_NEAREST,1005:n.NEAREST_MIPMAP_LINEAR,1006:n.LINEAR,1007:n.LINEAR_MIPMAP_NEAREST,1008:n.LINEAR_MIPMAP_LINEAR},j={512:n.NEVER,519:n.ALWAYS,513:n.LESS,515:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function N(C,b){if(b.type===1015&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===1006||b.magFilter===1007||b.magFilter===1005||b.magFilter===1008||b.minFilter===1006||b.minFilter===1007||b.minFilter===1005||b.minFilter===1008)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,Te[b.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,Te[b.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,Te[b.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,Ne[b.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,Ne[b.minFilter]),b.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,j[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===1003||b.minFilter!==1005&&b.minFilter!==1008||b.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const Q=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function T(C,b){let Q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",w));const ce=b.source;let xe=d.get(ce);xe===void 0&&(xe={},d.set(ce,xe));const Se=H(b);if(Se!==C.__cacheKey){xe[Se]===void 0&&(xe[Se]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,Q=!0),xe[Se].usedTimes++;const be=xe[C.__cacheKey];be!==void 0&&(xe[C.__cacheKey].usedTimes--,be.usedTimes===0&&D(b)),C.__cacheKey=Se,C.__webglTexture=xe[Se].texture}return Q}function E(C,b,Q){return Math.floor(Math.floor(C/Q)/b)}function V(C,b,Q,ce){const Se=C.updateRanges;if(Se.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,Q,ce,b.data);else{Se.sort((Be,Ae)=>Be.start-Ae.start);let be=0;for(let Be=1;Be<Se.length;Be++){const Ae=Se[be],Me=Se[Be],Ke=Ae.start+Ae.count,tt=E(Me.start,b.width,4),ut=E(Ae.start,b.width,4);Me.start<=Ke+1&&tt===ut&&E(Me.start+Me.count-1,b.width,4)===tt?Ae.count=Math.max(Ae.count,Me.start+Me.count-Ae.start):(++be,Se[be]=Me)}Se.length=be+1;const oe=t.getParameter(n.UNPACK_ROW_LENGTH),de=t.getParameter(n.UNPACK_SKIP_PIXELS),Fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let Be=0,Ae=Se.length;Be<Ae;Be++){const Me=Se[Be],Ke=Math.floor(Me.start/4),tt=Math.ceil(Me.count/4),ut=Ke%b.width,W=Math.floor(Ke/b.width),Ee=tt,ue=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ut),t.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,ut,W,Ee,ue,Q,ce,b.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,oe),t.pixelStorei(n.UNPACK_SKIP_PIXELS,de),t.pixelStorei(n.UNPACK_SKIP_ROWS,Fe)}}function ie(C,b,Q){let ce=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ce=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ce=n.TEXTURE_3D);const xe=T(C,b),Se=b.source;t.bindTexture(ce,C.__webglTexture,n.TEXTURE0+Q);const be=i.get(Se);if(Se.version!==be.__version||xe===!0){if(t.activeTexture(n.TEXTURE0+Q),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const ue=ot.getPrimaries(ot.workingColorSpace),Oe=b.colorSpace===""?null:ot.getPrimaries(b.colorSpace),Ce=b.colorSpace===""||ue===Oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let de=m(b.image,!1,r.maxTextureSize);de=fe(b,de);const Fe=s.convert(b.format,b.colorSpace),Be=s.convert(b.type);let Ae=S(b.internalFormat,Fe,Be,b.normalized,b.colorSpace,b.isVideoTexture);N(ce,b);let Me;const Ke=b.mipmaps,tt=b.isVideoTexture!==!0,ut=be.__version===void 0||xe===!0,W=Se.dataReady,Ee=M(b,de);if(b.isDepthTexture)Ae=R(b.format===1027,b.type),ut&&(tt?t.texStorage2D(n.TEXTURE_2D,1,Ae,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Ae,de.width,de.height,0,Fe,Be,null));else if(b.isDataTexture)if(Ke.length>0){tt&&ut&&t.texStorage2D(n.TEXTURE_2D,Ee,Ae,Ke[0].width,Ke[0].height);for(let ue=0,Oe=Ke.length;ue<Oe;ue++)Me=Ke[ue],tt?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,Fe,Be,Me.data):t.texImage2D(n.TEXTURE_2D,ue,Ae,Me.width,Me.height,0,Fe,Be,Me.data);b.generateMipmaps=!1}else tt?(ut&&t.texStorage2D(n.TEXTURE_2D,Ee,Ae,de.width,de.height),W&&V(b,de,Fe,Be)):t.texImage2D(n.TEXTURE_2D,0,Ae,de.width,de.height,0,Fe,Be,de.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){tt&&ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ae,Ke[0].width,Ke[0].height,de.depth);for(let ue=0,Oe=Ke.length;ue<Oe;ue++)if(Me=Ke[ue],b.format!==1023)if(Fe!==null)if(tt){if(W)if(b.layerUpdates.size>0){const Ce=Ml(Me.width,Me.height,b.format,b.type);for(const _e of b.layerUpdates){const Xe=Me.data.subarray(_e*Ce/Me.data.BYTES_PER_ELEMENT,(_e+1)*Ce/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,_e,Me.width,Me.height,1,Fe,Xe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,de.depth,Fe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,Ae,Me.width,Me.height,de.depth,0,Me.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else tt?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Me.width,Me.height,de.depth,Fe,Be,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,Ae,Me.width,Me.height,de.depth,0,Fe,Be,Me.data)}else{tt&&ut&&t.texStorage2D(n.TEXTURE_2D,Ee,Ae,Ke[0].width,Ke[0].height);for(let ue=0,Oe=Ke.length;ue<Oe;ue++)Me=Ke[ue],b.format!==1023?Fe!==null?tt?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,Fe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,Ae,Me.width,Me.height,0,Me.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):tt?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Me.width,Me.height,Fe,Be,Me.data):t.texImage2D(n.TEXTURE_2D,ue,Ae,Me.width,Me.height,0,Fe,Be,Me.data)}else if(b.isDataArrayTexture)if(tt){if(ut&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Ae,de.width,de.height,de.depth),W)if(b.layerUpdates.size>0){const ue=Ml(de.width,de.height,b.format,b.type);for(const Oe of b.layerUpdates){const Ce=de.data.subarray(Oe*ue/de.data.BYTES_PER_ELEMENT,(Oe+1)*ue/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Oe,de.width,de.height,1,Fe,Be,Ce)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Fe,Be,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,de.width,de.height,de.depth,0,Fe,Be,de.data);else if(b.isData3DTexture)tt?(ut&&t.texStorage3D(n.TEXTURE_3D,Ee,Ae,de.width,de.height,de.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Fe,Be,de.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,de.width,de.height,de.depth,0,Fe,Be,de.data);else if(b.isFramebufferTexture){if(ut)if(tt)t.texStorage2D(n.TEXTURE_2D,Ee,Ae,de.width,de.height);else{let ue=de.width,Oe=de.height;for(let Ce=0;Ce<Ee;Ce++)t.texImage2D(n.TEXTURE_2D,Ce,Ae,ue,Oe,0,Fe,Be,null),ue>>=1,Oe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){const ue=n.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),de.parentNode!==ue){ue.appendChild(de),f.add(b),ue.onpaint=Qe=>{const Ct=Qe.changedElements;for(const pt of f)Ct.includes(pt.image)&&(pt.needsUpdate=!0)},ue.requestPaint();return}const Oe=0,Ce=n.RGBA,_e=n.RGBA,Xe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,Oe,Ce,_e,Xe,de),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ke.length>0){if(tt&&ut){const ue=rt(Ke[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Ae,ue.width,ue.height)}for(let ue=0,Oe=Ke.length;ue<Oe;ue++)Me=Ke[ue],tt?W&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Fe,Be,Me):t.texImage2D(n.TEXTURE_2D,ue,Ae,Fe,Be,Me);b.generateMipmaps=!1}else if(tt){if(ut){const ue=rt(de);t.texStorage2D(n.TEXTURE_2D,Ee,Ae,ue.width,ue.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Fe,Be,de)}else t.texImage2D(n.TEXTURE_2D,0,Ae,Fe,Be,de);g(b)&&_(ce),be.__version=Se.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function J(C,b,Q){if(b.image.length!==6)return;const ce=T(C,b),xe=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+Q);const Se=i.get(xe);if(xe.version!==Se.__version||ce===!0){t.activeTexture(n.TEXTURE0+Q);const be=ot.getPrimaries(ot.workingColorSpace),oe=b.colorSpace===""?null:ot.getPrimaries(b.colorSpace),de=b.colorSpace===""||be===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Fe=b.isCompressedTexture||b.image[0].isCompressedTexture,Be=b.image[0]&&b.image[0].isDataTexture,Ae=[];for(let _e=0;_e<6;_e++)!Fe&&!Be?Ae[_e]=m(b.image[_e],!0,r.maxCubemapSize):Ae[_e]=Be?b.image[_e].image:b.image[_e],Ae[_e]=fe(b,Ae[_e]);const Me=Ae[0],Ke=s.convert(b.format,b.colorSpace),tt=s.convert(b.type),ut=S(b.internalFormat,Ke,tt,b.normalized,b.colorSpace),W=b.isVideoTexture!==!0,Ee=Se.__version===void 0||ce===!0,ue=xe.dataReady;let Oe=M(b,Me);N(n.TEXTURE_CUBE_MAP,b);let Ce;if(Fe){W&&Ee&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Oe,ut,Me.width,Me.height);for(let _e=0;_e<6;_e++){Ce=Ae[_e].mipmaps;for(let Xe=0;Xe<Ce.length;Xe++){const Qe=Ce[Xe];b.format!==1023?Ke!==null?W?ue&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe,0,0,Qe.width,Qe.height,Ke,Qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe,ut,Qe.width,Qe.height,0,Qe.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe,0,0,Qe.width,Qe.height,Ke,tt,Qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe,ut,Qe.width,Qe.height,0,Ke,tt,Qe.data)}}}else{if(Ce=b.mipmaps,W&&Ee){Ce.length>0&&Oe++;const _e=rt(Ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Oe,ut,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Be){W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ae[_e].width,Ae[_e].height,Ke,tt,Ae[_e].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ut,Ae[_e].width,Ae[_e].height,0,Ke,tt,Ae[_e].data);for(let Xe=0;Xe<Ce.length;Xe++){const Ct=Ce[Xe].image[_e].image;W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe+1,0,0,Ct.width,Ct.height,Ke,tt,Ct.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe+1,ut,Ct.width,Ct.height,0,Ke,tt,Ct.data)}}else{W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Ke,tt,Ae[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ut,Ke,tt,Ae[_e]);for(let Xe=0;Xe<Ce.length;Xe++){const Qe=Ce[Xe];W?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe+1,0,0,Ke,tt,Qe.image[_e]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Xe+1,ut,Ke,tt,Qe.image[_e])}}}g(b)&&_(n.TEXTURE_CUBE_MAP),Se.__version=xe.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function se(C,b,Q,ce,xe,Se){const be=s.convert(Q.format,Q.colorSpace),oe=s.convert(Q.type),de=S(Q.internalFormat,be,oe,Q.normalized,Q.colorSpace),Fe=i.get(b),Be=i.get(Q);if(Be.__renderTarget=b,!Fe.__hasExternalTextures){const Ae=Math.max(1,b.width>>Se),Me=Math.max(1,b.height>>Se);xe===n.TEXTURE_3D||xe===n.TEXTURE_2D_ARRAY?t.texImage3D(xe,Se,de,Ae,Me,b.depth,0,be,oe,null):t.texImage2D(xe,Se,de,Ae,Me,0,be,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Pe(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,xe,Be.__webglTexture,0,Re(b)):(xe===n.TEXTURE_2D||xe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&xe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ce,xe,Be.__webglTexture,Se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(C,b,Q){if(n.bindRenderbuffer(n.RENDERBUFFER,C),b.depthBuffer){const ce=b.depthTexture,xe=ce&&ce.isDepthTexture?ce.type:null,Se=R(b.stencilBuffer,xe),be=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Pe(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re(b),Se,b.width,b.height):Q?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re(b),Se,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Se,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,C)}else{const ce=b.textures;for(let xe=0;xe<ce.length;xe++){const Se=ce[xe],be=s.convert(Se.format,Se.colorSpace),oe=s.convert(Se.type),de=S(Se.internalFormat,be,oe,Se.normalized,Se.colorSpace);Pe(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re(b),de,b.width,b.height):Q?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re(b),de,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,de,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function me(C,b,Q){const ce=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xe=i.get(b.depthTexture);if(xe.__renderTarget=b,(!xe.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),ce){if(xe.__webglInit===void 0&&(xe.__webglInit=!0,b.depthTexture.addEventListener("dispose",w)),xe.__webglTexture===void 0){xe.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,xe.__webglTexture),N(n.TEXTURE_CUBE_MAP,b.depthTexture);const Fe=s.convert(b.depthTexture.format),Be=s.convert(b.depthTexture.type);let Ae;b.depthTexture.format===1026?Ae=n.DEPTH_COMPONENT24:b.depthTexture.format===1027&&(Ae=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,Ae,b.width,b.height,0,Fe,Be,null)}}else Y(b.depthTexture,0);const Se=xe.__webglTexture,be=Re(b),oe=ce?n.TEXTURE_CUBE_MAP_POSITIVE_X+Q:n.TEXTURE_2D,de=b.depthTexture.format===1027?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===1026)Pe(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,oe,Se,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,de,oe,Se,0);else if(b.depthTexture.format===1027)Pe(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,oe,Se,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,de,oe,Se,0);else throw new Error("Unknown depthTexture format")}function z(C){const b=i.get(C),Q=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const ce=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ce){const xe=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ce.removeEventListener("dispose",xe)};ce.addEventListener("dispose",xe),b.__depthDisposeCallback=xe}b.__boundDepthTexture=ce}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(Q)for(let ce=0;ce<6;ce++)me(b.__webglFramebuffer[ce],C,ce);else{const ce=C.texture.mipmaps;ce&&ce.length>0?me(b.__webglFramebuffer[0],C,0):me(b.__webglFramebuffer,C,0)}else if(Q){b.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[ce]),b.__webglDepthbuffer[ce]===void 0)b.__webglDepthbuffer[ce]=n.createRenderbuffer(),ge(b.__webglDepthbuffer[ce],C,!1);else{const xe=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=b.__webglDepthbuffer[ce];n.bindRenderbuffer(n.RENDERBUFFER,Se),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,Se)}}else{const ce=C.texture.mipmaps;if(ce&&ce.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),ge(b.__webglDepthbuffer,C,!1);else{const xe=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Se),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,Se)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Z(C,b,Q){const ce=i.get(C);b!==void 0&&se(ce.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Q!==void 0&&z(C)}function ee(C){const b=C.texture,Q=i.get(C),ce=i.get(b);C.addEventListener("dispose",y);const xe=C.textures,Se=C.isWebGLCubeRenderTarget===!0,be=xe.length>1;if(be||(ce.__webglTexture===void 0&&(ce.__webglTexture=n.createTexture()),ce.__version=b.version,a.memory.textures++),Se){Q.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0){Q.__webglFramebuffer[oe]=[];for(let de=0;de<b.mipmaps.length;de++)Q.__webglFramebuffer[oe][de]=n.createFramebuffer()}else Q.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Q.__webglFramebuffer=[];for(let oe=0;oe<b.mipmaps.length;oe++)Q.__webglFramebuffer[oe]=n.createFramebuffer()}else Q.__webglFramebuffer=n.createFramebuffer();if(be)for(let oe=0,de=xe.length;oe<de;oe++){const Fe=i.get(xe[oe]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&Pe(C)===!1){Q.__webglMultisampledFramebuffer=n.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let oe=0;oe<xe.length;oe++){const de=xe[oe];Q.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe]);const Fe=s.convert(de.format,de.colorSpace),Be=s.convert(de.type),Ae=S(de.internalFormat,Fe,Be,de.normalized,de.colorSpace,C.isXRRenderTarget===!0),Me=Re(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,Ae,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,Q.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(Q.__webglDepthRenderbuffer=n.createRenderbuffer(),ge(Q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Se){t.bindTexture(n.TEXTURE_CUBE_MAP,ce.__webglTexture),N(n.TEXTURE_CUBE_MAP,b);for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)se(Q.__webglFramebuffer[oe][de],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else se(Q.__webglFramebuffer[oe],C,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);g(b)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let oe=0,de=xe.length;oe<de;oe++){const Fe=xe[oe],Be=i.get(Fe);let Ae=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ae=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Be.__webglTexture),N(Ae,Fe),se(Q.__webglFramebuffer,C,Fe,n.COLOR_ATTACHMENT0+oe,Ae,0),g(Fe)&&_(Ae)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(oe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,ce.__webglTexture),N(oe,b),b.mipmaps&&b.mipmaps.length>0)for(let de=0;de<b.mipmaps.length;de++)se(Q.__webglFramebuffer[de],C,b,n.COLOR_ATTACHMENT0,oe,de);else se(Q.__webglFramebuffer,C,b,n.COLOR_ATTACHMENT0,oe,0);g(b)&&_(oe),t.unbindTexture()}C.depthBuffer&&z(C)}function ae(C){const b=C.textures;for(let Q=0,ce=b.length;Q<ce;Q++){const xe=b[Q];if(g(xe)){const Se=v(C),be=i.get(xe).__webglTexture;t.bindTexture(Se,be),_(Se),t.unbindTexture()}}}const O=[],U=[];function L(C){if(C.samples>0){if(Pe(C)===!1){const b=C.textures,Q=C.width,ce=C.height;let xe=n.COLOR_BUFFER_BIT;const Se=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(C),oe=b.length>1;if(oe)for(let Fe=0;Fe<b.length;Fe++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const de=C.texture.mipmaps;de&&de.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Fe=0;Fe<b.length;Fe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(xe|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(xe|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Fe]);const Be=i.get(b[Fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Be,0)}n.blitFramebuffer(0,0,Q,ce,0,0,Q,ce,xe,n.NEAREST),l===!0&&(O.length=0,U.length=0,O.push(n.COLOR_ATTACHMENT0+Fe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(O.push(Se),U.push(Se),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,O))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let Fe=0;Fe<b.length;Fe++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,be.__webglColorRenderbuffer[Fe]);const Be=i.get(b[Fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,Be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const b=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Re(C){return Math.min(r.maxSamples,C.samples)}function Pe(C){const b=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function He(C){const b=a.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function fe(C,b){const Q=C.colorSpace,ce=C.format,xe=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||Q!==Mr&&Q!==""&&(ot.getTransfer(Q)===ft?(ce!==1023||xe!==1009)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",Q)),b}function rt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=G,this.getTextureUnits=k,this.setTextureUnits=I,this.setTexture2D=Y,this.setTexture2DArray=le,this.setTexture3D=pe,this.setTextureCube=ve,this.rebindTextures=Z,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=z,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fx(n,e){function t(i,r=""){let s;const a=ot.getTransfer(r);if(i===1009)return n.UNSIGNED_BYTE;if(i===1017)return n.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return n.UNSIGNED_SHORT_5_5_5_1;if(i===35902)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===35899)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===1010)return n.BYTE;if(i===1011)return n.SHORT;if(i===1012)return n.UNSIGNED_SHORT;if(i===1013)return n.INT;if(i===1014)return n.UNSIGNED_INT;if(i===1015)return n.FLOAT;if(i===1016)return n.HALF_FLOAT;if(i===1021)return n.ALPHA;if(i===1022)return n.RGB;if(i===1023)return n.RGBA;if(i===1026)return n.DEPTH_COMPONENT;if(i===1027)return n.DEPTH_STENCIL;if(i===1028)return n.RED;if(i===1029)return n.RED_INTEGER;if(i===1030)return n.RG;if(i===1031)return n.RG_INTEGER;if(i===1033)return n.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(a===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196||i===37492||i===37496||i===37488||i===37489||i===37490||i===37491)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===36196||i===37492)return a===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===37496)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===37488)return s.COMPRESSED_R11_EAC;if(i===37489)return s.COMPRESSED_SIGNED_R11_EAC;if(i===37490)return s.COMPRESSED_RG11_EAC;if(i===37491)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===37808)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===36492)return a===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===36283)return s.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===1020?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const dx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,px=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class mx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new $c(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Bt({vertexShader:dx,fragmentShader:px,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new rr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gx extends _i{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null;const x=typeof XRWebGLBinding<"u",m=new mx,g={},_=t.getContextAttributes();let v=null,S=null;const R=[],M=[],w=new he;let y=null;const P=new tn;P.viewport=new bt;const D=new tn;D.viewport=new bt;const F=[P,D],B=new Td;let G=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(T){let E=R[T];return E===void 0&&(E=new aa,R[T]=E),E.getTargetRaySpace()},this.getControllerGrip=function(T){let E=R[T];return E===void 0&&(E=new aa,R[T]=E),E.getGripSpace()},this.getHand=function(T){let E=R[T];return E===void 0&&(E=new aa,R[T]=E),E.getHandSpace()};function I(T){const E=M.indexOf(T.inputSource);if(E===-1)return;const V=R[E];V!==void 0&&(V.update(T.inputSource,T.frame,c||a),V.dispatchEvent({type:T.type,data:T.inputSource}))}function X(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",H);for(let T=0;T<R.length;T++){const E=M[T];E!==null&&(M[T]=null,R[T].disconnect(E))}G=null,k=null,m.reset();for(const T in g)delete g[T];e.setRenderTarget(v),d=null,h=null,f=null,r=null,S=null,N.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(T){s=T,i.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(T){o=T,i.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(T){c=T},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(T){if(r=T,r!==null){if(v=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",X),r.addEventListener("inputsourceschange",H),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,ie=null,J=null;_.depth&&(J=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=_.stencil?1027:1026,ie=_.stencil?1020:1014);const se={colorFormat:t.RGBA8,depthFormat:J,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(se),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Kt(h.textureWidth,h.textureHeight,{format:1023,type:1009,depthTexture:new Yi(h.textureWidth,h.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const V={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Kt(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),N.setContext(r),N.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(T){for(let E=0;E<T.removed.length;E++){const V=T.removed[E],ie=M.indexOf(V);ie>=0&&(M[ie]=null,R[ie].disconnect(V))}for(let E=0;E<T.added.length;E++){const V=T.added[E];let ie=M.indexOf(V);if(ie===-1){for(let se=0;se<R.length;se++)if(se>=M.length){M.push(V),ie=se;break}else if(M[se]===null){M[se]=V,ie=se;break}if(ie===-1)break}const J=R[ie];J&&J.connect(V)}}const Y=new q,le=new q;function pe(T,E,V){Y.setFromMatrixPosition(E.matrixWorld),le.setFromMatrixPosition(V.matrixWorld);const ie=Y.distanceTo(le),J=E.projectionMatrix.elements,se=V.projectionMatrix.elements,ge=J[14]/(J[10]-1),me=J[14]/(J[10]+1),z=(J[9]+1)/J[5],Z=(J[9]-1)/J[5],ee=(J[8]-1)/J[0],ae=(se[8]+1)/se[0],O=ge*ee,U=ge*ae,L=ie/(-ee+ae),Re=L*-ee;if(E.matrixWorld.decompose(T.position,T.quaternion,T.scale),T.translateX(Re),T.translateZ(L),T.matrixWorld.compose(T.position,T.quaternion,T.scale),T.matrixWorldInverse.copy(T.matrixWorld).invert(),J[10]===-1)T.projectionMatrix.copy(E.projectionMatrix),T.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{const Pe=ge+L,He=me+L,fe=O-Re,rt=U+(ie-Re),C=z*me/He*Pe,b=Z*me/He*Pe;T.projectionMatrix.makePerspective(fe,rt,C,b,Pe,He),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}}function ve(T,E){E===null?T.matrixWorld.copy(T.matrix):T.matrixWorld.multiplyMatrices(E.matrixWorld,T.matrix),T.matrixWorldInverse.copy(T.matrixWorld).invert()}this.updateCamera=function(T){if(r===null)return;let E=T.near,V=T.far;m.texture!==null&&(m.depthNear>0&&(E=m.depthNear),m.depthFar>0&&(V=m.depthFar)),B.near=D.near=P.near=E,B.far=D.far=P.far=V,(G!==B.near||k!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),G=B.near,k=B.far),B.layers.mask=T.layers.mask|6,P.layers.mask=B.layers.mask&-5,D.layers.mask=B.layers.mask&-3;const ie=T.parent,J=B.cameras;ve(B,ie);for(let se=0;se<J.length;se++)ve(J[se],ie);J.length===2?pe(B,P,D):B.projectionMatrix.copy(P.projectionMatrix),Te(T,B,ie)};function Te(T,E,V){V===null?T.matrix.copy(E.matrixWorld):(T.matrix.copy(V.matrixWorld),T.matrix.invert(),T.matrix.multiply(E.matrixWorld)),T.matrix.decompose(T.position,T.quaternion,T.scale),T.updateMatrixWorld(!0),T.projectionMatrix.copy(E.projectionMatrix),T.projectionMatrixInverse.copy(E.projectionMatrixInverse),T.isPerspectiveCamera&&(T.fov=Ar*2*Math.atan(1/T.projectionMatrix.elements[5]),T.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(T){l=T,h!==null&&(h.fixedFoveation=T),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=T)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(T){return g[T]};let Ne=null;function j(T,E){if(u=E.getViewerPose(c||a),p=E,u!==null){const V=u.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let ie=!1;V.length!==B.cameras.length&&(B.cameras.length=0,ie=!0);for(let me=0;me<V.length;me++){const z=V[me];let Z=null;if(d!==null)Z=d.getViewport(z);else{const ae=f.getViewSubImage(h,z);Z=ae.viewport,me===0&&(e.setRenderTargetTextures(S,ae.colorTexture,ae.depthStencilTexture),e.setRenderTarget(S))}let ee=F[me];ee===void 0&&(ee=new tn,ee.layers.enable(me),ee.viewport=new bt,F[me]=ee),ee.matrix.fromArray(z.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(z.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(Z.x,Z.y,Z.width,Z.height),me===0&&(B.matrix.copy(ee.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ie===!0&&B.cameras.push(ee)}const J=r.enabledFeatures;if(J&&J.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const me=f.getDepthInformation(V[0]);me&&me.isValid&&me.texture&&m.init(me,r.renderState)}if(J&&J.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let me=0;me<V.length;me++){const z=V[me].camera;if(z){let Z=g[z];Z||(Z=new $c,g[z]=Z);const ee=f.getCameraImage(z);Z.sourceTexture=ee}}}}for(let V=0;V<R.length;V++){const ie=M[V],J=R[V];ie!==null&&J!==void 0&&J.update(ie,E,c||a)}Ne&&Ne(T,E),E.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:E}),p=null}const N=new cu;N.setAnimationLoop(j),this.setAnimationLoop=function(T){Ne=T},this.dispose=function(){}}}const xx=new St,gu=new Ze;gu.set(-1,0,0,0,1,0,0,0,1);function vx(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,ru(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,_,v,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),h(m,g),g.isMeshPhysicalMaterial&&d(m,g,S)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),x(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,_,v):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const _=e.get(g),v=_.envMap,S=_.envMapRotation;v&&(m.envMap.value=v,m.envMapRotation.value.setFromMatrix4(xx.makeRotationFromEuler(S)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(gu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,_,v){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=v*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,_){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===1&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){const _=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function _x(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){const S=v.program;i.uniformBlockBinding(_,S)}function c(_,v){let S=r[_.id];S===void 0&&(p(_),S=u(_),r[_.id]=S,_.addEventListener("dispose",m));const R=v.program;i.updateUBOMapping(_,R);const M=e.render.frame;s[_.id]!==M&&(h(_),s[_.id]=M)}function u(_){const v=f();_.__bindingPointIndex=v;const S=n.createBuffer(),R=_.__size,M=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,R,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,S),S}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const v=r[_.id],S=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let M=0,w=S.length;M<w;M++){const y=Array.isArray(S[M])?S[M]:[S[M]];for(let P=0,D=y.length;P<D;P++){const F=y[P];if(d(F,M,P,R)===!0){const B=F.__offset,G=Array.isArray(F.value)?F.value:[F.value];let k=0;for(let I=0;I<G.length;I++){const X=G[I],H=x(X);typeof X=="number"||typeof X=="boolean"?(F.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,B+k,F.__data)):X.isMatrix3?(F.__data[0]=X.elements[0],F.__data[1]=X.elements[1],F.__data[2]=X.elements[2],F.__data[3]=0,F.__data[4]=X.elements[3],F.__data[5]=X.elements[4],F.__data[6]=X.elements[5],F.__data[7]=0,F.__data[8]=X.elements[6],F.__data[9]=X.elements[7],F.__data[10]=X.elements[8],F.__data[11]=0):ArrayBuffer.isView(X)?F.__data.set(new X.constructor(X.buffer,X.byteOffset,F.__data.length)):(X.toArray(F.__data,k),k+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,F.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(_,v,S,R){const M=_.value,w=v+"_"+S;if(R[w]===void 0)return typeof M=="number"||typeof M=="boolean"?R[w]=M:ArrayBuffer.isView(M)?R[w]=M.slice():R[w]=M.clone(),!0;{const y=R[w];if(typeof M=="number"||typeof M=="boolean"){if(y!==M)return R[w]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(y.equals(M)===!1)return y.copy(M),!0}}return!1}function p(_){const v=_.uniforms;let S=0;const R=16;for(let w=0,y=v.length;w<y;w++){const P=Array.isArray(v[w])?v[w]:[v[w]];for(let D=0,F=P.length;D<F;D++){const B=P[D],G=Array.isArray(B.value)?B.value:[B.value];for(let k=0,I=G.length;k<I;k++){const X=G[k],H=x(X),Y=S%R,le=Y%H.boundary,pe=Y+le;S+=le,pe!==0&&R-pe<H.storage&&(S+=R-pe),B.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=H.storage}}}const M=S%R;return M>0&&(S+=R-M),_.__size=S,_.__cache={},this}function x(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(v.boundary=16,v.storage=_.byteLength):$e("WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function g(){for(const _ in r)n.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:c,dispose:g}}const yx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function Sx(){return Sn===null&&(Sn=new Sf(yx,16,16,1030,1016),Sn.name="DFG_LUT",Sn.minFilter=1006,Sn.magFilter=1006,Sn.wrapS=1001,Sn.wrapT=1001,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class bx{constructor(e={}){const{canvas:t=Uh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=1009}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=d,m=new Set([1033,1031,1029]),g=new Set([1009,1014,1012,1020,1017,1018]),_=new Uint32Array(4),v=new Int32Array(4),S=new q;let R=null,M=null;const w=[],y=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let F=!1,B=null;this._outputColorSpace=$t;let G=0,k=0,I=null,X=-1,H=null;const Y=new bt,le=new bt;let pe=null;const ve=new Je(0);let Te=0,Ne=t.width,j=t.height,N=1,T=null,E=null;const V=new bt(0,0,Ne,j),ie=new bt(0,0,Ne,j);let J=!1;const se=new ho;let ge=!1,me=!1;const z=new St,Z=new q,ee=new bt,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let O=!1;function U(){return I===null?N:1}let L=i;function Re(A,K){return t.getContext(A,K)}try{const A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r184"),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",Qe,!1),L===null){const K="webgl2";if(L=Re(K,A),L===null)throw Re(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw lt("WebGLRenderer: "+A.message),A}let Pe,He,fe,rt,C,b,Q,ce,xe,Se,be,oe,de,Fe,Be,Ae,Me,Ke,tt,ut,W,Ee,ue;function Oe(){Pe=new Sg(L),Pe.init(),W=new fx(L,Pe),He=new dg(L,Pe,e,W),fe=new ux(L,Pe),He.reversedDepthBuffer&&h&&fe.buffers.depth.setReversed(!0),rt=new Mg(L),C=new Z0,b=new hx(L,Pe,fe,C,He,W,rt),Q=new yg(D),ce=new Rd(L),Ee=new hg(L,ce),xe=new bg(L,ce,rt,Ee),Se=new Ag(L,xe,ce,Ee,rt),Ke=new Eg(L,He,b),Be=new pg(C),be=new $0(D,Q,Pe,He,Ee,Be),oe=new vx(D,C),de=new J0,Fe=new rx(Pe),Me=new ug(D,Q,fe,Se,p,l),Ae=new cx(D,Se,He),ue=new _x(L,rt,He,fe),tt=new fg(L,Pe,rt),ut=new Tg(L,Pe,rt),rt.programs=be.programs,D.capabilities=He,D.extensions=Pe,D.properties=C,D.renderLists=de,D.shadowMap=Ae,D.state=fe,D.info=rt}Oe(),x!==1009&&(P=new Rg(x,t.width,t.height,r,s));const Ce=new gx(D,L);this.xr=Ce,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const A=Pe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Pe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(A){A!==void 0&&(N=A,this.setSize(Ne,j,!1))},this.getSize=function(A){return A.set(Ne,j)},this.setSize=function(A,K,re=!0){if(Ce.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=A,j=K,t.width=Math.floor(A*N),t.height=Math.floor(K*N),re===!0&&(t.style.width=A+"px",t.style.height=K+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,A,K)},this.getDrawingBufferSize=function(A){return A.set(Ne*N,j*N).floor()},this.setDrawingBufferSize=function(A,K,re){Ne=A,j=K,N=re,t.width=Math.floor(A*re),t.height=Math.floor(K*re),this.setViewport(0,0,A,K)},this.setEffects=function(A){if(x===1009){lt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let K=0;K<A.length;K++)if(A[K].isOutputPass===!0){$e("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Y)},this.getViewport=function(A){return A.copy(V)},this.setViewport=function(A,K,re,te){A.isVector4?V.set(A.x,A.y,A.z,A.w):V.set(A,K,re,te),fe.viewport(Y.copy(V).multiplyScalar(N).round())},this.getScissor=function(A){return A.copy(ie)},this.setScissor=function(A,K,re,te){A.isVector4?ie.set(A.x,A.y,A.z,A.w):ie.set(A,K,re,te),fe.scissor(le.copy(ie).multiplyScalar(N).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(A){fe.setScissorTest(J=A)},this.setOpaqueSort=function(A){T=A},this.setTransparentSort=function(A){E=A},this.getClearColor=function(A){return A.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(A=!0,K=!0,re=!0){let te=0;if(A){let ne=!1;if(I!==null){const Ue=I.texture.format;ne=m.has(Ue)}if(ne){const Ue=I.texture.type,Ge=g.has(Ue),Ie=Me.getClearColor(),We=Me.getClearAlpha(),qe=Ie.r,et=Ie.g,st=Ie.b;Ge?(_[0]=qe,_[1]=et,_[2]=st,_[3]=We,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=qe,v[1]=et,v[2]=st,v[3]=We,L.clearBufferiv(L.COLOR,0,v))}else te|=L.COLOR_BUFFER_BIT}K&&(te|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),re&&(te|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&L.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),B=A},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",Qe,!1),Me.dispose(),de.dispose(),Fe.dispose(),C.dispose(),Q.dispose(),Se.dispose(),Ee.dispose(),ue.dispose(),be.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Bo),Ce.removeEventListener("sessionend",Go),ai.stop()};function _e(A){A.preventDefault(),$o("WebGLRenderer: Context Lost."),F=!0}function Xe(){$o("WebGLRenderer: Context Restored."),F=!1;const A=rt.autoReset,K=Ae.enabled,re=Ae.autoUpdate,te=Ae.needsUpdate,ne=Ae.type;Oe(),rt.autoReset=A,Ae.enabled=K,Ae.autoUpdate=re,Ae.needsUpdate=te,Ae.type=ne}function Qe(A){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ct(A){const K=A.target;K.removeEventListener("dispose",Ct),pt(K)}function pt(A){Pn(A),C.remove(A)}function Pn(A){const K=C.get(A).programs;K!==void 0&&(K.forEach(function(re){be.releaseProgram(re)}),A.isShaderMaterial&&be.releaseShaderCache(A))}this.renderBufferDirect=function(A,K,re,te,ne,Ue){K===null&&(K=ae);const Ge=ne.isMesh&&ne.matrixWorld.determinant()<0,Ie=Ch(A,K,re,te,ne);fe.setMaterial(te,Ge);let We=re.index,qe=1;if(te.wireframe===!0){if(We=xe.getWireframeAttribute(re),We===void 0)return;qe=2}const et=re.drawRange,st=re.attributes.position;let Ye=et.start*qe,mt=(et.start+et.count)*qe;Ue!==null&&(Ye=Math.max(Ye,Ue.start*qe),mt=Math.min(mt,(Ue.start+Ue.count)*qe)),We!==null?(Ye=Math.max(Ye,0),mt=Math.min(mt,We.count)):st!=null&&(Ye=Math.max(Ye,0),mt=Math.min(mt,st.count));const Rt=mt-Ye;if(Rt<0||Rt===1/0)return;Ee.setup(ne,te,Ie,re,We);let Et,gt=tt;if(We!==null&&(Et=ce.get(We),gt=ut,gt.setIndex(Et)),ne.isMesh)te.wireframe===!0?(fe.setLineWidth(te.wireframeLinewidth*U()),gt.setMode(L.LINES)):gt.setMode(L.TRIANGLES);else if(ne.isLine){let Gt=te.linewidth;Gt===void 0&&(Gt=1),fe.setLineWidth(Gt*U()),ne.isLineSegments?gt.setMode(L.LINES):ne.isLineLoop?gt.setMode(L.LINE_LOOP):gt.setMode(L.LINE_STRIP)}else ne.isPoints?gt.setMode(L.POINTS):ne.isSprite&&gt.setMode(L.TRIANGLES);if(ne.isBatchedMesh)if(Pe.get("WEBGL_multi_draw"))gt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{const Gt=ne._multiDrawStarts,ke=ne._multiDrawCounts,Jt=ne._multiDrawCount,ct=We?ce.get(We).bytesPerElement:1,sn=C.get(te).currentProgram.getUniforms();for(let _n=0;_n<Jt;_n++)sn.setValue(L,"_gl_DrawID",_n),gt.render(Gt[_n]/ct,ke[_n])}else if(ne.isInstancedMesh)gt.renderInstances(Ye,Rt,ne.count);else if(re.isInstancedBufferGeometry){const Gt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,ke=Math.min(re.instanceCount,Gt);gt.renderInstances(Ye,Rt,ke)}else gt.render(Ye,Rt)};function vn(A,K,re){A.transparent===!0&&A.side===2&&A.forceSinglePass===!1?(A.side=1,A.needsUpdate=!0,jr(A,K,re),A.side=0,A.needsUpdate=!0,jr(A,K,re),A.side=2):jr(A,K,re)}this.compile=function(A,K,re=null){re===null&&(re=A),M=Fe.get(re),M.init(K),y.push(M),re.traverseVisible(function(ne){ne.isLight&&ne.layers.test(K.layers)&&(M.pushLight(ne),ne.castShadow&&M.pushShadow(ne))}),A!==re&&A.traverseVisible(function(ne){ne.isLight&&ne.layers.test(K.layers)&&(M.pushLight(ne),ne.castShadow&&M.pushShadow(ne))}),M.setupLights();const te=new Set;return A.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;const Ue=ne.material;if(Ue)if(Array.isArray(Ue))for(let Ge=0;Ge<Ue.length;Ge++){const Ie=Ue[Ge];vn(Ie,re,ne),te.add(Ie)}else vn(Ue,re,ne),te.add(Ue)}),M=y.pop(),te},this.compileAsync=function(A,K,re=null){const te=this.compile(A,K,re);return new Promise(ne=>{function Ue(){if(te.forEach(function(Ge){C.get(Ge).currentProgram.isReady()&&te.delete(Ge)}),te.size===0){ne(A);return}setTimeout(Ue,10)}Pe.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let Qs=null;function Eh(A){Qs&&Qs(A)}function Bo(){ai.stop()}function Go(){ai.start()}const ai=new cu;ai.setAnimationLoop(Eh),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(A){Qs=A,Ce.setAnimationLoop(A),A===null?ai.stop():ai.start()},Ce.addEventListener("sessionstart",Bo),Ce.addEventListener("sessionend",Go),this.render=function(A,K){if(K!==void 0&&K.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;B!==null&&B.renderStart(A,K);const re=Ce.enabled===!0&&Ce.isPresenting===!0,te=P!==null&&(I===null||re)&&P.begin(D,I);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(K),K=Ce.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,K,I),M=Fe.get(A,y.length),M.init(K),M.state.textureUnits=b.getTextureUnits(),y.push(M),z.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),se.setFromProjectionMatrix(z,2e3,K.reversedDepth),me=this.localClippingEnabled,ge=Be.init(this.clippingPlanes,me),R=de.get(A,w.length),R.init(),w.push(R),Ce.enabled===!0&&Ce.isPresenting===!0){const Ge=D.xr.getDepthSensingMesh();Ge!==null&&ea(Ge,K,-1/0,D.sortObjects)}ea(A,K,0,D.sortObjects),R.finish(),D.sortObjects===!0&&R.sort(T,E),O=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,O&&Me.addToRenderList(R,A),this.info.render.frame++,ge===!0&&Be.beginShadows();const ne=M.state.shadowsArray;if(Ae.render(ne,A,K),ge===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),(te&&P.hasRenderPass())===!1){const Ge=R.opaque,Ie=R.transmissive;if(M.setupLights(),K.isArrayCamera){const We=K.cameras;if(Ie.length>0)for(let qe=0,et=We.length;qe<et;qe++){const st=We[qe];Vo(Ge,Ie,A,st)}O&&Me.render(A);for(let qe=0,et=We.length;qe<et;qe++){const st=We[qe];zo(R,A,st,st.viewport)}}else Ie.length>0&&Vo(Ge,Ie,A,K),O&&Me.render(A),zo(R,A,K)}I!==null&&k===0&&(b.updateMultisampleRenderTarget(I),b.updateRenderTargetMipmap(I)),te&&P.end(D),A.isScene===!0&&A.onAfterRender(D,A,K),Ee.resetDefaultState(),X=-1,H=null,y.pop(),y.length>0?(M=y[y.length-1],b.setTextureUnits(M.state.textureUnits),ge===!0&&Be.setGlobalState(D.clippingPlanes,M.state.camera)):M=null,w.pop(),w.length>0?R=w[w.length-1]:R=null,B!==null&&B.renderEnd()};function ea(A,K,re,te){if(A.visible===!1)return;if(A.layers.test(K.layers)){if(A.isGroup)re=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(K);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||se.intersectsSprite(A)){te&&ee.setFromMatrixPosition(A.matrixWorld).applyMatrix4(z);const Ge=Se.update(A),Ie=A.material;Ie.visible&&R.push(A,Ge,Ie,re,ee.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||se.intersectsObject(A))){const Ge=Se.update(A),Ie=A.material;if(te&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ee.copy(A.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),ee.copy(Ge.boundingSphere.center)),ee.applyMatrix4(A.matrixWorld).applyMatrix4(z)),Array.isArray(Ie)){const We=Ge.groups;for(let qe=0,et=We.length;qe<et;qe++){const st=We[qe],Ye=Ie[st.materialIndex];Ye&&Ye.visible&&R.push(A,Ge,Ye,re,ee.z,st)}}else Ie.visible&&R.push(A,Ge,Ie,re,ee.z,null)}}const Ue=A.children;for(let Ge=0,Ie=Ue.length;Ge<Ie;Ge++)ea(Ue[Ge],K,re,te)}function zo(A,K,re,te){const{opaque:ne,transmissive:Ue,transparent:Ge}=A;M.setupLightsView(re),ge===!0&&Be.setGlobalState(D.clippingPlanes,re),te&&fe.viewport(Y.copy(te)),ne.length>0&&Yr(ne,K,re),Ue.length>0&&Yr(Ue,K,re),Ge.length>0&&Yr(Ge,K,re),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Vo(A,K,re,te){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[te.id]===void 0){const Ye=Pe.has("EXT_color_buffer_half_float")||Pe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[te.id]=new Kt(1,1,{generateMipmaps:!0,type:Ye?1016:1009,minFilter:1008,samples:Math.max(4,He.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace})}const Ue=M.state.transmissionRenderTarget[te.id],Ge=te.viewport||Y;Ue.setSize(Ge.z*D.transmissionResolutionScale,Ge.w*D.transmissionResolutionScale);const Ie=D.getRenderTarget(),We=D.getActiveCubeFace(),qe=D.getActiveMipmapLevel();D.setRenderTarget(Ue),D.getClearColor(ve),Te=D.getClearAlpha(),Te<1&&D.setClearColor(16777215,.5),D.clear(),O&&Me.render(re);const et=D.toneMapping;D.toneMapping=0;const st=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),M.setupLightsView(te),ge===!0&&Be.setGlobalState(D.clippingPlanes,te),Yr(A,re,te),b.updateMultisampleRenderTarget(Ue),b.updateRenderTargetMipmap(Ue),Pe.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let mt=0,Rt=K.length;mt<Rt;mt++){const Et=K[mt],{object:gt,geometry:Gt,material:ke,group:Jt}=Et;if(ke.side===2&&gt.layers.test(te.layers)){const ct=ke.side;ke.side=1,ke.needsUpdate=!0,Ho(gt,re,te,Gt,ke,Jt),ke.side=ct,ke.needsUpdate=!0,Ye=!0}}Ye===!0&&(b.updateMultisampleRenderTarget(Ue),b.updateRenderTargetMipmap(Ue))}D.setRenderTarget(Ie,We,qe),D.setClearColor(ve,Te),st!==void 0&&(te.viewport=st),D.toneMapping=et}function Yr(A,K,re){const te=K.isScene===!0?K.overrideMaterial:null;for(let ne=0,Ue=A.length;ne<Ue;ne++){const Ge=A[ne],{object:Ie,geometry:We,group:qe}=Ge;let et=Ge.material;et.allowOverride===!0&&te!==null&&(et=te),Ie.layers.test(re.layers)&&Ho(Ie,K,re,We,et,qe)}}function Ho(A,K,re,te,ne,Ue){A.onBeforeRender(D,K,re,te,ne,Ue),A.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ne.onBeforeRender(D,K,re,te,A,Ue),ne.transparent===!0&&ne.side===2&&ne.forceSinglePass===!1?(ne.side=1,ne.needsUpdate=!0,D.renderBufferDirect(re,K,te,ne,A,Ue),ne.side=0,ne.needsUpdate=!0,D.renderBufferDirect(re,K,te,ne,A,Ue),ne.side=2):D.renderBufferDirect(re,K,te,ne,A,Ue),A.onAfterRender(D,K,re,te,ne,Ue)}function jr(A,K,re){K.isScene!==!0&&(K=ae);const te=C.get(A),ne=M.state.lights,Ue=M.state.shadowsArray,Ge=ne.state.version,Ie=be.getParameters(A,ne.state,Ue,K,re,M.state.lightProbeGridArray),We=be.getProgramCacheKey(Ie);let qe=te.programs;te.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?K.environment:null,te.fog=K.fog;const et=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;te.envMap=Q.get(A.envMap||te.environment,et),te.envMapRotation=te.environment!==null&&A.envMap===null?K.environmentRotation:A.envMapRotation,qe===void 0&&(A.addEventListener("dispose",Ct),qe=new Map,te.programs=qe);let st=qe.get(We);if(st!==void 0){if(te.currentProgram===st&&te.lightsStateVersion===Ge)return Xo(A,Ie),st}else Ie.uniforms=be.getUniforms(A),B!==null&&A.isNodeMaterial&&B.build(A,re,Ie),A.onBeforeCompile(Ie,D),st=be.acquireProgram(Ie,We),qe.set(We,st),te.uniforms=Ie.uniforms;const Ye=te.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ye.clippingPlanes=Be.uniform),Xo(A,Ie),te.needsLights=wh(A),te.lightsStateVersion=Ge,te.needsLights&&(Ye.ambientLightColor.value=ne.state.ambient,Ye.lightProbe.value=ne.state.probe,Ye.directionalLights.value=ne.state.directional,Ye.directionalLightShadows.value=ne.state.directionalShadow,Ye.spotLights.value=ne.state.spot,Ye.spotLightShadows.value=ne.state.spotShadow,Ye.rectAreaLights.value=ne.state.rectArea,Ye.ltc_1.value=ne.state.rectAreaLTC1,Ye.ltc_2.value=ne.state.rectAreaLTC2,Ye.pointLights.value=ne.state.point,Ye.pointLightShadows.value=ne.state.pointShadow,Ye.hemisphereLights.value=ne.state.hemi,Ye.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,Ye.spotLightMatrix.value=ne.state.spotLightMatrix,Ye.spotLightMap.value=ne.state.spotLightMap,Ye.pointShadowMatrix.value=ne.state.pointShadowMatrix),te.lightProbeGrid=M.state.lightProbeGridArray.length>0,te.currentProgram=st,te.uniformsList=null,st}function Wo(A){if(A.uniformsList===null){const K=A.currentProgram.getUniforms();A.uniformsList=Ms.seqWithValue(K.seq,A.uniforms)}return A.uniformsList}function Xo(A,K){const re=C.get(A);re.outputColorSpace=K.outputColorSpace,re.batching=K.batching,re.batchingColor=K.batchingColor,re.instancing=K.instancing,re.instancingColor=K.instancingColor,re.instancingMorph=K.instancingMorph,re.skinning=K.skinning,re.morphTargets=K.morphTargets,re.morphNormals=K.morphNormals,re.morphColors=K.morphColors,re.morphTargetsCount=K.morphTargetsCount,re.numClippingPlanes=K.numClippingPlanes,re.numIntersection=K.numClipIntersection,re.vertexAlphas=K.vertexAlphas,re.vertexTangents=K.vertexTangents,re.toneMapping=K.toneMapping}function Ah(A,K){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;S.setFromMatrixPosition(K.matrixWorld);for(let re=0,te=A.length;re<te;re++){const ne=A[re];if(ne.texture!==null&&ne.boundingBox.containsPoint(S))return ne}return null}function Ch(A,K,re,te,ne){K.isScene!==!0&&(K=ae),b.resetTextureUnits();const Ue=K.fog,Ge=te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial?K.environment:null,Ie=I===null?D.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ot.workingColorSpace,We=te.isMeshStandardMaterial||te.isMeshLambertMaterial&&!te.envMap||te.isMeshPhongMaterial&&!te.envMap,qe=Q.get(te.envMap||Ge,We),et=te.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,st=!!re.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Ye=!!re.morphAttributes.position,mt=!!re.morphAttributes.normal,Rt=!!re.morphAttributes.color;let Et=0;te.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Et=D.toneMapping);const gt=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Gt=gt!==void 0?gt.length:0,ke=C.get(te),Jt=M.state.lights;if(ge===!0&&(me===!0||A!==H)){const vt=A===H&&te.id===X;Be.setState(te,A,vt)}let ct=!1;te.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Jt.state.version||ke.outputColorSpace!==Ie||ne.isBatchedMesh&&ke.batching===!1||!ne.isBatchedMesh&&ke.batching===!0||ne.isBatchedMesh&&ke.batchingColor===!0&&ne.colorTexture===null||ne.isBatchedMesh&&ke.batchingColor===!1&&ne.colorTexture!==null||ne.isInstancedMesh&&ke.instancing===!1||!ne.isInstancedMesh&&ke.instancing===!0||ne.isSkinnedMesh&&ke.skinning===!1||!ne.isSkinnedMesh&&ke.skinning===!0||ne.isInstancedMesh&&ke.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&ke.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&ke.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&ke.instancingMorph===!1&&ne.morphTexture!==null||ke.envMap!==qe||te.fog===!0&&ke.fog!==Ue||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Be.numPlanes||ke.numIntersection!==Be.numIntersection)||ke.vertexAlphas!==et||ke.vertexTangents!==st||ke.morphTargets!==Ye||ke.morphNormals!==mt||ke.morphColors!==Rt||ke.toneMapping!==Et||ke.morphTargetsCount!==Gt||!!ke.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ct=!0):(ct=!0,ke.__version=te.version);let sn=ke.currentProgram;ct===!0&&(sn=jr(te,K,ne),B&&te.isNodeMaterial&&B.onUpdateProgram(te,sn,ke));let _n=!1,Gn=!1,Mi=!1;const xt=sn.getUniforms(),wt=ke.uniforms;if(fe.useProgram(sn.program)&&(_n=!0,Gn=!0,Mi=!0),te.id!==X&&(X=te.id,Gn=!0),ke.needsLights){const vt=Ah(M.state.lightProbeGridArray,ne);ke.lightProbeGrid!==vt&&(ke.lightProbeGrid=vt,Gn=!0)}if(_n||H!==A){fe.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),xt.setValue(L,"projectionMatrix",A.projectionMatrix),xt.setValue(L,"viewMatrix",A.matrixWorldInverse);const Vn=xt.map.cameraPosition;Vn!==void 0&&Vn.setValue(L,Z.setFromMatrixPosition(A.matrixWorld)),He.logarithmicDepthBuffer&&xt.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&xt.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),H!==A&&(H=A,Gn=!0,Mi=!0)}if(ke.needsLights&&(Jt.state.directionalShadowMap.length>0&&xt.setValue(L,"directionalShadowMap",Jt.state.directionalShadowMap,b),Jt.state.spotShadowMap.length>0&&xt.setValue(L,"spotShadowMap",Jt.state.spotShadowMap,b),Jt.state.pointShadowMap.length>0&&xt.setValue(L,"pointShadowMap",Jt.state.pointShadowMap,b)),ne.isSkinnedMesh){xt.setOptional(L,ne,"bindMatrix"),xt.setOptional(L,ne,"bindMatrixInverse");const vt=ne.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),xt.setValue(L,"boneTexture",vt.boneTexture,b))}ne.isBatchedMesh&&(xt.setOptional(L,ne,"batchingTexture"),xt.setValue(L,"batchingTexture",ne._matricesTexture,b),xt.setOptional(L,ne,"batchingIdTexture"),xt.setValue(L,"batchingIdTexture",ne._indirectTexture,b),xt.setOptional(L,ne,"batchingColorTexture"),ne._colorsTexture!==null&&xt.setValue(L,"batchingColorTexture",ne._colorsTexture,b));const zn=re.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&Ke.update(ne,re,sn),(Gn||ke.receiveShadow!==ne.receiveShadow)&&(ke.receiveShadow=ne.receiveShadow,xt.setValue(L,"receiveShadow",ne.receiveShadow)),(te.isMeshStandardMaterial||te.isMeshLambertMaterial||te.isMeshPhongMaterial)&&te.envMap===null&&K.environment!==null&&(wt.envMapIntensity.value=K.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=Sx()),Gn){if(xt.setValue(L,"toneMappingExposure",D.toneMappingExposure),ke.needsLights&&Rh(wt,Mi),Ue&&te.fog===!0&&oe.refreshFogUniforms(wt,Ue),oe.refreshMaterialUniforms(wt,te,N,j,M.state.transmissionRenderTarget[A.id]),ke.needsLights&&ke.lightProbeGrid){const vt=ke.lightProbeGrid;wt.probesSH.value=vt.texture,wt.probesMin.value.copy(vt.boundingBox.min),wt.probesMax.value.copy(vt.boundingBox.max),wt.probesResolution.value.copy(vt.resolution)}Ms.upload(L,Wo(ke),wt,b)}if(te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Ms.upload(L,Wo(ke),wt,b),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&xt.setValue(L,"center",ne.center),xt.setValue(L,"modelViewMatrix",ne.modelViewMatrix),xt.setValue(L,"normalMatrix",ne.normalMatrix),xt.setValue(L,"modelMatrix",ne.matrixWorld),te.uniformsGroups!==void 0){const vt=te.uniformsGroups;for(let Vn=0,Ei=vt.length;Vn<Ei;Vn++){const qo=vt[Vn];ue.update(qo,sn),ue.bind(qo,sn)}}return sn}function Rh(A,K){A.ambientLightColor.needsUpdate=K,A.lightProbe.needsUpdate=K,A.directionalLights.needsUpdate=K,A.directionalLightShadows.needsUpdate=K,A.pointLights.needsUpdate=K,A.pointLightShadows.needsUpdate=K,A.spotLights.needsUpdate=K,A.spotLightShadows.needsUpdate=K,A.rectAreaLights.needsUpdate=K,A.hemisphereLights.needsUpdate=K}function wh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,K,re){const te=C.get(A);te.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),C.get(A.texture).__webglTexture=K,C.get(A.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:re,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,K){const re=C.get(A);re.__webglFramebuffer=K,re.__useDefaultFramebuffer=K===void 0};const Ph=L.createFramebuffer();this.setRenderTarget=function(A,K=0,re=0){I=A,G=K,k=re;let te=null,ne=!1,Ue=!1;if(A){const Ie=C.get(A);if(Ie.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(L.FRAMEBUFFER,Ie.__webglFramebuffer),Y.copy(A.viewport),le.copy(A.scissor),pe=A.scissorTest,fe.viewport(Y),fe.scissor(le),fe.setScissorTest(pe),X=-1;return}else if(Ie.__webglFramebuffer===void 0)b.setupRenderTarget(A);else if(Ie.__hasExternalTextures)b.rebindTextures(A,C.get(A.texture).__webglTexture,C.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const et=A.depthTexture;if(Ie.__boundDepthTexture!==et){if(et!==null&&C.has(et)&&(A.width!==et.image.width||A.height!==et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(A)}}const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ue=!0);const qe=C.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(qe[K])?te=qe[K][re]:te=qe[K],ne=!0):A.samples>0&&b.useMultisampledRTT(A)===!1?te=C.get(A).__webglMultisampledFramebuffer:Array.isArray(qe)?te=qe[re]:te=qe,Y.copy(A.viewport),le.copy(A.scissor),pe=A.scissorTest}else Y.copy(V).multiplyScalar(N).floor(),le.copy(ie).multiplyScalar(N).floor(),pe=J;if(re!==0&&(te=Ph),fe.bindFramebuffer(L.FRAMEBUFFER,te)&&fe.drawBuffers(A,te),fe.viewport(Y),fe.scissor(le),fe.setScissorTest(pe),ne){const Ie=C.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ie.__webglTexture,re)}else if(Ue){const Ie=K;for(let We=0;We<A.textures.length;We++){const qe=C.get(A.textures[We]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+We,qe.__webglTexture,re,Ie)}}else if(A!==null&&re!==0){const Ie=C.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ie.__webglTexture,re)}X=-1},this.readRenderTargetPixels=function(A,K,re,te,ne,Ue,Ge,Ie=0){if(!(A&&A.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=C.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(We=We[Ge]),We){fe.bindFramebuffer(L.FRAMEBUFFER,We);try{const qe=A.textures[Ie],et=qe.format,st=qe.type;if(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Ie),!He.textureFormatReadable(et)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(st)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=A.width-te&&re>=0&&re<=A.height-ne&&L.readPixels(K,re,te,ne,W.convert(et),W.convert(st),Ue)}finally{const qe=I!==null?C.get(I).__webglFramebuffer:null;fe.bindFramebuffer(L.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(A,K,re,te,ne,Ue,Ge,Ie=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=C.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(We=We[Ge]),We)if(K>=0&&K<=A.width-te&&re>=0&&re<=A.height-ne){fe.bindFramebuffer(L.FRAMEBUFFER,We);const qe=A.textures[Ie],et=qe.format,st=qe.type;if(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Ie),!He.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.bufferData(L.PIXEL_PACK_BUFFER,Ue.byteLength,L.STREAM_READ),L.readPixels(K,re,te,ne,W.convert(et),W.convert(st),0);const mt=I!==null?C.get(I).__webglFramebuffer:null;fe.bindFramebuffer(L.FRAMEBUFFER,mt);const Rt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Fh(L,Rt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Ue),L.deleteBuffer(Ye),L.deleteSync(Rt),Ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,K=null,re=0){const te=Math.pow(2,-re),ne=Math.floor(A.image.width*te),Ue=Math.floor(A.image.height*te),Ge=K!==null?K.x:0,Ie=K!==null?K.y:0;b.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,re,0,0,Ge,Ie,ne,Ue),fe.unbindTexture()};const Lh=L.createFramebuffer(),Dh=L.createFramebuffer();this.copyTextureToTexture=function(A,K,re=null,te=null,ne=0,Ue=0){let Ge,Ie,We,qe,et,st,Ye,mt,Rt;const Et=A.isCompressedTexture?A.mipmaps[Ue]:A.image;if(re!==null)Ge=re.max.x-re.min.x,Ie=re.max.y-re.min.y,We=re.isBox3?re.max.z-re.min.z:1,qe=re.min.x,et=re.min.y,st=re.isBox3?re.min.z:0;else{const wt=Math.pow(2,-ne);Ge=Math.floor(Et.width*wt),Ie=Math.floor(Et.height*wt),A.isDataArrayTexture?We=Et.depth:A.isData3DTexture?We=Math.floor(Et.depth*wt):We=1,qe=0,et=0,st=0}te!==null?(Ye=te.x,mt=te.y,Rt=te.z):(Ye=0,mt=0,Rt=0);const gt=W.convert(K.format),Gt=W.convert(K.type);let ke;K.isData3DTexture?(b.setTexture3D(K,0),ke=L.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(b.setTexture2DArray(K,0),ke=L.TEXTURE_2D_ARRAY):(b.setTexture2D(K,0),ke=L.TEXTURE_2D),fe.activeTexture(L.TEXTURE0),fe.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,K.flipY),fe.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),fe.pixelStorei(L.UNPACK_ALIGNMENT,K.unpackAlignment);const Jt=fe.getParameter(L.UNPACK_ROW_LENGTH),ct=fe.getParameter(L.UNPACK_IMAGE_HEIGHT),sn=fe.getParameter(L.UNPACK_SKIP_PIXELS),_n=fe.getParameter(L.UNPACK_SKIP_ROWS),Gn=fe.getParameter(L.UNPACK_SKIP_IMAGES);fe.pixelStorei(L.UNPACK_ROW_LENGTH,Et.width),fe.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Et.height),fe.pixelStorei(L.UNPACK_SKIP_PIXELS,qe),fe.pixelStorei(L.UNPACK_SKIP_ROWS,et),fe.pixelStorei(L.UNPACK_SKIP_IMAGES,st);const Mi=A.isDataArrayTexture||A.isData3DTexture,xt=K.isDataArrayTexture||K.isData3DTexture;if(A.isDepthTexture){const wt=C.get(A),zn=C.get(K),vt=C.get(wt.__renderTarget),Vn=C.get(zn.__renderTarget);fe.bindFramebuffer(L.READ_FRAMEBUFFER,vt.__webglFramebuffer),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Ei=0;Ei<We;Ei++)Mi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,C.get(A).__webglTexture,ne,st+Ei),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,C.get(K).__webglTexture,Ue,Rt+Ei)),L.blitFramebuffer(qe,et,Ge,Ie,Ye,mt,Ge,Ie,L.DEPTH_BUFFER_BIT,L.NEAREST);fe.bindFramebuffer(L.READ_FRAMEBUFFER,null),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(ne!==0||A.isRenderTargetTexture||C.has(A)){const wt=C.get(A),zn=C.get(K);fe.bindFramebuffer(L.READ_FRAMEBUFFER,Lh),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Dh);for(let vt=0;vt<We;vt++)Mi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.__webglTexture,ne,st+vt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,wt.__webglTexture,ne),xt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zn.__webglTexture,Ue,Rt+vt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zn.__webglTexture,Ue),ne!==0?L.blitFramebuffer(qe,et,Ge,Ie,Ye,mt,Ge,Ie,L.COLOR_BUFFER_BIT,L.NEAREST):xt?L.copyTexSubImage3D(ke,Ue,Ye,mt,Rt+vt,qe,et,Ge,Ie):L.copyTexSubImage2D(ke,Ue,Ye,mt,qe,et,Ge,Ie);fe.bindFramebuffer(L.READ_FRAMEBUFFER,null),fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else xt?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(ke,Ue,Ye,mt,Rt,Ge,Ie,We,gt,Gt,Et.data):K.isCompressedArrayTexture?L.compressedTexSubImage3D(ke,Ue,Ye,mt,Rt,Ge,Ie,We,gt,Et.data):L.texSubImage3D(ke,Ue,Ye,mt,Rt,Ge,Ie,We,gt,Gt,Et):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Ue,Ye,mt,Ge,Ie,gt,Gt,Et.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Ue,Ye,mt,Et.width,Et.height,gt,Et.data):L.texSubImage2D(L.TEXTURE_2D,Ue,Ye,mt,Ge,Ie,gt,Gt,Et);fe.pixelStorei(L.UNPACK_ROW_LENGTH,Jt),fe.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct),fe.pixelStorei(L.UNPACK_SKIP_PIXELS,sn),fe.pixelStorei(L.UNPACK_SKIP_ROWS,_n),fe.pixelStorei(L.UNPACK_SKIP_IMAGES,Gn),Ue===0&&K.generateMipmaps&&L.generateMipmap(ke),fe.unbindTexture()},this.initRenderTarget=function(A){C.get(A).__webglFramebuffer===void 0&&b.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?b.setTextureCube(A,0):A.isData3DTexture?b.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?b.setTexture2DArray(A,0):b.setTexture2D(A,0),fe.unbindTexture()},this.resetState=function(){G=0,k=0,I=null,fe.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}var _o=0,xu=-3;function Dr(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function Tx(n,e){this.source=n,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=e,this.destLen=0,this.ltree=new Dr,this.dtree=new Dr}var vu=new Dr,_u=new Dr,yo=new Uint8Array(30),So=new Uint16Array(30),yu=new Uint8Array(30),Su=new Uint16Array(30),Mx=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jl=new Dr,bn=new Uint8Array(320);function bu(n,e,t,i){var r,s;for(r=0;r<t;++r)n[r]=0;for(r=0;r<30-t;++r)n[r+t]=r/t|0;for(s=i,r=0;r<30;++r)e[r]=s,s+=1<<n[r]}function Ex(n,e){var t;for(t=0;t<7;++t)n.table[t]=0;for(n.table[7]=24,n.table[8]=152,n.table[9]=112,t=0;t<24;++t)n.trans[t]=256+t;for(t=0;t<144;++t)n.trans[24+t]=t;for(t=0;t<8;++t)n.trans[168+t]=280+t;for(t=0;t<112;++t)n.trans[176+t]=144+t;for(t=0;t<5;++t)e.table[t]=0;for(e.table[5]=32,t=0;t<32;++t)e.trans[t]=t}var $l=new Uint16Array(16);function Ia(n,e,t,i){var r,s;for(r=0;r<16;++r)n.table[r]=0;for(r=0;r<i;++r)n.table[e[t+r]]++;for(n.table[0]=0,s=0,r=0;r<16;++r)$l[r]=s,s+=n.table[r];for(r=0;r<i;++r)e[t+r]&&(n.trans[$l[e[t+r]]++]=r)}function Ax(n){n.bitcount--||(n.tag=n.source[n.sourceIndex++],n.bitcount=7);var e=n.tag&1;return n.tag>>>=1,e}function Mn(n,e,t){if(!e)return t;for(;n.bitcount<24;)n.tag|=n.source[n.sourceIndex++]<<n.bitcount,n.bitcount+=8;var i=n.tag&65535>>>16-e;return n.tag>>>=e,n.bitcount-=e,i+t}function Ka(n,e){for(;n.bitcount<24;)n.tag|=n.source[n.sourceIndex++]<<n.bitcount,n.bitcount+=8;var t=0,i=0,r=0,s=n.tag;do i=2*i+(s&1),s>>>=1,++r,t+=e.table[r],i-=e.table[r];while(i>=0);return n.tag=s,n.bitcount-=r,e.trans[t+i]}function Cx(n,e,t){var i,r,s,a,o,l;for(i=Mn(n,5,257),r=Mn(n,5,1),s=Mn(n,4,4),a=0;a<19;++a)bn[a]=0;for(a=0;a<s;++a){var c=Mn(n,3,0);bn[Mx[a]]=c}for(Ia(jl,bn,0,19),o=0;o<i+r;){var u=Ka(n,jl);switch(u){case 16:var f=bn[o-1];for(l=Mn(n,2,3);l;--l)bn[o++]=f;break;case 17:for(l=Mn(n,3,3);l;--l)bn[o++]=0;break;case 18:for(l=Mn(n,7,11);l;--l)bn[o++]=0;break;default:bn[o++]=u;break}}Ia(e,bn,0,i),Ia(t,bn,i,r)}function Zl(n,e,t){for(;;){var i=Ka(n,e);if(i===256)return _o;if(i<256)n.dest[n.destLen++]=i;else{var r,s,a,o;for(i-=257,r=Mn(n,yo[i],So[i]),s=Ka(n,t),a=n.destLen-Mn(n,yu[s],Su[s]),o=a;o<a+r;++o)n.dest[n.destLen++]=n.dest[o]}}}function Rx(n){for(var e,t,i;n.bitcount>8;)n.sourceIndex--,n.bitcount-=8;if(e=n.source[n.sourceIndex+1],e=256*e+n.source[n.sourceIndex],t=n.source[n.sourceIndex+3],t=256*t+n.source[n.sourceIndex+2],e!==(~t&65535))return xu;for(n.sourceIndex+=4,i=e;i;--i)n.dest[n.destLen++]=n.source[n.sourceIndex++];return n.bitcount=0,_o}function Tu(n,e){var t=new Tx(n,e),i,r,s;do{switch(i=Ax(t),r=Mn(t,2,0),r){case 0:s=Rx(t);break;case 1:s=Zl(t,vu,_u);break;case 2:Cx(t,t.ltree,t.dtree),s=Zl(t,t.ltree,t.dtree);break;default:s=xu}if(s!==_o)throw new Error("Data error")}while(!i);return t.destLen<t.dest.length?typeof t.dest.slice=="function"?t.dest.slice(0,t.destLen):t.dest.subarray(0,t.destLen):t.dest}Ex(vu,_u);bu(yo,So,4,3);bu(yu,Su,2,1);yo[28]=0;So[28]=258;function Gi(n,e,t,i,r){return Math.pow(1-r,3)*n+3*Math.pow(1-r,2)*r*e+3*(1-r)*Math.pow(r,2)*t+Math.pow(r,3)*i}function Si(){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN}Si.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)};Si.prototype.addPoint=function(n,e){typeof n=="number"&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=n,this.x2=n),n<this.x1&&(this.x1=n),n>this.x2&&(this.x2=n)),typeof e=="number"&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))};Si.prototype.addX=function(n){this.addPoint(n,null)};Si.prototype.addY=function(n){this.addPoint(null,n)};Si.prototype.addBezier=function(n,e,t,i,r,s,a,o){const l=[n,e],c=[t,i],u=[r,s],f=[a,o];this.addPoint(n,e),this.addPoint(a,o);for(let h=0;h<=1;h++){const d=6*l[h]-12*c[h]+6*u[h],p=-3*l[h]+9*c[h]-9*u[h]+3*f[h],x=3*c[h]-3*l[h];if(p===0){if(d===0)continue;const v=-x/d;0<v&&v<1&&(h===0&&this.addX(Gi(l[h],c[h],u[h],f[h],v)),h===1&&this.addY(Gi(l[h],c[h],u[h],f[h],v)));continue}const m=Math.pow(d,2)-4*x*p;if(m<0)continue;const g=(-d+Math.sqrt(m))/(2*p);0<g&&g<1&&(h===0&&this.addX(Gi(l[h],c[h],u[h],f[h],g)),h===1&&this.addY(Gi(l[h],c[h],u[h],f[h],g)));const _=(-d-Math.sqrt(m))/(2*p);0<_&&_<1&&(h===0&&this.addX(Gi(l[h],c[h],u[h],f[h],_)),h===1&&this.addY(Gi(l[h],c[h],u[h],f[h],_)))}};Si.prototype.addQuad=function(n,e,t,i,r,s){const a=n+.6666666666666666*(t-n),o=e+2/3*(i-e),l=a+1/3*(r-n),c=o+1/3*(s-e);this.addBezier(n,e,a,o,l,c,r,s)};var Mu=Si;function Ut(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}var pr={};function Eu(n,e){const t=Math.floor(n),i=n-t;if(pr[e]||(pr[e]={}),pr[e][i]!==void 0){const s=pr[e][i];return t+s}const r=+(Math.round(i+"e+"+e)+"e-"+e);return pr[e][i]=r,t+r}function Au(n){let e=[[]],t=0,i=0;for(let r=0;r<n.length;r+=1){const s=e[e.length-1],a=n[r],o=s[0],l=s[1],c=s[s.length-1],u=n[r+1];s.push(a),a.type==="M"?(t=a.x,i=a.y):a.type==="L"&&(!u||u.type==="Z")?Math.abs(a.x-t)>1||Math.abs(a.y-i)>1||s.pop():a.type==="L"&&c&&c.x===a.x&&c.y===a.y?s.pop():a.type==="Z"&&(o&&l&&c&&o.type==="M"&&l.type==="L"&&c.type==="L"&&c.x===o.x&&c.y===o.y&&(s.shift(),s[0].type="M"),r+1<n.length&&e.push([]))}return n=[].concat.apply([],e),n}function wx(n){return Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0,scale:1,x:0,y:0},n)}function Px(n){return parseInt(n)===n&&(n={decimalPlaces:n,flipY:!1}),Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0},n)}Ut.prototype.fromSVG=function(n,e={}){typeof SVGPathElement<"u"&&n instanceof SVGPathElement&&(n=n.getAttribute("d")),e=wx(e),this.commands=[];const t="0123456789",i="MmLlQqCcZzHhVv",r="SsTtAa",s="-+";let a={},o=[""],l=!1;function c(p){return p.filter(x=>x.length).map(x=>{let m=parseFloat(x);return(e.decimalPlaces||e.decimalPlaces===0)&&(m=Eu(m,e.decimalPlaces)),m})}function u(p){if(!this.commands.length)return p;const x=this.commands[this.commands.length-1];for(let m=0;m<p.length;m++)p[m]+=x[m&1?"y":"x"];return p}function f(){if(a.type===void 0)return;const p=a.type.toUpperCase(),x=p!=="Z"&&a.type.toUpperCase()!==a.type;let m=c(o);if(o=[""],!m.length&&p!=="Z")return;x&&p!=="H"&&p!=="V"&&(m=u.apply(this,[m]));const g=this.commands.length&&this.commands[this.commands.length-1].x||0,_=this.commands.length&&this.commands[this.commands.length-1].y||0;switch(p){case"M":this.moveTo(...m);break;case"L":this.lineTo(...m);break;case"V":for(let v=0;v<m.length;v++){let S=0;x&&(S=this.commands.length&&this.commands[this.commands.length-1].y||0),this.lineTo(g,m[v]+S)}break;case"H":for(let v=0;v<m.length;v++){let S=0;x&&(S=this.commands.length&&this.commands[this.commands.length-1].x||0),this.lineTo(m[v]+S,_)}break;case"C":this.bezierCurveTo(...m);break;case"Q":this.quadraticCurveTo(...m);break;case"Z":(this.commands.length<1||this.commands[this.commands.length-1].type!=="Z")&&this.close();break}if(this.commands.length)for(const v in this.commands[this.commands.length-1])this.commands[this.commands.length-1][v]===void 0&&(this.commands[this.commands.length-1][v]=0)}for(let p=0;p<n.length;p++){const x=n.charAt(p),m=o[o.length-1];if(t.indexOf(x)>-1)o[o.length-1]+=x;else if(s.indexOf(x)>-1)if(!a.type&&!this.commands.length&&(a.type="L"),x==="-")!a.type||m.indexOf("-")>0?l=!0:m.length?o.push("-"):o[o.length-1]=x;else if(!a.type||m.length>0)l=!0;else continue;else if(i.indexOf(x)>-1)a.type?(f.apply(this),a={type:x}):a.type=x;else{if(r.indexOf(x)>-1)throw new Error("Unsupported path command: "+x+". Currently supported commands are "+i.split("").join(", ")+".");` ,	
\r\f\v`.indexOf(x)>-1?o.push(""):x==="."?!a.type||m.indexOf(x)>-1?l=!0:o[o.length-1]+=x:l=!0}if(l)throw new Error("Unexpected character: "+x+" at offset "+p)}f.apply(this),e.optimize&&(this.commands=Au(this.commands));const h=e.flipY;let d=e.flipYBase;if(h===!0&&e.flipYBase===void 0){const p=this.getBoundingBox();d=p.y1+p.y2}for(const p in this.commands){const x=this.commands[p];for(const m in x)["x","x1","x2"].includes(m)?this.commands[p][m]=e.x+x[m]*e.scale:["y","y1","y2"].includes(m)&&(this.commands[p][m]=e.y+(h?d-x[m]:x[m])*e.scale)}return this};Ut.fromSVG=function(n,e){return new Ut().fromSVG(n,e)};Ut.prototype.moveTo=function(n,e){this.commands.push({type:"M",x:n,y:e})};Ut.prototype.lineTo=function(n,e){this.commands.push({type:"L",x:n,y:e})};Ut.prototype.curveTo=Ut.prototype.bezierCurveTo=function(n,e,t,i,r,s){this.commands.push({type:"C",x1:n,y1:e,x2:t,y2:i,x:r,y:s})};Ut.prototype.quadTo=Ut.prototype.quadraticCurveTo=function(n,e,t,i){this.commands.push({type:"Q",x1:n,y1:e,x:t,y:i})};Ut.prototype.close=Ut.prototype.closePath=function(){this.commands.push({type:"Z"})};Ut.prototype.extend=function(n){if(n.commands)n=n.commands;else if(n instanceof Mu){const e=n;this.moveTo(e.x1,e.y1),this.lineTo(e.x2,e.y1),this.lineTo(e.x2,e.y2),this.lineTo(e.x1,e.y2),this.close();return}Array.prototype.push.apply(this.commands,n)};Ut.prototype.getBoundingBox=function(){const n=new Mu;let e=0,t=0,i=0,r=0;for(let s=0;s<this.commands.length;s++){const a=this.commands[s];switch(a.type){case"M":n.addPoint(a.x,a.y),e=i=a.x,t=r=a.y;break;case"L":n.addPoint(a.x,a.y),i=a.x,r=a.y;break;case"Q":n.addQuad(i,r,a.x1,a.y1,a.x,a.y),i=a.x,r=a.y;break;case"C":n.addBezier(i,r,a.x1,a.y1,a.x2,a.y2,a.x,a.y),i=a.x,r=a.y;break;case"Z":i=e,r=t;break;default:throw new Error("Unexpected path command "+a.type)}}return n.isEmpty()&&n.addPoint(0,0),n};Ut.prototype.draw=function(n){const e=this._layers;if(e&&e.length){for(let i=0;i<e.length;i++)this.draw.call(e[i],n);return}const t=this._image;if(t){n.drawImage(t.image,t.x,t.y,t.width,t.height);return}n.beginPath();for(let i=0;i<this.commands.length;i+=1){const r=this.commands[i];r.type==="M"?n.moveTo(r.x,r.y):r.type==="L"?n.lineTo(r.x,r.y):r.type==="C"?n.bezierCurveTo(r.x1,r.y1,r.x2,r.y2,r.x,r.y):r.type==="Q"?n.quadraticCurveTo(r.x1,r.y1,r.x,r.y):r.type==="Z"&&this.stroke&&this.strokeWidth&&n.closePath()}this.fill&&(n.fillStyle=this.fill,n.fill()),this.stroke&&(n.strokeStyle=this.stroke,n.lineWidth=this.strokeWidth,n.stroke())};Ut.prototype.toPathData=function(n){n=Px(n);function e(o){const l=Eu(o,n.decimalPlaces);return Math.round(o)===l?""+l:l.toFixed(n.decimalPlaces)}function t(){let o="";for(let l=0;l<arguments.length;l+=1){const c=arguments[l];c>=0&&l>0&&(o+=" "),o+=e(c)}return o}let i=this.commands;n.optimize&&(i=JSON.parse(JSON.stringify(this.commands)),i=Au(i));const r=n.flipY;let s=n.flipYBase;if(r===!0&&s===void 0){const o=new Ut;o.extend(i);const l=o.getBoundingBox();s=l.y1+l.y2}let a="";for(let o=0;o<i.length;o+=1){const l=i[o];l.type==="M"?a+="M"+t(l.x,r?s-l.y:l.y):l.type==="L"?a+="L"+t(l.x,r?s-l.y:l.y):l.type==="C"?a+="C"+t(l.x1,r?s-l.y1:l.y1,l.x2,r?s-l.y2:l.y2,l.x,r?s-l.y:l.y):l.type==="Q"?a+="Q"+t(l.x1,r?s-l.y1:l.y1,l.x,r?s-l.y:l.y):l.type==="Z"&&(a+="Z")}return a};Ut.prototype.toSVG=function(n,e){this._layers&&this._layers.length&&console.warn("toSVG() does not support colr font layers yet"),this._image&&console.warn("toSVG() does not support SVG glyphs yet"),e||(e=this.toPathData(n));let t='<path d="';return t+=e,t+='"',this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?t+=' fill="none"':t+=' fill="'+this.fill+'"'),this.stroke&&(t+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),t+="/>",t};Ut.prototype.toDOMElement=function(n,e){this._layers&&this._layers.length&&console.warn("toDOMElement() does not support colr font layers yet"),e||(e=this.toPathData(n));const t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttribute("d",e),this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?t.setAttribute("fill","none"):t.setAttribute("fill",this.fill)),this.stroke&&(t.setAttribute("stroke",this.stroke),t.setAttribute("stroke-width",this.strokeWidth)),t};var Ki=Ut;function Cu(n){throw new Error(n)}function Kl(n,e){n||Cu(e)}var Ve={fail:Cu,argument:Kl,assert:Kl},Jl=32768,Ql=2147483648,Lx=-32768,Dx=32767+1/65536,Ji={},we={},je={};function xn(n){return function(){return n}}we.BYTE=function(n){return Ve.argument(n>=0&&n<=255,"Byte value should be between 0 and 255."),[n]};je.BYTE=xn(1);we.CHAR=function(n){return[n.charCodeAt(0)]};je.CHAR=xn(1);we.CHARARRAY=function(n){(n===null||typeof n>"u")&&(n="",console.warn("CHARARRAY with undefined or null value encountered and treated as an empty string. This is probably caused by a missing glyph name."));const e=[];for(let t=0;t<n.length;t+=1)e[t]=n.charCodeAt(t);return e};je.CHARARRAY=function(n){return typeof n>"u"?0:n.length};we.USHORT=function(n){return[n>>8&255,n&255]};je.USHORT=xn(2);we.SHORT=function(n){return n>=Jl&&(n=-(2*Jl-n)),[n>>8&255,n&255]};je.SHORT=xn(2);we.UINT24=function(n){return[n>>16&255,n>>8&255,n&255]};je.UINT24=xn(3);we.ULONG=function(n){return[n>>24&255,n>>16&255,n>>8&255,n&255]};je.ULONG=xn(4);we.LONG=function(n){return n>=Ql&&(n=-(2*Ql-n)),[n>>24&255,n>>16&255,n>>8&255,n&255]};je.LONG=xn(4);we.FLOAT=function(n){if(n>Dx||n<Lx)throw new Error(`Value ${n} is outside the range of representable values in 16.16 format`);const e=Math.round(n*65536)<<0;return we.ULONG(e)};je.FLOAT=je.ULONG;we.FIXED=we.ULONG;je.FIXED=je.ULONG;we.FWORD=we.SHORT;je.FWORD=je.SHORT;we.UFWORD=we.USHORT;je.UFWORD=je.USHORT;we.F2DOT14=function(n){return we.USHORT(n*16384)};je.F2DOT14=je.USHORT;we.LONGDATETIME=function(n){return[0,0,0,0,n>>24&255,n>>16&255,n>>8&255,n&255]};je.LONGDATETIME=xn(8);we.TAG=function(n){return Ve.argument(n.length===4,"Tag should be exactly 4 ASCII characters."),[n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3)]};je.TAG=xn(4);we.Card8=we.BYTE;je.Card8=je.BYTE;we.Card16=we.USHORT;je.Card16=je.USHORT;we.OffSize=we.BYTE;je.OffSize=je.BYTE;we.SID=we.USHORT;je.SID=je.USHORT;we.NUMBER=function(n){return n>=-107&&n<=107?[n+139]:n>=108&&n<=1131?(n=n-108,[(n>>8)+247,n&255]):n>=-1131&&n<=-108?(n=-n-108,[(n>>8)+251,n&255]):n>=-32768&&n<=32767?we.NUMBER16(n):we.NUMBER32(n)};je.NUMBER=function(n){return we.NUMBER(n).length};we.NUMBER16=function(n){return[28,n>>8&255,n&255]};je.NUMBER16=xn(3);we.NUMBER32=function(n){return[29,n>>24&255,n>>16&255,n>>8&255,n&255]};je.NUMBER32=xn(5);we.REAL=function(n){let e=n.toString();const t=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(e);if(t){const s=parseFloat("1e"+((t[2]?+t[2]:0)+t[1].length));e=(Math.round(n*s)/s).toString()}let i="";for(let s=0,a=e.length;s<a;s+=1){const o=e[s];o==="e"?i+=e[++s]==="-"?"c":"b":o==="."?i+="a":o==="-"?i+="e":i+=o}i+=i.length&1?"f":"ff";const r=[30];for(let s=0,a=i.length;s<a;s+=2)r.push(parseInt(i.substr(s,2),16));return r};je.REAL=function(n){return we.REAL(n).length};we.NAME=we.CHARARRAY;je.NAME=je.CHARARRAY;we.STRING=we.CHARARRAY;je.STRING=je.CHARARRAY;Ji.UTF8=function(n,e,t){const i=[],r=t;for(let s=0;s<r;s++,e+=1)i[s]=n.getUint8(e);return String.fromCharCode.apply(null,i)};Ji.UTF16=function(n,e,t){const i=[],r=t/2;for(let s=0;s<r;s++,e+=2)i[s]=n.getUint16(e);return String.fromCharCode.apply(null,i)};we.UTF16=function(n){const e=[];for(let t=0;t<n.length;t+=1){const i=n.charCodeAt(t);e[e.length]=i>>8&255,e[e.length]=i&255}return e};je.UTF16=function(n){return n.length*2};var Ls={"x-mac-croatian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ","x-mac-cyrillic":"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю","x-mac-gaelic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ","x-mac-greek":"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­","x-mac-icelandic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-inuit":"ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł","x-mac-ce":"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",macintosh:"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-romanian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-turkish":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"};Ji.MACSTRING=function(n,e,t,i){const r=Ls[i];if(r===void 0)return;let s="";for(let a=0;a<t;a++){const o=n.getUint8(e+a);o<=127?s+=String.fromCharCode(o):s+=r[o&127]}return s};var vs=typeof WeakMap=="function"&&new WeakMap,_s,Ix=function(n){if(!_s){_s={};for(let r in Ls)_s[r]=new String(r)}const e=_s[n];if(e===void 0)return;if(vs){const r=vs.get(e);if(r!==void 0)return r}const t=Ls[n];if(t===void 0)return;const i={};for(let r=0;r<t.length;r++)i[t.charCodeAt(r)]=r+128;return vs&&vs.set(e,i),i};we.MACSTRING=function(n,e){const t=Ix(e);if(t===void 0)return;const i=[];for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);if(s>=128&&(s=t[s],s===void 0))return;i[r]=s}return i};je.MACSTRING=function(n,e){const t=we.MACSTRING(n,e);return t!==void 0?t.length:0};function Ja(n){return n>=-128&&n<=127}function Ux(n,e,t){let i=0;const r=n.length;for(;e<r&&i<64&&n[e]===0;)++e,++i;return t.push(128|i-1),e}function Fx(n,e,t){let i=0;const r=n.length;let s=e;for(;s<r&&i<64;){const a=n[s];if(!Ja(a)||a===0&&s+1<r&&n[s+1]===0)break;++s,++i}t.push(i-1);for(let a=e;a<s;++a)t.push(n[a]+256&255);return s}function Ox(n,e,t){let i=0;const r=n.length;let s=e;for(;s<r&&i<64;){const a=n[s];if(a===0||Ja(a)&&s+1<r&&Ja(n[s+1]))break;++s,++i}t.push(64|i-1);for(let a=e;a<s;++a){const o=n[a];t.push(o+65536>>8&255,o+256&255)}return s}we.VARDELTAS=function(n){let e=0;const t=[];for(;e<n.length;){const i=n[e];i===0?e=Ux(n,e,t):i>=-128&&i<=127?e=Fx(n,e,t):e=Ox(n,e,t)}return t};we.INDEX=function(n){let e=1;const t=[e],i=[];for(let o=0;o<n.length;o+=1){const l=we.OBJECT(n[o]);Array.prototype.push.apply(i,l),e+=l.length,t.push(e)}if(i.length===0)return[0,0];const r=[],s=1+Math.floor(Math.log(e)/Math.log(2))/8|0,a=[void 0,we.BYTE,we.USHORT,we.UINT24,we.ULONG][s];for(let o=0;o<t.length;o+=1){const l=a(t[o]);Array.prototype.push.apply(r,l)}return Array.prototype.concat(we.Card16(n.length),we.OffSize(s),r,i)};je.INDEX=function(n){return we.INDEX(n).length};we.DICT=function(n){let e=[];const t=Object.keys(n),i=t.length;for(let r=0;r<i;r+=1){const s=parseInt(t[r],0),a=n[s],o=we.OPERAND(a.value,a.type),l=we.OPERATOR(s);for(let c=0;c<o.length;c++)e.push(o[c]);for(let c=0;c<l.length;c++)e.push(l[c])}return e};je.DICT=function(n){return we.DICT(n).length};we.OPERATOR=function(n){return n<1200?[n]:[12,n-1200]};we.OPERAND=function(n,e){let t=[];if(Array.isArray(e))for(let i=0;i<e.length;i+=1){Ve.argument(n.length===e.length,"Not enough arguments given for type"+e);const r=we.OPERAND(n[i],e[i]);for(let s=0;s<r.length;s++)t.push(r[s])}else if(e==="SID"){const i=we.NUMBER(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="offset"){const i=we.NUMBER32(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="number"){const i=we.NUMBER(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="real"){const i=we.REAL(n);for(let r=0;r<i.length;r++)t.push(i[r])}else throw new Error("Unknown operand type "+e);return t};we.OP=we.BYTE;je.OP=je.BYTE;var ys=typeof WeakMap=="function"&&new WeakMap;we.CHARSTRING=function(n){if(ys){const i=ys.get(n);if(i!==void 0)return i}let e=[];const t=n.length;for(let i=0;i<t;i+=1){const r=n[i],s=we[r.type](r.value);for(let a=0;a<s.length;a++)e.push(s[a])}return ys&&ys.set(n,e),e};je.CHARSTRING=function(n){return we.CHARSTRING(n).length};we.OBJECT=function(n){const e=we[n.type];return Ve.argument(e!==void 0,"No encoding function for type "+n.type),e(n.value)};je.OBJECT=function(n){const e=je[n.type];return Ve.argument(e!==void 0,"No sizeOf function for type "+n.type),e(n.value)};we.TABLE=function(n){let e=[];const t=(n.fields||[]).length,i=[],r=[];for(let s=0;s<t;s+=1){const a=n.fields[s],o=we[a.type];Ve.argument(o!==void 0,"No encoding function for field type "+a.type+" ("+a.name+")");let l=n[a.name];l===void 0&&(l=a.value);const c=o(l);if(a.type==="TABLE")l.fields!==null&&(r.push(e.length),i.push(c)),e.push(0,0);else for(let u=0;u<c.length;u++)e.push(c[u])}for(let s=0;s<i.length;s+=1){const a=r[s],o=e.length;Ve.argument(o<65536,"Table "+n.tableName+" too big."),e[a]=o>>8,e[a+1]=o&255;for(let l=0;l<i[s].length;l++)e.push(i[s][l])}return e};je.TABLE=function(n){let e=0;const t=(n.fields||[]).length;for(let i=0;i<t;i+=1){const r=n.fields[i],s=je[r.type];Ve.argument(s!==void 0,"No sizeOf function for field type "+r.type+" ("+r.name+")");let a=n[r.name];a===void 0&&(a=r.value),e+=s(a),r.type==="TABLE"&&(e+=2)}return e};we.RECORD=we.TABLE;je.RECORD=je.TABLE;we.LITERAL=function(n){return n};je.LITERAL=function(n){return n.length};function Pt(n,e,t){if(e&&e.length)for(let i=0;i<e.length;i+=1){const r=e[i];this[r.name]=r.value}if(this.tableName=n,this.fields=e,t){const i=Object.keys(t);for(let r=0;r<i.length;r+=1){const s=i[r],a=t[s];this[s]!==void 0&&(this[s]=a)}}}Pt.prototype.encode=function(){return we.TABLE(this)};Pt.prototype.sizeOf=function(){return je.TABLE(this)};function Qi(n,e,t){t===void 0&&(t=e.length);const i=new Array(e.length+1);i[0]={name:n+"Count",type:"USHORT",value:t};for(let r=0;r<e.length;r++)i[r+1]={name:n+r,type:"USHORT",value:e[r]};return i}function Qa(n,e,t){const i=e.length,r=new Array(i+1);r[0]={name:n+"Count",type:"USHORT",value:i};for(let s=0;s<i;s++)r[s+1]={name:n+s,type:"TABLE",value:t(e[s],s)};return r}function er(n,e,t){const i=e.length;let r=[];r[0]={name:n+"Count",type:"USHORT",value:i};for(let s=0;s<i;s++)r=r.concat(t(e[s],s));return r}function Ds(n){n.format===1?Pt.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:1}].concat(Qi("glyph",n.glyphs))):n.format===2?Pt.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:2}].concat(er("rangeRecord",n.ranges,function(e,t){return[{name:"startGlyphID"+t,type:"USHORT",value:e.start},{name:"endGlyphID"+t,type:"USHORT",value:e.end},{name:"startCoverageIndex"+t,type:"USHORT",value:e.index}]}))):Ve.assert(!1,"Coverage format must be 1 or 2.")}Ds.prototype=Object.create(Pt.prototype);Ds.prototype.constructor=Ds;function Is(n){Pt.call(this,"scriptListTable",er("scriptRecord",n,function(e,t){const i=e.script;let r=i.defaultLangSys;return Ve.assert(!!r,"Unable to write GSUB: script "+e.tag+" has no default language system."),[{name:"scriptTag"+t,type:"TAG",value:e.tag},{name:"script"+t,type:"TABLE",value:new Pt("scriptTable",[{name:"defaultLangSys",type:"TABLE",value:new Pt("defaultLangSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:r.reqFeatureIndex}].concat(Qi("featureIndex",r.featureIndexes)))}].concat(er("langSys",i.langSysRecords,function(s,a){const o=s.langSys;return[{name:"langSysTag"+a,type:"TAG",value:s.tag},{name:"langSys"+a,type:"TABLE",value:new Pt("langSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:o.reqFeatureIndex}].concat(Qi("featureIndex",o.featureIndexes)))}]})))}]}))}Is.prototype=Object.create(Pt.prototype);Is.prototype.constructor=Is;function Us(n){Pt.call(this,"featureListTable",er("featureRecord",n,function(e,t){const i=e.feature;return[{name:"featureTag"+t,type:"TAG",value:e.tag},{name:"feature"+t,type:"TABLE",value:new Pt("featureTable",[{name:"featureParams",type:"USHORT",value:i.featureParams}].concat(Qi("lookupListIndex",i.lookupListIndexes)))}]}))}Us.prototype=Object.create(Pt.prototype);Us.prototype.constructor=Us;function Fs(n,e){Pt.call(this,"lookupListTable",Qa("lookup",n,function(t){let i=e[t.lookupType];return Ve.assert(!!i,"Unable to write GSUB lookup type "+t.lookupType+" tables."),new Pt("lookupTable",[{name:"lookupType",type:"USHORT",value:t.lookupType},{name:"lookupFlag",type:"USHORT",value:t.lookupFlag}].concat(Qa("subtable",t.subtables,i)))}))}Fs.prototype=Object.create(Pt.prototype);Fs.prototype.constructor=Fs;function Os(n){n.format===1?Pt.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:1},{name:"startGlyphID",type:"USHORT",value:n.startGlyph}].concat(Qi("glyph",n.classes))):n.format===2?Pt.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:2}].concat(er("rangeRecord",n.ranges,function(e,t){return[{name:"startGlyphID"+t,type:"USHORT",value:e.start},{name:"endGlyphID"+t,type:"USHORT",value:e.end},{name:"class"+t,type:"USHORT",value:e.classId}]}))):Ve.assert(!1,"Class format must be 1 or 2.")}Os.prototype=Object.create(Pt.prototype);Os.prototype.constructor=Os;var ye={Table:Pt,Record:Pt,Coverage:Ds,ClassDef:Os,ScriptList:Is,FeatureList:Us,LookupList:Fs,ushortList:Qi,tableList:Qa,recordList:er};function ec(n,e){return n.getUint8(e)}function Ns(n,e){return n.getUint16(e,!1)}function Nx(n,e){return n.getInt16(e,!1)}function Ru(n,e){return(n.getUint16(e)<<8)+n.getUint8(e+2)}function bo(n,e){return n.getUint32(e,!1)}function kx(n,e){return n.getInt32(e,!1)}function wu(n,e){const t=n.getInt16(e,!1),i=n.getUint16(e+2,!1);return t+i/65535}function Bx(n,e){let t="";for(let i=e;i<e+4;i+=1)t+=String.fromCharCode(n.getInt8(i));return t}function Gx(n,e,t){let i=0;for(let r=0;r<t;r+=1)i<<=8,i+=n.getUint8(e+r);return i}function zx(n,e,t){const i=[];for(let r=e;r<t;r+=1)i.push(n.getUint8(r));return i}function Vx(n){let e="";for(let t=0;t<n.length;t+=1)e+=String.fromCharCode(n[t]);return e}var Hx={byte:1,uShort:2,f2dot14:2,short:2,uInt24:3,uLong:4,fixed:4,longDateTime:8,tag:4},Ht={LONG_WORDS:32768,WORD_DELTA_COUNT_MASK:32767,SHARED_POINT_NUMBERS:32768,COUNT_MASK:4095,EMBEDDED_PEAK_TUPLE:32768,INTERMEDIATE_REGION:16384,PRIVATE_POINT_NUMBERS:8192,TUPLE_INDEX_MASK:4095,POINTS_ARE_WORDS:128,POINT_RUN_COUNT_MASK:127,DELTAS_ARE_ZERO:128,DELTAS_ARE_WORDS:64,DELTA_RUN_COUNT_MASK:63,INNER_INDEX_BIT_COUNT_MASK:15,MAP_ENTRY_SIZE_MASK:48};function $(n,e){this.data=n,this.offset=e,this.relativeOffset=0}$.prototype.parseByte=function(){const n=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,n};$.prototype.parseChar=function(){const n=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,n};$.prototype.parseCard8=$.prototype.parseByte;$.prototype.parseUShort=function(){const n=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,n};$.prototype.parseCard16=$.prototype.parseUShort;$.prototype.parseSID=$.prototype.parseUShort;$.prototype.parseOffset16=$.prototype.parseUShort;$.prototype.parseShort=function(){const n=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,n};$.prototype.parseF2Dot14=function(){const n=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,n};$.prototype.parseUInt24=function(){const n=Ru(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=3,n};$.prototype.parseULong=function(){const n=bo(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};$.prototype.parseLong=function(){const n=kx(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};$.prototype.parseOffset32=$.prototype.parseULong;$.prototype.parseFixed=function(){const n=wu(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};$.prototype.parseString=function(n){const e=this.data,t=this.offset+this.relativeOffset;let i="";this.relativeOffset+=n;for(let r=0;r<n;r++)i+=String.fromCharCode(e.getUint8(t+r));return i};$.prototype.parseTag=function(){return this.parseString(4)};$.prototype.parseLongDateTime=function(){let n=bo(this.data,this.offset+this.relativeOffset+4);return n-=2082844800,this.relativeOffset+=8,n};$.prototype.parseVersion=function(n){const e=Ns(this.data,this.offset+this.relativeOffset),t=Ns(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,n===void 0&&(n=4096),e+t/n/10};$.prototype.skip=function(n,e){e===void 0&&(e=1),this.relativeOffset+=Hx[n]*e};$.prototype.parseULongList=function(n){n===void 0&&(n=this.parseULong());const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint32(i),i+=4;return this.relativeOffset+=n*4,e};$.prototype.parseOffset16List=$.prototype.parseUShortList=function(n){n===void 0&&(n=this.parseUShort());const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint16(i),i+=2;return this.relativeOffset+=n*2,e};$.prototype.parseShortList=function(n){const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getInt16(i),i+=2;return this.relativeOffset+=n*2,e};$.prototype.parseByteList=function(n){const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint8(i++);return this.relativeOffset+=n,e};$.prototype.parseList=function(n,e){e||(e=n,n=this.parseUShort());const t=new Array(n);for(let i=0;i<n;i++)t[i]=e.call(this);return t};$.prototype.parseList32=function(n,e){e||(e=n,n=this.parseULong());const t=new Array(n);for(let i=0;i<n;i++)t[i]=e.call(this);return t};$.prototype.parseRecordList=function(n,e){e||(e=n,n=this.parseUShort());const t=new Array(n),i=Object.keys(e);for(let r=0;r<n;r++){const s={};for(let a=0;a<i.length;a++){const o=i[a],l=e[o];s[o]=l.call(this)}t[r]=s}return t};$.prototype.parseRecordList32=function(n,e){e||(e=n,n=this.parseULong());const t=new Array(n),i=Object.keys(e);for(let r=0;r<n;r++){const s={};for(let a=0;a<i.length;a++){const o=i[a],l=e[o];s[o]=l.call(this)}t[r]=s}return t};$.prototype.parseTupleRecords=function(n,e){let t=[];for(let i=0;i<n;i++){let r=[];for(let s=0;s<e;s++)r.push(this.parseF2Dot14());t.push(r)}return t};$.prototype.parseStruct=function(n){if(typeof n=="function")return n.call(this);{const e=Object.keys(n),t={};for(let i=0;i<e.length;i++){const r=e[i],s=n[r];t[r]=s.call(this)}return t}};$.prototype.parseValueRecord=function(n){if(n===void 0&&(n=this.parseUShort()),n===0)return;const e={};return n&1&&(e.xPlacement=this.parseShort()),n&2&&(e.yPlacement=this.parseShort()),n&4&&(e.xAdvance=this.parseShort()),n&8&&(e.yAdvance=this.parseShort()),n&16&&(e.xPlaDevice=void 0,this.parseShort()),n&32&&(e.yPlaDevice=void 0,this.parseShort()),n&64&&(e.xAdvDevice=void 0,this.parseShort()),n&128&&(e.yAdvDevice=void 0,this.parseShort()),e};$.prototype.parseValueRecordList=function(){const n=this.parseUShort(),e=this.parseUShort(),t=new Array(e);for(let i=0;i<e;i++)t[i]=this.parseValueRecord(n);return t};$.prototype.parsePointer=function(n){const e=this.parseOffset16();if(e>0)return new $(this.data,this.offset+e).parseStruct(n)};$.prototype.parsePointer32=function(n){const e=this.parseOffset32();if(e>0)return new $(this.data,this.offset+e).parseStruct(n)};$.prototype.parseListOfLists=function(n){const e=this.parseOffset16List(),t=e.length,i=this.relativeOffset,r=new Array(t);for(let s=0;s<t;s++){const a=e[s];if(a===0){r[s]=void 0;continue}if(this.relativeOffset=a,n){const o=this.parseOffset16List(),l=new Array(o.length);for(let c=0;c<o.length;c++)this.relativeOffset=a+o[c],l[c]=n.call(this);r[s]=l}else r[s]=this.parseUShortList()}return this.relativeOffset=i,r};$.prototype.parseCoverage=function(){const n=this.offset+this.relativeOffset,e=this.parseUShort(),t=this.parseUShort();if(e===1)return{format:1,glyphs:this.parseUShortList(t)};if(e===2){const i=new Array(t);for(let r=0;r<t;r++)i[r]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:i}}throw new Error("0x"+n.toString(16)+": Coverage format must be 1 or 2.")};$.prototype.parseClassDef=function(){const n=this.offset+this.relativeOffset,e=this.parseUShort();return e===1?{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()}:e===2?{format:2,ranges:this.parseRecordList({start:$.uShort,end:$.uShort,classId:$.uShort})}:(console.warn(`0x${n.toString(16)}: This font file uses an invalid ClassDef format of ${e}. It might be corrupted and should be reacquired if it doesn't display as intended.`),{format:e})};$.list=function(n,e){return function(){return this.parseList(n,e)}};$.list32=function(n,e){return function(){return this.parseList32(n,e)}};$.recordList=function(n,e){return function(){return this.parseRecordList(n,e)}};$.recordList32=function(n,e){return function(){return this.parseRecordList32(n,e)}};$.pointer=function(n){return function(){return this.parsePointer(n)}};$.pointer32=function(n){return function(){return this.parsePointer32(n)}};$.tag=$.prototype.parseTag;$.byte=$.prototype.parseByte;$.uShort=$.offset16=$.prototype.parseUShort;$.uShortList=$.prototype.parseUShortList;$.uInt24=$.prototype.parseUInt24;$.uLong=$.offset32=$.prototype.parseULong;$.uLongList=$.prototype.parseULongList;$.fixed=$.prototype.parseFixed;$.f2Dot14=$.prototype.parseF2Dot14;$.struct=$.prototype.parseStruct;$.coverage=$.prototype.parseCoverage;$.classDef=$.prototype.parseClassDef;var tc={reserved:$.uShort,reqFeatureIndex:$.uShort,featureIndexes:$.uShortList};$.prototype.parseScriptList=function(){return this.parsePointer($.recordList({tag:$.tag,script:$.pointer({defaultLangSys:$.pointer(tc),langSysRecords:$.recordList({tag:$.tag,langSys:$.pointer(tc)})})}))||[]};$.prototype.parseFeatureList=function(){return this.parsePointer($.recordList({tag:$.tag,feature:$.pointer({featureParams:$.offset16,lookupListIndexes:$.uShortList})}))||[]};$.prototype.parseLookupList=function(n){return this.parsePointer($.list($.pointer(function(){const e=this.parseUShort();Ve.argument(1<=e&&e<=9,"GPOS/GSUB lookup type "+e+" unknown.");const t=this.parseUShort(),i=t&16;return{lookupType:e,lookupFlag:t,subtables:this.parseList($.pointer(n[e])),markFilteringSet:i?this.parseUShort():void 0}})))||[]};$.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){const n=this.parseUShort(),e=this.parseUShort();return Ve.argument(n===1&&e<1,"GPOS/GSUB feature variations table unknown."),this.parseRecordList32({conditionSetOffset:$.offset32,featureTableSubstitutionOffset:$.offset32})})||[]};$.prototype.parseVariationStore=function(){const n=this.relativeOffset,e=this.parseUShort(),t={itemVariationStore:this.parseItemVariationStore()};return this.relativeOffset=n+e+2,t};$.prototype.parseItemVariationStore=function(){const n=this.relativeOffset,e={format:this.parseUShort(),variationRegions:[],itemVariationSubtables:[]},t=this.parseOffset32(),i=this.parseUShort(),r=this.parseULongList(i);this.relativeOffset=n+t,e.variationRegions=this.parseVariationRegionList();for(let s=0;s<i;s++){const a=r[s];this.relativeOffset=n+a,e.itemVariationSubtables.push(this.parseItemVariationSubtable())}return e};$.prototype.parseVariationRegionList=function(){const n=this.parseUShort(),e=this.parseUShort();return this.parseRecordList(e,{regionAxes:$.recordList(n,{startCoord:$.f2Dot14,peakCoord:$.f2Dot14,endCoord:$.f2Dot14})})};$.prototype.parseItemVariationSubtable=function(){const n=this.parseUShort(),e=this.parseUShort(),t=this.parseUShortList(),i=t.length;return{regionIndexes:t,deltaSets:n&&i?this.parseDeltaSets(n,e,i):[]}};$.prototype.parseDeltaSetIndexMap=function(){const n=this.parseByte(),e=this.parseByte(),t=[];let i=0;switch(n){case 0:i=this.parseUShort();break;case 1:i=this.parseULong();break;default:console.error(`unsupported DeltaSetIndexMap format ${n}`)}if(!i)return{format:n,entryFormat:e};const r=(e&Ht.INNER_INDEX_BIT_COUNT_MASK)+1,s=((e&Ht.MAP_ENTRY_SIZE_MASK)>>4)+1;for(let a=0;a<i;a++){let o;if(s===1)o=this.parseByte();else if(s===2)o=this.parseUShort();else if(s===3)o=this.parseUInt24();else if(s===4)o=this.parseULong();else throw new Error(`Invalid entry size of ${s}`);const l=o>>r,c=o&(1<<r)-1;t.push({outerIndex:l,innerIndex:c})}return{format:n,entryFormat:e,map:t}};$.prototype.parseDeltaSets=function(n,e,t){const i=Array.from({length:n},()=>[]),r=e&Ht.LONG_WORDS,s=e&Ht.WORD_DELTA_COUNT_MASK;if(s>t)throw Error("wordCount must be less than or equal to regionIndexCount");const a=(r?this.parseLong:this.parseShort).bind(this),o=(r?this.parseShort:this.parseChar).bind(this);for(let l=0;l<n;l++)for(let c=0;c<t;c++)c<s?i[l].push(a()):i[l].push(o());return i};$.prototype.parseTupleVariationStoreList=function(n,e,t){const i=this.parseUShort(),s=this.parseUShort()&1,a=this.parseOffset32(),o=(s?this.parseULong:this.parseUShort).bind(this),l={};let c=o();s||(c*=2);let u;for(let f=0;f<i;f++){u=o(),s||(u*=2);const h=u-c;l[f]=h?this.parseTupleVariationStore(a+c,n,e,t,f):void 0,c=u}return l};$.prototype.parseTupleVariationStore=function(n,e,t,i,r){const s=this.relativeOffset;this.relativeOffset=n,t==="cvar"&&(this.relativeOffset+=4);const a=this.parseUShort(),o=!!(a&Ht.SHARED_POINT_NUMBERS),l=a&Ht.COUNT_MASK;let c=this.parseOffset16();const u=[];let f=[];for(let p=0;p<l;p++){const x=this.parseTupleVariationHeader(e,t);u.push(x)}this.relativeOffset!==n+c&&(console.warn(`Unexpected offset after parsing tuple variation headers! Expected ${n+c}, actually ${this.relativeOffset}`),this.relativeOffset=n+c),o&&(f=this.parsePackedPointNumbers());let h=this.relativeOffset;for(let p=0;p<l;p++){const x=u[p];x.privatePoints=[],this.relativeOffset=h,t==="cvar"&&!x.peakTuple&&console.warn("An embedded peak tuple is required in TupleVariationHeaders for the cvar table."),x.flags.privatePointNumbers&&(x.privatePoints=this.parsePackedPointNumbers()),delete x.flags;const m=this.offset,g=this.relativeOffset,_=v=>{let S,R;const M=()=>{let w=0;if(t==="gvar"){if(w=x.privatePoints.length||f.length,!w){const y=i.get(r);y.path,w=y.points.length,w+=4}}else t==="cvar"&&(w=i.length);this.offset=m,this.relativeOffset=g,S=this.parsePackedDeltas(w),t==="gvar"&&(R=this.parsePackedDeltas(w))};return{configurable:!0,get:function(){return S===void 0&&M(),v==="deltasY"?R:S},set:function(w){S===void 0&&M(),v==="deltasY"?R=w:S=w}}};Object.defineProperty(x,"deltas",_.call(this,"deltas")),t==="gvar"&&Object.defineProperty(x,"deltasY",_.call(this,"deltasY")),h+=x.variationDataSize,delete x.variationDataSize}this.relativeOffset=s;const d={headers:u};return d.sharedPoints=f,d};$.prototype.parseTupleVariationHeader=function(n,e){const t=this.parseUShort(),i=this.parseUShort(),r=!!(i&Ht.EMBEDDED_PEAK_TUPLE),s=!!(i&Ht.INTERMEDIATE_REGION),a=!!(i&Ht.PRIVATE_POINT_NUMBERS),o=r?void 0:i&Ht.TUPLE_INDEX_MASK,l=r?this.parseTupleRecords(1,n)[0]:void 0,c=s?this.parseTupleRecords(1,n)[0]:void 0,u=s?this.parseTupleRecords(1,n)[0]:void 0,f={variationDataSize:t,peakTuple:l,intermediateStartTuple:c,intermediateEndTuple:u,flags:{embeddedPeakTuple:r,intermediateRegion:s,privatePointNumbers:a}};return e==="gvar"&&(f.sharedTupleRecordsIndex=o),f};$.prototype.parsePackedPointNumbers=function(){const n=this.parseByte(),e=[];let t=n;if(n>=128){const r=this.parseByte();t=(n&Ht.POINT_RUN_COUNT_MASK)<<8|r}let i=0;for(;e.length<t;){const r=this.parseByte(),s=!!(r&Ht.POINTS_ARE_WORDS);let a=(r&Ht.POINT_RUN_COUNT_MASK)+1;for(let o=0;o<a&&e.length<t;o++){let l;s?l=this.parseUShort():l=this.parseByte(),i=i+l,e.push(i)}}return e};$.prototype.parsePackedDeltas=function(n){const e=[];for(;e.length<n;){const t=this.parseByte(),i=!!(t&Ht.DELTAS_ARE_ZERO),r=!!(t&Ht.DELTAS_ARE_WORDS),s=(t&Ht.DELTA_RUN_COUNT_MASK)+1;for(let a=0;a<s&&e.length<n;a++)i?e.push(0):r?e.push(this.parseShort()):e.push(this.parseChar())}return e};var Le={getByte:ec,getCard8:ec,getUShort:Ns,getCard16:Ns,getShort:Nx,getUInt24:Ru,getULong:bo,getFixed:wu,getTag:Bx,getOffset:Gx,getBytes:zx,bytesToString:Vx,Parser:$},ks=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","license","licenseURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],Pu={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},Wx={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},Lu={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"};function Xx(n,e,t){switch(n){case 0:if(e===65535)return"und";if(t)return t[e];break;case 1:return Pu[e];case 3:return Lu[e]}}var eo="utf-16",qx={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},Yx={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};function To(n,e,t){switch(n){case 0:return eo;case 1:return Yx[t]||qx[e];case 3:if(e===1||e===10)return eo;break}}var Du={0:"unicode",1:"macintosh",2:"reserved",3:"windows"};function jx(n){return Du[n]}function $x(n,e,t){const i={},r=new Le.Parser(n,e),s=r.parseUShort(),a=r.parseUShort(),o=r.offset+r.parseUShort();for(let l=0;l<a;l++){const c=r.parseUShort(),u=r.parseUShort(),f=r.parseUShort(),h=r.parseUShort(),d=ks[h]||h,p=r.parseUShort(),x=r.parseUShort(),m=Xx(c,f,t),g=To(c,u,f),_=jx(c);if(g!==void 0&&m!==void 0&&_!==void 0){let v;if(g===eo?v=Ji.UTF16(n,o+x,p):v=Ji.MACSTRING(n,o+x,p,g),v){let S=i[_];S===void 0&&(S=i[_]={});let R=S[d];R===void 0&&(R=S[d]={}),R[m]=v}}}return s===1&&r.parseUShort(),i}function Ss(n){const e={};for(let t in n)e[n[t]]=parseInt(t);return e}function nc(n,e,t,i,r,s){return new ye.Record("NameRecord",[{name:"platformID",type:"USHORT",value:n},{name:"encodingID",type:"USHORT",value:e},{name:"languageID",type:"USHORT",value:t},{name:"nameID",type:"USHORT",value:i},{name:"length",type:"USHORT",value:r},{name:"offset",type:"USHORT",value:s}])}function Zx(n,e){const t=n.length,i=e.length-t+1;e:for(let r=0;r<i;r++)for(;r<i;r++){for(let s=0;s<t;s++)if(e[r+s]!==n[s])continue e;return r}return-1}function ic(n,e){let t=Zx(n,e);if(t<0){t=e.length;let i=0;const r=n.length;for(;i<r;++i)e.push(n[i])}return t}function Kx(n,e){const t=Ss(Du),i=Ss(Pu),r=Ss(Lu),s=[],a=[];for(let l in n){let c;const u=[],f={},h=Ss(ks),d=t[l];for(let p in n[l]){let x=h[p];if(x===void 0&&(x=p),c=parseInt(x),isNaN(c))throw new Error('Name table entry "'+p+'" does not exist, see nameTableNames for complete list.');f[c]=n[l][p],u.push(c)}for(let p=0;p<u.length;p++){c=u[p];const x=f[c];for(let m in x){const g=x[m];if(d===1||d===0){let _=i[m],v=Wx[_];const S=To(d,v,_);let R=we.MACSTRING(g,S);if(d===0&&(_=e.indexOf(m),_<0&&(_=e.length,e.push(m)),v=4,R=we.UTF16(g)),R!==void 0){const M=ic(R,a);s.push(nc(d,v,_,c,R.length,M))}}if(d===3){const _=r[m];if(_!==void 0){const v=we.UTF16(g),S=ic(v,a);s.push(nc(3,1,_,c,v.length,S))}}}}}s.sort(function(l,c){return l.platformID-c.platformID||l.encodingID-c.encodingID||l.languageID-c.languageID||l.nameID-c.nameID});const o=new ye.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:s.length},{name:"stringOffset",type:"USHORT",value:6+s.length*12}]);for(let l=0;l<s.length;l++)o.fields.push({name:"record_"+l,type:"RECORD",value:s[l]});return o.fields.push({name:"strings",type:"LITERAL",value:a}),o}function Bs(n,e,t=[]){if(e<256&&e in ks){if(t.length&&!t.includes(parseInt(e)))return;e=ks[e]}for(let i in n)for(let r in n[i])if(r===e||parseInt(r)===e)return n[i][r]}var Iu={parse:$x,make:Kx,getNameByID:Bs};function Jx(n,e,t,i){n.length=e.parseUShort(),n.language=e.parseUShort()-1;const r=e.parseByteList(n.length),s=Object.assign({},r),a=To(t,i,n.language),o=Ls[a];for(let l=0;l<o.length;l++)s[o.charCodeAt(l)]=r[128+l];n.glyphIndexMap=s}function Qx(n,e,t){e.parseUShort(),n.length=e.parseULong(),n.language=e.parseULong();let i;n.groupCount=i=e.parseULong(),n.glyphIndexMap={};for(let r=0;r<i;r+=1){const s=e.parseULong(),a=e.parseULong();let o=e.parseULong();for(let l=s;l<=a;l+=1)n.glyphIndexMap[l]=o,t===12&&o++}}function ev(n,e,t,i,r){n.length=e.parseUShort(),n.language=e.parseUShort();let s;n.segCount=s=e.parseUShort()>>1,e.skip("uShort",3),n.glyphIndexMap={};const a=new Le.Parser(t,i+r+14),o=new Le.Parser(t,i+r+16+s*2),l=new Le.Parser(t,i+r+16+s*4),c=new Le.Parser(t,i+r+16+s*6);let u=i+r+16+s*8;for(let f=0;f<s-1;f+=1){let h;const d=a.parseUShort(),p=o.parseUShort(),x=l.parseShort(),m=c.parseUShort();for(let g=p;g<=d;g+=1)m!==0?(u=c.offset+c.relativeOffset-2,u+=m,u+=(g-p)*2,h=Le.getUShort(t,u),h!==0&&(h=h+x&65535)):h=g+x&65535,n.glyphIndexMap[g]=h}}function tv(n,e){const t={};e.skip("uLong");const i=e.parseULong();for(let r=0;r<i;r+=1){const s=e.parseUInt24(),a={varSelector:s},o=e.parseOffset32(),l=e.parseOffset32(),c=e.relativeOffset;o&&(e.relativeOffset=o,a.defaultUVS=e.parseStruct({ranges:function(){return e.parseRecordList32({startUnicodeValue:e.parseUInt24,additionalCount:e.parseByte})}})),l&&(e.relativeOffset=l,a.nonDefaultUVS=e.parseStruct({uvsMappings:function(){const u={},f=e.parseRecordList32({unicodeValue:e.parseUInt24,glyphID:e.parseUShort});for(let h=0;h<f.length;h+=1)u[f[h].unicodeValue]=f[h];return u}})),t[s]=a,e.relativeOffset=c}n.varSelectorList=t}function nv(n,e){const t={};t.version=Le.getUShort(n,e),Ve.argument(t.version===0,"cmap table version should be 0."),t.numTables=Le.getUShort(n,e+2);let i=null,r=-1,s=-1,a=null,o=null;const l=[0,1,2,3,4,6],c=[0,1,10];for(let f=t.numTables-1;f>=0;f-=1)if(a=Le.getUShort(n,e+4+f*8),o=Le.getUShort(n,e+4+f*8+2),a===3&&c.includes(o)||a===0&&l.includes(o)||a===1&&o===0){if(s>0)continue;if(s=Le.getULong(n,e+4+f*8+4),i)break}else if(a===0&&o===5){if(r=Le.getULong(n,e+4+f*8+4),i=new Le.Parser(n,e+r),i.parseUShort()!==14)r=-1,i=null;else if(s>0)break}if(s===-1)throw new Error("No valid cmap sub-tables found.");const u=new Le.Parser(n,e+s);if(t.format=u.parseUShort(),t.format===0)Jx(t,u,a,o);else if(t.format===12||t.format===13)Qx(t,u,t.format);else if(t.format===4)ev(t,u,n,e,s);else throw new Error("Only format 0 (platformId 1, encodingId 0), 4, 12 and 14 cmap tables are supported (found format "+t.format+", platformId "+a+", encodingId "+o+").");return i&&tv(t,i),t}function iv(n,e,t){n.segments.push({end:e,start:e,delta:-(e-t),offset:0,glyphIndex:t})}function rv(n){n.segments.push({end:65535,start:65535,delta:1,offset:0})}function sv(n){if(n.length===0)return n;const e=[n[0]];for(let t=1;t<n.length;t++){const i=e[e.length-1],r=n[t];i.end+1===r.start&&i.delta===r.delta&&r.end!==65535?i.end=r.end:e.push(r)}return e}function av(n){let e=!0,t;for(t=n.length-1;t>0;t-=1)if(n.get(t).unicode>65535){e=!1;break}let i=[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:e?1:2},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:e?12:20}];e||i.push({name:"cmap12PlatformID",type:"USHORT",value:3},{name:"cmap12EncodingID",type:"USHORT",value:10},{name:"cmap12Offset",type:"ULONG",value:0}),i.push({name:"format",type:"USHORT",value:4},{name:"cmap4Length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0});const r=new ye.Table("cmap",i);for(r.segments=[],t=0;t<n.length;t+=1){const d=n.get(t);for(let p=0;p<d.unicodes.length;p+=1)iv(r,d.unicodes[p],t)}r.segments.sort(function(d,p){return d.start-p.start}),r.segments=sv(r.segments),rv(r);const s=r.segments.length;let a=0,o=[],l=[],c=[],u=[],f=[],h=[];for(t=0;t<s;t+=1){const d=r.segments[t];d.end<=65535&&d.start<=65535?(o.push({name:"end_"+t,type:"USHORT",value:d.end}),l.push({name:"start_"+t,type:"USHORT",value:d.start}),c.push({name:"idDelta_"+t,type:"SHORT",value:d.delta}),u.push({name:"idRangeOffset_"+t,type:"USHORT",value:d.offset}),d.glyphId!==void 0&&f.push({name:"glyph_"+t,type:"USHORT",value:d.glyphId})):a+=1,!e&&d.glyphIndex!==void 0&&(h.push({name:"cmap12Start_"+t,type:"ULONG",value:d.start}),h.push({name:"cmap12End_"+t,type:"ULONG",value:d.end}),h.push({name:"cmap12Glyph_"+t,type:"ULONG",value:d.glyphIndex}))}r.segCountX2=(s-a)*2,r.searchRange=Math.pow(2,Math.floor(Math.log(s-a)/Math.log(2)))*2,r.entrySelector=Math.log(r.searchRange/2)/Math.log(2),r.rangeShift=r.segCountX2-r.searchRange;for(let d=0;d<o.length;d++)r.fields.push(o[d]);r.fields.push({name:"reservedPad",type:"USHORT",value:0});for(let d=0;d<l.length;d++)r.fields.push(l[d]);for(let d=0;d<c.length;d++)r.fields.push(c[d]);for(let d=0;d<u.length;d++)r.fields.push(u[d]);for(let d=0;d<f.length;d++)r.fields.push(f[d]);if(r.cmap4Length=14+o.length*2+2+l.length*2+c.length*2+u.length*2+f.length*2,!e){const d=16+h.length*4;r.cmap12Offset=20+r.cmap4Length,r.fields.push({name:"cmap12Format",type:"USHORT",value:12},{name:"cmap12Reserved",type:"USHORT",value:0},{name:"cmap12Length",type:"ULONG",value:d},{name:"cmap12Language",type:"ULONG",value:0},{name:"cmap12nGroups",type:"ULONG",value:h.length/3});for(let p=0;p<h.length;p++)r.fields.push(h[p])}return r}var Uu={parse:nv,make:av},Es=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],ov=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],lv=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],cv=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"],to=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],uv=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],pi=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function Fu(n){this.font=n}Fu.prototype.charToGlyphIndex=function(n){const e=n.codePointAt(0),t=this.font.glyphs;if(t)for(let i=0;i<t.length;i+=1){const r=t.get(i);for(let s=0;s<r.unicodes.length;s+=1)if(r.unicodes[s]===e)return i}return null};function Ou(n){this.cmap=n}Ou.prototype.charToGlyphIndex=function(n){return this.cmap.glyphIndexMap[n.codePointAt(0)]||0};function Nu(n,e){this.encoding=n,this.charset=e}Nu.prototype.charToGlyphIndex=function(n){const e=n.codePointAt(0),t=this.encoding[e];return this.charset.indexOf(t)};function Mo(n){switch(n.version){case 1:this.names=pi.slice();break;case 2:this.names=new Array(n.numberOfGlyphs);for(let e=0;e<n.numberOfGlyphs;e++)n.glyphNameIndex[e]<pi.length?this.names[e]=pi[n.glyphNameIndex[e]]:this.names[e]=n.names[n.glyphNameIndex[e]-pi.length];break;case 2.5:this.names=new Array(n.numberOfGlyphs);for(let e=0;e<n.numberOfGlyphs;e++)this.names[e]=pi[e+n.glyphNameIndex[e]];break;case 3:this.names=[];break;default:this.names=[];break}}Mo.prototype.nameToGlyphIndex=function(n){return this.names.indexOf(n)};Mo.prototype.glyphIndexToName=function(n){return this.names[n]};function hv(n){let e;const t=n.tables.cmap.glyphIndexMap,i=Object.keys(t);for(let r=0;r<i.length;r+=1){const s=i[r],a=t[s];e=n.glyphs.get(a),e.addUnicode(parseInt(s))}for(let r=0;r<n.glyphs.length;r+=1)e=n.glyphs.get(r),n.cffEncoding?e.name=n.cffEncoding.charset[r]:n.glyphNames.names&&(e.name=n.glyphNames.glyphIndexToName(r))}function fv(n){n._IndexToUnicodeMap={};const e=n.tables.cmap.glyphIndexMap,t=Object.keys(e);for(let i=0;i<t.length;i+=1){const r=t[i];let s=e[r];n._IndexToUnicodeMap[s]===void 0?n._IndexToUnicodeMap[s]={unicodes:[parseInt(r)]}:n._IndexToUnicodeMap[s].unicodes.push(parseInt(r))}}function dv(n,e){e.lowMemory?fv(n):hv(n)}function pv(n,e,t,i,r){n.beginPath(),n.moveTo(e,t),n.lineTo(i,r),n.stroke()}var hi={line:pv};function mv(n,e){const t=new $(n,e),i=t.parseShort();i!==0&&console.warn("Only CPALv0 is currently fully supported.");const r=t.parseShort(),s=t.parseShort(),a=t.parseShort(),o=t.parseOffset32(),l=t.parseUShortList(s);t.relativeOffset=o;const c=t.parseULongList(a);return t.relativeOffset=o,{version:i,numPaletteEntries:r,colorRecords:c,colorRecordIndices:l}}function gv({version:n=0,numPaletteEntries:e=0,colorRecords:t=[],colorRecordIndices:i=[0]}){return Ve.argument(n===0,"Only CPALv0 are supported."),Ve.argument(t.length,"No colorRecords given."),Ve.argument(i.length,"No colorRecordIndices given."),i.length>1&&Ve.argument(e,"Can't infer numPaletteEntries on multiple colorRecordIndices"),new ye.Table("CPAL",[{name:"version",type:"USHORT",value:n},{name:"numPaletteEntries",type:"USHORT",value:e||t.length},{name:"numPalettes",type:"USHORT",value:i.length},{name:"numColorRecords",type:"USHORT",value:t.length},{name:"colorRecordsArrayOffset",type:"ULONG",value:12+2*i.length},...i.map((r,s)=>({name:"colorRecordIndices_"+s,type:"USHORT",value:r})),...t.map((r,s)=>({name:"colorRecords_"+s,type:"ULONG",value:r}))])}function ku(n){var e=(n&4278190080)>>24,t=(n&16711680)>>16,i=(n&65280)>>8,r=n&255;return e=e+256&255,t=t+256&255,i=i+256&255,r=(r+256&255)/255,{b:e,g:t,r:i,a:r}}function Eo(n,e,t=0,i="hexa"){if(e==65535)return"currentColor";const r=n&&n.tables&&n.tables.cpal;if(!r)return"currentColor";if(t>r.colorRecordIndices.length-1)throw new Error(`Palette index out of range (colorRecordIndices.length: ${r.colorRecordIndices.length}, index: ${e})`);if(e>r.numPaletteEntries)throw new Error(`Color index out of range (numPaletteEntries: ${r.numPaletteEntries}, index: ${e})`);const s=r.colorRecordIndices[t]+e;if(s>r.colorRecords)throw new Error(`Color index out of range (colorRecords.length: ${r.colorRecords.length}, lookupIndex: ${s})`);const a=ku(r.colorRecords[s]);return i==="bgra"?a:tr(a,i)}function hn(n){return("0"+parseInt(n).toString(16)).slice(-2)}function xv(n){const e=n.r/255,t=n.g/255,i=n.b/255,r=Math.max(e,t,i),s=Math.min(e,t,i);let a,o,l=(r+s)/2;if(r===s)a=o=0;else{const c=r-s;switch(o=l>.5?c/(2-r-s):c/(r+s),r){case e:a=(t-i)/c+(t<i?6:0);break;case t:a=(i-e)/c+2;break;case i:a=(e-t)/c+4;break}a/=6}return{h:a*360,s:o*100,l:l*100}}function vv(n){let{h:e,s:t,l:i,a:r}=n;e=e%360,t/=100,i/=100;const s=(1-Math.abs(2*i-1))*t,a=s*(1-Math.abs(e/60%2-1)),o=i-s/2;let l=0,c=0,u=0;return 0<=e&&e<60?(l=s,c=a,u=0):60<=e&&e<120?(l=a,c=s,u=0):120<=e&&e<180?(l=0,c=s,u=a):180<=e&&e<240?(l=0,c=a,u=s):240<=e&&e<300?(l=a,c=0,u=s):300<=e&&e<=360&&(l=s,c=0,u=a),{r:Math.round((l+o)*255),g:Math.round((c+o)*255),b:Math.round((u+o)*255),a:r}}function Bu(n){return parseInt(`0x${hn(n.b)}${hn(n.g)}${hn(n.r)}${hn(n.a*255)}`,16)}function Gs(n,e="hexa"){const t=e=="raw"||e=="cpal",i=Number.isInteger(n);let r=!0;if(i&&t||n==="currentColor")return n;if(typeof n=="object"){if(e=="bgra")return n;if(t)return Bu(n)}else if(!i&&/^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(n.trim())){switch(n=n.trim().substring(1),n.length){case 3:n={r:parseInt(n[0].repeat(2),16),g:parseInt(n[1].repeat(2),16),b:parseInt(n[2].repeat(2),16),a:1};break;case 4:n={r:parseInt(n[0].repeat(2),16),g:parseInt(n[1].repeat(2),16),b:parseInt(n[2].repeat(2),16),a:parseInt(n[3].repeat(2),16)/255};break;case 6:n={r:parseInt(n[0]+n[1],16),g:parseInt(n[2]+n[3],16),b:parseInt(n[4]+n[5],16),a:1};break;case 8:n={r:parseInt(n[0]+n[1],16),g:parseInt(n[2]+n[3],16),b:parseInt(n[4]+n[5],16),a:parseInt(n[6]+n[7],16)/255};break}if(e=="bgra")return n}else if(typeof document<"u"&&/^[a-z]+$/i.test(n)){const s=document.createElement("canvas").getContext("2d");s.fillStyle=n;const a=tr(s.fillStyle,"hexa");a==="#000000ff"&&n.toLowerCase()!=="black"?r=!1:n=a}else{n=n.trim();const s=/rgba?\(\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(s.test(n)){const a=n.match(s).filter(o=>typeof o<"u");n={r:Math.round(parseFloat(a[1])/(a[2]?100/255:1)),g:Math.round(parseFloat(a[3])/(a[4]?100/255:1)),b:Math.round(parseFloat(a[5])/(a[6]?100/255:1)),a:a[7]?parseFloat(a[7])/(a[8]?100:1):1}}else{const a=/hsla?\(\s*(?:(\d*\.\d+|\d+)(deg|turn|))\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(a.test(n)){const o=n.match(a).filter(l=>typeof l<"u");n=vv({h:parseFloat(o[1])*(o[2]==="turn"?360:1),s:parseFloat(o[3]),l:parseFloat(o[4]),a:o[5]?parseFloat(o[5])/(o[6]?100:1):1})}else r=!1}}if(!r)throw new Error(`Invalid color format: ${n}`);return tr(n,e)}function tr(n,e="hexa"){if(n==="currentColor")return n;if(Number.isInteger(n)){if(e=="raw"||e=="cpal")return n;n=ku(n)}else typeof n!="object"&&(n=Gs(n,"bgra"));let t=["hsl","hsla"].includes(e)?xv(n):null;switch(e){case"rgba":return`rgba(${n.r}, ${n.g}, ${n.b}, ${parseFloat(n.a.toFixed(3))})`;case"rgb":return`rgb(${n.r}, ${n.g}, ${n.b})`;case"hex":case"hex6":case"hex-6":return`#${hn(n.r)}${hn(n.g)}${hn(n.b)}`;case"hexa":case"hex8":case"hex-8":return`#${hn(n.r)}${hn(n.g)}${hn(n.b)}${hn(n.a*255)}`;case"hsl":return`hsl(${t.h.toFixed(2)}, ${t.s.toFixed(2)}%, ${t.l.toFixed(2)}%)`;case"hsla":return`hsla(${t.h.toFixed(2)}, ${t.s.toFixed(2)}%, ${t.l.toFixed(2)}%, ${parseFloat(n.a.toFixed(3))})`;case"bgra":return n;case"raw":case"cpal":return Bu(n);default:throw new Error("Unknown color format: "+e)}}var Gu={parse:mv,make:gv,getPaletteColor:Eo,parseColor:Gs,formatColor:tr};function _v(n,e){let t=e||new Ki;return{configurable:!0,get:function(){return typeof t=="function"&&(t=t()),t},set:function(i){t=i}}}function qt(n){this.bindConstructorValues(n)}qt.prototype.bindConstructorValues=function(n){if(this.index=n.index||0,n.name===".notdef"?n.unicode=void 0:n.name===".null"&&(n.unicode=0),n.unicode===0&&n.name!==".null")throw new Error('The unicode value "0" is reserved for the glyph name ".null" and cannot be used by any other glyph.');this.name=n.name||null,this.unicode=n.unicode,this.unicodes=n.unicodes||(n.unicode!==void 0?[n.unicode]:[]),"xMin"in n&&(this.xMin=n.xMin),"yMin"in n&&(this.yMin=n.yMin),"xMax"in n&&(this.xMax=n.xMax),"yMax"in n&&(this.yMax=n.yMax),"advanceWidth"in n&&(this.advanceWidth=n.advanceWidth),"leftSideBearing"in n&&(this.leftSideBearing=n.leftSideBearing),"points"in n&&(this.points=n.points),Object.defineProperty(this,"path",_v(this,n.path))};qt.prototype.addUnicode=function(n){this.unicodes.length===0&&(this.unicode=n),this.unicodes.push(n)};qt.prototype.getBoundingBox=function(){return this.path.getBoundingBox()};qt.prototype.getPath=function(n,e,t,i,r){n=n!==void 0?n:0,e=e!==void 0?e:0,t=t!==void 0?t:72,i=Object.assign({},r&&r.defaultRenderOptions,i);let s,a,o=i.xScale,l=i.yScale;const c=1/(this.path.unitsPerEm||1e3)*t;let u=this;r&&r.variation&&(u=r.variation.getTransform(this,i.variation),s=u.path.commands),i.hinting&&r&&r.hinting&&(a=u.path&&r.hinting.exec(u,t,i)),a?(s=r.hinting.getCommands(a),n=Math.round(n),e=Math.round(e),o=l=1):(s=u.path.commands,o===void 0&&(o=c),l===void 0&&(l=c));const f=new Ki;if(i.drawSVG){const h=this.getSvgImage(r);if(h){const d=new Ki;return d._image={image:h.image,x:n+h.leftSideBearing*c,y:e-h.baseline*c,width:h.image.width*c,height:h.image.height*c},f._layers=[d],f}}if(i.drawLayers){const h=this.getLayers(r);if(h&&h.length){f._layers=[];for(let d=0;d<h.length;d+=1){const p=h[d];let x=Eo(r,p.paletteIndex,i.usePalette);x==="currentColor"?x=i.fill||"black":x=tr(x,i.colorFormat||"rgba"),i=Object.assign({},i,{fill:x}),f._layers.push(this.getPath.call(p.glyph,n,e,t,i,r))}return f}}f.fill=i.fill||this.path.fill,f.stroke=this.path.stroke,f.strokeWidth=this.path.strokeWidth*c;for(let h=0;h<s.length;h+=1){const d=s[h];d.type==="M"?f.moveTo(n+d.x*o,e+-d.y*l):d.type==="L"?f.lineTo(n+d.x*o,e+-d.y*l):d.type==="Q"?f.quadraticCurveTo(n+d.x1*o,e+-d.y1*l,n+d.x*o,e+-d.y*l):d.type==="C"?f.curveTo(n+d.x1*o,e+-d.y1*l,n+d.x2*o,e+-d.y2*l,n+d.x*o,e+-d.y*l):d.type==="Z"&&f.stroke&&f.strokeWidth&&f.closePath()}return f};qt.prototype.getLayers=function(n){if(!n)throw new Error("The font object is required to read the colr/cpal tables in order to get the layers.");return n.layers.get(this.index)};qt.prototype.getSvgImage=function(n){if(!n)throw new Error("The font object is required to read the svg table in order to get the image.");return n.svgImages.get(this.index)};qt.prototype.getContours=function(n=null){if(this.points===void 0&&!n)return[];const e=[];let t=[],i=n||this.points;for(let r=0;r<i.length;r+=1){const s=i[r];t.push(s),s.lastPointOfContour&&(e.push(t),t=[])}return Ve.argument(t.length===0,"There are still points left in the current contour."),e};qt.prototype.getMetrics=function(){const n=this.path.commands,e=[],t=[];for(let r=0;r<n.length;r+=1){const s=n[r];s.type!=="Z"&&(e.push(s.x),t.push(s.y)),(s.type==="Q"||s.type==="C")&&(e.push(s.x1),t.push(s.y1)),s.type==="C"&&(e.push(s.x2),t.push(s.y2))}const i={xMin:Math.min.apply(null,e),yMin:Math.min.apply(null,t),xMax:Math.max.apply(null,e),yMax:Math.max.apply(null,t),leftSideBearing:this.leftSideBearing};return isFinite(i.xMin)||(i.xMin=0),isFinite(i.xMax)||(i.xMax=this.advanceWidth),isFinite(i.yMin)||(i.yMin=0),isFinite(i.yMax)||(i.yMax=0),i.rightSideBearing=this.advanceWidth-i.leftSideBearing-(i.xMax-i.xMin),i};qt.prototype.draw=function(n,e,t,i,r,s){r=Object.assign({},s&&s.defaultRenderOptions,r),this.getPath(e,t,i,r,s).draw(n)};qt.prototype.drawPoints=function(n,e,t,i,r,s){if(r=Object.assign({},s&&s.defaultRenderOptions,r),r.drawLayers){const h=this.getLayers(s);if(h&&h.length){for(let d=0;d<h.length;d+=1)h[d].glyph.index!==this.index&&this.drawPoints.call(h[d].glyph,n,e,t,i);return}}function a(h,d,p,x){n.beginPath();for(let m=0;m<h.length;m+=1)n.moveTo(d+h[m].x*x,p+h[m].y*x),n.arc(d+h[m].x*x,p+h[m].y*x,2,0,Math.PI*2,!1);n.fill()}e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:24;const o=1/this.path.unitsPerEm*i,l=[],c=[];let f=this.path.commands;s&&s.variation&&(f=s.variation.getTransform(this,r.variation).path.commands);for(let h=0;h<f.length;h+=1){const d=f[h];d.x!==void 0&&l.push({x:d.x,y:-d.y}),d.x1!==void 0&&c.push({x:d.x1,y:-d.y1}),d.x2!==void 0&&c.push({x:d.x2,y:-d.y2})}n.fillStyle="blue",a(l,e,t,o),n.fillStyle="red",a(c,e,t,o)};qt.prototype.drawMetrics=function(n,e,t,i){let r;e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:24,r=1/this.path.unitsPerEm*i,n.lineWidth=1,n.strokeStyle="black",hi.line(n,e,-1e4,e,1e4),hi.line(n,-1e4,t,1e4,t);const s=this.xMin||0;let a=this.yMin||0;const o=this.xMax||0;let l=this.yMax||0;const c=this.advanceWidth||0;n.strokeStyle="blue",hi.line(n,e+s*r,-1e4,e+s*r,1e4),hi.line(n,e+o*r,-1e4,e+o*r,1e4),hi.line(n,-1e4,t+-a*r,1e4,t+-a*r),hi.line(n,-1e4,t+-l*r,1e4,t+-l*r),n.strokeStyle="green",hi.line(n,e+c*r,-1e4,e+c*r,1e4)};qt.prototype.toPathData=function(n,e){n=Object.assign({},{variation:e&&e.defaultRenderOptions.variation},n);let t=this;e&&e.variation&&(t=e.variation.getTransform(this,n.variation));let i=t.points&&n.pointsTransform?n.pointsTransform(t.points):t.path;return n.pathTransform&&(i=n.pathTransform(i)),i.toPathData(n)};qt.prototype.fromSVG=function(n,e={}){return this.path.fromSVG(n,e)};qt.prototype.toSVG=function(n,e){const t=this.toPathData.apply(this,[n,e]);return this.path.toSVG(n,t)};qt.prototype.toDOMElement=function(n,e){n=Object.assign({},{variation:e&&e.defaultRenderOptions.variation},n);let t=this.path;return e&&e.variation&&(t=e.variation.getTransform(this,n.variation).path),t.toDOMElement(n)};var Ir=qt;function zi(n,e,t){Object.defineProperty(n,e,{get:function(){return typeof n[t]>"u"&&n.path,n[t]},set:function(i){n[t]=i},enumerable:!0,configurable:!0})}function $s(n,e){if(this.font=n,this.glyphs={},Array.isArray(e))for(let t=0;t<e.length;t++){const i=e[t];i.path.unitsPerEm=n.unitsPerEm,this.glyphs[t]=i}this.length=e&&e.length||0}typeof Symbol<"u"&&Symbol.iterator&&($s.prototype[Symbol.iterator]=function(){let n=-1;return{next:function(){n++;const e=n>=this.length-1;return{value:this.get(n),done:e}}.bind(this)}});$s.prototype.get=function(n){if(this.font._push&&this.glyphs[n]===void 0){this.font._push(n),typeof this.glyphs[n]=="function"&&(this.glyphs[n]=this.glyphs[n]());let e=this.glyphs[n],t=this.font._IndexToUnicodeMap[n];if(t)for(let i=0;i<t.unicodes.length;i++)e.addUnicode(t.unicodes[i]);this.font.cffEncoding?e.name=this.font.cffEncoding.charset[n]:this.font.glyphNames.names&&(e.name=this.font.glyphNames.glyphIndexToName(n)),this.glyphs[n].advanceWidth=this.font._hmtxTableData[n].advanceWidth,this.glyphs[n].leftSideBearing=this.font._hmtxTableData[n].leftSideBearing}else typeof this.glyphs[n]=="function"&&(this.glyphs[n]=this.glyphs[n]());return this.glyphs[n]};$s.prototype.push=function(n,e){this.glyphs[n]=e,this.length++};function yv(n,e){return new Ir({index:e,font:n})}function Sv(n,e,t,i,r,s){return function(){const a=new Ir({index:e,font:n});return a.path=function(){t(a,i,r);const o=s(n.glyphs,a);return o.unitsPerEm=n.unitsPerEm,o},zi(a,"numberOfContours","_numberOfContours"),zi(a,"xMin","_xMin"),zi(a,"xMax","_xMax"),zi(a,"yMin","_yMin"),zi(a,"yMax","_yMax"),zi(a,"points","_points"),a}}function bv(n,e,t,i,r){return function(){const s=new Ir({index:e,font:n});return s.path=function(){const a=t(n,s,i,r);return a.unitsPerEm=n.unitsPerEm,a},s}}var Cn={GlyphSet:$s,glyphLoader:yv,ttfGlyphLoader:Sv,cffGlyphLoader:bv};function zu(n,e){if(n===e)return!0;if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;for(let t=0;t<n.length;t+=1)if(!zu(n[t],e[t]))return!1;return!0}else return!1}var rc=10;function zs(n){let e;return n.length<1240?e=107:n.length<33900?e=1131:e=32768,e}function Tn(n,e,t,i){const r=[],s=[],a=i>1?Le.getULong(n,e):Le.getCard16(n,e),o=i>1?4:2;let l,c;if(a!==0){const u=Le.getByte(n,e+o);l=e+(a+1)*u+o;let f=e+o+1;for(let h=0;h<a+1;h+=1)r.push(Le.getOffset(n,f,u)),f+=u;c=l+r[a]}else c=e+o;for(let u=0;u<r.length-1;u+=1){let f=Le.getBytes(n,l+r[u],l+r[u+1]);t&&(f=t(f,n,e,i)),s.push(f)}return{objects:s,startOffset:e,endOffset:c}}function Tv(n,e,t){const i=[],r=t>1?Le.getULong(n,e):Le.getCard16(n,e),s=t>1?4:2;let a,o;if(r!==0){const l=Le.getByte(n,e+s);a=e+(r+1)*l+s;let c=e+s+1;for(let u=0;u<r+1;u+=1)i.push(Le.getOffset(n,c,l)),c+=l;o=a+i[r]}else o=e+s;return{offsets:i,startOffset:e,endOffset:o}}function Mv(n,e,t,i,r,s){const a=s>1?Le.getULong(t,i):Le.getCard16(t,i),o=s>1?4:2;let l=0;if(a!==0){const u=Le.getByte(t,i+o);l=i+(a+1)*u+o}return Le.getBytes(t,l+e[n],l+e[n+1])}function Ev(n){let e="";const i=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];for(;;){const r=n.parseByte(),s=r>>4,a=r&15;if(s===15||(e+=i[s],a===15))break;e+=i[a]}return parseFloat(e)}function Av(n,e){let t,i,r,s;if(e===28)return t=n.parseByte(),i=n.parseByte(),t<<8|i;if(e===29)return t=n.parseByte(),i=n.parseByte(),r=n.parseByte(),s=n.parseByte(),t<<24|i<<16|r<<8|s;if(e===30)return Ev(n);if(e>=32&&e<=246)return e-139;if(e>=247&&e<=250)return t=n.parseByte(),(e-247)*256+t+108;if(e>=251&&e<=254)return t=n.parseByte(),-(e-251)*256-t-108;throw new Error("Invalid b0 "+e)}function Cv(n){const e={};for(let t=0;t<n.length;t+=1){const i=n[t][0],r=n[t][1];let s;if(r.length===1?s=r[0]:s=r,Object.prototype.hasOwnProperty.call(e,i)&&!isNaN(e[i]))throw new Error("Object "+e+" already has key "+i);e[i]=s}return e}function Ao(n,e,t,i){e=e!==void 0?e:0;const r=new Le.Parser(n,e),s=[];let a=[];t=t!==void 0?t:n.byteLength;let o=i<2?22:28;for(;r.relativeOffset<t;){let l=r.parseByte();if(l<o){if(l===12&&(l=1200+r.parseByte()),i>1&&l===23){Nv(a);continue}s.push([l,a]),a=[]}else a.push(Av(r,l))}return Cv(s)}function br(n,e){return e<=390?e=Es[e]:n?e=n[e-391]:e=void 0,e}function Co(n,e,t){const i={};let r;for(let s=0;s<e.length;s+=1){const a=e[s];if(Array.isArray(a.type)){const o=[];o.length=a.type.length;for(let l=0;l<a.type.length;l++)r=n[a.op]!==void 0?n[a.op][l]:void 0,r===void 0&&(r=a.value!==void 0&&a.value[l]!==void 0?a.value[l]:null),a.type[l]==="SID"&&(r=br(t,r)),o[l]=r;i[a.name]=o}else r=n[a.op],r===void 0&&(r=a.value!==void 0?a.value:null),a.type==="SID"&&(r=br(t,r)),i[a.name]=r}return i}function Rv(n,e){const t={};if(t.formatMajor=Le.getCard8(n,e),t.formatMinor=Le.getCard8(n,e+1),t.formatMajor>2)throw new Error(`Unsupported CFF table version ${t.formatMajor}.${t.formatMinor}`);return t.size=Le.getCard8(n,e+2),t.formatMajor<2?(t.offsetSize=Le.getCard8(n,e+3),t.startOffset=e,t.endOffset=e+4):(t.topDictLength=Le.getCard16(n,e+3),t.endOffset=e+8),t}var Vu=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]},{name:"ros",op:1230,type:["SID","SID","number"]},{name:"cidFontVersion",op:1231,type:"number",value:0},{name:"cidFontRevision",op:1232,type:"number",value:0},{name:"cidFontType",op:1233,type:"number",value:0},{name:"cidCount",op:1234,type:"number",value:8720},{name:"uidBase",op:1235,type:"number"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"fontName",op:1238,type:"SID"}],wv=[{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"charStrings",op:17,type:"offset"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"vstore",op:24,type:"offset"}],Hu=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}],Pv=[{name:"blueValues",op:6,type:"delta"},{name:"otherBlues",op:7,type:"delta"},{name:"familyBlues",op:7,type:"delta"},{name:"familyBlues",op:8,type:"delta"},{name:"familyOtherBlues",op:9,type:"delta"},{name:"blueScale",op:1209,type:"number",value:.039625},{name:"blueShift",op:1210,type:"number",value:7},{name:"blueFuzz",op:1211,type:"number",value:1},{name:"stdHW",op:10,type:"number"},{name:"stdVW",op:11,type:"number"},{name:"stemSnapH",op:1212,type:"number"},{name:"stemSnapV",op:1213,type:"number"},{name:"languageGroup",op:1217,type:"number",value:0},{name:"expansionFactor",op:1218,type:"number",value:.06},{name:"vsindex",op:22,type:"number",value:0},{name:"subrs",op:19,type:"offset"}],Lv=[{name:"private",op:18,type:["number","offset"],value:[0,0]}];function Dv(n,e,t,i){const r=Ao(n,e,n.byteLength,i);return Co(r,i>1?wv:Vu,t)}function Ro(n,e,t,i,r){const s=Ao(n,e,t,r);return Co(s,r>1?Pv:Hu,i)}function Iv(n,e,t){const i=Ao(n,e,void 0,t);return Co(i,Lv)}function Uv(n,e,t){const i=[];for(let r=0;r<t.length;r++){const s=new DataView(new Uint8Array(t[r]).buffer),a=Iv(s,0,2),o=a.private[0],l=a.private[1];if(o!==0&&l!==0){const c=Ro(n,l+e,o,[],2);if(c.subrs){const u=l+c.subrs,f=Tn(n,u+e,void 0,2);a._subrs=f.objects,a._subrsBias=zs(a._subrs)}a._privateDict=c}i.push(a)}return i}function Ua(n,e,t,i,r){const s=[];for(let a=0;a<t.length;a+=1){const o=new DataView(new Uint8Array(t[a]).buffer),l=Dv(o,0,i,r);l._subrs=[],l._subrsBias=0,l._defaultWidthX=0,l._nominalWidthX=0;const c=r<2?l.private[0]:0,u=r<2?l.private[1]:0;if(c!==0&&u!==0){const f=Ro(n,u+e,c,i,r);if(l._defaultWidthX=f.defaultWidthX,l._nominalWidthX=f.nominalWidthX,f.subrs!==0){const h=u+f.subrs,d=Tn(n,h+e,void 0,r);l._subrs=d.objects,l._subrsBias=zs(l._subrs)}l._privateDict=f}s.push(l)}return s}function Fv(n,e,t,i,r){let s,a;const o=new Le.Parser(n,e);t-=1;const l=[".notdef"],c=o.parseCard8();if(c===0)for(let u=0;u<t;u+=1)s=o.parseSID(),r?l.push(s):l.push(br(i,s)||s);else if(c===1)for(;l.length<=t;){s=o.parseSID(),a=o.parseCard8();for(let u=0;u<=a;u+=1)r?l.push("cid"+("00000"+s).slice(-5)):l.push(br(i,s)||s),s+=1}else if(c===2)for(;l.length<=t;){s=o.parseSID(),a=o.parseCard16();for(let u=0;u<=a;u+=1)r?l.push("cid"+("00000"+s).slice(-5)):l.push(br(i,s)||s),s+=1}else throw new Error("Unknown charset format "+c);return l}function Ov(n,e){let t;const i={},r=new Le.Parser(n,e),s=r.parseCard8();if(s===0){const a=r.parseCard8();for(let o=0;o<a;o+=1)t=r.parseCard8(),i[t]=o}else if(s===1){const a=r.parseCard8();t=1;for(let o=0;o<a;o+=1){const l=r.parseCard8(),c=r.parseCard8();for(let u=l;u<=l+c;u+=1)i[u]=t,t+=1}}else throw new Error("Unknown encoding format "+s);return i}function Nv(n){let e=n.pop();for(;n.length>e;)n.pop()}function Wu(n,e){const t=n.tables.cff&&n.tables.cff.topDict&&n.tables.cff.topDict.paintType||0;return t===2&&(e.fill=null,e.stroke="black",e.strokeWidth=n.tables.cff.topDict.strokeWidth||0),t}function no(n,e,t,i,r){let s,a,o,l;const c=new Ki,u=[];let f=0,h=!1,d=!1,p=0,x=0,m,g,_,v,S=0,R=[],M,w=0;const y=n.tables.cff2||n.tables.cff;if(_=y.topDict._defaultWidthX,v=y.topDict._nominalWidthX,r=r||n.variation&&n.variation.get(),e.getBlendPath||(e.getBlendPath=function(k){return no(n,e,t,i,k)}),n.isCIDFont||i>1){const k=y.topDict._fdSelect?y.topDict._fdSelect[e.index]:0,I=y.topDict._fdArray[k];m=I._subrs,g=I._subrsBias,i>1?(R=y.topDict._vstore.itemVariationStore,S=I._privateDict.vsindex):(_=I._defaultWidthX,v=I._nominalWidthX)}else m=y.topDict._subrs,g=y.topDict._subrsBias;const P=Wu(n,c);let D=_;function F(k,I){d&&P!==2&&c.closePath(),c.moveTo(k,I),d=!0}function B(){let k;k=(u.length&1)!==0,k&&!h&&(D=u.shift()+v),f+=u.length>>1,u.length=0,h=!0}function G(k){let I,X,H,Y,le,pe,ve,Te,Ne,j,N,T,E=0;for(;E<k.length;){let z=k[E];switch(E+=1,z){case 1:B();break;case 3:B();break;case 4:u.length>1&&!h&&(D=u.shift()+v,h=!0),x+=u.pop(),F(p,x);break;case 5:for(;u.length>0;)p+=u.shift(),x+=u.shift(),c.lineTo(p,x);break;case 6:for(;u.length>0&&(p+=u.shift(),c.lineTo(p,x),u.length!==0);)x+=u.shift(),c.lineTo(p,x);break;case 7:for(;u.length>0&&(x+=u.shift(),c.lineTo(p,x),u.length!==0);)p+=u.shift(),c.lineTo(p,x);break;case 8:for(;u.length>0;)s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l+u.shift(),c.curveTo(s,a,o,l,p,x);break;case 10:if(le=u.pop()+g,pe=m[le],pe){if(w>=rc){console.warn("CFF charstring subroutine call depth exceeded, skipping callsubr");break}w++,G(pe),w--}break;case 11:if(i>1){console.error("CFF CharString operator return (11) is not supported in CFF2");break}return;case 12:switch(z=k[E],E+=1,z){case 35:s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),ve=o+u.shift(),Te=l+u.shift(),Ne=ve+u.shift(),j=Te+u.shift(),N=Ne+u.shift(),T=j+u.shift(),p=N+u.shift(),x=T+u.shift(),u.shift(),c.curveTo(s,a,o,l,ve,Te),c.curveTo(Ne,j,N,T,p,x);break;case 34:s=p+u.shift(),a=x,o=s+u.shift(),l=a+u.shift(),ve=o+u.shift(),Te=l,Ne=ve+u.shift(),j=l,N=Ne+u.shift(),T=x,p=N+u.shift(),c.curveTo(s,a,o,l,ve,Te),c.curveTo(Ne,j,N,T,p,x);break;case 36:s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),ve=o+u.shift(),Te=l,Ne=ve+u.shift(),j=l,N=Ne+u.shift(),T=j+u.shift(),p=N+u.shift(),c.curveTo(s,a,o,l,ve,Te),c.curveTo(Ne,j,N,T,p,x);break;case 37:s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),ve=o+u.shift(),Te=l+u.shift(),Ne=ve+u.shift(),j=Te+u.shift(),N=Ne+u.shift(),T=j+u.shift(),Math.abs(N-p)>Math.abs(T-x)?p=N+u.shift():x=T+u.shift(),c.curveTo(s,a,o,l,ve,Te),c.curveTo(Ne,j,N,T,p,x);break;default:console.log("Glyph "+e.index+": unknown operator 1200"+z),u.length=0}break;case 14:if(i>1){console.error("CFF CharString operator endchar (14) is not supported in CFF2");break}if(u.length>=4){const Z=to[u.pop()],ee=to[u.pop()],ae=u.pop(),O=u.pop();if(Z&&ee){e.isComposite=!0,e.components=[];const U=n.cffEncoding.charset.indexOf(Z),L=n.cffEncoding.charset.indexOf(ee);e.components.push({glyphIndex:L,dx:0,dy:0}),e.components.push({glyphIndex:U,dx:O,dy:ae}),c.extend(n.glyphs.get(L).path);const Re=n.glyphs.get(U),Pe=JSON.parse(JSON.stringify(Re.path.commands));for(let He=0;He<Pe.length;He+=1){const fe=Pe[He];fe.type!=="Z"&&(fe.x+=O,fe.y+=ae),(fe.type==="Q"||fe.type==="C")&&(fe.x1+=O,fe.y1+=ae),fe.type==="C"&&(fe.x2+=O,fe.y2+=ae)}c.extend(Pe)}}else u.length>0&&!h&&(D=u.shift()+v,h=!0);d&&P!==2&&(c.closePath(),d=!1);break;case 15:if(i<2){console.error("CFF2 CharString operator vsindex (15) is not supported in CFF");break}S=u.pop();break;case 16:if(i<2){console.error("CFF2 CharString operator blend (16) is not supported in CFF");break}M||(M=n.variation&&r&&n.variation.process.getBlendVector(R,S,r));var V=u.pop(),ie=M?M.length:R.itemVariationSubtables[S].regionIndexes.length,J=V*ie,se=u.length-J,ge=se-V;if(M)for(let Z=0;Z<V;Z++){var me=u[ge+Z];for(let ee=0;ee<ie;ee++)me+=M[ee]*u[se++];u[ge+Z]=me}for(;J--;)u.pop();break;case 18:B();break;case 19:case 20:B(),E+=f+7>>3;break;case 21:u.length>2&&!h&&(D=u.shift()+v,h=!0),x+=u.pop(),p+=u.pop(),F(p,x);break;case 22:u.length>1&&!h&&(D=u.shift()+v,h=!0),p+=u.pop(),F(p,x);break;case 23:B();break;case 24:for(;u.length>2;)s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l+u.shift(),c.curveTo(s,a,o,l,p,x);p+=u.shift(),x+=u.shift(),c.lineTo(p,x);break;case 25:for(;u.length>6;)p+=u.shift(),x+=u.shift(),c.lineTo(p,x);s=p+u.shift(),a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l+u.shift(),c.curveTo(s,a,o,l,p,x);break;case 26:for(u.length&1&&(p+=u.shift());u.length>0;)s=p,a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o,x=l+u.shift(),c.curveTo(s,a,o,l,p,x);break;case 27:for(u.length&1&&(x+=u.shift());u.length>0;)s=p+u.shift(),a=x,o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l,c.curveTo(s,a,o,l,p,x);break;case 28:I=k[E],X=k[E+1],u.push((I<<24|X<<16)>>16),E+=2;break;case 29:if(le=u.pop()+n.gsubrsBias,pe=n.gsubrs[le],pe){if(w>=rc){console.warn("CFF charstring subroutine call depth exceeded, skipping callgsubr");break}w++,G(pe),w--}break;case 30:for(;u.length>0&&(s=p,a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,x),u.length!==0);)s=p+u.shift(),a=x,o=s+u.shift(),l=a+u.shift(),x=l+u.shift(),p=o+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,x);break;case 31:for(;u.length>0&&(s=p+u.shift(),a=x,o=s+u.shift(),l=a+u.shift(),x=l+u.shift(),p=o+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,x),u.length!==0);)s=p,a=x+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),x=l+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,x);break;default:z<32?console.log("Glyph "+e.index+": unknown operator "+z):z<247?u.push(z-139):z<251?(I=k[E],E+=1,u.push((z-247)*256+I+108)):z<255?(I=k[E],E+=1,u.push(-(z-251)*256-I-108)):(I=k[E],X=k[E+1],H=k[E+2],Y=k[E+3],E+=4,u.push((I<<24|X<<16|H<<8|Y)/65536))}}}return G(t),n.variation&&r&&(c.commands=c.commands.map(k=>{const I=Object.keys(k);for(let X=0;X<I.length;X++){const H=I[X];H!=="type"&&(k[H]=Math.round(k[H]))}return k})),h&&(e.advanceWidth=D),c}function sc(n,e,t,i,r){const s=[];let a;const o=new Le.Parser(n,e),l=o.parseCard8();if(l===0)for(let c=0;c<t;c++){if(a=o.parseCard8(),a>=i)throw new Error("CFF table CID Font FDSelect has bad FD index value "+a+" (FD count "+i+")");s.push(a)}else if(l===3||r>1&&l===4){const c=l===4?o.parseULong():o.parseCard16();let u=l===4?o.parseULong():o.parseCard16();if(u!==0)throw new Error(`CFF Table CID Font FDSelect format ${l} range has bad initial GID ${u}`);let f;for(let h=0;h<c;h++){if(a=l===4?o.parseUShort():o.parseCard8(),f=l===4?o.parseULong():o.parseCard16(),a>=i)throw new Error("CFF table CID Font FDSelect has bad FD index value "+a+" (FD count "+i+")");if(f>t)throw new Error(`CFF Table CID Font FDSelect format ${r} range has bad GID ${f}`);for(;u<f;u++)s.push(a);u=f}if(f!==t)throw new Error("CFF Table CID Font FDSelect format 3 range has bad final (Sentinal) GID "+f)}else throw new Error("CFF Table CID Font FDSelect table has unsupported format "+l);return s}function kv(n,e,t,i){let r;const s=Rv(n,e);s.formatMajor===2?r=t.tables.cff2={}:r=t.tables.cff={};const a=s.formatMajor>1?null:Tn(n,s.endOffset,Le.bytesToString),o=s.formatMajor>1?null:Tn(n,a.endOffset),l=s.formatMajor>1?null:Tn(n,o.endOffset,Le.bytesToString),c=Tn(n,s.formatMajor>1?e+s.size+s.topDictLength:l.endOffset,void 0,s.formatMajor);t.gsubrs=c.objects,t.gsubrsBias=zs(t.gsubrs);let u;if(s.formatMajor>1){const h=e+s.size,d=Le.getBytes(n,h,h+s.topDictLength);u=Ua(n,0,[d],void 0,s.formatMajor)[0]}else{const h=Ua(n,e,o.objects,l.objects,s.formatMajor);if(h.length!==1)throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = "+h.length);u=h[0]}if(r.topDict=u,u._privateDict&&(t.defaultWidthX=u._privateDict.defaultWidthX,t.nominalWidthX=u._privateDict.nominalWidthX),s.formatMajor<2&&u.ros[0]!==void 0&&u.ros[1]!==void 0&&(t.isCIDFont=!0),s.formatMajor>1){let h=u.fdArray,d=u.fdSelect;if(!h)throw new Error("This is a CFF2 font, but FDArray information is missing");const p=Tn(n,e+h,null,s.formatMajor),x=Uv(n,e,p.objects);u._fdArray=x,d&&(u._fdSelect=sc(n,e+d,t.numGlyphs,x.length,s.formatMajor))}else if(t.isCIDFont){let h=u.fdArray,d=u.fdSelect;if(h===0||d===0)throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");h+=e;const p=Tn(n,h),x=Ua(n,e,p.objects,l.objects,s.formatMajor);u._fdArray=x,d+=e,u._fdSelect=sc(n,d,t.numGlyphs,x.length,s.formatMajor)}if(s.formatMajor<2){const h=e+u.private[1],d=Ro(n,h,u.private[0],l.objects,s.formatMajor);if(t.defaultWidthX=d.defaultWidthX,t.nominalWidthX=d.nominalWidthX,d.subrs!==0){const p=h+d.subrs,x=Tn(n,p);t.subrs=x.objects,t.subrsBias=zs(t.subrs)}else t.subrs=[],t.subrsBias=0}let f;if(i.lowMemory?(f=Tv(n,e+u.charStrings,s.formatMajor),t.nGlyphs=f.offsets.length-(s.formatMajor>1?1:0)):(f=Tn(n,e+u.charStrings,null,s.formatMajor),t.nGlyphs=f.objects.length),s.formatMajor>1&&t.tables.maxp&&t.nGlyphs!==t.tables.maxp.numGlyphs&&console.error(`Glyph count in the CFF2 table (${t.nGlyphs}) must correspond to the glyph count in the maxp table (${t.tables.maxp.numGlyphs})`),s.formatMajor<2){let h=[],d=[];u.charset===0?h=ov:u.charset===1?h=lv:u.charset===2?h=cv:h=Fv(n,e+u.charset,t.nGlyphs,l.objects,t.isCIDFont),u.encoding===0?d=to:u.encoding===1?d=uv:d=Ov(n,e+u.encoding),t.cffEncoding=new Nu(d,h),t.encoding=t.encoding||t.cffEncoding}if(t.glyphs=new Cn.GlyphSet(t),i.lowMemory)t._push=function(h){const d=Mv(h,f.offsets,n,e+u.charStrings,void 0,s.formatMajor);t.glyphs.push(h,Cn.cffGlyphLoader(t,h,no,d,s.formatMajor))};else for(let h=0;h<t.nGlyphs;h+=1){const d=f.objects[h];t.glyphs.push(h,Cn.cffGlyphLoader(t,h,no,d,s.formatMajor))}if(u.vstore){const h=new Le.Parser(n,e+u.vstore);u._vstore=h.parseVariationStore()}}function Xu(n,e){let t,i=Es.indexOf(n);return i>=0&&(t=i),i=e.indexOf(n),i>=0?t=i+Es.length:(t=Es.length+e.length,e.push(n)),t}function Bv(){return new ye.Record("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}])}function Gv(n){const e=new ye.Record("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);e.names=[];for(let t=0;t<n.length;t+=1)e.names.push({name:"name_"+t,type:"NAME",value:n[t]});return e}function qu(n,e,t){const i={};for(let r=0;r<n.length;r+=1){const s=n[r];let a=e[s.name];a!==void 0&&!zu(a,s.value)&&(s.type==="SID"&&(a=Xu(a,t)),i[s.op]={name:s.name,type:s.type,value:a})}return i}function ac(n,e,t){const i=new ye.Record("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return i.dict=qu(Vu,n,e),i}function oc(n){const e=new ye.Record("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return e.topDicts=[{name:"topDict_0",type:"TABLE",value:n}],e}function zv(n){const e=new ye.Record("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);e.strings=[];for(let t=0;t<n.length;t+=1)e.strings.push({name:"string_"+t,type:"STRING",value:n[t]});return e}function Vv(){return new ye.Record("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}])}function Hv(n,e){const t=new ye.Record("Charsets",[{name:"format",type:"Card8",value:0}]);for(let i=0;i<n.length;i+=1){const r=n[i],s=Xu(r,e);t.fields.push({name:"glyph_"+i,type:"SID",value:s})}return t}function Wv(n,e){const t=[],i=n.path;t.push({name:"width",type:"NUMBER",value:n.advanceWidth});let r=0,s=0;for(let a=0;a<i.commands.length;a+=1){let o,l,c=i.commands[a];if(c.type==="Q"){const u=.3333333333333333,f=2/3;c={type:"C",x:c.x,y:c.y,x1:Math.round(u*r+f*c.x1),y1:Math.round(u*s+f*c.y1),x2:Math.round(u*c.x+f*c.x1),y2:Math.round(u*c.y+f*c.y1)}}if(c.type==="M")o=Math.round(c.x-r),l=Math.round(c.y-s),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rmoveto",type:"OP",value:21}),r=Math.round(c.x),s=Math.round(c.y);else if(c.type==="L")o=Math.round(c.x-r),l=Math.round(c.y-s),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rlineto",type:"OP",value:5}),r=Math.round(c.x),s=Math.round(c.y);else if(c.type==="C"){const u=Math.round(c.x1-r),f=Math.round(c.y1-s),h=Math.round(c.x2-c.x1),d=Math.round(c.y2-c.y1);o=Math.round(c.x-c.x2),l=Math.round(c.y-c.y2),t.push({name:"dx1",type:"NUMBER",value:u}),t.push({name:"dy1",type:"NUMBER",value:f}),t.push({name:"dx2",type:"NUMBER",value:h}),t.push({name:"dy2",type:"NUMBER",value:d}),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rrcurveto",type:"OP",value:8}),r=Math.round(c.x),s=Math.round(c.y)}}return t.push({name:"endchar",type:"OP",value:14}),t}function Xv(n,e){const t=new ye.Record("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]);for(let i=0;i<n.length;i+=1){const r=n.get(i),s=Wv(r);t.charStrings.push({name:r.name,type:"CHARSTRING",value:s})}return t}function qv(n,e,t){const i=new ye.Record("Private DICT",[{name:"dict",type:"DICT",value:{}}]);return i.dict=qu(Hu,n,e),i}function Yv(n,e){const t=new ye.Table("CFF ",[{name:"header",type:"RECORD"},{name:"nameIndex",type:"RECORD"},{name:"topDictIndex",type:"RECORD"},{name:"stringIndex",type:"RECORD"},{name:"globalSubrIndex",type:"RECORD"},{name:"charsets",type:"RECORD"},{name:"charStringsIndex",type:"RECORD"},{name:"privateDict",type:"RECORD"}]),i=1/e.unitsPerEm,r={version:e.version,fullName:e.fullName,familyName:e.familyName,weight:e.weightName,fontBBox:e.fontBBox||[0,0,0,0],fontMatrix:[i,0,0,i,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},s=e&&e.topDict||{};s.paintType&&(r.paintType=s.paintType,r.strokeWidth=s.strokeWidth||0);const a={},o=[];let l;for(let h=1;h<n.length;h+=1)l=n.get(h),o.push(l.name);const c=[];t.header=Bv(),t.nameIndex=Gv([e.postScriptName]);let u=ac(r,c);t.topDictIndex=oc(u),t.globalSubrIndex=Vv(),t.charsets=Hv(o,c),t.charStringsIndex=Xv(n),t.privateDict=qv(a,c),t.stringIndex=zv(c);const f=t.header.sizeOf()+t.nameIndex.sizeOf()+t.topDictIndex.sizeOf()+t.stringIndex.sizeOf()+t.globalSubrIndex.sizeOf();return r.charset=f,r.encoding=0,r.charStrings=r.charset+t.charsets.sizeOf(),r.private[1]=r.charStrings+t.charStringsIndex.sizeOf(),u=ac(r,c),t.topDictIndex=oc(u),t}var io={parse:kv,make:Yv};function jv(n,e){const t={},i=new Le.Parser(n,e);return t.version=i.parseVersion(),t.fontRevision=Math.round(i.parseFixed()*1e3)/1e3,t.checkSumAdjustment=i.parseULong(),t.magicNumber=i.parseULong(),Ve.argument(t.magicNumber===1594834165,"Font header has wrong magic number."),t.flags=i.parseUShort(),t.unitsPerEm=i.parseUShort(),t.created=i.parseLongDateTime(),t.modified=i.parseLongDateTime(),t.xMin=i.parseShort(),t.yMin=i.parseShort(),t.xMax=i.parseShort(),t.yMax=i.parseShort(),t.macStyle=i.parseUShort(),t.lowestRecPPEM=i.parseUShort(),t.fontDirectionHint=i.parseShort(),t.indexToLocFormat=i.parseShort(),t.glyphDataFormat=i.parseShort(),t}function $v(n){const e=Math.round(new Date().getTime()/1e3)+2082844800;let t=e,i=n.macStyle||0;return n.createdTimestamp&&(t=n.createdTimestamp+2082844800),new ye.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:t},{name:"modified",type:"LONGDATETIME",value:e},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:i},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],n)}var Yu={parse:jv,make:$v};function Zv(n,e){const t={},i=new Le.Parser(n,e);return t.version=i.parseVersion(),t.ascender=i.parseShort(),t.descender=i.parseShort(),t.lineGap=i.parseShort(),t.advanceWidthMax=i.parseUShort(),t.minLeftSideBearing=i.parseShort(),t.minRightSideBearing=i.parseShort(),t.xMaxExtent=i.parseShort(),t.caretSlopeRise=i.parseShort(),t.caretSlopeRun=i.parseShort(),t.caretOffset=i.parseShort(),i.relativeOffset+=8,t.metricDataFormat=i.parseShort(),t.numberOfHMetrics=i.parseUShort(),t}function Kv(n){return new ye.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],n)}var ju={parse:Zv,make:Kv};function Jv(n,e,t,i,r){let s,a;const o=new Le.Parser(n,e);for(let l=0;l<i;l+=1){l<t&&(s=o.parseUShort(),a=o.parseShort());const c=r.get(l);c.advanceWidth=s,c.leftSideBearing=a}}function Qv(n,e,t,i,r){n._hmtxTableData={};let s,a;const o=new Le.Parser(e,t);for(let l=0;l<r;l+=1)l<i&&(s=o.parseUShort(),a=o.parseShort()),n._hmtxTableData[l]={advanceWidth:s,leftSideBearing:a}}function e_(n,e,t,i,r,s,a){a.lowMemory?Qv(n,e,t,i,r):Jv(e,t,i,r,s)}function t_(n){const e=new ye.Table("hmtx",[]);for(let t=0;t<n.length;t+=1){const i=n.get(t),r=i.advanceWidth||0,s=i.leftSideBearing||0;e.fields.push({name:"advanceWidth_"+t,type:"USHORT",value:r}),e.fields.push({name:"leftSideBearing_"+t,type:"SHORT",value:s})}return e}var $u={parse:e_,make:t_};function n_(n){const e=new ye.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:n.length}]);let t="";const i=12+n.length*4;for(let r=0;r<n.length;++r){let s=t.indexOf(n[r]);s<0&&(s=t.length,t+=n[r]),e.fields.push({name:"offset "+r,type:"USHORT",value:i+s}),e.fields.push({name:"length "+r,type:"USHORT",value:n[r].length})}return e.fields.push({name:"stringPool",type:"CHARARRAY",value:t}),e}function i_(n,e){const t=new Le.Parser(n,e),i=t.parseULong();Ve.argument(i===1,"Unsupported ltag table version."),t.skip("uLong",1);const r=t.parseULong(),s=[];for(let a=0;a<r;a++){let o="";const l=e+t.parseUShort(),c=t.parseUShort();for(let u=l;u<l+c;++u)o+=String.fromCharCode(n.getInt8(u));s.push(o)}return s}var Zu={make:n_,parse:i_};function r_(n,e){const t={},i=new Le.Parser(n,e);return t.version=i.parseVersion(),t.numGlyphs=i.parseUShort(),t.version===1&&(t.maxPoints=i.parseUShort(),t.maxContours=i.parseUShort(),t.maxCompositePoints=i.parseUShort(),t.maxCompositeContours=i.parseUShort(),t.maxZones=i.parseUShort(),t.maxTwilightPoints=i.parseUShort(),t.maxStorage=i.parseUShort(),t.maxFunctionDefs=i.parseUShort(),t.maxInstructionDefs=i.parseUShort(),t.maxStackElements=i.parseUShort(),t.maxSizeOfInstructions=i.parseUShort(),t.maxComponentElements=i.parseUShort(),t.maxComponentDepth=i.parseUShort()),t}function s_(n){return new ye.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:n}])}var Ku={parse:r_,make:s_},ro=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];function a_(n){for(let e=0;e<ro.length;e+=1){const t=ro[e];if(n>=t.begin&&n<t.end)return e}return-1}function o_(n,e){const t={},i=new Le.Parser(n,e);t.version=i.parseUShort(),t.xAvgCharWidth=i.parseShort(),t.usWeightClass=i.parseUShort(),t.usWidthClass=i.parseUShort(),t.fsType=i.parseUShort(),t.ySubscriptXSize=i.parseShort(),t.ySubscriptYSize=i.parseShort(),t.ySubscriptXOffset=i.parseShort(),t.ySubscriptYOffset=i.parseShort(),t.ySuperscriptXSize=i.parseShort(),t.ySuperscriptYSize=i.parseShort(),t.ySuperscriptXOffset=i.parseShort(),t.ySuperscriptYOffset=i.parseShort(),t.yStrikeoutSize=i.parseShort(),t.yStrikeoutPosition=i.parseShort(),t.sFamilyClass=i.parseShort(),t.panose=[];for(let r=0;r<10;r++)t.panose[r]=i.parseByte();return t.ulUnicodeRange1=i.parseULong(),t.ulUnicodeRange2=i.parseULong(),t.ulUnicodeRange3=i.parseULong(),t.ulUnicodeRange4=i.parseULong(),t.achVendID=String.fromCharCode(i.parseByte(),i.parseByte(),i.parseByte(),i.parseByte()),t.fsSelection=i.parseUShort(),t.usFirstCharIndex=i.parseUShort(),t.usLastCharIndex=i.parseUShort(),t.sTypoAscender=i.parseShort(),t.sTypoDescender=i.parseShort(),t.sTypoLineGap=i.parseShort(),t.usWinAscent=i.parseUShort(),t.usWinDescent=i.parseUShort(),t.version>=1&&(t.ulCodePageRange1=i.parseULong(),t.ulCodePageRange2=i.parseULong()),t.version>=2&&(t.sxHeight=i.parseShort(),t.sCapHeight=i.parseShort(),t.usDefaultChar=i.parseUShort(),t.usBreakChar=i.parseUShort(),t.usMaxContent=i.parseUShort()),t}function l_(n){return new ye.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],n)}var so={parse:o_,make:l_,unicodeRanges:ro,getUnicodeRange:a_};function c_(n,e){const t={},i=new Le.Parser(n,e);switch(t.version=i.parseVersion(),t.italicAngle=i.parseFixed(),t.underlinePosition=i.parseShort(),t.underlineThickness=i.parseShort(),t.isFixedPitch=i.parseULong(),t.minMemType42=i.parseULong(),t.maxMemType42=i.parseULong(),t.minMemType1=i.parseULong(),t.maxMemType1=i.parseULong(),t.version){case 1:t.names=pi.slice();break;case 2:t.numberOfGlyphs=i.parseUShort(),t.glyphNameIndex=new Array(t.numberOfGlyphs);for(let r=0;r<t.numberOfGlyphs;r++)t.glyphNameIndex[r]=i.parseUShort();t.names=[];for(let r=0;r<t.numberOfGlyphs;r++)if(t.glyphNameIndex[r]>=pi.length){const s=i.parseChar();t.names.push(i.parseString(s))}break;case 2.5:t.numberOfGlyphs=i.parseUShort(),t.offset=new Array(t.numberOfGlyphs);for(let r=0;r<t.numberOfGlyphs;r++)t.offset[r]=i.parseChar();break}return t}function u_(n){const{italicAngle:e=Math.round((n.italicAngle||0)*65536),underlinePosition:t=0,underlineThickness:i=0,isFixedPitch:r=0,minMemType42:s=0,maxMemType42:a=0,minMemType1:o=0,maxMemType1:l=0}=n.tables.post||{};return new ye.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:e},{name:"underlinePosition",type:"FWORD",value:t},{name:"underlineThickness",type:"FWORD",value:i},{name:"isFixedPitch",type:"ULONG",value:r},{name:"minMemType42",type:"ULONG",value:s},{name:"maxMemType42",type:"ULONG",value:a},{name:"minMemType1",type:"ULONG",value:o},{name:"maxMemType1",type:"ULONG",value:l}])}var Ju={parse:c_,make:u_},mn=new Array(9);mn[1]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer($.coverage),deltaGlyphId:this.parseShort()};if(t===2)return{substFormat:2,coverage:this.parsePointer($.coverage),substitute:this.parseOffset16List()};Ve.assert(!1,"0x"+e.toString(16)+": lookup type 1 format must be 1 or 2.")};mn[2]=function(){const e=this.parseUShort();return Ve.argument(e===1,"GSUB Multiple Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer($.coverage),sequences:this.parseListOfLists()}};mn[3]=function(){const e=this.parseUShort();return Ve.argument(e===1,"GSUB Alternate Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer($.coverage),alternateSets:this.parseListOfLists()}};mn[4]=function(){const e=this.parseUShort();return Ve.argument(e===1,"GSUB ligature table identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer($.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var qi={sequenceIndex:$.uShort,lookupListIndex:$.uShort};mn[5]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:t,coverage:this.parsePointer($.coverage),ruleSets:this.parseListOfLists(function(){const i=this.parseUShort(),r=this.parseUShort();return{input:this.parseUShortList(i-1),lookupRecords:this.parseRecordList(r,qi)}})};if(t===2)return{substFormat:t,coverage:this.parsePointer($.coverage),classDef:this.parsePointer($.classDef),classSets:this.parseListOfLists(function(){const i=this.parseUShort(),r=this.parseUShort();return{classes:this.parseUShortList(i-1),lookupRecords:this.parseRecordList(r,qi)}})};if(t===3){const i=this.parseUShort(),r=this.parseUShort();return{substFormat:t,coverages:this.parseList(i,$.pointer($.coverage)),lookupRecords:this.parseRecordList(r,qi)}}Ve.assert(!1,"0x"+e.toString(16)+": lookup type 5 format must be 1, 2 or 3.")};mn[6]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer($.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(qi)}})};if(t===2)return{substFormat:2,coverage:this.parsePointer($.coverage),backtrackClassDef:this.parsePointer($.classDef),inputClassDef:this.parsePointer($.classDef),lookaheadClassDef:this.parsePointer($.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(qi)}})};if(t===3)return{substFormat:3,backtrackCoverage:this.parseList($.pointer($.coverage)),inputCoverage:this.parseList($.pointer($.coverage)),lookaheadCoverage:this.parseList($.pointer($.coverage)),lookupRecords:this.parseRecordList(qi)};Ve.assert(!1,"0x"+e.toString(16)+": lookup type 6 format must be 1, 2 or 3.")};mn[7]=function(){const e=this.parseUShort();Ve.argument(e===1,"GSUB Extension Substitution subtable identifier-format must be 1");const t=this.parseUShort(),i=new $(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:t,extension:mn[t].call(i)}};mn[8]=function(){const e=this.parseUShort();return Ve.argument(e===1,"GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer($.coverage),backtrackCoverage:this.parseList($.pointer($.coverage)),lookaheadCoverage:this.parseList($.pointer($.coverage)),substitutes:this.parseUShortList()}};function h_(n,e){e=e||0;const t=new $(n,e),i=t.parseVersion(1);return Ve.argument(i===1||i===1.1,"Unsupported GSUB table version."),i===1?{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(mn)}:{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(mn),variations:t.parseFeatureVariationsList()}}var bi=new Array(9);bi[1]=function(e){if(e.substFormat===1)return new ye.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)},{name:"deltaGlyphID",type:"SHORT",value:e.deltaGlyphId}]);if(e.substFormat===2)return new ye.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:2},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.ushortList("substitute",e.substitute)));Ve.fail("Lookup type 1 substFormat must be 1 or 2.")};bi[2]=function(e){return Ve.assert(e.substFormat===1,"Lookup type 2 substFormat must be 1."),new ye.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.tableList("seqSet",e.sequences,function(t){return new ye.Table("sequenceSetTable",ye.ushortList("sequence",t))})))};bi[3]=function(e){return Ve.assert(e.substFormat===1,"Lookup type 3 substFormat must be 1."),new ye.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.tableList("altSet",e.alternateSets,function(t){return new ye.Table("alternateSetTable",ye.ushortList("alternate",t))})))};bi[4]=function(e){return Ve.assert(e.substFormat===1,"Lookup type 4 substFormat must be 1."),new ye.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.tableList("ligSet",e.ligatureSets,function(t){return new ye.Table("ligatureSetTable",ye.tableList("ligature",t,function(i){return new ye.Table("ligatureTable",[{name:"ligGlyph",type:"USHORT",value:i.ligGlyph}].concat(ye.ushortList("component",i.components,i.components.length+1)))}))})))};bi[5]=function(e){if(e.substFormat===1)return new ye.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.tableList("sequenceRuleSet",e.ruleSets,function(t){return t?new ye.Table("sequenceRuleSetTable",ye.tableList("sequenceRule",t,function(i){let r=ye.ushortList("seqLookup",[],i.lookupRecords.length).concat(ye.ushortList("inputSequence",i.input,i.input.length+1));[r[0],r[1]]=[r[1],r[0]];for(let s=0;s<i.lookupRecords.length;s++){const a=i.lookupRecords[s];r=r.concat({name:"sequenceIndex"+s,type:"USHORT",value:a.sequenceIndex}).concat({name:"lookupListIndex"+s,type:"USHORT",value:a.lookupListIndex})}return new ye.Table("sequenceRuleTable",r)})):new ye.Table("NULL",null)})));if(e.substFormat===2)return new ye.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)},{name:"classDef",type:"TABLE",value:new ye.ClassDef(e.classDef)}].concat(ye.tableList("classSeqRuleSet",e.classSets,function(t){return t?new ye.Table("classSeqRuleSetTable",ye.tableList("classSeqRule",t,function(i){let r=ye.ushortList("classes",i.classes,i.classes.length+1).concat(ye.ushortList("seqLookupCount",[],i.lookupRecords.length));for(let s=0;s<i.lookupRecords.length;s++){const a=i.lookupRecords[s];r=r.concat({name:"sequenceIndex"+s,type:"USHORT",value:a.sequenceIndex}).concat({name:"lookupListIndex"+s,type:"USHORT",value:a.lookupListIndex})}return new ye.Table("classSeqRuleTable",r)})):new ye.Table("NULL",null)})));if(e.substFormat===3){let t=[{name:"substFormat",type:"USHORT",value:e.substFormat}];t.push({name:"inputGlyphCount",type:"USHORT",value:e.coverages.length}),t.push({name:"substitutionCount",type:"USHORT",value:e.lookupRecords.length});for(let r=0;r<e.coverages.length;r++){const s=e.coverages[r];t.push({name:"inputCoverage"+r,type:"TABLE",value:new ye.Coverage(s)})}for(let r=0;r<e.lookupRecords.length;r++){const s=e.lookupRecords[r];t=t.concat({name:"sequenceIndex"+r,type:"USHORT",value:s.sequenceIndex}).concat({name:"lookupListIndex"+r,type:"USHORT",value:s.lookupListIndex})}return new ye.Table("contextualSubstitutionTable",t)}Ve.assert(!1,"lookup type 5 format must be 1, 2 or 3.")};bi[6]=function(e){if(e.substFormat===1)return new ye.Table("chainContextTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ye.Coverage(e.coverage)}].concat(ye.tableList("chainRuleSet",e.chainRuleSets,function(i){return new ye.Table("chainRuleSetTable",ye.tableList("chainRule",i,function(r){let s=ye.ushortList("backtrackGlyph",r.backtrack,r.backtrack.length).concat(ye.ushortList("inputGlyph",r.input,r.input.length+1)).concat(ye.ushortList("lookaheadGlyph",r.lookahead,r.lookahead.length)).concat(ye.ushortList("substitution",[],r.lookupRecords.length));for(let a=0;a<r.lookupRecords.length;a++){const o=r.lookupRecords[a];s=s.concat({name:"sequenceIndex"+a,type:"USHORT",value:o.sequenceIndex}).concat({name:"lookupListIndex"+a,type:"USHORT",value:o.lookupListIndex})}return new ye.Table("chainRuleTable",s)}))})));if(e.substFormat===2)Ve.assert(!1,"lookup type 6 format 2 is not yet supported.");else if(e.substFormat===3){let t=[{name:"substFormat",type:"USHORT",value:e.substFormat}];t.push({name:"backtrackGlyphCount",type:"USHORT",value:e.backtrackCoverage.length});for(let r=0;r<e.backtrackCoverage.length;r++){const s=e.backtrackCoverage[r];t.push({name:"backtrackCoverage"+r,type:"TABLE",value:new ye.Coverage(s)})}t.push({name:"inputGlyphCount",type:"USHORT",value:e.inputCoverage.length});for(let r=0;r<e.inputCoverage.length;r++){const s=e.inputCoverage[r];t.push({name:"inputCoverage"+r,type:"TABLE",value:new ye.Coverage(s)})}t.push({name:"lookaheadGlyphCount",type:"USHORT",value:e.lookaheadCoverage.length});for(let r=0;r<e.lookaheadCoverage.length;r++){const s=e.lookaheadCoverage[r];t.push({name:"lookaheadCoverage"+r,type:"TABLE",value:new ye.Coverage(s)})}t.push({name:"substitutionCount",type:"USHORT",value:e.lookupRecords.length});for(let r=0;r<e.lookupRecords.length;r++){const s=e.lookupRecords[r];t=t.concat({name:"sequenceIndex"+r,type:"USHORT",value:s.sequenceIndex}).concat({name:"lookupListIndex"+r,type:"USHORT",value:s.lookupListIndex})}return new ye.Table("chainContextTable",t)}Ve.assert(!1,"lookup type 6 format must be 1, 2 or 3.")};function f_(n){return new ye.Table("GSUB",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new ye.ScriptList(n.scripts)},{name:"features",type:"TABLE",value:new ye.FeatureList(n.features)},{name:"lookups",type:"TABLE",value:new ye.LookupList(n.lookups,bi)}])}var Qu={parse:h_,make:f_};function d_(n,e){const t=new Le.Parser(n,e),i=t.parseULong();Ve.argument(i===1,"Unsupported META table version."),t.parseULong(),t.parseULong();const r=t.parseULong(),s={};for(let a=0;a<r;a++){const o=t.parseTag(),l=t.parseULong(),c=t.parseULong();if(o==="appl"||o==="bild")continue;const u=Ji.UTF8(n,e+l,c);s[o]=u}return s}function p_(n){const e=Object.keys(n).length;let t="";const i=16+e*12,r=new ye.Table("meta",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"offset",type:"ULONG",value:i},{name:"numTags",type:"ULONG",value:e}]);for(let s in n){const a=t.length;t+=n[s],r.fields.push({name:"tag "+s,type:"TAG",value:s}),r.fields.push({name:"offset "+s,type:"ULONG",value:i+a}),r.fields.push({name:"length "+s,type:"ULONG",value:n[s].length})}return r.fields.push({name:"stringPool",type:"CHARARRAY",value:t}),r}var eh={parse:d_,make:p_};function m_(n,e){const t=new $(n,e),i=t.parseUShort();i!==0&&console.warn("Only COLRv0 is currently fully supported. A subset of color glyphs might be available in this font if provided in the v0 format.");const r=t.parseUShort(),s=t.parseOffset32(),a=t.parseOffset32(),o=t.parseUShort();t.relativeOffset=s;const l=t.parseRecordList(r,{glyphID:$.uShort,firstLayerIndex:$.uShort,numLayers:$.uShort});t.relativeOffset=a;const c=t.parseRecordList(o,{glyphID:$.uShort,paletteIndex:$.uShort});return{version:i,baseGlyphRecords:l,layerRecords:c}}function g_({version:n=0,baseGlyphRecords:e=[],layerRecords:t=[]}){Ve.argument(n===0,"Only COLRv0 supported.");const i=14,r=i+e.length*6;return new ye.Table("COLR",[{name:"version",type:"USHORT",value:n},{name:"numBaseGlyphRecords",type:"USHORT",value:e.length},{name:"baseGlyphRecordsOffset",type:"ULONG",value:i},{name:"layerRecordsOffset",type:"ULONG",value:r},{name:"numLayerRecords",type:"USHORT",value:t.length},...e.map((s,a)=>[{name:"glyphID_"+a,type:"USHORT",value:s.glyphID},{name:"firstLayerIndex_"+a,type:"USHORT",value:s.firstLayerIndex},{name:"numLayers_"+a,type:"USHORT",value:s.numLayers}]).flat(),...t.map((s,a)=>[{name:"LayerGlyphID_"+a,type:"USHORT",value:s.glyphID},{name:"paletteIndex_"+a,type:"USHORT",value:s.paletteIndex}]).flat()])}var th={parse:m_,make:g_};function x_(n,e){return[{name:"tag_"+n,type:"TAG",value:e.tag},{name:"minValue_"+n,type:"FIXED",value:e.minValue<<16},{name:"defaultValue_"+n,type:"FIXED",value:e.defaultValue<<16},{name:"maxValue_"+n,type:"FIXED",value:e.maxValue<<16},{name:"flags_"+n,type:"USHORT",value:0},{name:"nameID_"+n,type:"USHORT",value:e.axisNameID}]}function v_(n,e,t){const i={},r=new Le.Parser(n,e);i.tag=r.parseTag(),i.minValue=r.parseFixed(),i.defaultValue=r.parseFixed(),i.maxValue=r.parseFixed(),r.skip("uShort",1);const s=r.parseUShort();return i.axisNameID=s,i.name=Bs(t,s),i}function __(n,e,t,i={}){const r=[{name:"nameID_"+n,type:"USHORT",value:e.subfamilyNameID},{name:"flags_"+n,type:"USHORT",value:0}];for(let s=0;s<t.length;++s){const a=t[s].tag;r.push({name:"axis_"+n+" "+a,type:"FIXED",value:e.coordinates[a]<<16})}return i&&i.postScriptNameID&&r.push({name:"postScriptNameID_",type:"USHORT",value:e.postScriptNameID!==void 0?e.postScriptNameID:65535}),r}function y_(n,e,t,i,r){const s={},a=new Le.Parser(n,e),o=a.parseUShort();s.subfamilyNameID=o,s.name=Bs(i,o,[2,17]),a.skip("uShort",1),s.coordinates={};for(let c=0;c<t.length;++c)s.coordinates[t[c].tag]=a.parseFixed();if(a.relativeOffset===r)return s.postScriptNameID=void 0,s.postScriptName=void 0,s;const l=a.parseUShort();return s.postScriptNameID=l==65535?void 0:l,s.postScriptName=s.postScriptNameID!==void 0?Bs(i,l,[6]):"",s}function S_(n,e){const t=new ye.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:n.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:n.instances.length},{name:"instanceSize",type:"USHORT",value:4+n.axes.length*4}]);t.offsetToData=t.sizeOf();for(let r=0;r<n.axes.length;r++)t.fields=t.fields.concat(x_(r,n.axes[r]));const i={};for(let r=0;r<n.instances.length;r++)if(n.instances[r].postScriptNameID!==void 0){t.instanceSize+=2,i.postScriptNameID=!0;break}for(let r=0;r<n.instances.length;r++)t.fields=t.fields.concat(__(r,n.instances[r],n.axes,i));return t}function b_(n,e,t){const i=new Le.Parser(n,e),r=i.parseULong();Ve.argument(r===65536,"Unsupported fvar table version.");const s=i.parseOffset16();i.skip("uShort",1);const a=i.parseUShort(),o=i.parseUShort(),l=i.parseUShort(),c=i.parseUShort(),u=[];for(let d=0;d<a;d++)u.push(v_(n,e+s+d*o,t));const f=[],h=e+s+a*o;for(let d=0;d<l;d++)f.push(y_(n,h+d*c,u,t,c));return{axes:u,instances:f}}var nh={make:S_,parse:b_},T_={tag:$.tag,nameID:$.uShort,ordering:$.uShort},Gr=new Array(5);Gr[1]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed()}};Gr[2]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),nominalValue:this.parseFixed(),rangeMinValue:this.parseFixed(),rangeMaxValue:this.parseFixed()}};Gr[3]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed(),linkedValue:this.parseFixed()}};Gr[4]=function(){const e=this.parseUShort();return{flags:this.parseUShort(),valueNameID:this.parseUShort(),axisValues:this.parseList(e,function(){return{axisIndex:this.parseUShort(),value:this.parseFixed()}})}};function M_(){const n=this.parseUShort(),e=Gr[n],t={format:n};return e===void 0?(console.warn(`Unknown axis value table format ${n}`),t):Object.assign(t,this.parseStruct(e.bind(this)))}function E_(n,e,t){e||(e=0);const i=new Le.Parser(n,e),r=i.parseUShort(),s=i.parseUShort();r!==1&&console.warn(`Unsupported STAT table version ${r}.${s}`);const a=[r,s],o=i.parseUShort(),l=i.parseUShort(),c=i.parseOffset32(),u=i.parseUShort(),f=i.parseOffset32(),h=r>1||s>0?i.parseUShort():void 0;t!==void 0&&Ve.argument(l>=t.axes.length,"STAT axis count must be greater than or equal to fvar axis count"),u>0&&Ve.argument(l>=0,"STAT axis count must be greater than 0 if STAT axis value count is greater than 0");const d=[];for(let m=0;m<l;m++)i.offset=e+c,i.relativeOffset=m*o,d.push(i.parseStruct(T_));i.offset=e,i.relativeOffset=f;const p=i.parseUShortList(u),x=[];for(let m=0;m<u;m++)i.offset=e+f,i.relativeOffset=p[m],x.push(M_.apply(i));return{version:a,axes:d,values:x,elidedFallbackNameID:h}}var zr=new Array(5);zr[1]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:1},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`value${e}`,type:"FLOAT",value:t.value}]};zr[2]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:2},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`nominalValue${e}`,type:"FLOAT",value:t.nominalValue},{name:`rangeMinValue${e}`,type:"FLOAT",value:t.rangeMinValue},{name:`rangeMaxValue${e}`,type:"FLOAT",value:t.rangeMaxValue}]};zr[3]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:3},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`value${e}`,type:"FLOAT",value:t.value},{name:`linkedValue${e}`,type:"FLOAT",value:t.linkedValue}]};zr[4]=function(e,t){let i=[{name:`format${e}`,type:"USHORT",value:4},{name:`axisCount${e}`,type:"USHORT",value:t.axisValues.length},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID}];for(let r=0;r<t.axisValues.length;r++)i=i.concat([{name:`format${e}axisIndex${r}`,type:"USHORT",value:t.axisValues[r].axisIndex},{name:`format${e}value${r}`,type:"FLOAT",value:t.axisValues[r].value}]);return i};function A_(n,e){return new ye.Record("axisRecord_"+n,[{name:"axisTag_"+n,type:"TAG",value:e.tag},{name:"axisNameID_"+n,type:"USHORT",value:e.nameID},{name:"axisOrdering_"+n,type:"USHORT",value:e.ordering}])}function C_(n,e){const t=e.format,i=zr[t];Ve.argument(i!==void 0,`Unknown axis value table format ${t}`);const r=i(n,e);return new ye.Table("axisValueTable_"+n,r)}function R_(n){const e=new ye.Table("STAT",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:2},{name:"designAxisSize",type:"USHORT",value:8},{name:"designAxisCount",type:"USHORT",value:n.axes.length},{name:"designAxesOffset",type:"ULONG",value:0},{name:"axisValueCount",type:"USHORT",value:n.values.length},{name:"offsetToAxisValueOffsets",type:"ULONG",value:0},{name:"elidedFallbackNameID",type:"USHORT",value:n.elidedFallbackNameID}]);e.designAxesOffset=e.offsetToAxisValueOffsets=e.sizeOf();for(let s=0;s<n.axes.length;s++){const a=A_(s,n.axes[s]);e.offsetToAxisValueOffsets+=a.sizeOf(),e.fields=e.fields.concat(a.fields)}const t=[];let i=[],r=n.values.length*2;for(let s=0;s<n.values.length;s++){const a=C_(s,n.values[s]);t.push({name:"offset_"+s,type:"USHORT",value:r}),r+=a.sizeOf(),i=i.concat(a.fields)}return e.fields=e.fields.concat(t),e.fields=e.fields.concat(i),e}var ih={make:R_,parse:E_};function w_(n,e){return new ye.Record("axisValueMap_"+n,[{name:"fromCoordinate_"+n,type:"F2DOT14",value:e.fromCoordinate},{name:"toCoordinate_"+n,type:"F2DOT14",value:e.toCoordinate}])}function P_(n,e){const t=new ye.Record("segmentMap_"+n,[{name:"positionMapCount_"+n,type:"USHORT",value:e.axisValueMaps.length}]);let i=[];for(let r=0;r<e.axisValueMaps.length;r++){const s=w_(`${n}_${r}`,e.axisValueMaps[r]);i=i.concat(s.fields)}return t.fields=t.fields.concat(i),t}function L_(n,e){Ve.argument(n.axisSegmentMaps.length===e.axes.length,"avar axis count must correspond to fvar axis count");const t=new ye.Table("avar",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:0},{name:"reserved",type:"USHORT",value:0},{name:"axisCount",type:"USHORT",value:n.axisSegmentMaps.length}]);for(let i=0;i<n.axisSegmentMaps.length;i++){const r=P_(i,n.axisSegmentMaps[i]);t.fields=t.fields.concat(r.fields)}return t}function D_(n,e,t){e||(e=0);const i=new $(n,e),r=i.parseUShort(),s=i.parseUShort();r!==1&&console.warn(`Unsupported avar table version ${r}.${s}`),i.skip("uShort",1);const a=i.parseUShort();Ve.argument(a===t.axes.length,"avar axis count must correspond to fvar axis count");const o=[];for(let l=0;l<a;l++){const c=[],u=i.parseUShort();for(let f=0;f<u;f++){const h=i.parseF2Dot14(),d=i.parseF2Dot14();c.push({fromCoordinate:h,toCoordinate:d})}o.push({axisValueMaps:c})}return{version:[r,s],axisSegmentMaps:o}}var rh={make:L_,parse:D_};function I_(n,e,t,i){const r=new Le.Parser(n,e),s=r.parseTupleVariationStore(r.relativeOffset,t.axes.length,"cvar",i),a=r.parseUShort(),o=r.parseUShort();return a!==1&&console.warn(`Unsupported cvar table version ${a}.${o}`),{version:[a,o],...s}}function U_(){console.warn("Writing of cvar tables is not yet supported.")}var sh={make:U_,parse:I_};function F_(n,e,t,i){const r=new Le.Parser(n,e),s=r.parseUShort(),a=r.parseUShort();s!==1&&console.warn(`Unsupported gvar table version ${s}.${a}`);const o=r.parseUShort();o!==t.axes.length&&console.warn(`axisCount ${o} in gvar table does not match the number of axes ${t.axes.length} in the fvar table!`);const l=r.parseUShort(),c=r.parsePointer32(function(){return this.parseTupleRecords(l,o)}),u=r.parseTupleVariationStoreList(o,"gvar",i);return{version:[s,a],sharedTuples:c,glyphVariations:u}}function O_(){console.warn("Writing of gvar tables is not yet supported.")}var ah={make:O_,parse:F_};function N_(n,e){const t={},i=new Le.Parser(n,e);t.version=i.parseUShort(),Ve.argument(t.version<=1,"Unsupported gasp table version."),t.numRanges=i.parseUShort(),t.gaspRanges=[];for(let r=0;r<t.numRanges;r++)t.gaspRanges[r]={rangeMaxPPEM:i.parseUShort(),rangeGaspBehavior:i.parseUShort()};return t}function k_(n){const e=new ye.Table("gasp",[{name:"version",type:"USHORT",value:1},{name:"numRanges",type:"USHORT",value:n.numRanges}]);for(let t in n.gaspRanges)e.fields.push({name:"rangeMaxPPEM",type:"USHORT",value:n.gaspRanges[t].rangeMaxPPEM}),e.fields.push({name:"rangeGaspBehavior",type:"USHORT",value:n.gaspRanges[t].rangeGaspBehavior});return e}var oh={parse:N_,make:k_};function B_(n,e){const t=new Map,i=n.buffer,r=new $(n,e);if(r.parseUShort()!==0)return t;r.relativeOffset=r.parseOffset32();const a=n.byteOffset+e+r.relativeOffset,o=r.parseUShort(),l=new Map;for(let c=0;c<o;c++){const u=r.parseUShort(),f=r.parseUShort(),h=a+r.parseOffset32(),d=r.parseULong();let p=l.get(h);p===void 0&&(p=new Uint8Array(i,h,d),l.set(h,p));for(let x=u;x<=f;x++)t.set(x,p)}return t}function G_(n){const e=Array.from(n.keys()).sort(),t=[],i=[],r=new Map;let s=0,a={endGlyphID:null};for(let h=0,d=e.length;h<d;h++){const p=e[h],x=n.get(p);let m=r.get(x);m===void 0&&(m=s,i.push(x),r.set(x,m),s+=x.byteLength),p-1===a.endGlyphID&&m===a.svgDocOffset?a.endGlyphID=p:(a={startGlyphID:p,endGlyphID:p,svgDocOffset:m,svgDocLength:x.byteLength},t.push(a))}const o=t.length,l=i.length,c=2+o*12,u=new Array(4+o*4+l);let f=0;u[f++]={name:"version",type:"USHORT",value:0},u[f++]={name:"svgDocumentListOffset",type:"ULONG",value:10},u[f++]={name:"reserved",type:"ULONG",value:0},u[f++]={name:"numEntries",type:"USHORT",value:o};for(let h=0;h<o;h++){const d="documentRecord_"+h,{startGlyphID:p,endGlyphID:x,svgDocOffset:m,svgDocLength:g}=t[h];u[f++]={name:d+"_startGlyphID",type:"USHORT",value:p},u[f++]={name:d+"_endGlyphID",type:"USHORT",value:x},u[f++]={name:d+"_svgDocOffset",type:"ULONG",value:c+m},u[f++]={name:d+"_svgDocLength",type:"ULONG",value:g}}for(let h=0;h<l;h++)u[f++]={name:"svgDoc_"+h,type:"LITERAL",value:i[h]};return new ye.Table("SVG ",u)}var lh={make:G_,parse:B_};function lc(n){return Math.log(n)/Math.log(2)|0}function wo(n){for(;n.length%4!==0;)n.push(0);let e=0;for(let t=0;t<n.length;t+=4)e+=(n[t]<<24)+(n[t+1]<<16)+(n[t+2]<<8)+n[t+3];return e%=Math.pow(2,32),e}function cc(n,e,t,i){return new ye.Record("Table Record",[{name:"tag",type:"TAG",value:n!==void 0?n:""},{name:"checkSum",type:"ULONG",value:e!==void 0?e:0},{name:"offset",type:"ULONG",value:t!==void 0?t:0},{name:"length",type:"ULONG",value:i!==void 0?i:0}])}function ch(n){const e=new ye.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);e.tables=n,e.numTables=n.length;const t=Math.pow(2,lc(e.numTables));e.searchRange=16*t,e.entrySelector=lc(t),e.rangeShift=e.numTables*16-e.searchRange;const i=[],r=[];let s=e.sizeOf()+cc().sizeOf()*e.numTables;for(;s%4!==0;)s+=1,r.push({name:"padding",type:"BYTE",value:0});for(let a=0;a<n.length;a+=1){const o=n[a];Ve.argument(o.tableName.length===4,"Table name"+o.tableName+" is invalid.");const l=o.sizeOf(),c=cc(o.tableName,wo(o.encode()),s,l);for(i.push({name:c.tag+" Table Record",type:"RECORD",value:c}),r.push({name:o.tableName+" table",type:"RECORD",value:o}),s+=l,Ve.argument(!isNaN(s),"Something went wrong calculating the offset.");s%4!==0;)s+=1,r.push({name:"padding",type:"BYTE",value:0})}return i.sort(function(a,o){return a.value.tag>o.value.tag?1:-1}),e.fields=e.fields.concat(i),e.fields=e.fields.concat(r),e}function uc(n,e,t){for(let i=0;i<e.length;i+=1){const r=n.charToGlyphIndex(e[i]);if(r>0)return n.glyphs.get(r).getMetrics()}return t}function z_(n){let e=0;for(let t=0;t<n.length;t+=1)e+=n[t];return e/n.length}function V_(n){const e=[],t=[],i=[],r=[],s=[],a=[],o=[];let l,c=0,u=0,f=0,h=0,d=0;for(let V=0;V<n.glyphs.length;V+=1){const ie=n.glyphs.get(V),J=ie.unicode|0;if(isNaN(ie.advanceWidth))throw new Error("Glyph "+ie.name+" ("+V+"): advanceWidth is not a number.");(l>J||l===void 0)&&J>0&&(l=J),c<J&&(c=J);const se=so.getUnicodeRange(J);if(se<32)u|=1<<se;else if(se<64)f|=1<<se-32;else if(se<96)h|=1<<se-64;else if(se<123)d|=1<<se-96;else throw new Error("Unicode ranges bits > 123 are reserved for internal usage");if(ie.name===".notdef")continue;const ge=ie.getMetrics();e.push(ge.xMin),t.push(ge.yMin),i.push(ge.xMax),r.push(ge.yMax),a.push(ge.leftSideBearing),o.push(ge.rightSideBearing),s.push(ie.advanceWidth)}const p={xMin:Math.min.apply(null,e),yMin:Math.min.apply(null,t),xMax:Math.max.apply(null,i),yMax:Math.max.apply(null,r),advanceWidthMax:Math.max.apply(null,s),advanceWidthAvg:z_(s),minLeftSideBearing:Math.min.apply(null,a),maxLeftSideBearing:Math.max.apply(null,a),minRightSideBearing:Math.min.apply(null,o)};p.ascender=n.ascender,p.descender=n.descender;let x=0;n.weightClass>=600&&(x|=n.macStyleValues.BOLD),n.italicAngle<0&&(x|=n.macStyleValues.ITALIC);const m=Yu.make({flags:3,unitsPerEm:n.unitsPerEm,xMin:p.xMin,yMin:p.yMin,xMax:p.xMax,yMax:p.yMax,lowestRecPPEM:3,macStyle:x,createdTimestamp:n.createdTimestamp}),g=ju.make({ascender:p.ascender,descender:p.descender,advanceWidthMax:p.advanceWidthMax,minLeftSideBearing:p.minLeftSideBearing,minRightSideBearing:p.minRightSideBearing,xMaxExtent:p.maxLeftSideBearing+(p.xMax-p.xMin),numberOfHMetrics:n.glyphs.length}),_=Ku.make(n.glyphs.length),v=so.make(Object.assign({xAvgCharWidth:Math.round(p.advanceWidthAvg),usFirstCharIndex:l,usLastCharIndex:c,ulUnicodeRange1:u,ulUnicodeRange2:f,ulUnicodeRange3:h,ulUnicodeRange4:d,sTypoAscender:p.ascender,sTypoDescender:p.descender,sTypoLineGap:0,usWinAscent:p.yMax,usWinDescent:Math.abs(p.yMin),ulCodePageRange1:1,sxHeight:uc(n,"xyvw",{yMax:Math.round(p.ascender/2)}).yMax,sCapHeight:uc(n,"HIKLEFJMNTZBDPRAGOQSUVWXY",p).yMax,usDefaultChar:n.hasChar(" ")?32:0,usBreakChar:n.hasChar(" ")?32:0},n.tables.os2)),S=$u.make(n.glyphs),R=Uu.make(n.glyphs),M=n.getEnglishName("fontFamily"),w=n.getEnglishName("fontSubfamily"),y=M+" "+w;let P=n.getEnglishName("postScriptName");P||(P=M.replace(/\s/g,"")+"-"+w);const D={};for(let V in n.names)D[V]=n.names[V];D.unicode=D.unicode||{},D.macintosh=D.macintosh||{},D.windows=D.windows||{};const F=n.names.unicode||{},B=n.names.macintosh||{},G=n.names.windows||{};for(const V in D){if(D[V]=D[V]||{},!D[V].uniqueID){const ie=n.getEnglishName("manufacturer")||"";D[V].uniqueID={en:`${ie}: ${y}`}}D[V].postScriptName||(D[V].postScriptName={en:P})}D.unicode.preferredFamily||(D.unicode.preferredFamily=F.fontFamily||B.fontFamily||G.fontFamily),D.macintosh.preferredFamily||(D.macintosh.preferredFamily=B.fontFamily||F.fontFamily||G.fontFamily),D.windows.preferredFamily||(D.windows.preferredFamily=G.fontFamily||F.fontFamily||B.fontFamily),D.unicode.preferredSubfamily||(D.unicode.preferredSubfamily=F.fontSubfamily||B.fontSubfamily||G.fontSubfamily),D.macintosh.preferredSubfamily||(D.macintosh.preferredSubfamily=B.fontSubfamily||F.fontSubfamily||G.fontSubfamily),D.windows.preferredSubfamily||(D.windows.preferredSubfamily=G.fontSubfamily||F.fontSubfamily||B.fontSubfamily);const k=[],I=Iu.make(D,k),X=k.length>0?Zu.make(k):void 0,H=Ju.make(n),Y=io.make(n.glyphs,{version:n.getEnglishName("version"),fullName:y,familyName:M,weightName:w,postScriptName:P,unitsPerEm:n.unitsPerEm,fontBBox:[0,p.yMin,p.ascender,p.advanceWidthMax],topDict:n.tables.cff&&n.tables.cff.topDict||{}}),le=n.metas&&Object.keys(n.metas).length>0?eh.make(n.metas):void 0,pe=[m,g,_,v,I,R,H,Y,S];X&&pe.push(X);const ve={gsub:Qu,cpal:Gu,colr:th,stat:ih,avar:rh,cvar:sh,fvar:nh,gvar:ah,gasp:oh,svg:lh},Te={avar:[n.tables.fvar],fvar:[n.names]};for(let V in ve){const ie=n.tables[V];if(ie){const J=ve[V].make.call(n,ie,...Te[V]||[]);J&&pe.push(J)}}le&&pe.push(le);const Ne=ch(pe),j=Ne.encode(),N=wo(j),T=Ne.fields;let E=!1;for(let V=0;V<T.length;V+=1)if(T[V].name==="head table"){T[V].value.checkSumAdjustment=2981146554-N,E=!0;break}if(!E)throw new Error("Could not find head table with checkSum to adjust.");return Ne}var H_={make:ch,fontToTable:V_,computeCheckSum:wo};function Fa(n,e){let t=0,i=n.length-1;for(;t<=i;){const r=t+i>>>1,s=n[r].tag;if(s===e)return r;s<e?t=r+1:i=r-1}return-t-1}function hc(n,e){let t=0,i=n.length-1;for(;t<=i;){const r=t+i>>>1,s=n[r];if(s===e)return r;s<e?t=r+1:i=r-1}return-t-1}function fc(n,e){let t,i=0,r=n.length-1;for(;i<=r;){const s=i+r>>>1;t=n[s];const a=t.start;if(a===e)return t;a<e?i=s+1:r=s-1}if(i>0)return t=n[i-1],e>t.end?0:t}function uh(n,e){this.font=n,this.tableName=e}uh.prototype={searchTag:Fa,binSearch:hc,getTable:function(n){let e=this.font.tables[this.tableName];return!e&&n&&(e=this.font.tables[this.tableName]=this.createDefaultTable()),e},getScriptNames:function(){let n=this.getTable();return n?n.scripts.map(function(e){return e.tag}):[]},getDefaultScriptName:function(){let n=this.getTable();if(!n)return;let e=!1;for(let t=0;t<n.scripts.length;t++){const i=n.scripts[t].tag;if(i==="DFLT")return i;i==="latn"&&(e=!0)}if(e)return"latn"},getScriptTable:function(n,e){const t=this.getTable(e);if(t){n=n||"DFLT";const i=t.scripts,r=Fa(t.scripts,n);if(r>=0)return i[r].script;if(e){const s={tag:n,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return i.splice(-1-r,0,s),s.script}}},getLangSysTable:function(n,e,t){const i=this.getScriptTable(n,t);if(i){if(!e||e==="dflt"||e==="DFLT")return i.defaultLangSys;const r=Fa(i.langSysRecords,e);if(r>=0)return i.langSysRecords[r].langSys;if(t){const s={tag:e,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return i.langSysRecords.splice(-1-r,0,s),s.langSys}}},getFeatureTable:function(n,e,t,i){const r=this.getLangSysTable(n,e,i);if(r){let s;const a=r.featureIndexes,o=this.font.tables[this.tableName].features;for(let l=0;l<a.length;l++)if(s=o[a[l]],s.tag===t)return s.feature;if(i){const l=o.length;return Ve.assert(l===0||t>=o[l-1].tag,"Features must be added in alphabetical order."),s={tag:t,feature:{params:0,lookupListIndexes:[]}},o.push(s),a.push(l),s.feature}}},getLookupTables:function(n,e,t,i,r){const s=this.getFeatureTable(n,e,t,r),a=[];if(s){let o;const l=s.lookupListIndexes,c=this.font.tables[this.tableName].lookups;for(let u=0;u<l.length;u++)o=c[l[u]],o.lookupType===i&&a.push(o);if(a.length===0&&r){o={lookupType:i,lookupFlag:0,subtables:[],markFilteringSet:void 0};const u=c.length;return c.push(o),l.push(u),[o]}}return a},getGlyphClass:function(n,e){switch(n.format){case 1:return n.startGlyph<=e&&e<n.startGlyph+n.classes.length?n.classes[e-n.startGlyph]:0;case 2:{const t=fc(n.ranges,e);return t?t.classId:0}}},getCoverageIndex:function(n,e){switch(n.format){case 1:{const t=hc(n.glyphs,e);return t>=0?t:-1}case 2:{const t=fc(n.ranges,e);return t?t.index+e-t.start:-1}}},expandCoverage:function(n){if(n.format===1)return n.glyphs;{const e=[],t=n.ranges;for(let i=0;i<t.length;i++){const r=t[i],s=r.start,a=r.end;for(let o=s;o<=a;o++)e.push(o)}return e}}};var Zs=uh;function Vr(n){Zs.call(this,n,"gpos")}Vr.prototype=Zs.prototype;Vr.prototype.init=function(){const n=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(n)};Vr.prototype.getKerningValue=function(n,e,t){for(let i=0;i<n.length;i++){const r=n[i].subtables;for(let s=0;s<r.length;s++){const a=r[s],o=this.getCoverageIndex(a.coverage,e);if(!(o<0))switch(a.posFormat){case 1:{let l=a.pairSets[o];for(let c=0;c<l.length;c++){let u=l[c];if(u.secondGlyph===t)return u.value1&&u.value1.xAdvance||0}break}case 2:{const l=this.getGlyphClass(a.classDef1,e),c=this.getGlyphClass(a.classDef2,t),u=a.classRecords[l][c];return u.value1&&u.value1.xAdvance||0}}}}return 0};Vr.prototype.getKerningTables=function(n,e){if(this.font.tables.gpos)return this.getLookupTables(n,e,"kern",2)};var W_=Vr;function X_(n,e){const t=n.length;if(t!==e.length)return!1;for(let i=0;i<t;i++)if(n[i]!==e[i])return!1;return!0}function q_(n,e,t){let i=0,r=n.length-1,s=null;for(;i<=r;){const a=Math.floor((i+r)/2),o=n[a],l=o[e];if(l<t)i=a+1;else if(l>t)r=a-1;else{s=o;break}}return s}function Y_(n,e,t){let i=0,r=n.length-1;for(;i<=r;){const s=Math.floor((i+r)/2),a=n[s];if(a[e]<t)i=s+1;else if(a[e]>t)r=s-1;else return s}return-1}function j_(n,e,t){let i=0,r=n.length;const s=(a,o)=>a[e]-o[e];for(;i<r;){const a=i+r>>>1;s(n[a],t)<0?i=a+1:r=a}return n.splice(i,0,t),i}function hh(n){return n[0]===31&&n[1]===139&&n[2]===8}function $_(n){const e=new DataView(n.buffer,n.byteOffset,n.byteLength);let t=10;const i=n.byteLength-8,r=e.getInt8(3);if(r&4&&(t+=2+e.getUint16(t,!0)),r&8)for(;t<i&&n[t++]!==0;);if(r&16)for(;t<i&&n[t++]!==0;);if(r&2&&(t+=2),t>=i)throw new Error("Can't find compressed blocks");const s=e.getUint32(e.byteLength-4,!0);return Tu(n.subarray(t,i),new Uint8Array(s))}function dc(n){return{x:n.x,y:n.y,onCurve:n.onCurve,lastPointOfContour:n.lastPointOfContour}}function Z_(n){return{glyphIndex:n.glyphIndex,xScale:n.xScale,scale01:n.scale01,scale10:n.scale10,yScale:n.yScale,dx:n.dx,dy:n.dy}}function nn(n){Zs.call(this,n,"gsub")}function Po(n,e,t){const i=n.subtables;for(let r=0;r<i.length;r++){const s=i[r];if(s.substFormat===e)return s}if(t)return i.push(t),t}nn.prototype=Zs.prototype;nn.prototype.createDefaultTable=function(){return{version:1,scripts:[{tag:"DFLT",script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}};nn.prototype.getSingle=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,1);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage);let u;if(l.substFormat===1){const f=l.deltaGlyphId;for(u=0;u<c.length;u++){const h=c[u];i.push({sub:h,by:h+f})}}else{const f=l.substitute;for(u=0;u<c.length;u++)i.push({sub:c[u],by:f[u]})}}}return i};nn.prototype.getMultiple=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,2);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage);let u;for(u=0;u<c.length;u++){const f=c[u],h=l.sequences[u];i.push({sub:f,by:h})}}}return i};nn.prototype.getAlternates=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,3);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage),u=l.alternateSets;for(let f=0;f<c.length;f++)i.push({sub:c[f],by:u[f]})}}return i};nn.prototype.getLigatures=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,4);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage),u=l.ligatureSets;for(let f=0;f<c.length;f++){const h=c[f],d=u[f];for(let p=0;p<d.length;p++){const x=d[p];i.push({sub:[h].concat(x.components),by:x.ligGlyph})}}}}return i};nn.prototype.addSingle=function(n,e,t,i){const r=this.getLookupTables(t,i,n,1,!0)[0],s=Po(r,2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});Ve.assert(s.coverage.format===1,"Single: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.substitute.splice(o,0,0)),s.substitute[o]=e.by};nn.prototype.addMultiple=function(n,e,t,i){Ve.assert(e.by instanceof Array&&e.by.length>1,'Multiple: "by" must be an array of two or more ids');const r=this.getLookupTables(t,i,n,2,!0)[0],s=Po(r,1,{substFormat:1,coverage:{format:1,glyphs:[]},sequences:[]});Ve.assert(s.coverage.format===1,"Multiple: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.sequences.splice(o,0,0)),s.sequences[o]=e.by};nn.prototype.addAlternate=function(n,e,t,i){const r=this.getLookupTables(t,i,n,3,!0)[0],s=Po(r,1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});Ve.assert(s.coverage.format===1,"Alternate: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.alternateSets.splice(o,0,0)),s.alternateSets[o]=e.by};nn.prototype.addLigature=function(n,e,t,i){const r=this.getLookupTables(t,i,n,4,!0)[0];let s=r.subtables[0];s||(s={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},r.subtables[0]=s),Ve.assert(s.coverage.format===1,"Ligature: unable to modify coverage table format "+s.coverage.format);const a=e.sub[0],o=e.sub.slice(1),l={ligGlyph:e.by,components:o};let c=this.binSearch(s.coverage.glyphs,a);if(c>=0){const u=s.ligatureSets[c];for(let f=0;f<u.length;f++)if(X_(u[f].components,o))return;u.push(l)}else c=-1-c,s.coverage.glyphs.splice(c,0,a),s.ligatureSets.splice(c,0,[l])};nn.prototype.getFeature=function(n,e,t){if(/ss\d\d/.test(n))return this.getSingle(n,e,t);switch(n){case"aalt":case"salt":return this.getSingle(n,e,t).concat(this.getAlternates(n,e,t));case"dlig":case"liga":case"rlig":return this.getLigatures(n,e,t);case"ccmp":return this.getMultiple(n,e,t).concat(this.getLigatures(n,e,t));case"stch":return this.getMultiple(n,e,t)}};nn.prototype.add=function(n,e,t,i){if(/ss\d\d/.test(n))return this.addSingle(n,e,t,i);switch(n){case"aalt":case"salt":return typeof e.by=="number"?this.addSingle(n,e,t,i):this.addAlternate(n,e,t,i);case"dlig":case"liga":case"rlig":return this.addLigature(n,e,t,i);case"ccmp":return e.by instanceof Array?this.addMultiple(n,e,t,i):this.addLigature(n,e,t,i)}};var K_=nn,fh=class{constructor(n){this.defaultValue=255,this.font=n}cpal(){return this.font.tables&&this.font.tables.cpal?this.font.tables.cpal:!1}getAll(n){const e=[],t=this.cpal();if(!t)return e;for(let i=0;i<t.colorRecordIndices.length;i++){const r=t.colorRecordIndices[i],s=[];for(let a=r;a<r+t.numPaletteEntries;a++)s.push(tr(t.colorRecords[a],n||"hexa"));e.push(s)}return e}toCPALcolor(n){return Array.isArray(n)?n.map(e=>Gs(e,"raw")):Gs(n,"raw")}fillPalette(n,e=[],t=this.cpal().numPaletteEntries){return n=Number.isInteger(n)?this.get(n,"raw"):n,Object.assign(Array(t).fill(this.defaultValue),this.toCPALcolor(n).concat(this.toCPALcolor(e)))}extend(n){if(this.ensureCPAL(Array(n).fill(this.defaultValue)))return;const e=this.cpal(),t=e.numPaletteEntries+n,i=this.getAll().map(r=>this.fillPalette(r,[],t));e.numPaletteEntries=t,e.colorRecords=this.toCPALcolor(i.flat()),this.updateIndices()}get(n,e="hexa"){return this.getAll(e)[n]||null}getColor(n,e=0,t="hexa"){return Eo(this.font,n,e,t)}setColor(n,e,t=0){n=parseInt(n),t=parseInt(t);let i=this.getAll("raw"),r=i[t];if(!r)throw Error(`paletteIndex ${t} out of range`);const s=this.cpal(),a=s.numPaletteEntries;Array.isArray(e)||(e=[e]),e.length+n>a&&(this.extend(e.length+n-a),i=this.getAll("raw"),r=i[t]);for(let o=0;o<e.length;o++)r[o+n]=this.toCPALcolor(e[o]);s.colorRecords=i.flat(),this.updateIndices()}add(n){if(this.ensureCPAL(n))return;const e=this.cpal(),t=e.numPaletteEntries;n&&n.length?(n=this.toCPALcolor(n),n.length>t?this.extend(n.length-t):n.length<t&&(n=this.fillPalette(n)),e.colorRecordIndices.push(e.colorRecords.length),e.colorRecords.push(...n)):(e.colorRecordIndices.push(e.colorRecords.length),e.colorRecords.push(...Array(t).fill(this.defaultValue)))}delete(n){const e=this.getAll("raw");delete e[n];const t=this.cpal();t.colorRecordIndices.pop(),t.colorRecords=e.flat()}deleteColor(n,e){if(n===e)throw Error("replacementIndex cannot be the same as colorIndex");const t=this.cpal(),i=this.getAll("raw"),r=[];if(e>t.numPaletteEntries-1)throw Error(`Replacement index out of range: numPaletteEntries after deletion: ${t.numPaletteEntries-1}, replacementIndex: ${e})`);for(let o=0;o<i.length;o++){const c=i[o].filter((u,f)=>f!==n);r.push(c)}const s=this.font.tables.colr;if(s){const o=s.layerRecords;for(let l=0;l<o.length;l++){const c=o[l].paletteIndex;if(c>n)o[l].paletteIndex-=1;else if(c===n){let u=0;for(let f=0;f<i.length;f++)if(e>n&&e<=n+i[f].length){u++;break}o[l].paletteIndex=e-u}}this.font.tables.colr={...s,layerRecords:o}}const a=r.flat();for(let o=0;o<i.length;o++)t.colorRecordIndices[o]-=o;t.numPaletteEntries=Math.max(0,t.numPaletteEntries-1),t.colorRecords=this.toCPALcolor(a)}ensureCPAL(n){return this.cpal()?!1:(!n||!n.length?n=[this.defaultValue]:n=this.toCPALcolor(n),this.font.tables.cpal={version:0,numPaletteEntries:n.length,colorRecords:n,colorRecordIndices:[0]},!0)}updateIndices(){const n=this.cpal(),e=Math.ceil(n.colorRecords.length/n.numPaletteEntries);n.colorRecordIndices=[];for(let t=0;t<e;t++)n.colorRecordIndices.push(t*n.numPaletteEntries)}},J_=class{constructor(n){this.font=n}ensureCOLR(){return this.font.tables.colr||(this.font.tables.colr={version:0,baseGlyphRecords:[],layerRecords:[]}),this.font}get(n){const e=this.font,t=[],i=e.tables.colr,r=e.tables.cpal;if(!i||!r)return t;const s=q_(i.baseGlyphRecords,"glyphID",n);if(!s)return t;const a=s.firstLayerIndex,o=s.numLayers;for(let l=0;l<o;l++){const c=i.layerRecords[a+l];t.push({glyph:e.glyphs.get(c.glyphID),paletteIndex:c.paletteIndex})}return t}add(n,e,t){const i=this.get(n);e=Array.isArray(e)?e:[e],t===void 0||t===1/0||t>i.length?t=i.length:t<0&&(t=i.length+1+t%(i.length+1),t>=i.length+1&&(t-=i.length+1));const r=[];for(let s=0;s<t;s++){const a=Number.isInteger(i[s].glyph)?i[s].glyph:i[s].glyph.index;r.push({glyphID:a,paletteIndex:i[s].paletteIndex})}for(const s of e){const a=Number.isInteger(s.glyph)?s.glyph:s.glyph.index;r.push({glyphID:a,paletteIndex:s.paletteIndex})}for(let s=t;s<i.length;s++){const a=Number.isInteger(i[s].glyph)?i[s].glyph:i[s].glyph.index;r.push({glyphID:a,paletteIndex:i[s].paletteIndex})}this.updateColrTable(n,r)}setPaletteIndex(n,e,t){let i=this.get(n);i[e]?(i=i.map((r,s)=>({glyphID:r.glyph.index,paletteIndex:s===e?t:r.paletteIndex})),this.updateColrTable(n,i)):console.error("Invalid layer index")}remove(n,e,t=e){let i=this.get(n);i=i.map(r=>({glyphID:r.glyph.index,paletteIndex:r.paletteIndex})),i.splice(e,t-e+1),this.updateColrTable(n,i)}updateColrTable(n,e){this.ensureCOLR();const i=this.font.tables.colr;let r=Y_(i.baseGlyphRecords,"glyphID",n);if(r===-1){const u={glyphID:n,firstLayerIndex:i.layerRecords.length,numLayers:0};r=j_(i.baseGlyphRecords,"glyphID",u)}const a=i.baseGlyphRecords[r],o=a.numLayers,l=e.length,c=l-o;if(c>0){const u=e.slice(o).map(f=>({glyphID:f.glyphID,paletteIndex:f.paletteIndex}));i.layerRecords.splice(a.firstLayerIndex+o,0,...u)}else c<0&&i.layerRecords.splice(a.firstLayerIndex+l,-c);for(let u=0;u<Math.min(o,l);u++)i.layerRecords[a.firstLayerIndex+u]={glyphID:e[u].glyphID,paletteIndex:e[u].paletteIndex};if(a.numLayers=l,c!==0)for(let u=0;u<i.baseGlyphRecords.length;u++){const f=i.baseGlyphRecords[u];u===r||f.firstLayerIndex<a.firstLayerIndex||(i.baseGlyphRecords[u].firstLayerIndex+=c)}}},Q_=class{constructor(n){this.font=n,this.cache=new WeakMap}get(n){const e=this.getOrCreateSvgImageCacheEntry(n);return e&&e.image}getAsync(n){const e=this.getOrCreateSvgImageCacheEntry(n);return e&&e.promise}getOrCreateSvgImageCacheEntry(n){const e=this.font.tables.svg;if(e===void 0)return;const t=e.get(n);if(t===void 0)return;let i=this.cache.get(t);i===void 0&&(i=ey(t),this.cache.set(t,i));let r=i.images.get(n);return r===void 0&&(r=ty(this.font,i.template,n),r.promise.then(s=>{if(r.image=s,typeof this.font.onGlyphUpdated=="function")try{this.font.onGlyphUpdated(n)}catch(a){console.error("font.onGlyphUpdated",n,a)}}),i.images.set(n,r)),r}};function ey(n){return{template:ny(n).then(sy),images:new Map}}function ty(n,e,t){return{promise:e.then(i=>{let r;typeof i=="string"?r=i:(i[4]=t,r=i.join(""));const s=ay(r,n.unitsPerEm);return s.image.decode().then(()=>s)}),image:void 0}}var ny=typeof DecompressionStream=="function"?ry:iy;function iy(n){try{return Promise.resolve(new TextDecoder().decode(hh(n)?$_(n):n))}catch(e){return Promise.reject(e)}}function ry(n){if(hh(n))return new Response(new Response(n).body.pipeThrough(new DecompressionStream("gzip"))).text();try{return Promise.resolve(new TextDecoder().decode(n))}catch(e){return Promise.reject(e)}}function sy(n){const e=n.indexOf("<svg"),t=n.indexOf(">",e+4)+1;if(/ id=['"]glyph\d+['"]/.test(n.substring(e,t)))return n;const i=n.lastIndexOf("</svg>");return[n.substring(0,t),"<defs>",n.substring(t,i),'</defs><use href="#glyph',"",'"/>',n.substring(i)]}function ay(n,e){const i=new DOMParser().parseFromString(n,"image/svg+xml").documentElement,r=i.viewBox.baseVal,s=i.width.baseVal,a=i.height.baseVal;let o=1,l=1;r.width>0&&r.height>0&&(s.unitType===1?(o=s.valueInSpecifiedUnits/r.width,l=a.unitType===1?a.valueInSpecifiedUnits/r.height:o):a.unitType===1?(l=a.valueInSpecifiedUnits/r.height,o=l):e&&(o=e/r.width,l=e/r.height));const c=document.createElement("div");c.style.position="fixed",c.style.visibility="hidden",c.appendChild(i),document.body.appendChild(c);const u=i.getBBox();document.body.removeChild(c);const f=(u.x-r.x)*o,h=(r.y-u.y)*l,d=u.width*o,p=u.height*l;i.setAttribute("viewBox",[u.x,u.y,u.width,u.height].join(" ")),o!==1&&i.setAttribute("width",d),l!==1&&i.setAttribute("height",p);const x=new Image(d,p);return x.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(i.outerHTML),{leftSideBearing:f,baseline:h,image:x}}var Oa=new WeakMap;function pc(n,e,t,i,r){let s;return(e&i)>0?(s=n.parseByte(),(e&r)===0&&(s=-s),s=t+s):(e&r)>0?s=t:s=t+n.parseShort(),s}function dh(n,e,t){const i=new Le.Parser(e,t);n._numberOfContours=i.parseShort(),n._xMin=i.parseShort(),n._yMin=i.parseShort(),n._xMax=i.parseShort(),n._yMax=i.parseShort();let r,s;if(n._numberOfContours>0){const a=n.endPointIndices=[];for(let l=0;l<n._numberOfContours;l+=1)a.push(i.parseUShort());n.instructionLength=i.parseUShort(),n.instructions=[];for(let l=0;l<n.instructionLength;l+=1)n.instructions.push(i.parseByte());const o=a[a.length-1]+1;r=[];for(let l=0;l<o;l+=1)if(s=i.parseByte(),r.push(s),(s&8)>0){const c=i.parseByte();for(let u=0;u<c;u+=1)r.push(s),l+=1}if(Ve.argument(r.length===o,"Bad flags."),a.length>0){const l=[];let c;if(o>0){for(let h=0;h<o;h+=1)s=r[h],c={},c.onCurve=!!(s&1),c.lastPointOfContour=a.indexOf(h)>=0,l.push(c);let u=0;for(let h=0;h<o;h+=1)s=r[h],c=l[h],c.x=pc(i,s,u,2,16),u=c.x;let f=0;for(let h=0;h<o;h+=1)s=r[h],c=l[h],c.y=pc(i,s,f,4,32),f=c.y}n.points=l}else n.points=[]}else if(n._numberOfContours===0)n.points=[];else{n.isComposite=!0,n.points=[],n.components=[];let a=!0;for(;a;){r=i.parseUShort();const o={glyphIndex:i.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(r&1)>0?(r&2)>0?(o.dx=i.parseShort(),o.dy=i.parseShort()):o.matchedPoints=[i.parseUShort(),i.parseUShort()]:(r&2)>0?(o.dx=i.parseChar(),o.dy=i.parseChar()):o.matchedPoints=[i.parseByte(),i.parseByte()],(r&8)>0?o.xScale=o.yScale=i.parseF2Dot14():(r&64)>0?(o.xScale=i.parseF2Dot14(),o.yScale=i.parseF2Dot14()):(r&128)>0&&(o.xScale=i.parseF2Dot14(),o.scale01=i.parseF2Dot14(),o.scale10=i.parseF2Dot14(),o.yScale=i.parseF2Dot14()),n.components.push(o),a=!!(r&32)}if(r&256){n.instructionLength=i.parseUShort(),n.instructions=[];for(let o=0;o<n.instructionLength;o+=1)n.instructions.push(i.parseByte())}}}function As(n,e){const t=[];for(let i=0;i<n.length;i+=1){const r=n[i],s={x:e.xScale*r.x+e.scale10*r.y+e.dx,y:e.scale01*r.x+e.yScale*r.y+e.dy,onCurve:r.onCurve,lastPointOfContour:r.lastPointOfContour};t.push(s)}return t}function oy(n){const e=[];let t=[];for(let i=0;i<n.length;i+=1){const r=n[i];t.push(r),r.lastPointOfContour&&(e.push(t),t=[])}return Ve.argument(t.length===0,"There are still points left in the current contour."),e}function Lo(n){const e=new Ki;if(!n)return e;const t=oy(n);for(let i=0;i<t.length;++i){const r=t[i];let s=r[r.length-1],a=r[0];if(s.onCurve)e.moveTo(s.x,s.y);else if(a.onCurve)e.moveTo(a.x,a.y);else{const o={x:(s.x+a.x)*.5,y:(s.y+a.y)*.5};e.moveTo(o.x,o.y)}for(let o=0;o<r.length;++o)if(s=a,a=r[(o+1)%r.length],s.onCurve)e.lineTo(s.x,s.y);else{let l=a;a.onCurve||(l={x:(s.x+a.x)*.5,y:(s.y+a.y)*.5}),e.quadraticCurveTo(s.x,s.y,l.x,l.y)}e.closePath()}return e}function ph(n,e){if(e.isComposite){Oa.has(n)||Oa.set(n,new Set);const t=Oa.get(n);t.add(e.index);try{for(let i=0;i<e.components.length;i+=1){const r=e.components[i];if(t.has(r.glyphIndex))continue;const s=n.get(r.glyphIndex);if(s.getPath(),s.points){let a;if(r.matchedPoints===void 0)a=As(s.points,r);else{if(r.matchedPoints[0]>e.points.length-1||r.matchedPoints[1]>s.points.length-1)throw Error("Matched points out of range in "+e.name);const o=e.points[r.matchedPoints[0]];let l=s.points[r.matchedPoints[1]];const c={xScale:r.xScale,scale01:r.scale01,scale10:r.scale10,yScale:r.yScale,dx:0,dy:0};l=As([l],c)[0],c.dx=o.x-l.x,c.dy=o.y-l.y,a=As(s.points,c)}e.points=e.points.concat(a)}}}finally{t.delete(e.index)}}return Lo(e.points)}function ly(n,e,t,i){const r=new Cn.GlyphSet(i);for(let s=0;s<t.length-1;s+=1){const a=t[s],o=t[s+1];a!==o?r.push(s,Cn.ttfGlyphLoader(i,s,dh,n,e+a,ph)):r.push(s,Cn.glyphLoader(i,s))}return r}function cy(n,e,t,i){const r=new Cn.GlyphSet(i);return i._push=function(s){const a=t[s],o=t[s+1];a!==o?r.push(s,Cn.ttfGlyphLoader(i,s,dh,n,e+a,ph)):r.push(s,Cn.glyphLoader(i,s))},r}function uy(n,e,t,i,r){return r.lowMemory?cy(n,e,t,i):ly(n,e,t,i)}var mh={getPath:Lo,parse:uy},hy=class{constructor(n){this.font=n}normalizeCoordTags(n){for(const e in n)if(e.length<4){const t=e.padEnd(4," ");n[t]===void 0&&(n[t]=n[e]),delete n[e]}}getNormalizedCoords(n){n||(n=this.font.variation.get());let e=[];this.normalizeCoordTags(n);for(let t=0;t<this.fvar().axes.length;t++){const i=this.fvar().axes[t];let r=n[i.tag];r===void 0&&(r=i.defaultValue),r<i.defaultValue?e.push((r-i.defaultValue+Number.EPSILON)/(i.defaultValue-i.minValue+Number.EPSILON)):e.push((r-i.defaultValue+Number.EPSILON)/(i.maxValue-i.defaultValue+Number.EPSILON))}if(this.avar())for(let t=0;t<this.avar().axisSegmentMaps.length;t++){let i=this.avar().axisSegmentMaps[t];for(let r=0;r<i.axisValueMaps.length;r++){let s=i.axisValueMaps[r];if(r>=1&&e[t]<s.fromCoordinate){let a=i.axisValueMaps[r-1];e[t]=((e[t]-a.fromCoordinate)*(s.toCoordinate-a.toCoordinate)+Number.EPSILON)/(s.fromCoordinate-a.fromCoordinate+Number.EPSILON)+a.toCoordinate;break}}}return e}interpolatePoints(n,e,t){if(n.length===0)return;let i=0;for(;i<n.length;){let r=i,s=i,a=n[s];for(;!a.lastPointOfContour;)a=n[++s];for(;i<=s&&!t[i];)i++;if(i>s)continue;let o=i,l=i;for(i++;i<=s;)t[i]&&(this.deltaInterpolate(l+1,i-1,l,i,e,n),l=i),i++;l===o?this.deltaShift(r,s,l,e,n):(this.deltaInterpolate(l+1,s,l,o,e,n),o>0&&this.deltaInterpolate(r,o-1,l,o,e,n)),i=s+1}}deltaInterpolate(n,e,t,i,r,s){if(n>e)return;let a=["x","y"];for(let l=0;l<a.length;l++){let c=a[l];if(r[t][c]>r[i][c]){var o=t;t=i,i=o}let u=r[t][c],f=r[i][c],h=s[t][c],d=s[i][c];if(u!==f||h===d){let p=u===f?0:(d-h)/(f-u);for(let x=n;x<=e;x++){let m=r[x][c];m<=u?m+=h-u:m>=f?m+=d-f:m=h+(m-u)*p,s[x][c]=m}}}}deltaShift(n,e,t,i,r){let s=r[t].x-i[t].x,a=r[t].y-i[t].y;if(!(s===0&&a===0))for(let o=n;o<=e;o++)o!==t&&(r[o].x+=s,r[o].y+=a)}transformComponents(n,e,t,i,r,s){let a=0;for(let o=0;o<n.components.length;o++){const l=n.components[o],c=this.font.glyphs.get(l.glyphIndex),u=Z_(l),f=i.indexOf(o);f>-1&&(u.dx+=Math.round(r.deltas[f]*s),u.dy+=Math.round(r.deltasY[f]*s));const h=As(this.getTransform(c,t).points,u);e.splice(a,h.length,...h),a+=c.points.length}}applyTupleVariationStore(n,e,t,i="gvar",r={}){t||(t=this.font.variation.get());const s=this.getNormalizedCoords(t),{headers:a,sharedPoints:o}=n,l=this.fvar().axes.length;let c;i==="gvar"?c=e.map(dc):i==="cvar"&&(c=[...e]);for(let u=0;u<a.length;u++){const f=a[u];let h=1;for(let p=0;p<l;p++){let x=[0];switch(i){case"gvar":x=f.peakTuple?f.peakTuple:this.gvar().sharedTuples[f.sharedTupleRecordsIndex];break;case"cvar":x=f.peakTuple;break}if(x[p]!==0){if(s[p]===0){h=0;break}if(f.intermediateStartTuple)if(s[p]<f.intermediateStartTuple[p]||s[p]>f.intermediateEndTuple[p]){h=0;break}else s[p]<x[p]?h=h*(s[p]-f.intermediateStartTuple[p]+Number.EPSILON)/(x[p]-f.intermediateStartTuple[p]+Number.EPSILON):h=h*(f.intermediateEndTuple[p]-s[p]+Number.EPSILON)/(f.intermediateEndTuple[p]-x[p]+Number.EPSILON);else{if(s[p]<Math.min(0,x[p])||s[p]>Math.max(0,x[p])){h=0;break}h=(h*s[p]+Number.EPSILON)/(x[p]+Number.EPSILON)}}}if(h===0)continue;const d=f.privatePoints.length?f.privatePoints:o;if(i==="gvar"&&r.glyph&&r.glyph.isComposite)this.transformComponents(r.glyph,c,t,d,f,h);else if(d.length===0)for(let p=0;p<c.length;p++){const x=c[p];i==="gvar"?c[p]={x:Math.round(x.x+f.deltas[p]*h),y:Math.round(x.y+f.deltasY[p]*h),onCurve:x.onCurve,lastPointOfContour:x.lastPointOfContour}:i==="cvar"&&(c[p]=Math.round(x+f.deltas[p]*h))}else{let p;i==="gvar"?p=c.map(dc):i==="cvar"&&(p=c);const x=Array(e.length).fill(!1);for(let m=0;m<d.length;m++){let g=d[m];if(g<e.length){let _=p[g];i==="gvar"?(x[g]=!0,_.x+=f.deltas[m]*h,_.y+=f.deltasY[m]*h):i==="cvar"&&(c[g]=Math.round(_+f.deltas[m]*h))}}if(i==="gvar"){this.interpolatePoints(p,c,x);for(let m=0;m<e.length;m++){let g=p[m].x-c[m].x,_=p[m].y-c[m].y;c[m].x=Math.round(c[m].x+g),c[m].y=Math.round(c[m].y+_)}}}}return c}getTransform(n,e){Number.isInteger(n)&&(n=this.font.glyphs.get(n));const t=n.getBlendPath,i=!!(n.points&&n.points.length);let r=n;if(t||i){if(e||(e=this.font.variation.get()),i){const s=this.gvar()&&this.gvar().glyphVariations[n.index];if(s){const a=n.points;let o=this.applyTupleVariationStore(s,a,e,"gvar",{glyph:n});r=new Ir(Object.assign({},n,{points:o,path:Lo(o)}))}}else if(t){const s=n.getBlendPath(e);r=new Ir(Object.assign({},n,{path:s}))}}return this.font.tables.hvar&&(n._advanceWidth=typeof n._advanceWidth<"u"?n._advanceWidth:n.advanceWidth,n.advanceWidth=r.advanceWidth=Math.round(n._advanceWidth+this.getVariableAdjustment(r.index,"hvar","advanceWidth",e)),n._leftSideBearing=typeof n._leftSideBearing<"u"?n._leftSideBearing:n.leftSideBearing,n.leftSideBearing=r.leftSideBearing=Math.round(n._leftSideBearing+this.getVariableAdjustment(r.index,"hvar","lsb",e))),r}getCvarTransform(n){const e=this.font.tables.cvt,t=this.cvar();return!e||!e.length||!t||!t.headers.length?e:this.applyTupleVariationStore(t,e,n,"cvar")}getVariableAdjustment(n,e,t,i){i=i||this.font.variation.get();let r,s;const a=this.font.tables[e];if(!a)throw Error(`trying to get variation adjustment from non-existent table "${a}"`);if(!a.itemVariationStore)throw Error(`trying to get variation adjustment from table "${a}" which does not have an itemVariationStore`);const o=a[t]&&a[t].map.length;if(o){let l=n;l>=o&&(l=o-1),{outerIndex:r,innerIndex:s}=a[t].map[l]}else r=0,s=n;return this.getDelta(a.itemVariationStore,r,s,i)}getDelta(n,e,t,i){if(e>=n.itemVariationSubtables.length)return 0;let r=n.itemVariationSubtables[e];if(t>=r.deltaSets.length)return 0;let s=r.deltaSets[t],a=this.getBlendVector(n,e,i),o=0;for(let l=0;l<r.regionIndexes.length;l++)o+=s[l]*a[l];return o}getBlendVector(n,e,t){t||(t=this.font.variation.get());let i=n.itemVariationSubtables[e];const r=this.getNormalizedCoords(t);let s=[];for(let a=0;a<i.regionIndexes.length;a++){let o=1,l=i.regionIndexes[a],c=n.variationRegions[l].regionAxes;for(let u=0;u<c.length;u++){let f=c[u],h;f.startCoord>f.peakCoord||f.peakCoord>f.endCoord||f.startCoord<0&&f.endCoord>0&&f.peakCoord!==0||f.peakCoord===0?h=1:r[u]<f.startCoord||r[u]>f.endCoord?h=0:r[u]===f.peakCoord?h=1:r[u]<f.peakCoord?h=(r[u]-f.startCoord+Number.EPSILON)/(f.peakCoord-f.startCoord+Number.EPSILON):h=(f.endCoord-r[u]+Number.EPSILON)/(f.endCoord-f.peakCoord+Number.EPSILON),o*=h}s[a]=o}return s}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},fy=class{constructor(n){this.font=n,this.process=new hy(this.font),this.activateDefaultVariation(),this.getTransform=this.process.getTransform.bind(this.process)}activateDefaultVariation(){const n=this.getDefaultInstanceIndex();n>-1?this.set(n):this.set(this.getDefaultCoordinates())}getDefaultCoordinates(){return this.fvar().axes.reduce((n,e)=>(n[e.tag]=e.defaultValue,n),{})}getDefaultInstanceIndex(){const n=this.getDefaultCoordinates();let e=this.getInstanceIndex(n);return e<0&&(e=this.fvar().instances.findIndex(t=>t.name&&t.name.en==="Regular")),e}getInstanceIndex(n){return this.fvar().instances.findIndex(e=>Object.keys(n).every(t=>e.coordinates[t]===n[t]))}getInstance(n){return this.fvar().instances&&this.fvar().instances[n]}set(n){let e;if(Number.isInteger(n)){const t=this.getInstance(n);if(!t)throw Error(`Invalid instance index ${n}`);e={...t.coordinates}}else e=n,this.process.normalizeCoordTags(e);e=Object.assign({},this.font.defaultRenderOptions.variation,e),this.font.defaultRenderOptions=Object.assign({},this.font.defaultRenderOptions,{variation:e})}get(){return Object.assign({},this.font.defaultRenderOptions.variation)}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},mc=1e6,Vs=64,Hs=1e4,gh,vi,xh,ao;function vh(n){this.font=n,this.getCommands=function(e){return mh.getPath(e).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function dy(n){return n}function _h(n){return Math.sign(n)*Math.round(Math.abs(n))}function py(n){return Math.sign(n)*Math.round(Math.abs(n*2))/2}function my(n){return Math.sign(n)*(Math.round(Math.abs(n)+.5)-.5)}function gy(n){return Math.sign(n)*Math.ceil(Math.abs(n))}function xy(n){return Math.sign(n)*Math.floor(Math.abs(n))}var yh=function(n){const e=this.srPeriod;let t=this.srPhase;const i=this.srThreshold;let r=1;return n<0&&(n=-n,r=-1),n+=i-t,n=Math.trunc(n/e)*e,n+=t,n<0?t*r:n*r},An={x:1,y:0,axis:"x",distance:function(n,e,t,i){return(t?n.xo:n.x)-(i?e.xo:e.x)},interpolate:function(n,e,t,i){let r,s,a,o,l,c,u;if(!i||i===this){if(r=n.xo-e.xo,s=n.xo-t.xo,l=e.x-e.xo,c=t.x-t.xo,a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){n.x=n.xo+(l+c)/2;return}n.x=n.xo+(l*o+c*a)/u;return}if(r=i.distance(n,e,!0,!0),s=i.distance(n,t,!0,!0),l=i.distance(e,e,!1,!0),c=i.distance(t,t,!1,!0),a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){An.setRelative(n,n,(l+c)/2,i,!0);return}An.setRelative(n,n,(l*o+c*a)/u,i,!0)},normalSlope:Number.NEGATIVE_INFINITY,setRelative:function(n,e,t,i,r){if(!i||i===this){n.x=(r?e.xo:e.x)+t;return}const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y;n.x=o+(n.y-l)/i.normalSlope},slope:0,touch:function(n){n.xTouched=!0},touched:function(n){return n.xTouched},untouch:function(n){n.xTouched=!1}},Nn={x:0,y:1,axis:"y",distance:function(n,e,t,i){return(t?n.yo:n.y)-(i?e.yo:e.y)},interpolate:function(n,e,t,i){let r,s,a,o,l,c,u;if(!i||i===this){if(r=n.yo-e.yo,s=n.yo-t.yo,l=e.y-e.yo,c=t.y-t.yo,a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){n.y=n.yo+(l+c)/2;return}n.y=n.yo+(l*o+c*a)/u;return}if(r=i.distance(n,e,!0,!0),s=i.distance(n,t,!0,!0),l=i.distance(e,e,!1,!0),c=i.distance(t,t,!1,!0),a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){Nn.setRelative(n,n,(l+c)/2,i,!0);return}Nn.setRelative(n,n,(l*o+c*a)/u,i,!0)},normalSlope:0,setRelative:function(n,e,t,i,r){if(!i||i===this){n.y=(r?e.yo:e.y)+t;return}const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y;n.y=l+i.normalSlope*(n.x-o)},slope:Number.POSITIVE_INFINITY,touch:function(n){n.yTouched=!0},touched:function(n){return n.yTouched},untouch:function(n){n.yTouched=!1}};Object.freeze(An);Object.freeze(Nn);function Hr(n,e){this.x=n,this.y=e,this.axis=void 0,this.slope=e/n,this.normalSlope=-n/e,Object.freeze(this)}Hr.prototype.distance=function(n,e,t,i){return this.x*An.distance(n,e,t,i)+this.y*Nn.distance(n,e,t,i)};Hr.prototype.interpolate=function(n,e,t,i){let r,s,a,o,l,c,u;if(a=i.distance(n,e,!0,!0),o=i.distance(n,t,!0,!0),r=i.distance(e,e,!1,!0),s=i.distance(t,t,!1,!0),l=Math.abs(a),c=Math.abs(o),u=l+c,u===0){this.setRelative(n,n,(r+s)/2,i,!0);return}this.setRelative(n,n,(r*c+s*l)/u,i,!0)};Hr.prototype.setRelative=function(n,e,t,i,r){i=i||this;const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y,c=i.normalSlope,u=this.slope,f=n.x,h=n.y;n.x=(u*f-c*o+l-h)/(u-c),n.y=u*(n.x-f)+h};Hr.prototype.touch=function(n){n.xTouched=!0,n.yTouched=!0};function Wr(n,e){const t=Math.sqrt(n*n+e*e);return n/=t,e/=t,n===1&&e===0?An:n===0&&e===1?Nn:new Hr(n,e)}function Bn(n,e,t,i){this.x=this.xo=Math.round(n*64)/64,this.y=this.yo=Math.round(e*64)/64,this.lastPointOfContour=t,this.onCurve=i,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}Bn.prototype.nextTouched=function(n){let e=this.nextPointOnContour;for(;!n.touched(e)&&e!==this;)e=e.nextPointOnContour;return e};Bn.prototype.prevTouched=function(n){let e=this.prevPointOnContour;for(;!n.touched(e)&&e!==this;)e=e.prevPointOnContour;return e};var Ur=Object.freeze(new Bn(0,0)),vy={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function ei(n,e){switch(this.env=n,this.stack=[],this.prog=e,n){case"glyf":this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case"prep":this.fv=this.pv=this.dpv=An,this.round=_h}}vh.prototype.exec=function(n,e){if(typeof e!="number")throw new Error("Point size is not a number!");if(this._errorState>2)return;const t=this.font;let i=this._prepState;if(!i||i.ppem!==e){let r=this._fpgmState;if(!r){ei.prototype=vy,r=this._fpgmState=new ei("fpgm",t.tables.fpgm),r.funcs=[],r.font=t,r.instructionCount=0,r.callDepth=0;try{vi(r)}catch(a){console.log("Hinting error in FPGM:"+a),this._errorState=3;return}}ei.prototype=r,i=this._prepState=new ei("prep",t.tables.prep),i.ppem=e,i.instructionCount=0,i.callDepth=0;const s=t.variation&&t.variation.process.getCvarTransform()||t.tables.cvt;if(s){const a=i.cvt=new Array(s.length),o=e/t.unitsPerEm;for(let l=0;l<s.length;l++)a[l]=s[l]*o}else i.cvt=[];try{vi(i)}catch(a){this._errorState<2&&console.log("Hinting error in PREP:"+a),this._errorState=2}}if(!(this._errorState>1))try{return xh(n,i)}catch(r){this._errorState<1&&(console.log("Hinting error:"+r),console.log("Note: further hinting errors are silenced")),this._errorState=1;return}};xh=function(n,e){const t=e.ppem/e.font.unitsPerEm,i=t;let r=n.components,s,a,o;if(ei.prototype=e,!r)o=new ei("glyf",n.instructions),o.instructionCount=0,o.callDepth=0,ao(n,o,t,i),a=o.gZone;else{const l=e.font;a=[],s=[];for(let c=0;c<r.length;c++){const u=r[c],f=l.glyphs.get(u.glyphIndex);o=new ei("glyf",f.instructions),o.instructionCount=0,o.callDepth=0,ao(f,o,t,i);const h=Math.round(u.dx*t),d=Math.round(u.dy*i),p=o.gZone,x=o.contours;for(let g=0;g<p.length;g++){const _=p[g];_.xTouched=_.yTouched=!1,_.xo=_.x=_.x+h,_.yo=_.y=_.y+d}const m=a.length;a.push.apply(a,p);for(let g=0;g<x.length;g++)s.push(x[g]+m)}n.instructions&&!o.inhibitGridFit&&(o=new ei("glyf",n.instructions),o.gZone=o.z0=o.z1=o.z2=a,o.contours=s,a.push(new Bn(0,0),new Bn(Math.round(n.advanceWidth*t),0)),vi(o),a.length-=2)}return a};ao=function(n,e,t,i){const r=n.points||[],s=r.length,a=e.gZone=e.z0=e.z1=e.z2=[],o=e.contours=[];let l;for(let f=0;f<s;f++)l=r[f],a[f]=new Bn(l.x*t,l.y*i,l.lastPointOfContour,l.onCurve);let c,u;for(let f=0;f<s;f++)l=a[f],c||(c=l,o.push(f)),l.lastPointOfContour?(l.nextPointOnContour=c,c.prevPointOnContour=l,c=void 0):(u=a[f+1],l.nextPointOnContour=u,u.prevPointOnContour=l);e.inhibitGridFit||(a.push(new Bn(0,0),new Bn(Math.round(n.advanceWidth*t),0)),vi(e),a.length-=2)};vi=function(n){let e=n.prog;if(!e)return;const t=e.length;let i;for(n.ip=0;n.ip<t;n.ip++){if(++n.instructionCount>mc)throw new Error("Hinting instructions exceeded maximum of "+mc);if(i=gh[e[n.ip]],!i)throw new Error("unknown instruction: 0x"+Number(e[n.ip]).toString(16));i(n)}};function Ks(n){const e=n.tZone=new Array(n.gZone.length);for(let t=0;t<e.length;t++)e[t]=new Bn(0,0)}function Sh(n,e){const t=n.prog;let i=n.ip,r=1,s;do if(s=t[++i],s===88)r++;else if(s===89)r--;else if(s===64)i+=t[i+1]+1;else if(s===65)i+=2*t[i+1]+1;else if(s>=176&&s<=183)i+=s-176+1;else if(s>=184&&s<=191)i+=(s-184+1)*2;else if(e&&r===1&&s===27)break;while(r>0);n.ip=i}function gc(n,e){e.fv=e.pv=e.dpv=n}function xc(n,e){e.pv=e.dpv=n}function vc(n,e){e.fv=n}function _c(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.pv=e.dpv=Wr(o,l)}function yc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.fv=Wr(o,l)}function _y(n){const e=n.stack,t=e.pop(),i=e.pop();n.pv=n.dpv=Wr(i,t)}function yy(n){const e=n.stack,t=e.pop(),i=e.pop();n.fv=Wr(i,t)}function Sy(n){const e=n.stack,t=n.pv;e.push(t.x*16384),e.push(t.y*16384)}function by(n){const e=n.stack,t=n.fv;e.push(t.x*16384),e.push(t.y*16384)}function Ty(n){n.fv=n.pv}function My(n){const e=n.stack,t=e.pop(),i=e.pop(),r=e.pop(),s=e.pop(),a=e.pop(),o=n.z0,l=n.z1,c=o[t],u=o[i],f=l[r],h=l[s],d=n.z2[a],p=c.x,x=c.y,m=u.x,g=u.y,_=f.x,v=f.y,S=h.x,R=h.y,M=(p-m)*(v-R)-(x-g)*(_-S),w=p*g-x*m,y=_*R-v*S;d.x=(w*(_-S)-y*(p-m))/M,d.y=(w*(v-R)-y*(x-g))/M}function Ey(n){n.rp0=n.stack.pop()}function Ay(n){n.rp1=n.stack.pop()}function Cy(n){n.rp2=n.stack.pop()}function Ry(n){const e=n.stack.pop();switch(n.zp0=e,e){case 0:n.tZone||Ks(n),n.z0=n.tZone;break;case 1:n.z0=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function wy(n){const e=n.stack.pop();switch(n.zp1=e,e){case 0:n.tZone||Ks(n),n.z1=n.tZone;break;case 1:n.z1=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function Py(n){const e=n.stack.pop();switch(n.zp2=e,e){case 0:n.tZone||Ks(n),n.z2=n.tZone;break;case 1:n.z2=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function Ly(n){const e=n.stack.pop();switch(n.zp0=n.zp1=n.zp2=e,e){case 0:n.tZone||Ks(n),n.z0=n.z1=n.z2=n.tZone;break;case 1:n.z0=n.z1=n.z2=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function Dy(n){n.loop=n.stack.pop(),n.loop>Hs&&(n.loop=Hs)}function Iy(n){n.round=_h}function Uy(n){n.round=my}function Fy(n){const e=n.stack.pop();n.minDis=e/64}function Oy(n){Sh(n,!1)}function Ny(n){const e=n.stack.pop();n.ip+=e-1}function ky(n){const e=n.stack.pop();n.cvCutIn=e/64}function By(n){const e=n.stack;e.push(e[e.length-1])}function Na(n){n.stack.pop()}function Gy(n){n.stack.length=0}function zy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t),e.push(i)}function Vy(n){const e=n.stack;e.push(e.length)}function Hy(n){const e=n.stack,t=e.pop();let i=e.pop();if(i>Hs&&(i=Hs),++n.callDepth>Vs)throw new Error("Hinting call depth exceeded maximum of "+Vs);const r=n.ip,s=n.prog;n.prog=n.funcs[t];for(let a=0;a<i;a++)vi(n);n.ip=r,n.prog=s,n.callDepth--}function Wy(n){const e=n.stack.pop();if(++n.callDepth>Vs)throw new Error("Hinting call depth exceeded maximum of "+Vs);const t=n.ip,i=n.prog;n.prog=n.funcs[e],vi(n),n.ip=t,n.prog=i,n.callDepth--}function Xy(n){const e=n.stack,t=e.pop();e.push(e[e.length-t])}function qy(n){const e=n.stack,t=e.pop();e.push(e.splice(e.length-t,1)[0])}function Yy(n){if(n.env!=="fpgm")throw new Error("FDEF not allowed here");const e=n.stack,t=n.prog;let i=n.ip;const r=e.pop(),s=i;for(;t[++i]!==45;);n.ip=i,n.funcs[r]=t.slice(s+1,i)}function Sc(n,e){const t=e.stack.pop(),i=e.z0[t],r=e.fv,s=e.pv;let a=s.distance(i,Ur);n&&(a=e.round(a)),r.setRelative(i,Ur,a,s),r.touch(i),e.rp0=e.rp1=t}function bc(n,e){const t=e.z2,i=t.length-2;let r,s,a;for(let o=0;o<i;o++)r=t[o],!n.touched(r)&&(s=r.prevTouched(n),s!==r&&(a=r.nextTouched(n),s===a&&n.setRelative(r,r,n.distance(s,s,!1,!0),n,!0),n.interpolate(r,s,a,n)))}function Tc(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv;let o=e.loop;const l=e.z2;for(;o--;){const c=t.pop(),u=l[c],f=a.distance(r,r,!1,!0);s.setRelative(u,u,f,a),s.touch(u)}e.loop=1}function Mc(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv,o=t.pop(),l=e.z2[e.contours[o]];let c=l;const u=a.distance(r,r,!1,!0);do c!==r&&s.setRelative(c,c,u,a),c=c.nextPointOnContour;while(c!==l)}function Ec(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv,o=t.pop();let l;switch(o){case 0:l=e.tZone;break;case 1:l=e.gZone;break;default:throw new Error("Invalid zone")}let c;const u=a.distance(r,r,!1,!0),f=l.length-2;for(let h=0;h<f;h++)c=l[h],s.setRelative(c,c,u,a)}function jy(n){const e=n.stack;let t=n.loop;const i=n.fv,r=e.pop()/64,s=n.z2;for(;t--;){const a=e.pop(),o=s[a];i.setRelative(o,o,r),i.touch(o)}n.loop=1}function $y(n){const e=n.stack,t=n.rp1,i=n.rp2;let r=n.loop;const s=n.z0[t],a=n.z1[i],o=n.fv,l=n.dpv,c=n.z2;for(;r--;){const u=e.pop(),f=c[u];o.interpolate(f,s,a,l),o.touch(f)}n.loop=1}function Ac(n,e){const t=e.stack,i=t.pop()/64,r=t.pop(),s=e.z1[r],a=e.z0[e.rp0],o=e.fv,l=e.pv;o.setRelative(s,a,i,l),o.touch(s),e.rp1=e.rp0,e.rp2=r,n&&(e.rp0=r)}function Zy(n){const e=n.stack,t=n.rp0,i=n.z0[t];let r=n.loop;const s=n.fv,a=n.pv,o=n.z1;for(;r--;){const l=e.pop(),c=o[l];s.setRelative(c,i,0,a),s.touch(c)}n.loop=1}function Ky(n){n.round=py}function Cc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z0[r],a=e.fv,o=e.pv;let l=e.cvt[i],c=o.distance(s,Ur);n&&(Math.abs(c-l)<e.cvCutIn&&(c=l),c=e.round(c)),a.setRelative(s,Ur,c,o),e.zp0===0&&(s.xo=s.x,s.yo=s.y),a.touch(s),e.rp0=e.rp1=r}function Jy(n){const e=n.prog;let t=n.ip;const i=n.stack,r=e[++t];for(let s=0;s<r;s++)i.push(e[++t]);n.ip=t}function Qy(n){let e=n.ip;const t=n.prog,i=n.stack,r=t[++e];for(let s=0;s<r;s++){let a=t[++e]<<8|t[++e];a&32768&&(a=-((a^65535)+1)),i.push(a)}n.ip=e}function eS(n){const e=n.stack;let t=n.store;t||(t=n.store=[]);const i=e.pop(),r=e.pop();t[r]=i}function tS(n){const e=n.stack,t=n.store,i=e.pop(),r=t&&t[i]||0;e.push(r)}function nS(n){const e=n.stack,t=e.pop(),i=e.pop();n.cvt[i]=t/64}function iS(n){const e=n.stack,t=e.pop();e.push(n.cvt[t]*64)}function Rc(n,e){const t=e.stack,i=t.pop(),r=e.z2[i];t.push(e.dpv.distance(r,Ur,n,!1)*64)}function wc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z1[i],a=e.z0[r],o=e.dpv.distance(a,s,n,n);e.stack.push(Math.round(o*64))}function rS(n){n.stack.push(n.ppem)}function sS(n){n.autoFlip=!0}function aS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i<t?1:0)}function oS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i<=t?1:0)}function lS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i>t?1:0)}function cS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i>=t?1:0)}function uS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t===i?1:0)}function hS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t!==i?1:0)}function fS(n){const e=n.stack,t=e.pop();e.push(Math.trunc(t)&1?1:0)}function dS(n){const e=n.stack,t=e.pop();e.push(Math.trunc(t)&1?0:1)}function pS(n){n.stack.pop()||Sh(n,!0)}function mS(n){}function gS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t&&i?1:0)}function xS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t||i?1:0)}function vS(n){const e=n.stack,t=e.pop();e.push(t?0:1)}function ka(n,e){const t=e.stack,i=t.pop(),r=e.fv,s=e.pv,a=e.ppem,o=e.deltaBase+(n-1)*16,l=e.deltaShift,c=e.z0;for(let u=0;u<i;u++){const f=t.pop(),h=t.pop();if(o+((h&240)>>4)!==a)continue;let p=(h&15)-8;p>=0&&p++;const x=c[f];r.setRelative(x,x,p*l,s)}}function _S(n){const t=n.stack.pop();n.deltaBase=t}function yS(n){const t=n.stack.pop();n.deltaShift=Math.pow(.5,t)}function SS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i+t)}function bS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i-t)}function TS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i*64/t)}function MS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i*t/64)}function ES(n){const e=n.stack,t=e.pop();e.push(Math.abs(t))}function AS(n){const e=n.stack;let t=e.pop();e.push(-t)}function CS(n){const e=n.stack,t=e.pop();e.push(Math.floor(t/64)*64)}function RS(n){const e=n.stack,t=e.pop();e.push(Math.ceil(t/64)*64)}function bs(n,e){const t=e.stack,i=t.pop();t.push(e.round(i/64)*64)}function wS(n){const e=n.stack,t=e.pop(),i=e.pop();n.cvt[i]=t*n.ppem/n.font.unitsPerEm}function Ba(n,e){const t=e.stack,i=t.pop(),r=e.ppem,s=e.deltaBase+(n-1)*16,a=e.deltaShift;for(let o=0;o<i;o++){const l=t.pop(),c=t.pop();if(s+((c&240)>>4)!==r)continue;let f=(c&15)-8;f>=0&&f++;const h=f*a;e.cvt[l]+=h}}function PS(n){let e=n.stack.pop();n.round=yh;let t;switch(e&192){case 0:t=.5;break;case 64:t=1;break;case 128:t=2;break;default:throw new Error("invalid SROUND value")}switch(n.srPeriod=t,e&48){case 0:n.srPhase=0;break;case 16:n.srPhase=.25*t;break;case 32:n.srPhase=.5*t;break;case 48:n.srPhase=.75*t;break;default:throw new Error("invalid SROUND value")}e&=15,e===0?n.srThreshold=0:n.srThreshold=(e/8-.5)*t}function LS(n){let e=n.stack.pop();n.round=yh;let t;switch(e&192){case 0:t=Math.sqrt(2)/2;break;case 64:t=Math.sqrt(2);break;case 128:t=2*Math.sqrt(2);break;default:throw new Error("invalid S45ROUND value")}switch(n.srPeriod=t,e&48){case 0:n.srPhase=0;break;case 16:n.srPhase=.25*t;break;case 32:n.srPhase=.5*t;break;case 48:n.srPhase=.75*t;break;default:throw new Error("invalid S45ROUND value")}e&=15,e===0?n.srThreshold=0:n.srThreshold=(e/8-.5)*t}function DS(n){n.round=dy}function IS(n){n.round=gy}function US(n){n.round=xy}function FS(n){n.stack.pop()}function Pc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.dpv=Wr(o,l)}function OS(n){const e=n.stack,t=e.pop();let i=0;t&1&&(i=35),t&32&&(i|=4096),e.push(i)}function NS(n){const e=n.stack,t=e.pop(),i=e.pop(),r=e.pop();e.push(i),e.push(t),e.push(r)}function kS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(Math.max(i,t))}function BS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(Math.min(i,t))}function GS(n){n.stack.pop()}function zS(n){const e=n.stack.pop();let t=n.stack.pop();switch(e){case 1:n.inhibitGridFit=!!t;return;case 2:n.ignoreCvt=!!t;return;default:throw new Error("invalid INSTCTRL[] selector")}}function $n(n,e){const t=e.stack,i=e.prog;let r=e.ip;for(let s=0;s<n;s++)t.push(i[++r]);e.ip=r}function Zn(n,e){let t=e.ip;const i=e.prog,r=e.stack;for(let s=0;s<n;s++){let a=i[++t]<<8|i[++t];a&32768&&(a=-((a^65535)+1)),r.push(a)}e.ip=t}function ze(n,e,t,i,r,s){const a=s.stack,o=n&&a.pop(),l=a.pop(),c=s.rp0,u=s.z0[c],f=s.z1[l],h=s.minDis,d=s.fv,p=s.dpv;let x,m,g;x=p.distance(f,u,!0,!0),m=x>=0?1:-1,x=Math.abs(x),n&&(g=s.cvt[o],i&&Math.abs(x-g)<s.cvCutIn&&(x=g)),t&&x<h&&(x=h),i&&(x=s.round(x)),d.setRelative(f,u,m*x,p),d.touch(f),s.rp1=s.rp0,s.rp2=l,e&&(s.rp0=l)}gh=[gc.bind(void 0,Nn),gc.bind(void 0,An),xc.bind(void 0,Nn),xc.bind(void 0,An),vc.bind(void 0,Nn),vc.bind(void 0,An),_c.bind(void 0,0),_c.bind(void 0,1),yc.bind(void 0,0),yc.bind(void 0,1),_y,yy,Sy,by,Ty,My,Ey,Ay,Cy,Ry,wy,Py,Ly,Dy,Iy,Uy,Fy,Oy,Ny,ky,void 0,void 0,By,Na,Gy,zy,Vy,Xy,qy,void 0,void 0,void 0,Hy,Wy,Yy,void 0,Sc.bind(void 0,0),Sc.bind(void 0,1),bc.bind(void 0,Nn),bc.bind(void 0,An),Tc.bind(void 0,0),Tc.bind(void 0,1),Mc.bind(void 0,0),Mc.bind(void 0,1),Ec.bind(void 0,0),Ec.bind(void 0,1),jy,$y,Ac.bind(void 0,0),Ac.bind(void 0,1),Zy,Ky,Cc.bind(void 0,0),Cc.bind(void 0,1),Jy,Qy,eS,tS,nS,iS,Rc.bind(void 0,0),Rc.bind(void 0,1),void 0,wc.bind(void 0,0),wc.bind(void 0,1),rS,void 0,sS,void 0,void 0,aS,oS,lS,cS,uS,hS,fS,dS,pS,mS,gS,xS,vS,ka.bind(void 0,1),_S,yS,SS,bS,TS,MS,ES,AS,CS,RS,bs.bind(void 0,0),bs.bind(void 0,1),bs.bind(void 0,2),bs.bind(void 0,3),void 0,void 0,void 0,void 0,wS,ka.bind(void 0,2),ka.bind(void 0,3),Ba.bind(void 0,1),Ba.bind(void 0,2),Ba.bind(void 0,3),PS,LS,void 0,void 0,DS,void 0,IS,US,Na,Na,void 0,void 0,void 0,void 0,void 0,FS,Pc.bind(void 0,0),Pc.bind(void 0,1),OS,void 0,NS,kS,BS,GS,zS,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,$n.bind(void 0,1),$n.bind(void 0,2),$n.bind(void 0,3),$n.bind(void 0,4),$n.bind(void 0,5),$n.bind(void 0,6),$n.bind(void 0,7),$n.bind(void 0,8),Zn.bind(void 0,1),Zn.bind(void 0,2),Zn.bind(void 0,3),Zn.bind(void 0,4),Zn.bind(void 0,5),Zn.bind(void 0,6),Zn.bind(void 0,7),Zn.bind(void 0,8),ze.bind(void 0,0,0,0,0,0),ze.bind(void 0,0,0,0,0,1),ze.bind(void 0,0,0,0,0,2),ze.bind(void 0,0,0,0,0,3),ze.bind(void 0,0,0,0,1,0),ze.bind(void 0,0,0,0,1,1),ze.bind(void 0,0,0,0,1,2),ze.bind(void 0,0,0,0,1,3),ze.bind(void 0,0,0,1,0,0),ze.bind(void 0,0,0,1,0,1),ze.bind(void 0,0,0,1,0,2),ze.bind(void 0,0,0,1,0,3),ze.bind(void 0,0,0,1,1,0),ze.bind(void 0,0,0,1,1,1),ze.bind(void 0,0,0,1,1,2),ze.bind(void 0,0,0,1,1,3),ze.bind(void 0,0,1,0,0,0),ze.bind(void 0,0,1,0,0,1),ze.bind(void 0,0,1,0,0,2),ze.bind(void 0,0,1,0,0,3),ze.bind(void 0,0,1,0,1,0),ze.bind(void 0,0,1,0,1,1),ze.bind(void 0,0,1,0,1,2),ze.bind(void 0,0,1,0,1,3),ze.bind(void 0,0,1,1,0,0),ze.bind(void 0,0,1,1,0,1),ze.bind(void 0,0,1,1,0,2),ze.bind(void 0,0,1,1,0,3),ze.bind(void 0,0,1,1,1,0),ze.bind(void 0,0,1,1,1,1),ze.bind(void 0,0,1,1,1,2),ze.bind(void 0,0,1,1,1,3),ze.bind(void 0,1,0,0,0,0),ze.bind(void 0,1,0,0,0,1),ze.bind(void 0,1,0,0,0,2),ze.bind(void 0,1,0,0,0,3),ze.bind(void 0,1,0,0,1,0),ze.bind(void 0,1,0,0,1,1),ze.bind(void 0,1,0,0,1,2),ze.bind(void 0,1,0,0,1,3),ze.bind(void 0,1,0,1,0,0),ze.bind(void 0,1,0,1,0,1),ze.bind(void 0,1,0,1,0,2),ze.bind(void 0,1,0,1,0,3),ze.bind(void 0,1,0,1,1,0),ze.bind(void 0,1,0,1,1,1),ze.bind(void 0,1,0,1,1,2),ze.bind(void 0,1,0,1,1,3),ze.bind(void 0,1,1,0,0,0),ze.bind(void 0,1,1,0,0,1),ze.bind(void 0,1,1,0,0,2),ze.bind(void 0,1,1,0,0,3),ze.bind(void 0,1,1,0,1,0),ze.bind(void 0,1,1,0,1,1),ze.bind(void 0,1,1,0,1,2),ze.bind(void 0,1,1,0,1,3),ze.bind(void 0,1,1,1,0,0),ze.bind(void 0,1,1,1,0,1),ze.bind(void 0,1,1,1,0,2),ze.bind(void 0,1,1,1,0,3),ze.bind(void 0,1,1,1,1,0),ze.bind(void 0,1,1,1,1,1),ze.bind(void 0,1,1,1,1,2),ze.bind(void 0,1,1,1,1,3)];var VS=vh;function ar(n){this.char=n,this.state={},this.activeState=null}function Do(n,e,t){this.contextName=t,this.startIndex=n,this.endOffset=e}function HS(n,e,t){this.contextName=n,this.openRange=null,this.ranges=[],this.checkStart=e,this.checkEnd=t}function Zt(n,e){this.context=n,this.index=e,this.length=n.length,this.current=n[e],this.backtrack=n.slice(0,e),this.lookahead=n.slice(e+1)}function Js(n){this.eventId=n,this.subscribers=[]}function WS(n){const e=["start","end","next","newToken","contextStart","contextEnd","insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD","updateContextsRanges"];for(let i=0;i<e.length;i++){const r=e[i];Object.defineProperty(this.events,r,{value:new Js(r)})}if(n)for(let i=0;i<e.length;i++){const r=e[i],s=n[r];typeof s=="function"&&this.events[r].subscribe(s)}const t=["insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD"];for(let i=0;i<t.length;i++){const r=t[i];this.events[r].subscribe(this.updateContextsRanges)}}function At(n){this.tokens=[],this.registeredContexts={},this.contextCheckers=[],this.events={},this.registeredModifiers=[],WS.call(this,n)}ar.prototype.setState=function(n,e){return this.state[n]=e,this.activeState={key:n,value:this.state[n]},this.activeState};ar.prototype.getState=function(n){return this.state[n]||null};At.prototype.inboundIndex=function(n){return n>=0&&n<this.tokens.length};At.prototype.composeRUD=function(n){const t=n.map(r=>this[r[0]].apply(this,r.slice(1).concat(!0))),i=r=>typeof r=="object"&&Object.prototype.hasOwnProperty.call(r,"FAIL");if(t.every(i))return{FAIL:"composeRUD: one or more operations hasn't completed successfully",report:t.filter(i)};this.dispatch("composeRUD",[t.filter(r=>!i(r))])};At.prototype.replaceRange=function(n,e,t,i){e=e!==null?e:this.tokens.length;const r=t.every(s=>s instanceof ar);if(!isNaN(n)&&this.inboundIndex(n)&&r){const s=this.tokens.splice.apply(this.tokens,[n,e].concat(t));return i||this.dispatch("replaceToken",[n,e,t]),[s,t]}else return{FAIL:"replaceRange: invalid tokens or startIndex."}};At.prototype.replaceToken=function(n,e,t){if(!isNaN(n)&&this.inboundIndex(n)&&e instanceof ar){const i=this.tokens.splice(n,1,e);return t||this.dispatch("replaceToken",[n,e]),[i[0],e]}else return{FAIL:"replaceToken: invalid token or index."}};At.prototype.removeRange=function(n,e,t){e=isNaN(e)?this.tokens.length:e;const i=this.tokens.splice(n,e);return t||this.dispatch("removeRange",[i,n,e]),i};At.prototype.removeToken=function(n,e){if(!isNaN(n)&&this.inboundIndex(n)){const t=this.tokens.splice(n,1);return e||this.dispatch("removeToken",[t,n]),t}else return{FAIL:"removeToken: invalid token index."}};At.prototype.insertToken=function(n,e,t){return n.every(r=>r instanceof ar)?(this.tokens.splice.apply(this.tokens,[e,0].concat(n)),t||this.dispatch("insertToken",[n,e]),n):{FAIL:"insertToken: invalid token(s)."}};At.prototype.registerModifier=function(n,e,t){this.events.newToken.subscribe(function(i,r){const s=[i,r],a=e===null||e.apply(this,s)===!0,o=[i,r];if(a){let l=t.apply(this,o);i.setState(n,l)}}),this.registeredModifiers.push(n)};Js.prototype.subscribe=function(n){return typeof n=="function"?this.subscribers.push(n)-1:{FAIL:`invalid '${this.eventId}' event handler`}};Js.prototype.unsubscribe=function(n){this.subscribers.splice(n,1)};Zt.prototype.setCurrentIndex=function(n){this.index=n,this.current=this.context[n],this.backtrack=this.context.slice(0,n),this.lookahead=this.context.slice(n+1)};Zt.prototype.get=function(n){switch(!0){case n===0:return this.current;case(n<0&&Math.abs(n)<=this.backtrack.length):return this.backtrack.slice(n)[0];case(n>0&&n<=this.lookahead.length):return this.lookahead[n-1];default:return null}};At.prototype.rangeToText=function(n){if(n instanceof Do)return this.getRangeTokens(n).map(e=>e.char).join("")};At.prototype.getText=function(){return this.tokens.map(n=>n.char).join("")};At.prototype.getContext=function(n){let e=this.registeredContexts[n];return e||null};At.prototype.on=function(n,e){const t=this.events[n];return t?t.subscribe(e):null};At.prototype.dispatch=function(n,e){const t=this.events[n];if(t instanceof Js)for(let i=0;i<t.subscribers.length;i++)t.subscribers[i].apply(this,e||[])};At.prototype.registerContextChecker=function(n,e,t){if(this.getContext(n))return{FAIL:`context name '${n}' is already registered.`};if(typeof e!="function")return{FAIL:"missing context start check."};if(typeof t!="function")return{FAIL:"missing context end check."};const i=new HS(n,e,t);return this.registeredContexts[n]=i,this.contextCheckers.push(i),i};At.prototype.getRangeTokens=function(n){const e=n.startIndex+n.endOffset;return[].concat(this.tokens.slice(n.startIndex,e))};At.prototype.getContextRanges=function(n){const e=this.getContext(n);return e?e.ranges:{FAIL:`context checker '${n}' is not registered.`}};At.prototype.resetContextsRanges=function(){const n=this.registeredContexts;for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)){const t=n[e];t.ranges=[]}};At.prototype.updateContextsRanges=function(){this.resetContextsRanges();const n=this.tokens.map(e=>e.char);for(let e=0;e<n.length;e++){const t=new Zt(n,e);this.runContextCheck(t)}this.dispatch("updateContextsRanges",[this.registeredContexts])};At.prototype.setEndOffset=function(n,e){const t=this.getContext(e).openRange.startIndex;let i=new Do(t,n,e);const r=this.getContext(e).ranges;return i.rangeId=`${e}.${r.length}`,r.push(i),this.getContext(e).openRange=null,i};At.prototype.runContextCheck=function(n){const e=n.index;for(let t=0;t<this.contextCheckers.length;t++){const i=this.contextCheckers[t];let r=i.contextName,s=this.getContext(r).openRange;if(!s&&i.checkStart(n)&&(s=new Do(e,null,r),this.getContext(r).openRange=s,this.dispatch("contextStart",[r,e])),s&&i.checkEnd(n)){const a=e-s.startIndex+1,o=this.setEndOffset(a,r);this.dispatch("contextEnd",[r,o])}}};At.prototype.tokenize=function(n){this.tokens=[],this.resetContextsRanges();let e=Array.from(n);this.dispatch("start");for(let t=0;t<e.length;t++){const i=e[t],r=new Zt(e,t);this.dispatch("next",[r]),this.runContextCheck(r);let s=new ar(i);this.tokens.push(s),this.dispatch("newToken",[s,r])}return this.dispatch("end",[this.tokens]),this.tokens};var XS=At;function ni(n){return/[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(n)}function bh(n){return/[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(n)}function ri(n){return/[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(n)}function Cs(n){return/[\u0E00-\u0E7F]/.test(n)}function Rs(n){return/[A-z]/.test(n)}function qS(n){return/\s/.test(n)}function rn(n){this.font=n,this.features={}}function Jn(n){this.id=n.id,this.tag=n.tag,this.substitution=n.substitution}function si(n,e){if(!n)return-1;switch(e.format){case 1:return e.glyphs.indexOf(n);case 2:{let t=e.ranges;for(let i=0;i<t.length;i++){const r=t[i];if(n>=r.start&&n<=r.end){let s=n-r.start;return r.index+s}}break}default:return-1}return-1}function YS(n,e){return si(n,e.coverage)===-1?null:n+e.deltaGlyphId}function jS(n,e){let t=si(n,e.coverage);return t===-1?null:e.substitute[t]}function Ga(n,e){let t=[];for(let i=0;i<n.length;i++){const r=n[i];let s=e.current;s=Array.isArray(s)?s[0]:s;const a=si(s,r);a!==-1&&t.push(a)}return t.length!==n.length?-1:t}function $S(n,e){const t=e.inputCoverage.length+e.lookaheadCoverage.length+e.backtrackCoverage.length;if(n.context.length<t)return[];let i=Ga(e.inputCoverage,n);if(i===-1)return[];const r=e.inputCoverage.length-1;if(n.lookahead.length<e.lookaheadCoverage.length)return[];let s=n.lookahead.slice(r);for(;s.length&&ri(s[0].char);)s.shift();const a=new Zt(s,0);let o=Ga(e.lookaheadCoverage,a),l=[].concat(n.backtrack);for(l.reverse();l.length&&ri(l[0].char);)l.shift();if(l.length<e.backtrackCoverage.length)return[];const c=new Zt(l,0);let u=Ga(e.backtrackCoverage,c);const f=i.length===e.inputCoverage.length&&o.length===e.lookaheadCoverage.length&&u.length===e.backtrackCoverage.length;let h=[];if(f)for(let d=0;d<e.lookupRecords.length;d++){const p=e.lookupRecords[d],x=p.lookupListIndex,m=this.getLookupByIndex(x);for(let g=0;g<m.subtables.length;g++){let _=m.subtables[g],v,S=this.getSubstitutionType(m,_);if(S==="71"?(S=this.getSubstitutionType(_,_.extension),v=this.getLookupMethod(_,_.extension),_=_.extension):v=this.getLookupMethod(m,_),S==="12"){const R=n.get(p.sequenceIndex),M=v(R);M&&h.push(M)}else if(S==="21"){const R=n.get(p.sequenceIndex),M=v(R);M&&h.push(M)}else throw new Error(`Substitution type ${S} is not supported in chaining substitution`)}}return h}function ZS(n,e){let t=n.current,i=si(t,e.coverage);if(i===-1)return null;let r,s=e.ligatureSets[i];for(let a=0;a<s.length;a++){r=s[a];for(let o=0;o<r.components.length;o++){const l=n.lookahead[o],c=r.components[o];if(l!==c)break;if(o===r.components.length-1)return r}}return null}function KS(n,e){let t=n.current;if(si(t,e.coverage)===-1)return null;for(const r of e.ruleSets)for(const s of r){let a=!0;for(let o=0;o<s.input.length;o++)if(n.lookahead[o]!==s.input[o]){a=!1;break}if(a){let o=[];o.push(t);for(let c=0;c<s.input.length;c++)o.push(s.input[c]);const l=(c,u)=>{const{lookupListIndex:f,sequenceIndex:h}=u,{subtables:d}=this.getLookupByIndex(f);for(const p of d)si(c[h],p.coverage)!==-1&&(c[h]=p.deltaGlyphId)};for(let c=0;c<s.lookupRecords.length;c++){const u=s.lookupRecords[c];l(o,u)}return o}}return null}function JS(n,e){if(n.context.length<e.coverages.length)return[];for(let i=0;i<e.coverages.length;i++){let r=n.get(i);if(r=Array.isArray(r)?r[0]:r,si(r,e.coverages[i])===-1)return[]}let t=[];for(let i=0;i<e.lookupRecords.length;i++){const r=e.lookupRecords[i],s=r.lookupListIndex,a=this.getLookupByIndex(s);for(let o=0;o<a.subtables.length;o++){let l=a.subtables[o],c,u=this.getSubstitutionType(a,l);if(u==="71"?(u=this.getSubstitutionType(l,l.extension),c=this.getLookupMethod(l,l.extension),l=l.extension):c=this.getLookupMethod(a,l),u==="12"){const f=n.get(r.sequenceIndex),h=c(f);h&&t.push(h)}else if(u==="21"){const f=n.get(r.sequenceIndex),h=c(f);h&&t.push(h)}}}return t}function QS(n,e){let t=si(n,e.coverage);return t===-1?null:e.sequences[t]}rn.prototype.getDefaultScriptFeaturesIndexes=function(){const n=this.font.tables.gsub.scripts;for(let e=0;e<n.length;e++){const t=n[e];if(t.tag==="DFLT")return t.script.defaultLangSys.featureIndexes}return[]};rn.prototype.getScriptFeaturesIndexes=function(n){if(!this.font.tables.gsub)return[];if(!n)return this.getDefaultScriptFeaturesIndexes();const t=this.font.tables.gsub.scripts;for(let i=0;i<t.length;i++){const r=t[i];if(r.tag===n&&r.script.defaultLangSys)return r.script.defaultLangSys.featureIndexes;{let s=r.langSysRecords;if(s)for(let a=0;a<s.length;a++){const o=s[a];if(o.tag===n)return o.langSys.featureIndexes}}}return this.getDefaultScriptFeaturesIndexes()};rn.prototype.mapTagsToFeatures=function(n,e){let t={};for(let i=0;i<n.length;i++){const r=n[i].tag,s=n[i].feature;t[r]=s}this.features[e].tags=t};rn.prototype.getScriptFeatures=function(n){let e=this.features[n];if(Object.prototype.hasOwnProperty.call(this.features,n))return e;const t=this.getScriptFeaturesIndexes(n);if(!t)return null;const i=this.font.tables.gsub;return e=t.map(r=>i.features[r]),this.features[n]=e,this.mapTagsToFeatures(e,n),e};rn.prototype.getSubstitutionType=function(n,e){const t=n.lookupType.toString(),i=e.substFormat.toString();return t+i};rn.prototype.getLookupMethod=function(n,e){let t=this.getSubstitutionType(n,e);switch(t){case"11":return i=>YS.apply(this,[i,e]);case"12":return i=>jS.apply(this,[i,e]);case"63":return i=>$S.apply(this,[i,e]);case"41":return i=>ZS.apply(this,[i,e]);case"21":return i=>QS.apply(this,[i,e]);case"51":return i=>KS.apply(this,[i,e]);case"53":return i=>JS.apply(this,[i,e]);default:throw new Error(`substitutionType : ${t} lookupType: ${n.lookupType} - substFormat: ${e.substFormat} is not yet supported`)}};rn.prototype.lookupFeature=function(n){let e=n.contextParams,t=e.index;const i=this.getFeature({tag:n.tag,script:n.script});if(!i)return new Error(`font '${(this.font.names.unicode||this.font.names.windows||this.font.names.macintosh).fullName.en}' doesn't support feature '${n.tag}' for script '${n.script}'.`);const r=this.getFeatureLookups(i),s=[].concat(e.context);for(let a=0;a<r.length;a++){const o=r[a],l=this.getLookupSubtables(o);for(let c=0;c<l.length;c++){let u=l[c],f=this.getSubstitutionType(o,u),h;f==="71"?(f=this.getSubstitutionType(u,u.extension),h=this.getLookupMethod(u,u.extension),u=u.extension):h=this.getLookupMethod(o,u);let d;switch(f){case"11":d=h(e.current),d&&s.splice(t,1,new Jn({id:11,tag:n.tag,substitution:d}));break;case"12":d=h(e.current),d&&s.splice(t,1,new Jn({id:12,tag:n.tag,substitution:d}));break;case"63":d=h(e),Array.isArray(d)&&d.length&&s.splice(t,1,new Jn({id:63,tag:n.tag,substitution:d}));break;case"41":d=h(e),d&&s.splice(t,1,new Jn({id:41,tag:n.tag,substitution:d}));break;case"21":d=h(e.current),d&&s.splice(t,1,new Jn({id:21,tag:n.tag,substitution:d}));break;case"51":case"53":d=h(e),Array.isArray(d)&&d.length&&s.splice(t,1,new Jn({id:parseInt(f),tag:n.tag,substitution:d}));break}e=new Zt(s,t),!(Array.isArray(d)&&!d.length)&&(d=null)}}return s.length?s:null};rn.prototype.supports=function(n){if(!n.script)return!1;this.getScriptFeatures(n.script);const e=Object.prototype.hasOwnProperty.call(this.features,n.script);if(!n.tag)return e;const t=this.features[n.script].some(i=>i.tag===n.tag);return e&&t};rn.prototype.getLookupSubtables=function(n){return n.subtables||null};rn.prototype.getLookupByIndex=function(n){return this.font.tables.gsub.lookups[n]||null};rn.prototype.getFeatureLookups=function(n){return n.lookupListIndexes.map(this.getLookupByIndex.bind(this))};rn.prototype.getFeature=function(e){if(!this.font)return{FAIL:"No font was found"};Object.prototype.hasOwnProperty.call(this.features,e.script)||this.getScriptFeatures(e.script);const t=this.features[e.script];return t?t.tags[e.tag]?this.features[e.script].tags[e.tag]:null:{FAIL:`No feature for script ${e.script}`}};var e1=rn;function t1(n){const e=n.current,t=n.get(-1);return t===null&&ni(e)||!ni(t)&&ni(e)}function n1(n){const e=n.get(1);return e===null||!ni(e)}var i1={startCheck:t1,endCheck:n1};function r1(n){const e=n.current,t=n.get(-1);return(ni(e)||ri(e))&&!ni(t)}function s1(n){const e=n.get(1);switch(!0){case e===null:return!0;case(!ni(e)&&!ri(e)):{const t=qS(e);if(!t)return!0;if(t){let i=!1;if(i=n.lookahead.some(r=>ni(r)||ri(r)),!i)return!0}break}default:return!1}}var a1={startCheck:r1,endCheck:s1};function o1(n,e,t){e[t].setState(n.tag,n.substitution)}function l1(n,e,t){e[t].setState(n.tag,n.substitution)}function za(n,e,t){for(let i=0;i<n.substitution.length;i++){const r=n.substitution[i],s=e[t+i];if(Array.isArray(r)){r.length?s.setState(n.tag,r[0]):s.setState("deleted",!0);continue}s.setState(n.tag,r)}}function c1(n,e,t){let i=e[t];i.setState(n.tag,n.substitution.ligGlyph);const r=n.substitution.components.length;for(let s=0;s<r;s++)i=e[t+s+1],i.setState("deleted",!0)}var Lc={11:o1,12:l1,63:za,41:c1,51:za,53:za};function u1(n,e,t){n instanceof Jn&&Lc[n.id]&&Lc[n.id](n,e,t)}var Ti=u1;function h1(n){let e=[].concat(n.backtrack);for(let t=e.length-1;t>=0;t--){const i=e[t],r=bh(i),s=ri(i);if(!r&&!s)return!0;if(r)return!1}return!1}function f1(n){if(bh(n.current))return!1;for(let e=0;e<n.lookahead.length;e++){const t=n.lookahead[e];if(!ri(t))return!0}return!1}function d1(n){const e="arab",t=this.featuresTags[e],i=this.tokenizer.getRangeTokens(n);if(i.length===1)return;let r=new Zt(i.map(a=>a.getState("glyphIndex")),0);const s=new Zt(i.map(a=>a.char),0);for(let a=0;a<i.length;a++){const o=i[a];if(ri(o.char))continue;r.setCurrentIndex(a),s.setCurrentIndex(a);let l=0;h1(s)&&(l|=1),f1(s)&&(l|=2);let c;switch(l){case 1:c="fina";break;case 2:c="init";break;case 3:c="medi";break}if(t.indexOf(c)===-1)continue;let u=this.query.lookupFeature({tag:c,script:e,contextParams:r});if(u instanceof Error){console.info(u.message);continue}for(let f=0;f<u.length;f++){const h=u[f];h instanceof Jn&&(Ti(h,i,f),r.context[f]=h.substitution)}}}var p1=d1;function Dc(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,0)}function m1(n){const e="arab";let t=this.tokenizer.getRangeTokens(n),i=Dc(t);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"rlig",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Ti(o,t,r)}i=Dc(t)}}}var g1=m1;function x1(n){return n.index===0&&n.context.length>1}function v1(n){return n.index===n.context.length-1}var _1={startCheck:x1,endCheck:v1};function Ic(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,0)}function y1(n){const e="delf",t="ccmp";let i=this.tokenizer.getRangeTokens(n),r=Ic(i);for(let s=0;s<r.context.length;s++){if(!this.query.getFeature({tag:t,script:e,contextParams:r}))continue;r.setCurrentIndex(s);let a=this.query.lookupFeature({tag:t,script:e,contextParams:r});if(a.length){for(let o=0;o<a.length;o++){const l=a[o];Ti(l,i,s)}r=Ic(i)}}}var S1=y1;function b1(n){const e=n.current,t=n.get(-1);return t===null&&Rs(e)||!Rs(t)&&Rs(e)}function T1(n){const e=n.get(1);return e===null||!Rs(e)}var M1={startCheck:b1,endCheck:T1};function Uc(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,0)}function E1(n){const e="latn";let t=this.tokenizer.getRangeTokens(n),i=Uc(t);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"liga",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Ti(o,t,r)}i=Uc(t)}}}var A1=E1;function C1(n){const e=n.current,t=n.get(-1);return t===null&&Cs(e)||!Cs(t)&&Cs(e)}function R1(n){const e=n.get(1);return e===null||!Cs(e)}var w1={startCheck:C1,endCheck:R1};function Fc(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,e||0)}function P1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Fc(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"ccmp",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Ti(o,t,r)}i=Fc(t,r)}}}var L1=P1;function Oc(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,e||0)}function D1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Oc(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"liga",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Ti(o,t,r)}i=Oc(t,r)}}}var I1=D1;function Nc(n,e){const t=n.map(i=>i.activeState.value);return new Zt(t,e||0)}function U1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Nc(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"rlig",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Ti(o,t,r)}i=Nc(t,r)}}}var F1=U1;function oo(n){if(n===null)return!1;const e=n.codePointAt(0);return e>=6155&&e<=6157||e>=65024&&e<=65039||e>=917760&&e<=917999}function O1(n){const e=n.current,t=n.get(1);return t===null&&oo(e)||oo(t)}function N1(n){const e=n.get(1);return e===null||!oo(e)}var k1={startCheck:O1,endCheck:N1};function B1(n){const e=this.query.font,t=this.tokenizer.getRangeTokens(n);if(t[1].setState("deleted",!0),e.tables.cmap&&e.tables.cmap.varSelectorList){const i=t[0].char.codePointAt(0),r=t[1].char.codePointAt(0),s=e.tables.cmap.varSelectorList[r];if(s!==void 0&&s.nonDefaultUVS){const a=s.nonDefaultUVS.uvsMappings;if(a[i]){const o=a[i].glyphID;e.glyphs.glyphs[o]!==void 0&&t[0].setState("glyphIndex",o)}}}}var G1=B1;function on(n){this.baseDir=n||"ltr",this.tokenizer=new XS,this.featuresTags={}}on.prototype.setText=function(n){this.text=n};on.prototype.contextChecks={ccmpReplacementCheck:_1,latinWordCheck:M1,arabicWordCheck:i1,arabicSentenceCheck:a1,thaiWordCheck:w1,unicodeVariationSequenceCheck:k1};function Vi(n){const e=this.contextChecks[`${n}Check`];return this.tokenizer.registerContextChecker(n,e.startCheck,e.endCheck)}function z1(){return Vi.call(this,"ccmpReplacement"),Vi.call(this,"latinWord"),Vi.call(this,"arabicWord"),Vi.call(this,"arabicSentence"),Vi.call(this,"thaiWord"),Vi.call(this,"unicodeVariationSequence"),this.tokenizer.tokenize(this.text)}function V1(){const n=this.tokenizer.getContextRanges("arabicSentence");for(let e=0;e<n.length;e++){const t=n[e];let i=this.tokenizer.getRangeTokens(t);this.tokenizer.replaceRange(t.startIndex,t.endOffset,i.reverse())}}on.prototype.registerFeatures=function(n,e){const t=e.filter(i=>this.query.supports({script:n,tag:i}));Object.prototype.hasOwnProperty.call(this.featuresTags,n)?this.featuresTags[n]=this.featuresTags[n].concat(t):this.featuresTags[n]=t};on.prototype.applyFeatures=function(n,e){if(!n)throw new Error("No valid font was provided to apply features");this.query||(this.query=new e1(n));for(let t=0;t<e.length;t++){const i=e[t];this.query.supports({script:i.script})&&this.registerFeatures(i.script,i.tags)}};on.prototype.registerModifier=function(n,e,t){this.tokenizer.registerModifier(n,e,t)};function Xr(){if(this.tokenizer.registeredModifiers.indexOf("glyphIndex")===-1)throw new Error("glyphIndex modifier is required to apply arabic presentation features.")}function H1(){if(!Object.prototype.hasOwnProperty.call(this.featuresTags,"arab"))return;Xr.call(this);const e=this.tokenizer.getContextRanges("arabicWord");for(let t=0;t<e.length;t++){const i=e[t];p1.call(this,i)}}function W1(){Xr.call(this);const n=this.tokenizer.getContextRanges("ccmpReplacement");for(let e=0;e<n.length;e++){const t=n[e];S1.call(this,t)}}function X1(){if(!this.hasFeatureEnabled("arab","rlig"))return;Xr.call(this);const n=this.tokenizer.getContextRanges("arabicWord");for(let e=0;e<n.length;e++){const t=n[e];g1.call(this,t)}}function q1(){if(!this.hasFeatureEnabled("latn","liga"))return;Xr.call(this);const n=this.tokenizer.getContextRanges("latinWord");for(let e=0;e<n.length;e++){const t=n[e];A1.call(this,t)}}function Y1(){const n=this.tokenizer.getContextRanges("unicodeVariationSequence");for(let e=0;e<n.length;e++){const t=n[e];G1.call(this,t)}}function j1(){Xr.call(this);const n=this.tokenizer.getContextRanges("thaiWord");for(let e=0;e<n.length;e++){const t=n[e];this.hasFeatureEnabled("thai","liga")&&I1.call(this,t),this.hasFeatureEnabled("thai","rlig")&&F1.call(this,t),this.hasFeatureEnabled("thai","ccmp")&&L1.call(this,t)}}on.prototype.checkContextReady=function(n){return!!this.tokenizer.getContext(n)};on.prototype.applyFeaturesToContexts=function(){this.checkContextReady("ccmpReplacement")&&W1.call(this),this.checkContextReady("arabicWord")&&(H1.call(this),X1.call(this)),this.checkContextReady("latinWord")&&q1.call(this),this.checkContextReady("arabicSentence")&&V1.call(this),this.checkContextReady("thaiWord")&&j1.call(this),this.checkContextReady("unicodeVariationSequence")&&Y1.call(this)};on.prototype.hasFeatureEnabled=function(n,e){return(this.featuresTags[n]||[]).indexOf(e)!==-1};on.prototype.processText=function(n){(!this.text||this.text!==n)&&(this.setText(n),z1.call(this),this.applyFeaturesToContexts())};on.prototype.getBidiText=function(n){return this.processText(n),this.tokenizer.getText()};on.prototype.getTextGlyphs=function(n){this.processText(n);let e=[];for(let t=0;t<this.tokenizer.tokens.length;t++){const i=this.tokenizer.tokens[t];if(i.state.deleted)continue;const r=i.activeState.value;e.push(Array.isArray(r)?r[0]:r)}return e};var $1=on;function Va(n){return{fontFamily:{en:n.familyName||" "},fontSubfamily:{en:n.styleName||" "},fullName:{en:n.fullName||n.familyName+" "+n.styleName},postScriptName:{en:n.postScriptName||(n.familyName+n.styleName).replace(/\s/g,"")},designer:{en:n.designer||" "},designerURL:{en:n.designerURL||" "},manufacturer:{en:n.manufacturer||" "},manufacturerURL:{en:n.manufacturerURL||" "},license:{en:n.license||" "},licenseURL:{en:n.licenseURL||" "},version:{en:n.version||"Version 0.1"},description:{en:n.description||" "},copyright:{en:n.copyright||" "},trademark:{en:n.trademark||" "}}}function dt(n){if(n=n||{},n.tables=n.tables||{},!n.empty){if(!n.familyName)throw new Error("When creating a new Font object, familyName is required.");if(!n.styleName)throw new Error("When creating a new Font object, styleName is required.");if(!n.unitsPerEm)throw new Error("When creating a new Font object, unitsPerEm is required.");if(!n.ascender)throw new Error("When creating a new Font object, ascender is required.");if(n.descender>0)throw new Error("When creating a new Font object, negative descender value is required.");this.names={},this.names.unicode=Va(n),this.names.macintosh=Va(n),this.names.windows=Va(n),this.unitsPerEm=n.unitsPerEm||1e3,this.ascender=n.ascender,this.descender=n.descender,this.createdTimestamp=n.createdTimestamp,this.italicAngle=n.italicAngle||0,this.weightClass=n.weightClass||0;let e=0;n.fsSelection?e=n.fsSelection:(this.italicAngle<0?e|=this.fsSelectionValues.ITALIC:this.italicAngle>0&&(e|=this.fsSelectionValues.OBLIQUE),this.weightClass>=600&&(e|=this.fsSelectionValues.BOLD),e===0&&(e=this.fsSelectionValues.REGULAR)),(!n.panose||!Array.isArray(n.panose))&&(n.panose=[0,0,0,0,0,0,0,0,0]),this.tables=Object.assign(n.tables,{os2:Object.assign({usWeightClass:n.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:n.widthClass||this.usWidthClasses.MEDIUM,bFamilyType:n.panose[0]||0,bSerifStyle:n.panose[1]||0,bWeight:n.panose[2]||0,bProportion:n.panose[3]||0,bContrast:n.panose[4]||0,bStrokeVariation:n.panose[5]||0,bArmStyle:n.panose[6]||0,bLetterform:n.panose[7]||0,bMidline:n.panose[8]||0,bXHeight:n.panose[9]||0,fsSelection:e},n.tables.os2)})}this.supported=!0,this.glyphs=new Cn.GlyphSet(this,n.glyphs||[]),this.encoding=new Fu(this),this.position=new W_(this),this.substitution=new K_(this),this.tables=this.tables||{},this.tables=new Proxy(this.tables,{set:(e,t,i)=>(e[t]=i,e.fvar&&(e.gvar||e.cff2)&&!this.variation&&(this.variation=new fy(this)),!0)}),this.palettes=new fh(this),this.layers=new J_(this),this.svgImages=new Q_(this),this._push=null,this._hmtxTableData={},Object.defineProperty(this,"hinting",{get:function(){return this._hinting?this._hinting:this.outlinesFormat==="truetype"?this._hinting=new VS(this):null}})}dt.prototype.hasChar=function(n){return this.encoding.charToGlyphIndex(n)>0};dt.prototype.charToGlyphIndex=function(n){return this.encoding.charToGlyphIndex(n)};dt.prototype.charToGlyph=function(n){const e=this.charToGlyphIndex(n);let t=this.glyphs.get(e);return t||(t=this.glyphs.get(0)),t};dt.prototype.updateFeatures=function(n){return this.defaultRenderOptions.features.map(e=>e.script==="latn"?{script:"latn",tags:e.tags.filter(t=>n[t])}:e)};dt.prototype.stringToGlyphIndexes=function(n,e){const t=new $1,i=s=>this.charToGlyphIndex(s.char);t.registerModifier("glyphIndex",null,i);let r=e?this.updateFeatures(e.features):this.defaultRenderOptions.features;return t.applyFeatures(this,r),t.getTextGlyphs(n)};dt.prototype.stringToGlyphs=function(n,e){const t=this.stringToGlyphIndexes(n,e);let i=t.length;const r=new Array(i),s=this.glyphs.get(0);for(let a=0;a<i;a+=1)r[a]=this.glyphs.get(t[a])||s;return r};dt.prototype.nameToGlyphIndex=function(n){return this.glyphNames.nameToGlyphIndex(n)};dt.prototype.nameToGlyph=function(n){const e=this.nameToGlyphIndex(n);let t=this.glyphs.get(e);return t||(t=this.glyphs.get(0)),t};dt.prototype.glyphIndexToName=function(n){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(n):""};dt.prototype.getKerningValue=function(n,e){n=n.index||n,e=e.index||e;const t=this.position.defaultKerningTables;return t?this.position.getKerningValue(t,n,e):this.kerningPairs[n+","+e]||0};dt.prototype.defaultRenderOptions={kerning:!0,features:[{script:"arab",tags:["init","medi","fina","rlig"]},{script:"latn",tags:["liga","rlig"]},{script:"thai",tags:["liga","rlig","ccmp"]}],hinting:!1,usePalette:0,drawLayers:!0,drawSVG:!0};dt.prototype.forEachGlyph=function(n,e,t,i,r,s){e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:72,r=Object.assign({},this.defaultRenderOptions,r);const a=1/this.unitsPerEm*i,o=this.stringToGlyphs(n,r);let l;if(r.kerning){const c=r.script||this.position.getDefaultScriptName();l=this.position.getKerningTables(c,r.language)}for(let c=0;c<o.length;c+=1){const u=o[c];if(s.call(this,u,e,t,i,r),u.advanceWidth&&(e+=u.advanceWidth*a),r.kerning&&c<o.length-1){const f=l?this.position.getKerningValue(l,u.index,o[c+1].index):this.getKerningValue(u,o[c+1]);e+=f*a}r.letterSpacing?e+=r.letterSpacing*i:r.tracking&&(e+=r.tracking/1e3*i)}return e};dt.prototype.getPath=function(n,e,t,i,r){r=Object.assign({},this.defaultRenderOptions,r);const s=new Ki;if(s._layers=[],Wu(this,s),s.stroke){const a=1/(s.unitsPerEm||1e3)*i;s.strokeWidth*=a}return this.forEachGlyph(n,e,t,i,r,(a,o,l,c)=>{const u=a.getPath(o,l,c,r,this);if(r.drawSVG||r.drawLayers){const f=u._layers;if(f&&f.length){for(let h=0;h<f.length;h++){const d=f[h];s._layers.push(d)}return}}s.extend(u)}),s};dt.prototype.getPaths=function(n,e,t,i,r){r=Object.assign({},this.defaultRenderOptions,r);const s=[];return this.forEachGlyph(n,e,t,i,r,function(a,o,l,c){const u=a.getPath(o,l,c,r,this);s.push(u)}),s};dt.prototype.getAdvanceWidth=function(n,e,t){return t=Object.assign({},this.defaultRenderOptions,t),this.forEachGlyph(n,0,0,e,t,function(){})};dt.prototype.draw=function(n,e,t,i,r,s){this.getPath(e,t,i,r,s).draw(n)};dt.prototype.drawPoints=function(n,e,t,i,r,s){s=Object.assign({},this.defaultRenderOptions,s),this.forEachGlyph(e,t,i,r,s,function(a,o,l,c){a.drawPoints(n,o,l,c,s,this)})};dt.prototype.drawMetrics=function(n,e,t,i,r,s){s=Object.assign({},this.defaultRenderOptions,s),this.forEachGlyph(e,t,i,r,s,function(a,o,l,c){a.drawMetrics(n,o,l,c)})};dt.prototype.getEnglishName=function(n){const e=(this.names.unicode||this.names.macintosh||this.names.windows)[n];if(e)return e.en};dt.prototype.validate=function(){const n=[],e=this;function t(r,s){r||(console.warn(`[opentype.js] ${s}`),n.push(s))}function i(r){const s=e.getEnglishName(r);t(s&&s.trim().length>0,"No English "+r+" specified.")}if(i("fontFamily"),i("weightName"),i("manufacturer"),i("copyright"),i("version"),t(this.unitsPerEm>0,"No unitsPerEm specified."),this.tables.colr){const r=this.tables.colr.baseGlyphRecords;let s=-1;for(let a=0;a<r.length;a++){const o=r[a].glyphID;if(t(s<r[a].glyphID,`baseGlyphs must be sorted by GlyphID in ascending order, but glyphID ${o} comes after ${s}`),s>r[a].glyphID)break;s=o}}return n};dt.prototype.toTables=function(){return H_.fontToTable(this)};dt.prototype.toBuffer=function(){return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),this.toArrayBuffer()};dt.prototype.toArrayBuffer=function(){const e=this.toTables().encode(),t=new ArrayBuffer(e.length),i=new Uint8Array(t);for(let r=0;r<e.length;r++)i[r]=e[r];return t};dt.prototype.download=function(){console.error("DEPRECATED: platform-specific actions are to be implemented on user-side")};dt.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512};dt.prototype.macStyleValues={BOLD:1,ITALIC:2,UNDERLINE:4,OUTLINED:8,SHADOW:16,CONDENSED:32,EXTENDED:64};dt.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9};dt.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};var Z1=dt;function K1(n,e){const t=new Le.Parser(n,e),i=t.parseUShort(),r=t.parseUShort();i!==1&&console.warn(`Unsupported hvar table version ${i}.${r}`);const s=[i,r],a=t.parsePointer32(function(){return this.parseItemVariationStore()}),o=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),l=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),c=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()});return{version:s,itemVariationStore:a,advanceWidth:o,lsb:l,rsb:c}}function J1(){console.warn("Writing of hvar tables is not yet supported.")}var Q1={make:J1,parse:K1},eb=function(){return{coverage:this.parsePointer($.coverage),attachPoints:this.parseList($.pointer($.uShortList))}},tb=function(){var n=this.parseUShort();if(Ve.argument(n===1||n===2||n===3,"Unsupported CaretValue table version."),n===1)return{coordinate:this.parseShort()};if(n===2)return{pointindex:this.parseShort()};if(n===3)return{coordinate:this.parseShort()}},nb=function(){return this.parseList($.pointer(tb))},ib=function(){return{coverage:this.parsePointer($.coverage),ligGlyphs:this.parseList($.pointer(nb))}},rb=function(){return this.parseUShort(),this.parseList($.pointer($.coverage))};function sb(n,e){e=e||0;const t=new $(n,e),i=t.parseVersion(1);Ve.argument(i===1||i===1.2||i===1.3,"Unsupported GDEF table version.");var r={version:i,classDef:t.parsePointer($.classDef),attachList:t.parsePointer(eb),ligCaretList:t.parsePointer(ib),markAttachClassDef:t.parsePointer($.classDef)};return i>=1.2&&(r.markGlyphSets=t.parsePointer(rb)),r}var ab={parse:sb},gn=new Array(10);gn[1]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{posFormat:1,coverage:this.parsePointer($.coverage),value:this.parseValueRecord()};if(t===2)return{posFormat:2,coverage:this.parsePointer($.coverage),values:this.parseValueRecordList()};Ve.assert(!1,"0x"+e.toString(16)+": GPOS lookup type 1 format must be 1 or 2.")};gn[2]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();Ve.assert(t===1||t===2,"0x"+e.toString(16)+": GPOS lookup type 2 format must be 1 or 2.");const i=this.parsePointer($.coverage),r=this.parseUShort(),s=this.parseUShort();if(t===1)return{posFormat:t,coverage:i,valueFormat1:r,valueFormat2:s,pairSets:this.parseList($.pointer($.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(r),value2:this.parseValueRecord(s)}})))};if(t===2){const a=this.parsePointer($.classDef),o=this.parsePointer($.classDef),l=this.parseUShort(),c=this.parseUShort();return{posFormat:t,coverage:i,valueFormat1:r,valueFormat2:s,classDef1:a,classDef2:o,class1Count:l,class2Count:c,classRecords:this.parseList(l,$.list(c,function(){return{value1:this.parseValueRecord(r),value2:this.parseValueRecord(s)}}))}}};gn[3]=function(){return{error:"GPOS Lookup 3 not supported"}};gn[4]=function(){return{error:"GPOS Lookup 4 not supported"}};gn[5]=function(){return{error:"GPOS Lookup 5 not supported"}};gn[6]=function(){return{error:"GPOS Lookup 6 not supported"}};gn[7]=function(){return{error:"GPOS Lookup 7 not supported"}};gn[8]=function(){return{error:"GPOS Lookup 8 not supported"}};gn[9]=function(){return{error:"GPOS Lookup 9 not supported"}};function ob(n,e){e=e||0;const t=new $(n,e),i=t.parseVersion(1);return Ve.argument(i===1||i===1.1,"Unsupported GPOS table version "+i),i===1?{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(gn)}:{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(gn),variations:t.parseFeatureVariationsList()}}var lb=new Array(10);function cb(n){return new ye.Table("GPOS",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new ye.ScriptList(n.scripts)},{name:"features",type:"TABLE",value:new ye.FeatureList(n.features)},{name:"lookups",type:"TABLE",value:new ye.LookupList(n.lookups,lb)}])}var ub={parse:ob,make:cb};function hb(n){const e={};n.skip("uShort");const t=n.parseUShort();Ve.argument(t===0,"Unsupported kern sub-table version."),n.skip("uShort",2);const i=n.parseUShort();n.skip("uShort",3);for(let r=0;r<i;r+=1){const s=n.parseUShort(),a=n.parseUShort(),o=n.parseShort();e[s+","+a]=o}return e}function fb(n){const e={};n.skip("uShort"),n.parseULong()>1&&console.warn("Only the first kern subtable is supported."),n.skip("uLong");const r=n.parseUShort()&255;if(n.skip("uShort"),r===0){const s=n.parseUShort();n.skip("uShort",3);for(let a=0;a<s;a+=1){const o=n.parseUShort(),l=n.parseUShort(),c=n.parseShort();e[o+","+l]=c}}return e}function db(n,e){const t=new Le.Parser(n,e),i=t.parseUShort();if(i===0)return hb(t);if(i===1)return fb(t);throw new Error("Unsupported kern table version ("+i+").")}var pb={parse:db};function mb(n,e,t,i){const r=new Le.Parser(n,e),s=i?r.parseUShort:r.parseULong,a=[];for(let o=0;o<t+1;o+=1){let l=s.call(r);i&&(l*=2),a.push(l)}return a}var gb={parse:mb};function kc(n,e){const t=[];let i=12;for(let r=0;r<e;r+=1){const s=Le.getTag(n,i),a=Le.getULong(n,i+4),o=Le.getULong(n,i+8),l=Le.getULong(n,i+12);t.push({tag:s,checksum:a,offset:o,length:l,compression:!1}),i+=16}return t}function xb(n,e){const t=[];let i=44;for(let r=0;r<e;r+=1){const s=Le.getTag(n,i),a=Le.getULong(n,i+4),o=Le.getULong(n,i+8),l=Le.getULong(n,i+12);let c;o<l?c="WOFF":c=!1,t.push({tag:s,offset:a,compression:c,compressedLength:o,length:l}),i+=20}return t}function ht(n,e){if(e.compression==="WOFF"){const t=new Uint8Array(n.buffer,e.offset+2,e.compressedLength-2),i=new Uint8Array(e.length);if(Tu(t,i),i.byteLength!==e.length)throw new Error("Decompression error: "+e.tag+" decompressed length doesn't match recorded length");return{data:new DataView(i.buffer,0),offset:0}}else return{data:n,offset:e.offset}}function vb(n,e={}){let t,i;const r=new Z1({empty:!0});n.constructor!==ArrayBuffer&&(n=new Uint8Array(n).buffer);const s=new DataView(n,0);let a,o=[];const l=Le.getTag(s,0);if(l==="\0\0\0"||l==="true"||l==="typ1")r.outlinesFormat="truetype",a=Le.getUShort(s,4),o=kc(s,a);else if(l==="OTTO")r.outlinesFormat="cff",a=Le.getUShort(s,4),o=kc(s,a);else if(l==="wOFF"){const G=Le.getTag(s,4);if(G==="\0\0\0")r.outlinesFormat="truetype";else if(G==="OTTO")r.outlinesFormat="cff";else throw new Error("Unsupported OpenType flavor "+l);a=Le.getUShort(s,12),o=xb(s,a)}else if(l==="wOF2"){const G="https://github.com/opentypejs/opentype.js/issues/183#issuecomment-1147228025";throw new Error("WOFF2 require an external decompressor library, see examples at: "+G)}else throw new Error("Unsupported OpenType signature "+l);let c,u,f,h,d,p,x,m,g,_,v,S,R,M,w,y,P,D;for(let G=0;G<a;G+=1){const k=o[G];let I;switch(k.tag){case"avar":x=k;break;case"cmap":I=ht(s,k),r.tables.cmap=Uu.parse(I.data,I.offset),r.encoding=new Ou(r.tables.cmap);break;case"cvt ":I=ht(s,k),D=new Le.Parser(I.data,I.offset),r.tables.cvt=D.parseShortList(k.length/2);break;case"fvar":f=k;break;case"STAT":h=k;break;case"gvar":d=k;break;case"cvar":p=k;break;case"fpgm":I=ht(s,k),D=new Le.Parser(I.data,I.offset),r.tables.fpgm=D.parseByteList(k.length);break;case"head":I=ht(s,k),r.tables.head=Yu.parse(I.data,I.offset),r.unitsPerEm=r.tables.head.unitsPerEm,t=r.tables.head.indexToLocFormat;break;case"hhea":I=ht(s,k),r.tables.hhea=ju.parse(I.data,I.offset),r.ascender=r.tables.hhea.ascender,r.descender=r.tables.hhea.descender,r.numberOfHMetrics=r.tables.hhea.numberOfHMetrics;break;case"HVAR":R=k;break;case"hmtx":S=k;break;case"ltag":I=ht(s,k),i=Zu.parse(I.data,I.offset);break;case"COLR":I=ht(s,k),r.tables.colr=th.parse(I.data,I.offset);break;case"CPAL":I=ht(s,k),r.tables.cpal=Gu.parse(I.data,I.offset);break;case"maxp":I=ht(s,k),r.tables.maxp=Ku.parse(I.data,I.offset),r.numGlyphs=r.tables.maxp.numGlyphs;break;case"name":y=k;break;case"OS/2":I=ht(s,k),r.tables.os2=so.parse(I.data,I.offset);break;case"post":I=ht(s,k),r.tables.post=Ju.parse(I.data,I.offset),r.glyphNames=new Mo(r.tables.post);break;case"prep":I=ht(s,k),D=new Le.Parser(I.data,I.offset),r.tables.prep=D.parseByteList(k.length);break;case"glyf":m=k;break;case"loca":w=k;break;case"CFF ":c=k;break;case"CFF2":u=k;break;case"kern":M=k;break;case"GDEF":g=k;break;case"GPOS":_=k;break;case"GSUB":v=k;break;case"meta":P=k;break;case"gasp":try{I=ht(s,k),r.tables.gasp=oh.parse(I.data,I.offset)}catch(X){console.warn("Failed to parse gasp table, skipping."),console.warn(X)}break;case"SVG ":I=ht(s,k),r.tables.svg=lh.parse(I.data,I.offset);break}}const F=ht(s,y);if(r.tables.name=Iu.parse(F.data,F.offset,i),r.names=r.tables.name,m&&w){const G=t===0,k=ht(s,w),I=gb.parse(k.data,k.offset,r.numGlyphs,G),X=ht(s,m);r.glyphs=mh.parse(X.data,X.offset,I,r,e)}else if(c){const G=ht(s,c);io.parse(G.data,G.offset,r,e)}else if(u){const G=ht(s,u);io.parse(G.data,G.offset,r,e)}else throw new Error("Font doesn't contain TrueType, CFF or CFF2 outlines.");const B=ht(s,S);if($u.parse(r,B.data,B.offset,r.numberOfHMetrics,r.numGlyphs,r.glyphs,e),dv(r,e),M){const G=ht(s,M);r.kerningPairs=pb.parse(G.data,G.offset)}else r.kerningPairs={};if(g){const G=ht(s,g);r.tables.gdef=ab.parse(G.data,G.offset)}if(_){const G=ht(s,_);r.tables.gpos=ub.parse(G.data,G.offset),r.position.init()}if(v){const G=ht(s,v);r.tables.gsub=Qu.parse(G.data,G.offset)}if(f){const G=ht(s,f);r.tables.fvar=nh.parse(G.data,G.offset,r.names)}if(h){const G=ht(s,h);r.tables.stat=ih.parse(G.data,G.offset,r.tables.fvar)}if(d){f||console.warn("This font provides a gvar table, but no fvar table, which is required for variable fonts."),m||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");const G=ht(s,d);r.tables.gvar=ah.parse(G.data,G.offset,r.tables.fvar,r.glyphs)}if(p){f||console.warn("This font provides a cvar table, but no fvar table, which is required for variable fonts."),r.tables.cvt||console.warn("This font provides a cvar table, but no cvt table which could be made variable."),m||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");const G=ht(s,p);r.tables.cvar=sh.parse(G.data,G.offset,r.tables.fvar,r.tables.cvt||[])}if(x){f||console.warn("This font provides an avar table, but no fvar table, which is required for variable fonts.");const G=ht(s,x);r.tables.avar=rh.parse(G.data,G.offset,r.tables.fvar)}if(R){f||console.warn("This font provides an HVAR table, but no fvar table, which is required for variable fonts."),S||console.warn("This font provides an HVAR table, but no hmtx table to vary.");const G=ht(s,R);r.tables.hvar=Q1.parse(G.data,G.offset,r.tables.fvar)}if(P){const G=ht(s,P);r.tables.meta=eh.parse(G.data,G.offset),r.metas=r.tables.meta}return r.palettes=new fh(r),r}const ws={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class or{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _b=new qs(-1,1,1,-1,0,1);class yb extends kt{constructor(){super(),this.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new yt([0,2,0,0,2,0],2))}}const Sb=new yb;class Io{constructor(e){this._mesh=new Ot(Sb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,_b)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class bb extends or{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Lr.clone(e.uniforms),this.material=new Bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Io(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Bc extends or{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class Tb extends or{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Mb{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new he);this._width=i.width,this._height=i.height,t=new Kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new bb(ws),this.copyPass.material.blending=0,this.timer=new Md}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Bc!==void 0&&(a instanceof Bc?i=!0:a instanceof Tb&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Eb extends or{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Je}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}const Ab={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Je(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class nr extends or{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new he(e.x,e.y):new he(256,256),this.clearColor=new Je(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Kt(s,a,{type:1016}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Kt(s,a,{type:1016});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new Kt(s,a,{type:1016});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),a=Math.round(a/2)}const o=Ab;this.highPassUniforms=Lr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Bt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new he(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Lr.clone(ws.uniforms),this.blendMaterial=new Bt({uniforms:this.copyUniforms,vertexShader:ws.vertexShader,fragmentShader:ws.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Je,this._oldClearAlpha=1,this._basic=new Nr,this._fsQuad=new Io(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new he(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=nr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=nr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new Bt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new he(.5,.5)},direction:{value:new he(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Bt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}nr.BlurDirectionX=new he(1,0);nr.BlurDirectionY=new he(0,1);const Ts={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Cb extends or{constructor(){super(),this.isOutputPass=!0,this.uniforms=Lr.clone(Ts.uniforms),this.material=new su({name:Ts.name,uniforms:this.uniforms,vertexShader:Ts.vertexShader,fragmentShader:Ts.fragmentShader}),this._fsQuad=new Io(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ot.getTransfer(this._outputColorSpace)===ft&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Rb=$t;class Tr extends Br{constructor(e){super(e),this.defaultDPI=90,this.defaultUnit="px"}load(e,t,i,r){const s=this,a=new pd(s.manager);a.setPath(s.path),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(o){try{t(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(e)}},i,r)}parse(e){const t=this;function i(j,N){if(j.nodeType!==1)return;const T=S(j);let E=!1,V=null;switch(j.nodeName){case"svg":N=p(j,N);break;case"style":s(j);break;case"g":N=p(j,N);break;case"path":N=p(j,N),j.hasAttribute("d")&&(V=r(j));break;case"rect":N=p(j,N),V=l(j);break;case"polygon":N=p(j,N),V=c(j);break;case"polyline":N=p(j,N),V=u(j);break;case"circle":N=p(j,N),V=f(j);break;case"ellipse":N=p(j,N),V=h(j);break;case"line":N=p(j,N),V=d(j);break;case"defs":E=!0;break;case"use":N=p(j,N);const se=(j.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),ge=j.viewportElement.getElementById(se);ge?i(ge,N):console.warn("SVGLoader: 'use node' references non-existent node id: "+se);break}V&&(N.fill!==void 0&&N.fill!=="none"&&V.color.setStyle(N.fill,Rb),M(V,ve),B.push(V),V.userData={node:j,style:N});const ie=j.childNodes;for(let J=0;J<ie.length;J++){const se=ie[J];E&&se.nodeName!=="style"&&se.nodeName!=="defs"||i(se,N)}T&&(k.pop(),k.length>0?ve.copy(k[k.length-1]):ve.identity())}function r(j){const N=new Kn,T=new he,E=new he,V=new he;let ie=!0,J=!1;const se=j.getAttribute("d");if(se===""||se==="none")return null;const ge=se.match(/[a-df-z][^a-df-z]*/ig);for(let me=0,z=ge.length;me<z;me++){const Z=ge[me],ee=Z.charAt(0),ae=Z.slice(1).trim();ie===!0&&(J=!0,ie=!1);let O;switch(ee){case"M":O=m(ae);for(let U=0,L=O.length;U<L;U+=2)T.x=O[U+0],T.y=O[U+1],E.x=T.x,E.y=T.y,U===0?N.moveTo(T.x,T.y):N.lineTo(T.x,T.y),U===0&&V.copy(T);break;case"H":O=m(ae);for(let U=0,L=O.length;U<L;U++)T.x=O[U],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"V":O=m(ae);for(let U=0,L=O.length;U<L;U++)T.y=O[U],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"L":O=m(ae);for(let U=0,L=O.length;U<L;U+=2)T.x=O[U+0],T.y=O[U+1],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"C":O=m(ae);for(let U=0,L=O.length;U<L;U+=6)N.bezierCurveTo(O[U+0],O[U+1],O[U+2],O[U+3],O[U+4],O[U+5]),E.x=O[U+2],E.y=O[U+3],T.x=O[U+4],T.y=O[U+5],U===0&&J===!0&&V.copy(T);break;case"S":O=m(ae);for(let U=0,L=O.length;U<L;U+=4)N.bezierCurveTo(x(T.x,E.x),x(T.y,E.y),O[U+0],O[U+1],O[U+2],O[U+3]),E.x=O[U+0],E.y=O[U+1],T.x=O[U+2],T.y=O[U+3],U===0&&J===!0&&V.copy(T);break;case"Q":O=m(ae);for(let U=0,L=O.length;U<L;U+=4)N.quadraticCurveTo(O[U+0],O[U+1],O[U+2],O[U+3]),E.x=O[U+0],E.y=O[U+1],T.x=O[U+2],T.y=O[U+3],U===0&&J===!0&&V.copy(T);break;case"T":O=m(ae);for(let U=0,L=O.length;U<L;U+=2){const Re=x(T.x,E.x),Pe=x(T.y,E.y);N.quadraticCurveTo(Re,Pe,O[U+0],O[U+1]),E.x=Re,E.y=Pe,T.x=O[U+0],T.y=O[U+1],U===0&&J===!0&&V.copy(T)}break;case"A":O=m(ae,[3,4],7);for(let U=0,L=O.length;U<L;U+=7){if(O[U+5]==T.x&&O[U+6]==T.y)continue;const Re=T.clone();T.x=O[U+5],T.y=O[U+6],E.x=T.x,E.y=T.y,a(N,O[U],O[U+1],O[U+2],O[U+3],O[U+4],Re,T),U===0&&J===!0&&V.copy(T)}break;case"m":O=m(ae);for(let U=0,L=O.length;U<L;U+=2)T.x+=O[U+0],T.y+=O[U+1],E.x=T.x,E.y=T.y,U===0?N.moveTo(T.x,T.y):N.lineTo(T.x,T.y),U===0&&V.copy(T);break;case"h":O=m(ae);for(let U=0,L=O.length;U<L;U++)T.x+=O[U],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"v":O=m(ae);for(let U=0,L=O.length;U<L;U++)T.y+=O[U],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"l":O=m(ae);for(let U=0,L=O.length;U<L;U+=2)T.x+=O[U+0],T.y+=O[U+1],E.x=T.x,E.y=T.y,N.lineTo(T.x,T.y),U===0&&J===!0&&V.copy(T);break;case"c":O=m(ae);for(let U=0,L=O.length;U<L;U+=6)N.bezierCurveTo(T.x+O[U+0],T.y+O[U+1],T.x+O[U+2],T.y+O[U+3],T.x+O[U+4],T.y+O[U+5]),E.x=T.x+O[U+2],E.y=T.y+O[U+3],T.x+=O[U+4],T.y+=O[U+5],U===0&&J===!0&&V.copy(T);break;case"s":O=m(ae);for(let U=0,L=O.length;U<L;U+=4)N.bezierCurveTo(x(T.x,E.x),x(T.y,E.y),T.x+O[U+0],T.y+O[U+1],T.x+O[U+2],T.y+O[U+3]),E.x=T.x+O[U+0],E.y=T.y+O[U+1],T.x+=O[U+2],T.y+=O[U+3],U===0&&J===!0&&V.copy(T);break;case"q":O=m(ae);for(let U=0,L=O.length;U<L;U+=4)N.quadraticCurveTo(T.x+O[U+0],T.y+O[U+1],T.x+O[U+2],T.y+O[U+3]),E.x=T.x+O[U+0],E.y=T.y+O[U+1],T.x+=O[U+2],T.y+=O[U+3],U===0&&J===!0&&V.copy(T);break;case"t":O=m(ae);for(let U=0,L=O.length;U<L;U+=2){const Re=x(T.x,E.x),Pe=x(T.y,E.y);N.quadraticCurveTo(Re,Pe,T.x+O[U+0],T.y+O[U+1]),E.x=Re,E.y=Pe,T.x=T.x+O[U+0],T.y=T.y+O[U+1],U===0&&J===!0&&V.copy(T)}break;case"a":O=m(ae,[3,4],7);for(let U=0,L=O.length;U<L;U+=7){if(O[U+5]==0&&O[U+6]==0)continue;const Re=T.clone();T.x+=O[U+5],T.y+=O[U+6],E.x=T.x,E.y=T.y,a(N,O[U],O[U+1],O[U+2],O[U+3],O[U+4],Re,T),U===0&&J===!0&&V.copy(T)}break;case"Z":case"z":N.currentPath.autoClose=!0,N.currentPath.curves.length>0&&(T.copy(V),N.currentPath.currentPoint.copy(T),ie=!0);break;default:console.warn(Z)}J=!1}return N}function s(j){if(!(!j.sheet||!j.sheet.cssRules||!j.sheet.cssRules.length))for(let N=0;N<j.sheet.cssRules.length;N++){const T=j.sheet.cssRules[N];if(T.type!==1)continue;const E=T.selectorText.split(/,/gm).filter(Boolean).map(V=>V.trim());for(let V=0;V<E.length;V++){const ie=Object.fromEntries(Object.entries(T.style).filter(([,J])=>J!==""));G[E[V]]=Object.assign(G[E[V]]||{},ie)}}}function a(j,N,T,E,V,ie,J,se){if(N==0||T==0){j.lineTo(se.x,se.y);return}E=E*Math.PI/180,N=Math.abs(N),T=Math.abs(T);const ge=(J.x-se.x)/2,me=(J.y-se.y)/2,z=Math.cos(E)*ge+Math.sin(E)*me,Z=-Math.sin(E)*ge+Math.cos(E)*me;let ee=N*N,ae=T*T;const O=z*z,U=Z*Z,L=O/ee+U/ae;if(L>1){const xe=Math.sqrt(L);N=xe*N,T=xe*T,ee=N*N,ae=T*T}const Re=ee*U+ae*O,Pe=(ee*ae-Re)/Re;let He=Math.sqrt(Math.max(0,Pe));V===ie&&(He=-He);const fe=He*N*Z/T,rt=-He*T*z/N,C=Math.cos(E)*fe-Math.sin(E)*rt+(J.x+se.x)/2,b=Math.sin(E)*fe+Math.cos(E)*rt+(J.y+se.y)/2,Q=o(1,0,(z-fe)/N,(Z-rt)/T),ce=o((z-fe)/N,(Z-rt)/T,(-z-fe)/N,(-Z-rt)/T)%(Math.PI*2);j.currentPath.absellipse(C,b,N,T,Q,Q+ce,ie===0,E)}function o(j,N,T,E){const V=j*T+N*E,ie=Math.sqrt(j*j+N*N)*Math.sqrt(T*T+E*E);let J=Math.acos(Math.max(-1,Math.min(1,V/ie)));return j*E-N*T<0&&(J=-J),J}function l(j){const N=v(j.getAttribute("x")||0),T=v(j.getAttribute("y")||0),E=v(j.getAttribute("rx")||j.getAttribute("ry")||0),V=v(j.getAttribute("ry")||j.getAttribute("rx")||0),ie=v(j.getAttribute("width")),J=v(j.getAttribute("height")),se=1-.551915024494,ge=new Kn;return ge.moveTo(N+E,T),ge.lineTo(N+ie-E,T),(E!==0||V!==0)&&ge.bezierCurveTo(N+ie-E*se,T,N+ie,T+V*se,N+ie,T+V),ge.lineTo(N+ie,T+J-V),(E!==0||V!==0)&&ge.bezierCurveTo(N+ie,T+J-V*se,N+ie-E*se,T+J,N+ie-E,T+J),ge.lineTo(N+E,T+J),(E!==0||V!==0)&&ge.bezierCurveTo(N+E*se,T+J,N,T+J-V*se,N,T+J-V),ge.lineTo(N,T+V),(E!==0||V!==0)&&ge.bezierCurveTo(N,T+V*se,N+E*se,T,N+E,T),ge}function c(j){function N(ie,J,se){const ge=v(J),me=v(se);V===0?E.moveTo(ge,me):E.lineTo(ge,me),V++}const T=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,E=new Kn;let V=0;return j.getAttribute("points").replace(T,N),E.currentPath.autoClose=!0,E}function u(j){function N(ie,J,se){const ge=v(J),me=v(se);V===0?E.moveTo(ge,me):E.lineTo(ge,me),V++}const T=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,E=new Kn;let V=0;return j.getAttribute("points").replace(T,N),E.currentPath.autoClose=!1,E}function f(j){const N=v(j.getAttribute("cx")||0),T=v(j.getAttribute("cy")||0),E=v(j.getAttribute("r")||0),V=new Xi;V.absarc(N,T,E,0,Math.PI*2);const ie=new Kn;return ie.subPaths.push(V),ie}function h(j){const N=v(j.getAttribute("cx")||0),T=v(j.getAttribute("cy")||0),E=v(j.getAttribute("rx")||0),V=v(j.getAttribute("ry")||0),ie=new Xi;ie.absellipse(N,T,E,V,0,Math.PI*2);const J=new Kn;return J.subPaths.push(ie),J}function d(j){const N=v(j.getAttribute("x1")||0),T=v(j.getAttribute("y1")||0),E=v(j.getAttribute("x2")||0),V=v(j.getAttribute("y2")||0),ie=new Kn;return ie.moveTo(N,T),ie.lineTo(E,V),ie.currentPath.autoClose=!1,ie}function p(j,N){N=Object.assign({},N);let T={};if(j.hasAttribute("class")){const J=j.getAttribute("class").split(/\s/).filter(Boolean).map(se=>se.trim());for(let se=0;se<J.length;se++)T=Object.assign(T,G["."+J[se]])}j.hasAttribute("id")&&(T=Object.assign(T,G["#"+j.getAttribute("id")]));function E(J,se,ge){ge===void 0&&(ge=function(z){return z.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),z}),j.hasAttribute(J)&&(N[se]=ge(j.getAttribute(J))),T[se]&&(N[se]=ge(T[se])),j.style&&j.style[J]!==""&&(N[se]=ge(j.style[J]))}function V(J){return Math.max(0,Math.min(1,v(J)))}function ie(J){return Math.max(0,v(J))}return E("fill","fill"),E("fill-opacity","fillOpacity",V),E("fill-rule","fillRule"),E("opacity","opacity",V),E("stroke","stroke"),E("stroke-opacity","strokeOpacity",V),E("stroke-width","strokeWidth",ie),E("stroke-linejoin","strokeLineJoin"),E("stroke-linecap","strokeLineCap"),E("stroke-miterlimit","strokeMiterLimit",ie),E("visibility","visibility"),N}function x(j,N){return j-(N-j)}function m(j,N,T){if(typeof j!="string")throw new TypeError("Invalid input: "+typeof j);const E={WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},V=0,ie=1,J=2,se=3;let ge=V,me=!0,z="",Z="";const ee=[];function ae(Re,Pe,He){const fe=new SyntaxError('Unexpected character "'+Re+'" at index '+Pe+".");throw fe.partial=He,fe}function O(){z!==""&&(Z===""?ee.push(Number(z)):ee.push(Number(z)*Math.pow(10,Number(Z)))),z="",Z=""}let U;const L=j.length;for(let Re=0;Re<L;Re++){if(U=j[Re],Array.isArray(N)&&N.includes(ee.length%T)&&E.FLAGS.test(U)){ge=ie,z=U,O();continue}if(ge===V){if(E.WHITESPACE.test(U))continue;if(E.DIGIT.test(U)||E.SIGN.test(U)){ge=ie,z=U;continue}if(E.POINT.test(U)){ge=J,z=U;continue}E.COMMA.test(U)&&(me&&ae(U,Re,ee),me=!0)}if(ge===ie){if(E.DIGIT.test(U)){z+=U;continue}if(E.POINT.test(U)){z+=U,ge=J;continue}if(E.EXP.test(U)){ge=se;continue}E.SIGN.test(U)&&z.length===1&&E.SIGN.test(z[0])&&ae(U,Re,ee)}if(ge===J){if(E.DIGIT.test(U)){z+=U;continue}if(E.EXP.test(U)){ge=se;continue}E.POINT.test(U)&&z[z.length-1]==="."&&ae(U,Re,ee)}if(ge===se){if(E.DIGIT.test(U)){Z+=U;continue}if(E.SIGN.test(U)){if(Z===""){Z+=U;continue}Z.length===1&&E.SIGN.test(Z)&&ae(U,Re,ee)}}E.WHITESPACE.test(U)?(O(),ge=V,me=!1):E.COMMA.test(U)?(O(),ge=V,me=!0):E.SIGN.test(U)?(O(),ge=ie,z=U):E.POINT.test(U)?(O(),ge=J,z=U):ae(U,Re,ee)}return O(),ee}const g=["mm","cm","in","pt","pc","px"],_={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function v(j){let N="px";if(typeof j=="string"||j instanceof String)for(let E=0,V=g.length;E<V;E++){const ie=g[E];if(j.endsWith(ie)){N=ie,j=j.substring(0,j.length-ie.length);break}}let T;return N==="px"&&t.defaultUnit!=="px"?T=_.in[t.defaultUnit]/t.defaultDPI:(T=_[N][t.defaultUnit],T<0&&(T=_[N].in*t.defaultDPI)),T*parseFloat(j)}function S(j){if(!(j.hasAttribute("transform")||j.nodeName==="use"&&(j.hasAttribute("x")||j.hasAttribute("y"))))return null;const N=R(j);return k.length>0&&N.premultiply(k[k.length-1]),ve.copy(N),k.push(N),N}function R(j){const N=new Ze,T=I;if(j.nodeName==="use"&&(j.hasAttribute("x")||j.hasAttribute("y"))){const E=v(j.getAttribute("x")||0),V=v(j.getAttribute("y")||0);N.translate(E,V)}if(j.hasAttribute("transform")){const E=j.getAttribute("transform").split(")");for(let V=E.length-1;V>=0;V--){const ie=E[V].trim();if(ie==="")continue;const J=ie.indexOf("("),se=ie.length;if(J>0&&J<se){const ge=ie.slice(0,J),me=m(ie.slice(J+1));switch(T.identity(),ge){case"translate":if(me.length>=1){const z=me[0];let Z=0;me.length>=2&&(Z=me[1]),T.translate(z,Z)}break;case"rotate":if(me.length>=1){let z=0,Z=0,ee=0;z=me[0]*Math.PI/180,me.length>=3&&(Z=me[1],ee=me[2]),X.makeTranslation(-Z,-ee),H.makeRotation(z),Y.multiplyMatrices(H,X),X.makeTranslation(Z,ee),T.multiplyMatrices(X,Y)}break;case"scale":if(me.length>=1){const z=me[0];let Z=z;me.length>=2&&(Z=me[1]),T.scale(z,Z)}break;case"skewX":me.length===1&&T.set(1,Math.tan(me[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":me.length===1&&T.set(1,0,0,Math.tan(me[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":me.length===6&&T.set(me[0],me[2],me[4],me[1],me[3],me[5],0,0,1);break}}N.premultiply(T)}}return N}function M(j,N){function T(J){pe.set(J.x,J.y,1).applyMatrix3(N),J.set(pe.x,pe.y)}function E(J){const se=J.xRadius,ge=J.yRadius,me=Math.cos(J.aRotation),z=Math.sin(J.aRotation),Z=new q(se*me,se*z,0),ee=new q(-ge*z,ge*me,0),ae=Z.applyMatrix3(N),O=ee.applyMatrix3(N),U=I.set(ae.x,O.x,0,ae.y,O.y,0,0,0,1),L=X.copy(U).invert(),He=H.copy(L).transpose().multiply(L).elements,fe=F(He[0],He[1],He[4]),rt=Math.sqrt(fe.rt1),C=Math.sqrt(fe.rt2);if(J.xRadius=1/rt,J.yRadius=1/C,J.aRotation=Math.atan2(fe.sn,fe.cs),!((J.aEndAngle-J.aStartAngle)%(2*Math.PI)<Number.EPSILON)){const Q=X.set(rt,0,0,0,C,0,0,0,1),ce=H.set(fe.cs,fe.sn,0,-fe.sn,fe.cs,0,0,0,1),xe=Q.multiply(ce).multiply(U),Se=be=>{const{x:oe,y:de}=new q(Math.cos(be),Math.sin(be),0).applyMatrix3(xe);return Math.atan2(de,oe)};J.aStartAngle=Se(J.aStartAngle),J.aEndAngle=Se(J.aEndAngle),w(N)&&(J.aClockwise=!J.aClockwise)}}function V(J){const se=P(N),ge=D(N);J.xRadius*=se,J.yRadius*=ge;const me=se>Number.EPSILON?Math.atan2(N.elements[1],N.elements[0]):Math.atan2(-N.elements[3],N.elements[4]);J.aRotation+=me,w(N)&&(J.aStartAngle*=-1,J.aEndAngle*=-1,J.aClockwise=!J.aClockwise)}const ie=j.subPaths;for(let J=0,se=ie.length;J<se;J++){const me=ie[J].curves;for(let z=0;z<me.length;z++){const Z=me[z];Z.isLineCurve?(T(Z.v1),T(Z.v2)):Z.isCubicBezierCurve?(T(Z.v0),T(Z.v1),T(Z.v2),T(Z.v3)):Z.isQuadraticBezierCurve?(T(Z.v0),T(Z.v1),T(Z.v2)):Z.isEllipseCurve&&(le.set(Z.aX,Z.aY),T(le),Z.aX=le.x,Z.aY=le.y,y(N)?E(Z):V(Z))}}}function w(j){const N=j.elements;return N[0]*N[4]-N[1]*N[3]<0}function y(j){const N=j.elements,T=N[0]*N[3]+N[1]*N[4];if(T===0)return!1;const E=P(j),V=D(j);return Math.abs(T/(E*V))>Number.EPSILON}function P(j){const N=j.elements;return Math.sqrt(N[0]*N[0]+N[1]*N[1])}function D(j){const N=j.elements;return Math.sqrt(N[3]*N[3]+N[4]*N[4])}function F(j,N,T){let E,V,ie,J,se;const ge=j+T,me=j-T,z=Math.sqrt(me*me+4*N*N);return ge>0?(E=.5*(ge+z),se=1/E,V=j*se*T-N*se*N):ge<0?V=.5*(ge-z):(E=.5*z,V=-.5*z),me>0?ie=me+z:ie=me-z,Math.abs(ie)>2*Math.abs(N)?(se=-2*N/ie,J=1/Math.sqrt(1+se*se),ie=se*J):Math.abs(N)===0?(ie=1,J=0):(se=-.5*ie/N,ie=1/Math.sqrt(1+se*se),J=se*ie),me>0&&(se=ie,ie=-J,J=se),{rt1:E,rt2:V,cs:ie,sn:J}}const B=[],G={},k=[],I=new Ze,X=new Ze,H=new Ze,Y=new Ze,le=new he,pe=new q,ve=new Ze,Te=new DOMParser().parseFromString(e,"image/svg+xml");return i(Te.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:B,xml:Te.documentElement}}static createShapes(e){const i={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},r={loc:i.ORIGIN,t:0};function s(x,m,g,_){const v=x.x,S=m.x,R=g.x,M=_.x,w=x.y,y=m.y,P=g.y,D=_.y,F=(M-R)*(w-P)-(D-P)*(v-R),B=(S-v)*(w-P)-(y-w)*(v-R),G=(D-P)*(S-v)-(M-R)*(y-w),k=F/G,I=B/G;if(G===0&&F!==0||k<=0||k>=1||I<0||I>1)return null;if(F===0&&G===0){for(let X=0;X<2;X++)if(a(X===0?g:_,x,m),r.loc==i.ORIGIN){const H=X===0?g:_;return{x:H.x,y:H.y,t:r.t}}else if(r.loc==i.BETWEEN){const H=+(v+r.t*(S-v)).toPrecision(10),Y=+(w+r.t*(y-w)).toPrecision(10);return{x:H,y:Y,t:r.t}}return null}else{for(let Y=0;Y<2;Y++)if(a(Y===0?g:_,x,m),r.loc==i.ORIGIN){const le=Y===0?g:_;return{x:le.x,y:le.y,t:r.t}}const X=+(v+k*(S-v)).toPrecision(10),H=+(w+k*(y-w)).toPrecision(10);return{x:X,y:H,t:k}}}function a(x,m,g){const _=g.x-m.x,v=g.y-m.y,S=x.x-m.x,R=x.y-m.y,M=_*R-S*v;if(x.x===m.x&&x.y===m.y){r.loc=i.ORIGIN,r.t=0;return}if(x.x===g.x&&x.y===g.y){r.loc=i.DESTINATION,r.t=1;return}if(M<-Number.EPSILON){r.loc=i.LEFT;return}if(M>Number.EPSILON){r.loc=i.RIGHT;return}if(_*S<0||v*R<0){r.loc=i.BEHIND;return}if(Math.sqrt(_*_+v*v)<Math.sqrt(S*S+R*R)){r.loc=i.BEYOND;return}let w;_!==0?w=S/_:w=R/v,r.loc=i.BETWEEN,r.t=w}function o(x,m){const g=[],_=[];for(let v=1;v<x.length;v++){const S=x[v-1],R=x[v];for(let M=1;M<m.length;M++){const w=m[M-1],y=m[M],P=s(S,R,w,y);P!==null&&g.find(D=>D.t<=P.t+Number.EPSILON&&D.t>=P.t-Number.EPSILON)===void 0&&(g.push(P),_.push(new he(P.x,P.y)))}}return _}function l(x,m,g){const _=new he;m.getCenter(_);const v=[];return g.forEach(S=>{S.boundingBox.containsPoint(_)&&o(x,S.points).forEach(M=>{v.push({identifier:S.identifier,isCW:S.isCW,point:M})})}),v.sort((S,R)=>S.point.x-R.point.x),v}function c(x,m,g,_,v){(v==null||v==="")&&(v="nonzero");const S=new he;x.boundingBox.getCenter(S);const R=[new he(g,S.y),new he(_,S.y)],M=l(R,x.boundingBox,m);M.sort((B,G)=>B.point.x-G.point.x);const w=[],y=[];M.forEach(B=>{B.identifier===x.identifier?w.push(B):y.push(B)});const P=w[0].point.x,D=[];let F=0;for(;F<y.length&&y[F].point.x<P;)D.length>0&&D[D.length-1]===y[F].identifier?D.pop():D.push(y[F].identifier),F++;if(D.push(x.identifier),v==="evenodd"){const B=D.length%2===0,G=D[D.length-2];return{identifier:x.identifier,isHole:B,for:G}}else if(v==="nonzero"){let B=!0,G=null,k=null;for(let I=0;I<D.length;I++){const X=D[I];B?(k=m[X].isCW,B=!1,G=X):k!==m[X].isCW&&(k=m[X].isCW,B=!0)}return{identifier:x.identifier,isHole:B,for:G}}else console.warn('fill-rule: "'+v+'" is currently not implemented.')}let u=999999999,f=-999999999,h=e.subPaths.map(x=>{const m=x.getPoints();let g=-999999999,_=999999999,v=-999999999,S=999999999;for(let R=0;R<m.length;R++){const M=m[R];M.y>g&&(g=M.y),M.y<_&&(_=M.y),M.x>v&&(v=M.x),M.x<S&&(S=M.x)}return f<=v&&(f=v+1),u>=S&&(u=S-1),{curves:x.curves,points:m,isCW:dn.isClockWise(m),identifier:-1,boundingBox:new Ad(new he(S,_),new he(v,g))}});h=h.filter(x=>x.points.length>1);for(let x=0;x<h.length;x++)h[x].identifier=x;const d=h.map(x=>c(x,h,u,f,e.userData?e.userData.style.fillRule:void 0)),p=[];return h.forEach(x=>{if(!d[x.identifier].isHole){const g=new gi;g.curves=x.curves,d.filter(v=>v.isHole&&v.for===x.identifier).forEach(v=>{const S=h[v.identifier],R=new Xi;R.curves=S.curves,g.holes.push(R)}),p.push(g)}}),p}static getStrokeStyle(e,t,i,r,s){return e=e!==void 0?e:1,t=t!==void 0?t:"#000",i=i!==void 0?i:"miter",r=r!==void 0?r:"butt",s=s!==void 0?s:4,{strokeColor:t,strokeWidth:e,strokeLineJoin:i,strokeLineCap:r,strokeMiterLimit:s}}static pointsToStroke(e,t,i,r){const s=[],a=[],o=[];if(Tr.pointsToStrokeWithBuffers(e,t,i,r,s,a,o)===0)return null;const l=new kt;return l.setAttribute("position",new yt(s,3)),l.setAttribute("normal",new yt(a,3)),l.setAttribute("uv",new yt(o,2)),l}static pointsToStrokeWithBuffers(e,t,i,r,s,a,o,l){const c=new he,u=new he,f=new he,h=new he,d=new he,p=new he,x=new he,m=new he,g=new he,_=new he,v=new he,S=new he,R=new he,M=new he,w=new he,y=new he,P=new he;i=i!==void 0?i:12,r=r!==void 0?r:.001,l=l!==void 0?l:0,e=me(e);const D=e.length;if(D<2)return 0;const F=e[0].equals(e[D-1]);let B,G=e[0],k;const I=t.strokeWidth/2,X=1/(D-1);let H=0,Y,le,pe,ve,Te=!1,Ne=0,j=l*3,N=l*2;T(e[0],e[1],c).multiplyScalar(I),m.copy(e[0]).sub(c),g.copy(e[0]).add(c),_.copy(m),v.copy(g);for(let z=1;z<D;z++){B=e[z],z===D-1?F?k=e[1]:k=void 0:k=e[z+1];const Z=c;if(T(G,B,Z),f.copy(Z).multiplyScalar(I),S.copy(B).sub(f),R.copy(B).add(f),Y=H+X,le=!1,k!==void 0){T(B,k,u),f.copy(u).multiplyScalar(I),M.copy(B).sub(f),w.copy(B).add(f),pe=!0,f.subVectors(k,G),Z.dot(f)<0&&(pe=!1),z===1&&(Te=pe),f.subVectors(k,B),f.normalize();const ee=Math.abs(Z.dot(f));if(ee>Number.EPSILON){const ae=I/ee;f.multiplyScalar(-ae),h.subVectors(B,G),d.copy(h).setLength(ae).add(f),y.copy(d).negate();const O=d.length(),U=h.length();h.divideScalar(U),p.subVectors(k,B);const L=p.length();switch(p.divideScalar(L),h.dot(y)<U&&p.dot(y)<L&&(le=!0),P.copy(d).add(B),y.add(B),ve=!1,le?pe?(w.copy(y),R.copy(y)):(M.copy(y),S.copy(y)):ie(),t.strokeLineJoin){case"bevel":J(pe,le,Y);break;case"round":se(pe,le),pe?V(B,S,M,Y,0):V(B,w,R,Y,1);break;default:const Re=I*t.strokeMiterLimit/O;if(Re<1)if(t.strokeLineJoin!=="miter-clip"){J(pe,le,Y);break}else se(pe,le),pe?(p.subVectors(P,S).multiplyScalar(Re).add(S),x.subVectors(P,M).multiplyScalar(Re).add(M),E(S,Y,0),E(p,Y,0),E(B,Y,.5),E(B,Y,.5),E(p,Y,0),E(x,Y,0),E(B,Y,.5),E(x,Y,0),E(M,Y,0)):(p.subVectors(P,R).multiplyScalar(Re).add(R),x.subVectors(P,w).multiplyScalar(Re).add(w),E(R,Y,1),E(p,Y,1),E(B,Y,.5),E(B,Y,.5),E(p,Y,1),E(x,Y,1),E(B,Y,.5),E(x,Y,1),E(w,Y,1));else le?(pe?(E(g,H,1),E(m,H,0),E(P,Y,0),E(g,H,1),E(P,Y,0),E(y,Y,1)):(E(g,H,1),E(m,H,0),E(P,Y,1),E(m,H,0),E(y,Y,0),E(P,Y,1)),pe?M.copy(P):w.copy(P)):pe?(E(S,Y,0),E(P,Y,0),E(B,Y,.5),E(B,Y,.5),E(P,Y,0),E(M,Y,0)):(E(R,Y,1),E(P,Y,1),E(B,Y,.5),E(B,Y,.5),E(P,Y,1),E(w,Y,1)),ve=!0;break}}else ie()}else ie();!F&&z===D-1&&ge(e[0],_,v,pe,!0,H),H=Y,G=B,m.copy(M),g.copy(w)}if(!F)ge(B,S,R,pe,!1,Y);else if(le&&s){let z=P,Z=y;Te!==pe&&(z=y,Z=P),pe?(ve||Te)&&(Z.toArray(s,0),Z.toArray(s,9),ve&&z.toArray(s,3)):(ve||!Te)&&(Z.toArray(s,3),Z.toArray(s,9),ve&&z.toArray(s,0))}return Ne;function T(z,Z,ee){return ee.subVectors(Z,z),ee.set(-ee.y,ee.x).normalize()}function E(z,Z,ee){s&&(s[j]=z.x,s[j+1]=z.y,s[j+2]=0,a&&(a[j]=0,a[j+1]=0,a[j+2]=1),j+=3,o&&(o[N]=Z,o[N+1]=ee,N+=2)),Ne+=3}function V(z,Z,ee,ae,O){c.copy(Z).sub(z).normalize(),u.copy(ee).sub(z).normalize();let U=Math.PI;const L=c.dot(u);Math.abs(L)<1&&(U=Math.abs(Math.acos(L))),U/=i,f.copy(Z);for(let Re=0,Pe=i-1;Re<Pe;Re++)h.copy(f).rotateAround(z,U),E(f,ae,O),E(h,ae,O),E(z,ae,.5),f.copy(h);E(f,ae,O),E(ee,ae,O),E(z,ae,.5)}function ie(){E(g,H,1),E(m,H,0),E(S,Y,0),E(g,H,1),E(S,Y,0),E(R,Y,1)}function J(z,Z,ee){Z?z?(E(g,H,1),E(m,H,0),E(S,Y,0),E(g,H,1),E(S,Y,0),E(y,Y,1),E(S,ee,0),E(M,ee,0),E(y,ee,.5)):(E(g,H,1),E(m,H,0),E(R,Y,1),E(m,H,0),E(y,Y,0),E(R,Y,1),E(R,ee,1),E(y,ee,0),E(w,ee,1)):z?(E(S,ee,0),E(M,ee,0),E(B,ee,.5)):(E(R,ee,1),E(w,ee,0),E(B,ee,.5))}function se(z,Z){Z&&(z?(E(g,H,1),E(m,H,0),E(S,Y,0),E(g,H,1),E(S,Y,0),E(y,Y,1),E(S,H,0),E(B,Y,.5),E(y,Y,1),E(B,Y,.5),E(M,H,0),E(y,Y,1)):(E(g,H,1),E(m,H,0),E(R,Y,1),E(m,H,0),E(y,Y,0),E(R,Y,1),E(R,H,1),E(y,Y,0),E(B,Y,.5),E(B,Y,.5),E(y,Y,0),E(w,H,1)))}function ge(z,Z,ee,ae,O,U){switch(t.strokeLineCap){case"round":O?V(z,ee,Z,U,.5):V(z,Z,ee,U,.5);break;case"square":if(O)c.subVectors(Z,z),u.set(c.y,-c.x),f.addVectors(c,u).add(z),h.subVectors(u,c).add(z),ae?(f.toArray(s,3),h.toArray(s,0),h.toArray(s,9)):(f.toArray(s,3),o[7]===1?h.toArray(s,9):f.toArray(s,9),h.toArray(s,0));else{c.subVectors(ee,z),u.set(c.y,-c.x),f.addVectors(c,u).add(z),h.subVectors(u,c).add(z);const L=s.length;ae?(f.toArray(s,L-3),h.toArray(s,L-6),h.toArray(s,L-12)):(h.toArray(s,L-6),f.toArray(s,L-3),h.toArray(s,L-12))}break}}function me(z){let Z=!1;for(let ae=1,O=z.length-1;ae<O;ae++)if(z[ae].distanceTo(z[ae+1])<r){Z=!0;break}if(!Z)return z;const ee=[];ee.push(z[0]);for(let ae=1,O=z.length-1;ae<O;ae++)z[ae].distanceTo(z[ae+1])>=r&&ee.push(z[ae]);return ee.push(z[z.length-1]),ee}}}function wb(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,l=new kt;let c=0;for(let u=0;u<n.length;++u){const f=n[u];let h=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(e){let d;if(t)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(t){let u=0;const f=[];for(let h=0;h<n.length;++h){const d=n[h].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+u);u+=n[h].attributes.position.count}l.setIndex(f)}for(const u in s){const f=Gc(s[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(const u in a){const f=a[u][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let x=0;x<a[u].length;++x)d.push(a[u][x][h]);const p=Gc(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}}return l}function Gc(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const a=new e(s),o=new pn(a,t,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const f=l/t;for(let h=0,d=u.count;h<d;h++)for(let p=0;p<t;p++){const x=u.getComponent(h,p);o.setComponent(h+f,p,x)}}else a.set(u.array,l);l+=u.count*t}return r!==void 0&&(o.gpuType=r),o}function Pb(n,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},i=n.getIndex(),r=n.getAttribute("position"),s=i?i.count:r.count;let a=0;const o=Object.keys(n.attributes),l={},c={},u=[],f=["getX","getY","getZ","getW"],h=["setX","setY","setZ","setW"];for(let _=0,v=o.length;_<v;_++){const S=o[_],R=n.attributes[S];l[S]=new R.constructor(new R.array.constructor(R.count*R.itemSize),R.itemSize,R.normalized);const M=n.morphAttributes[S];M&&(c[S]||(c[S]=[]),M.forEach((w,y)=>{const P=new w.array.constructor(w.count*w.itemSize);c[S][y]=new w.constructor(P,w.itemSize,w.normalized)}))}const d=e*.5,p=Math.log10(1/e),x=Math.pow(10,p),m=d*x;for(let _=0;_<s;_++){const v=i?i.getX(_):_;let S="";for(let R=0,M=o.length;R<M;R++){const w=o[R],y=n.getAttribute(w),P=y.itemSize;for(let D=0;D<P;D++)S+=`${~~(y[f[D]](v)*x+m)},`}if(S in t)u.push(t[S]);else{for(let R=0,M=o.length;R<M;R++){const w=o[R],y=n.getAttribute(w),P=n.morphAttributes[w],D=y.itemSize,F=l[w],B=c[w];for(let G=0;G<D;G++){const k=f[G],I=h[G];if(F[I](a,y[k](v)),P)for(let X=0,H=P.length;X<H;X++)B[X][I](a,P[X][k](v))}}t[S]=a,u.push(a),a++}}const g=n.clone();for(const _ in n.attributes){const v=l[_];if(g.setAttribute(_,new v.constructor(v.array.slice(0,a*v.itemSize),v.itemSize,v.normalized)),_ in c)for(let S=0;S<c[_].length;S++){const R=c[_][S];g.morphAttributes[_][S]=new R.constructor(R.array.slice(0,a*R.itemSize),R.itemSize,R.normalized)}}return g.setIndex(u),g}async function Lb(){const n=()=>0,e=new Proxy({},{get:()=>n}),t=await fetch("/cmotion-render.wasm");if(!t.ok)throw new Error(`could not fetch /cmotion-render.wasm: ${t.status}`);const{instance:i}=await WebAssembly.instantiateStreaming(t,{wasi_snapshot_preview1:e});return i.exports}function Th(n,e,t){return new TextDecoder().decode(new Uint8Array(n.memory.buffer,e,t))}function Db(n){const t=n.cm_alloc(64),i=n.get_version(t,64),r=Th(n,t,i);return n.cm_free(t,64),r}function Ib(n,e){const t=new TextEncoder().encode(e),i=n.cm_alloc(t.length);new Uint8Array(n.memory.buffer).set(t,i);const r=n.parse_eval(i,t.length);if(n.cm_free(i,t.length),r===0)throw new Error("parse_eval failed — fix syntax / eval errors in the source");return r}function Ub(n,e,t){let i=65536;for(;i<=4*1024*1024;){const r=n.cm_alloc(i),s=BigInt(Math.floor(t*1e9)),a=n.sample_at(e,s,r,i);if(a===0)throw new Error(`sample_at returned 0 at t=${t}s`);const o=Th(n,r,a);return n.cm_free(r,i),JSON.parse(o)}throw new Error("sample_at output exceeded 4 MiB")}function Tt(n){const e={};for(const t of n.fields??[])t.name&&(e[t.name]=t.value);return e}function Nt(n){return(n.fields??[]).filter(e=>!e.name).map(e=>e.value)}function nt(n,e=0){return!n||n.kind!=="number"?e:n.value}function Ha(n,e=0){return!n||n.kind!=="number"?e:n.unit==="deg"?n.value*Math.PI/180:n.value}function qr(n){return n&&n.kind==="array"?n.elems:[]}function Fb(n,e,t){const i=t*Math.PI/180,r=e*Math.cos(i),s=e*Math.sin(i),a=n+.3963377774*r+.2158037573*s,o=n-.1055613458*r-.0638541728*s,l=n-.0894841775*r-1.291485548*s,c=a**3,u=o**3,f=l**3,h=4.0767416621*c-3.3077115913*u+.2309699292*f,d=-1.2684380046*c+2.6097574011*u-.3413193965*f,p=-.0041960863*c-.7034186147*u+1.707614701*f;return[Math.max(0,Math.min(1,h)),Math.max(0,Math.min(1,d)),Math.max(0,Math.min(1,p))]}function ti(n){const e=new Je;if(!n||n.kind!=="color")return e;switch(n.form){case"hex":{const t=String(n.digits||"ffffff");return e.setStyle(`#${t}`),e}case"rgb":return e.setRGB(nt(n.r),nt(n.g),nt(n.b)),e;case"oklch":{const[t,i,r]=Fb(nt(n.l),nt(n.c),nt(n.h));return e.setRGB(t,i,r,Mr),e}default:return e}}const zc=new Map,Ob=new gd;function Mh(n){const e=zc.get(n);if(e)return e;const t=Ob.load(n);return t.colorSpace=$t,zc.set(n,t),t}function Uo(n){if(!n||n.kind!=="constructed")return null;if(n.name==="as_texture"||n.name==="fit")return Uo(Nt(n)[0]);if(n.name==="image"){const e=Nt(n)[0];return!e||e.kind!=="string"?null:String(e.raw).replace(/^"|"$/g,"")}return null}let Wa=null;function Nb(){return Wa||(Wa=fetch("/DMSans-Bold.ttf").then(n=>{if(!n.ok)throw new Error(`font fetch failed: ${n.status}`);return n.arrayBuffer()}).then(n=>vb(n))),Wa}function kb(n,e){const t=new Kn;let i=0;for(const r of e){const s=n.charToGlyph(r);for(const a of s.getPath(i,0,1).commands)switch(a.type){case"M":t.moveTo(a.x,-a.y);break;case"L":t.lineTo(a.x,-a.y);break;case"Q":t.quadraticCurveTo(a.x1,-a.y1,a.x,-a.y);break;case"C":t.bezierCurveTo(a.x1,-a.y1,a.x2,-a.y2,a.x,-a.y);break}i+=(s.advanceWidth??n.unitsPerEm)/n.unitsPerEm}return t.toShapes(!1)}const Fo=6,Oo=28,Ws=2*Fo*Math.tan(Oo*Math.PI/360);let _t=Ws/1080;function Bb(n){return{font:n,lights:[],background:null,glyphScale:2.5,sceneAspect:16/9,bloom:null}}function Gb(n){const e=Tt(n),t=nt(e.width)*_t,i=nt(e.height)*_t,r=new rr(t,i),s=new Nr({color:ti(e.fill)});return new Ot(r,s)}function zb(n){const e=Tt(n),t=nt(e.radius)*_t,i=new fo(t,64),r=new Nr({color:ti(e.fill)});return new Ot(i,r)}function Vb(n){const e=Tt(n),t=Nt(n),r=nt(e.r??e.radius??t[0],50)*_t,s=new xo(r,64,32),a=new Zi({color:16777215,roughness:1}),o=new Ot(s,a);return o.userData.radiusWorld=r,o}function Hb(n,e){const t=Nt(n),i=wn(t[0],e);if(!i)return null;const r=t[1],s=r?.kind==="constructed"?r.name:null,a=Wb(i),o=new mi;return s==="bottom"?i.position.y+=a:s==="top"?i.position.y-=a:s==="left"?i.position.x+=a:s==="right"&&(i.position.x-=a),o.add(i),o.userData.radiusWorld=a,o}function Wb(n){if(typeof n.userData?.radiusWorld=="number")return n.userData.radiusWorld;let e=0;return n.traverse(t=>{if(t.isMesh&&t.geometry){t.geometry.computeBoundingSphere?.();const i=t.geometry.boundingSphere?.radius??0;i>e&&(e=i)}}),e}function Xb(n,e){const t=Nt(n),i=Tt(n),r=wn(t[0],e);if(!r)return null;const s=nt(i.factor??t[1],0),a=Math.max(.02,1-s),o=s>=0?Math.sqrt(1/a):1/Math.sqrt(Math.max(.02,1+s));return r.scale.x*=o,r.scale.y*=a,r.scale.z*=o,r}function qb(n,e){const t=Nt(n),i=Tt(n),r=wn(t[0],e);if(!r)return null;const s=a=>!a||a.kind!=="number"?0:a.unit==="px"?a.value*_t:a.value;return r.position.x+=s(i.x),r.position.y+=s(i.y),r.position.z+=s(i.z),r}function Yb(n){if(!n||n.kind!=="constructed"||n.name!=="vec2")return null;const e=Tt(n),t=Nt(n),i=e.x?nt(e.x):nt(t[0]),r=e.y?nt(e.y):nt(t[1]);return{x:i,y:r}}function jb(n,e){const t=Tt(n),i=Nt(n),r=t.points??i.find(u=>u.kind==="array"),s=qr(r).map(Yb).filter(u=>u!==null);if(s.length<3)return console.warn(`[cmotion-viewer] extrude(path): need ≥3 points, got ${s.length}`),null;const a=new gi;a.moveTo(s[0].x*_t,s[0].y*_t);for(let u=1;u<s.length;u++)a.lineTo(s[u].x*_t,s[u].y*_t);a.closePath();const o=e*_t,l=Math.max(o*.1,.5*_t),c=new Pr(a,{depth:o,bevelEnabled:!0,bevelThickness:l,bevelSize:l,bevelSegments:4,curveSegments:1});return c.center(),new Ot(c,new Zi({color:16777215}))}function $b(n,e){const t=Nt(n),i=Tt(n),r=t[0];if(r&&r.kind==="constructed"&&r.name==="path")return jb(r,nt(i.depth,16));if(!r||r.kind!=="constructed"||r.name!=="text.glyph")return console.warn(`[cmotion-viewer] extrude: unsupported inner ${r?.name}`),null;const s=Nt(r),a=String(s[0]?.raw??'""').replace(/^"|"$/g,"")||"?",o=kb(e.font,a);if(o.length===0)return null;const l=nt(i.depth,16),c=Tt(r).size;if(c&&c.kind==="number"){const g=e.font.tables.hhea,_=e.font.unitsPerEm/(g.ascender-g.descender),v=c.value*_*_t,S=l*_t,R=S*.3,M=new Pr(o,{depth:S,bevelEnabled:!0,bevelThickness:R,bevelSize:R/v,bevelSegments:4,curveSegments:32});return M.scale(v,v,1),M.center(),new Ot(M,new Zi({color:16777215}))}const u=l*.025,f=new Pr(o,{depth:u,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:4,curveSegments:32});f.computeBoundingBox();const h=f.boundingBox,d=h.max.x-h.min.x,p=Ws*e.sceneAspect*.82,x=d*e.glyphScale>p?p/d:e.glyphScale;f.scale(x,x,1),f.center();const m=new Zi({color:16777215});return new Ot(f,m)}const Xs=24,Zb=`
  varying vec3 vWorldPos;
  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Kb=`
  precision highp float;
  varying vec3 vWorldPos;
  uniform vec4 uBlobs[${Xs}];   // xyz = centre (world), w = radius (world)
  uniform int  uCount;
  uniform float uK;
  uniform vec3 uAlbedo;                 // linear
  uniform vec3 uRim;                    // linear
  uniform float uSpecExp;
  uniform vec3 uKeyDir;  uniform vec3 uKeyCol;
  uniform vec3 uFillDir; uniform vec3 uFillCol;

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }
  float map(vec3 p) {
    float d = 1e9;
    for (int i = 0; i < ${Xs}; i++) {
      if (i >= uCount) break;
      d = smin(d, length(p - uBlobs[i].xyz) - uBlobs[i].w, uK);
    }
    return d;
  }
  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(1.0, -1.0) * 0.0012;
    return normalize(
      e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) +
      e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
  }
  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorldPos - cameraPosition);
    float t = 0.0;
    bool hit = false;
    vec3 p;
    for (int i = 0; i < 180; i++) {
      p = ro + rd * t;
      float d = map(p);
      if (d < 0.0006) { hit = true; break; }
      t += d;
      if (t > 16.0) break;
    }
    if (!hit) discard;
    vec3 N = calcNormal(p);
    vec3 V = -rd;
    float dK = max(dot(N, uKeyDir), 0.0);
    float dF = max(dot(N, uFillDir), 0.0);
    vec3 H = normalize(uKeyDir + V);
    float spec = pow(max(dot(N, H), 0.0), uSpecExp);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    float amb = 0.10;
    vec3 col = uAlbedo * (amb + dK * uKeyCol + dF * uFillCol)
             + spec * 1.05
             + fres * uRim * 1.4;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;function Jb(n,e){const t=Tt(n),i=Nt(n),r=qr(t.blobs??i[0]),s=[];for(const h of r){if(h?.kind!=="constructed"||h.name!=="blob")continue;const d=Tt(h),p=d.at?.kind==="constructed"&&d.at.name==="vec3"?No(d.at):new q,x=nt(d.radius,100)*_t;if(s.push(new bt(p.x*_t,p.y*_t,p.z*_t,x)),s.length>=Xs)break}if(s.length===0)return null;const a=s.slice();for(;a.length<Xs;)a.push(new bt(0,0,0,0));const o=new Bt({vertexShader:Zb,fragmentShader:Kb,uniforms:{uBlobs:{value:a},uCount:{value:s.length},uK:{value:nt(t.smoothing,80)*_t},uAlbedo:{value:new Je(.4,.035,.012)},uRim:{value:new Je(1,.45,.1)},uSpecExp:{value:80},uKeyDir:{value:new q(-.45,.8,.5).normalize()},uKeyCol:{value:new Je(1,.5,.22)},uFillDir:{value:new q(.6,-.3,.5).normalize()},uFillCol:{value:new Je(.9,.25,.08)}}}),l=1,c=2*l*Math.tan(Oo*Math.PI/360),u=c*e.sceneAspect,f=new Ot(new rr(u,c),o);return f.position.set(0,0,Fo-l),f.frustumCulled=!1,f.renderOrder=1,f.userData.raymarch=!0,f}function Qb(n,e){const t=Nt(n),i=Tt(n),r=wn(t[0],e);if(!r)return null;if(r.userData?.raymarch&&r.material){const f=r.material.uniforms;return i.fill&&(f.uAlbedo.value=ti(i.fill).convertSRGBToLinear()),i.emissive&&(f.uRim.value=ti(i.emissive).convertSRGBToLinear()),i.roughness&&(f.uSpecExp.value=Qh.lerp(100,16,nt(i.roughness,.2))),r}const s=i.emissive_intensity,a=s&&s.kind==="constructed"&&s.name==="gradient"?s:null,o=Uo(i.fill),l={metalness:nt(i.metalness,0),roughness:nt(i.roughness,1),emissive:ti(i.emissive),emissiveIntensity:a?1:nt(i.emissive_intensity,0)};o?(l.color=16777215,l.map=Mh(o)):l.color=ti(i.fill);const c=nt(i.opacity,1);c<1&&(l.transparent=!0,l.opacity=c);const u=new Zi(l);return a&&eT(r,u,a),r.traverse(f=>{f.isMesh&&(f.material?.dispose?.(),f.material=u)}),r}function eT(n,e,t){const i=Tt(t),r=nt(i.top,1),s=nt(i.bottom,1);let a=1/0,o=-1/0;n.traverse(l=>{if(l.isMesh&&l.geometry){l.geometry.computeBoundingBox?.();const c=l.geometry.boundingBox;c&&(a=Math.min(a,c.min.y),o=Math.max(o,c.max.y))}}),!(!isFinite(a)||!isFinite(o)||o-a<1e-6)&&(e.onBeforeCompile=l=>{l.uniforms.uRampTop={value:r},l.uniforms.uRampBottom={value:s},l.uniforms.uRampMinY={value:a},l.uniforms.uRampMaxY={value:o},l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
varying float vRampY;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  vRampY = position.y;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
varying float vRampY;
uniform float uRampTop;
uniform float uRampBottom;
uniform float uRampMinY;
uniform float uRampMaxY;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  float _ramp = clamp((vRampY - uRampMinY) / max(1e-4, (uRampMaxY - uRampMinY)), 0.0, 1.0);
  totalEmissiveRadiance *= mix(uRampBottom, uRampTop, _ramp);`)},e.needsUpdate=!0)}function tT(n,e){const t=Nt(n),i=Tt(n),r=wn(t[0],e);return r?(r.rotation.x=Ha(i.x),r.rotation.y=Ha(i.y),r.rotation.z=Ha(i.z),r):null}function nT(n,e){const t=Nt(n),i=wn(t[0],e);if(!i)return null;const r=nt(t[1],1);return i.scale.set(r,r,r),i}function No(n){const e=Nt(n);return new q(nt(e[0]),nt(e[1]),nt(e[2]))}function ko(n){const e=Tt(n),t=e.color??e.tint;return t?ti(t):new Je(16777215)}function iT(n){const e=Tt(n),t=nt(Nt(n)[0]??e.intensity,.3);return new Sd(ko(n),t)}function rT(n){const e=Tt(n),t=e.from?.kind==="constructed"&&e.from.name==="vec3"?No(e.from):new q(0,1,0),i=nt(e.intensity,1),r=new yd(ko(n),i);return r.position.copy(t),r}function sT(n){const e=Tt(n),t=(e.at??e.position)?.kind==="constructed"&&(e.at??e.position).name==="vec3"?No(e.at??e.position):new q,i=nt(e.range,600)*_t,r=new vd(ko(n),nt(e.intensity,1),i,2);return r.position.set(t.x*_t,t.y*_t,t.z*_t),r}function aT(n,e){const t=Nt(n),i=Tt(n),r=qr(i.lights);for(const s of r)if(s?.kind==="constructed"){if(s.name==="ambient")e.lights.push(iT(s));else if(s.name==="directional")e.lights.push(rT(s));else if(s.name==="spotlight"||s.name==="point")e.lights.push(sT(s));else if(s.name==="bloom"){const a=Tt(s);e.bloom={strength:nt(a.strength,.8),radius:nt(a.radius,.4),threshold:nt(a.threshold,.6)}}}return wn(t[0],e)}function oT(n){if(!n||n.kind!=="string"||typeof n.raw!="string")return null;const e=n.raw;return e.length>=6&&e.startsWith('"""')&&e.endsWith('"""')?e.slice(3,-3):e.length>=2&&e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1):e}function lT(n,e){const t=Pb(n.toNonIndexed(),1e-4),i=t.getAttribute("position"),r=t.getIndex().array,s=e/2,a=[],o=(f,h)=>a.push(i.getX(f),i.getY(f),h),l=new Map,c=(f,h)=>f*1000003+h;for(let f=0;f<r.length;f+=3){const h=r[f],d=r[f+1],p=r[f+2];for(const[x,m]of[[h,d],[d,p],[p,h]])l.set(c(x,m),(l.get(c(x,m))??0)+1)}for(let f=0;f<r.length;f+=3){const h=r[f],d=r[f+1],p=r[f+2];o(h,s),o(d,s),o(p,s),o(p,-s),o(d,-s),o(h,-s);for(const[x,m]of[[h,d],[d,p],[p,h]])l.get(c(m,x))||(o(x,s),o(m,s),o(m,-s),o(x,s),o(m,-s),o(x,-s))}const u=new kt;return u.setAttribute("position",new yt(a,3)),u.computeVertexNormals(),u}function cT(n){const e=Tt(n),t=Nt(n),i=oT(e.source??t[0]);if(!i)return console.warn("[cmotion-viewer] svg(): missing source string"),null;const r=nt(e.depth,16),s=nt(e.size,400);let a;try{a=new Tr().parse(i)}catch(g){return console.warn("[cmotion-viewer] svg(): parse failed",g),null}const o=[],l=g=>{const _=g.toNonIndexed(),v=new kt;return v.setAttribute("position",_.getAttribute("position")),v};for(const g of a.paths){const _=g.userData?.style??{},v=_.fill&&_.fill!=="none",S=_.stroke&&_.stroke!=="none";if(v||!v&&!S)for(const R of Tr.createShapes(g))o.push(l(new go(R,16)));if(S)for(const R of g.subPaths){const M=R.getPoints();if(M.length<2)continue;const w=Tr.pointsToStroke(M,_);w&&o.push(l(w))}}if(o.length===0)return console.warn("[cmotion-viewer] svg(): nothing to render"),null;const c=o.length===1?o[0]:wb(o,!1)??o[0];c.computeBoundingBox();const u=c.boundingBox,f=Math.max(1e-4,u.max.y-u.min.y),h=(u.max.x+u.min.x)/2,d=(u.max.y+u.min.y)/2,p=s*_t/f,x=new St().makeScale(p,-p,1).multiply(new St().makeTranslation(-h,-d,0));c.applyMatrix4(x);const m=lT(c,r*_t);return new Ot(m,new Zi({color:16777215}))}function wn(n,e){if(!n||n.kind!=="constructed")return null;switch(n.name){case"compose":{const t=new mi;for(const i of qr(Tt(n).layers)){const r=wn(i,e);r&&t.add(r)}return t}case"rect":return Gb(n);case"circle":return zb(n);case"sphere":return Vb(n);case"metaballs":return Jb(n,e);case"render3d":return aT(n,e);case"extrude":return $b(n,e);case"svg":return cT(n);case"material":return Qb(n,e);case"rotate":return tT(n,e);case"scale":return nT(n,e);case"translate":return qb(n,e);case"pivot":return Hb(n,e);case"squash":return Xb(n,e);case"image":case"fit":case"as_texture":return console.warn(`[cmotion-viewer] "${n.name}" only renders as a material fill or compose background`),null;default:return console.warn(`[cmotion-viewer] no translator for "${n.name}"`),null}}function uT(n,e){const t=new mi,i=qr(Tt(n).layers),r=i[0];if(r?.kind==="constructed"&&r.name==="rect"){const s=Tt(r),a=nt(s.width,1920),o=nt(s.height,1080);_t=Ws/(o>0?o:1080),e.sceneAspect=o>0?a/o:16/9,e.background=ti(s.fill)}else if(r?.kind==="constructed"&&(r.name==="fit"||r.name==="image")){const s=Uo(r);s&&(_t=Ws/1080,e.sceneAspect=16/9,e.background=Mh(s))}return i.forEach((s,a)=>{if(a===0&&e.background)return;const o=wn(s,e);o&&t.add(o)}),t}function hT(n,e=6){const t=/\bduration\b\s*(?::\s*Duration)?\s*=\s*(\d+(?:\.\d+)?)\s*(s|ms|m)\b/i,i=n.match(t);if(!i)return e;const r=parseFloat(i[1]);switch(i[2].toLowerCase()){case"ms":return r/1e3;case"m":return r*60;default:return r}}async function dT(n){const[e,t]=await Promise.all([Lb(),Nb()]),i=Db(e);let r=0,s=null,a=[],o=6,l=0,c=16/9;const u=new bx({canvas:n,antialias:!0,preserveDrawingBuffer:!0});u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.outputColorSpace=$t;const f=new tn(Oo,c,.1,100);f.position.set(0,0,Fo),f.lookAt(0,0,0);const h=new pf;h.background=new Je(0);let d=null,p=null,x=null;function m(){if(!d){d=new Mb(u),d.addPass(new Eb(h,f)),p=new nr(new he(1,1),.8,.4,.6),d.addPass(p),d.addPass(new Cb);const w=u.getSize(new he);d.setSize(w.x,w.y)}return d}function g(){if(x){const w=m();p&&(p.strength=x.strength,p.radius=x.radius,p.threshold=x.threshold),w.render()}else u.render(h,f)}function _(){const w=n.parentElement;if(!w)return;const y=getComputedStyle(w),P=(parseFloat(y.paddingLeft)||0)+(parseFloat(y.paddingRight)||0),D=(parseFloat(y.paddingTop)||0)+(parseFloat(y.paddingBottom)||0),F=w.clientWidth-P,B=w.clientHeight-D;if(F<=0||B<=0)return;let G=F,k=G/c;k>B&&(k=B,G=k*c),n.style.width=`${G}px`,n.style.height=`${k}px`,u.setSize(G,k,!1),d?.setSize(G,k),f.aspect=c,f.updateProjectionMatrix(),r&&g()}const v=new ResizeObserver(_);n.parentElement&&v.observe(n.parentElement),_();function S(){s&&(h.remove(s),s.traverse(w=>{w.geometry?.dispose?.();const y=w.material;Array.isArray(y)?y.forEach(P=>P?.dispose?.()):y?.dispose?.()}),s=null);for(const w of a)h.remove(w);a=[]}function R(w){if(!r)return;l=w;const y=Ub(e,r,w),P=Bb(t);let D=null;y?.kind==="constructed"&&y.name==="compose"?D=uT(y,P):D=wn(y,P),S(),P.background&&(h.background=P.background);for(const F of P.lights)h.add(F),a.push(F);D&&(h.add(D),s=D),x=P.bloom,Math.abs(P.sceneAspect-c)>1e-6&&(c=P.sceneAspect,_()),g()}function M(w){r&&(e.release(r),r=0),r=Ib(e,w),o=hT(w),R(0)}return{load:M,seek:R,resize:_,get durationSeconds(){return o},versions:{cmotion:i,three:"184"},captureFrame(){return R(l),new Promise(w=>n.toBlob(y=>w(y),"image/png"))},captureClip(w={}){const y=w.duration??o,P=w.fps??30,D=w.onProgress,G=(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1?["video/mp4;codecs=avc1.42E01E","video/mp4;codecs=avc1","video/mp4"]:["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4;codecs=avc1.42E01E","video/mp4;codecs=avc1","video/mp4"]).find(le=>MediaRecorder.isTypeSupported(le));if(!G)return Promise.reject(new Error("no supported video codec in this browser"));const k=G.startsWith("video/mp4")?"mp4":"webm",I=G.split(";")[0],X=n.captureStream(P),H=new MediaRecorder(X,{mimeType:G,videoBitsPerSecond:8e6}),Y=[];return H.ondataavailable=le=>le.data.size&&Y.push(le.data),new Promise((le,pe)=>{H.onerror=Ne=>pe(new Error(`MediaRecorder error: ${Ne.error?.name??"unknown"}`)),H.onstop=()=>le({blob:new Blob(Y,{type:I}),ext:k,mime:I}),H.start(250);const ve=performance.now(),Te=()=>{const Ne=(performance.now()-ve)/1e3;if(Ne>=y){try{R(y),D?.(y)}catch{}setTimeout(()=>H.stop(),100);return}try{R(Ne),D?.(Ne)}catch(j){H.stop(),pe(j);return}requestAnimationFrame(Te)};requestAnimationFrame(Te)})},destroy(){v.disconnect(),r&&(e.release(r),r=0),S(),d?.dispose(),u.dispose()}}}export{dT as b};
