const jt="srgb",mr="srgb-linear",gs="linear",ft="srgb";const ko="300 es";function Sh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function bh(){const n=gr("canvas");return n.style.display="block",n}const Go={};function Vo(...n){const e="THREE."+n.shift();console.log(e,...n)}function Dc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function qe(...n){n=Dc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function at(...n){n=Dc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Na(...n){const e=n.join(" ");e in Go||(Go[e]=!0,qe(...n))}function Mh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Th={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};class gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zo=1234567;const ur=Math.PI/180,vr=180/Math.PI;function vi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function to(n,e){return(n%e+e)%e}function Eh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ah(n,e,t){return n!==e?(t-n)/(e-n):0}function hr(n,e,t){return(1-t)*n+t*e}function Ch(n,e,t,i){return hr(n,e,1-Math.exp(-t*i))}function Rh(n,e=1){return e-Math.abs(to(n,e*2)-e)}function wh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Ph(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Lh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Dh(n,e){return n+Math.random()*(e-n)}function Ih(n){return n*(.5-Math.random())}function Uh(n){n!==void 0&&(zo=n);let e=zo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fh(n){return n*ur}function Oh(n){return n*vr}function Nh(n){return(n&n-1)===0&&n!==0}function Bh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function kh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Gh(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),u=a((e+i)/2),f=s((e-i)/2),h=a((e-i)/2),d=s((i-e)/2),p=a((i-e)/2);switch(r){case"XYX":n.set(o*u,l*f,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*f,o*c);break;case"ZXZ":n.set(l*f,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*p,l*d,o*c);break;case"YXY":n.set(l*d,o*u,l*p,o*c);break;case"ZYZ":n.set(l*p,l*d,o*u,o*c);break;default:qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Vi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Vh={DEG2RAD:ur,RAD2DEG:vr,generateUUID:vi,clamp:rt,euclideanModulo:to,mapLinear:Eh,inverseLerp:Ah,lerp:hr,damp:Ch,pingpong:Rh,smoothstep:wh,smootherstep:Ph,randInt:Lh,randFloat:Dh,randFloatSpread:Ih,seededRandom:Uh,degToRad:Fh,radToDeg:Oh,isPowerOfTwo:Nh,ceilPowerOfTwo:Bh,floorPowerOfTwo:kh,setQuaternionFromProperEuler:Gh,normalize:Xt,denormalize:Vi};class Ee{static{Ee.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ji{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],d=s[a+1],p=s[a+2],v=s[a+3];if(f!==v||l!==h||c!==d||u!==p){let m=l*h+c*d+u*p+f*v;m<0&&(h=-h,d=-d,p=-p,v=-v,m=-m);let g=1-o;if(m<.9995){const _=Math.acos(m),S=Math.sin(_);g=Math.sin(g*_)/S,o=Math.sin(o*_)/S,l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+v*o}else{l=l*g+h*o,c=c*g+d*o,u=u*g+p*o,f=f*g+v*o;const _=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=_,c*=_,u*=_,f*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],d=s[a+2],p=s[a+3];return e[t]=o*p+u*f+l*d-c*h,e[t+1]=l*p+u*h+c*f-o*d,e[t+2]=c*p+u*d+o*h-l*f,e[t+3]=u*p-o*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),d=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{static{O.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ho.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ho.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xs.copy(this).projectOnVector(e),this.sub(Xs)}reflect(e){return this.sub(Xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xs=new O,Ho=new Ji;class Ke{static{Ke.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],v=r[0],m=r[3],g=r[6],_=r[1],S=r[4],b=r[7],R=r[2],T=r[5],w=r[8];return s[0]=a*v+o*_+l*R,s[3]=a*m+o*S+l*T,s[6]=a*g+o*b+l*w,s[1]=c*v+u*_+f*R,s[4]=c*m+u*S+f*T,s[7]=c*g+u*b+f*w,s[2]=h*v+d*_+p*R,s[5]=h*m+d*S+p*T,s[8]=h*g+d*b+p*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,d=c*s-a*l,p=t*f+i*h+r*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=f*v,e[1]=(r*c-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=h*v,e[4]=(u*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=d*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(qs.makeScale(e,t)),this}rotate(e){return this.premultiply(qs.makeRotation(-e)),this}translate(e,t){return this.premultiply(qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qs=new Ke,Wo=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xo=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zh(){const n={enabled:!0,workingColorSpace:mr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ft&&(r.r=Nn(r.r),r.g=Nn(r.g),r.b=Nn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ft&&(r.r=zi(r.r),r.g=zi(r.g),r.b=zi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?gs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Na("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Na("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[mr]:{primaries:e,whitePoint:i,transfer:gs,toXYZ:Wo,fromXYZ:Xo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:Wo,fromXYZ:Xo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),n}const st=zh();function Nn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ti;class Hh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ti===void 0&&(Ti=gr("canvas")),Ti.width=e.width,Ti.height=e.height;const r=Ti.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ti}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=gr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Nn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Nn(t[i]/255)*255):t[i]=Nn(t[i]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wh=0;class no{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ys(r[a].image)):s.push(Ys(r[a]))}else s=Ys(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ys(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Hh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let Xh=0;const js=new O;class Gt extends gi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,i=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=Gt.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=vi(),this.name="",this.source=new no(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(js).x}get height(){return this.source.getSize(js).y}get depth(){return this.source.getSize(js).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=300;Gt.DEFAULT_ANISOTROPY=1;class _t{static{_t.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+m)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,b=(d+1)/2,R=(g+1)/2,T=(u+h)/4,w=(f+v)/4,y=(p+m)/4;return S>b&&S>R?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=T/i,s=w/i):b>R?b<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),i=T/r,s=y/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=w/s,r=y/s),this.set(i,r,s,t),this}let _=Math.sqrt((m-p)*(m-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-p)/_,this.y=(f-v)/_,this.z=(h-u)/_,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qh extends gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new Gt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new no(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends qh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ic extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yh extends Gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class St{static{St.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,l,c,u,f,h,d,p,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,v,m)}set(e,t,i,r,s,a,o,l,c,u,f,h,d,p,v,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=d,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Ei.setFromMatrixColumn(e,0).length(),s=1/Ei.setFromMatrixColumn(e,1).length(),a=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+p*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h+v*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,p=c*u,v=c*f;t[0]=h-v*o,t[4]=-a*f,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,d=a*f,p=o*u,v=o*f;t[0]=l*u,t[4]=p*c-d,t[8]=h*c+v,t[1]=l*f,t[5]=v*c+h,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=v-h*f,t[8]=p*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*f+p,t[10]=h-v*f}else if(e.order==="XZY"){const h=a*l,d=a*c,p=o*l,v=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+v,t[5]=a*u,t[9]=d*f-p,t[2]=p*f-d,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jh,e,$h)}lookAt(e,t,i){const r=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),zn.crossVectors(i,Zt),zn.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),zn.crossVectors(i,Zt)),zn.normalize(),Or.crossVectors(Zt,zn),r[0]=zn.x,r[4]=Or.x,r[8]=Zt.x,r[1]=zn.y,r[5]=Or.y,r[9]=Zt.y,r[2]=zn.z,r[6]=Or.z,r[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],v=i[6],m=i[10],g=i[14],_=i[3],S=i[7],b=i[11],R=i[15],T=r[0],w=r[4],y=r[8],A=r[12],L=r[1],P=r[5],k=r[9],F=r[13],I=r[2],C=r[6],G=r[10],z=r[14],Q=r[3],te=r[7],le=r[11],ue=r[15];return s[0]=a*T+o*L+l*I+c*Q,s[4]=a*w+o*P+l*C+c*te,s[8]=a*y+o*k+l*G+c*le,s[12]=a*A+o*F+l*z+c*ue,s[1]=u*T+f*L+h*I+d*Q,s[5]=u*w+f*P+h*C+d*te,s[9]=u*y+f*k+h*G+d*le,s[13]=u*A+f*F+h*z+d*ue,s[2]=p*T+v*L+m*I+g*Q,s[6]=p*w+v*P+m*C+g*te,s[10]=p*y+v*k+m*G+g*le,s[14]=p*A+v*F+m*z+g*ue,s[3]=_*T+S*L+b*I+R*Q,s[7]=_*w+S*P+b*C+R*te,s[11]=_*y+S*k+b*G+R*le,s[15]=_*A+S*F+b*z+R*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],p=e[3],v=e[7],m=e[11],g=e[15],_=l*d-c*h,S=o*d-c*f,b=o*h-l*f,R=a*d-c*u,T=a*h-l*u,w=a*f-o*u;return t*(v*_-m*S+g*b)-i*(p*_-m*R+g*T)+r*(p*S-v*R+g*w)-s*(p*b-v*T+m*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],p=e[12],v=e[13],m=e[14],g=e[15],_=t*o-i*a,S=t*l-r*a,b=t*c-s*a,R=i*l-r*o,T=i*c-s*o,w=r*c-s*l,y=u*v-f*p,A=u*m-h*p,L=u*g-d*p,P=f*m-h*v,k=f*g-d*v,F=h*g-d*m,I=_*F-S*k+b*P+R*L-T*A+w*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/I;return e[0]=(o*F-l*k+c*P)*C,e[1]=(r*k-i*F-s*P)*C,e[2]=(v*w-m*T+g*R)*C,e[3]=(h*T-f*w-d*R)*C,e[4]=(l*L-a*F-c*A)*C,e[5]=(t*F-r*L+s*A)*C,e[6]=(m*b-p*w-g*S)*C,e[7]=(u*w-h*b+d*S)*C,e[8]=(a*k-o*L+c*y)*C,e[9]=(i*L-t*k-s*y)*C,e[10]=(p*T-v*b+g*_)*C,e[11]=(f*b-u*T-d*_)*C,e[12]=(o*A-a*P-l*y)*C,e[13]=(t*P-i*A+r*y)*C,e[14]=(v*S-p*R-m*_)*C,e[15]=(u*R-f*S+h*_)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,h=s*c,d=s*u,p=s*f,v=a*u,m=a*f,g=o*f,_=l*c,S=l*u,b=l*f,R=i.x,T=i.y,w=i.z;return r[0]=(1-(v+g))*R,r[1]=(d+b)*R,r[2]=(p-S)*R,r[3]=0,r[4]=(d-b)*T,r[5]=(1-(h+g))*T,r[6]=(m+_)*T,r[7]=0,r[8]=(p+S)*w,r[9]=(m-_)*w,r[10]=(1-(h+v))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let a=Ei.set(r[0],r[1],r[2]).length();const o=Ei.set(r[4],r[5],r[6]).length(),l=Ei.set(r[8],r[9],r[10]).length();s<0&&(a=-a),an.copy(this);const c=1/a,u=1/o,f=1/l;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=u,an.elements[5]*=u,an.elements[6]*=u,an.elements[8]*=f,an.elements[9]*=f,an.elements[10]*=f,t.setFromRotationMatrix(an),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,r,s,a,o=2e3,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(i-r),h=(t+e)/(t-e),d=(i+r)/(i-r);let p,v;if(l)p=s/(a-s),v=a*s/(a-s);else if(o===2e3)p=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===2001)p=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=2e3,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-r),h=-(t+e)/(t-e),d=-(i+r)/(i-r);let p,v;if(l)p=1/(a-s),v=a/(a-s);else if(o===2e3)p=-2/(a-s),v=-(a+s)/(a-s);else if(o===2001)p=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ei=new O,an=new St,jh=new O(0,0,0),$h=new O(1,1,1),zn=new O,Or=new O,Zt=new O,qo=new St,Yo=new Ji;class ei{constructor(e=0,t=0,i=0,r=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yo.setFromEuler(this),this.setFromQuaternion(Yo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Uc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zh=0;const jo=new O,Ai=new Ji,Ln=new St,Nr=new O,tr=new O,Kh=new O,Jh=new Ji,$o=new O(1,0,0),Zo=new O(0,1,0),Ko=new O(0,0,1),Jo={type:"added"},Qh={type:"removed"},Ci={type:"childadded",child:null},$s={type:"childremoved",child:null};class Vt extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new O,t=new ei,i=new Ji,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ke}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis($o,e)}rotateY(e){return this.rotateOnAxis(Zo,e)}rotateZ(e){return this.rotateOnAxis(Ko,e)}translateOnAxis(e,t){return jo.copy(e).applyQuaternion(this.quaternion),this.position.add(jo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($o,e)}translateY(e){return this.translateOnAxis(Zo,e)}translateZ(e){return this.translateOnAxis(Ko,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Nr.copy(e):Nr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(tr,Nr,this.up):Ln.lookAt(Nr,tr,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),Ai.setFromRotationMatrix(Ln),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jo),Ci.child=e,this.dispatchEvent(Ci),Ci.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qh),$s.child=e,this.dispatchEvent($s),$s.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jo),Ci.child=e,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Kh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new O(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fi extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ef={type:"move"};class Zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ef)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new fi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function Ks(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=to(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ks(a,s,e+1/3),this.g=Ks(a,s,e),this.b=Ks(a,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=jt){function i(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const i=Fc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return st.workingToColorSpace(Bt.copy(this),e),Math.round(rt(Bt.r*255,0,255))*65536+Math.round(rt(Bt.g*255,0,255))*256+Math.round(rt(Bt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Bt.copy(this),t);const i=Bt.r,r=Bt.g,s=Bt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=jt){st.workingToColorSpace(Bt.copy(this),e);const t=Bt.r,i=Bt.g,r=Bt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Hn),this.setHSL(Hn.h+e,Hn.s+t,Hn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hn),e.getHSL(Br);const i=hr(Hn.h,Br.h,t),r=hr(Hn.s,Br.s,t),s=hr(Hn.l,Br.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new it;it.NAMES=Fc;class tf extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const on=new O,Dn=new O,Js=new O,In=new O,Ri=new O,wi=new O,Qo=new O,Qs=new O,ea=new O,ta=new O,na=new _t,ia=new _t,ra=new _t;class un{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){on.subVectors(r,t),Dn.subVectors(i,t),Js.subVectors(e,t);const a=on.dot(on),o=on.dot(Dn),l=on.dot(Js),c=Dn.dot(Dn),u=Dn.dot(Js),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return s.set(1-d-p,p,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(e,t,i,r,s,a){return na.setScalar(0),ia.setScalar(0),ra.setScalar(0),na.fromBufferAttribute(e,t),ia.fromBufferAttribute(e,i),ra.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(na,s.x),a.addScaledVector(ia,s.y),a.addScaledVector(ra,s.z),a}static isFrontFacing(e,t,i,r){return on.subVectors(i,t),Dn.subVectors(e,t),on.cross(Dn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),on.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Ri.subVectors(r,i),wi.subVectors(s,i),Qs.subVectors(e,i);const l=Ri.dot(Qs),c=wi.dot(Qs);if(l<=0&&c<=0)return t.copy(i);ea.subVectors(e,r);const u=Ri.dot(ea),f=wi.dot(ea);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ri,a);ta.subVectors(e,s);const d=Ri.dot(ta),p=wi.dot(ta);if(p>=0&&d<=p)return t.copy(s);const v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(wi,o);const m=u*p-d*f;if(m<=0&&f-u>=0&&d-p>=0)return Qo.subVectors(s,r),o=(f-u)/(f-u+(d-p)),t.copy(r).addScaledVector(Qo,o);const g=1/(m+v+h);return a=v*g,o=h*g,t.copy(i).addScaledVector(Ri,a).addScaledVector(wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Tr{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kr.copy(i.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),Gr.subVectors(this.max,nr),Pi.subVectors(e.a,nr),Li.subVectors(e.b,nr),Di.subVectors(e.c,nr),Wn.subVectors(Li,Pi),Xn.subVectors(Di,Li),ri.subVectors(Pi,Di);let t=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ri.z,ri.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ri.z,0,-ri.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ri.y,ri.x,0];return!sa(t,Pi,Li,Di,Gr)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,Pi,Li,Di,Gr))?!1:(Vr.crossVectors(Wn,Xn),t=[Vr.x,Vr.y,Vr.z],sa(t,Pi,Li,Di,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new O,new O,new O,new O,new O,new O,new O,new O],ln=new O,kr=new Tr,Pi=new O,Li=new O,Di=new O,Wn=new O,Xn=new O,ri=new O,nr=new O,Gr=new O,Vr=new O,si=new O;function sa(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){si.fromArray(n,s);const o=r.x*Math.abs(si.x)+r.y*Math.abs(si.y)+r.z*Math.abs(si.z),l=e.dot(si),c=t.dot(si),u=i.dot(si);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const wt=new O,zr=new Ee;let nf=0;class An extends gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXY(t,zr.x,zr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Vi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),r=Xt(r,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Oc extends An{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Nc extends An{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ft extends An{constructor(e,t,i){super(new Float32Array(e),t,i)}}const rf=new Tr,ir=new O,aa=new O;class io{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):rf.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);const t=ir.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ir,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add(aa)),this.expandByPoint(ir.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let sf=0;const nn=new St,oa=new Vt,Ii=new O,Kt=new Tr,rr=new Tr,Ut=new O;class rn extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sh(e)?Nc:Oc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,i){return nn.makeTranslation(e,t,i),this.applyMatrix4(nn),this}scale(e,t,i){return nn.makeScale(e,t,i),this.applyMatrix4(nn),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ft(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Kt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new io);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(Kt.min,rr.min),Kt.expandByPoint(Ut),Ut.addVectors(Kt.max,rr.max),Kt.expandByPoint(Ut)):(Kt.expandByPoint(rr.min),Kt.expandByPoint(rr.max))}Kt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ut.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ut));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ut.fromBufferAttribute(o,c),l&&(Ii.fromBufferAttribute(e,c),Ut.add(Ii)),r=Math.max(r,i.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new O,l[y]=new O;const c=new O,u=new O,f=new O,h=new Ee,d=new Ee,p=new Ee,v=new O,m=new O;function g(y,A,L){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,L),h.fromBufferAttribute(s,y),d.fromBufferAttribute(s,A),p.fromBufferAttribute(s,L),u.sub(c),f.sub(c),d.sub(h),p.sub(h);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),o[y].add(v),o[A].add(v),o[L].add(v),l[y].add(m),l[A].add(m),l[L].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,A=_.length;y<A;++y){const L=_[y],P=L.start,k=L.count;for(let F=P,I=P+k;F<I;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new O,b=new O,R=new O,T=new O;function w(y){R.fromBufferAttribute(r,y),T.copy(R);const A=o[y];S.copy(A),S.sub(R.multiplyScalar(R.dot(A))).normalize(),b.crossVectors(T,A);const P=b.dot(l[y])<0?-1:1;a.setXYZW(y,S.x,S.y,S.z,P)}for(let y=0,A=_.length;y<A;++y){const L=_[y],P=L.start,k=L.count;for(let F=P,I=P+k;F<I;F+=3)w(e.getX(F+0)),w(e.getX(F+1)),w(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new O,s=new O,a=new O,o=new O,l=new O,c=new O,u=new O,f=new O;if(e)for(let h=0,d=e.count;h<d;h+=3){const p=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let g=0;g<u;g++)h[p++]=c[d++]}return new An(h,u,f)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let af=0;class Er extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fn=new O,la=new O,Hr=new O,qn=new O,ca=new O,Wr=new O,ua=new O;class of{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){la.copy(e).add(t).multiplyScalar(.5),Hr.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(la);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Hr),o=qn.dot(this.direction),l=-qn.dot(Hr),c=qn.lengthSq(),u=Math.abs(1-a*a);let f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=s*u,f>=0)if(h>=-p)if(h<=p){const v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(la).addScaledVector(Hr,h),d}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),r=Fn.dot(Fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,r,s){ca.subVectors(t,e),Wr.subVectors(i,e),ua.crossVectors(ca,Wr);let a=this.direction.dot(ua),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qn.subVectors(this.origin,e);const l=o*this.direction.dot(Wr.crossVectors(qn,Wr));if(l<0)return null;const c=o*this.direction.dot(ca.cross(qn));if(c<0||l+c>a)return null;const u=-o*qn.dot(ua);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ar extends Er{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const el=new St,ai=new of,Xr=new io,tl=new O,qr=new O,Yr=new O,jr=new O,ha=new O,$r=new O,nl=new O,Zr=new O;class zt extends Vt{constructor(e=new rn,t=new Ar){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){$r.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(ha.fromBufferAttribute(f,e),a?$r.addScaledVector(ha,u):$r.addScaledVector(ha.sub(t),u))}t.add($r)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(s),ai.copy(e.ray).recast(e.near),!(Xr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Xr,tl)===null||ai.origin.distanceToSquared(tl)>(e.far-e.near)**2))&&(el.copy(s).invert(),ai.copy(e.ray).applyMatrix4(el),!(i.boundingBox!==null&&ai.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ai)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const m=h[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,R=S;b<R;b+=3){const T=o.getX(b),w=o.getX(b+1),y=o.getX(b+2);r=Kr(this,g,e,i,c,u,f,T,w,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const _=o.getX(m),S=o.getX(m+1),b=o.getX(m+2);r=Kr(this,a,e,i,c,u,f,_,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const m=h[p],g=a[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,R=S;b<R;b+=3){const T=b,w=b+1,y=b+2;r=Kr(this,g,e,i,c,u,f,T,w,y),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=p,g=v;m<g;m+=3){const _=m,S=m+1,b=m+2;r=Kr(this,a,e,i,c,u,f,_,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function lf(n,e,t,i,r,s,a,o){let l;if(e.side===1?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===0,o),l===null)return null;Zr.copy(o),Zr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Zr);return c<t.near||c>t.far?null:{distance:c,point:Zr.clone(),object:n}}function Kr(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,qr),n.getVertexPosition(l,Yr),n.getVertexPosition(c,jr);const u=lf(n,e,t,i,qr,Yr,jr,nl);if(u){const f=new O;un.getBarycoord(nl,qr,Yr,jr,f),r&&(u.uv=un.getInterpolatedAttribute(r,o,l,c,f,new Ee)),s&&(u.uv1=un.getInterpolatedAttribute(s,o,l,c,f,new Ee)),a&&(u.normal=un.getInterpolatedAttribute(a,o,l,c,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new O,materialIndex:0};un.getNormal(qr,Yr,jr,h.normal),u.face=h,u.barycoord=f}return u}class cf extends Gt{constructor(e=null,t=1,i=1,r,s,a,o,l,c=1003,u=1003,f,h){super(null,a,o,l,c,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fa=new O,uf=new O,hf=new Ke;class ci{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=fa.subVectors(i,t).cross(uf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(fa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hf.getNormalMatrix(e),r=this.coplanarPoint(fa).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new io,ff=new Ee(.5,.5),Jr=new O;class ro{constructor(e=new ci,t=new ci,i=new ci,r=new ci,s=new ci,a=new ci){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],h=s[6],d=s[7],p=s[8],v=s[9],m=s[10],g=s[11],_=s[12],S=s[13],b=s[14],R=s[15];if(r[0].setComponents(c-a,d-u,g-p,R-_).normalize(),r[1].setComponents(c+a,d+u,g+p,R+_).normalize(),r[2].setComponents(c+o,d+f,g+v,R+S).normalize(),r[3].setComponents(c-o,d-f,g-v,R-S).normalize(),i)r[4].setComponents(l,h,m,b).normalize(),r[5].setComponents(c-l,d-h,g-m,R-b).normalize();else if(r[4].setComponents(c-l,d-h,g-m,R-b).normalize(),t===2e3)r[5].setComponents(c+l,d+h,g+m,R+b).normalize();else if(t===2001)r[5].setComponents(l,h,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(e){oi.center.set(0,0,0);const t=ff.distanceTo(e.center);return oi.radius=.7071067811865476+t,oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Jr.x=r.normal.x>0?e.max.x:e.min.x,Jr.y=r.normal.y>0?e.max.y:e.min.y,Jr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bc extends Gt{constructor(e=[],t=301,i,r,s,a,o,l,c,u){super(e,t,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Wi extends Gt{constructor(e,t,i=1014,r,s,a,o=1003,l=1003,c,u=1026,f=1){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new no(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class df extends Wi{constructor(e,t=1014,i=301,r,s,a=1003,o=1003,l,c=1026){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class kc extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Cr extends rn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,t,e,a,s,0),p("z","y","x",1,-1,i,t,-e,a,s,1),p("x","z","y",1,1,e,i,t,r,a,2),p("x","z","y",1,-1,e,i,-t,r,a,3),p("x","y","z",1,-1,e,t,i,r,s,4),p("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(f,2));function p(v,m,g,_,S,b,R,T,w,y,A){const L=b/w,P=R/y,k=b/2,F=R/2,I=T/2,C=w+1,G=y+1;let z=0,Q=0;const te=new O;for(let le=0;le<G;le++){const ue=le*P-F;for(let Se=0;Se<C;Se++){const Be=Se*L-k;te[v]=Be*_,te[m]=ue*S,te[g]=I,c.push(te.x,te.y,te.z),te[v]=0,te[m]=0,te[g]=T>0?1:-1,u.push(te.x,te.y,te.z),f.push(Se/w),f.push(1-le/y),z+=1}}for(let le=0;le<y;le++)for(let ue=0;ue<w;ue++){const Se=h+ue+C*le,Be=h+ue+C*(le+1),Ye=h+(ue+1)+C*(le+1),Oe=h+(ue+1)+C*le;l.push(Se,Be,Oe),l.push(Be,Ye,Oe),Q+=6}o.addGroup(d,Q,A),d+=Q,h+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class so extends rn{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new O,u=new Ee;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const d=i+f/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(o,3)),this.setAttribute("uv",new Ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new so(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){qe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],h=i[r+1]-u,d=(a-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Ee:new O);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new O,r=[],s=[],a=[],o=new O,l=new St;for(let d=0;d<=e;d++){const p=d/e;r[d]=this.getTangentAt(p,new O)}s[0]=new O,a[0]=new O;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(r[d-1],r[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(rt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(rt(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(d=-d);for(let p=1;p<=e;p++)s[p].applyMatrix4(l.makeRotationAxis(r[p],d*p)),a[p].crossVectors(r[p],s[p])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ao extends Rn{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ee){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pf extends ao{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function oo(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let h=(a-s)/c-(o-s)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,r(a,o,h,d)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const il=new O,rl=new O,da=new oo,pa=new oo,ma=new oo;class mf extends Rn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new O){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(rl.subVectors(r[0],r[1]).add(r[0]),c=rl);const f=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(il.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=il),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),da.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,v,m),pa.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,v,m),ma.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(da.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),pa.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),ma.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(da.calc(l),pa.calc(l),ma.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new O().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function sl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function gf(n,e){const t=1-n;return t*t*e}function vf(n,e){return 2*(1-n)*n*e}function xf(n,e){return n*n*e}function fr(n,e,t,i){return gf(n,e)+vf(n,t)+xf(n,i)}function _f(n,e){const t=1-n;return t*t*t*e}function yf(n,e){const t=1-n;return 3*t*t*n*e}function Sf(n,e){return 3*(1-n)*n*n*e}function bf(n,e){return n*n*n*e}function dr(n,e,t,i,r){return _f(n,e)+yf(n,t)+Sf(n,i)+bf(n,r)}class Gc extends Rn{constructor(e=new Ee,t=new Ee,i=new Ee,r=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ee){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(dr(e,r.x,s.x,a.x,o.x),dr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mf extends Rn{constructor(e=new O,t=new O,i=new O,r=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new O){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(dr(e,r.x,s.x,a.x,o.x),dr(e,r.y,s.y,a.y,o.y),dr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vc extends Rn{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tf extends Rn{constructor(e=new O,t=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new O){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new O){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zc extends Rn{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(fr(e,r.x,s.x,a.x),fr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ef extends Rn{constructor(e=new O,t=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new O){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(fr(e,r.x,s.x,a.x),fr(e,r.y,s.y,a.y),fr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hc extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(sl(o,l.x,c.x,u.x,f.x),sl(o,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new Ee().fromArray(r))}return this}}var Ba=Object.freeze({__proto__:null,ArcCurve:pf,CatmullRomCurve3:mf,CubicBezierCurve:Gc,CubicBezierCurve3:Mf,EllipseCurve:ao,LineCurve:Vc,LineCurve3:Tf,QuadraticBezierCurve:zc,QuadraticBezierCurve3:Ef,SplineCurve:Hc});class Af extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ba[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Ba[r.type]().fromJSON(r))}return this}}let ka=class extends Af{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Vc(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new zc(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new Gc(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r),new Ee(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Hc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new ao(e,t,i,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};class us extends ka{constructor(e){super(e),this.uuid=vi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new ka().fromJSON(r))}return this}}function Cf(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Wc(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(i&&(s=Df(n,e,s,t)),n.length>80*t){o=n[0],l=n[1];let u=o,f=l;for(let h=t;h<r;h+=t){const d=n[h],p=n[h+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>f&&(f=p)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return xr(s,a,t,o,l,c,0),a}function Wc(n,e,t,i,r){let s;if(r===Hf(n,e,t,i)>0)for(let a=e;a<t;a+=i)s=al(a/i|0,n[a],n[a+1],s);else for(let a=t-i;a>=e;a-=i)s=al(a/i|0,n[a],n[a+1],s);return s&&Xi(s,s.next)&&(yr(s),s=s.next),s}function pi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Xi(t,t.next)||yt(t.prev,t,t.next)===0)){if(yr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function xr(n,e,t,i,r,s,a){if(!n)return;!a&&s&&Nf(n,i,r,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?wf(n,i,r,s):Rf(n)){e.push(l.i,n.i,c.i),yr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Pf(pi(n),e),xr(n,e,t,i,r,s,2)):a===2&&Lf(n,e,t,i,r,s):xr(pi(n),e,t,i,r,s,1);break}}}function Rf(n){const e=n.prev,t=n,i=n.next;if(yt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(r,s,a),f=Math.min(o,l,c),h=Math.max(r,s,a),d=Math.max(o,l,c);let p=i.next;for(;p!==e;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&lr(r,o,s,l,a,c,p.x,p.y)&&yt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function wf(n,e,t,i){const r=n.prev,s=n,a=n.next;if(yt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,h=a.y,d=Math.min(o,l,c),p=Math.min(u,f,h),v=Math.max(o,l,c),m=Math.max(u,f,h),g=Ga(d,p,e,t,i),_=Ga(v,m,e,t,i);let S=n.prevZ,b=n.nextZ;for(;S&&S.z>=g&&b&&b.z<=_;){if(S.x>=d&&S.x<=v&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&lr(o,u,l,f,c,h,S.x,S.y)&&yt(S.prev,S,S.next)>=0||(S=S.prevZ,b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==r&&b!==a&&lr(o,u,l,f,c,h,b.x,b.y)&&yt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;S&&S.z>=g;){if(S.x>=d&&S.x<=v&&S.y>=p&&S.y<=m&&S!==r&&S!==a&&lr(o,u,l,f,c,h,S.x,S.y)&&yt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;b&&b.z<=_;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=m&&b!==r&&b!==a&&lr(o,u,l,f,c,h,b.x,b.y)&&yt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Pf(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Xi(i,r)&&qc(i,t,t.next,r)&&_r(i,r)&&_r(r,i)&&(e.push(i.i,t.i,r.i),yr(t),yr(t.next),t=n=r),t=t.next}while(t!==n);return pi(t)}function Lf(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Gf(a,o)){let l=Yc(a,o);a=pi(a,a.next),l=pi(l,l.next),xr(a,e,t,i,r,s,0),xr(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function Df(n,e,t,i){const r=[];for(let s=0,a=e.length;s<a;s++){const o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=Wc(n,o,l,i,!1);c===c.next&&(c.steiner=!0),r.push(kf(c))}r.sort(If);for(let s=0;s<r.length;s++)t=Uf(r[s],t);return t}function If(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Uf(n,e){const t=Ff(n,e);if(!t)return e;const i=Yc(t,n);return pi(i,i.next),pi(t,t.next)}function Ff(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,a;if(Xi(n,t))return t;do{if(Xi(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>s&&(s=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Xc(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const f=Math.abs(r-t.y)/(i-t.x);_r(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&Of(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function Of(n,e){return yt(n.prev,n,e.prev)<0&&yt(e.next,n,n.next)<0}function Nf(n,e,t,i){let r=n;do r.z===0&&(r.z=Ga(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Bf(r)}function Bf(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let a=i,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(r=i,i=i.nextZ,o--):(r=a,a=a.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=a}s.nextZ=null,t*=2}while(e>1);return n}function Ga(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function kf(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Xc(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function lr(n,e,t,i,r,s,a,o){return!(n===a&&e===o)&&Xc(n,e,t,i,r,s,a,o)}function Gf(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Vf(n,e)&&(_r(n,e)&&_r(e,n)&&zf(n,e)&&(yt(n.prev,n,e.prev)||yt(n,e.prev,e))||Xi(n,e)&&yt(n.prev,n,n.next)>0&&yt(e.prev,e,e.next)>0)}function yt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Xi(n,e){return n.x===e.x&&n.y===e.y}function qc(n,e,t,i){const r=es(yt(n,e,t)),s=es(yt(n,e,i)),a=es(yt(t,i,n)),o=es(yt(t,i,e));return!!(r!==s&&a!==o||r===0&&Qr(n,t,e)||s===0&&Qr(n,i,e)||a===0&&Qr(t,n,i)||o===0&&Qr(t,e,i))}function Qr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function es(n){return n>0?1:n<0?-1:0}function Vf(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&qc(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function _r(n,e){return yt(n.prev,n,n.next)<0?yt(n,e,n.next)>=0&&yt(n,n.prev,e)>=0:yt(n,e,n.prev)<0||yt(n,n.next,e)<0}function zf(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Yc(n,e){const t=Va(n.i,n.x,n.y),i=Va(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function al(n,e,t,i){const r=Va(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function yr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Va(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Hf(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Wf{static triangulate(e,t,i=2){return Cf(e,t,i)}}class di{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return di.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];ol(e),ll(i,e);let a=e.length;t.forEach(ol);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,ll(i,t[l]);const o=Wf.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ol(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function ll(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class vs extends rn{constructor(e=new us([new Ee(.5,.5),new Ee(-.5,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new Ft(r,3)),this.setAttribute("uv",new Ft(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:Xf;let S,b=!1,R,T,w,y;if(g){S=g.getSpacedPoints(u),b=!0,h=!1;const $=g.isCatmullRomCurve3?g.closed:!1;R=g.computeFrenetFrames(u,$),T=new O,w=new O,y=new O}h||(m=0,d=0,p=0,v=0);const A=o.extractPoints(c);let L=A.shape;const P=A.holes;if(!di.isClockWise(L)){L=L.reverse();for(let $=0,se=P.length;$<se;$++){const ee=P[$];di.isClockWise(ee)&&(P[$]=ee.reverse())}}function F($){const ee=10000000000000001e-36;let xe=$[0];for(let de=1;de<=$.length;de++){const Xe=de%$.length,D=$[Xe],je=D.x-xe.x,Le=D.y-xe.y,He=je*je+Le*Le,ie=Math.max(Math.abs(D.x),Math.abs(D.y),Math.abs(xe.x),Math.abs(xe.y)),ht=ee*ie*ie;if(He<=ht){$.splice(Xe,1),de--;continue}xe=D}}F(L),P.forEach(F);const I=P.length,C=L;for(let $=0;$<I;$++){const se=P[$];L=L.concat(se)}function G($,se,ee){return se||at("ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(se,ee)}const z=L.length;function Q($,se,ee){let xe,de,Xe;const D=$.x-se.x,je=$.y-se.y,Le=ee.x-$.x,He=ee.y-$.y,ie=D*D+je*je,ht=D*He-je*Le;if(Math.abs(ht)>Number.EPSILON){const E=Math.sqrt(ie),x=Math.sqrt(Le*Le+He*He),V=se.x-je/E,Z=se.y+D/E,ne=ee.x-He/x,ce=ee.y+Le/x,pe=((ne-V)*He-(ce-Z)*Le)/(D*He-je*Le);xe=V+D*pe-$.x,de=Z+je*pe-$.y;const q=xe*xe+de*de;if(q<=2)return new Ee(xe,de);Xe=Math.sqrt(q/2)}else{let E=!1;D>Number.EPSILON?Le>Number.EPSILON&&(E=!0):D<-Number.EPSILON?Le<-Number.EPSILON&&(E=!0):Math.sign(je)===Math.sign(He)&&(E=!0),E?(xe=-je,de=D,Xe=Math.sqrt(ie)):(xe=D,de=je,Xe=Math.sqrt(ie/2))}return new Ee(xe/Xe,de/Xe)}const te=[];for(let $=0,se=C.length,ee=se-1,xe=$+1;$<se;$++,ee++,xe++)ee===se&&(ee=0),xe===se&&(xe=0),te[$]=Q(C[$],C[ee],C[xe]);const le=[];let ue,Se=te.concat();for(let $=0,se=I;$<se;$++){const ee=P[$];ue=[];for(let xe=0,de=ee.length,Xe=de-1,D=xe+1;xe<de;xe++,Xe++,D++)Xe===de&&(Xe=0),D===de&&(D=0),ue[xe]=Q(ee[xe],ee[Xe],ee[D]);le.push(ue),Se=Se.concat(ue)}let Be;if(m===0)Be=di.triangulateShape(C,P);else{const $=[],se=[];for(let ee=0;ee<m;ee++){const xe=ee/m,de=d*Math.cos(xe*Math.PI/2),Xe=p*Math.sin(xe*Math.PI/2)+v;for(let D=0,je=C.length;D<je;D++){const Le=G(C[D],te[D],Xe);be(Le.x,Le.y,-de),xe===0&&$.push(Le)}for(let D=0,je=I;D<je;D++){const Le=P[D];ue=le[D];const He=[];for(let ie=0,ht=Le.length;ie<ht;ie++){const E=G(Le[ie],ue[ie],Xe);be(E.x,E.y,-de),xe===0&&He.push(E)}xe===0&&se.push(He)}}Be=di.triangulateShape($,se)}const Ye=Be.length,Oe=p+v;for(let $=0;$<z;$++){const se=h?G(L[$],Se[$],Oe):L[$];b?(w.copy(R.normals[0]).multiplyScalar(se.x),T.copy(R.binormals[0]).multiplyScalar(se.y),y.copy(S[0]).add(w).add(T),be(y.x,y.y,y.z)):be(se.x,se.y,0)}for(let $=1;$<=u;$++)for(let se=0;se<z;se++){const ee=h?G(L[se],Se[se],Oe):L[se];b?(w.copy(R.normals[$]).multiplyScalar(ee.x),T.copy(R.binormals[$]).multiplyScalar(ee.y),y.copy(S[$]).add(w).add(T),be(y.x,y.y,y.z)):be(ee.x,ee.y,f/u*$)}for(let $=m-1;$>=0;$--){const se=$/m,ee=d*Math.cos(se*Math.PI/2),xe=p*Math.sin(se*Math.PI/2)+v;for(let de=0,Xe=C.length;de<Xe;de++){const D=G(C[de],te[de],xe);be(D.x,D.y,f+ee)}for(let de=0,Xe=P.length;de<Xe;de++){const D=P[de];ue=le[de];for(let je=0,Le=D.length;je<Le;je++){const He=G(D[je],ue[je],xe);b?be(He.x,He.y+S[u-1].y,S[u-1].x+ee):be(He.x,He.y,f+ee)}}}Y(),oe();function Y(){const $=r.length/3;if(h){let se=0,ee=z*se;for(let xe=0;xe<Ye;xe++){const de=Be[xe];Fe(de[2]+ee,de[1]+ee,de[0]+ee)}se=u+m*2,ee=z*se;for(let xe=0;xe<Ye;xe++){const de=Be[xe];Fe(de[0]+ee,de[1]+ee,de[2]+ee)}}else{for(let se=0;se<Ye;se++){const ee=Be[se];Fe(ee[2],ee[1],ee[0])}for(let se=0;se<Ye;se++){const ee=Be[se];Fe(ee[0]+z*u,ee[1]+z*u,ee[2]+z*u)}}i.addGroup($,r.length/3-$,0)}function oe(){const $=r.length/3;let se=0;J(C,se),se+=C.length;for(let ee=0,xe=P.length;ee<xe;ee++){const de=P[ee];J(de,se),se+=de.length}i.addGroup($,r.length/3-$,1)}function J($,se){let ee=$.length;for(;--ee>=0;){const xe=ee;let de=ee-1;de<0&&(de=$.length-1);for(let Xe=0,D=u+m*2;Xe<D;Xe++){const je=z*Xe,Le=z*(Xe+1),He=se+xe+je,ie=se+de+je,ht=se+de+Le,E=se+xe+Le;Ue(He,ie,ht,E)}}}function be($,se,ee){l.push($),l.push(se),l.push(ee)}function Fe($,se,ee){Ze($),Ze(se),Ze(ee);const xe=r.length/3,de=_.generateTopUV(i,r,xe-3,xe-2,xe-1);We(de[0]),We(de[1]),We(de[2])}function Ue($,se,ee,xe){Ze($),Ze(se),Ze(xe),Ze(se),Ze(ee),Ze(xe);const de=r.length/3,Xe=_.generateSideWallUV(i,r,de-6,de-3,de-2,de-1);We(Xe[0]),We(Xe[1]),We(Xe[3]),We(Xe[1]),We(Xe[2]),We(Xe[3])}function Ze($){r.push(l[$*3+0]),r.push(l[$*3+1]),r.push(l[$*3+2])}function We($){s.push($.x),s.push($.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return qf(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ba[r.type]().fromJSON(r)),new vs(i,e.options)}}const Xf={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new Ee(s,a),new Ee(o,l),new Ee(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],h=e[r*3],d=e[r*3+1],p=e[r*3+2],v=e[s*3],m=e[s*3+1],g=e[s*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new Ee(a,1-l),new Ee(c,1-f),new Ee(h,1-p),new Ee(v,1-g)]:[new Ee(o,1-l),new Ee(u,1-f),new Ee(d,1-p),new Ee(m,1-g)]}};function qf(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class xi extends rn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=t/l,d=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const _=g*h-a;for(let S=0;S<c;S++){const b=S*f-s;p.push(b,-_,0),v.push(0,0,1),m.push(S/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){const S=_+c*g,b=_+c*(g+1),R=_+1+c*(g+1),T=_+1+c*g;d.push(S,b,T),d.push(b,R,T)}this.setIndex(d),this.setAttribute("position",new Ft(p,3)),this.setAttribute("normal",new Ft(v,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.widthSegments,e.heightSegments)}}class lo extends rn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new O,h=new O,d=[],p=[],v=[],m=[];for(let g=0;g<=i;g++){const _=[],S=g/i;let b=0;g===0&&a===0?b=.5/t:g===i&&l===Math.PI&&(b=-.5/t);for(let R=0;R<=t;R++){const T=R/t;f.x=-e*Math.cos(r+T*s)*Math.sin(a+S*o),f.y=e*Math.cos(a+S*o),f.z=e*Math.sin(r+T*s)*Math.sin(a+S*o),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),m.push(T+b,1-S),_.push(c++)}u.push(_)}for(let g=0;g<i;g++)for(let _=0;_<t;_++){const S=u[g][_+1],b=u[g][_],R=u[g+1][_],T=u[g+1][_+1];(g!==0||a>0)&&d.push(S,b,T),(g!==i-1||l<Math.PI)&&d.push(b,R,T)}this.setIndex(d),this.setAttribute("position",new Ft(p,3)),this.setAttribute("normal",new Ft(v,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function qi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(cl(r))r.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(cl(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function qt(n){const e={};for(let t=0;t<n.length;t++){const i=qi(n[t]);for(const r in i)e[r]=i[r]}return e}function cl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Yf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function jc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const jf={clone:qi,merge:qt};var $f=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Er{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$f,this.fragmentShader=Zf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qi(e.uniforms),this.uniformsGroups=Yf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Kf extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xs extends Er{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jf extends Er{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qf extends Er{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ga={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(ul(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!ul(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function ul(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ed{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],p=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const td=new ed;class co{constructor(e){this.manager=e!==void 0?e:td,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}co.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ui=new WeakMap;class nd extends co{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=ga.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let f=Ui.get(a);f===void 0&&(f=[],Ui.set(a,f)),f.push({onLoad:t,onError:r})}return a}const o=gr("img");function l(){u(),t&&t(this);const f=Ui.get(this)||[];for(let h=0;h<f.length;h++){const d=f[h];d.onLoad&&d.onLoad(this)}Ui.delete(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),ga.remove(`image:${e}`);const h=Ui.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onError&&p.onError(f)}Ui.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ga.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class id extends co{constructor(e){super(e)}load(e,t,i,r){const s=new Gt,a=new nd(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class uo extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const va=new St,hl=new O,fl=new O;class $c{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ro,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;hl.setFromMatrixPosition(e.matrixWorld),t.position.copy(hl),fl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fl),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ts=new O,ns=new Ji,vn=new O;class Zc extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ts,ns,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ts,ns,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ts,ns,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new O,dl=new Ee,pl=new Ee;class Jt extends Zc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yn.x,Yn.y).multiplyScalar(-e/Yn.z)}getViewSize(e,t){return this.getViewBounds(e,dl,pl),t.subVectors(pl,dl)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ur*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rd extends $c{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}}class sd extends uo{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new rd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ho extends Zc{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ad extends $c{constructor(){super(new ho(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class od extends uo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new ad}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ld extends uo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Fi=-90,Oi=1;class cd extends Vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Jt(Fi,Oi,e,t);r.layers=this.layers,this.add(r);const s=new Jt(Fi,Oi,e,t);s.layers=this.layers,this.add(s);const a=new Jt(Fi,Oi,e,t);a.layers=this.layers,this.add(a);const o=new Jt(Fi,Oi,e,t);o.layers=this.layers,this.add(o);const l=new Jt(Fi,Oi,e,t);l.layers=this.layers,this.add(l);const c=new Jt(Fi,Oi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class ud extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Kc{static{Kc.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}class hd{constructor(){this.type="ShapePath",this.color=new it,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new ka,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,i,r){return this.currentPath.quadraticCurveTo(e,t,i,r),this}bezierCurveTo(e,t,i,r,s,a){return this.currentPath.bezierCurveTo(e,t,i,r,s,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(g){const _=[];for(let S=0,b=g.length;S<b;S++){const R=g[S],T=new us;T.curves=R.curves,_.push(T)}return _}function i(g,_){const S=_.length;let b=!1;for(let R=S-1,T=0;T<S;R=T++){let w=_[R],y=_[T],A=y.x-w.x,L=y.y-w.y;if(Math.abs(L)>Number.EPSILON){if(L<0&&(w=_[T],A=-A,y=_[R],L=-L),g.y<w.y||g.y>y.y)continue;if(g.y===w.y){if(g.x===w.x)return!0}else{const P=L*(g.x-w.x)-A*(g.y-w.y);if(P===0)return!0;if(P<0)continue;b=!b}}else{if(g.y!==w.y)continue;if(y.x<=g.x&&g.x<=w.x||w.x<=g.x&&g.x<=y.x)return!0}}return b}const r=di.isClockWise,s=this.subPaths;if(s.length===0)return[];let a,o,l;const c=[];if(s.length===1)return o=s[0],l=new us,l.curves=o.curves,c.push(l),c;let u=!r(s[0].getPoints());u=e?!u:u;const f=[],h=[];let d=[],p=0,v;h[p]=void 0,d[p]=[];for(let g=0,_=s.length;g<_;g++)o=s[g],v=o.getPoints(),a=r(v),a=e?!a:a,a?(!u&&h[p]&&p++,h[p]={s:new us,p:v},h[p].s.curves=o.curves,u&&p++,d[p]=[]):d[p].push({h:o,p:v[0]});if(!h[0])return t(s);if(h.length>1){let g=!1,_=0;for(let S=0,b=h.length;S<b;S++)f[S]=[];for(let S=0,b=h.length;S<b;S++){const R=d[S];for(let T=0;T<R.length;T++){const w=R[T];let y=!0;for(let A=0;A<h.length;A++)i(w.p,h[A].p)&&(S!==A&&_++,y?(y=!1,f[A].push(w)):g=!0);y&&f[S].push(w)}}_>0&&g===!1&&(d=f)}let m;for(let g=0,_=h.length;g<_;g++){l=h[g].s,c.push(l),m=d[g];for(let S=0,b=m.length;S<b;S++)l.holes.push(m[S].h)}return c}}function ml(n,e,t,i){const r=fd(i);switch(t){case 1021:return n*e;case 1028:return n*e/r.components*r.byteLength;case 1029:return n*e/r.components*r.byteLength;case 1030:return n*e*2/r.components*r.byteLength;case 1031:return n*e*2/r.components*r.byteLength;case 1022:return n*e*3/r.components*r.byteLength;case 1023:return n*e*4/r.components*r.byteLength;case 1033:return n*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(n,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(n,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(n/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(n/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fd(n){switch(n){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");function Jc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function dd(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const v=f[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,md=`#ifdef USE_ALPHAHASH
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
#endif`,gd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yd=`#ifdef USE_AOMAP
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
#endif`,Sd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bd=`#ifdef USE_BATCHING
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
#endif`,Md=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ad=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cd=`#ifdef USE_IRIDESCENCE
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
#endif`,Rd=`#ifdef USE_BUMPMAP
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
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Nd=`#define PI 3.141592653589793
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
} // validated`,Bd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kd=`vec3 transformedNormal = objectNormal;
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
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qd=`#ifdef USE_ENVMAP
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
#endif`,Yd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
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
#endif`,$d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zd=`#ifdef USE_ENVMAP
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
#endif`,Kd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
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
}`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hp=`PhysicalMaterial material;
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
#endif`,fp=`uniform sampler2D dfgLUT;
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
}`,dp=`
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tp=`#if defined( USE_POINTS_UV )
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
#endif`,Ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ap=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`#ifdef USE_MORPHTARGETS
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
#endif`,Lp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
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
#endif`,Bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qp=`float getShadowMask() {
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
}`,em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tm=`#ifdef USE_SKINNING
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
#endif`,nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,rm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
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
#endif`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mm=`uniform sampler2D t2D;
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_m=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`#include <common>
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
}`,Sm=`#if DEPTH_PACKING == 3200
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
}`,bm=`#define DISTANCE
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
}`,Mm=`#define DISTANCE
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
}`,Tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`uniform float scale;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,wm=`uniform vec3 diffuse;
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
}`,Pm=`#define LAMBERT
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
}`,Lm=`#define LAMBERT
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
}`,Dm=`#define MATCAP
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
}`,Im=`#define MATCAP
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
}`,Um=`#define NORMAL
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
}`,Fm=`#define NORMAL
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
}`,Om=`#define PHONG
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
}`,Nm=`#define PHONG
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
}`,Bm=`#define STANDARD
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
}`,km=`#define STANDARD
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
}`,Gm=`#define TOON
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
}`,Vm=`#define TOON
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
}`,zm=`uniform float size;
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
}`,Hm=`uniform vec3 diffuse;
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
}`,Wm=`#include <common>
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
}`,Xm=`uniform vec3 color;
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
}`,qm=`uniform float rotation;
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
}`,Ym=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:pd,alphahash_pars_fragment:md,alphamap_fragment:gd,alphamap_pars_fragment:vd,alphatest_fragment:xd,alphatest_pars_fragment:_d,aomap_fragment:yd,aomap_pars_fragment:Sd,batching_pars_vertex:bd,batching_vertex:Md,begin_vertex:Td,beginnormal_vertex:Ed,bsdfs:Ad,iridescence_fragment:Cd,bumpmap_pars_fragment:Rd,clipping_planes_fragment:wd,clipping_planes_pars_fragment:Pd,clipping_planes_pars_vertex:Ld,clipping_planes_vertex:Dd,color_fragment:Id,color_pars_fragment:Ud,color_pars_vertex:Fd,color_vertex:Od,common:Nd,cube_uv_reflection_fragment:Bd,defaultnormal_vertex:kd,displacementmap_pars_vertex:Gd,displacementmap_vertex:Vd,emissivemap_fragment:zd,emissivemap_pars_fragment:Hd,colorspace_fragment:Wd,colorspace_pars_fragment:Xd,envmap_fragment:qd,envmap_common_pars_fragment:Yd,envmap_pars_fragment:jd,envmap_pars_vertex:$d,envmap_physical_pars_fragment:ap,envmap_vertex:Zd,fog_vertex:Kd,fog_pars_vertex:Jd,fog_fragment:Qd,fog_pars_fragment:ep,gradientmap_pars_fragment:tp,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:rp,lights_pars_begin:sp,lights_toon_fragment:op,lights_toon_pars_fragment:lp,lights_phong_fragment:cp,lights_phong_pars_fragment:up,lights_physical_fragment:hp,lights_physical_pars_fragment:fp,lights_fragment_begin:dp,lights_fragment_maps:pp,lights_fragment_end:mp,lightprobes_pars_fragment:gp,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:xp,logdepthbuf_pars_vertex:_p,logdepthbuf_vertex:yp,map_fragment:Sp,map_pars_fragment:bp,map_particle_fragment:Mp,map_particle_pars_fragment:Tp,metalnessmap_fragment:Ep,metalnessmap_pars_fragment:Ap,morphinstance_vertex:Cp,morphcolor_vertex:Rp,morphnormal_vertex:wp,morphtarget_pars_vertex:Pp,morphtarget_vertex:Lp,normal_fragment_begin:Dp,normal_fragment_maps:Ip,normal_pars_fragment:Up,normal_pars_vertex:Fp,normal_vertex:Op,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Bp,clearcoat_normal_fragment_maps:kp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:Vp,opaque_fragment:zp,packing:Hp,premultiplied_alpha_fragment:Wp,project_vertex:Xp,dithering_fragment:qp,dithering_pars_fragment:Yp,roughnessmap_fragment:jp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Zp,shadowmap_pars_vertex:Kp,shadowmap_vertex:Jp,shadowmask_pars_fragment:Qp,skinbase_vertex:em,skinning_pars_vertex:tm,skinning_vertex:nm,skinnormal_vertex:im,specularmap_fragment:rm,specularmap_pars_fragment:sm,tonemapping_fragment:am,tonemapping_pars_fragment:om,transmission_fragment:lm,transmission_pars_fragment:cm,uv_pars_fragment:um,uv_pars_vertex:hm,uv_vertex:fm,worldpos_vertex:dm,background_vert:pm,background_frag:mm,backgroundCube_vert:gm,backgroundCube_frag:vm,cube_vert:xm,cube_frag:_m,depth_vert:ym,depth_frag:Sm,distance_vert:bm,distance_frag:Mm,equirect_vert:Tm,equirect_frag:Em,linedashed_vert:Am,linedashed_frag:Cm,meshbasic_vert:Rm,meshbasic_frag:wm,meshlambert_vert:Pm,meshlambert_frag:Lm,meshmatcap_vert:Dm,meshmatcap_frag:Im,meshnormal_vert:Um,meshnormal_frag:Fm,meshphong_vert:Om,meshphong_frag:Nm,meshphysical_vert:Bm,meshphysical_frag:km,meshtoon_vert:Gm,meshtoon_frag:Vm,points_vert:zm,points_frag:Hm,shadow_vert:Wm,shadow_frag:Xm,sprite_vert:qm,sprite_frag:Ym},ye={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},bn={basic:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:qt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:qt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:qt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new it(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:qt([ye.points,ye.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:qt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:qt([ye.common,ye.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:qt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:qt([ye.sprite,ye.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:qt([ye.common,ye.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:qt([ye.lights,ye.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};bn.physical={uniforms:qt([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const is={r:0,b:0,g:0},jm=new St,Qc=new Ke;Qc.set(-1,0,0,0,1,0,0,0,1);function $m(n,e,t,i,r,s){const a=new it(0);let o=r===!0?0:1,l,c,u=null,f=0,h=null;function d(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){const b=_.backgroundBlurriness>0;S=e.get(S,b)}return S}function p(_){let S=!1;const b=d(_);b===null?m(a,o):b&&b.isColor&&(m(b,1),S=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,S){const b=d(S);b&&(b.isCubeTexture||b.mapping===306)?(c===void 0&&(c=new zt(new Cr(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:qi(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(jm.makeRotationFromEuler(S.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Qc),c.material.toneMapped=st.getTransfer(b.colorSpace)!==ft,(u!==b||f!==b.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,h=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new zt(new xi(2,2),new hn({name:"BackgroundMaterial",uniforms:qi(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=st.getTransfer(b.colorSpace)!==ft,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,h=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,S){_.getRGB(is,jc(n)),t.buffers.color.setClear(is.r,is.g,is.b,S,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:p,addToRenderList:v,dispose:g}}function Zm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(P,k,F,I,C){let G=!1;const z=f(P,I,F,k);s!==z&&(s=z,c(s.object)),G=d(P,I,F,C),G&&p(P,I,F,C),C!==null&&e.update(C,n.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,b(P,k,F,I),C!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(C).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function u(P){return n.deleteVertexArray(P)}function f(P,k,F,I){const C=I.wireframe===!0;let G=i[k.id];G===void 0&&(G={},i[k.id]=G);const z=P.isInstancedMesh===!0?P.id:0;let Q=G[z];Q===void 0&&(Q={},G[z]=Q);let te=Q[F.id];te===void 0&&(te={},Q[F.id]=te);let le=te[C];return le===void 0&&(le=h(l()),te[C]=le),le}function h(P){const k=[],F=[],I=[];for(let C=0;C<t;C++)k[C]=0,F[C]=0,I[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:F,attributeDivisors:I,object:P,attributes:{},index:null}}function d(P,k,F,I){const C=s.attributes,G=k.attributes;let z=0;const Q=F.getAttributes();for(const te in Q)if(Q[te].location>=0){const ue=C[te];let Se=G[te];if(Se===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(Se=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(Se=P.instanceColor)),ue===void 0||ue.attribute!==Se||Se&&ue.data!==Se.data)return!0;z++}return s.attributesNum!==z||s.index!==I}function p(P,k,F,I){const C={},G=k.attributes;let z=0;const Q=F.getAttributes();for(const te in Q)if(Q[te].location>=0){let ue=G[te];ue===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(ue=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(ue=P.instanceColor));const Se={};Se.attribute=ue,ue&&ue.data&&(Se.data=ue.data),C[te]=Se,z++}s.attributes=C,s.attributesNum=z,s.index=I}function v(){const P=s.newAttributes;for(let k=0,F=P.length;k<F;k++)P[k]=0}function m(P){g(P,0)}function g(P,k){const F=s.newAttributes,I=s.enabledAttributes,C=s.attributeDivisors;F[P]=1,I[P]===0&&(n.enableVertexAttribArray(P),I[P]=1),C[P]!==k&&(n.vertexAttribDivisor(P,k),C[P]=k)}function _(){const P=s.newAttributes,k=s.enabledAttributes;for(let F=0,I=k.length;F<I;F++)k[F]!==P[F]&&(n.disableVertexAttribArray(F),k[F]=0)}function S(P,k,F,I,C,G,z){z===!0?n.vertexAttribIPointer(P,k,F,C,G):n.vertexAttribPointer(P,k,F,I,C,G)}function b(P,k,F,I){v();const C=I.attributes,G=F.getAttributes(),z=k.defaultAttributeValues;for(const Q in G){const te=G[Q];if(te.location>=0){let le=C[Q];if(le===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){const ue=le.normalized,Se=le.itemSize,Be=e.get(le);if(Be===void 0)continue;const Ye=Be.buffer,Oe=Be.type,Y=Be.bytesPerElement,oe=Oe===n.INT||Oe===n.UNSIGNED_INT||le.gpuType===1013;if(le.isInterleavedBufferAttribute){const J=le.data,be=J.stride,Fe=le.offset;if(J.isInstancedInterleavedBuffer){for(let Ue=0;Ue<te.locationSize;Ue++)g(te.location+Ue,J.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Ue=0;Ue<te.locationSize;Ue++)m(te.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let Ue=0;Ue<te.locationSize;Ue++)S(te.location+Ue,Se/te.locationSize,Oe,ue,be*Y,(Fe+Se/te.locationSize*Ue)*Y,oe)}else{if(le.isInstancedBufferAttribute){for(let J=0;J<te.locationSize;J++)g(te.location+J,le.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let J=0;J<te.locationSize;J++)m(te.location+J);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let J=0;J<te.locationSize;J++)S(te.location+J,Se/te.locationSize,Oe,ue,Se*Y,Se/te.locationSize*J*Y,oe)}}else if(z!==void 0){const ue=z[Q];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(te.location,ue);break;case 3:n.vertexAttrib3fv(te.location,ue);break;case 4:n.vertexAttrib4fv(te.location,ue);break;default:n.vertexAttrib1fv(te.location,ue)}}}}_()}function R(){A();for(const P in i){const k=i[P];for(const F in k){const I=k[F];for(const C in I){const G=I[C];for(const z in G)u(G[z].object),delete G[z];delete I[C]}}delete i[P]}}function T(P){if(i[P.id]===void 0)return;const k=i[P.id];for(const F in k){const I=k[F];for(const C in I){const G=I[C];for(const z in G)u(G[z].object),delete G[z];delete I[C]}}delete i[P.id]}function w(P){for(const k in i){const F=i[k];for(const I in F){const C=F[I];if(C[P.id]===void 0)continue;const G=C[P.id];for(const z in G)u(G[z].object),delete G[z];delete C[P.id]}}}function y(P){for(const k in i){const F=i[k],I=P.isInstancedMesh===!0?P.id:0,C=F[I];if(C!==void 0){for(const G in C){const z=C[G];for(const Q in z)u(z[Q].object),delete z[Q];delete C[G]}delete F[I],Object.keys(F).length===0&&delete i[k]}}}function A(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function Km(n,e,t){let i;function r(l){i=l}function s(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];t.update(h,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Jm(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==1023&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const y=w===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==1009&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==1015&&!y)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:b,maxSamples:R,samples:T}}function Qm(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new ci,o=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,g=n.get(f);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const _=s?0:i,S=_*4;let b=g.clippingState||null;l.value=b,b=u(p,h,S,d);for(let R=0;R!==S;++R)b[R]=t[R];g.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,p){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=d+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<g)&&(m=new Float32Array(g));for(let S=0,b=d;S!==v;++S,b+=4)a.copy(f[S]).applyMatrix4(_,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Kn=4,gl=[.125,.215,.35,.446,.526,.582],ui=20,eg=256,sr=new ho,vl=new it;let xa=null,_a=0,ya=0,Sa=!1;const tg=new O;class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=tg}=s;xa=this._renderer.getRenderTarget(),_a=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xa,_a,ya),this._renderer.xr.enabled=Sa,e.scissorTest=!1,Ni(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xa=this._renderer.getRenderTarget(),_a=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:mr,depthBuffer:!1},r=_l(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ng(s)),this._blurMaterial=rg(s,e,t),this._ggxMaterial=ig(s,e,t)}return r}_compileMaterial(e){const t=new zt(new rn,e);this._renderer.compile(t,sr)}_sceneToCubeUV(e,t,i,r,s){const l=new Jt(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(vl),f.toneMapping=0,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new Cr,new Ar({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let g=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,g=!0):(m.color.copy(vl),g=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):b===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const R=this._cubeSize;Ni(r,b*R,S>2?R:0,R,R),f.setRenderTarget(r),g&&f.render(v,l),f.render(e,l)}f.toneMapping=d,f.autoClear=h,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ni(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,sr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[i],m=3*v*(i>p-Kn?i-p+Kn:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=d,l.mipInt.value=p-t,Ni(s,m,g,3*v,2*v),r.setRenderTarget(s),r.render(o,sr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-i,Ni(e,m,g,3*v,2*v),r.setRenderTarget(e),r.render(o,sr)}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&at("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const h=c.uniforms,d=this._sizeLods[i]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ui-1),v=s/p,m=isFinite(s)?1+Math.floor(u*v):ui;m>ui&&qe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ui}`);const g=[];let _=0;for(let w=0;w<ui;++w){const y=w/v,A=Math.exp(-y*y/2);g.push(A),w===0?_+=A:w<m&&(_+=2*A)}for(let w=0;w<g.length;w++)g[w]=g[w]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=g,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=p,h.mipInt.value=S-i;const b=this._sizeLods[r],R=3*b*(r>S-Kn?r-S+Kn:0),T=4*(this._cubeSize-b);Ni(t,R,T,3*b,2*b),l.setRenderTarget(t),l.render(f,sr)}}function ng(n){const e=[],t=[],i=[];let r=n;const s=n-Kn+1+gl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>n-Kn?l=gl[a-n+Kn-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,p=6,v=3,m=2,g=1,_=new Float32Array(v*p*d),S=new Float32Array(m*p*d),b=new Float32Array(g*p*d);for(let T=0;T<d;T++){const w=T%3*2/3-1,y=T>2?0:-1,A=[w,y,0,w+2/3,y,0,w+2/3,y+1,0,w,y,0,w+2/3,y+1,0,w,y+1,0];_.set(A,v*p*T),S.set(h,m*p*T);const L=[T,T,T,T,T,T];b.set(L,g*p*T)}const R=new rn;R.setAttribute("position",new An(_,v)),R.setAttribute("uv",new An(S,m)),R.setAttribute("faceIndex",new An(b,g)),i.push(new zt(R,null)),r>Kn&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function _l(n,e,t){const i=new En(n,e,t);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ni(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ig(n,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Us(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function rg(n,e,t){const i=new Float32Array(ui),r=new O(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Us(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function yl(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Us(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Sl(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Us(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Us(){return`

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
	`}class eu extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Bc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Cr(5,5,5),s=new hn({name:"CubemapFromEquirect",uniforms:qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;const a=new zt(r,s),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new cd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function sg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,d=!1){return h==null?null:d?a(h):s(h)}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===303||d===304)if(e.has(h)){const p=e.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const v=new eu(p.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,p=d===303||d===304,v=d===301||d===302;if(p||v){let m=t.get(h);const g=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new xl(n)),m=p?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const _=h.image;return p&&_&&_.height>0||v&&_&&l(_)?(i===null&&(i=new xl(n)),m=p?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,d){return d===303?h.mapping=301:d===304&&(h.mapping=302),h}function l(h){let d=0;const p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function ag(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Na("WebGLRenderer: "+i+" extension not supported."),r}}}function og(n,e,t,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,p=f.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const _=d.array;v=d.version;for(let S=0,b=_.length;S<b;S+=3){const R=_[S+0],T=_[S+1],w=_[S+2];h.push(R,T,T,w,w,R)}}else{const _=p.array;v=p.version;for(let S=0,b=_.length/3-1;S<b;S+=3){const R=S+0,T=S+1,w=S+2;h.push(R,T,T,w,w,R)}}const m=new(p.count>=65535?Nc:Oc)(h,1);m.version=v;const g=s.get(f);g&&e.remove(g),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function lg(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*a),t.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,s,f*a,d),t.update(h,i,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,d);let v=0;for(let m=0;m<d;m++)v+=h[m];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function cg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:at("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ug(n,e,t){const i=new WeakMap,r=new _t;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let A=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;d===!0&&(S=1),p===!0&&(S=2),v===!0&&(S=3);let b=o.attributes.position.count*S,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*R*4*f),w=new Ic(T,b,R,f);w.type=1015,w.needsUpdate=!0;const y=S*4;for(let L=0;L<f;L++){const P=m[L],k=g[L],F=_[L],I=b*R*4*L;for(let C=0;C<P.count;C++){const G=C*y;d===!0&&(r.fromBufferAttribute(P,C),T[I+G+0]=r.x,T[I+G+1]=r.y,T[I+G+2]=r.z,T[I+G+3]=0),p===!0&&(r.fromBufferAttribute(k,C),T[I+G+4]=r.x,T[I+G+5]=r.y,T[I+G+6]=r.z,T[I+G+7]=0),v===!0&&(r.fromBufferAttribute(F,C),T[I+G+8]=r.x,T[I+G+9]=r.y,T[I+G+10]=r.z,T[I+G+11]=F.itemSize===4?r.w:1)}}h={count:f,texture:w,size:new Ee(b,R)},i.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function hg(n,e,t,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,h=e.get(c,f);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return h}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const fg={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function dg(n,e,t,i,r){const s=new En(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Wi(e,t):void 0}),a=new En(e,t,{type:1016,depthBuffer:!1,stencilBuffer:!1}),o=new rn;o.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ft([0,2,0,0,2,0],2));const l=new Kf({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new zt(o,l),u=new ho(-1,1,1,-1,0,1);let f=null,h=null,d=!1,p,v=null,m=[],g=!1;this.setSize=function(_,S){s.setSize(_,S),a.setSize(_,S);for(let b=0;b<m.length;b++){const R=m[b];R.setSize&&R.setSize(_,S)}},this.setEffects=function(_){m=_,g=m.length>0&&m[0].isRenderPass===!0;const S=s.width,b=s.height;for(let R=0;R<m.length;R++){const T=m[R];T.setSize&&T.setSize(S,b)}},this.begin=function(_,S){if(d||_.toneMapping===0&&m.length===0)return!1;if(v=S,S!==null){const b=S.width,R=S.height;(s.width!==b||s.height!==R)&&this.setSize(b,R)}return g===!1&&_.setRenderTarget(s),p=_.toneMapping,_.toneMapping=0,!0},this.hasRenderPass=function(){return g},this.end=function(_,S){_.toneMapping=p,d=!0;let b=s,R=a;for(let T=0;T<m.length;T++){const w=m[T];if(w.enabled!==!1&&(w.render(_,R,b,S),w.needsSwap!==!1)){const y=b;b=R,R=y}}if(f!==_.outputColorSpace||h!==_.toneMapping){f=_.outputColorSpace,h=_.toneMapping,l.defines={},st.getTransfer(f)===ft&&(l.defines.SRGB_TRANSFER="");const T=fg[h];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(v),_.render(c,u),v=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const tu=new Gt,za=new Wi(1,1),nu=new Ic,iu=new Yh,ru=new Bc,bl=[],Ml=[],Tl=new Float32Array(16),El=new Float32Array(9),Al=new Float32Array(4);function Qi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=bl[r];if(s===void 0&&(s=new Float32Array(r),bl[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Fs(n,e){let t=Ml[e];t===void 0&&(t=new Int32Array(e),Ml[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function pg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),Dt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),Dt(t,e)}}function vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),Dt(t,e)}}function xg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;Al.set(i),n.uniformMatrix2fv(this.addr,!1,Al),Dt(t,i)}}function _g(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),Dt(t,i)}}function yg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;Tl.set(i),n.uniformMatrix4fv(this.addr,!1,Tl),Dt(t,i)}}function Sg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),Dt(t,e)}}function Mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),Dt(t,e)}}function Tg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),Dt(t,e)}}function Eg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),Dt(t,e)}}function Cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),Dt(t,e)}}function Rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),Dt(t,e)}}function wg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(za.compareFunction=t.isReversedDepthBuffer()?518:515,s=za):s=tu,t.setTexture2D(e||s,r)}function Pg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||iu,r)}function Lg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||ru,r)}function Dg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||nu,r)}function Ig(n){switch(n){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return vg;case 35674:return xg;case 35675:return _g;case 35676:return yg;case 5124:case 35670:return Sg;case 35667:case 35671:return bg;case 35668:case 35672:return Mg;case 35669:case 35673:return Tg;case 5125:return Eg;case 36294:return Ag;case 36295:return Cg;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return Lg;case 36289:case 36303:case 36311:case 36292:return Dg}}function Ug(n,e){n.uniform1fv(this.addr,e)}function Fg(n,e){const t=Qi(e,this.size,2);n.uniform2fv(this.addr,t)}function Og(n,e){const t=Qi(e,this.size,3);n.uniform3fv(this.addr,t)}function Ng(n,e){const t=Qi(e,this.size,4);n.uniform4fv(this.addr,t)}function Bg(n,e){const t=Qi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function kg(n,e){const t=Qi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Gg(n,e){const t=Qi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Vg(n,e){n.uniform1iv(this.addr,e)}function zg(n,e){n.uniform2iv(this.addr,e)}function Hg(n,e){n.uniform3iv(this.addr,e)}function Wg(n,e){n.uniform4iv(this.addr,e)}function Xg(n,e){n.uniform1uiv(this.addr,e)}function qg(n,e){n.uniform2uiv(this.addr,e)}function Yg(n,e){n.uniform3uiv(this.addr,e)}function jg(n,e){n.uniform4uiv(this.addr,e)}function $g(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=za:a=tu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Zg(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||iu,s[a])}function Kg(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ru,s[a])}function Jg(n,e,t){const i=this.cache,r=e.length,s=Fs(t,r);Lt(i,s)||(n.uniform1iv(this.addr,s),Dt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||nu,s[a])}function Qg(n){switch(n){case 5126:return Ug;case 35664:return Fg;case 35665:return Og;case 35666:return Ng;case 35674:return Bg;case 35675:return kg;case 35676:return Gg;case 5124:case 35670:return Vg;case 35667:case 35671:return zg;case 35668:case 35672:return Hg;case 35669:case 35673:return Wg;case 5125:return Xg;case 36294:return qg;case 36295:return Yg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Zg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Jg}}class e0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ig(t.type)}}class t0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qg(t.type)}}class n0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function Cl(n,e){n.seq.push(e),n.map[e.id]=e}function i0(n,e,t){const i=n.name,r=i.length;for(ba.lastIndex=0;;){const s=ba.exec(i),a=ba.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Cl(t,c===void 0?new e0(o,n,e):new t0(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new n0(o),Cl(t,f)),t=f}}}class hs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);i0(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Rl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const r0=37297;let s0=0;function a0(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const wl=new Ke;function o0(n){st._getMatrix(wl,st.workingColorSpace,n);const e=`mat3( ${wl.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case gs:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Pl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+a0(n.getShaderSource(e),o)}else return s}function l0(n,e){const t=o0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const c0={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function u0(n,e){const t=c0[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const rs=new O;function h0(){st.getLuminanceCoefficients(rs);const n=rs.x.toFixed(4),e=rs.y.toFixed(4),t=rs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function f0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cr).join(`
`)}function d0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function p0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function cr(n){return n!==""}function Ll(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const m0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(n){return n.replace(m0,v0)}const g0=new Map;function v0(n,e){let t=tt[e];if(t===void 0){const i=g0.get(e);if(i!==void 0)t=tt[i],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ha(t)}const x0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(n){return n.replace(x0,_0)}function _0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ul(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const y0={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function S0(n){return y0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const b0={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function M0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":b0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const T0={302:"ENVMAP_MODE_REFRACTION"};function E0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":T0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const A0={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function C0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":A0[n.combine]||"ENVMAP_BLENDING_NONE"}function R0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function w0(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=S0(t),c=M0(t),u=E0(t),f=C0(t),h=R0(t),d=f0(t),p=d0(s),v=r.createProgram();let m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cr).join(`
`),g.length>0&&(g+=`
`)):(m=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),g=[Ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?tt.tonemapping_pars_fragment:"",t.toneMapping!==0?u0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,l0("linearToOutputTexel",t.outputColorSpace),h0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),a=Ha(a),a=Ll(a,t),a=Dl(a,t),o=Ha(o),o=Ll(o,t),o=Dl(o,t),a=Il(a),o=Il(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===ko?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ko?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=_+m+a,b=_+g+o,R=Rl(r,r.VERTEX_SHADER,S),T=Rl(r,r.FRAGMENT_SHADER,b);r.attachShader(v,R),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(P){if(n.debug.checkShaderErrors){const k=r.getProgramInfoLog(v)||"",F=r.getShaderInfoLog(R)||"",I=r.getShaderInfoLog(T)||"",C=k.trim(),G=F.trim(),z=I.trim();let Q=!0,te=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,R,T);else{const le=Pl(r,R,"vertex"),ue=Pl(r,T,"fragment");at("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+C+`
`+le+`
`+ue)}else C!==""?qe("WebGLProgram: Program Info Log:",C):(G===""||z==="")&&(te=!1);te&&(P.diagnostics={runnable:Q,programLog:C,vertexShader:{log:G,prefix:m},fragmentShader:{log:z,prefix:g}})}r.deleteShader(R),r.deleteShader(T),y=new hs(r,v),A=p0(r,v)}let y;this.getUniforms=function(){return y===void 0&&w(this),y};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(v,r0)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=s0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=T,this}let P0=0;class L0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new D0(e),t.set(e,i)),i}}class D0{constructor(e){this.id=P0++,this.code=e,this.usedTimes=0}}function I0(n){return n===1030||n===37490||n===36285}function U0(n,e,t,i,r,s){const a=new Uc,o=new L0,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,A,L,P,k,F){const I=P.fog,C=k.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Q=e.get(y.envMap||G,z),te=Q&&Q.mapping===306?Q.image.height:null,le=d[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&qe("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const ue=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,Se=ue!==void 0?ue.length:0;let Be=0;C.morphAttributes.position!==void 0&&(Be=1),C.morphAttributes.normal!==void 0&&(Be=2),C.morphAttributes.color!==void 0&&(Be=3);let Ye,Oe,Y,oe;if(le){const Je=bn[le];Ye=Je.vertexShader,Oe=Je.fragmentShader}else Ye=y.vertexShader,Oe=y.fragmentShader,o.update(y),Y=o.getVertexShaderID(y),oe=o.getFragmentShaderID(y);const J=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Fe=k.isInstancedMesh===!0,Ue=k.isBatchedMesh===!0,Ze=!!y.map,We=!!y.matcap,$=!!Q,se=!!y.aoMap,ee=!!y.lightMap,xe=!!y.bumpMap,de=!!y.normalMap,Xe=!!y.displacementMap,D=!!y.emissiveMap,je=!!y.metalnessMap,Le=!!y.roughnessMap,He=y.anisotropy>0,ie=y.clearcoat>0,ht=y.dispersion>0,E=y.iridescence>0,x=y.sheen>0,V=y.transmission>0,Z=He&&!!y.anisotropyMap,ne=ie&&!!y.clearcoatMap,ce=ie&&!!y.clearcoatNormalMap,pe=ie&&!!y.clearcoatRoughnessMap,q=E&&!!y.iridescenceMap,K=E&&!!y.iridescenceThicknessMap,Ae=x&&!!y.sheenColorMap,we=x&&!!y.sheenRoughnessMap,me=!!y.specularMap,he=!!y.specularColorMap,$e=!!y.specularIntensityMap,et=V&&!!y.transmissionMap,ct=V&&!!y.thicknessMap,U=!!y.gradientMap,fe=!!y.alphaMap,j=y.alphaTest>0,Ce=!!y.alphaHash,ge=!!y.extensions;let re=0;y.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(re=n.toneMapping);const ke={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:Ye,fragmentShader:Oe,defines:y.defines,customVertexShaderID:Y,customFragmentShaderID:oe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ue,batchingColor:Ue&&k._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&k.instanceColor!==null,instancingMorph:Fe&&k.morphTexture!==null,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ze,matcap:We,envMap:$,envMapMode:$&&Q.mapping,envMapCubeUVHeight:te,aoMap:se,lightMap:ee,bumpMap:xe,normalMap:de,displacementMap:Xe,emissiveMap:D,normalMapObjectSpace:de&&y.normalMapType===1,normalMapTangentSpace:de&&y.normalMapType===0,packedNormalMap:de&&y.normalMapType===0&&I0(y.normalMap.format),metalnessMap:je,roughnessMap:Le,anisotropy:He,anisotropyMap:Z,clearcoat:ie,clearcoatMap:ne,clearcoatNormalMap:ce,clearcoatRoughnessMap:pe,dispersion:ht,iridescence:E,iridescenceMap:q,iridescenceThicknessMap:K,sheen:x,sheenColorMap:Ae,sheenRoughnessMap:we,specularMap:me,specularColorMap:he,specularIntensityMap:$e,transmission:V,transmissionMap:et,thicknessMap:ct,gradientMap:U,opaque:y.transparent===!1&&y.blending===1&&y.alphaToCoverage===!1,alphaMap:fe,alphaTest:j,alphaHash:Ce,combine:y.combine,mapUv:Ze&&p(y.map.channel),aoMapUv:se&&p(y.aoMap.channel),lightMapUv:ee&&p(y.lightMap.channel),bumpMapUv:xe&&p(y.bumpMap.channel),normalMapUv:de&&p(y.normalMap.channel),displacementMapUv:Xe&&p(y.displacementMap.channel),emissiveMapUv:D&&p(y.emissiveMap.channel),metalnessMapUv:je&&p(y.metalnessMap.channel),roughnessMapUv:Le&&p(y.roughnessMap.channel),anisotropyMapUv:Z&&p(y.anisotropyMap.channel),clearcoatMapUv:ne&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:K&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(y.sheenRoughnessMap.channel),specularMapUv:me&&p(y.specularMap.channel),specularColorMapUv:he&&p(y.specularColorMap.channel),specularIntensityMapUv:$e&&p(y.specularIntensityMap.channel),transmissionMapUv:et&&p(y.transmissionMap.channel),thicknessMapUv:ct&&p(y.thicknessMap.channel),alphaMapUv:fe&&p(y.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(de||He),vertexNormals:!!C.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!C.attributes.uv&&(Ze||fe),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||C.attributes.normal===void 0&&de===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:be,skinning:k.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Be,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:re,decodeVideoTexture:Ze&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===ft,decodeVideoTextureEmissive:D&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===2,flipSided:y.side===1,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ge&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&y.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function m(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)A.push(L),A.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(g(A,y),_(A,y),A.push(n.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function g(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function _(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function S(y){const A=d[y.type];let L;if(A){const P=bn[A];L=jf.clone(P.uniforms)}else L=y.uniforms;return L}function b(y,A){let L=u.get(A);return L!==void 0?++L.usedTimes:(L=new w0(n,A,y,r),c.push(L),u.set(A,L)),L}function R(y){if(--y.usedTimes===0){const A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function T(y){o.remove(y)}function w(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:S,acquireProgram:b,releaseProgram:R,releaseShaderCache:T,programs:c,dispose:w}}function F0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function O0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Fl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ol(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,v,m,g){let _=n[e];return _===void 0?(_={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:m,group:g},n[e]=_):(_.id=h.id,_.object=h,_.geometry=d,_.material=p,_.materialVariant=a(h),_.groupOrder=v,_.renderOrder=h.renderOrder,_.z=m,_.group=g),e++,_}function l(h,d,p,v,m,g){const _=o(h,d,p,v,m,g);p.transmission>0?i.push(_):p.transparent===!0?r.push(_):t.push(_)}function c(h,d,p,v,m,g){const _=o(h,d,p,v,m,g);p.transmission>0?i.unshift(_):p.transparent===!0?r.unshift(_):t.unshift(_)}function u(h,d){t.length>1&&t.sort(h||O0),i.length>1&&i.sort(d||Fl),r.length>1&&r.sort(d||Fl)}function f(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function N0(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Ol,n.set(i,[a])):r>=s.length?(a=new Ol,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function B0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new it};break;case"SpotLight":t={position:new O,direction:new O,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function k0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let G0=0;function V0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function z0(n){const e=new B0,t=k0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new St,a=new St;function o(c){let u=0,f=0,h=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let d=0,p=0,v=0,m=0,g=0,_=0,S=0,b=0,R=0,T=0,w=0;c.sort(V0);for(let A=0,L=c.length;A<L;A++){const P=c[A],k=P.color,F=P.intensity,I=P.distance;let C=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===1030?C=P.shadow.map.texture:C=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=k.r*F,f+=k.g*F,h+=k.b*F;else if(P.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],F);w++}else if(P.isDirectionalLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,i.directionalShadow[d]=Q,i.directionalShadowMap[d]=C,i.directionalShadowMatrix[d]=P.shadow.matrix,_++}i.directional[d]=G,d++}else if(P.isSpotLight){const G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(k).multiplyScalar(F),G.distance=I,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[v]=G;const z=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,z.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[v]=z.matrix,P.castShadow){const Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,i.spotShadow[v]=Q,i.spotShadowMap[v]=C,b++}v++}else if(P.isRectAreaLight){const G=e.get(P);G.color.copy(k).multiplyScalar(F),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=G,m++}else if(P.isPointLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const z=P.shadow,Q=t.get(P);Q.shadowIntensity=z.intensity,Q.shadowBias=z.bias,Q.shadowNormalBias=z.normalBias,Q.shadowRadius=z.radius,Q.shadowMapSize=z.mapSize,Q.shadowCameraNear=z.camera.near,Q.shadowCameraFar=z.camera.far,i.pointShadow[p]=Q,i.pointShadowMap[p]=C,i.pointShadowMatrix[p]=P.shadow.matrix,S++}i.point[p]=G,p++}else if(P.isHemisphereLight){const G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(F),G.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[g]=G,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const y=i.hash;(y.directionalLength!==d||y.pointLength!==p||y.spotLength!==v||y.rectAreaLength!==m||y.hemiLength!==g||y.numDirectionalShadows!==_||y.numPointShadows!==S||y.numSpotShadows!==b||y.numSpotMaps!==R||y.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=p,i.hemi.length=g,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=b+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=w,y.directionalLength=d,y.pointLength=p,y.spotLength=v,y.rectAreaLength=m,y.hemiLength=g,y.numDirectionalShadows=_,y.numPointShadows=S,y.numSpotShadows=b,y.numSpotMaps=R,y.numLightProbes=w,i.version=G0++)}function l(c,u){let f=0,h=0,d=0,p=0,v=0;const m=u.matrixWorldInverse;for(let g=0,_=c.length;g<_;g++){const S=c[g];if(S.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),f++}else if(S.isSpotLight){const b=i.spot[d];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const b=i.rectArea[p];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(S.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const b=i.hemi[v];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function Nl(n){const e=new z0(n),t=[],i=[],r=[];function s(h){f.camera=h,t.length=0,i.length=0,r.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){r.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function H0(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Nl(n),e.set(r,[o])):s>=a.length?(o=new Nl(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const W0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X0=`uniform sampler2D shadow_pass;
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
}`,q0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],Y0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],Bl=new St,ar=new O,Ma=new O;function j0(n,e,t){let i=new ro;const r=new Ee,s=new Ee,a=new _t,o=new Jf,l=new Qf,c={},u=t.maxTextureSize,f={0:1,1:0,2:2},h=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:W0,fragmentShader:X0}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new rn;p.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new zt(p,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let g=this.type;this.render=function(T,w,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===2&&(qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=1);const A=n.getRenderTarget(),L=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),k=n.state;k.setBlending(0),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=g!==this.type;F&&w.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(C=>C.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,C=T.length;I<C;I++){const G=T[I],z=G.shadow;if(z===void 0){qe("WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const Q=z.getFrameExtents();r.multiply(Q),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,z.mapSize.y=s.y));const te=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=te,z.map===null||F===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===3){if(G.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new En(r.x,r.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),z.map.texture.name=G.name+".shadowMap",z.map.depthTexture=new Wi(r.x,r.y,1015),z.map.depthTexture.name=G.name+".shadowMapDepth",z.map.depthTexture.format=1026,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=1003,z.map.depthTexture.magFilter=1003}else G.isPointLight?(z.map=new eu(r.x),z.map.depthTexture=new df(r.x,1014)):(z.map=new En(r.x,r.y),z.map.depthTexture=new Wi(r.x,r.y,1014)),z.map.depthTexture.name=G.name+".shadowMap",z.map.depthTexture.format=1026,this.type===1?(z.map.depthTexture.compareFunction=te?518:515,z.map.depthTexture.minFilter=1006,z.map.depthTexture.magFilter=1006):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=1003,z.map.depthTexture.magFilter=1003);z.camera.updateProjectionMatrix()}const le=z.map.isWebGLCubeRenderTarget?6:1;for(let ue=0;ue<le;ue++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,ue),n.clear();else{ue===0&&(n.setRenderTarget(z.map),n.clear());const Se=z.getViewport(ue);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),k.viewport(a)}if(G.isPointLight){const Se=z.camera,Be=z.matrix,Ye=G.distance||Se.far;Ye!==Se.far&&(Se.far=Ye,Se.updateProjectionMatrix()),ar.setFromMatrixPosition(G.matrixWorld),Se.position.copy(ar),Ma.copy(Se.position),Ma.add(q0[ue]),Se.up.copy(Y0[ue]),Se.lookAt(Ma),Se.updateMatrixWorld(),Be.makeTranslation(-ar.x,-ar.y,-ar.z),Bl.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Bl,Se.coordinateSystem,Se.reversedDepth)}else z.updateMatrices(G);i=z.getFrustum(),b(w,y,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===3&&_(z,y),z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(A,L,P)};function _(T,w){const y=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new En(r.x,r.y,{format:1030,type:1016})),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(w,null,y,h,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(w,null,y,d,v,null)}function S(T,w,y,A){let L=null;const P=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)L=P;else if(L=y.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const k=L.uuid,F=w.uuid;let I=c[k];I===void 0&&(I={},c[k]=I);let C=I[F];C===void 0&&(C=L.clone(),I[F]=C,w.addEventListener("dispose",R)),L=C}if(L.visible=w.visible,L.wireframe=w.wireframe,A===3?L.side=w.shadowSide!==null?w.shadowSide:w.side:L.side=w.shadowSide!==null?w.shadowSide:f[w.side],L.alphaMap=w.alphaMap,L.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,L.map=w.map,L.clipShadows=w.clipShadows,L.clippingPlanes=w.clippingPlanes,L.clipIntersection=w.clipIntersection,L.displacementMap=w.displacementMap,L.displacementScale=w.displacementScale,L.displacementBias=w.displacementBias,L.wireframeLinewidth=w.wireframeLinewidth,L.linewidth=w.linewidth,y.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const k=n.properties.get(L);k.light=y}return L}function b(T,w,y,A,L){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===3)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);const F=e.update(T),I=T.material;if(Array.isArray(I)){const C=F.groups;for(let G=0,z=C.length;G<z;G++){const Q=C[G],te=I[Q.materialIndex];if(te&&te.visible){const le=S(T,te,A,L);T.onBeforeShadow(n,T,w,y,F,le,Q),n.renderBufferDirect(y,null,F,le,T,Q),T.onAfterShadow(n,T,w,y,F,le,Q)}}}else if(I.visible){const C=S(T,I,A,L);T.onBeforeShadow(n,T,w,y,F,C,null),n.renderBufferDirect(y,null,F,C,T,null),T.onAfterShadow(n,T,w,y,F,C,null)}}const k=T.children;for(let F=0,I=k.length;F<I;F++)b(k[F],w,y,A,L)}function R(T){T.target.removeEventListener("dispose",R);for(const y in c){const A=c[y],L=T.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function $0(n,e){function t(){let U=!1;const fe=new _t;let j=null;const Ce=new _t(0,0,0,0);return{setMask:function(ge){j!==ge&&!U&&(n.colorMask(ge,ge,ge,ge),j=ge)},setLocked:function(ge){U=ge},setClear:function(ge,re,ke,Je,Et){Et===!0&&(ge*=Je,re*=Je,ke*=Je),fe.set(ge,re,ke,Je),Ce.equals(fe)===!1&&(n.clearColor(ge,re,ke,Je),Ce.copy(fe))},reset:function(){U=!1,j=null,Ce.set(-1,0,0,0)}}}function i(){let U=!1,fe=!1,j=null,Ce=null,ge=null;return{setReversed:function(re){if(fe!==re){const ke=e.get("EXT_clip_control");re?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),fe=re;const Je=ge;ge=null,this.setClear(Je)}},getReversed:function(){return fe},setTest:function(re){re?J(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(re){j!==re&&!U&&(n.depthMask(re),j=re)},setFunc:function(re){if(fe&&(re=Th[re]),Ce!==re){switch(re){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ce=re}},setLocked:function(re){U=re},setClear:function(re){ge!==re&&(ge=re,fe&&(re=1-re),n.clearDepth(re))},reset:function(){U=!1,j=null,Ce=null,ge=null,fe=!1}}}function r(){let U=!1,fe=null,j=null,Ce=null,ge=null,re=null,ke=null,Je=null,Et=null;return{setTest:function(pt){U||(pt?J(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(pt){fe!==pt&&!U&&(n.stencilMask(pt),fe=pt)},setFunc:function(pt,Pn,mn){(j!==pt||Ce!==Pn||ge!==mn)&&(n.stencilFunc(pt,Pn,mn),j=pt,Ce=Pn,ge=mn)},setOp:function(pt,Pn,mn){(re!==pt||ke!==Pn||Je!==mn)&&(n.stencilOp(pt,Pn,mn),re=pt,ke=Pn,Je=mn)},setLocked:function(pt){U=pt},setClear:function(pt){Et!==pt&&(n.clearStencil(pt),Et=pt)},reset:function(){U=!1,fe=null,j=null,Ce=null,ge=null,re=null,ke=null,Je=null,Et=null}}}const s=new t,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],v=null,m=!1,g=null,_=null,S=null,b=null,R=null,T=null,w=null,y=new it(0,0,0),A=0,L=!1,P=null,k=null,F=null,I=null,C=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const te=n.getParameter(n.VERSION);te.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(te)[1]),z=Q>=1):te.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),z=Q>=2);let le=null,ue={};const Se=n.getParameter(n.SCISSOR_BOX),Be=n.getParameter(n.VIEWPORT),Ye=new _t().fromArray(Se),Oe=new _t().fromArray(Be);function Y(U,fe,j,Ce){const ge=new Uint8Array(4),re=n.createTexture();n.bindTexture(U,re),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<j;ke++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(fe,0,n.RGBA,1,1,Ce,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(fe+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return re}const oe={};oe[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),oe[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),oe[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(n.DEPTH_TEST),a.setFunc(3),xe(!1),de(1),J(n.CULL_FACE),se(0);function J(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function be(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Fe(U,fe){return h[U]!==fe?(n.bindFramebuffer(U,fe),h[U]=fe,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=fe),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ue(U,fe){let j=p,Ce=!1;if(U){j=d.get(fe),j===void 0&&(j=[],d.set(fe,j));const ge=U.textures;if(j.length!==ge.length||j[0]!==n.COLOR_ATTACHMENT0){for(let re=0,ke=ge.length;re<ke;re++)j[re]=n.COLOR_ATTACHMENT0+re;j.length=ge.length,Ce=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,Ce=!0);Ce&&n.drawBuffers(j)}function Ze(U){return v!==U?(n.useProgram(U),v=U,!0):!1}const We={100:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};We[103]=n.MIN,We[104]=n.MAX;const $={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,204:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,205:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function se(U,fe,j,Ce,ge,re,ke,Je,Et,pt){if(U===0){m===!0&&(be(n.BLEND),m=!1);return}if(m===!1&&(J(n.BLEND),m=!0),U!==5){if(U!==g||pt!==L){if((_!==100||R!==100)&&(n.blendEquation(n.FUNC_ADD),_=100,R=100),pt)switch(U){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:at("WebGLState: Invalid blending: ",U);break}else switch(U){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case 3:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",U);break}S=null,b=null,T=null,w=null,y.set(0,0,0),A=0,g=U,L=pt}return}ge=ge||fe,re=re||j,ke=ke||Ce,(fe!==_||ge!==R)&&(n.blendEquationSeparate(We[fe],We[ge]),_=fe,R=ge),(j!==S||Ce!==b||re!==T||ke!==w)&&(n.blendFuncSeparate($[j],$[Ce],$[re],$[ke]),S=j,b=Ce,T=re,w=ke),(Je.equals(y)===!1||Et!==A)&&(n.blendColor(Je.r,Je.g,Je.b,Et),y.copy(Je),A=Et),g=U,L=!1}function ee(U,fe){U.side===2?be(n.CULL_FACE):J(n.CULL_FACE);let j=U.side===1;fe&&(j=!j),xe(j),U.blending===1&&U.transparent===!1?se(0):se(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const Ce=U.stencilWrite;o.setTest(Ce),Ce&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),D(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function xe(U){P!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),P=U)}function de(U){U!==0?(J(n.CULL_FACE),U!==k&&(U===1?n.cullFace(n.BACK):U===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),k=U}function Xe(U){U!==F&&(z&&n.lineWidth(U),F=U)}function D(U,fe,j){U?(J(n.POLYGON_OFFSET_FILL),(I!==fe||C!==j)&&(I=fe,C=j,a.getReversed()&&(fe=-fe),n.polygonOffset(fe,j))):be(n.POLYGON_OFFSET_FILL)}function je(U){U?J(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Le(U){U===void 0&&(U=n.TEXTURE0+G-1),le!==U&&(n.activeTexture(U),le=U)}function He(U,fe,j){j===void 0&&(le===null?j=n.TEXTURE0+G-1:j=le);let Ce=ue[j];Ce===void 0&&(Ce={type:void 0,texture:void 0},ue[j]=Ce),(Ce.type!==U||Ce.texture!==fe)&&(le!==j&&(n.activeTexture(j),le=j),n.bindTexture(U,fe||oe[U]),Ce.type=U,Ce.texture=fe)}function ie(){const U=ue[le];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ht(){try{n.compressedTexImage2D(...arguments)}catch(U){at("WebGLState:",U)}}function E(){try{n.compressedTexImage3D(...arguments)}catch(U){at("WebGLState:",U)}}function x(){try{n.texSubImage2D(...arguments)}catch(U){at("WebGLState:",U)}}function V(){try{n.texSubImage3D(...arguments)}catch(U){at("WebGLState:",U)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(U){at("WebGLState:",U)}}function ne(){try{n.compressedTexSubImage3D(...arguments)}catch(U){at("WebGLState:",U)}}function ce(){try{n.texStorage2D(...arguments)}catch(U){at("WebGLState:",U)}}function pe(){try{n.texStorage3D(...arguments)}catch(U){at("WebGLState:",U)}}function q(){try{n.texImage2D(...arguments)}catch(U){at("WebGLState:",U)}}function K(){try{n.texImage3D(...arguments)}catch(U){at("WebGLState:",U)}}function Ae(U){return f[U]!==void 0?f[U]:n.getParameter(U)}function we(U,fe){f[U]!==fe&&(n.pixelStorei(U,fe),f[U]=fe)}function me(U){Ye.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),Ye.copy(U))}function he(U){Oe.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Oe.copy(U))}function $e(U,fe){let j=c.get(fe);j===void 0&&(j=new WeakMap,c.set(fe,j));let Ce=j.get(U);Ce===void 0&&(Ce=n.getUniformBlockIndex(fe,U.name),j.set(U,Ce))}function et(U,fe){const Ce=c.get(fe).get(U);l.get(fe)!==Ce&&(n.uniformBlockBinding(fe,Ce,U.__bindingPointIndex),l.set(fe,Ce))}function ct(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},le=null,ue={},h={},d=new WeakMap,p=[],v=null,m=!1,g=null,_=null,S=null,b=null,R=null,T=null,w=null,y=new it(0,0,0),A=0,L=!1,P=null,k=null,F=null,I=null,C=null,Ye.set(0,0,n.canvas.width,n.canvas.height),Oe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:J,disable:be,bindFramebuffer:Fe,drawBuffers:Ue,useProgram:Ze,setBlending:se,setMaterial:ee,setFlipSided:xe,setCullFace:de,setLineWidth:Xe,setPolygonOffset:D,setScissorTest:je,activeTexture:Le,bindTexture:He,unbindTexture:ie,compressedTexImage2D:ht,compressedTexImage3D:E,texImage2D:q,texImage3D:K,pixelStorei:we,getParameter:Ae,updateUBOMapping:$e,uniformBlockBinding:et,texStorage2D:ce,texStorage3D:pe,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:Z,compressedTexSubImage3D:ne,scissor:me,viewport:he,reset:ct}}function Z0(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ee,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,x){return p?new OffscreenCanvas(E,x):gr("canvas")}function m(E,x,V){let Z=1;const ne=ht(E);if((ne.width>V||ne.height>V)&&(Z=V/Math.max(ne.width,ne.height)),Z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const ce=Math.floor(Z*ne.width),pe=Math.floor(Z*ne.height);h===void 0&&(h=v(ce,pe));const q=x?v(ce,pe):h;return q.width=ce,q.height=pe,q.getContext("2d").drawImage(E,0,0,ce,pe),qe("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ce+"x"+pe+")."),q}else return"data"in E&&qe("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),E;return E}function g(E){return E.generateMipmaps}function _(E){n.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(E,x,V,Z,ne,ce=!1){if(E!==null){if(n[E]!==void 0)return n[E];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let pe;Z&&(pe=e.get("EXT_texture_norm16"),pe||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=x;if(x===n.RED&&(V===n.FLOAT&&(q=n.R32F),V===n.HALF_FLOAT&&(q=n.R16F),V===n.UNSIGNED_BYTE&&(q=n.R8),V===n.UNSIGNED_SHORT&&pe&&(q=pe.R16_EXT),V===n.SHORT&&pe&&(q=pe.R16_SNORM_EXT)),x===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.R8UI),V===n.UNSIGNED_SHORT&&(q=n.R16UI),V===n.UNSIGNED_INT&&(q=n.R32UI),V===n.BYTE&&(q=n.R8I),V===n.SHORT&&(q=n.R16I),V===n.INT&&(q=n.R32I)),x===n.RG&&(V===n.FLOAT&&(q=n.RG32F),V===n.HALF_FLOAT&&(q=n.RG16F),V===n.UNSIGNED_BYTE&&(q=n.RG8),V===n.UNSIGNED_SHORT&&pe&&(q=pe.RG16_EXT),V===n.SHORT&&pe&&(q=pe.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RG8UI),V===n.UNSIGNED_SHORT&&(q=n.RG16UI),V===n.UNSIGNED_INT&&(q=n.RG32UI),V===n.BYTE&&(q=n.RG8I),V===n.SHORT&&(q=n.RG16I),V===n.INT&&(q=n.RG32I)),x===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(q=n.RGB16UI),V===n.UNSIGNED_INT&&(q=n.RGB32UI),V===n.BYTE&&(q=n.RGB8I),V===n.SHORT&&(q=n.RGB16I),V===n.INT&&(q=n.RGB32I)),x===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),V===n.UNSIGNED_INT&&(q=n.RGBA32UI),V===n.BYTE&&(q=n.RGBA8I),V===n.SHORT&&(q=n.RGBA16I),V===n.INT&&(q=n.RGBA32I)),x===n.RGB&&(V===n.UNSIGNED_SHORT&&pe&&(q=pe.RGB16_EXT),V===n.SHORT&&pe&&(q=pe.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),x===n.RGBA){const K=ce?gs:st.getTransfer(ne);V===n.FLOAT&&(q=n.RGBA32F),V===n.HALF_FLOAT&&(q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(q=K===ft?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&pe&&(q=pe.RGBA16_EXT),V===n.SHORT&&pe&&(q=pe.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function R(E,x){let V;return E?x===null||x===1014||x===1020?V=n.DEPTH24_STENCIL8:x===1015?V=n.DEPTH32F_STENCIL8:x===1012&&(V=n.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===1014||x===1020?V=n.DEPTH_COMPONENT24:x===1015?V=n.DEPTH_COMPONENT32F:x===1012&&(V=n.DEPTH_COMPONENT16),V}function T(E,x){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==1003&&E.minFilter!==1006?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function w(E){const x=E.target;x.removeEventListener("dispose",w),A(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function y(E){const x=E.target;x.removeEventListener("dispose",y),P(x)}function A(E){const x=i.get(E);if(x.__webglInit===void 0)return;const V=E.source,Z=d.get(V);if(Z){const ne=Z[x.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&L(E),Object.keys(Z).length===0&&d.delete(V)}i.remove(E)}function L(E){const x=i.get(E);n.deleteTexture(x.__webglTexture);const V=E.source,Z=d.get(V);delete Z[x.__cacheKey],a.memory.textures--}function P(E){const x=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let ne=0;ne<x.__webglFramebuffer[Z].length;ne++)n.deleteFramebuffer(x.__webglFramebuffer[Z][ne]);else n.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)n.deleteFramebuffer(x.__webglFramebuffer[Z]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const V=E.textures;for(let Z=0,ne=V.length;Z<ne;Z++){const ce=i.get(V[Z]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(V[Z])}i.remove(E)}let k=0;function F(){k=0}function I(){return k}function C(E){k=E}function G(){const E=k;return E>=r.maxTextures&&qe("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),k+=1,E}function z(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function Q(E,x){const V=i.get(E);if(E.isVideoTexture&&He(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&V.__version!==E.version){const Z=E.image;if(Z===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{be(V,E,x);return}}else E.isExternalTexture&&(V.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+x)}function te(E,x){const V=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){be(V,E,x);return}else E.isExternalTexture&&(V.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+x)}function le(E,x){const V=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){be(V,E,x);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+x)}function ue(E,x){const V=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&V.__version!==E.version){Fe(V,E,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+x)}const Se={1e3:n.REPEAT,1001:n.CLAMP_TO_EDGE,1002:n.MIRRORED_REPEAT},Be={1003:n.NEAREST,1004:n.NEAREST_MIPMAP_NEAREST,1005:n.NEAREST_MIPMAP_LINEAR,1006:n.LINEAR,1007:n.LINEAR_MIPMAP_NEAREST,1008:n.LINEAR_MIPMAP_LINEAR},Ye={512:n.NEVER,519:n.ALWAYS,513:n.LESS,515:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function Oe(E,x){if(x.type===1015&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===1006||x.magFilter===1007||x.magFilter===1005||x.magFilter===1008||x.minFilter===1006||x.minFilter===1007||x.minFilter===1005||x.minFilter===1008)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,Se[x.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,Se[x.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,Se[x.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,Be[x.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,Be[x.minFilter]),x.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,Ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===1003||x.minFilter!==1005&&x.minFilter!==1008||x.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Y(E,x){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",w));const Z=x.source;let ne=d.get(Z);ne===void 0&&(ne={},d.set(Z,ne));const ce=z(x);if(ce!==E.__cacheKey){ne[ce]===void 0&&(ne[ce]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ne[ce].usedTimes++;const pe=ne[E.__cacheKey];pe!==void 0&&(ne[E.__cacheKey].usedTimes--,pe.usedTimes===0&&L(x)),E.__cacheKey=ce,E.__webglTexture=ne[ce].texture}return V}function oe(E,x,V){return Math.floor(Math.floor(E/V)/x)}function J(E,x,V,Z){const ce=E.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,V,Z,x.data);else{ce.sort((we,me)=>we.start-me.start);let pe=0;for(let we=1;we<ce.length;we++){const me=ce[pe],he=ce[we],$e=me.start+me.count,et=oe(he.start,x.width,4),ct=oe(me.start,x.width,4);he.start<=$e+1&&et===ct&&oe(he.start+he.count-1,x.width,4)===et?me.count=Math.max(me.count,he.start+he.count-me.start):(++pe,ce[pe]=he)}ce.length=pe+1;const q=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),Ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let we=0,me=ce.length;we<me;we++){const he=ce[we],$e=Math.floor(he.start/4),et=Math.ceil(he.count/4),ct=$e%x.width,U=Math.floor($e/x.width),fe=et,j=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ct),t.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,ct,U,fe,j,V,Z,x.data)}E.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ae)}}function be(E,x,V){let Z=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=n.TEXTURE_3D);const ne=Y(E,x),ce=x.source;t.bindTexture(Z,E.__webglTexture,n.TEXTURE0+V);const pe=i.get(ce);if(ce.version!==pe.__version||ne===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const j=st.getPrimaries(st.workingColorSpace),Ce=x.colorSpace===""?null:st.getPrimaries(x.colorSpace),ge=x.colorSpace===""||j===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let K=m(x.image,!1,r.maxTextureSize);K=ie(x,K);const Ae=s.convert(x.format,x.colorSpace),we=s.convert(x.type);let me=b(x.internalFormat,Ae,we,x.normalized,x.colorSpace,x.isVideoTexture);Oe(Z,x);let he;const $e=x.mipmaps,et=x.isVideoTexture!==!0,ct=pe.__version===void 0||ne===!0,U=ce.dataReady,fe=T(x,K);if(x.isDepthTexture)me=R(x.format===1027,x.type),ct&&(et?t.texStorage2D(n.TEXTURE_2D,1,me,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,me,K.width,K.height,0,Ae,we,null));else if(x.isDataTexture)if($e.length>0){et&&ct&&t.texStorage2D(n.TEXTURE_2D,fe,me,$e[0].width,$e[0].height);for(let j=0,Ce=$e.length;j<Ce;j++)he=$e[j],et?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,he.width,he.height,Ae,we,he.data):t.texImage2D(n.TEXTURE_2D,j,me,he.width,he.height,0,Ae,we,he.data);x.generateMipmaps=!1}else et?(ct&&t.texStorage2D(n.TEXTURE_2D,fe,me,K.width,K.height),U&&J(x,K,Ae,we)):t.texImage2D(n.TEXTURE_2D,0,me,K.width,K.height,0,Ae,we,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){et&&ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,me,$e[0].width,$e[0].height,K.depth);for(let j=0,Ce=$e.length;j<Ce;j++)if(he=$e[j],x.format!==1023)if(Ae!==null)if(et){if(U)if(x.layerUpdates.size>0){const ge=ml(he.width,he.height,x.format,x.type);for(const re of x.layerUpdates){const ke=he.data.subarray(re*ge/he.data.BYTES_PER_ELEMENT,(re+1)*ge/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,re,he.width,he.height,1,Ae,ke)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,he.width,he.height,K.depth,Ae,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,me,he.width,he.height,K.depth,0,he.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,he.width,he.height,K.depth,Ae,we,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,me,he.width,he.height,K.depth,0,Ae,we,he.data)}else{et&&ct&&t.texStorage2D(n.TEXTURE_2D,fe,me,$e[0].width,$e[0].height);for(let j=0,Ce=$e.length;j<Ce;j++)he=$e[j],x.format!==1023?Ae!==null?et?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,he.width,he.height,Ae,he.data):t.compressedTexImage2D(n.TEXTURE_2D,j,me,he.width,he.height,0,he.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,he.width,he.height,Ae,we,he.data):t.texImage2D(n.TEXTURE_2D,j,me,he.width,he.height,0,Ae,we,he.data)}else if(x.isDataArrayTexture)if(et){if(ct&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,me,K.width,K.height,K.depth),U)if(x.layerUpdates.size>0){const j=ml(K.width,K.height,x.format,x.type);for(const Ce of x.layerUpdates){const ge=K.data.subarray(Ce*j/K.data.BYTES_PER_ELEMENT,(Ce+1)*j/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ce,K.width,K.height,1,Ae,we,ge)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ae,we,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,K.width,K.height,K.depth,0,Ae,we,K.data);else if(x.isData3DTexture)et?(ct&&t.texStorage3D(n.TEXTURE_3D,fe,me,K.width,K.height,K.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ae,we,K.data)):t.texImage3D(n.TEXTURE_3D,0,me,K.width,K.height,K.depth,0,Ae,we,K.data);else if(x.isFramebufferTexture){if(ct)if(et)t.texStorage2D(n.TEXTURE_2D,fe,me,K.width,K.height);else{let j=K.width,Ce=K.height;for(let ge=0;ge<fe;ge++)t.texImage2D(n.TEXTURE_2D,ge,me,j,Ce,0,Ae,we,null),j>>=1,Ce>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const j=n.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),K.parentNode!==j){j.appendChild(K),f.add(x),j.onpaint=Je=>{const Et=Je.changedElements;for(const pt of f)Et.includes(pt.image)&&(pt.needsUpdate=!0)},j.requestPaint();return}const Ce=0,ge=n.RGBA,re=n.RGBA,ke=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,Ce,ge,re,ke,K),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if($e.length>0){if(et&&ct){const j=ht($e[0]);t.texStorage2D(n.TEXTURE_2D,fe,me,j.width,j.height)}for(let j=0,Ce=$e.length;j<Ce;j++)he=$e[j],et?U&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,Ae,we,he):t.texImage2D(n.TEXTURE_2D,j,me,Ae,we,he);x.generateMipmaps=!1}else if(et){if(ct){const j=ht(K);t.texStorage2D(n.TEXTURE_2D,fe,me,j.width,j.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ae,we,K)}else t.texImage2D(n.TEXTURE_2D,0,me,Ae,we,K);g(x)&&_(Z),pe.__version=ce.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Fe(E,x,V){if(x.image.length!==6)return;const Z=Y(E,x),ne=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+V);const ce=i.get(ne);if(ne.version!==ce.__version||Z===!0){t.activeTexture(n.TEXTURE0+V);const pe=st.getPrimaries(st.workingColorSpace),q=x.colorSpace===""?null:st.getPrimaries(x.colorSpace),K=x.colorSpace===""||pe===q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,we=x.image[0]&&x.image[0].isDataTexture,me=[];for(let re=0;re<6;re++)!Ae&&!we?me[re]=m(x.image[re],!0,r.maxCubemapSize):me[re]=we?x.image[re].image:x.image[re],me[re]=ie(x,me[re]);const he=me[0],$e=s.convert(x.format,x.colorSpace),et=s.convert(x.type),ct=b(x.internalFormat,$e,et,x.normalized,x.colorSpace),U=x.isVideoTexture!==!0,fe=ce.__version===void 0||Z===!0,j=ne.dataReady;let Ce=T(x,he);Oe(n.TEXTURE_CUBE_MAP,x);let ge;if(Ae){U&&fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,ct,he.width,he.height);for(let re=0;re<6;re++){ge=me[re].mipmaps;for(let ke=0;ke<ge.length;ke++){const Je=ge[ke];x.format!==1023?$e!==null?U?j&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke,0,0,Je.width,Je.height,$e,Je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke,ct,Je.width,Je.height,0,Je.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke,0,0,Je.width,Je.height,$e,et,Je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke,ct,Je.width,Je.height,0,$e,et,Je.data)}}}else{if(ge=x.mipmaps,U&&fe){ge.length>0&&Ce++;const re=ht(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ce,ct,re.width,re.height)}for(let re=0;re<6;re++)if(we){U?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,me[re].width,me[re].height,$e,et,me[re].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ct,me[re].width,me[re].height,0,$e,et,me[re].data);for(let ke=0;ke<ge.length;ke++){const Et=ge[ke].image[re].image;U?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke+1,0,0,Et.width,Et.height,$e,et,Et.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke+1,ct,Et.width,Et.height,0,$e,et,Et.data)}}else{U?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,$e,et,me[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ct,$e,et,me[re]);for(let ke=0;ke<ge.length;ke++){const Je=ge[ke];U?j&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke+1,0,0,$e,et,Je.image[re]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ke+1,ct,$e,et,Je.image[re])}}}g(x)&&_(n.TEXTURE_CUBE_MAP),ce.__version=ne.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function Ue(E,x,V,Z,ne,ce){const pe=s.convert(V.format,V.colorSpace),q=s.convert(V.type),K=b(V.internalFormat,pe,q,V.normalized,V.colorSpace),Ae=i.get(x),we=i.get(V);if(we.__renderTarget=x,!Ae.__hasExternalTextures){const me=Math.max(1,x.width>>ce),he=Math.max(1,x.height>>ce);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,ce,K,me,he,x.depth,0,pe,q,null):t.texImage2D(ne,ce,K,me,he,0,pe,q,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),Le(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ne,we.__webglTexture,0,je(x)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ne,we.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ze(E,x,V){if(n.bindRenderbuffer(n.RENDERBUFFER,E),x.depthBuffer){const Z=x.depthTexture,ne=Z&&Z.isDepthTexture?Z.type:null,ce=R(x.stencilBuffer,ne),pe=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Le(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,je(x),ce,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,je(x),ce,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ce,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,E)}else{const Z=x.textures;for(let ne=0;ne<Z.length;ne++){const ce=Z[ne],pe=s.convert(ce.format,ce.colorSpace),q=s.convert(ce.type),K=b(ce.internalFormat,pe,q,ce.normalized,ce.colorSpace);Le(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,je(x),K,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,je(x),K,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,K,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function We(E,x,V){const Z=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=i.get(x.depthTexture);if(ne.__renderTarget=x,(!ne.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,x.depthTexture.addEventListener("dispose",w)),ne.__webglTexture===void 0){ne.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,x.depthTexture);const Ae=s.convert(x.depthTexture.format),we=s.convert(x.depthTexture.type);let me;x.depthTexture.format===1026?me=n.DEPTH_COMPONENT24:x.depthTexture.format===1027&&(me=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,me,x.width,x.height,0,Ae,we,null)}}else Q(x.depthTexture,0);const ce=ne.__webglTexture,pe=je(x),q=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,K=x.depthTexture.format===1027?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===1026)Le(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,q,ce,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,K,q,ce,0);else if(x.depthTexture.format===1027)Le(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,q,ce,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,K,q,ce,0);else throw new Error("Unknown depthTexture format")}function $(E){const x=i.get(E),V=E.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==E.depthTexture){const Z=E.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const ne=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",ne)};Z.addEventListener("dispose",ne),x.__depthDisposeCallback=ne}x.__boundDepthTexture=Z}if(E.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let Z=0;Z<6;Z++)We(x.__webglFramebuffer[Z],E,Z);else{const Z=E.texture.mipmaps;Z&&Z.length>0?We(x.__webglFramebuffer[0],E,0):We(x.__webglFramebuffer,E,0)}else if(V){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=n.createRenderbuffer(),Ze(x.__webglDepthbuffer[Z],E,!1);else{const ne=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,ce)}}else{const Z=E.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ze(x.__webglDepthbuffer,E,!1);else{const ne=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(E,x,V){const Z=i.get(E);x!==void 0&&Ue(Z.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&$(E)}function ee(E){const x=E.texture,V=i.get(E),Z=i.get(x);E.addEventListener("dispose",y);const ne=E.textures,ce=E.isWebGLCubeRenderTarget===!0,pe=ne.length>1;if(pe||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=x.version,a.memory.textures++),ce){V.__webglFramebuffer=[];for(let q=0;q<6;q++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[q]=[];for(let K=0;K<x.mipmaps.length;K++)V.__webglFramebuffer[q][K]=n.createFramebuffer()}else V.__webglFramebuffer[q]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let q=0;q<x.mipmaps.length;q++)V.__webglFramebuffer[q]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(pe)for(let q=0,K=ne.length;q<K;q++){const Ae=i.get(ne[q]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&Le(E)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let q=0;q<ne.length;q++){const K=ne[q];V.__webglColorRenderbuffer[q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[q]);const Ae=s.convert(K.format,K.colorSpace),we=s.convert(K.type),me=b(K.internalFormat,Ae,we,K.normalized,K.colorSpace,E.isXRRenderTarget===!0),he=je(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,me,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+q,n.RENDERBUFFER,V.__webglColorRenderbuffer[q])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),Ze(V.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,x);for(let q=0;q<6;q++)if(x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Ue(V.__webglFramebuffer[q][K],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,K);else Ue(V.__webglFramebuffer[q],E,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);g(x)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let q=0,K=ne.length;q<K;q++){const Ae=ne[q],we=i.get(Ae);let me=n.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(me=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,we.__webglTexture),Oe(me,Ae),Ue(V.__webglFramebuffer,E,Ae,n.COLOR_ATTACHMENT0+q,me,0),g(Ae)&&_(me)}t.unbindTexture()}else{let q=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(q=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(q,Z.__webglTexture),Oe(q,x),x.mipmaps&&x.mipmaps.length>0)for(let K=0;K<x.mipmaps.length;K++)Ue(V.__webglFramebuffer[K],E,x,n.COLOR_ATTACHMENT0,q,K);else Ue(V.__webglFramebuffer,E,x,n.COLOR_ATTACHMENT0,q,0);g(x)&&_(q),t.unbindTexture()}E.depthBuffer&&$(E)}function xe(E){const x=E.textures;for(let V=0,Z=x.length;V<Z;V++){const ne=x[V];if(g(ne)){const ce=S(E),pe=i.get(ne).__webglTexture;t.bindTexture(ce,pe),_(ce),t.unbindTexture()}}}const de=[],Xe=[];function D(E){if(E.samples>0){if(Le(E)===!1){const x=E.textures,V=E.width,Z=E.height;let ne=n.COLOR_BUFFER_BIT;const ce=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(E),q=x.length>1;if(q)for(let Ae=0;Ae<x.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const K=E.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Ae]);const we=i.get(x[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,we,0)}n.blitFramebuffer(0,0,V,Z,0,0,V,Z,ne,n.NEAREST),l===!0&&(de.length=0,Xe.length=0,de.push(n.COLOR_ATTACHMENT0+Ae),E.depthBuffer&&E.resolveDepthBuffer===!1&&(de.push(ce),Xe.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Xe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),q)for(let Ae=0;Ae<x.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Ae]);const we=i.get(x[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,we,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const x=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function je(E){return Math.min(r.maxSamples,E.samples)}function Le(E){const x=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function He(E){const x=a.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function ie(E,x){const V=E.colorSpace,Z=E.format,ne=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||V!==mr&&V!==""&&(st.getTransfer(V)===ft?(Z!==1023||ne!==1009)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",V)),x}function ht(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.getTextureUnits=I,this.setTextureUnits=C,this.setTexture2D=Q,this.setTexture2DArray=te,this.setTexture3D=le,this.setTextureCube=ue,this.rebindTextures=se,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=$,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=Le,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function K0(n,e){function t(i,r=""){let s;const a=st.getTransfer(r);if(i===1009)return n.UNSIGNED_BYTE;if(i===1017)return n.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return n.UNSIGNED_SHORT_5_5_5_1;if(i===35902)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===35899)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===1010)return n.BYTE;if(i===1011)return n.SHORT;if(i===1012)return n.UNSIGNED_SHORT;if(i===1013)return n.INT;if(i===1014)return n.UNSIGNED_INT;if(i===1015)return n.FLOAT;if(i===1016)return n.HALF_FLOAT;if(i===1021)return n.ALPHA;if(i===1022)return n.RGB;if(i===1023)return n.RGBA;if(i===1026)return n.DEPTH_COMPONENT;if(i===1027)return n.DEPTH_STENCIL;if(i===1028)return n.RED;if(i===1029)return n.RED_INTEGER;if(i===1030)return n.RG;if(i===1031)return n.RG_INTEGER;if(i===1033)return n.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(a===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196||i===37492||i===37496||i===37488||i===37489||i===37490||i===37491)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===36196||i===37492)return a===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===37496)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===37488)return s.COMPRESSED_R11_EAC;if(i===37489)return s.COMPRESSED_SIGNED_R11_EAC;if(i===37490)return s.COMPRESSED_RG11_EAC;if(i===37491)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===37808)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===36492)return a===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===36283)return s.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===1020?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const J0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q0=`
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

}`;class ev{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new kc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new hn({vertexShader:J0,fragmentShader:Q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tv extends gi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",m=new ev,g={},_=t.getContextAttributes();let S=null,b=null;const R=[],T=[],w=new Ee;let y=null;const A=new Jt;A.viewport=new _t;const L=new Jt;L.viewport=new _t;const P=[A,L],k=new ud;let F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let oe=R[Y];return oe===void 0&&(oe=new Zs,R[Y]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(Y){let oe=R[Y];return oe===void 0&&(oe=new Zs,R[Y]=oe),oe.getGripSpace()},this.getHand=function(Y){let oe=R[Y];return oe===void 0&&(oe=new Zs,R[Y]=oe),oe.getHandSpace()};function C(Y){const oe=T.indexOf(Y.inputSource);if(oe===-1)return;const J=R[oe];J!==void 0&&(J.update(Y.inputSource,Y.frame,c||a),J.dispatchEvent({type:Y.type,data:Y.inputSource}))}function G(){r.removeEventListener("select",C),r.removeEventListener("selectstart",C),r.removeEventListener("selectend",C),r.removeEventListener("squeeze",C),r.removeEventListener("squeezestart",C),r.removeEventListener("squeezeend",C),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",z);for(let Y=0;Y<R.length;Y++){const oe=T[Y];oe!==null&&(T[Y]=null,R[Y].disconnect(oe))}F=null,I=null,m.reset();for(const Y in g)delete g[Y];e.setRenderTarget(S),d=null,h=null,f=null,r=null,b=null,Oe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",C),r.addEventListener("selectstart",C),r.addEventListener("selectend",C),r.addEventListener("squeeze",C),r.addEventListener("squeezestart",C),r.addEventListener("squeezeend",C),r.addEventListener("end",G),r.addEventListener("inputsourceschange",z),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let J=null,be=null,Fe=null;_.depth&&(Fe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=_.stencil?1027:1026,be=_.stencil?1020:1014);const Ue={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Ue),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new En(h.textureWidth,h.textureHeight,{format:1023,type:1009,depthTexture:new Wi(h.textureWidth,h.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const J={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new En(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Oe.setContext(r),Oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(Y){for(let oe=0;oe<Y.removed.length;oe++){const J=Y.removed[oe],be=T.indexOf(J);be>=0&&(T[be]=null,R[be].disconnect(J))}for(let oe=0;oe<Y.added.length;oe++){const J=Y.added[oe];let be=T.indexOf(J);if(be===-1){for(let Ue=0;Ue<R.length;Ue++)if(Ue>=T.length){T.push(J),be=Ue;break}else if(T[Ue]===null){T[Ue]=J,be=Ue;break}if(be===-1)break}const Fe=R[be];Fe&&Fe.connect(J)}}const Q=new O,te=new O;function le(Y,oe,J){Q.setFromMatrixPosition(oe.matrixWorld),te.setFromMatrixPosition(J.matrixWorld);const be=Q.distanceTo(te),Fe=oe.projectionMatrix.elements,Ue=J.projectionMatrix.elements,Ze=Fe[14]/(Fe[10]-1),We=Fe[14]/(Fe[10]+1),$=(Fe[9]+1)/Fe[5],se=(Fe[9]-1)/Fe[5],ee=(Fe[8]-1)/Fe[0],xe=(Ue[8]+1)/Ue[0],de=Ze*ee,Xe=Ze*xe,D=be/(-ee+xe),je=D*-ee;if(oe.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(je),Y.translateZ(D),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Fe[10]===-1)Y.projectionMatrix.copy(oe.projectionMatrix),Y.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Le=Ze+D,He=We+D,ie=de-je,ht=Xe+(be-je),E=$*We/He*Le,x=se*We/He*Le;Y.projectionMatrix.makePerspective(ie,ht,E,x,Le,He),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ue(Y,oe){oe===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(oe.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let oe=Y.near,J=Y.far;m.texture!==null&&(m.depthNear>0&&(oe=m.depthNear),m.depthFar>0&&(J=m.depthFar)),k.near=L.near=A.near=oe,k.far=L.far=A.far=J,(F!==k.near||I!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),F=k.near,I=k.far),k.layers.mask=Y.layers.mask|6,A.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;const be=Y.parent,Fe=k.cameras;ue(k,be);for(let Ue=0;Ue<Fe.length;Ue++)ue(Fe[Ue],be);Fe.length===2?le(k,A,L):k.projectionMatrix.copy(A.projectionMatrix),Se(Y,k,be)};function Se(Y,oe,J){J===null?Y.matrix.copy(oe.matrixWorld):(Y.matrix.copy(J.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(oe.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(oe.projectionMatrix),Y.projectionMatrixInverse.copy(oe.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=vr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Y){return g[Y]};let Be=null;function Ye(Y,oe){if(u=oe.getViewerPose(c||a),p=oe,u!==null){const J=u.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let be=!1;J.length!==k.cameras.length&&(k.cameras.length=0,be=!0);for(let We=0;We<J.length;We++){const $=J[We];let se=null;if(d!==null)se=d.getViewport($);else{const xe=f.getViewSubImage(h,$);se=xe.viewport,We===0&&(e.setRenderTargetTextures(b,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(b))}let ee=P[We];ee===void 0&&(ee=new Jt,ee.layers.enable(We),ee.viewport=new _t,P[We]=ee),ee.matrix.fromArray($.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray($.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(se.x,se.y,se.width,se.height),We===0&&(k.matrix.copy(ee.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),be===!0&&k.cameras.push(ee)}const Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const We=f.getDepthInformation(J[0]);We&&We.isValid&&We.texture&&m.init(We,r.renderState)}if(Fe&&Fe.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let We=0;We<J.length;We++){const $=J[We].camera;if($){let se=g[$];se||(se=new kc,g[$]=se);const ee=f.getCameraImage($);se.sourceTexture=ee}}}}for(let J=0;J<R.length;J++){const be=T[J],Fe=R[J];be!==null&&Fe!==void 0&&Fe.update(be,oe,c||a)}Be&&Be(Y,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),p=null}const Oe=new Jc;Oe.setAnimationLoop(Ye),this.setAnimationLoop=function(Y){Be=Y},this.dispose=function(){}}}const nv=new St,su=new Ke;su.set(-1,0,0,0,1,0,0,0,1);function iv(n,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,jc(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function r(m,g,_,S,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(m,g):g.isMeshLambertMaterial?(s(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(m,g),f(m,g)):g.isMeshPhongMaterial?(s(m,g),u(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(m,g),h(m,g),g.isMeshPhysicalMaterial&&d(m,g,b)):g.isMeshMatcapMaterial?(s(m,g),p(m,g)):g.isMeshDepthMaterial?s(m,g):g.isMeshDistanceMaterial?(s(m,g),v(m,g)):g.isMeshNormalMaterial?s(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,_,S):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===1&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===1&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const _=e.get(g),S=_.envMap,b=_.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(nv.makeRotationFromEuler(b)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(su),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,_,S){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*_,m.scale.value=S*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function h(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,_){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===1&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const _=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function rv(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){const b=S.program;i.uniformBlockBinding(_,b)}function c(_,S){let b=r[_.id];b===void 0&&(p(_),b=u(_),r[_.id]=b,_.addEventListener("dispose",m));const R=S.program;i.updateUBOMapping(_,R);const T=e.render.frame;s[_.id]!==T&&(h(_),s[_.id]=T)}function u(_){const S=f();_.__bindingPointIndex=S;const b=n.createBuffer(),R=_.__size,T=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,R,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,b),b}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const S=r[_.id],b=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let T=0,w=b.length;T<w;T++){const y=Array.isArray(b[T])?b[T]:[b[T]];for(let A=0,L=y.length;A<L;A++){const P=y[A];if(d(P,T,A,R)===!0){const k=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let I=0;for(let C=0;C<F.length;C++){const G=F[C],z=v(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,k+I,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):ArrayBuffer.isView(G)?P.__data.set(new G.constructor(G.buffer,G.byteOffset,P.__data.length)):(G.toArray(P.__data,I),I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(_,S,b,R){const T=_.value,w=S+"_"+b;if(R[w]===void 0)return typeof T=="number"||typeof T=="boolean"?R[w]=T:ArrayBuffer.isView(T)?R[w]=T.slice():R[w]=T.clone(),!0;{const y=R[w];if(typeof T=="number"||typeof T=="boolean"){if(y!==T)return R[w]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(y.equals(T)===!1)return y.copy(T),!0}}return!1}function p(_){const S=_.uniforms;let b=0;const R=16;for(let w=0,y=S.length;w<y;w++){const A=Array.isArray(S[w])?S[w]:[S[w]];for(let L=0,P=A.length;L<P;L++){const k=A[L],F=Array.isArray(k.value)?k.value:[k.value];for(let I=0,C=F.length;I<C;I++){const G=F[I],z=v(G),Q=b%R,te=Q%z.boundary,le=Q+te;b+=te,le!==0&&R-le<z.storage&&(b+=R-le),k.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=b,b+=z.storage}}}const T=b%R;return T>0&&(b+=R-T),_.__size=b,_.__cache={},this}function v(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",_),S}function m(_){const S=_.target;S.removeEventListener("dispose",m);const b=a.indexOf(S.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function g(){for(const _ in r)n.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:c,dispose:g}}const sv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let xn=null;function av(){return xn===null&&(xn=new cf(sv,16,16,1030,1016),xn.name="DFG_LUT",xn.minFilter=1006,xn.magFilter=1006,xn.wrapS=1001,xn.wrapT=1001,xn.generateMipmaps=!1,xn.needsUpdate=!0),xn}class ov{constructor(e={}){const{canvas:t=bh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=1009}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=d,m=new Set([1033,1031,1029]),g=new Set([1009,1014,1012,1020,1017,1018]),_=new Uint32Array(4),S=new Int32Array(4),b=new O;let R=null,T=null;const w=[],y=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let P=!1,k=null;this._outputColorSpace=jt;let F=0,I=0,C=null,G=-1,z=null;const Q=new _t,te=new _t;let le=null;const ue=new it(0);let Se=0,Be=t.width,Ye=t.height,Oe=1,Y=null,oe=null;const J=new _t(0,0,Be,Ye),be=new _t(0,0,Be,Ye);let Fe=!1;const Ue=new ro;let Ze=!1,We=!1;const $=new St,se=new O,ee=new _t,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Xe(){return C===null?Oe:1}let D=i;function je(M,B){return t.getContext(M,B)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r184"),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",Je,!1),D===null){const B="webgl2";if(D=je(B,M),D===null)throw je(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw at("WebGLRenderer: "+M.message),M}let Le,He,ie,ht,E,x,V,Z,ne,ce,pe,q,K,Ae,we,me,he,$e,et,ct,U,fe,j;function Ce(){Le=new ag(D),Le.init(),U=new K0(D,Le),He=new Jm(D,Le,e,U),ie=new $0(D,Le),He.reversedDepthBuffer&&h&&ie.buffers.depth.setReversed(!0),ht=new cg(D),E=new F0,x=new Z0(D,Le,ie,E,He,U,ht),V=new sg(L),Z=new dd(D),fe=new Zm(D,Z),ne=new og(D,Z,ht,fe),ce=new hg(D,ne,Z,fe,ht),$e=new ug(D,He,x),we=new Qm(E),pe=new U0(L,V,Le,He,fe,we),q=new iv(L,E),K=new N0,Ae=new H0(Le),he=new $m(L,V,ie,ce,p,l),me=new j0(L,ce,He),j=new rv(D,ht,He,ie),et=new Km(D,Le,ht),ct=new lg(D,Le,ht),ht.programs=pe.programs,L.capabilities=He,L.extensions=Le,L.properties=E,L.renderLists=K,L.shadowMap=me,L.state=ie,L.info=ht}Ce(),v!==1009&&(A=new dg(v,t.width,t.height,r,s));const ge=new tv(L,D);this.xr=ge,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=Le.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Le.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(M){M!==void 0&&(Oe=M,this.setSize(Be,Ye,!1))},this.getSize=function(M){return M.set(Be,Ye)},this.setSize=function(M,B,X=!0){if(ge.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Be=M,Ye=B,t.width=Math.floor(M*Oe),t.height=Math.floor(B*Oe),X===!0&&(t.style.width=M+"px",t.style.height=B+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(Be*Oe,Ye*Oe).floor()},this.setDrawingBufferSize=function(M,B,X){Be=M,Ye=B,Oe=X,t.width=Math.floor(M*X),t.height=Math.floor(B*X),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(v===1009){at("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){qe("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Q)},this.getViewport=function(M){return M.copy(J)},this.setViewport=function(M,B,X,H){M.isVector4?J.set(M.x,M.y,M.z,M.w):J.set(M,B,X,H),ie.viewport(Q.copy(J).multiplyScalar(Oe).round())},this.getScissor=function(M){return M.copy(be)},this.setScissor=function(M,B,X,H){M.isVector4?be.set(M.x,M.y,M.z,M.w):be.set(M,B,X,H),ie.scissor(te.copy(be).multiplyScalar(Oe).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(M){ie.setScissorTest(Fe=M)},this.setOpaqueSort=function(M){Y=M},this.setTransparentSort=function(M){oe=M},this.getClearColor=function(M){return M.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor(...arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,X=!0){let H=0;if(M){let W=!1;if(C!==null){const Te=C.texture.format;W=m.has(Te)}if(W){const Te=C.texture.type,Pe=g.has(Te),Me=he.getClearColor(),Ne=he.getClearAlpha(),Ge=Me.r,Qe=Me.g,nt=Me.b;Pe?(_[0]=Ge,_[1]=Qe,_[2]=nt,_[3]=Ne,D.clearBufferuiv(D.COLOR,0,_)):(S[0]=Ge,S[1]=Qe,S[2]=nt,S[3]=Ne,D.clearBufferiv(D.COLOR,0,S))}else H|=D.COLOR_BUFFER_BIT}B&&(H|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),k=M},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",Je,!1),he.dispose(),K.dispose(),Ae.dispose(),E.dispose(),V.dispose(),ce.dispose(),fe.dispose(),j.dispose(),pe.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",Lo),ge.removeEventListener("sessionend",Do),ii.stop()};function re(M){M.preventDefault(),Vo("WebGLRenderer: Context Lost."),P=!0}function ke(){Vo("WebGLRenderer: Context Restored."),P=!1;const M=ht.autoReset,B=me.enabled,X=me.autoUpdate,H=me.needsUpdate,W=me.type;Ce(),ht.autoReset=M,me.enabled=B,me.autoUpdate=X,me.needsUpdate=H,me.type=W}function Je(M){at("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Et(M){const B=M.target;B.removeEventListener("dispose",Et),pt(B)}function pt(M){Pn(M),E.remove(M)}function Pn(M){const B=E.get(M).programs;B!==void 0&&(B.forEach(function(X){pe.releaseProgram(X)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,X,H,W,Te){B===null&&(B=xe);const Pe=W.isMesh&&W.matrixWorld.determinant()<0,Me=mh(M,B,X,H,W);ie.setMaterial(H,Pe);let Ne=X.index,Ge=1;if(H.wireframe===!0){if(Ne=ne.getWireframeAttribute(X),Ne===void 0)return;Ge=2}const Qe=X.drawRange,nt=X.attributes.position;let Ve=Qe.start*Ge,mt=(Qe.start+Qe.count)*Ge;Te!==null&&(Ve=Math.max(Ve,Te.start*Ge),mt=Math.min(mt,(Te.start+Te.count)*Ge)),Ne!==null?(Ve=Math.max(Ve,0),mt=Math.min(mt,Ne.count)):nt!=null&&(Ve=Math.max(Ve,0),mt=Math.min(mt,nt.count));const At=mt-Ve;if(At<0||At===1/0)return;fe.setup(W,H,Me,X,Ne);let bt,gt=et;if(Ne!==null&&(bt=Z.get(Ne),gt=ct,gt.setIndex(bt)),W.isMesh)H.wireframe===!0?(ie.setLineWidth(H.wireframeLinewidth*Xe()),gt.setMode(D.LINES)):gt.setMode(D.TRIANGLES);else if(W.isLine){let Ot=H.linewidth;Ot===void 0&&(Ot=1),ie.setLineWidth(Ot*Xe()),W.isLineSegments?gt.setMode(D.LINES):W.isLineLoop?gt.setMode(D.LINE_LOOP):gt.setMode(D.LINE_STRIP)}else W.isPoints?gt.setMode(D.POINTS):W.isSprite&&gt.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(Le.get("WEBGL_multi_draw"))gt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ot=W._multiDrawStarts,Re=W._multiDrawCounts,$t=W._multiDrawCount,lt=Ne?Z.get(Ne).bytesPerElement:1,tn=E.get(H).currentProgram.getUniforms();for(let gn=0;gn<$t;gn++)tn.setValue(D,"_gl_DrawID",gn),gt.render(Ot[gn]/lt,Re[gn])}else if(W.isInstancedMesh)gt.renderInstances(Ve,At,W.count);else if(X.isInstancedBufferGeometry){const Ot=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Re=Math.min(X.instanceCount,Ot);gt.renderInstances(Ve,At,Re)}else gt.render(Ve,At)};function mn(M,B,X){M.transparent===!0&&M.side===2&&M.forceSinglePass===!1?(M.side=1,M.needsUpdate=!0,Fr(M,B,X),M.side=0,M.needsUpdate=!0,Fr(M,B,X),M.side=2):Fr(M,B,X)}this.compile=function(M,B,X=null){X===null&&(X=M),T=Ae.get(X),T.init(B),y.push(T),X.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),M!==X&&M.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(T.pushLight(W),W.castShadow&&T.pushShadow(W))}),T.setupLights();const H=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Te=W.material;if(Te)if(Array.isArray(Te))for(let Pe=0;Pe<Te.length;Pe++){const Me=Te[Pe];mn(Me,X,W),H.add(Me)}else mn(Te,X,W),H.add(Te)}),T=y.pop(),H},this.compileAsync=function(M,B,X=null){const H=this.compile(M,B,X);return new Promise(W=>{function Te(){if(H.forEach(function(Pe){E.get(Pe).currentProgram.isReady()&&H.delete(Pe)}),H.size===0){W(M);return}setTimeout(Te,10)}Le.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Hs=null;function dh(M){Hs&&Hs(M)}function Lo(){ii.stop()}function Do(){ii.start()}const ii=new Jc;ii.setAnimationLoop(dh),typeof self<"u"&&ii.setContext(self),this.setAnimationLoop=function(M){Hs=M,ge.setAnimationLoop(M),M===null?ii.stop():ii.start()},ge.addEventListener("sessionstart",Lo),ge.addEventListener("sessionend",Do),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;k!==null&&k.renderStart(M,B);const X=ge.enabled===!0&&ge.isPresenting===!0,H=A!==null&&(C===null||X)&&A.begin(L,C);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(B),B=ge.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,B,C),T=Ae.get(M,y.length),T.init(B),T.state.textureUnits=x.getTextureUnits(),y.push(T),$.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ue.setFromProjectionMatrix($,2e3,B.reversedDepth),We=this.localClippingEnabled,Ze=we.init(this.clippingPlanes,We),R=K.get(M,w.length),R.init(),w.push(R),ge.enabled===!0&&ge.isPresenting===!0){const Pe=L.xr.getDepthSensingMesh();Pe!==null&&Ws(Pe,B,-1/0,L.sortObjects)}Ws(M,B,0,L.sortObjects),R.finish(),L.sortObjects===!0&&R.sort(Y,oe),de=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,de&&he.addToRenderList(R,M),this.info.render.frame++,Ze===!0&&we.beginShadows();const W=T.state.shadowsArray;if(me.render(W,M,B),Ze===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&A.hasRenderPass())===!1){const Pe=R.opaque,Me=R.transmissive;if(T.setupLights(),B.isArrayCamera){const Ne=B.cameras;if(Me.length>0)for(let Ge=0,Qe=Ne.length;Ge<Qe;Ge++){const nt=Ne[Ge];Uo(Pe,Me,M,nt)}de&&he.render(M);for(let Ge=0,Qe=Ne.length;Ge<Qe;Ge++){const nt=Ne[Ge];Io(R,M,nt,nt.viewport)}}else Me.length>0&&Uo(Pe,Me,M,B),de&&he.render(M),Io(R,M,B)}C!==null&&I===0&&(x.updateMultisampleRenderTarget(C),x.updateRenderTargetMipmap(C)),H&&A.end(L),M.isScene===!0&&M.onAfterRender(L,M,B),fe.resetDefaultState(),G=-1,z=null,y.pop(),y.length>0?(T=y[y.length-1],x.setTextureUnits(T.state.textureUnits),Ze===!0&&we.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,w.pop(),w.length>0?R=w[w.length-1]:R=null,k!==null&&k.renderEnd()};function Ws(M,B,X,H){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Ue.intersectsSprite(M)){H&&ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4($);const Pe=ce.update(M),Me=M.material;Me.visible&&R.push(M,Pe,Me,X,ee.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Ue.intersectsObject(M))){const Pe=ce.update(M),Me=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ee.copy(M.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),ee.copy(Pe.boundingSphere.center)),ee.applyMatrix4(M.matrixWorld).applyMatrix4($)),Array.isArray(Me)){const Ne=Pe.groups;for(let Ge=0,Qe=Ne.length;Ge<Qe;Ge++){const nt=Ne[Ge],Ve=Me[nt.materialIndex];Ve&&Ve.visible&&R.push(M,Pe,Ve,X,ee.z,nt)}}else Me.visible&&R.push(M,Pe,Me,X,ee.z,null)}}const Te=M.children;for(let Pe=0,Me=Te.length;Pe<Me;Pe++)Ws(Te[Pe],B,X,H)}function Io(M,B,X,H){const{opaque:W,transmissive:Te,transparent:Pe}=M;T.setupLightsView(X),Ze===!0&&we.setGlobalState(L.clippingPlanes,X),H&&ie.viewport(Q.copy(H)),W.length>0&&Ur(W,B,X),Te.length>0&&Ur(Te,B,X),Pe.length>0&&Ur(Pe,B,X),ie.buffers.depth.setTest(!0),ie.buffers.depth.setMask(!0),ie.buffers.color.setMask(!0),ie.setPolygonOffset(!1)}function Uo(M,B,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Ve=Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new En(1,1,{generateMipmaps:!0,type:Ve?1016:1009,minFilter:1008,samples:Math.max(4,He.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}const Te=T.state.transmissionRenderTarget[H.id],Pe=H.viewport||Q;Te.setSize(Pe.z*L.transmissionResolutionScale,Pe.w*L.transmissionResolutionScale);const Me=L.getRenderTarget(),Ne=L.getActiveCubeFace(),Ge=L.getActiveMipmapLevel();L.setRenderTarget(Te),L.getClearColor(ue),Se=L.getClearAlpha(),Se<1&&L.setClearColor(16777215,.5),L.clear(),de&&he.render(X);const Qe=L.toneMapping;L.toneMapping=0;const nt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),Ze===!0&&we.setGlobalState(L.clippingPlanes,H),Ur(M,X,H),x.updateMultisampleRenderTarget(Te),x.updateRenderTargetMipmap(Te),Le.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let mt=0,At=B.length;mt<At;mt++){const bt=B[mt],{object:gt,geometry:Ot,material:Re,group:$t}=bt;if(Re.side===2&&gt.layers.test(H.layers)){const lt=Re.side;Re.side=1,Re.needsUpdate=!0,Fo(gt,X,H,Ot,Re,$t),Re.side=lt,Re.needsUpdate=!0,Ve=!0}}Ve===!0&&(x.updateMultisampleRenderTarget(Te),x.updateRenderTargetMipmap(Te))}L.setRenderTarget(Me,Ne,Ge),L.setClearColor(ue,Se),nt!==void 0&&(H.viewport=nt),L.toneMapping=Qe}function Ur(M,B,X){const H=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Te=M.length;W<Te;W++){const Pe=M[W],{object:Me,geometry:Ne,group:Ge}=Pe;let Qe=Pe.material;Qe.allowOverride===!0&&H!==null&&(Qe=H),Me.layers.test(X.layers)&&Fo(Me,B,X,Ne,Qe,Ge)}}function Fo(M,B,X,H,W,Te){M.onBeforeRender(L,B,X,H,W,Te),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(L,B,X,H,M,Te),W.transparent===!0&&W.side===2&&W.forceSinglePass===!1?(W.side=1,W.needsUpdate=!0,L.renderBufferDirect(X,B,H,W,M,Te),W.side=0,W.needsUpdate=!0,L.renderBufferDirect(X,B,H,W,M,Te),W.side=2):L.renderBufferDirect(X,B,H,W,M,Te),M.onAfterRender(L,B,X,H,W,Te)}function Fr(M,B,X){B.isScene!==!0&&(B=xe);const H=E.get(M),W=T.state.lights,Te=T.state.shadowsArray,Pe=W.state.version,Me=pe.getParameters(M,W.state,Te,B,X,T.state.lightProbeGridArray),Ne=pe.getProgramCacheKey(Me);let Ge=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,H.fog=B.fog;const Qe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=V.get(M.envMap||H.environment,Qe),H.envMapRotation=H.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Ge===void 0&&(M.addEventListener("dispose",Et),Ge=new Map,H.programs=Ge);let nt=Ge.get(Ne);if(nt!==void 0){if(H.currentProgram===nt&&H.lightsStateVersion===Pe)return No(M,Me),nt}else Me.uniforms=pe.getUniforms(M),k!==null&&M.isNodeMaterial&&k.build(M,X,Me),M.onBeforeCompile(Me,L),nt=pe.acquireProgram(Me,Ne),Ge.set(Ne,nt),H.uniforms=Me.uniforms;const Ve=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ve.clippingPlanes=we.uniform),No(M,Me),H.needsLights=vh(M),H.lightsStateVersion=Pe,H.needsLights&&(Ve.ambientLightColor.value=W.state.ambient,Ve.lightProbe.value=W.state.probe,Ve.directionalLights.value=W.state.directional,Ve.directionalLightShadows.value=W.state.directionalShadow,Ve.spotLights.value=W.state.spot,Ve.spotLightShadows.value=W.state.spotShadow,Ve.rectAreaLights.value=W.state.rectArea,Ve.ltc_1.value=W.state.rectAreaLTC1,Ve.ltc_2.value=W.state.rectAreaLTC2,Ve.pointLights.value=W.state.point,Ve.pointLightShadows.value=W.state.pointShadow,Ve.hemisphereLights.value=W.state.hemi,Ve.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ve.spotLightMatrix.value=W.state.spotLightMatrix,Ve.spotLightMap.value=W.state.spotLightMap,Ve.pointShadowMatrix.value=W.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=nt,H.uniformsList=null,nt}function Oo(M){if(M.uniformsList===null){const B=M.currentProgram.getUniforms();M.uniformsList=hs.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function No(M,B){const X=E.get(M);X.outputColorSpace=B.outputColorSpace,X.batching=B.batching,X.batchingColor=B.batchingColor,X.instancing=B.instancing,X.instancingColor=B.instancingColor,X.instancingMorph=B.instancingMorph,X.skinning=B.skinning,X.morphTargets=B.morphTargets,X.morphNormals=B.morphNormals,X.morphColors=B.morphColors,X.morphTargetsCount=B.morphTargetsCount,X.numClippingPlanes=B.numClippingPlanes,X.numIntersection=B.numClipIntersection,X.vertexAlphas=B.vertexAlphas,X.vertexTangents=B.vertexTangents,X.toneMapping=B.toneMapping}function ph(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(B.matrixWorld);for(let X=0,H=M.length;X<H;X++){const W=M[X];if(W.texture!==null&&W.boundingBox.containsPoint(b))return W}return null}function mh(M,B,X,H,W){B.isScene!==!0&&(B=xe),x.resetTextureUnits();const Te=B.fog,Pe=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?B.environment:null,Me=C===null?L.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:st.workingColorSpace,Ne=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ge=V.get(H.envMap||Pe,Ne),Qe=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,nt=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ve=!!X.morphAttributes.position,mt=!!X.morphAttributes.normal,At=!!X.morphAttributes.color;let bt=0;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(bt=L.toneMapping);const gt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Ot=gt!==void 0?gt.length:0,Re=E.get(H),$t=T.state.lights;if(Ze===!0&&(We===!0||M!==z)){const xt=M===z&&H.id===G;we.setState(H,M,xt)}let lt=!1;H.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==$t.state.version||Re.outputColorSpace!==Me||W.isBatchedMesh&&Re.batching===!1||!W.isBatchedMesh&&Re.batching===!0||W.isBatchedMesh&&Re.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Re.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Re.instancing===!1||!W.isInstancedMesh&&Re.instancing===!0||W.isSkinnedMesh&&Re.skinning===!1||!W.isSkinnedMesh&&Re.skinning===!0||W.isInstancedMesh&&Re.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Re.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Re.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Re.instancingMorph===!1&&W.morphTexture!==null||Re.envMap!==Ge||H.fog===!0&&Re.fog!==Te||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==we.numPlanes||Re.numIntersection!==we.numIntersection)||Re.vertexAlphas!==Qe||Re.vertexTangents!==nt||Re.morphTargets!==Ve||Re.morphNormals!==mt||Re.morphColors!==At||Re.toneMapping!==bt||Re.morphTargetsCount!==Ot||!!Re.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Re.__version=H.version);let tn=Re.currentProgram;lt===!0&&(tn=Fr(H,B,W),k&&H.isNodeMaterial&&k.onUpdateProgram(H,tn,Re));let gn=!1,kn=!1,bi=!1;const vt=tn.getUniforms(),Ct=Re.uniforms;if(ie.useProgram(tn.program)&&(gn=!0,kn=!0,bi=!0),H.id!==G&&(G=H.id,kn=!0),Re.needsLights){const xt=ph(T.state.lightProbeGridArray,W);Re.lightProbeGrid!==xt&&(Re.lightProbeGrid=xt,kn=!0)}if(gn||z!==M){ie.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),vt.setValue(D,"projectionMatrix",M.projectionMatrix),vt.setValue(D,"viewMatrix",M.matrixWorldInverse);const Vn=vt.map.cameraPosition;Vn!==void 0&&Vn.setValue(D,se.setFromMatrixPosition(M.matrixWorld)),He.logarithmicDepthBuffer&&vt.setValue(D,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&vt.setValue(D,"isOrthographic",M.isOrthographicCamera===!0),z!==M&&(z=M,kn=!0,bi=!0)}if(Re.needsLights&&($t.state.directionalShadowMap.length>0&&vt.setValue(D,"directionalShadowMap",$t.state.directionalShadowMap,x),$t.state.spotShadowMap.length>0&&vt.setValue(D,"spotShadowMap",$t.state.spotShadowMap,x),$t.state.pointShadowMap.length>0&&vt.setValue(D,"pointShadowMap",$t.state.pointShadowMap,x)),W.isSkinnedMesh){vt.setOptional(D,W,"bindMatrix"),vt.setOptional(D,W,"bindMatrixInverse");const xt=W.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),vt.setValue(D,"boneTexture",xt.boneTexture,x))}W.isBatchedMesh&&(vt.setOptional(D,W,"batchingTexture"),vt.setValue(D,"batchingTexture",W._matricesTexture,x),vt.setOptional(D,W,"batchingIdTexture"),vt.setValue(D,"batchingIdTexture",W._indirectTexture,x),vt.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&vt.setValue(D,"batchingColorTexture",W._colorsTexture,x));const Gn=X.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&$e.update(W,X,tn),(kn||Re.receiveShadow!==W.receiveShadow)&&(Re.receiveShadow=W.receiveShadow,vt.setValue(D,"receiveShadow",W.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&B.environment!==null&&(Ct.envMapIntensity.value=B.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=av()),kn){if(vt.setValue(D,"toneMappingExposure",L.toneMappingExposure),Re.needsLights&&gh(Ct,bi),Te&&H.fog===!0&&q.refreshFogUniforms(Ct,Te),q.refreshMaterialUniforms(Ct,H,Oe,Ye,T.state.transmissionRenderTarget[M.id]),Re.needsLights&&Re.lightProbeGrid){const xt=Re.lightProbeGrid;Ct.probesSH.value=xt.texture,Ct.probesMin.value.copy(xt.boundingBox.min),Ct.probesMax.value.copy(xt.boundingBox.max),Ct.probesResolution.value.copy(xt.resolution)}hs.upload(D,Oo(Re),Ct,x)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(hs.upload(D,Oo(Re),Ct,x),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&vt.setValue(D,"center",W.center),vt.setValue(D,"modelViewMatrix",W.modelViewMatrix),vt.setValue(D,"normalMatrix",W.normalMatrix),vt.setValue(D,"modelMatrix",W.matrixWorld),H.uniformsGroups!==void 0){const xt=H.uniformsGroups;for(let Vn=0,Mi=xt.length;Vn<Mi;Vn++){const Bo=xt[Vn];j.update(Bo,tn),j.bind(Bo,tn)}}return tn}function gh(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function vh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(M,B,X){const H=E.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),E.get(M.texture).__webglTexture=B,E.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){const X=E.get(M);X.__webglFramebuffer=B,X.__useDefaultFramebuffer=B===void 0};const xh=D.createFramebuffer();this.setRenderTarget=function(M,B=0,X=0){C=M,F=B,I=X;let H=null,W=!1,Te=!1;if(M){const Me=E.get(M);if(Me.__useDefaultFramebuffer!==void 0){ie.bindFramebuffer(D.FRAMEBUFFER,Me.__webglFramebuffer),Q.copy(M.viewport),te.copy(M.scissor),le=M.scissorTest,ie.viewport(Q),ie.scissor(te),ie.setScissorTest(le),G=-1;return}else if(Me.__webglFramebuffer===void 0)x.setupRenderTarget(M);else if(Me.__hasExternalTextures)x.rebindTextures(M,E.get(M.texture).__webglTexture,E.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Qe=M.depthTexture;if(Me.__boundDepthTexture!==Qe){if(Qe!==null&&E.has(Qe)&&(M.width!==Qe.image.width||M.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(M)}}const Ne=M.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Te=!0);const Ge=E.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ge[B])?H=Ge[B][X]:H=Ge[B],W=!0):M.samples>0&&x.useMultisampledRTT(M)===!1?H=E.get(M).__webglMultisampledFramebuffer:Array.isArray(Ge)?H=Ge[X]:H=Ge,Q.copy(M.viewport),te.copy(M.scissor),le=M.scissorTest}else Q.copy(J).multiplyScalar(Oe).floor(),te.copy(be).multiplyScalar(Oe).floor(),le=Fe;if(X!==0&&(H=xh),ie.bindFramebuffer(D.FRAMEBUFFER,H)&&ie.drawBuffers(M,H),ie.viewport(Q),ie.scissor(te),ie.setScissorTest(le),W){const Me=E.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+B,Me.__webglTexture,X)}else if(Te){const Me=B;for(let Ne=0;Ne<M.textures.length;Ne++){const Ge=E.get(M.textures[Ne]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ne,Ge.__webglTexture,X,Me)}}else if(M!==null&&X!==0){const Me=E.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Me.__webglTexture,X)}G=-1},this.readRenderTargetPixels=function(M,B,X,H,W,Te,Pe,Me=0){if(!(M&&M.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=E.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ne=Ne[Pe]),Ne){ie.bindFramebuffer(D.FRAMEBUFFER,Ne);try{const Ge=M.textures[Me],Qe=Ge.format,nt=Ge.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(Qe)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(nt)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-H&&X>=0&&X<=M.height-W&&D.readPixels(B,X,H,W,U.convert(Qe),U.convert(nt),Te)}finally{const Ge=C!==null?E.get(C).__webglFramebuffer:null;ie.bindFramebuffer(D.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(M,B,X,H,W,Te,Pe,Me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=E.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ne=Ne[Pe]),Ne)if(B>=0&&B<=M.width-H&&X>=0&&X<=M.height-W){ie.bindFramebuffer(D.FRAMEBUFFER,Ne);const Ge=M.textures[Me],Qe=Ge.format,nt=Ge.type;if(M.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.bufferData(D.PIXEL_PACK_BUFFER,Te.byteLength,D.STREAM_READ),D.readPixels(B,X,H,W,U.convert(Qe),U.convert(nt),0);const mt=C!==null?E.get(C).__webglFramebuffer:null;ie.bindFramebuffer(D.FRAMEBUFFER,mt);const At=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Mh(D,At,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Te),D.deleteBuffer(Ve),D.deleteSync(At),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,X=0){const H=Math.pow(2,-X),W=Math.floor(M.image.width*H),Te=Math.floor(M.image.height*H),Pe=B!==null?B.x:0,Me=B!==null?B.y:0;x.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Pe,Me,W,Te),ie.unbindTexture()};const _h=D.createFramebuffer(),yh=D.createFramebuffer();this.copyTextureToTexture=function(M,B,X=null,H=null,W=0,Te=0){let Pe,Me,Ne,Ge,Qe,nt,Ve,mt,At;const bt=M.isCompressedTexture?M.mipmaps[Te]:M.image;if(X!==null)Pe=X.max.x-X.min.x,Me=X.max.y-X.min.y,Ne=X.isBox3?X.max.z-X.min.z:1,Ge=X.min.x,Qe=X.min.y,nt=X.isBox3?X.min.z:0;else{const Ct=Math.pow(2,-W);Pe=Math.floor(bt.width*Ct),Me=Math.floor(bt.height*Ct),M.isDataArrayTexture?Ne=bt.depth:M.isData3DTexture?Ne=Math.floor(bt.depth*Ct):Ne=1,Ge=0,Qe=0,nt=0}H!==null?(Ve=H.x,mt=H.y,At=H.z):(Ve=0,mt=0,At=0);const gt=U.convert(B.format),Ot=U.convert(B.type);let Re;B.isData3DTexture?(x.setTexture3D(B,0),Re=D.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(x.setTexture2DArray(B,0),Re=D.TEXTURE_2D_ARRAY):(x.setTexture2D(B,0),Re=D.TEXTURE_2D),ie.activeTexture(D.TEXTURE0),ie.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),ie.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),ie.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const $t=ie.getParameter(D.UNPACK_ROW_LENGTH),lt=ie.getParameter(D.UNPACK_IMAGE_HEIGHT),tn=ie.getParameter(D.UNPACK_SKIP_PIXELS),gn=ie.getParameter(D.UNPACK_SKIP_ROWS),kn=ie.getParameter(D.UNPACK_SKIP_IMAGES);ie.pixelStorei(D.UNPACK_ROW_LENGTH,bt.width),ie.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt.height),ie.pixelStorei(D.UNPACK_SKIP_PIXELS,Ge),ie.pixelStorei(D.UNPACK_SKIP_ROWS,Qe),ie.pixelStorei(D.UNPACK_SKIP_IMAGES,nt);const bi=M.isDataArrayTexture||M.isData3DTexture,vt=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){const Ct=E.get(M),Gn=E.get(B),xt=E.get(Ct.__renderTarget),Vn=E.get(Gn.__renderTarget);ie.bindFramebuffer(D.READ_FRAMEBUFFER,xt.__webglFramebuffer),ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Mi=0;Mi<Ne;Mi++)bi&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,E.get(M).__webglTexture,W,nt+Mi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,E.get(B).__webglTexture,Te,At+Mi)),D.blitFramebuffer(Ge,Qe,Pe,Me,Ve,mt,Pe,Me,D.DEPTH_BUFFER_BIT,D.NEAREST);ie.bindFramebuffer(D.READ_FRAMEBUFFER,null),ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||E.has(M)){const Ct=E.get(M),Gn=E.get(B);ie.bindFramebuffer(D.READ_FRAMEBUFFER,_h),ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,yh);for(let xt=0;xt<Ne;xt++)bi?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ct.__webglTexture,W,nt+xt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ct.__webglTexture,W),vt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Gn.__webglTexture,Te,At+xt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Gn.__webglTexture,Te),W!==0?D.blitFramebuffer(Ge,Qe,Pe,Me,Ve,mt,Pe,Me,D.COLOR_BUFFER_BIT,D.NEAREST):vt?D.copyTexSubImage3D(Re,Te,Ve,mt,At+xt,Ge,Qe,Pe,Me):D.copyTexSubImage2D(Re,Te,Ve,mt,Ge,Qe,Pe,Me);ie.bindFramebuffer(D.READ_FRAMEBUFFER,null),ie.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else vt?M.isDataTexture||M.isData3DTexture?D.texSubImage3D(Re,Te,Ve,mt,At,Pe,Me,Ne,gt,Ot,bt.data):B.isCompressedArrayTexture?D.compressedTexSubImage3D(Re,Te,Ve,mt,At,Pe,Me,Ne,gt,bt.data):D.texSubImage3D(Re,Te,Ve,mt,At,Pe,Me,Ne,gt,Ot,bt):M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Te,Ve,mt,Pe,Me,gt,Ot,bt.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Te,Ve,mt,bt.width,bt.height,gt,bt.data):D.texSubImage2D(D.TEXTURE_2D,Te,Ve,mt,Pe,Me,gt,Ot,bt);ie.pixelStorei(D.UNPACK_ROW_LENGTH,$t),ie.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt),ie.pixelStorei(D.UNPACK_SKIP_PIXELS,tn),ie.pixelStorei(D.UNPACK_SKIP_ROWS,gn),ie.pixelStorei(D.UNPACK_SKIP_IMAGES,kn),Te===0&&B.generateMipmaps&&D.generateMipmap(Re),ie.unbindTexture()},this.initRenderTarget=function(M){E.get(M).__webglFramebuffer===void 0&&x.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?x.setTextureCube(M,0):M.isData3DTexture?x.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?x.setTexture2DArray(M,0):x.setTexture2D(M,0),ie.unbindTexture()},this.resetState=function(){F=0,I=0,C=null,ie.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}var fo=0,au=-3;function Sr(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function lv(n,e){this.source=n,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=e,this.destLen=0,this.ltree=new Sr,this.dtree=new Sr}var ou=new Sr,lu=new Sr,po=new Uint8Array(30),mo=new Uint16Array(30),cu=new Uint8Array(30),uu=new Uint16Array(30),cv=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),kl=new Sr,_n=new Uint8Array(320);function hu(n,e,t,i){var r,s;for(r=0;r<t;++r)n[r]=0;for(r=0;r<30-t;++r)n[r+t]=r/t|0;for(s=i,r=0;r<30;++r)e[r]=s,s+=1<<n[r]}function uv(n,e){var t;for(t=0;t<7;++t)n.table[t]=0;for(n.table[7]=24,n.table[8]=152,n.table[9]=112,t=0;t<24;++t)n.trans[t]=256+t;for(t=0;t<144;++t)n.trans[24+t]=t;for(t=0;t<8;++t)n.trans[168+t]=280+t;for(t=0;t<112;++t)n.trans[176+t]=144+t;for(t=0;t<5;++t)e.table[t]=0;for(e.table[5]=32,t=0;t<32;++t)e.trans[t]=t}var Gl=new Uint16Array(16);function Ta(n,e,t,i){var r,s;for(r=0;r<16;++r)n.table[r]=0;for(r=0;r<i;++r)n.table[e[t+r]]++;for(n.table[0]=0,s=0,r=0;r<16;++r)Gl[r]=s,s+=n.table[r];for(r=0;r<i;++r)e[t+r]&&(n.trans[Gl[e[t+r]]++]=r)}function hv(n){n.bitcount--||(n.tag=n.source[n.sourceIndex++],n.bitcount=7);var e=n.tag&1;return n.tag>>>=1,e}function Sn(n,e,t){if(!e)return t;for(;n.bitcount<24;)n.tag|=n.source[n.sourceIndex++]<<n.bitcount,n.bitcount+=8;var i=n.tag&65535>>>16-e;return n.tag>>>=e,n.bitcount-=e,i+t}function Wa(n,e){for(;n.bitcount<24;)n.tag|=n.source[n.sourceIndex++]<<n.bitcount,n.bitcount+=8;var t=0,i=0,r=0,s=n.tag;do i=2*i+(s&1),s>>>=1,++r,t+=e.table[r],i-=e.table[r];while(i>=0);return n.tag=s,n.bitcount-=r,e.trans[t+i]}function fv(n,e,t){var i,r,s,a,o,l;for(i=Sn(n,5,257),r=Sn(n,5,1),s=Sn(n,4,4),a=0;a<19;++a)_n[a]=0;for(a=0;a<s;++a){var c=Sn(n,3,0);_n[cv[a]]=c}for(Ta(kl,_n,0,19),o=0;o<i+r;){var u=Wa(n,kl);switch(u){case 16:var f=_n[o-1];for(l=Sn(n,2,3);l;--l)_n[o++]=f;break;case 17:for(l=Sn(n,3,3);l;--l)_n[o++]=0;break;case 18:for(l=Sn(n,7,11);l;--l)_n[o++]=0;break;default:_n[o++]=u;break}}Ta(e,_n,0,i),Ta(t,_n,i,r)}function Vl(n,e,t){for(;;){var i=Wa(n,e);if(i===256)return fo;if(i<256)n.dest[n.destLen++]=i;else{var r,s,a,o;for(i-=257,r=Sn(n,po[i],mo[i]),s=Wa(n,t),a=n.destLen-Sn(n,cu[s],uu[s]),o=a;o<a+r;++o)n.dest[n.destLen++]=n.dest[o]}}}function dv(n){for(var e,t,i;n.bitcount>8;)n.sourceIndex--,n.bitcount-=8;if(e=n.source[n.sourceIndex+1],e=256*e+n.source[n.sourceIndex],t=n.source[n.sourceIndex+3],t=256*t+n.source[n.sourceIndex+2],e!==(~t&65535))return au;for(n.sourceIndex+=4,i=e;i;--i)n.dest[n.destLen++]=n.source[n.sourceIndex++];return n.bitcount=0,fo}function fu(n,e){var t=new lv(n,e),i,r,s;do{switch(i=hv(t),r=Sn(t,2,0),r){case 0:s=dv(t);break;case 1:s=Vl(t,ou,lu);break;case 2:fv(t,t.ltree,t.dtree),s=Vl(t,t.ltree,t.dtree);break;default:s=au}if(s!==fo)throw new Error("Data error")}while(!i);return t.destLen<t.dest.length?typeof t.dest.slice=="function"?t.dest.slice(0,t.destLen):t.dest.subarray(0,t.destLen):t.dest}uv(ou,lu);hu(po,mo,4,3);hu(cu,uu,2,1);po[28]=0;mo[28]=258;function Bi(n,e,t,i,r){return Math.pow(1-r,3)*n+3*Math.pow(1-r,2)*r*e+3*(1-r)*Math.pow(r,2)*t+Math.pow(r,3)*i}function _i(){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN}_i.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2)};_i.prototype.addPoint=function(n,e){typeof n=="number"&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=n,this.x2=n),n<this.x1&&(this.x1=n),n>this.x2&&(this.x2=n)),typeof e=="number"&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))};_i.prototype.addX=function(n){this.addPoint(n,null)};_i.prototype.addY=function(n){this.addPoint(null,n)};_i.prototype.addBezier=function(n,e,t,i,r,s,a,o){const l=[n,e],c=[t,i],u=[r,s],f=[a,o];this.addPoint(n,e),this.addPoint(a,o);for(let h=0;h<=1;h++){const d=6*l[h]-12*c[h]+6*u[h],p=-3*l[h]+9*c[h]-9*u[h]+3*f[h],v=3*c[h]-3*l[h];if(p===0){if(d===0)continue;const S=-v/d;0<S&&S<1&&(h===0&&this.addX(Bi(l[h],c[h],u[h],f[h],S)),h===1&&this.addY(Bi(l[h],c[h],u[h],f[h],S)));continue}const m=Math.pow(d,2)-4*v*p;if(m<0)continue;const g=(-d+Math.sqrt(m))/(2*p);0<g&&g<1&&(h===0&&this.addX(Bi(l[h],c[h],u[h],f[h],g)),h===1&&this.addY(Bi(l[h],c[h],u[h],f[h],g)));const _=(-d-Math.sqrt(m))/(2*p);0<_&&_<1&&(h===0&&this.addX(Bi(l[h],c[h],u[h],f[h],_)),h===1&&this.addY(Bi(l[h],c[h],u[h],f[h],_)))}};_i.prototype.addQuad=function(n,e,t,i,r,s){const a=n+.6666666666666666*(t-n),o=e+2/3*(i-e),l=a+1/3*(r-n),c=o+1/3*(s-e);this.addBezier(n,e,a,o,l,c,r,s)};var du=_i;function It(){this.commands=[],this.fill="black",this.stroke=null,this.strokeWidth=1}var or={};function pu(n,e){const t=Math.floor(n),i=n-t;if(or[e]||(or[e]={}),or[e][i]!==void 0){const s=or[e][i];return t+s}const r=+(Math.round(i+"e+"+e)+"e-"+e);return or[e][i]=r,t+r}function mu(n){let e=[[]],t=0,i=0;for(let r=0;r<n.length;r+=1){const s=e[e.length-1],a=n[r],o=s[0],l=s[1],c=s[s.length-1],u=n[r+1];s.push(a),a.type==="M"?(t=a.x,i=a.y):a.type==="L"&&(!u||u.type==="Z")?Math.abs(a.x-t)>1||Math.abs(a.y-i)>1||s.pop():a.type==="L"&&c&&c.x===a.x&&c.y===a.y?s.pop():a.type==="Z"&&(o&&l&&c&&o.type==="M"&&l.type==="L"&&c.type==="L"&&c.x===o.x&&c.y===o.y&&(s.shift(),s[0].type="M"),r+1<n.length&&e.push([]))}return n=[].concat.apply([],e),n}function pv(n){return Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0,scale:1,x:0,y:0},n)}function mv(n){return parseInt(n)===n&&(n={decimalPlaces:n,flipY:!1}),Object.assign({},{decimalPlaces:2,optimize:!0,flipY:!0,flipYBase:void 0},n)}It.prototype.fromSVG=function(n,e={}){typeof SVGPathElement<"u"&&n instanceof SVGPathElement&&(n=n.getAttribute("d")),e=pv(e),this.commands=[];const t="0123456789",i="MmLlQqCcZzHhVv",r="SsTtAa",s="-+";let a={},o=[""],l=!1;function c(p){return p.filter(v=>v.length).map(v=>{let m=parseFloat(v);return(e.decimalPlaces||e.decimalPlaces===0)&&(m=pu(m,e.decimalPlaces)),m})}function u(p){if(!this.commands.length)return p;const v=this.commands[this.commands.length-1];for(let m=0;m<p.length;m++)p[m]+=v[m&1?"y":"x"];return p}function f(){if(a.type===void 0)return;const p=a.type.toUpperCase(),v=p!=="Z"&&a.type.toUpperCase()!==a.type;let m=c(o);if(o=[""],!m.length&&p!=="Z")return;v&&p!=="H"&&p!=="V"&&(m=u.apply(this,[m]));const g=this.commands.length&&this.commands[this.commands.length-1].x||0,_=this.commands.length&&this.commands[this.commands.length-1].y||0;switch(p){case"M":this.moveTo(...m);break;case"L":this.lineTo(...m);break;case"V":for(let S=0;S<m.length;S++){let b=0;v&&(b=this.commands.length&&this.commands[this.commands.length-1].y||0),this.lineTo(g,m[S]+b)}break;case"H":for(let S=0;S<m.length;S++){let b=0;v&&(b=this.commands.length&&this.commands[this.commands.length-1].x||0),this.lineTo(m[S]+b,_)}break;case"C":this.bezierCurveTo(...m);break;case"Q":this.quadraticCurveTo(...m);break;case"Z":(this.commands.length<1||this.commands[this.commands.length-1].type!=="Z")&&this.close();break}if(this.commands.length)for(const S in this.commands[this.commands.length-1])this.commands[this.commands.length-1][S]===void 0&&(this.commands[this.commands.length-1][S]=0)}for(let p=0;p<n.length;p++){const v=n.charAt(p),m=o[o.length-1];if(t.indexOf(v)>-1)o[o.length-1]+=v;else if(s.indexOf(v)>-1)if(!a.type&&!this.commands.length&&(a.type="L"),v==="-")!a.type||m.indexOf("-")>0?l=!0:m.length?o.push("-"):o[o.length-1]=v;else if(!a.type||m.length>0)l=!0;else continue;else if(i.indexOf(v)>-1)a.type?(f.apply(this),a={type:v}):a.type=v;else{if(r.indexOf(v)>-1)throw new Error("Unsupported path command: "+v+". Currently supported commands are "+i.split("").join(", ")+".");` ,	
\r\f\v`.indexOf(v)>-1?o.push(""):v==="."?!a.type||m.indexOf(v)>-1?l=!0:o[o.length-1]+=v:l=!0}if(l)throw new Error("Unexpected character: "+v+" at offset "+p)}f.apply(this),e.optimize&&(this.commands=mu(this.commands));const h=e.flipY;let d=e.flipYBase;if(h===!0&&e.flipYBase===void 0){const p=this.getBoundingBox();d=p.y1+p.y2}for(const p in this.commands){const v=this.commands[p];for(const m in v)["x","x1","x2"].includes(m)?this.commands[p][m]=e.x+v[m]*e.scale:["y","y1","y2"].includes(m)&&(this.commands[p][m]=e.y+(h?d-v[m]:v[m])*e.scale)}return this};It.fromSVG=function(n,e){return new It().fromSVG(n,e)};It.prototype.moveTo=function(n,e){this.commands.push({type:"M",x:n,y:e})};It.prototype.lineTo=function(n,e){this.commands.push({type:"L",x:n,y:e})};It.prototype.curveTo=It.prototype.bezierCurveTo=function(n,e,t,i,r,s){this.commands.push({type:"C",x1:n,y1:e,x2:t,y2:i,x:r,y:s})};It.prototype.quadTo=It.prototype.quadraticCurveTo=function(n,e,t,i){this.commands.push({type:"Q",x1:n,y1:e,x:t,y:i})};It.prototype.close=It.prototype.closePath=function(){this.commands.push({type:"Z"})};It.prototype.extend=function(n){if(n.commands)n=n.commands;else if(n instanceof du){const e=n;this.moveTo(e.x1,e.y1),this.lineTo(e.x2,e.y1),this.lineTo(e.x2,e.y2),this.lineTo(e.x1,e.y2),this.close();return}Array.prototype.push.apply(this.commands,n)};It.prototype.getBoundingBox=function(){const n=new du;let e=0,t=0,i=0,r=0;for(let s=0;s<this.commands.length;s++){const a=this.commands[s];switch(a.type){case"M":n.addPoint(a.x,a.y),e=i=a.x,t=r=a.y;break;case"L":n.addPoint(a.x,a.y),i=a.x,r=a.y;break;case"Q":n.addQuad(i,r,a.x1,a.y1,a.x,a.y),i=a.x,r=a.y;break;case"C":n.addBezier(i,r,a.x1,a.y1,a.x2,a.y2,a.x,a.y),i=a.x,r=a.y;break;case"Z":i=e,r=t;break;default:throw new Error("Unexpected path command "+a.type)}}return n.isEmpty()&&n.addPoint(0,0),n};It.prototype.draw=function(n){const e=this._layers;if(e&&e.length){for(let i=0;i<e.length;i++)this.draw.call(e[i],n);return}const t=this._image;if(t){n.drawImage(t.image,t.x,t.y,t.width,t.height);return}n.beginPath();for(let i=0;i<this.commands.length;i+=1){const r=this.commands[i];r.type==="M"?n.moveTo(r.x,r.y):r.type==="L"?n.lineTo(r.x,r.y):r.type==="C"?n.bezierCurveTo(r.x1,r.y1,r.x2,r.y2,r.x,r.y):r.type==="Q"?n.quadraticCurveTo(r.x1,r.y1,r.x,r.y):r.type==="Z"&&this.stroke&&this.strokeWidth&&n.closePath()}this.fill&&(n.fillStyle=this.fill,n.fill()),this.stroke&&(n.strokeStyle=this.stroke,n.lineWidth=this.strokeWidth,n.stroke())};It.prototype.toPathData=function(n){n=mv(n);function e(o){const l=pu(o,n.decimalPlaces);return Math.round(o)===l?""+l:l.toFixed(n.decimalPlaces)}function t(){let o="";for(let l=0;l<arguments.length;l+=1){const c=arguments[l];c>=0&&l>0&&(o+=" "),o+=e(c)}return o}let i=this.commands;n.optimize&&(i=JSON.parse(JSON.stringify(this.commands)),i=mu(i));const r=n.flipY;let s=n.flipYBase;if(r===!0&&s===void 0){const o=new It;o.extend(i);const l=o.getBoundingBox();s=l.y1+l.y2}let a="";for(let o=0;o<i.length;o+=1){const l=i[o];l.type==="M"?a+="M"+t(l.x,r?s-l.y:l.y):l.type==="L"?a+="L"+t(l.x,r?s-l.y:l.y):l.type==="C"?a+="C"+t(l.x1,r?s-l.y1:l.y1,l.x2,r?s-l.y2:l.y2,l.x,r?s-l.y:l.y):l.type==="Q"?a+="Q"+t(l.x1,r?s-l.y1:l.y1,l.x,r?s-l.y:l.y):l.type==="Z"&&(a+="Z")}return a};It.prototype.toSVG=function(n,e){this._layers&&this._layers.length&&console.warn("toSVG() does not support colr font layers yet"),this._image&&console.warn("toSVG() does not support SVG glyphs yet"),e||(e=this.toPathData(n));let t='<path d="';return t+=e,t+='"',this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?t+=' fill="none"':t+=' fill="'+this.fill+'"'),this.stroke&&(t+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"'),t+="/>",t};It.prototype.toDOMElement=function(n,e){this._layers&&this._layers.length&&console.warn("toDOMElement() does not support colr font layers yet"),e||(e=this.toPathData(n));const t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttribute("d",e),this.fill!==void 0&&this.fill!=="black"&&(this.fill===null?t.setAttribute("fill","none"):t.setAttribute("fill",this.fill)),this.stroke&&(t.setAttribute("stroke",this.stroke),t.setAttribute("stroke-width",this.strokeWidth)),t};var Yi=It;function gu(n){throw new Error(n)}function zl(n,e){n||gu(e)}var Ie={fail:gu,argument:zl,assert:zl},Hl=32768,Wl=2147483648,gv=-32768,vv=32767+1/65536,ji={},ve={},ze={};function pn(n){return function(){return n}}ve.BYTE=function(n){return Ie.argument(n>=0&&n<=255,"Byte value should be between 0 and 255."),[n]};ze.BYTE=pn(1);ve.CHAR=function(n){return[n.charCodeAt(0)]};ze.CHAR=pn(1);ve.CHARARRAY=function(n){(n===null||typeof n>"u")&&(n="",console.warn("CHARARRAY with undefined or null value encountered and treated as an empty string. This is probably caused by a missing glyph name."));const e=[];for(let t=0;t<n.length;t+=1)e[t]=n.charCodeAt(t);return e};ze.CHARARRAY=function(n){return typeof n>"u"?0:n.length};ve.USHORT=function(n){return[n>>8&255,n&255]};ze.USHORT=pn(2);ve.SHORT=function(n){return n>=Hl&&(n=-(2*Hl-n)),[n>>8&255,n&255]};ze.SHORT=pn(2);ve.UINT24=function(n){return[n>>16&255,n>>8&255,n&255]};ze.UINT24=pn(3);ve.ULONG=function(n){return[n>>24&255,n>>16&255,n>>8&255,n&255]};ze.ULONG=pn(4);ve.LONG=function(n){return n>=Wl&&(n=-(2*Wl-n)),[n>>24&255,n>>16&255,n>>8&255,n&255]};ze.LONG=pn(4);ve.FLOAT=function(n){if(n>vv||n<gv)throw new Error(`Value ${n} is outside the range of representable values in 16.16 format`);const e=Math.round(n*65536)<<0;return ve.ULONG(e)};ze.FLOAT=ze.ULONG;ve.FIXED=ve.ULONG;ze.FIXED=ze.ULONG;ve.FWORD=ve.SHORT;ze.FWORD=ze.SHORT;ve.UFWORD=ve.USHORT;ze.UFWORD=ze.USHORT;ve.F2DOT14=function(n){return ve.USHORT(n*16384)};ze.F2DOT14=ze.USHORT;ve.LONGDATETIME=function(n){return[0,0,0,0,n>>24&255,n>>16&255,n>>8&255,n&255]};ze.LONGDATETIME=pn(8);ve.TAG=function(n){return Ie.argument(n.length===4,"Tag should be exactly 4 ASCII characters."),[n.charCodeAt(0),n.charCodeAt(1),n.charCodeAt(2),n.charCodeAt(3)]};ze.TAG=pn(4);ve.Card8=ve.BYTE;ze.Card8=ze.BYTE;ve.Card16=ve.USHORT;ze.Card16=ze.USHORT;ve.OffSize=ve.BYTE;ze.OffSize=ze.BYTE;ve.SID=ve.USHORT;ze.SID=ze.USHORT;ve.NUMBER=function(n){return n>=-107&&n<=107?[n+139]:n>=108&&n<=1131?(n=n-108,[(n>>8)+247,n&255]):n>=-1131&&n<=-108?(n=-n-108,[(n>>8)+251,n&255]):n>=-32768&&n<=32767?ve.NUMBER16(n):ve.NUMBER32(n)};ze.NUMBER=function(n){return ve.NUMBER(n).length};ve.NUMBER16=function(n){return[28,n>>8&255,n&255]};ze.NUMBER16=pn(3);ve.NUMBER32=function(n){return[29,n>>24&255,n>>16&255,n>>8&255,n&255]};ze.NUMBER32=pn(5);ve.REAL=function(n){let e=n.toString();const t=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(e);if(t){const s=parseFloat("1e"+((t[2]?+t[2]:0)+t[1].length));e=(Math.round(n*s)/s).toString()}let i="";for(let s=0,a=e.length;s<a;s+=1){const o=e[s];o==="e"?i+=e[++s]==="-"?"c":"b":o==="."?i+="a":o==="-"?i+="e":i+=o}i+=i.length&1?"f":"ff";const r=[30];for(let s=0,a=i.length;s<a;s+=2)r.push(parseInt(i.substr(s,2),16));return r};ze.REAL=function(n){return ve.REAL(n).length};ve.NAME=ve.CHARARRAY;ze.NAME=ze.CHARARRAY;ve.STRING=ve.CHARARRAY;ze.STRING=ze.CHARARRAY;ji.UTF8=function(n,e,t){const i=[],r=t;for(let s=0;s<r;s++,e+=1)i[s]=n.getUint8(e);return String.fromCharCode.apply(null,i)};ji.UTF16=function(n,e,t){const i=[],r=t/2;for(let s=0;s<r;s++,e+=2)i[s]=n.getUint16(e);return String.fromCharCode.apply(null,i)};ve.UTF16=function(n){const e=[];for(let t=0;t<n.length;t+=1){const i=n.charCodeAt(t);e[e.length]=i>>8&255,e[e.length]=i&255}return e};ze.UTF16=function(n){return n.length*2};var _s={"x-mac-croatian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ","x-mac-cyrillic":"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю","x-mac-gaelic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæøṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ","x-mac-greek":"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ­","x-mac-icelandic":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-inuit":"ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł","x-mac-ce":"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",macintosh:"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-romanian":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ","x-mac-turkish":"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ"};ji.MACSTRING=function(n,e,t,i){const r=_s[i];if(r===void 0)return;let s="";for(let a=0;a<t;a++){const o=n.getUint8(e+a);o<=127?s+=String.fromCharCode(o):s+=r[o&127]}return s};var ss=typeof WeakMap=="function"&&new WeakMap,as,xv=function(n){if(!as){as={};for(let r in _s)as[r]=new String(r)}const e=as[n];if(e===void 0)return;if(ss){const r=ss.get(e);if(r!==void 0)return r}const t=_s[n];if(t===void 0)return;const i={};for(let r=0;r<t.length;r++)i[t.charCodeAt(r)]=r+128;return ss&&ss.set(e,i),i};ve.MACSTRING=function(n,e){const t=xv(e);if(t===void 0)return;const i=[];for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);if(s>=128&&(s=t[s],s===void 0))return;i[r]=s}return i};ze.MACSTRING=function(n,e){const t=ve.MACSTRING(n,e);return t!==void 0?t.length:0};function Xa(n){return n>=-128&&n<=127}function _v(n,e,t){let i=0;const r=n.length;for(;e<r&&i<64&&n[e]===0;)++e,++i;return t.push(128|i-1),e}function yv(n,e,t){let i=0;const r=n.length;let s=e;for(;s<r&&i<64;){const a=n[s];if(!Xa(a)||a===0&&s+1<r&&n[s+1]===0)break;++s,++i}t.push(i-1);for(let a=e;a<s;++a)t.push(n[a]+256&255);return s}function Sv(n,e,t){let i=0;const r=n.length;let s=e;for(;s<r&&i<64;){const a=n[s];if(a===0||Xa(a)&&s+1<r&&Xa(n[s+1]))break;++s,++i}t.push(64|i-1);for(let a=e;a<s;++a){const o=n[a];t.push(o+65536>>8&255,o+256&255)}return s}ve.VARDELTAS=function(n){let e=0;const t=[];for(;e<n.length;){const i=n[e];i===0?e=_v(n,e,t):i>=-128&&i<=127?e=yv(n,e,t):e=Sv(n,e,t)}return t};ve.INDEX=function(n){let e=1;const t=[e],i=[];for(let o=0;o<n.length;o+=1){const l=ve.OBJECT(n[o]);Array.prototype.push.apply(i,l),e+=l.length,t.push(e)}if(i.length===0)return[0,0];const r=[],s=1+Math.floor(Math.log(e)/Math.log(2))/8|0,a=[void 0,ve.BYTE,ve.USHORT,ve.UINT24,ve.ULONG][s];for(let o=0;o<t.length;o+=1){const l=a(t[o]);Array.prototype.push.apply(r,l)}return Array.prototype.concat(ve.Card16(n.length),ve.OffSize(s),r,i)};ze.INDEX=function(n){return ve.INDEX(n).length};ve.DICT=function(n){let e=[];const t=Object.keys(n),i=t.length;for(let r=0;r<i;r+=1){const s=parseInt(t[r],0),a=n[s],o=ve.OPERAND(a.value,a.type),l=ve.OPERATOR(s);for(let c=0;c<o.length;c++)e.push(o[c]);for(let c=0;c<l.length;c++)e.push(l[c])}return e};ze.DICT=function(n){return ve.DICT(n).length};ve.OPERATOR=function(n){return n<1200?[n]:[12,n-1200]};ve.OPERAND=function(n,e){let t=[];if(Array.isArray(e))for(let i=0;i<e.length;i+=1){Ie.argument(n.length===e.length,"Not enough arguments given for type"+e);const r=ve.OPERAND(n[i],e[i]);for(let s=0;s<r.length;s++)t.push(r[s])}else if(e==="SID"){const i=ve.NUMBER(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="offset"){const i=ve.NUMBER32(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="number"){const i=ve.NUMBER(n);for(let r=0;r<i.length;r++)t.push(i[r])}else if(e==="real"){const i=ve.REAL(n);for(let r=0;r<i.length;r++)t.push(i[r])}else throw new Error("Unknown operand type "+e);return t};ve.OP=ve.BYTE;ze.OP=ze.BYTE;var os=typeof WeakMap=="function"&&new WeakMap;ve.CHARSTRING=function(n){if(os){const i=os.get(n);if(i!==void 0)return i}let e=[];const t=n.length;for(let i=0;i<t;i+=1){const r=n[i],s=ve[r.type](r.value);for(let a=0;a<s.length;a++)e.push(s[a])}return os&&os.set(n,e),e};ze.CHARSTRING=function(n){return ve.CHARSTRING(n).length};ve.OBJECT=function(n){const e=ve[n.type];return Ie.argument(e!==void 0,"No encoding function for type "+n.type),e(n.value)};ze.OBJECT=function(n){const e=ze[n.type];return Ie.argument(e!==void 0,"No sizeOf function for type "+n.type),e(n.value)};ve.TABLE=function(n){let e=[];const t=(n.fields||[]).length,i=[],r=[];for(let s=0;s<t;s+=1){const a=n.fields[s],o=ve[a.type];Ie.argument(o!==void 0,"No encoding function for field type "+a.type+" ("+a.name+")");let l=n[a.name];l===void 0&&(l=a.value);const c=o(l);if(a.type==="TABLE")l.fields!==null&&(r.push(e.length),i.push(c)),e.push(0,0);else for(let u=0;u<c.length;u++)e.push(c[u])}for(let s=0;s<i.length;s+=1){const a=r[s],o=e.length;Ie.argument(o<65536,"Table "+n.tableName+" too big."),e[a]=o>>8,e[a+1]=o&255;for(let l=0;l<i[s].length;l++)e.push(i[s][l])}return e};ze.TABLE=function(n){let e=0;const t=(n.fields||[]).length;for(let i=0;i<t;i+=1){const r=n.fields[i],s=ze[r.type];Ie.argument(s!==void 0,"No sizeOf function for field type "+r.type+" ("+r.name+")");let a=n[r.name];a===void 0&&(a=r.value),e+=s(a),r.type==="TABLE"&&(e+=2)}return e};ve.RECORD=ve.TABLE;ze.RECORD=ze.TABLE;ve.LITERAL=function(n){return n};ze.LITERAL=function(n){return n.length};function Rt(n,e,t){if(e&&e.length)for(let i=0;i<e.length;i+=1){const r=e[i];this[r.name]=r.value}if(this.tableName=n,this.fields=e,t){const i=Object.keys(t);for(let r=0;r<i.length;r+=1){const s=i[r],a=t[s];this[s]!==void 0&&(this[s]=a)}}}Rt.prototype.encode=function(){return ve.TABLE(this)};Rt.prototype.sizeOf=function(){return ze.TABLE(this)};function $i(n,e,t){t===void 0&&(t=e.length);const i=new Array(e.length+1);i[0]={name:n+"Count",type:"USHORT",value:t};for(let r=0;r<e.length;r++)i[r+1]={name:n+r,type:"USHORT",value:e[r]};return i}function qa(n,e,t){const i=e.length,r=new Array(i+1);r[0]={name:n+"Count",type:"USHORT",value:i};for(let s=0;s<i;s++)r[s+1]={name:n+s,type:"TABLE",value:t(e[s],s)};return r}function Zi(n,e,t){const i=e.length;let r=[];r[0]={name:n+"Count",type:"USHORT",value:i};for(let s=0;s<i;s++)r=r.concat(t(e[s],s));return r}function ys(n){n.format===1?Rt.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:1}].concat($i("glyph",n.glyphs))):n.format===2?Rt.call(this,"coverageTable",[{name:"coverageFormat",type:"USHORT",value:2}].concat(Zi("rangeRecord",n.ranges,function(e,t){return[{name:"startGlyphID"+t,type:"USHORT",value:e.start},{name:"endGlyphID"+t,type:"USHORT",value:e.end},{name:"startCoverageIndex"+t,type:"USHORT",value:e.index}]}))):Ie.assert(!1,"Coverage format must be 1 or 2.")}ys.prototype=Object.create(Rt.prototype);ys.prototype.constructor=ys;function Ss(n){Rt.call(this,"scriptListTable",Zi("scriptRecord",n,function(e,t){const i=e.script;let r=i.defaultLangSys;return Ie.assert(!!r,"Unable to write GSUB: script "+e.tag+" has no default language system."),[{name:"scriptTag"+t,type:"TAG",value:e.tag},{name:"script"+t,type:"TABLE",value:new Rt("scriptTable",[{name:"defaultLangSys",type:"TABLE",value:new Rt("defaultLangSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:r.reqFeatureIndex}].concat($i("featureIndex",r.featureIndexes)))}].concat(Zi("langSys",i.langSysRecords,function(s,a){const o=s.langSys;return[{name:"langSysTag"+a,type:"TAG",value:s.tag},{name:"langSys"+a,type:"TABLE",value:new Rt("langSys",[{name:"lookupOrder",type:"USHORT",value:0},{name:"reqFeatureIndex",type:"USHORT",value:o.reqFeatureIndex}].concat($i("featureIndex",o.featureIndexes)))}]})))}]}))}Ss.prototype=Object.create(Rt.prototype);Ss.prototype.constructor=Ss;function bs(n){Rt.call(this,"featureListTable",Zi("featureRecord",n,function(e,t){const i=e.feature;return[{name:"featureTag"+t,type:"TAG",value:e.tag},{name:"feature"+t,type:"TABLE",value:new Rt("featureTable",[{name:"featureParams",type:"USHORT",value:i.featureParams}].concat($i("lookupListIndex",i.lookupListIndexes)))}]}))}bs.prototype=Object.create(Rt.prototype);bs.prototype.constructor=bs;function Ms(n,e){Rt.call(this,"lookupListTable",qa("lookup",n,function(t){let i=e[t.lookupType];return Ie.assert(!!i,"Unable to write GSUB lookup type "+t.lookupType+" tables."),new Rt("lookupTable",[{name:"lookupType",type:"USHORT",value:t.lookupType},{name:"lookupFlag",type:"USHORT",value:t.lookupFlag}].concat(qa("subtable",t.subtables,i)))}))}Ms.prototype=Object.create(Rt.prototype);Ms.prototype.constructor=Ms;function Ts(n){n.format===1?Rt.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:1},{name:"startGlyphID",type:"USHORT",value:n.startGlyph}].concat($i("glyph",n.classes))):n.format===2?Rt.call(this,"classDefTable",[{name:"classFormat",type:"USHORT",value:2}].concat(Zi("rangeRecord",n.ranges,function(e,t){return[{name:"startGlyphID"+t,type:"USHORT",value:e.start},{name:"endGlyphID"+t,type:"USHORT",value:e.end},{name:"class"+t,type:"USHORT",value:e.classId}]}))):Ie.assert(!1,"Class format must be 1 or 2.")}Ts.prototype=Object.create(Rt.prototype);Ts.prototype.constructor=Ts;var ae={Table:Rt,Record:Rt,Coverage:ys,ClassDef:Ts,ScriptList:Ss,FeatureList:bs,LookupList:Ms,ushortList:$i,tableList:qa,recordList:Zi};function Xl(n,e){return n.getUint8(e)}function Es(n,e){return n.getUint16(e,!1)}function bv(n,e){return n.getInt16(e,!1)}function vu(n,e){return(n.getUint16(e)<<8)+n.getUint8(e+2)}function go(n,e){return n.getUint32(e,!1)}function Mv(n,e){return n.getInt32(e,!1)}function xu(n,e){const t=n.getInt16(e,!1),i=n.getUint16(e+2,!1);return t+i/65535}function Tv(n,e){let t="";for(let i=e;i<e+4;i+=1)t+=String.fromCharCode(n.getInt8(i));return t}function Ev(n,e,t){let i=0;for(let r=0;r<t;r+=1)i<<=8,i+=n.getUint8(e+r);return i}function Av(n,e,t){const i=[];for(let r=e;r<t;r+=1)i.push(n.getUint8(r));return i}function Cv(n){let e="";for(let t=0;t<n.length;t+=1)e+=String.fromCharCode(n[t]);return e}var Rv={byte:1,uShort:2,f2dot14:2,short:2,uInt24:3,uLong:4,fixed:4,longDateTime:8,tag:4},kt={LONG_WORDS:32768,WORD_DELTA_COUNT_MASK:32767,SHARED_POINT_NUMBERS:32768,COUNT_MASK:4095,EMBEDDED_PEAK_TUPLE:32768,INTERMEDIATE_REGION:16384,PRIVATE_POINT_NUMBERS:8192,TUPLE_INDEX_MASK:4095,POINTS_ARE_WORDS:128,POINT_RUN_COUNT_MASK:127,DELTAS_ARE_ZERO:128,DELTAS_ARE_WORDS:64,DELTA_RUN_COUNT_MASK:63,INNER_INDEX_BIT_COUNT_MASK:15,MAP_ENTRY_SIZE_MASK:48};function N(n,e){this.data=n,this.offset=e,this.relativeOffset=0}N.prototype.parseByte=function(){const n=this.data.getUint8(this.offset+this.relativeOffset);return this.relativeOffset+=1,n};N.prototype.parseChar=function(){const n=this.data.getInt8(this.offset+this.relativeOffset);return this.relativeOffset+=1,n};N.prototype.parseCard8=N.prototype.parseByte;N.prototype.parseUShort=function(){const n=this.data.getUint16(this.offset+this.relativeOffset);return this.relativeOffset+=2,n};N.prototype.parseCard16=N.prototype.parseUShort;N.prototype.parseSID=N.prototype.parseUShort;N.prototype.parseOffset16=N.prototype.parseUShort;N.prototype.parseShort=function(){const n=this.data.getInt16(this.offset+this.relativeOffset);return this.relativeOffset+=2,n};N.prototype.parseF2Dot14=function(){const n=this.data.getInt16(this.offset+this.relativeOffset)/16384;return this.relativeOffset+=2,n};N.prototype.parseUInt24=function(){const n=vu(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=3,n};N.prototype.parseULong=function(){const n=go(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};N.prototype.parseLong=function(){const n=Mv(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};N.prototype.parseOffset32=N.prototype.parseULong;N.prototype.parseFixed=function(){const n=xu(this.data,this.offset+this.relativeOffset);return this.relativeOffset+=4,n};N.prototype.parseString=function(n){const e=this.data,t=this.offset+this.relativeOffset;let i="";this.relativeOffset+=n;for(let r=0;r<n;r++)i+=String.fromCharCode(e.getUint8(t+r));return i};N.prototype.parseTag=function(){return this.parseString(4)};N.prototype.parseLongDateTime=function(){let n=go(this.data,this.offset+this.relativeOffset+4);return n-=2082844800,this.relativeOffset+=8,n};N.prototype.parseVersion=function(n){const e=Es(this.data,this.offset+this.relativeOffset),t=Es(this.data,this.offset+this.relativeOffset+2);return this.relativeOffset+=4,n===void 0&&(n=4096),e+t/n/10};N.prototype.skip=function(n,e){e===void 0&&(e=1),this.relativeOffset+=Rv[n]*e};N.prototype.parseULongList=function(n){n===void 0&&(n=this.parseULong());const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint32(i),i+=4;return this.relativeOffset+=n*4,e};N.prototype.parseOffset16List=N.prototype.parseUShortList=function(n){n===void 0&&(n=this.parseUShort());const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint16(i),i+=2;return this.relativeOffset+=n*2,e};N.prototype.parseShortList=function(n){const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getInt16(i),i+=2;return this.relativeOffset+=n*2,e};N.prototype.parseByteList=function(n){const e=new Array(n),t=this.data;let i=this.offset+this.relativeOffset;for(let r=0;r<n;r++)e[r]=t.getUint8(i++);return this.relativeOffset+=n,e};N.prototype.parseList=function(n,e){e||(e=n,n=this.parseUShort());const t=new Array(n);for(let i=0;i<n;i++)t[i]=e.call(this);return t};N.prototype.parseList32=function(n,e){e||(e=n,n=this.parseULong());const t=new Array(n);for(let i=0;i<n;i++)t[i]=e.call(this);return t};N.prototype.parseRecordList=function(n,e){e||(e=n,n=this.parseUShort());const t=new Array(n),i=Object.keys(e);for(let r=0;r<n;r++){const s={};for(let a=0;a<i.length;a++){const o=i[a],l=e[o];s[o]=l.call(this)}t[r]=s}return t};N.prototype.parseRecordList32=function(n,e){e||(e=n,n=this.parseULong());const t=new Array(n),i=Object.keys(e);for(let r=0;r<n;r++){const s={};for(let a=0;a<i.length;a++){const o=i[a],l=e[o];s[o]=l.call(this)}t[r]=s}return t};N.prototype.parseTupleRecords=function(n,e){let t=[];for(let i=0;i<n;i++){let r=[];for(let s=0;s<e;s++)r.push(this.parseF2Dot14());t.push(r)}return t};N.prototype.parseStruct=function(n){if(typeof n=="function")return n.call(this);{const e=Object.keys(n),t={};for(let i=0;i<e.length;i++){const r=e[i],s=n[r];t[r]=s.call(this)}return t}};N.prototype.parseValueRecord=function(n){if(n===void 0&&(n=this.parseUShort()),n===0)return;const e={};return n&1&&(e.xPlacement=this.parseShort()),n&2&&(e.yPlacement=this.parseShort()),n&4&&(e.xAdvance=this.parseShort()),n&8&&(e.yAdvance=this.parseShort()),n&16&&(e.xPlaDevice=void 0,this.parseShort()),n&32&&(e.yPlaDevice=void 0,this.parseShort()),n&64&&(e.xAdvDevice=void 0,this.parseShort()),n&128&&(e.yAdvDevice=void 0,this.parseShort()),e};N.prototype.parseValueRecordList=function(){const n=this.parseUShort(),e=this.parseUShort(),t=new Array(e);for(let i=0;i<e;i++)t[i]=this.parseValueRecord(n);return t};N.prototype.parsePointer=function(n){const e=this.parseOffset16();if(e>0)return new N(this.data,this.offset+e).parseStruct(n)};N.prototype.parsePointer32=function(n){const e=this.parseOffset32();if(e>0)return new N(this.data,this.offset+e).parseStruct(n)};N.prototype.parseListOfLists=function(n){const e=this.parseOffset16List(),t=e.length,i=this.relativeOffset,r=new Array(t);for(let s=0;s<t;s++){const a=e[s];if(a===0){r[s]=void 0;continue}if(this.relativeOffset=a,n){const o=this.parseOffset16List(),l=new Array(o.length);for(let c=0;c<o.length;c++)this.relativeOffset=a+o[c],l[c]=n.call(this);r[s]=l}else r[s]=this.parseUShortList()}return this.relativeOffset=i,r};N.prototype.parseCoverage=function(){const n=this.offset+this.relativeOffset,e=this.parseUShort(),t=this.parseUShort();if(e===1)return{format:1,glyphs:this.parseUShortList(t)};if(e===2){const i=new Array(t);for(let r=0;r<t;r++)i[r]={start:this.parseUShort(),end:this.parseUShort(),index:this.parseUShort()};return{format:2,ranges:i}}throw new Error("0x"+n.toString(16)+": Coverage format must be 1 or 2.")};N.prototype.parseClassDef=function(){const n=this.offset+this.relativeOffset,e=this.parseUShort();return e===1?{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()}:e===2?{format:2,ranges:this.parseRecordList({start:N.uShort,end:N.uShort,classId:N.uShort})}:(console.warn(`0x${n.toString(16)}: This font file uses an invalid ClassDef format of ${e}. It might be corrupted and should be reacquired if it doesn't display as intended.`),{format:e})};N.list=function(n,e){return function(){return this.parseList(n,e)}};N.list32=function(n,e){return function(){return this.parseList32(n,e)}};N.recordList=function(n,e){return function(){return this.parseRecordList(n,e)}};N.recordList32=function(n,e){return function(){return this.parseRecordList32(n,e)}};N.pointer=function(n){return function(){return this.parsePointer(n)}};N.pointer32=function(n){return function(){return this.parsePointer32(n)}};N.tag=N.prototype.parseTag;N.byte=N.prototype.parseByte;N.uShort=N.offset16=N.prototype.parseUShort;N.uShortList=N.prototype.parseUShortList;N.uInt24=N.prototype.parseUInt24;N.uLong=N.offset32=N.prototype.parseULong;N.uLongList=N.prototype.parseULongList;N.fixed=N.prototype.parseFixed;N.f2Dot14=N.prototype.parseF2Dot14;N.struct=N.prototype.parseStruct;N.coverage=N.prototype.parseCoverage;N.classDef=N.prototype.parseClassDef;var ql={reserved:N.uShort,reqFeatureIndex:N.uShort,featureIndexes:N.uShortList};N.prototype.parseScriptList=function(){return this.parsePointer(N.recordList({tag:N.tag,script:N.pointer({defaultLangSys:N.pointer(ql),langSysRecords:N.recordList({tag:N.tag,langSys:N.pointer(ql)})})}))||[]};N.prototype.parseFeatureList=function(){return this.parsePointer(N.recordList({tag:N.tag,feature:N.pointer({featureParams:N.offset16,lookupListIndexes:N.uShortList})}))||[]};N.prototype.parseLookupList=function(n){return this.parsePointer(N.list(N.pointer(function(){const e=this.parseUShort();Ie.argument(1<=e&&e<=9,"GPOS/GSUB lookup type "+e+" unknown.");const t=this.parseUShort(),i=t&16;return{lookupType:e,lookupFlag:t,subtables:this.parseList(N.pointer(n[e])),markFilteringSet:i?this.parseUShort():void 0}})))||[]};N.prototype.parseFeatureVariationsList=function(){return this.parsePointer32(function(){const n=this.parseUShort(),e=this.parseUShort();return Ie.argument(n===1&&e<1,"GPOS/GSUB feature variations table unknown."),this.parseRecordList32({conditionSetOffset:N.offset32,featureTableSubstitutionOffset:N.offset32})})||[]};N.prototype.parseVariationStore=function(){const n=this.relativeOffset,e=this.parseUShort(),t={itemVariationStore:this.parseItemVariationStore()};return this.relativeOffset=n+e+2,t};N.prototype.parseItemVariationStore=function(){const n=this.relativeOffset,e={format:this.parseUShort(),variationRegions:[],itemVariationSubtables:[]},t=this.parseOffset32(),i=this.parseUShort(),r=this.parseULongList(i);this.relativeOffset=n+t,e.variationRegions=this.parseVariationRegionList();for(let s=0;s<i;s++){const a=r[s];this.relativeOffset=n+a,e.itemVariationSubtables.push(this.parseItemVariationSubtable())}return e};N.prototype.parseVariationRegionList=function(){const n=this.parseUShort(),e=this.parseUShort();return this.parseRecordList(e,{regionAxes:N.recordList(n,{startCoord:N.f2Dot14,peakCoord:N.f2Dot14,endCoord:N.f2Dot14})})};N.prototype.parseItemVariationSubtable=function(){const n=this.parseUShort(),e=this.parseUShort(),t=this.parseUShortList(),i=t.length;return{regionIndexes:t,deltaSets:n&&i?this.parseDeltaSets(n,e,i):[]}};N.prototype.parseDeltaSetIndexMap=function(){const n=this.parseByte(),e=this.parseByte(),t=[];let i=0;switch(n){case 0:i=this.parseUShort();break;case 1:i=this.parseULong();break;default:console.error(`unsupported DeltaSetIndexMap format ${n}`)}if(!i)return{format:n,entryFormat:e};const r=(e&kt.INNER_INDEX_BIT_COUNT_MASK)+1,s=((e&kt.MAP_ENTRY_SIZE_MASK)>>4)+1;for(let a=0;a<i;a++){let o;if(s===1)o=this.parseByte();else if(s===2)o=this.parseUShort();else if(s===3)o=this.parseUInt24();else if(s===4)o=this.parseULong();else throw new Error(`Invalid entry size of ${s}`);const l=o>>r,c=o&(1<<r)-1;t.push({outerIndex:l,innerIndex:c})}return{format:n,entryFormat:e,map:t}};N.prototype.parseDeltaSets=function(n,e,t){const i=Array.from({length:n},()=>[]),r=e&kt.LONG_WORDS,s=e&kt.WORD_DELTA_COUNT_MASK;if(s>t)throw Error("wordCount must be less than or equal to regionIndexCount");const a=(r?this.parseLong:this.parseShort).bind(this),o=(r?this.parseShort:this.parseChar).bind(this);for(let l=0;l<n;l++)for(let c=0;c<t;c++)c<s?i[l].push(a()):i[l].push(o());return i};N.prototype.parseTupleVariationStoreList=function(n,e,t){const i=this.parseUShort(),s=this.parseUShort()&1,a=this.parseOffset32(),o=(s?this.parseULong:this.parseUShort).bind(this),l={};let c=o();s||(c*=2);let u;for(let f=0;f<i;f++){u=o(),s||(u*=2);const h=u-c;l[f]=h?this.parseTupleVariationStore(a+c,n,e,t,f):void 0,c=u}return l};N.prototype.parseTupleVariationStore=function(n,e,t,i,r){const s=this.relativeOffset;this.relativeOffset=n,t==="cvar"&&(this.relativeOffset+=4);const a=this.parseUShort(),o=!!(a&kt.SHARED_POINT_NUMBERS),l=a&kt.COUNT_MASK;let c=this.parseOffset16();const u=[];let f=[];for(let p=0;p<l;p++){const v=this.parseTupleVariationHeader(e,t);u.push(v)}this.relativeOffset!==n+c&&(console.warn(`Unexpected offset after parsing tuple variation headers! Expected ${n+c}, actually ${this.relativeOffset}`),this.relativeOffset=n+c),o&&(f=this.parsePackedPointNumbers());let h=this.relativeOffset;for(let p=0;p<l;p++){const v=u[p];v.privatePoints=[],this.relativeOffset=h,t==="cvar"&&!v.peakTuple&&console.warn("An embedded peak tuple is required in TupleVariationHeaders for the cvar table."),v.flags.privatePointNumbers&&(v.privatePoints=this.parsePackedPointNumbers()),delete v.flags;const m=this.offset,g=this.relativeOffset,_=S=>{let b,R;const T=()=>{let w=0;if(t==="gvar"){if(w=v.privatePoints.length||f.length,!w){const y=i.get(r);y.path,w=y.points.length,w+=4}}else t==="cvar"&&(w=i.length);this.offset=m,this.relativeOffset=g,b=this.parsePackedDeltas(w),t==="gvar"&&(R=this.parsePackedDeltas(w))};return{configurable:!0,get:function(){return b===void 0&&T(),S==="deltasY"?R:b},set:function(w){b===void 0&&T(),S==="deltasY"?R=w:b=w}}};Object.defineProperty(v,"deltas",_.call(this,"deltas")),t==="gvar"&&Object.defineProperty(v,"deltasY",_.call(this,"deltasY")),h+=v.variationDataSize,delete v.variationDataSize}this.relativeOffset=s;const d={headers:u};return d.sharedPoints=f,d};N.prototype.parseTupleVariationHeader=function(n,e){const t=this.parseUShort(),i=this.parseUShort(),r=!!(i&kt.EMBEDDED_PEAK_TUPLE),s=!!(i&kt.INTERMEDIATE_REGION),a=!!(i&kt.PRIVATE_POINT_NUMBERS),o=r?void 0:i&kt.TUPLE_INDEX_MASK,l=r?this.parseTupleRecords(1,n)[0]:void 0,c=s?this.parseTupleRecords(1,n)[0]:void 0,u=s?this.parseTupleRecords(1,n)[0]:void 0,f={variationDataSize:t,peakTuple:l,intermediateStartTuple:c,intermediateEndTuple:u,flags:{embeddedPeakTuple:r,intermediateRegion:s,privatePointNumbers:a}};return e==="gvar"&&(f.sharedTupleRecordsIndex=o),f};N.prototype.parsePackedPointNumbers=function(){const n=this.parseByte(),e=[];let t=n;if(n>=128){const r=this.parseByte();t=(n&kt.POINT_RUN_COUNT_MASK)<<8|r}let i=0;for(;e.length<t;){const r=this.parseByte(),s=!!(r&kt.POINTS_ARE_WORDS);let a=(r&kt.POINT_RUN_COUNT_MASK)+1;for(let o=0;o<a&&e.length<t;o++){let l;s?l=this.parseUShort():l=this.parseByte(),i=i+l,e.push(i)}}return e};N.prototype.parsePackedDeltas=function(n){const e=[];for(;e.length<n;){const t=this.parseByte(),i=!!(t&kt.DELTAS_ARE_ZERO),r=!!(t&kt.DELTAS_ARE_WORDS),s=(t&kt.DELTA_RUN_COUNT_MASK)+1;for(let a=0;a<s&&e.length<n;a++)i?e.push(0):r?e.push(this.parseShort()):e.push(this.parseChar())}return e};var _e={getByte:Xl,getCard8:Xl,getUShort:Es,getCard16:Es,getShort:bv,getUInt24:vu,getULong:go,getFixed:xu,getTag:Tv,getOffset:Ev,getBytes:Av,bytesToString:Cv,Parser:N},As=["copyright","fontFamily","fontSubfamily","uniqueID","fullName","version","postScriptName","trademark","manufacturer","designer","description","manufacturerURL","designerURL","license","licenseURL","reserved","preferredFamily","preferredSubfamily","compatibleFullName","sampleText","postScriptFindFontName","wwsFamily","wwsSubfamily"],_u={0:"en",1:"fr",2:"de",3:"it",4:"nl",5:"sv",6:"es",7:"da",8:"pt",9:"no",10:"he",11:"ja",12:"ar",13:"fi",14:"el",15:"is",16:"mt",17:"tr",18:"hr",19:"zh-Hant",20:"ur",21:"hi",22:"th",23:"ko",24:"lt",25:"pl",26:"hu",27:"es",28:"lv",29:"se",30:"fo",31:"fa",32:"ru",33:"zh",34:"nl-BE",35:"ga",36:"sq",37:"ro",38:"cz",39:"sk",40:"si",41:"yi",42:"sr",43:"mk",44:"bg",45:"uk",46:"be",47:"uz",48:"kk",49:"az-Cyrl",50:"az-Arab",51:"hy",52:"ka",53:"mo",54:"ky",55:"tg",56:"tk",57:"mn-CN",58:"mn",59:"ps",60:"ks",61:"ku",62:"sd",63:"bo",64:"ne",65:"sa",66:"mr",67:"bn",68:"as",69:"gu",70:"pa",71:"or",72:"ml",73:"kn",74:"ta",75:"te",76:"si",77:"my",78:"km",79:"lo",80:"vi",81:"id",82:"tl",83:"ms",84:"ms-Arab",85:"am",86:"ti",87:"om",88:"so",89:"sw",90:"rw",91:"rn",92:"ny",93:"mg",94:"eo",128:"cy",129:"eu",130:"ca",131:"la",132:"qu",133:"gn",134:"ay",135:"tt",136:"ug",137:"dz",138:"jv",139:"su",140:"gl",141:"af",142:"br",143:"iu",144:"gd",145:"gv",146:"ga",147:"to",148:"el-polyton",149:"kl",150:"az",151:"nn"},wv={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:5,11:1,12:4,13:0,14:6,15:0,16:0,17:0,18:0,19:2,20:4,21:9,22:21,23:3,24:29,25:29,26:29,27:29,28:29,29:0,30:0,31:4,32:7,33:25,34:0,35:0,36:0,37:0,38:29,39:29,40:0,41:5,42:7,43:7,44:7,45:7,46:7,47:7,48:7,49:7,50:4,51:24,52:23,53:7,54:7,55:7,56:7,57:27,58:7,59:4,60:4,61:4,62:4,63:26,64:9,65:9,66:9,67:13,68:13,69:11,70:10,71:12,72:17,73:16,74:14,75:15,76:18,77:19,78:20,79:22,80:30,81:0,82:0,83:0,84:4,85:28,86:28,87:28,88:0,89:0,90:0,91:0,92:0,93:0,94:0,128:0,129:0,130:0,131:0,132:0,133:0,134:0,135:7,136:4,137:26,138:0,139:0,140:0,141:0,142:0,143:28,144:0,145:0,146:0,147:0,148:6,149:0,150:0,151:0},yu={1078:"af",1052:"sq",1156:"gsw",1118:"am",5121:"ar-DZ",15361:"ar-BH",3073:"ar",2049:"ar-IQ",11265:"ar-JO",13313:"ar-KW",12289:"ar-LB",4097:"ar-LY",6145:"ary",8193:"ar-OM",16385:"ar-QA",1025:"ar-SA",10241:"ar-SY",7169:"aeb",14337:"ar-AE",9217:"ar-YE",1067:"hy",1101:"as",2092:"az-Cyrl",1068:"az",1133:"ba",1069:"eu",1059:"be",2117:"bn",1093:"bn-IN",8218:"bs-Cyrl",5146:"bs",1150:"br",1026:"bg",1027:"ca",3076:"zh-HK",5124:"zh-MO",2052:"zh",4100:"zh-SG",1028:"zh-TW",1155:"co",1050:"hr",4122:"hr-BA",1029:"cs",1030:"da",1164:"prs",1125:"dv",2067:"nl-BE",1043:"nl",3081:"en-AU",10249:"en-BZ",4105:"en-CA",9225:"en-029",16393:"en-IN",6153:"en-IE",8201:"en-JM",17417:"en-MY",5129:"en-NZ",13321:"en-PH",18441:"en-SG",7177:"en-ZA",11273:"en-TT",2057:"en-GB",1033:"en",12297:"en-ZW",1061:"et",1080:"fo",1124:"fil",1035:"fi",2060:"fr-BE",3084:"fr-CA",1036:"fr",5132:"fr-LU",6156:"fr-MC",4108:"fr-CH",1122:"fy",1110:"gl",1079:"ka",3079:"de-AT",1031:"de",5127:"de-LI",4103:"de-LU",2055:"de-CH",1032:"el",1135:"kl",1095:"gu",1128:"ha",1037:"he",1081:"hi",1038:"hu",1039:"is",1136:"ig",1057:"id",1117:"iu",2141:"iu-Latn",2108:"ga",1076:"xh",1077:"zu",1040:"it",2064:"it-CH",1041:"ja",1099:"kn",1087:"kk",1107:"km",1158:"quc",1159:"rw",1089:"sw",1111:"kok",1042:"ko",1088:"ky",1108:"lo",1062:"lv",1063:"lt",2094:"dsb",1134:"lb",1071:"mk",2110:"ms-BN",1086:"ms",1100:"ml",1082:"mt",1153:"mi",1146:"arn",1102:"mr",1148:"moh",1104:"mn",2128:"mn-CN",1121:"ne",1044:"nb",2068:"nn",1154:"oc",1096:"or",1123:"ps",1045:"pl",1046:"pt",2070:"pt-PT",1094:"pa",1131:"qu-BO",2155:"qu-EC",3179:"qu",1048:"ro",1047:"rm",1049:"ru",9275:"smn",4155:"smj-NO",5179:"smj",3131:"se-FI",1083:"se",2107:"se-SE",8251:"sms",6203:"sma-NO",7227:"sms",1103:"sa",7194:"sr-Cyrl-BA",3098:"sr",6170:"sr-Latn-BA",2074:"sr-Latn",1132:"nso",1074:"tn",1115:"si",1051:"sk",1060:"sl",11274:"es-AR",16394:"es-BO",13322:"es-CL",9226:"es-CO",5130:"es-CR",7178:"es-DO",12298:"es-EC",17418:"es-SV",4106:"es-GT",18442:"es-HN",2058:"es-MX",19466:"es-NI",6154:"es-PA",15370:"es-PY",10250:"es-PE",20490:"es-PR",3082:"es",1034:"es",21514:"es-US",14346:"es-UY",8202:"es-VE",2077:"sv-FI",1053:"sv",1114:"syr",1064:"tg",2143:"tzm",1097:"ta",1092:"tt",1098:"te",1054:"th",1105:"bo",1055:"tr",1090:"tk",1152:"ug",1058:"uk",1070:"hsb",1056:"ur",2115:"uz-Cyrl",1091:"uz",1066:"vi",1106:"cy",1160:"wo",1157:"sah",1144:"ii",1130:"yo"};function Pv(n,e,t){switch(n){case 0:if(e===65535)return"und";if(t)return t[e];break;case 1:return _u[e];case 3:return yu[e]}}var Ya="utf-16",Lv={0:"macintosh",1:"x-mac-japanese",2:"x-mac-chinesetrad",3:"x-mac-korean",6:"x-mac-greek",7:"x-mac-cyrillic",9:"x-mac-devanagai",10:"x-mac-gurmukhi",11:"x-mac-gujarati",12:"x-mac-oriya",13:"x-mac-bengali",14:"x-mac-tamil",15:"x-mac-telugu",16:"x-mac-kannada",17:"x-mac-malayalam",18:"x-mac-sinhalese",19:"x-mac-burmese",20:"x-mac-khmer",21:"x-mac-thai",22:"x-mac-lao",23:"x-mac-georgian",24:"x-mac-armenian",25:"x-mac-chinesesimp",26:"x-mac-tibetan",27:"x-mac-mongolian",28:"x-mac-ethiopic",29:"x-mac-ce",30:"x-mac-vietnamese",31:"x-mac-extarabic"},Dv={15:"x-mac-icelandic",17:"x-mac-turkish",18:"x-mac-croatian",24:"x-mac-ce",25:"x-mac-ce",26:"x-mac-ce",27:"x-mac-ce",28:"x-mac-ce",30:"x-mac-icelandic",37:"x-mac-romanian",38:"x-mac-ce",39:"x-mac-ce",40:"x-mac-ce",143:"x-mac-inuit",146:"x-mac-gaelic"};function vo(n,e,t){switch(n){case 0:return Ya;case 1:return Dv[t]||Lv[e];case 3:if(e===1||e===10)return Ya;break}}var Su={0:"unicode",1:"macintosh",2:"reserved",3:"windows"};function Iv(n){return Su[n]}function Uv(n,e,t){const i={},r=new _e.Parser(n,e),s=r.parseUShort(),a=r.parseUShort(),o=r.offset+r.parseUShort();for(let l=0;l<a;l++){const c=r.parseUShort(),u=r.parseUShort(),f=r.parseUShort(),h=r.parseUShort(),d=As[h]||h,p=r.parseUShort(),v=r.parseUShort(),m=Pv(c,f,t),g=vo(c,u,f),_=Iv(c);if(g!==void 0&&m!==void 0&&_!==void 0){let S;if(g===Ya?S=ji.UTF16(n,o+v,p):S=ji.MACSTRING(n,o+v,p,g),S){let b=i[_];b===void 0&&(b=i[_]={});let R=b[d];R===void 0&&(R=b[d]={}),R[m]=S}}}return s===1&&r.parseUShort(),i}function ls(n){const e={};for(let t in n)e[n[t]]=parseInt(t);return e}function Yl(n,e,t,i,r,s){return new ae.Record("NameRecord",[{name:"platformID",type:"USHORT",value:n},{name:"encodingID",type:"USHORT",value:e},{name:"languageID",type:"USHORT",value:t},{name:"nameID",type:"USHORT",value:i},{name:"length",type:"USHORT",value:r},{name:"offset",type:"USHORT",value:s}])}function Fv(n,e){const t=n.length,i=e.length-t+1;e:for(let r=0;r<i;r++)for(;r<i;r++){for(let s=0;s<t;s++)if(e[r+s]!==n[s])continue e;return r}return-1}function jl(n,e){let t=Fv(n,e);if(t<0){t=e.length;let i=0;const r=n.length;for(;i<r;++i)e.push(n[i])}return t}function Ov(n,e){const t=ls(Su),i=ls(_u),r=ls(yu),s=[],a=[];for(let l in n){let c;const u=[],f={},h=ls(As),d=t[l];for(let p in n[l]){let v=h[p];if(v===void 0&&(v=p),c=parseInt(v),isNaN(c))throw new Error('Name table entry "'+p+'" does not exist, see nameTableNames for complete list.');f[c]=n[l][p],u.push(c)}for(let p=0;p<u.length;p++){c=u[p];const v=f[c];for(let m in v){const g=v[m];if(d===1||d===0){let _=i[m],S=wv[_];const b=vo(d,S,_);let R=ve.MACSTRING(g,b);if(d===0&&(_=e.indexOf(m),_<0&&(_=e.length,e.push(m)),S=4,R=ve.UTF16(g)),R!==void 0){const T=jl(R,a);s.push(Yl(d,S,_,c,R.length,T))}}if(d===3){const _=r[m];if(_!==void 0){const S=ve.UTF16(g),b=jl(S,a);s.push(Yl(3,1,_,c,S.length,b))}}}}}s.sort(function(l,c){return l.platformID-c.platformID||l.encodingID-c.encodingID||l.languageID-c.languageID||l.nameID-c.nameID});const o=new ae.Table("name",[{name:"format",type:"USHORT",value:0},{name:"count",type:"USHORT",value:s.length},{name:"stringOffset",type:"USHORT",value:6+s.length*12}]);for(let l=0;l<s.length;l++)o.fields.push({name:"record_"+l,type:"RECORD",value:s[l]});return o.fields.push({name:"strings",type:"LITERAL",value:a}),o}function Cs(n,e,t=[]){if(e<256&&e in As){if(t.length&&!t.includes(parseInt(e)))return;e=As[e]}for(let i in n)for(let r in n[i])if(r===e||parseInt(r)===e)return n[i][r]}var bu={parse:Uv,make:Ov,getNameByID:Cs};function Nv(n,e,t,i){n.length=e.parseUShort(),n.language=e.parseUShort()-1;const r=e.parseByteList(n.length),s=Object.assign({},r),a=vo(t,i,n.language),o=_s[a];for(let l=0;l<o.length;l++)s[o.charCodeAt(l)]=r[128+l];n.glyphIndexMap=s}function Bv(n,e,t){e.parseUShort(),n.length=e.parseULong(),n.language=e.parseULong();let i;n.groupCount=i=e.parseULong(),n.glyphIndexMap={};for(let r=0;r<i;r+=1){const s=e.parseULong(),a=e.parseULong();let o=e.parseULong();for(let l=s;l<=a;l+=1)n.glyphIndexMap[l]=o,t===12&&o++}}function kv(n,e,t,i,r){n.length=e.parseUShort(),n.language=e.parseUShort();let s;n.segCount=s=e.parseUShort()>>1,e.skip("uShort",3),n.glyphIndexMap={};const a=new _e.Parser(t,i+r+14),o=new _e.Parser(t,i+r+16+s*2),l=new _e.Parser(t,i+r+16+s*4),c=new _e.Parser(t,i+r+16+s*6);let u=i+r+16+s*8;for(let f=0;f<s-1;f+=1){let h;const d=a.parseUShort(),p=o.parseUShort(),v=l.parseShort(),m=c.parseUShort();for(let g=p;g<=d;g+=1)m!==0?(u=c.offset+c.relativeOffset-2,u+=m,u+=(g-p)*2,h=_e.getUShort(t,u),h!==0&&(h=h+v&65535)):h=g+v&65535,n.glyphIndexMap[g]=h}}function Gv(n,e){const t={};e.skip("uLong");const i=e.parseULong();for(let r=0;r<i;r+=1){const s=e.parseUInt24(),a={varSelector:s},o=e.parseOffset32(),l=e.parseOffset32(),c=e.relativeOffset;o&&(e.relativeOffset=o,a.defaultUVS=e.parseStruct({ranges:function(){return e.parseRecordList32({startUnicodeValue:e.parseUInt24,additionalCount:e.parseByte})}})),l&&(e.relativeOffset=l,a.nonDefaultUVS=e.parseStruct({uvsMappings:function(){const u={},f=e.parseRecordList32({unicodeValue:e.parseUInt24,glyphID:e.parseUShort});for(let h=0;h<f.length;h+=1)u[f[h].unicodeValue]=f[h];return u}})),t[s]=a,e.relativeOffset=c}n.varSelectorList=t}function Vv(n,e){const t={};t.version=_e.getUShort(n,e),Ie.argument(t.version===0,"cmap table version should be 0."),t.numTables=_e.getUShort(n,e+2);let i=null,r=-1,s=-1,a=null,o=null;const l=[0,1,2,3,4,6],c=[0,1,10];for(let f=t.numTables-1;f>=0;f-=1)if(a=_e.getUShort(n,e+4+f*8),o=_e.getUShort(n,e+4+f*8+2),a===3&&c.includes(o)||a===0&&l.includes(o)||a===1&&o===0){if(s>0)continue;if(s=_e.getULong(n,e+4+f*8+4),i)break}else if(a===0&&o===5){if(r=_e.getULong(n,e+4+f*8+4),i=new _e.Parser(n,e+r),i.parseUShort()!==14)r=-1,i=null;else if(s>0)break}if(s===-1)throw new Error("No valid cmap sub-tables found.");const u=new _e.Parser(n,e+s);if(t.format=u.parseUShort(),t.format===0)Nv(t,u,a,o);else if(t.format===12||t.format===13)Bv(t,u,t.format);else if(t.format===4)kv(t,u,n,e,s);else throw new Error("Only format 0 (platformId 1, encodingId 0), 4, 12 and 14 cmap tables are supported (found format "+t.format+", platformId "+a+", encodingId "+o+").");return i&&Gv(t,i),t}function zv(n,e,t){n.segments.push({end:e,start:e,delta:-(e-t),offset:0,glyphIndex:t})}function Hv(n){n.segments.push({end:65535,start:65535,delta:1,offset:0})}function Wv(n){if(n.length===0)return n;const e=[n[0]];for(let t=1;t<n.length;t++){const i=e[e.length-1],r=n[t];i.end+1===r.start&&i.delta===r.delta&&r.end!==65535?i.end=r.end:e.push(r)}return e}function Xv(n){let e=!0,t;for(t=n.length-1;t>0;t-=1)if(n.get(t).unicode>65535){e=!1;break}let i=[{name:"version",type:"USHORT",value:0},{name:"numTables",type:"USHORT",value:e?1:2},{name:"platformID",type:"USHORT",value:3},{name:"encodingID",type:"USHORT",value:1},{name:"offset",type:"ULONG",value:e?12:20}];e||i.push({name:"cmap12PlatformID",type:"USHORT",value:3},{name:"cmap12EncodingID",type:"USHORT",value:10},{name:"cmap12Offset",type:"ULONG",value:0}),i.push({name:"format",type:"USHORT",value:4},{name:"cmap4Length",type:"USHORT",value:0},{name:"language",type:"USHORT",value:0},{name:"segCountX2",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0});const r=new ae.Table("cmap",i);for(r.segments=[],t=0;t<n.length;t+=1){const d=n.get(t);for(let p=0;p<d.unicodes.length;p+=1)zv(r,d.unicodes[p],t)}r.segments.sort(function(d,p){return d.start-p.start}),r.segments=Wv(r.segments),Hv(r);const s=r.segments.length;let a=0,o=[],l=[],c=[],u=[],f=[],h=[];for(t=0;t<s;t+=1){const d=r.segments[t];d.end<=65535&&d.start<=65535?(o.push({name:"end_"+t,type:"USHORT",value:d.end}),l.push({name:"start_"+t,type:"USHORT",value:d.start}),c.push({name:"idDelta_"+t,type:"SHORT",value:d.delta}),u.push({name:"idRangeOffset_"+t,type:"USHORT",value:d.offset}),d.glyphId!==void 0&&f.push({name:"glyph_"+t,type:"USHORT",value:d.glyphId})):a+=1,!e&&d.glyphIndex!==void 0&&(h.push({name:"cmap12Start_"+t,type:"ULONG",value:d.start}),h.push({name:"cmap12End_"+t,type:"ULONG",value:d.end}),h.push({name:"cmap12Glyph_"+t,type:"ULONG",value:d.glyphIndex}))}r.segCountX2=(s-a)*2,r.searchRange=Math.pow(2,Math.floor(Math.log(s-a)/Math.log(2)))*2,r.entrySelector=Math.log(r.searchRange/2)/Math.log(2),r.rangeShift=r.segCountX2-r.searchRange;for(let d=0;d<o.length;d++)r.fields.push(o[d]);r.fields.push({name:"reservedPad",type:"USHORT",value:0});for(let d=0;d<l.length;d++)r.fields.push(l[d]);for(let d=0;d<c.length;d++)r.fields.push(c[d]);for(let d=0;d<u.length;d++)r.fields.push(u[d]);for(let d=0;d<f.length;d++)r.fields.push(f[d]);if(r.cmap4Length=14+o.length*2+2+l.length*2+c.length*2+u.length*2+f.length*2,!e){const d=16+h.length*4;r.cmap12Offset=20+r.cmap4Length,r.fields.push({name:"cmap12Format",type:"USHORT",value:12},{name:"cmap12Reserved",type:"USHORT",value:0},{name:"cmap12Length",type:"ULONG",value:d},{name:"cmap12Language",type:"ULONG",value:0},{name:"cmap12nGroups",type:"ULONG",value:h.length/3});for(let p=0;p<h.length;p++)r.fields.push(h[p])}return r}var Mu={parse:Vv,make:Xv},fs=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","266 ff","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"],qv=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],Yv=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],jv=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"],ja=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls"],$v=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],hi=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"];function Tu(n){this.font=n}Tu.prototype.charToGlyphIndex=function(n){const e=n.codePointAt(0),t=this.font.glyphs;if(t)for(let i=0;i<t.length;i+=1){const r=t.get(i);for(let s=0;s<r.unicodes.length;s+=1)if(r.unicodes[s]===e)return i}return null};function Eu(n){this.cmap=n}Eu.prototype.charToGlyphIndex=function(n){return this.cmap.glyphIndexMap[n.codePointAt(0)]||0};function Au(n,e){this.encoding=n,this.charset=e}Au.prototype.charToGlyphIndex=function(n){const e=n.codePointAt(0),t=this.encoding[e];return this.charset.indexOf(t)};function xo(n){switch(n.version){case 1:this.names=hi.slice();break;case 2:this.names=new Array(n.numberOfGlyphs);for(let e=0;e<n.numberOfGlyphs;e++)n.glyphNameIndex[e]<hi.length?this.names[e]=hi[n.glyphNameIndex[e]]:this.names[e]=n.names[n.glyphNameIndex[e]-hi.length];break;case 2.5:this.names=new Array(n.numberOfGlyphs);for(let e=0;e<n.numberOfGlyphs;e++)this.names[e]=hi[e+n.glyphNameIndex[e]];break;case 3:this.names=[];break;default:this.names=[];break}}xo.prototype.nameToGlyphIndex=function(n){return this.names.indexOf(n)};xo.prototype.glyphIndexToName=function(n){return this.names[n]};function Zv(n){let e;const t=n.tables.cmap.glyphIndexMap,i=Object.keys(t);for(let r=0;r<i.length;r+=1){const s=i[r],a=t[s];e=n.glyphs.get(a),e.addUnicode(parseInt(s))}for(let r=0;r<n.glyphs.length;r+=1)e=n.glyphs.get(r),n.cffEncoding?e.name=n.cffEncoding.charset[r]:n.glyphNames.names&&(e.name=n.glyphNames.glyphIndexToName(r))}function Kv(n){n._IndexToUnicodeMap={};const e=n.tables.cmap.glyphIndexMap,t=Object.keys(e);for(let i=0;i<t.length;i+=1){const r=t[i];let s=e[r];n._IndexToUnicodeMap[s]===void 0?n._IndexToUnicodeMap[s]={unicodes:[parseInt(r)]}:n._IndexToUnicodeMap[s].unicodes.push(parseInt(r))}}function Jv(n,e){e.lowMemory?Kv(n):Zv(n)}function Qv(n,e,t,i,r){n.beginPath(),n.moveTo(e,t),n.lineTo(i,r),n.stroke()}var li={line:Qv};function ex(n,e){const t=new N(n,e),i=t.parseShort();i!==0&&console.warn("Only CPALv0 is currently fully supported.");const r=t.parseShort(),s=t.parseShort(),a=t.parseShort(),o=t.parseOffset32(),l=t.parseUShortList(s);t.relativeOffset=o;const c=t.parseULongList(a);return t.relativeOffset=o,{version:i,numPaletteEntries:r,colorRecords:c,colorRecordIndices:l}}function tx({version:n=0,numPaletteEntries:e=0,colorRecords:t=[],colorRecordIndices:i=[0]}){return Ie.argument(n===0,"Only CPALv0 are supported."),Ie.argument(t.length,"No colorRecords given."),Ie.argument(i.length,"No colorRecordIndices given."),i.length>1&&Ie.argument(e,"Can't infer numPaletteEntries on multiple colorRecordIndices"),new ae.Table("CPAL",[{name:"version",type:"USHORT",value:n},{name:"numPaletteEntries",type:"USHORT",value:e||t.length},{name:"numPalettes",type:"USHORT",value:i.length},{name:"numColorRecords",type:"USHORT",value:t.length},{name:"colorRecordsArrayOffset",type:"ULONG",value:12+2*i.length},...i.map((r,s)=>({name:"colorRecordIndices_"+s,type:"USHORT",value:r})),...t.map((r,s)=>({name:"colorRecords_"+s,type:"ULONG",value:r}))])}function Cu(n){var e=(n&4278190080)>>24,t=(n&16711680)>>16,i=(n&65280)>>8,r=n&255;return e=e+256&255,t=t+256&255,i=i+256&255,r=(r+256&255)/255,{b:e,g:t,r:i,a:r}}function _o(n,e,t=0,i="hexa"){if(e==65535)return"currentColor";const r=n&&n.tables&&n.tables.cpal;if(!r)return"currentColor";if(t>r.colorRecordIndices.length-1)throw new Error(`Palette index out of range (colorRecordIndices.length: ${r.colorRecordIndices.length}, index: ${e})`);if(e>r.numPaletteEntries)throw new Error(`Color index out of range (numPaletteEntries: ${r.numPaletteEntries}, index: ${e})`);const s=r.colorRecordIndices[t]+e;if(s>r.colorRecords)throw new Error(`Color index out of range (colorRecords.length: ${r.colorRecords.length}, lookupIndex: ${s})`);const a=Cu(r.colorRecords[s]);return i==="bgra"?a:Ki(a,i)}function cn(n){return("0"+parseInt(n).toString(16)).slice(-2)}function nx(n){const e=n.r/255,t=n.g/255,i=n.b/255,r=Math.max(e,t,i),s=Math.min(e,t,i);let a,o,l=(r+s)/2;if(r===s)a=o=0;else{const c=r-s;switch(o=l>.5?c/(2-r-s):c/(r+s),r){case e:a=(t-i)/c+(t<i?6:0);break;case t:a=(i-e)/c+2;break;case i:a=(e-t)/c+4;break}a/=6}return{h:a*360,s:o*100,l:l*100}}function ix(n){let{h:e,s:t,l:i,a:r}=n;e=e%360,t/=100,i/=100;const s=(1-Math.abs(2*i-1))*t,a=s*(1-Math.abs(e/60%2-1)),o=i-s/2;let l=0,c=0,u=0;return 0<=e&&e<60?(l=s,c=a,u=0):60<=e&&e<120?(l=a,c=s,u=0):120<=e&&e<180?(l=0,c=s,u=a):180<=e&&e<240?(l=0,c=a,u=s):240<=e&&e<300?(l=a,c=0,u=s):300<=e&&e<=360&&(l=s,c=0,u=a),{r:Math.round((l+o)*255),g:Math.round((c+o)*255),b:Math.round((u+o)*255),a:r}}function Ru(n){return parseInt(`0x${cn(n.b)}${cn(n.g)}${cn(n.r)}${cn(n.a*255)}`,16)}function Rs(n,e="hexa"){const t=e=="raw"||e=="cpal",i=Number.isInteger(n);let r=!0;if(i&&t||n==="currentColor")return n;if(typeof n=="object"){if(e=="bgra")return n;if(t)return Ru(n)}else if(!i&&/^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i.test(n.trim())){switch(n=n.trim().substring(1),n.length){case 3:n={r:parseInt(n[0].repeat(2),16),g:parseInt(n[1].repeat(2),16),b:parseInt(n[2].repeat(2),16),a:1};break;case 4:n={r:parseInt(n[0].repeat(2),16),g:parseInt(n[1].repeat(2),16),b:parseInt(n[2].repeat(2),16),a:parseInt(n[3].repeat(2),16)/255};break;case 6:n={r:parseInt(n[0]+n[1],16),g:parseInt(n[2]+n[3],16),b:parseInt(n[4]+n[5],16),a:1};break;case 8:n={r:parseInt(n[0]+n[1],16),g:parseInt(n[2]+n[3],16),b:parseInt(n[4]+n[5],16),a:parseInt(n[6]+n[7],16)/255};break}if(e=="bgra")return n}else if(typeof document<"u"&&/^[a-z]+$/i.test(n)){const s=document.createElement("canvas").getContext("2d");s.fillStyle=n;const a=Ki(s.fillStyle,"hexa");a==="#000000ff"&&n.toLowerCase()!=="black"?r=!1:n=a}else{n=n.trim();const s=/rgba?\(\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:,|\s*)\s*(?:(\d*\.\d+)(%?)|(\d+)(%?))\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(s.test(n)){const a=n.match(s).filter(o=>typeof o<"u");n={r:Math.round(parseFloat(a[1])/(a[2]?100/255:1)),g:Math.round(parseFloat(a[3])/(a[4]?100/255:1)),b:Math.round(parseFloat(a[5])/(a[6]?100/255:1)),a:a[7]?parseFloat(a[7])/(a[8]?100:1):1}}else{const a=/hsla?\(\s*(?:(\d*\.\d+|\d+)(deg|turn|))\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:,|\s*)\s*(?:(\d*\.\d+)%?|(\d+)%?)\s*(?:(?:,|\s|\/)\s*(?:(0*(?:\.\d+)?()|0*1(?:\.0+)?())|(?:\.\d+)|(\d+)(%)|(\d*\.\d+)(%)))?\s*\)/;if(a.test(n)){const o=n.match(a).filter(l=>typeof l<"u");n=ix({h:parseFloat(o[1])*(o[2]==="turn"?360:1),s:parseFloat(o[3]),l:parseFloat(o[4]),a:o[5]?parseFloat(o[5])/(o[6]?100:1):1})}else r=!1}}if(!r)throw new Error(`Invalid color format: ${n}`);return Ki(n,e)}function Ki(n,e="hexa"){if(n==="currentColor")return n;if(Number.isInteger(n)){if(e=="raw"||e=="cpal")return n;n=Cu(n)}else typeof n!="object"&&(n=Rs(n,"bgra"));let t=["hsl","hsla"].includes(e)?nx(n):null;switch(e){case"rgba":return`rgba(${n.r}, ${n.g}, ${n.b}, ${parseFloat(n.a.toFixed(3))})`;case"rgb":return`rgb(${n.r}, ${n.g}, ${n.b})`;case"hex":case"hex6":case"hex-6":return`#${cn(n.r)}${cn(n.g)}${cn(n.b)}`;case"hexa":case"hex8":case"hex-8":return`#${cn(n.r)}${cn(n.g)}${cn(n.b)}${cn(n.a*255)}`;case"hsl":return`hsl(${t.h.toFixed(2)}, ${t.s.toFixed(2)}%, ${t.l.toFixed(2)}%)`;case"hsla":return`hsla(${t.h.toFixed(2)}, ${t.s.toFixed(2)}%, ${t.l.toFixed(2)}%, ${parseFloat(n.a.toFixed(3))})`;case"bgra":return n;case"raw":case"cpal":return Ru(n);default:throw new Error("Unknown color format: "+e)}}var wu={parse:ex,make:tx,getPaletteColor:_o,parseColor:Rs,formatColor:Ki};function rx(n,e){let t=e||new Yi;return{configurable:!0,get:function(){return typeof t=="function"&&(t=t()),t},set:function(i){t=i}}}function Wt(n){this.bindConstructorValues(n)}Wt.prototype.bindConstructorValues=function(n){if(this.index=n.index||0,n.name===".notdef"?n.unicode=void 0:n.name===".null"&&(n.unicode=0),n.unicode===0&&n.name!==".null")throw new Error('The unicode value "0" is reserved for the glyph name ".null" and cannot be used by any other glyph.');this.name=n.name||null,this.unicode=n.unicode,this.unicodes=n.unicodes||(n.unicode!==void 0?[n.unicode]:[]),"xMin"in n&&(this.xMin=n.xMin),"yMin"in n&&(this.yMin=n.yMin),"xMax"in n&&(this.xMax=n.xMax),"yMax"in n&&(this.yMax=n.yMax),"advanceWidth"in n&&(this.advanceWidth=n.advanceWidth),"leftSideBearing"in n&&(this.leftSideBearing=n.leftSideBearing),"points"in n&&(this.points=n.points),Object.defineProperty(this,"path",rx(this,n.path))};Wt.prototype.addUnicode=function(n){this.unicodes.length===0&&(this.unicode=n),this.unicodes.push(n)};Wt.prototype.getBoundingBox=function(){return this.path.getBoundingBox()};Wt.prototype.getPath=function(n,e,t,i,r){n=n!==void 0?n:0,e=e!==void 0?e:0,t=t!==void 0?t:72,i=Object.assign({},r&&r.defaultRenderOptions,i);let s,a,o=i.xScale,l=i.yScale;const c=1/(this.path.unitsPerEm||1e3)*t;let u=this;r&&r.variation&&(u=r.variation.getTransform(this,i.variation),s=u.path.commands),i.hinting&&r&&r.hinting&&(a=u.path&&r.hinting.exec(u,t,i)),a?(s=r.hinting.getCommands(a),n=Math.round(n),e=Math.round(e),o=l=1):(s=u.path.commands,o===void 0&&(o=c),l===void 0&&(l=c));const f=new Yi;if(i.drawSVG){const h=this.getSvgImage(r);if(h){const d=new Yi;return d._image={image:h.image,x:n+h.leftSideBearing*c,y:e-h.baseline*c,width:h.image.width*c,height:h.image.height*c},f._layers=[d],f}}if(i.drawLayers){const h=this.getLayers(r);if(h&&h.length){f._layers=[];for(let d=0;d<h.length;d+=1){const p=h[d];let v=_o(r,p.paletteIndex,i.usePalette);v==="currentColor"?v=i.fill||"black":v=Ki(v,i.colorFormat||"rgba"),i=Object.assign({},i,{fill:v}),f._layers.push(this.getPath.call(p.glyph,n,e,t,i,r))}return f}}f.fill=i.fill||this.path.fill,f.stroke=this.path.stroke,f.strokeWidth=this.path.strokeWidth*c;for(let h=0;h<s.length;h+=1){const d=s[h];d.type==="M"?f.moveTo(n+d.x*o,e+-d.y*l):d.type==="L"?f.lineTo(n+d.x*o,e+-d.y*l):d.type==="Q"?f.quadraticCurveTo(n+d.x1*o,e+-d.y1*l,n+d.x*o,e+-d.y*l):d.type==="C"?f.curveTo(n+d.x1*o,e+-d.y1*l,n+d.x2*o,e+-d.y2*l,n+d.x*o,e+-d.y*l):d.type==="Z"&&f.stroke&&f.strokeWidth&&f.closePath()}return f};Wt.prototype.getLayers=function(n){if(!n)throw new Error("The font object is required to read the colr/cpal tables in order to get the layers.");return n.layers.get(this.index)};Wt.prototype.getSvgImage=function(n){if(!n)throw new Error("The font object is required to read the svg table in order to get the image.");return n.svgImages.get(this.index)};Wt.prototype.getContours=function(n=null){if(this.points===void 0&&!n)return[];const e=[];let t=[],i=n||this.points;for(let r=0;r<i.length;r+=1){const s=i[r];t.push(s),s.lastPointOfContour&&(e.push(t),t=[])}return Ie.argument(t.length===0,"There are still points left in the current contour."),e};Wt.prototype.getMetrics=function(){const n=this.path.commands,e=[],t=[];for(let r=0;r<n.length;r+=1){const s=n[r];s.type!=="Z"&&(e.push(s.x),t.push(s.y)),(s.type==="Q"||s.type==="C")&&(e.push(s.x1),t.push(s.y1)),s.type==="C"&&(e.push(s.x2),t.push(s.y2))}const i={xMin:Math.min.apply(null,e),yMin:Math.min.apply(null,t),xMax:Math.max.apply(null,e),yMax:Math.max.apply(null,t),leftSideBearing:this.leftSideBearing};return isFinite(i.xMin)||(i.xMin=0),isFinite(i.xMax)||(i.xMax=this.advanceWidth),isFinite(i.yMin)||(i.yMin=0),isFinite(i.yMax)||(i.yMax=0),i.rightSideBearing=this.advanceWidth-i.leftSideBearing-(i.xMax-i.xMin),i};Wt.prototype.draw=function(n,e,t,i,r,s){r=Object.assign({},s&&s.defaultRenderOptions,r),this.getPath(e,t,i,r,s).draw(n)};Wt.prototype.drawPoints=function(n,e,t,i,r,s){if(r=Object.assign({},s&&s.defaultRenderOptions,r),r.drawLayers){const h=this.getLayers(s);if(h&&h.length){for(let d=0;d<h.length;d+=1)h[d].glyph.index!==this.index&&this.drawPoints.call(h[d].glyph,n,e,t,i);return}}function a(h,d,p,v){n.beginPath();for(let m=0;m<h.length;m+=1)n.moveTo(d+h[m].x*v,p+h[m].y*v),n.arc(d+h[m].x*v,p+h[m].y*v,2,0,Math.PI*2,!1);n.fill()}e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:24;const o=1/this.path.unitsPerEm*i,l=[],c=[];let f=this.path.commands;s&&s.variation&&(f=s.variation.getTransform(this,r.variation).path.commands);for(let h=0;h<f.length;h+=1){const d=f[h];d.x!==void 0&&l.push({x:d.x,y:-d.y}),d.x1!==void 0&&c.push({x:d.x1,y:-d.y1}),d.x2!==void 0&&c.push({x:d.x2,y:-d.y2})}n.fillStyle="blue",a(l,e,t,o),n.fillStyle="red",a(c,e,t,o)};Wt.prototype.drawMetrics=function(n,e,t,i){let r;e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:24,r=1/this.path.unitsPerEm*i,n.lineWidth=1,n.strokeStyle="black",li.line(n,e,-1e4,e,1e4),li.line(n,-1e4,t,1e4,t);const s=this.xMin||0;let a=this.yMin||0;const o=this.xMax||0;let l=this.yMax||0;const c=this.advanceWidth||0;n.strokeStyle="blue",li.line(n,e+s*r,-1e4,e+s*r,1e4),li.line(n,e+o*r,-1e4,e+o*r,1e4),li.line(n,-1e4,t+-a*r,1e4,t+-a*r),li.line(n,-1e4,t+-l*r,1e4,t+-l*r),n.strokeStyle="green",li.line(n,e+c*r,-1e4,e+c*r,1e4)};Wt.prototype.toPathData=function(n,e){n=Object.assign({},{variation:e&&e.defaultRenderOptions.variation},n);let t=this;e&&e.variation&&(t=e.variation.getTransform(this,n.variation));let i=t.points&&n.pointsTransform?n.pointsTransform(t.points):t.path;return n.pathTransform&&(i=n.pathTransform(i)),i.toPathData(n)};Wt.prototype.fromSVG=function(n,e={}){return this.path.fromSVG(n,e)};Wt.prototype.toSVG=function(n,e){const t=this.toPathData.apply(this,[n,e]);return this.path.toSVG(n,t)};Wt.prototype.toDOMElement=function(n,e){n=Object.assign({},{variation:e&&e.defaultRenderOptions.variation},n);let t=this.path;return e&&e.variation&&(t=e.variation.getTransform(this,n.variation).path),t.toDOMElement(n)};var br=Wt;function ki(n,e,t){Object.defineProperty(n,e,{get:function(){return typeof n[t]>"u"&&n.path,n[t]},set:function(i){n[t]=i},enumerable:!0,configurable:!0})}function Os(n,e){if(this.font=n,this.glyphs={},Array.isArray(e))for(let t=0;t<e.length;t++){const i=e[t];i.path.unitsPerEm=n.unitsPerEm,this.glyphs[t]=i}this.length=e&&e.length||0}typeof Symbol<"u"&&Symbol.iterator&&(Os.prototype[Symbol.iterator]=function(){let n=-1;return{next:function(){n++;const e=n>=this.length-1;return{value:this.get(n),done:e}}.bind(this)}});Os.prototype.get=function(n){if(this.font._push&&this.glyphs[n]===void 0){this.font._push(n),typeof this.glyphs[n]=="function"&&(this.glyphs[n]=this.glyphs[n]());let e=this.glyphs[n],t=this.font._IndexToUnicodeMap[n];if(t)for(let i=0;i<t.unicodes.length;i++)e.addUnicode(t.unicodes[i]);this.font.cffEncoding?e.name=this.font.cffEncoding.charset[n]:this.font.glyphNames.names&&(e.name=this.font.glyphNames.glyphIndexToName(n)),this.glyphs[n].advanceWidth=this.font._hmtxTableData[n].advanceWidth,this.glyphs[n].leftSideBearing=this.font._hmtxTableData[n].leftSideBearing}else typeof this.glyphs[n]=="function"&&(this.glyphs[n]=this.glyphs[n]());return this.glyphs[n]};Os.prototype.push=function(n,e){this.glyphs[n]=e,this.length++};function sx(n,e){return new br({index:e,font:n})}function ax(n,e,t,i,r,s){return function(){const a=new br({index:e,font:n});return a.path=function(){t(a,i,r);const o=s(n.glyphs,a);return o.unitsPerEm=n.unitsPerEm,o},ki(a,"numberOfContours","_numberOfContours"),ki(a,"xMin","_xMin"),ki(a,"xMax","_xMax"),ki(a,"yMin","_yMin"),ki(a,"yMax","_yMax"),ki(a,"points","_points"),a}}function ox(n,e,t,i,r){return function(){const s=new br({index:e,font:n});return s.path=function(){const a=t(n,s,i,r);return a.unitsPerEm=n.unitsPerEm,a},s}}var Cn={GlyphSet:Os,glyphLoader:sx,ttfGlyphLoader:ax,cffGlyphLoader:ox};function Pu(n,e){if(n===e)return!0;if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;for(let t=0;t<n.length;t+=1)if(!Pu(n[t],e[t]))return!1;return!0}else return!1}var $l=10;function ws(n){let e;return n.length<1240?e=107:n.length<33900?e=1131:e=32768,e}function yn(n,e,t,i){const r=[],s=[],a=i>1?_e.getULong(n,e):_e.getCard16(n,e),o=i>1?4:2;let l,c;if(a!==0){const u=_e.getByte(n,e+o);l=e+(a+1)*u+o;let f=e+o+1;for(let h=0;h<a+1;h+=1)r.push(_e.getOffset(n,f,u)),f+=u;c=l+r[a]}else c=e+o;for(let u=0;u<r.length-1;u+=1){let f=_e.getBytes(n,l+r[u],l+r[u+1]);t&&(f=t(f,n,e,i)),s.push(f)}return{objects:s,startOffset:e,endOffset:c}}function lx(n,e,t){const i=[],r=t>1?_e.getULong(n,e):_e.getCard16(n,e),s=t>1?4:2;let a,o;if(r!==0){const l=_e.getByte(n,e+s);a=e+(r+1)*l+s;let c=e+s+1;for(let u=0;u<r+1;u+=1)i.push(_e.getOffset(n,c,l)),c+=l;o=a+i[r]}else o=e+s;return{offsets:i,startOffset:e,endOffset:o}}function cx(n,e,t,i,r,s){const a=s>1?_e.getULong(t,i):_e.getCard16(t,i),o=s>1?4:2;let l=0;if(a!==0){const u=_e.getByte(t,i+o);l=i+(a+1)*u+o}return _e.getBytes(t,l+e[n],l+e[n+1])}function ux(n){let e="";const i=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"];for(;;){const r=n.parseByte(),s=r>>4,a=r&15;if(s===15||(e+=i[s],a===15))break;e+=i[a]}return parseFloat(e)}function hx(n,e){let t,i,r,s;if(e===28)return t=n.parseByte(),i=n.parseByte(),t<<8|i;if(e===29)return t=n.parseByte(),i=n.parseByte(),r=n.parseByte(),s=n.parseByte(),t<<24|i<<16|r<<8|s;if(e===30)return ux(n);if(e>=32&&e<=246)return e-139;if(e>=247&&e<=250)return t=n.parseByte(),(e-247)*256+t+108;if(e>=251&&e<=254)return t=n.parseByte(),-(e-251)*256-t-108;throw new Error("Invalid b0 "+e)}function fx(n){const e={};for(let t=0;t<n.length;t+=1){const i=n[t][0],r=n[t][1];let s;if(r.length===1?s=r[0]:s=r,Object.prototype.hasOwnProperty.call(e,i)&&!isNaN(e[i]))throw new Error("Object "+e+" already has key "+i);e[i]=s}return e}function yo(n,e,t,i){e=e!==void 0?e:0;const r=new _e.Parser(n,e),s=[];let a=[];t=t!==void 0?t:n.byteLength;let o=i<2?22:28;for(;r.relativeOffset<t;){let l=r.parseByte();if(l<o){if(l===12&&(l=1200+r.parseByte()),i>1&&l===23){bx(a);continue}s.push([l,a]),a=[]}else a.push(hx(r,l))}return fx(s)}function pr(n,e){return e<=390?e=fs[e]:n?e=n[e-391]:e=void 0,e}function So(n,e,t){const i={};let r;for(let s=0;s<e.length;s+=1){const a=e[s];if(Array.isArray(a.type)){const o=[];o.length=a.type.length;for(let l=0;l<a.type.length;l++)r=n[a.op]!==void 0?n[a.op][l]:void 0,r===void 0&&(r=a.value!==void 0&&a.value[l]!==void 0?a.value[l]:null),a.type[l]==="SID"&&(r=pr(t,r)),o[l]=r;i[a.name]=o}else r=n[a.op],r===void 0&&(r=a.value!==void 0?a.value:null),a.type==="SID"&&(r=pr(t,r)),i[a.name]=r}return i}function dx(n,e){const t={};if(t.formatMajor=_e.getCard8(n,e),t.formatMinor=_e.getCard8(n,e+1),t.formatMajor>2)throw new Error(`Unsupported CFF table version ${t.formatMajor}.${t.formatMinor}`);return t.size=_e.getCard8(n,e+2),t.formatMajor<2?(t.offsetSize=_e.getCard8(n,e+3),t.startOffset=e,t.endOffset=e+4):(t.topDictLength=_e.getCard16(n,e+3),t.endOffset=e+8),t}var Lu=[{name:"version",op:0,type:"SID"},{name:"notice",op:1,type:"SID"},{name:"copyright",op:1200,type:"SID"},{name:"fullName",op:2,type:"SID"},{name:"familyName",op:3,type:"SID"},{name:"weight",op:4,type:"SID"},{name:"isFixedPitch",op:1201,type:"number",value:0},{name:"italicAngle",op:1202,type:"number",value:0},{name:"underlinePosition",op:1203,type:"number",value:-100},{name:"underlineThickness",op:1204,type:"number",value:50},{name:"paintType",op:1205,type:"number",value:0},{name:"charstringType",op:1206,type:"number",value:2},{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"uniqueId",op:13,type:"number"},{name:"fontBBox",op:5,type:["number","number","number","number"],value:[0,0,0,0]},{name:"strokeWidth",op:1208,type:"number",value:0},{name:"xuid",op:14,type:[],value:null},{name:"charset",op:15,type:"offset",value:0},{name:"encoding",op:16,type:"offset",value:0},{name:"charStrings",op:17,type:"offset",value:0},{name:"private",op:18,type:["number","offset"],value:[0,0]},{name:"ros",op:1230,type:["SID","SID","number"]},{name:"cidFontVersion",op:1231,type:"number",value:0},{name:"cidFontRevision",op:1232,type:"number",value:0},{name:"cidFontType",op:1233,type:"number",value:0},{name:"cidCount",op:1234,type:"number",value:8720},{name:"uidBase",op:1235,type:"number"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"fontName",op:1238,type:"SID"}],px=[{name:"fontMatrix",op:1207,type:["real","real","real","real","real","real"],value:[.001,0,0,.001,0,0]},{name:"charStrings",op:17,type:"offset"},{name:"fdArray",op:1236,type:"offset"},{name:"fdSelect",op:1237,type:"offset"},{name:"vstore",op:24,type:"offset"}],Du=[{name:"subrs",op:19,type:"offset",value:0},{name:"defaultWidthX",op:20,type:"number",value:0},{name:"nominalWidthX",op:21,type:"number",value:0}],mx=[{name:"blueValues",op:6,type:"delta"},{name:"otherBlues",op:7,type:"delta"},{name:"familyBlues",op:7,type:"delta"},{name:"familyBlues",op:8,type:"delta"},{name:"familyOtherBlues",op:9,type:"delta"},{name:"blueScale",op:1209,type:"number",value:.039625},{name:"blueShift",op:1210,type:"number",value:7},{name:"blueFuzz",op:1211,type:"number",value:1},{name:"stdHW",op:10,type:"number"},{name:"stdVW",op:11,type:"number"},{name:"stemSnapH",op:1212,type:"number"},{name:"stemSnapV",op:1213,type:"number"},{name:"languageGroup",op:1217,type:"number",value:0},{name:"expansionFactor",op:1218,type:"number",value:.06},{name:"vsindex",op:22,type:"number",value:0},{name:"subrs",op:19,type:"offset"}],gx=[{name:"private",op:18,type:["number","offset"],value:[0,0]}];function vx(n,e,t,i){const r=yo(n,e,n.byteLength,i);return So(r,i>1?px:Lu,t)}function bo(n,e,t,i,r){const s=yo(n,e,t,r);return So(s,r>1?mx:Du,i)}function xx(n,e,t){const i=yo(n,e,void 0,t);return So(i,gx)}function _x(n,e,t){const i=[];for(let r=0;r<t.length;r++){const s=new DataView(new Uint8Array(t[r]).buffer),a=xx(s,0,2),o=a.private[0],l=a.private[1];if(o!==0&&l!==0){const c=bo(n,l+e,o,[],2);if(c.subrs){const u=l+c.subrs,f=yn(n,u+e,void 0,2);a._subrs=f.objects,a._subrsBias=ws(a._subrs)}a._privateDict=c}i.push(a)}return i}function Ea(n,e,t,i,r){const s=[];for(let a=0;a<t.length;a+=1){const o=new DataView(new Uint8Array(t[a]).buffer),l=vx(o,0,i,r);l._subrs=[],l._subrsBias=0,l._defaultWidthX=0,l._nominalWidthX=0;const c=r<2?l.private[0]:0,u=r<2?l.private[1]:0;if(c!==0&&u!==0){const f=bo(n,u+e,c,i,r);if(l._defaultWidthX=f.defaultWidthX,l._nominalWidthX=f.nominalWidthX,f.subrs!==0){const h=u+f.subrs,d=yn(n,h+e,void 0,r);l._subrs=d.objects,l._subrsBias=ws(l._subrs)}l._privateDict=f}s.push(l)}return s}function yx(n,e,t,i,r){let s,a;const o=new _e.Parser(n,e);t-=1;const l=[".notdef"],c=o.parseCard8();if(c===0)for(let u=0;u<t;u+=1)s=o.parseSID(),r?l.push(s):l.push(pr(i,s)||s);else if(c===1)for(;l.length<=t;){s=o.parseSID(),a=o.parseCard8();for(let u=0;u<=a;u+=1)r?l.push("cid"+("00000"+s).slice(-5)):l.push(pr(i,s)||s),s+=1}else if(c===2)for(;l.length<=t;){s=o.parseSID(),a=o.parseCard16();for(let u=0;u<=a;u+=1)r?l.push("cid"+("00000"+s).slice(-5)):l.push(pr(i,s)||s),s+=1}else throw new Error("Unknown charset format "+c);return l}function Sx(n,e){let t;const i={},r=new _e.Parser(n,e),s=r.parseCard8();if(s===0){const a=r.parseCard8();for(let o=0;o<a;o+=1)t=r.parseCard8(),i[t]=o}else if(s===1){const a=r.parseCard8();t=1;for(let o=0;o<a;o+=1){const l=r.parseCard8(),c=r.parseCard8();for(let u=l;u<=l+c;u+=1)i[u]=t,t+=1}}else throw new Error("Unknown encoding format "+s);return i}function bx(n){let e=n.pop();for(;n.length>e;)n.pop()}function Iu(n,e){const t=n.tables.cff&&n.tables.cff.topDict&&n.tables.cff.topDict.paintType||0;return t===2&&(e.fill=null,e.stroke="black",e.strokeWidth=n.tables.cff.topDict.strokeWidth||0),t}function $a(n,e,t,i,r){let s,a,o,l;const c=new Yi,u=[];let f=0,h=!1,d=!1,p=0,v=0,m,g,_,S,b=0,R=[],T,w=0;const y=n.tables.cff2||n.tables.cff;if(_=y.topDict._defaultWidthX,S=y.topDict._nominalWidthX,r=r||n.variation&&n.variation.get(),e.getBlendPath||(e.getBlendPath=function(I){return $a(n,e,t,i,I)}),n.isCIDFont||i>1){const I=y.topDict._fdSelect?y.topDict._fdSelect[e.index]:0,C=y.topDict._fdArray[I];m=C._subrs,g=C._subrsBias,i>1?(R=y.topDict._vstore.itemVariationStore,b=C._privateDict.vsindex):(_=C._defaultWidthX,S=C._nominalWidthX)}else m=y.topDict._subrs,g=y.topDict._subrsBias;const A=Iu(n,c);let L=_;function P(I,C){d&&A!==2&&c.closePath(),c.moveTo(I,C),d=!0}function k(){let I;I=(u.length&1)!==0,I&&!h&&(L=u.shift()+S),f+=u.length>>1,u.length=0,h=!0}function F(I){let C,G,z,Q,te,le,ue,Se,Be,Ye,Oe,Y,oe=0;for(;oe<I.length;){let $=I[oe];switch(oe+=1,$){case 1:k();break;case 3:k();break;case 4:u.length>1&&!h&&(L=u.shift()+S,h=!0),v+=u.pop(),P(p,v);break;case 5:for(;u.length>0;)p+=u.shift(),v+=u.shift(),c.lineTo(p,v);break;case 6:for(;u.length>0&&(p+=u.shift(),c.lineTo(p,v),u.length!==0);)v+=u.shift(),c.lineTo(p,v);break;case 7:for(;u.length>0&&(v+=u.shift(),c.lineTo(p,v),u.length!==0);)p+=u.shift(),c.lineTo(p,v);break;case 8:for(;u.length>0;)s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l+u.shift(),c.curveTo(s,a,o,l,p,v);break;case 10:if(te=u.pop()+g,le=m[te],le){if(w>=$l){console.warn("CFF charstring subroutine call depth exceeded, skipping callsubr");break}w++,F(le),w--}break;case 11:if(i>1){console.error("CFF CharString operator return (11) is not supported in CFF2");break}return;case 12:switch($=I[oe],oe+=1,$){case 35:s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),ue=o+u.shift(),Se=l+u.shift(),Be=ue+u.shift(),Ye=Se+u.shift(),Oe=Be+u.shift(),Y=Ye+u.shift(),p=Oe+u.shift(),v=Y+u.shift(),u.shift(),c.curveTo(s,a,o,l,ue,Se),c.curveTo(Be,Ye,Oe,Y,p,v);break;case 34:s=p+u.shift(),a=v,o=s+u.shift(),l=a+u.shift(),ue=o+u.shift(),Se=l,Be=ue+u.shift(),Ye=l,Oe=Be+u.shift(),Y=v,p=Oe+u.shift(),c.curveTo(s,a,o,l,ue,Se),c.curveTo(Be,Ye,Oe,Y,p,v);break;case 36:s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),ue=o+u.shift(),Se=l,Be=ue+u.shift(),Ye=l,Oe=Be+u.shift(),Y=Ye+u.shift(),p=Oe+u.shift(),c.curveTo(s,a,o,l,ue,Se),c.curveTo(Be,Ye,Oe,Y,p,v);break;case 37:s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),ue=o+u.shift(),Se=l+u.shift(),Be=ue+u.shift(),Ye=Se+u.shift(),Oe=Be+u.shift(),Y=Ye+u.shift(),Math.abs(Oe-p)>Math.abs(Y-v)?p=Oe+u.shift():v=Y+u.shift(),c.curveTo(s,a,o,l,ue,Se),c.curveTo(Be,Ye,Oe,Y,p,v);break;default:console.log("Glyph "+e.index+": unknown operator 1200"+$),u.length=0}break;case 14:if(i>1){console.error("CFF CharString operator endchar (14) is not supported in CFF2");break}if(u.length>=4){const se=ja[u.pop()],ee=ja[u.pop()],xe=u.pop(),de=u.pop();if(se&&ee){e.isComposite=!0,e.components=[];const Xe=n.cffEncoding.charset.indexOf(se),D=n.cffEncoding.charset.indexOf(ee);e.components.push({glyphIndex:D,dx:0,dy:0}),e.components.push({glyphIndex:Xe,dx:de,dy:xe}),c.extend(n.glyphs.get(D).path);const je=n.glyphs.get(Xe),Le=JSON.parse(JSON.stringify(je.path.commands));for(let He=0;He<Le.length;He+=1){const ie=Le[He];ie.type!=="Z"&&(ie.x+=de,ie.y+=xe),(ie.type==="Q"||ie.type==="C")&&(ie.x1+=de,ie.y1+=xe),ie.type==="C"&&(ie.x2+=de,ie.y2+=xe)}c.extend(Le)}}else u.length>0&&!h&&(L=u.shift()+S,h=!0);d&&A!==2&&(c.closePath(),d=!1);break;case 15:if(i<2){console.error("CFF2 CharString operator vsindex (15) is not supported in CFF");break}b=u.pop();break;case 16:if(i<2){console.error("CFF2 CharString operator blend (16) is not supported in CFF");break}T||(T=n.variation&&r&&n.variation.process.getBlendVector(R,b,r));var J=u.pop(),be=T?T.length:R.itemVariationSubtables[b].regionIndexes.length,Fe=J*be,Ue=u.length-Fe,Ze=Ue-J;if(T)for(let se=0;se<J;se++){var We=u[Ze+se];for(let ee=0;ee<be;ee++)We+=T[ee]*u[Ue++];u[Ze+se]=We}for(;Fe--;)u.pop();break;case 18:k();break;case 19:case 20:k(),oe+=f+7>>3;break;case 21:u.length>2&&!h&&(L=u.shift()+S,h=!0),v+=u.pop(),p+=u.pop(),P(p,v);break;case 22:u.length>1&&!h&&(L=u.shift()+S,h=!0),p+=u.pop(),P(p,v);break;case 23:k();break;case 24:for(;u.length>2;)s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l+u.shift(),c.curveTo(s,a,o,l,p,v);p+=u.shift(),v+=u.shift(),c.lineTo(p,v);break;case 25:for(;u.length>6;)p+=u.shift(),v+=u.shift(),c.lineTo(p,v);s=p+u.shift(),a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l+u.shift(),c.curveTo(s,a,o,l,p,v);break;case 26:for(u.length&1&&(p+=u.shift());u.length>0;)s=p,a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o,v=l+u.shift(),c.curveTo(s,a,o,l,p,v);break;case 27:for(u.length&1&&(v+=u.shift());u.length>0;)s=p+u.shift(),a=v,o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l,c.curveTo(s,a,o,l,p,v);break;case 28:C=I[oe],G=I[oe+1],u.push((C<<24|G<<16)>>16),oe+=2;break;case 29:if(te=u.pop()+n.gsubrsBias,le=n.gsubrs[te],le){if(w>=$l){console.warn("CFF charstring subroutine call depth exceeded, skipping callgsubr");break}w++,F(le),w--}break;case 30:for(;u.length>0&&(s=p,a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,v),u.length!==0);)s=p+u.shift(),a=v,o=s+u.shift(),l=a+u.shift(),v=l+u.shift(),p=o+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,v);break;case 31:for(;u.length>0&&(s=p+u.shift(),a=v,o=s+u.shift(),l=a+u.shift(),v=l+u.shift(),p=o+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,v),u.length!==0);)s=p,a=v+u.shift(),o=s+u.shift(),l=a+u.shift(),p=o+u.shift(),v=l+(u.length===1?u.shift():0),c.curveTo(s,a,o,l,p,v);break;default:$<32?console.log("Glyph "+e.index+": unknown operator "+$):$<247?u.push($-139):$<251?(C=I[oe],oe+=1,u.push(($-247)*256+C+108)):$<255?(C=I[oe],oe+=1,u.push(-($-251)*256-C-108)):(C=I[oe],G=I[oe+1],z=I[oe+2],Q=I[oe+3],oe+=4,u.push((C<<24|G<<16|z<<8|Q)/65536))}}}return F(t),n.variation&&r&&(c.commands=c.commands.map(I=>{const C=Object.keys(I);for(let G=0;G<C.length;G++){const z=C[G];z!=="type"&&(I[z]=Math.round(I[z]))}return I})),h&&(e.advanceWidth=L),c}function Zl(n,e,t,i,r){const s=[];let a;const o=new _e.Parser(n,e),l=o.parseCard8();if(l===0)for(let c=0;c<t;c++){if(a=o.parseCard8(),a>=i)throw new Error("CFF table CID Font FDSelect has bad FD index value "+a+" (FD count "+i+")");s.push(a)}else if(l===3||r>1&&l===4){const c=l===4?o.parseULong():o.parseCard16();let u=l===4?o.parseULong():o.parseCard16();if(u!==0)throw new Error(`CFF Table CID Font FDSelect format ${l} range has bad initial GID ${u}`);let f;for(let h=0;h<c;h++){if(a=l===4?o.parseUShort():o.parseCard8(),f=l===4?o.parseULong():o.parseCard16(),a>=i)throw new Error("CFF table CID Font FDSelect has bad FD index value "+a+" (FD count "+i+")");if(f>t)throw new Error(`CFF Table CID Font FDSelect format ${r} range has bad GID ${f}`);for(;u<f;u++)s.push(a);u=f}if(f!==t)throw new Error("CFF Table CID Font FDSelect format 3 range has bad final (Sentinal) GID "+f)}else throw new Error("CFF Table CID Font FDSelect table has unsupported format "+l);return s}function Mx(n,e,t,i){let r;const s=dx(n,e);s.formatMajor===2?r=t.tables.cff2={}:r=t.tables.cff={};const a=s.formatMajor>1?null:yn(n,s.endOffset,_e.bytesToString),o=s.formatMajor>1?null:yn(n,a.endOffset),l=s.formatMajor>1?null:yn(n,o.endOffset,_e.bytesToString),c=yn(n,s.formatMajor>1?e+s.size+s.topDictLength:l.endOffset,void 0,s.formatMajor);t.gsubrs=c.objects,t.gsubrsBias=ws(t.gsubrs);let u;if(s.formatMajor>1){const h=e+s.size,d=_e.getBytes(n,h,h+s.topDictLength);u=Ea(n,0,[d],void 0,s.formatMajor)[0]}else{const h=Ea(n,e,o.objects,l.objects,s.formatMajor);if(h.length!==1)throw new Error("CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = "+h.length);u=h[0]}if(r.topDict=u,u._privateDict&&(t.defaultWidthX=u._privateDict.defaultWidthX,t.nominalWidthX=u._privateDict.nominalWidthX),s.formatMajor<2&&u.ros[0]!==void 0&&u.ros[1]!==void 0&&(t.isCIDFont=!0),s.formatMajor>1){let h=u.fdArray,d=u.fdSelect;if(!h)throw new Error("This is a CFF2 font, but FDArray information is missing");const p=yn(n,e+h,null,s.formatMajor),v=_x(n,e,p.objects);u._fdArray=v,d&&(u._fdSelect=Zl(n,e+d,t.numGlyphs,v.length,s.formatMajor))}else if(t.isCIDFont){let h=u.fdArray,d=u.fdSelect;if(h===0||d===0)throw new Error("Font is marked as a CID font, but FDArray and/or FDSelect information is missing");h+=e;const p=yn(n,h),v=Ea(n,e,p.objects,l.objects,s.formatMajor);u._fdArray=v,d+=e,u._fdSelect=Zl(n,d,t.numGlyphs,v.length,s.formatMajor)}if(s.formatMajor<2){const h=e+u.private[1],d=bo(n,h,u.private[0],l.objects,s.formatMajor);if(t.defaultWidthX=d.defaultWidthX,t.nominalWidthX=d.nominalWidthX,d.subrs!==0){const p=h+d.subrs,v=yn(n,p);t.subrs=v.objects,t.subrsBias=ws(t.subrs)}else t.subrs=[],t.subrsBias=0}let f;if(i.lowMemory?(f=lx(n,e+u.charStrings,s.formatMajor),t.nGlyphs=f.offsets.length-(s.formatMajor>1?1:0)):(f=yn(n,e+u.charStrings,null,s.formatMajor),t.nGlyphs=f.objects.length),s.formatMajor>1&&t.tables.maxp&&t.nGlyphs!==t.tables.maxp.numGlyphs&&console.error(`Glyph count in the CFF2 table (${t.nGlyphs}) must correspond to the glyph count in the maxp table (${t.tables.maxp.numGlyphs})`),s.formatMajor<2){let h=[],d=[];u.charset===0?h=qv:u.charset===1?h=Yv:u.charset===2?h=jv:h=yx(n,e+u.charset,t.nGlyphs,l.objects,t.isCIDFont),u.encoding===0?d=ja:u.encoding===1?d=$v:d=Sx(n,e+u.encoding),t.cffEncoding=new Au(d,h),t.encoding=t.encoding||t.cffEncoding}if(t.glyphs=new Cn.GlyphSet(t),i.lowMemory)t._push=function(h){const d=cx(h,f.offsets,n,e+u.charStrings,void 0,s.formatMajor);t.glyphs.push(h,Cn.cffGlyphLoader(t,h,$a,d,s.formatMajor))};else for(let h=0;h<t.nGlyphs;h+=1){const d=f.objects[h];t.glyphs.push(h,Cn.cffGlyphLoader(t,h,$a,d,s.formatMajor))}if(u.vstore){const h=new _e.Parser(n,e+u.vstore);u._vstore=h.parseVariationStore()}}function Uu(n,e){let t,i=fs.indexOf(n);return i>=0&&(t=i),i=e.indexOf(n),i>=0?t=i+fs.length:(t=fs.length+e.length,e.push(n)),t}function Tx(){return new ae.Record("Header",[{name:"major",type:"Card8",value:1},{name:"minor",type:"Card8",value:0},{name:"hdrSize",type:"Card8",value:4},{name:"major",type:"Card8",value:1}])}function Ex(n){const e=new ae.Record("Name INDEX",[{name:"names",type:"INDEX",value:[]}]);e.names=[];for(let t=0;t<n.length;t+=1)e.names.push({name:"name_"+t,type:"NAME",value:n[t]});return e}function Fu(n,e,t){const i={};for(let r=0;r<n.length;r+=1){const s=n[r];let a=e[s.name];a!==void 0&&!Pu(a,s.value)&&(s.type==="SID"&&(a=Uu(a,t)),i[s.op]={name:s.name,type:s.type,value:a})}return i}function Kl(n,e,t){const i=new ae.Record("Top DICT",[{name:"dict",type:"DICT",value:{}}]);return i.dict=Fu(Lu,n,e),i}function Jl(n){const e=new ae.Record("Top DICT INDEX",[{name:"topDicts",type:"INDEX",value:[]}]);return e.topDicts=[{name:"topDict_0",type:"TABLE",value:n}],e}function Ax(n){const e=new ae.Record("String INDEX",[{name:"strings",type:"INDEX",value:[]}]);e.strings=[];for(let t=0;t<n.length;t+=1)e.strings.push({name:"string_"+t,type:"STRING",value:n[t]});return e}function Cx(){return new ae.Record("Global Subr INDEX",[{name:"subrs",type:"INDEX",value:[]}])}function Rx(n,e){const t=new ae.Record("Charsets",[{name:"format",type:"Card8",value:0}]);for(let i=0;i<n.length;i+=1){const r=n[i],s=Uu(r,e);t.fields.push({name:"glyph_"+i,type:"SID",value:s})}return t}function wx(n,e){const t=[],i=n.path;t.push({name:"width",type:"NUMBER",value:n.advanceWidth});let r=0,s=0;for(let a=0;a<i.commands.length;a+=1){let o,l,c=i.commands[a];if(c.type==="Q"){const u=.3333333333333333,f=2/3;c={type:"C",x:c.x,y:c.y,x1:Math.round(u*r+f*c.x1),y1:Math.round(u*s+f*c.y1),x2:Math.round(u*c.x+f*c.x1),y2:Math.round(u*c.y+f*c.y1)}}if(c.type==="M")o=Math.round(c.x-r),l=Math.round(c.y-s),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rmoveto",type:"OP",value:21}),r=Math.round(c.x),s=Math.round(c.y);else if(c.type==="L")o=Math.round(c.x-r),l=Math.round(c.y-s),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rlineto",type:"OP",value:5}),r=Math.round(c.x),s=Math.round(c.y);else if(c.type==="C"){const u=Math.round(c.x1-r),f=Math.round(c.y1-s),h=Math.round(c.x2-c.x1),d=Math.round(c.y2-c.y1);o=Math.round(c.x-c.x2),l=Math.round(c.y-c.y2),t.push({name:"dx1",type:"NUMBER",value:u}),t.push({name:"dy1",type:"NUMBER",value:f}),t.push({name:"dx2",type:"NUMBER",value:h}),t.push({name:"dy2",type:"NUMBER",value:d}),t.push({name:"dx",type:"NUMBER",value:o}),t.push({name:"dy",type:"NUMBER",value:l}),t.push({name:"rrcurveto",type:"OP",value:8}),r=Math.round(c.x),s=Math.round(c.y)}}return t.push({name:"endchar",type:"OP",value:14}),t}function Px(n,e){const t=new ae.Record("CharStrings INDEX",[{name:"charStrings",type:"INDEX",value:[]}]);for(let i=0;i<n.length;i+=1){const r=n.get(i),s=wx(r);t.charStrings.push({name:r.name,type:"CHARSTRING",value:s})}return t}function Lx(n,e,t){const i=new ae.Record("Private DICT",[{name:"dict",type:"DICT",value:{}}]);return i.dict=Fu(Du,n,e),i}function Dx(n,e){const t=new ae.Table("CFF ",[{name:"header",type:"RECORD"},{name:"nameIndex",type:"RECORD"},{name:"topDictIndex",type:"RECORD"},{name:"stringIndex",type:"RECORD"},{name:"globalSubrIndex",type:"RECORD"},{name:"charsets",type:"RECORD"},{name:"charStringsIndex",type:"RECORD"},{name:"privateDict",type:"RECORD"}]),i=1/e.unitsPerEm,r={version:e.version,fullName:e.fullName,familyName:e.familyName,weight:e.weightName,fontBBox:e.fontBBox||[0,0,0,0],fontMatrix:[i,0,0,i,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]},s=e&&e.topDict||{};s.paintType&&(r.paintType=s.paintType,r.strokeWidth=s.strokeWidth||0);const a={},o=[];let l;for(let h=1;h<n.length;h+=1)l=n.get(h),o.push(l.name);const c=[];t.header=Tx(),t.nameIndex=Ex([e.postScriptName]);let u=Kl(r,c);t.topDictIndex=Jl(u),t.globalSubrIndex=Cx(),t.charsets=Rx(o,c),t.charStringsIndex=Px(n),t.privateDict=Lx(a,c),t.stringIndex=Ax(c);const f=t.header.sizeOf()+t.nameIndex.sizeOf()+t.topDictIndex.sizeOf()+t.stringIndex.sizeOf()+t.globalSubrIndex.sizeOf();return r.charset=f,r.encoding=0,r.charStrings=r.charset+t.charsets.sizeOf(),r.private[1]=r.charStrings+t.charStringsIndex.sizeOf(),u=Kl(r,c),t.topDictIndex=Jl(u),t}var Za={parse:Mx,make:Dx};function Ix(n,e){const t={},i=new _e.Parser(n,e);return t.version=i.parseVersion(),t.fontRevision=Math.round(i.parseFixed()*1e3)/1e3,t.checkSumAdjustment=i.parseULong(),t.magicNumber=i.parseULong(),Ie.argument(t.magicNumber===1594834165,"Font header has wrong magic number."),t.flags=i.parseUShort(),t.unitsPerEm=i.parseUShort(),t.created=i.parseLongDateTime(),t.modified=i.parseLongDateTime(),t.xMin=i.parseShort(),t.yMin=i.parseShort(),t.xMax=i.parseShort(),t.yMax=i.parseShort(),t.macStyle=i.parseUShort(),t.lowestRecPPEM=i.parseUShort(),t.fontDirectionHint=i.parseShort(),t.indexToLocFormat=i.parseShort(),t.glyphDataFormat=i.parseShort(),t}function Ux(n){const e=Math.round(new Date().getTime()/1e3)+2082844800;let t=e,i=n.macStyle||0;return n.createdTimestamp&&(t=n.createdTimestamp+2082844800),new ae.Table("head",[{name:"version",type:"FIXED",value:65536},{name:"fontRevision",type:"FIXED",value:65536},{name:"checkSumAdjustment",type:"ULONG",value:0},{name:"magicNumber",type:"ULONG",value:1594834165},{name:"flags",type:"USHORT",value:0},{name:"unitsPerEm",type:"USHORT",value:1e3},{name:"created",type:"LONGDATETIME",value:t},{name:"modified",type:"LONGDATETIME",value:e},{name:"xMin",type:"SHORT",value:0},{name:"yMin",type:"SHORT",value:0},{name:"xMax",type:"SHORT",value:0},{name:"yMax",type:"SHORT",value:0},{name:"macStyle",type:"USHORT",value:i},{name:"lowestRecPPEM",type:"USHORT",value:0},{name:"fontDirectionHint",type:"SHORT",value:2},{name:"indexToLocFormat",type:"SHORT",value:0},{name:"glyphDataFormat",type:"SHORT",value:0}],n)}var Ou={parse:Ix,make:Ux};function Fx(n,e){const t={},i=new _e.Parser(n,e);return t.version=i.parseVersion(),t.ascender=i.parseShort(),t.descender=i.parseShort(),t.lineGap=i.parseShort(),t.advanceWidthMax=i.parseUShort(),t.minLeftSideBearing=i.parseShort(),t.minRightSideBearing=i.parseShort(),t.xMaxExtent=i.parseShort(),t.caretSlopeRise=i.parseShort(),t.caretSlopeRun=i.parseShort(),t.caretOffset=i.parseShort(),i.relativeOffset+=8,t.metricDataFormat=i.parseShort(),t.numberOfHMetrics=i.parseUShort(),t}function Ox(n){return new ae.Table("hhea",[{name:"version",type:"FIXED",value:65536},{name:"ascender",type:"FWORD",value:0},{name:"descender",type:"FWORD",value:0},{name:"lineGap",type:"FWORD",value:0},{name:"advanceWidthMax",type:"UFWORD",value:0},{name:"minLeftSideBearing",type:"FWORD",value:0},{name:"minRightSideBearing",type:"FWORD",value:0},{name:"xMaxExtent",type:"FWORD",value:0},{name:"caretSlopeRise",type:"SHORT",value:1},{name:"caretSlopeRun",type:"SHORT",value:0},{name:"caretOffset",type:"SHORT",value:0},{name:"reserved1",type:"SHORT",value:0},{name:"reserved2",type:"SHORT",value:0},{name:"reserved3",type:"SHORT",value:0},{name:"reserved4",type:"SHORT",value:0},{name:"metricDataFormat",type:"SHORT",value:0},{name:"numberOfHMetrics",type:"USHORT",value:0}],n)}var Nu={parse:Fx,make:Ox};function Nx(n,e,t,i,r){let s,a;const o=new _e.Parser(n,e);for(let l=0;l<i;l+=1){l<t&&(s=o.parseUShort(),a=o.parseShort());const c=r.get(l);c.advanceWidth=s,c.leftSideBearing=a}}function Bx(n,e,t,i,r){n._hmtxTableData={};let s,a;const o=new _e.Parser(e,t);for(let l=0;l<r;l+=1)l<i&&(s=o.parseUShort(),a=o.parseShort()),n._hmtxTableData[l]={advanceWidth:s,leftSideBearing:a}}function kx(n,e,t,i,r,s,a){a.lowMemory?Bx(n,e,t,i,r):Nx(e,t,i,r,s)}function Gx(n){const e=new ae.Table("hmtx",[]);for(let t=0;t<n.length;t+=1){const i=n.get(t),r=i.advanceWidth||0,s=i.leftSideBearing||0;e.fields.push({name:"advanceWidth_"+t,type:"USHORT",value:r}),e.fields.push({name:"leftSideBearing_"+t,type:"SHORT",value:s})}return e}var Bu={parse:kx,make:Gx};function Vx(n){const e=new ae.Table("ltag",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"numTags",type:"ULONG",value:n.length}]);let t="";const i=12+n.length*4;for(let r=0;r<n.length;++r){let s=t.indexOf(n[r]);s<0&&(s=t.length,t+=n[r]),e.fields.push({name:"offset "+r,type:"USHORT",value:i+s}),e.fields.push({name:"length "+r,type:"USHORT",value:n[r].length})}return e.fields.push({name:"stringPool",type:"CHARARRAY",value:t}),e}function zx(n,e){const t=new _e.Parser(n,e),i=t.parseULong();Ie.argument(i===1,"Unsupported ltag table version."),t.skip("uLong",1);const r=t.parseULong(),s=[];for(let a=0;a<r;a++){let o="";const l=e+t.parseUShort(),c=t.parseUShort();for(let u=l;u<l+c;++u)o+=String.fromCharCode(n.getInt8(u));s.push(o)}return s}var ku={make:Vx,parse:zx};function Hx(n,e){const t={},i=new _e.Parser(n,e);return t.version=i.parseVersion(),t.numGlyphs=i.parseUShort(),t.version===1&&(t.maxPoints=i.parseUShort(),t.maxContours=i.parseUShort(),t.maxCompositePoints=i.parseUShort(),t.maxCompositeContours=i.parseUShort(),t.maxZones=i.parseUShort(),t.maxTwilightPoints=i.parseUShort(),t.maxStorage=i.parseUShort(),t.maxFunctionDefs=i.parseUShort(),t.maxInstructionDefs=i.parseUShort(),t.maxStackElements=i.parseUShort(),t.maxSizeOfInstructions=i.parseUShort(),t.maxComponentElements=i.parseUShort(),t.maxComponentDepth=i.parseUShort()),t}function Wx(n){return new ae.Table("maxp",[{name:"version",type:"FIXED",value:20480},{name:"numGlyphs",type:"USHORT",value:n}])}var Gu={parse:Hx,make:Wx},Ka=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}];function Xx(n){for(let e=0;e<Ka.length;e+=1){const t=Ka[e];if(n>=t.begin&&n<t.end)return e}return-1}function qx(n,e){const t={},i=new _e.Parser(n,e);t.version=i.parseUShort(),t.xAvgCharWidth=i.parseShort(),t.usWeightClass=i.parseUShort(),t.usWidthClass=i.parseUShort(),t.fsType=i.parseUShort(),t.ySubscriptXSize=i.parseShort(),t.ySubscriptYSize=i.parseShort(),t.ySubscriptXOffset=i.parseShort(),t.ySubscriptYOffset=i.parseShort(),t.ySuperscriptXSize=i.parseShort(),t.ySuperscriptYSize=i.parseShort(),t.ySuperscriptXOffset=i.parseShort(),t.ySuperscriptYOffset=i.parseShort(),t.yStrikeoutSize=i.parseShort(),t.yStrikeoutPosition=i.parseShort(),t.sFamilyClass=i.parseShort(),t.panose=[];for(let r=0;r<10;r++)t.panose[r]=i.parseByte();return t.ulUnicodeRange1=i.parseULong(),t.ulUnicodeRange2=i.parseULong(),t.ulUnicodeRange3=i.parseULong(),t.ulUnicodeRange4=i.parseULong(),t.achVendID=String.fromCharCode(i.parseByte(),i.parseByte(),i.parseByte(),i.parseByte()),t.fsSelection=i.parseUShort(),t.usFirstCharIndex=i.parseUShort(),t.usLastCharIndex=i.parseUShort(),t.sTypoAscender=i.parseShort(),t.sTypoDescender=i.parseShort(),t.sTypoLineGap=i.parseShort(),t.usWinAscent=i.parseUShort(),t.usWinDescent=i.parseUShort(),t.version>=1&&(t.ulCodePageRange1=i.parseULong(),t.ulCodePageRange2=i.parseULong()),t.version>=2&&(t.sxHeight=i.parseShort(),t.sCapHeight=i.parseShort(),t.usDefaultChar=i.parseUShort(),t.usBreakChar=i.parseUShort(),t.usMaxContent=i.parseUShort()),t}function Yx(n){return new ae.Table("OS/2",[{name:"version",type:"USHORT",value:3},{name:"xAvgCharWidth",type:"SHORT",value:0},{name:"usWeightClass",type:"USHORT",value:0},{name:"usWidthClass",type:"USHORT",value:0},{name:"fsType",type:"USHORT",value:0},{name:"ySubscriptXSize",type:"SHORT",value:650},{name:"ySubscriptYSize",type:"SHORT",value:699},{name:"ySubscriptXOffset",type:"SHORT",value:0},{name:"ySubscriptYOffset",type:"SHORT",value:140},{name:"ySuperscriptXSize",type:"SHORT",value:650},{name:"ySuperscriptYSize",type:"SHORT",value:699},{name:"ySuperscriptXOffset",type:"SHORT",value:0},{name:"ySuperscriptYOffset",type:"SHORT",value:479},{name:"yStrikeoutSize",type:"SHORT",value:49},{name:"yStrikeoutPosition",type:"SHORT",value:258},{name:"sFamilyClass",type:"SHORT",value:0},{name:"bFamilyType",type:"BYTE",value:0},{name:"bSerifStyle",type:"BYTE",value:0},{name:"bWeight",type:"BYTE",value:0},{name:"bProportion",type:"BYTE",value:0},{name:"bContrast",type:"BYTE",value:0},{name:"bStrokeVariation",type:"BYTE",value:0},{name:"bArmStyle",type:"BYTE",value:0},{name:"bLetterform",type:"BYTE",value:0},{name:"bMidline",type:"BYTE",value:0},{name:"bXHeight",type:"BYTE",value:0},{name:"ulUnicodeRange1",type:"ULONG",value:0},{name:"ulUnicodeRange2",type:"ULONG",value:0},{name:"ulUnicodeRange3",type:"ULONG",value:0},{name:"ulUnicodeRange4",type:"ULONG",value:0},{name:"achVendID",type:"CHARARRAY",value:"XXXX"},{name:"fsSelection",type:"USHORT",value:0},{name:"usFirstCharIndex",type:"USHORT",value:0},{name:"usLastCharIndex",type:"USHORT",value:0},{name:"sTypoAscender",type:"SHORT",value:0},{name:"sTypoDescender",type:"SHORT",value:0},{name:"sTypoLineGap",type:"SHORT",value:0},{name:"usWinAscent",type:"USHORT",value:0},{name:"usWinDescent",type:"USHORT",value:0},{name:"ulCodePageRange1",type:"ULONG",value:0},{name:"ulCodePageRange2",type:"ULONG",value:0},{name:"sxHeight",type:"SHORT",value:0},{name:"sCapHeight",type:"SHORT",value:0},{name:"usDefaultChar",type:"USHORT",value:0},{name:"usBreakChar",type:"USHORT",value:0},{name:"usMaxContext",type:"USHORT",value:0}],n)}var Ja={parse:qx,make:Yx,unicodeRanges:Ka,getUnicodeRange:Xx};function jx(n,e){const t={},i=new _e.Parser(n,e);switch(t.version=i.parseVersion(),t.italicAngle=i.parseFixed(),t.underlinePosition=i.parseShort(),t.underlineThickness=i.parseShort(),t.isFixedPitch=i.parseULong(),t.minMemType42=i.parseULong(),t.maxMemType42=i.parseULong(),t.minMemType1=i.parseULong(),t.maxMemType1=i.parseULong(),t.version){case 1:t.names=hi.slice();break;case 2:t.numberOfGlyphs=i.parseUShort(),t.glyphNameIndex=new Array(t.numberOfGlyphs);for(let r=0;r<t.numberOfGlyphs;r++)t.glyphNameIndex[r]=i.parseUShort();t.names=[];for(let r=0;r<t.numberOfGlyphs;r++)if(t.glyphNameIndex[r]>=hi.length){const s=i.parseChar();t.names.push(i.parseString(s))}break;case 2.5:t.numberOfGlyphs=i.parseUShort(),t.offset=new Array(t.numberOfGlyphs);for(let r=0;r<t.numberOfGlyphs;r++)t.offset[r]=i.parseChar();break}return t}function $x(n){const{italicAngle:e=Math.round((n.italicAngle||0)*65536),underlinePosition:t=0,underlineThickness:i=0,isFixedPitch:r=0,minMemType42:s=0,maxMemType42:a=0,minMemType1:o=0,maxMemType1:l=0}=n.tables.post||{};return new ae.Table("post",[{name:"version",type:"FIXED",value:196608},{name:"italicAngle",type:"FIXED",value:e},{name:"underlinePosition",type:"FWORD",value:t},{name:"underlineThickness",type:"FWORD",value:i},{name:"isFixedPitch",type:"ULONG",value:r},{name:"minMemType42",type:"ULONG",value:s},{name:"maxMemType42",type:"ULONG",value:a},{name:"minMemType1",type:"ULONG",value:o},{name:"maxMemType1",type:"ULONG",value:l}])}var Vu={parse:jx,make:$x},fn=new Array(9);fn[1]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer(N.coverage),deltaGlyphId:this.parseShort()};if(t===2)return{substFormat:2,coverage:this.parsePointer(N.coverage),substitute:this.parseOffset16List()};Ie.assert(!1,"0x"+e.toString(16)+": lookup type 1 format must be 1 or 2.")};fn[2]=function(){const e=this.parseUShort();return Ie.argument(e===1,"GSUB Multiple Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(N.coverage),sequences:this.parseListOfLists()}};fn[3]=function(){const e=this.parseUShort();return Ie.argument(e===1,"GSUB Alternate Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(N.coverage),alternateSets:this.parseListOfLists()}};fn[4]=function(){const e=this.parseUShort();return Ie.argument(e===1,"GSUB ligature table identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(N.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)}})}};var Hi={sequenceIndex:N.uShort,lookupListIndex:N.uShort};fn[5]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:t,coverage:this.parsePointer(N.coverage),ruleSets:this.parseListOfLists(function(){const i=this.parseUShort(),r=this.parseUShort();return{input:this.parseUShortList(i-1),lookupRecords:this.parseRecordList(r,Hi)}})};if(t===2)return{substFormat:t,coverage:this.parsePointer(N.coverage),classDef:this.parsePointer(N.classDef),classSets:this.parseListOfLists(function(){const i=this.parseUShort(),r=this.parseUShort();return{classes:this.parseUShortList(i-1),lookupRecords:this.parseRecordList(r,Hi)}})};if(t===3){const i=this.parseUShort(),r=this.parseUShort();return{substFormat:t,coverages:this.parseList(i,N.pointer(N.coverage)),lookupRecords:this.parseRecordList(r,Hi)}}Ie.assert(!1,"0x"+e.toString(16)+": lookup type 5 format must be 1, 2 or 3.")};fn[6]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{substFormat:1,coverage:this.parsePointer(N.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(Hi)}})};if(t===2)return{substFormat:2,coverage:this.parsePointer(N.coverage),backtrackClassDef:this.parsePointer(N.classDef),inputClassDef:this.parsePointer(N.classDef),lookaheadClassDef:this.parsePointer(N.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(Hi)}})};if(t===3)return{substFormat:3,backtrackCoverage:this.parseList(N.pointer(N.coverage)),inputCoverage:this.parseList(N.pointer(N.coverage)),lookaheadCoverage:this.parseList(N.pointer(N.coverage)),lookupRecords:this.parseRecordList(Hi)};Ie.assert(!1,"0x"+e.toString(16)+": lookup type 6 format must be 1, 2 or 3.")};fn[7]=function(){const e=this.parseUShort();Ie.argument(e===1,"GSUB Extension Substitution subtable identifier-format must be 1");const t=this.parseUShort(),i=new N(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:t,extension:fn[t].call(i)}};fn[8]=function(){const e=this.parseUShort();return Ie.argument(e===1,"GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"),{substFormat:e,coverage:this.parsePointer(N.coverage),backtrackCoverage:this.parseList(N.pointer(N.coverage)),lookaheadCoverage:this.parseList(N.pointer(N.coverage)),substitutes:this.parseUShortList()}};function Zx(n,e){e=e||0;const t=new N(n,e),i=t.parseVersion(1);return Ie.argument(i===1||i===1.1,"Unsupported GSUB table version."),i===1?{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(fn)}:{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(fn),variations:t.parseFeatureVariationsList()}}var yi=new Array(9);yi[1]=function(e){if(e.substFormat===1)return new ae.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)},{name:"deltaGlyphID",type:"SHORT",value:e.deltaGlyphId}]);if(e.substFormat===2)return new ae.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:2},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.ushortList("substitute",e.substitute)));Ie.fail("Lookup type 1 substFormat must be 1 or 2.")};yi[2]=function(e){return Ie.assert(e.substFormat===1,"Lookup type 2 substFormat must be 1."),new ae.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.tableList("seqSet",e.sequences,function(t){return new ae.Table("sequenceSetTable",ae.ushortList("sequence",t))})))};yi[3]=function(e){return Ie.assert(e.substFormat===1,"Lookup type 3 substFormat must be 1."),new ae.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.tableList("altSet",e.alternateSets,function(t){return new ae.Table("alternateSetTable",ae.ushortList("alternate",t))})))};yi[4]=function(e){return Ie.assert(e.substFormat===1,"Lookup type 4 substFormat must be 1."),new ae.Table("substitutionTable",[{name:"substFormat",type:"USHORT",value:1},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.tableList("ligSet",e.ligatureSets,function(t){return new ae.Table("ligatureSetTable",ae.tableList("ligature",t,function(i){return new ae.Table("ligatureTable",[{name:"ligGlyph",type:"USHORT",value:i.ligGlyph}].concat(ae.ushortList("component",i.components,i.components.length+1)))}))})))};yi[5]=function(e){if(e.substFormat===1)return new ae.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.tableList("sequenceRuleSet",e.ruleSets,function(t){return t?new ae.Table("sequenceRuleSetTable",ae.tableList("sequenceRule",t,function(i){let r=ae.ushortList("seqLookup",[],i.lookupRecords.length).concat(ae.ushortList("inputSequence",i.input,i.input.length+1));[r[0],r[1]]=[r[1],r[0]];for(let s=0;s<i.lookupRecords.length;s++){const a=i.lookupRecords[s];r=r.concat({name:"sequenceIndex"+s,type:"USHORT",value:a.sequenceIndex}).concat({name:"lookupListIndex"+s,type:"USHORT",value:a.lookupListIndex})}return new ae.Table("sequenceRuleTable",r)})):new ae.Table("NULL",null)})));if(e.substFormat===2)return new ae.Table("contextualSubstitutionTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)},{name:"classDef",type:"TABLE",value:new ae.ClassDef(e.classDef)}].concat(ae.tableList("classSeqRuleSet",e.classSets,function(t){return t?new ae.Table("classSeqRuleSetTable",ae.tableList("classSeqRule",t,function(i){let r=ae.ushortList("classes",i.classes,i.classes.length+1).concat(ae.ushortList("seqLookupCount",[],i.lookupRecords.length));for(let s=0;s<i.lookupRecords.length;s++){const a=i.lookupRecords[s];r=r.concat({name:"sequenceIndex"+s,type:"USHORT",value:a.sequenceIndex}).concat({name:"lookupListIndex"+s,type:"USHORT",value:a.lookupListIndex})}return new ae.Table("classSeqRuleTable",r)})):new ae.Table("NULL",null)})));if(e.substFormat===3){let t=[{name:"substFormat",type:"USHORT",value:e.substFormat}];t.push({name:"inputGlyphCount",type:"USHORT",value:e.coverages.length}),t.push({name:"substitutionCount",type:"USHORT",value:e.lookupRecords.length});for(let r=0;r<e.coverages.length;r++){const s=e.coverages[r];t.push({name:"inputCoverage"+r,type:"TABLE",value:new ae.Coverage(s)})}for(let r=0;r<e.lookupRecords.length;r++){const s=e.lookupRecords[r];t=t.concat({name:"sequenceIndex"+r,type:"USHORT",value:s.sequenceIndex}).concat({name:"lookupListIndex"+r,type:"USHORT",value:s.lookupListIndex})}return new ae.Table("contextualSubstitutionTable",t)}Ie.assert(!1,"lookup type 5 format must be 1, 2 or 3.")};yi[6]=function(e){if(e.substFormat===1)return new ae.Table("chainContextTable",[{name:"substFormat",type:"USHORT",value:e.substFormat},{name:"coverage",type:"TABLE",value:new ae.Coverage(e.coverage)}].concat(ae.tableList("chainRuleSet",e.chainRuleSets,function(i){return new ae.Table("chainRuleSetTable",ae.tableList("chainRule",i,function(r){let s=ae.ushortList("backtrackGlyph",r.backtrack,r.backtrack.length).concat(ae.ushortList("inputGlyph",r.input,r.input.length+1)).concat(ae.ushortList("lookaheadGlyph",r.lookahead,r.lookahead.length)).concat(ae.ushortList("substitution",[],r.lookupRecords.length));for(let a=0;a<r.lookupRecords.length;a++){const o=r.lookupRecords[a];s=s.concat({name:"sequenceIndex"+a,type:"USHORT",value:o.sequenceIndex}).concat({name:"lookupListIndex"+a,type:"USHORT",value:o.lookupListIndex})}return new ae.Table("chainRuleTable",s)}))})));if(e.substFormat===2)Ie.assert(!1,"lookup type 6 format 2 is not yet supported.");else if(e.substFormat===3){let t=[{name:"substFormat",type:"USHORT",value:e.substFormat}];t.push({name:"backtrackGlyphCount",type:"USHORT",value:e.backtrackCoverage.length});for(let r=0;r<e.backtrackCoverage.length;r++){const s=e.backtrackCoverage[r];t.push({name:"backtrackCoverage"+r,type:"TABLE",value:new ae.Coverage(s)})}t.push({name:"inputGlyphCount",type:"USHORT",value:e.inputCoverage.length});for(let r=0;r<e.inputCoverage.length;r++){const s=e.inputCoverage[r];t.push({name:"inputCoverage"+r,type:"TABLE",value:new ae.Coverage(s)})}t.push({name:"lookaheadGlyphCount",type:"USHORT",value:e.lookaheadCoverage.length});for(let r=0;r<e.lookaheadCoverage.length;r++){const s=e.lookaheadCoverage[r];t.push({name:"lookaheadCoverage"+r,type:"TABLE",value:new ae.Coverage(s)})}t.push({name:"substitutionCount",type:"USHORT",value:e.lookupRecords.length});for(let r=0;r<e.lookupRecords.length;r++){const s=e.lookupRecords[r];t=t.concat({name:"sequenceIndex"+r,type:"USHORT",value:s.sequenceIndex}).concat({name:"lookupListIndex"+r,type:"USHORT",value:s.lookupListIndex})}return new ae.Table("chainContextTable",t)}Ie.assert(!1,"lookup type 6 format must be 1, 2 or 3.")};function Kx(n){return new ae.Table("GSUB",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new ae.ScriptList(n.scripts)},{name:"features",type:"TABLE",value:new ae.FeatureList(n.features)},{name:"lookups",type:"TABLE",value:new ae.LookupList(n.lookups,yi)}])}var zu={parse:Zx,make:Kx};function Jx(n,e){const t=new _e.Parser(n,e),i=t.parseULong();Ie.argument(i===1,"Unsupported META table version."),t.parseULong(),t.parseULong();const r=t.parseULong(),s={};for(let a=0;a<r;a++){const o=t.parseTag(),l=t.parseULong(),c=t.parseULong();if(o==="appl"||o==="bild")continue;const u=ji.UTF8(n,e+l,c);s[o]=u}return s}function Qx(n){const e=Object.keys(n).length;let t="";const i=16+e*12,r=new ae.Table("meta",[{name:"version",type:"ULONG",value:1},{name:"flags",type:"ULONG",value:0},{name:"offset",type:"ULONG",value:i},{name:"numTags",type:"ULONG",value:e}]);for(let s in n){const a=t.length;t+=n[s],r.fields.push({name:"tag "+s,type:"TAG",value:s}),r.fields.push({name:"offset "+s,type:"ULONG",value:i+a}),r.fields.push({name:"length "+s,type:"ULONG",value:n[s].length})}return r.fields.push({name:"stringPool",type:"CHARARRAY",value:t}),r}var Hu={parse:Jx,make:Qx};function e_(n,e){const t=new N(n,e),i=t.parseUShort();i!==0&&console.warn("Only COLRv0 is currently fully supported. A subset of color glyphs might be available in this font if provided in the v0 format.");const r=t.parseUShort(),s=t.parseOffset32(),a=t.parseOffset32(),o=t.parseUShort();t.relativeOffset=s;const l=t.parseRecordList(r,{glyphID:N.uShort,firstLayerIndex:N.uShort,numLayers:N.uShort});t.relativeOffset=a;const c=t.parseRecordList(o,{glyphID:N.uShort,paletteIndex:N.uShort});return{version:i,baseGlyphRecords:l,layerRecords:c}}function t_({version:n=0,baseGlyphRecords:e=[],layerRecords:t=[]}){Ie.argument(n===0,"Only COLRv0 supported.");const i=14,r=i+e.length*6;return new ae.Table("COLR",[{name:"version",type:"USHORT",value:n},{name:"numBaseGlyphRecords",type:"USHORT",value:e.length},{name:"baseGlyphRecordsOffset",type:"ULONG",value:i},{name:"layerRecordsOffset",type:"ULONG",value:r},{name:"numLayerRecords",type:"USHORT",value:t.length},...e.map((s,a)=>[{name:"glyphID_"+a,type:"USHORT",value:s.glyphID},{name:"firstLayerIndex_"+a,type:"USHORT",value:s.firstLayerIndex},{name:"numLayers_"+a,type:"USHORT",value:s.numLayers}]).flat(),...t.map((s,a)=>[{name:"LayerGlyphID_"+a,type:"USHORT",value:s.glyphID},{name:"paletteIndex_"+a,type:"USHORT",value:s.paletteIndex}]).flat()])}var Wu={parse:e_,make:t_};function n_(n,e){return[{name:"tag_"+n,type:"TAG",value:e.tag},{name:"minValue_"+n,type:"FIXED",value:e.minValue<<16},{name:"defaultValue_"+n,type:"FIXED",value:e.defaultValue<<16},{name:"maxValue_"+n,type:"FIXED",value:e.maxValue<<16},{name:"flags_"+n,type:"USHORT",value:0},{name:"nameID_"+n,type:"USHORT",value:e.axisNameID}]}function i_(n,e,t){const i={},r=new _e.Parser(n,e);i.tag=r.parseTag(),i.minValue=r.parseFixed(),i.defaultValue=r.parseFixed(),i.maxValue=r.parseFixed(),r.skip("uShort",1);const s=r.parseUShort();return i.axisNameID=s,i.name=Cs(t,s),i}function r_(n,e,t,i={}){const r=[{name:"nameID_"+n,type:"USHORT",value:e.subfamilyNameID},{name:"flags_"+n,type:"USHORT",value:0}];for(let s=0;s<t.length;++s){const a=t[s].tag;r.push({name:"axis_"+n+" "+a,type:"FIXED",value:e.coordinates[a]<<16})}return i&&i.postScriptNameID&&r.push({name:"postScriptNameID_",type:"USHORT",value:e.postScriptNameID!==void 0?e.postScriptNameID:65535}),r}function s_(n,e,t,i,r){const s={},a=new _e.Parser(n,e),o=a.parseUShort();s.subfamilyNameID=o,s.name=Cs(i,o,[2,17]),a.skip("uShort",1),s.coordinates={};for(let c=0;c<t.length;++c)s.coordinates[t[c].tag]=a.parseFixed();if(a.relativeOffset===r)return s.postScriptNameID=void 0,s.postScriptName=void 0,s;const l=a.parseUShort();return s.postScriptNameID=l==65535?void 0:l,s.postScriptName=s.postScriptNameID!==void 0?Cs(i,l,[6]):"",s}function a_(n,e){const t=new ae.Table("fvar",[{name:"version",type:"ULONG",value:65536},{name:"offsetToData",type:"USHORT",value:0},{name:"countSizePairs",type:"USHORT",value:2},{name:"axisCount",type:"USHORT",value:n.axes.length},{name:"axisSize",type:"USHORT",value:20},{name:"instanceCount",type:"USHORT",value:n.instances.length},{name:"instanceSize",type:"USHORT",value:4+n.axes.length*4}]);t.offsetToData=t.sizeOf();for(let r=0;r<n.axes.length;r++)t.fields=t.fields.concat(n_(r,n.axes[r]));const i={};for(let r=0;r<n.instances.length;r++)if(n.instances[r].postScriptNameID!==void 0){t.instanceSize+=2,i.postScriptNameID=!0;break}for(let r=0;r<n.instances.length;r++)t.fields=t.fields.concat(r_(r,n.instances[r],n.axes,i));return t}function o_(n,e,t){const i=new _e.Parser(n,e),r=i.parseULong();Ie.argument(r===65536,"Unsupported fvar table version.");const s=i.parseOffset16();i.skip("uShort",1);const a=i.parseUShort(),o=i.parseUShort(),l=i.parseUShort(),c=i.parseUShort(),u=[];for(let d=0;d<a;d++)u.push(i_(n,e+s+d*o,t));const f=[],h=e+s+a*o;for(let d=0;d<l;d++)f.push(s_(n,h+d*c,u,t,c));return{axes:u,instances:f}}var Xu={make:a_,parse:o_},l_={tag:N.tag,nameID:N.uShort,ordering:N.uShort},Rr=new Array(5);Rr[1]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed()}};Rr[2]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),nominalValue:this.parseFixed(),rangeMinValue:this.parseFixed(),rangeMaxValue:this.parseFixed()}};Rr[3]=function(){return{axisIndex:this.parseUShort(),flags:this.parseUShort(),valueNameID:this.parseUShort(),value:this.parseFixed(),linkedValue:this.parseFixed()}};Rr[4]=function(){const e=this.parseUShort();return{flags:this.parseUShort(),valueNameID:this.parseUShort(),axisValues:this.parseList(e,function(){return{axisIndex:this.parseUShort(),value:this.parseFixed()}})}};function c_(){const n=this.parseUShort(),e=Rr[n],t={format:n};return e===void 0?(console.warn(`Unknown axis value table format ${n}`),t):Object.assign(t,this.parseStruct(e.bind(this)))}function u_(n,e,t){e||(e=0);const i=new _e.Parser(n,e),r=i.parseUShort(),s=i.parseUShort();r!==1&&console.warn(`Unsupported STAT table version ${r}.${s}`);const a=[r,s],o=i.parseUShort(),l=i.parseUShort(),c=i.parseOffset32(),u=i.parseUShort(),f=i.parseOffset32(),h=r>1||s>0?i.parseUShort():void 0;t!==void 0&&Ie.argument(l>=t.axes.length,"STAT axis count must be greater than or equal to fvar axis count"),u>0&&Ie.argument(l>=0,"STAT axis count must be greater than 0 if STAT axis value count is greater than 0");const d=[];for(let m=0;m<l;m++)i.offset=e+c,i.relativeOffset=m*o,d.push(i.parseStruct(l_));i.offset=e,i.relativeOffset=f;const p=i.parseUShortList(u),v=[];for(let m=0;m<u;m++)i.offset=e+f,i.relativeOffset=p[m],v.push(c_.apply(i));return{version:a,axes:d,values:v,elidedFallbackNameID:h}}var wr=new Array(5);wr[1]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:1},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`value${e}`,type:"FLOAT",value:t.value}]};wr[2]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:2},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`nominalValue${e}`,type:"FLOAT",value:t.nominalValue},{name:`rangeMinValue${e}`,type:"FLOAT",value:t.rangeMinValue},{name:`rangeMaxValue${e}`,type:"FLOAT",value:t.rangeMaxValue}]};wr[3]=function(e,t){return[{name:`format${e}`,type:"USHORT",value:3},{name:`axisIndex${e}`,type:"USHORT",value:t.axisIndex},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID},{name:`value${e}`,type:"FLOAT",value:t.value},{name:`linkedValue${e}`,type:"FLOAT",value:t.linkedValue}]};wr[4]=function(e,t){let i=[{name:`format${e}`,type:"USHORT",value:4},{name:`axisCount${e}`,type:"USHORT",value:t.axisValues.length},{name:`flags${e}`,type:"USHORT",value:t.flags},{name:`valueNameID${e}`,type:"USHORT",value:t.valueNameID}];for(let r=0;r<t.axisValues.length;r++)i=i.concat([{name:`format${e}axisIndex${r}`,type:"USHORT",value:t.axisValues[r].axisIndex},{name:`format${e}value${r}`,type:"FLOAT",value:t.axisValues[r].value}]);return i};function h_(n,e){return new ae.Record("axisRecord_"+n,[{name:"axisTag_"+n,type:"TAG",value:e.tag},{name:"axisNameID_"+n,type:"USHORT",value:e.nameID},{name:"axisOrdering_"+n,type:"USHORT",value:e.ordering}])}function f_(n,e){const t=e.format,i=wr[t];Ie.argument(i!==void 0,`Unknown axis value table format ${t}`);const r=i(n,e);return new ae.Table("axisValueTable_"+n,r)}function d_(n){const e=new ae.Table("STAT",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:2},{name:"designAxisSize",type:"USHORT",value:8},{name:"designAxisCount",type:"USHORT",value:n.axes.length},{name:"designAxesOffset",type:"ULONG",value:0},{name:"axisValueCount",type:"USHORT",value:n.values.length},{name:"offsetToAxisValueOffsets",type:"ULONG",value:0},{name:"elidedFallbackNameID",type:"USHORT",value:n.elidedFallbackNameID}]);e.designAxesOffset=e.offsetToAxisValueOffsets=e.sizeOf();for(let s=0;s<n.axes.length;s++){const a=h_(s,n.axes[s]);e.offsetToAxisValueOffsets+=a.sizeOf(),e.fields=e.fields.concat(a.fields)}const t=[];let i=[],r=n.values.length*2;for(let s=0;s<n.values.length;s++){const a=f_(s,n.values[s]);t.push({name:"offset_"+s,type:"USHORT",value:r}),r+=a.sizeOf(),i=i.concat(a.fields)}return e.fields=e.fields.concat(t),e.fields=e.fields.concat(i),e}var qu={make:d_,parse:u_};function p_(n,e){return new ae.Record("axisValueMap_"+n,[{name:"fromCoordinate_"+n,type:"F2DOT14",value:e.fromCoordinate},{name:"toCoordinate_"+n,type:"F2DOT14",value:e.toCoordinate}])}function m_(n,e){const t=new ae.Record("segmentMap_"+n,[{name:"positionMapCount_"+n,type:"USHORT",value:e.axisValueMaps.length}]);let i=[];for(let r=0;r<e.axisValueMaps.length;r++){const s=p_(`${n}_${r}`,e.axisValueMaps[r]);i=i.concat(s.fields)}return t.fields=t.fields.concat(i),t}function g_(n,e){Ie.argument(n.axisSegmentMaps.length===e.axes.length,"avar axis count must correspond to fvar axis count");const t=new ae.Table("avar",[{name:"majorVersion",type:"USHORT",value:1},{name:"minorVersion",type:"USHORT",value:0},{name:"reserved",type:"USHORT",value:0},{name:"axisCount",type:"USHORT",value:n.axisSegmentMaps.length}]);for(let i=0;i<n.axisSegmentMaps.length;i++){const r=m_(i,n.axisSegmentMaps[i]);t.fields=t.fields.concat(r.fields)}return t}function v_(n,e,t){e||(e=0);const i=new N(n,e),r=i.parseUShort(),s=i.parseUShort();r!==1&&console.warn(`Unsupported avar table version ${r}.${s}`),i.skip("uShort",1);const a=i.parseUShort();Ie.argument(a===t.axes.length,"avar axis count must correspond to fvar axis count");const o=[];for(let l=0;l<a;l++){const c=[],u=i.parseUShort();for(let f=0;f<u;f++){const h=i.parseF2Dot14(),d=i.parseF2Dot14();c.push({fromCoordinate:h,toCoordinate:d})}o.push({axisValueMaps:c})}return{version:[r,s],axisSegmentMaps:o}}var Yu={make:g_,parse:v_};function x_(n,e,t,i){const r=new _e.Parser(n,e),s=r.parseTupleVariationStore(r.relativeOffset,t.axes.length,"cvar",i),a=r.parseUShort(),o=r.parseUShort();return a!==1&&console.warn(`Unsupported cvar table version ${a}.${o}`),{version:[a,o],...s}}function __(){console.warn("Writing of cvar tables is not yet supported.")}var ju={make:__,parse:x_};function y_(n,e,t,i){const r=new _e.Parser(n,e),s=r.parseUShort(),a=r.parseUShort();s!==1&&console.warn(`Unsupported gvar table version ${s}.${a}`);const o=r.parseUShort();o!==t.axes.length&&console.warn(`axisCount ${o} in gvar table does not match the number of axes ${t.axes.length} in the fvar table!`);const l=r.parseUShort(),c=r.parsePointer32(function(){return this.parseTupleRecords(l,o)}),u=r.parseTupleVariationStoreList(o,"gvar",i);return{version:[s,a],sharedTuples:c,glyphVariations:u}}function S_(){console.warn("Writing of gvar tables is not yet supported.")}var $u={make:S_,parse:y_};function b_(n,e){const t={},i=new _e.Parser(n,e);t.version=i.parseUShort(),Ie.argument(t.version<=1,"Unsupported gasp table version."),t.numRanges=i.parseUShort(),t.gaspRanges=[];for(let r=0;r<t.numRanges;r++)t.gaspRanges[r]={rangeMaxPPEM:i.parseUShort(),rangeGaspBehavior:i.parseUShort()};return t}function M_(n){const e=new ae.Table("gasp",[{name:"version",type:"USHORT",value:1},{name:"numRanges",type:"USHORT",value:n.numRanges}]);for(let t in n.gaspRanges)e.fields.push({name:"rangeMaxPPEM",type:"USHORT",value:n.gaspRanges[t].rangeMaxPPEM}),e.fields.push({name:"rangeGaspBehavior",type:"USHORT",value:n.gaspRanges[t].rangeGaspBehavior});return e}var Zu={parse:b_,make:M_};function T_(n,e){const t=new Map,i=n.buffer,r=new N(n,e);if(r.parseUShort()!==0)return t;r.relativeOffset=r.parseOffset32();const a=n.byteOffset+e+r.relativeOffset,o=r.parseUShort(),l=new Map;for(let c=0;c<o;c++){const u=r.parseUShort(),f=r.parseUShort(),h=a+r.parseOffset32(),d=r.parseULong();let p=l.get(h);p===void 0&&(p=new Uint8Array(i,h,d),l.set(h,p));for(let v=u;v<=f;v++)t.set(v,p)}return t}function E_(n){const e=Array.from(n.keys()).sort(),t=[],i=[],r=new Map;let s=0,a={endGlyphID:null};for(let h=0,d=e.length;h<d;h++){const p=e[h],v=n.get(p);let m=r.get(v);m===void 0&&(m=s,i.push(v),r.set(v,m),s+=v.byteLength),p-1===a.endGlyphID&&m===a.svgDocOffset?a.endGlyphID=p:(a={startGlyphID:p,endGlyphID:p,svgDocOffset:m,svgDocLength:v.byteLength},t.push(a))}const o=t.length,l=i.length,c=2+o*12,u=new Array(4+o*4+l);let f=0;u[f++]={name:"version",type:"USHORT",value:0},u[f++]={name:"svgDocumentListOffset",type:"ULONG",value:10},u[f++]={name:"reserved",type:"ULONG",value:0},u[f++]={name:"numEntries",type:"USHORT",value:o};for(let h=0;h<o;h++){const d="documentRecord_"+h,{startGlyphID:p,endGlyphID:v,svgDocOffset:m,svgDocLength:g}=t[h];u[f++]={name:d+"_startGlyphID",type:"USHORT",value:p},u[f++]={name:d+"_endGlyphID",type:"USHORT",value:v},u[f++]={name:d+"_svgDocOffset",type:"ULONG",value:c+m},u[f++]={name:d+"_svgDocLength",type:"ULONG",value:g}}for(let h=0;h<l;h++)u[f++]={name:"svgDoc_"+h,type:"LITERAL",value:i[h]};return new ae.Table("SVG ",u)}var Ku={make:E_,parse:T_};function Ql(n){return Math.log(n)/Math.log(2)|0}function Mo(n){for(;n.length%4!==0;)n.push(0);let e=0;for(let t=0;t<n.length;t+=4)e+=(n[t]<<24)+(n[t+1]<<16)+(n[t+2]<<8)+n[t+3];return e%=Math.pow(2,32),e}function ec(n,e,t,i){return new ae.Record("Table Record",[{name:"tag",type:"TAG",value:n!==void 0?n:""},{name:"checkSum",type:"ULONG",value:e!==void 0?e:0},{name:"offset",type:"ULONG",value:t!==void 0?t:0},{name:"length",type:"ULONG",value:i!==void 0?i:0}])}function Ju(n){const e=new ae.Table("sfnt",[{name:"version",type:"TAG",value:"OTTO"},{name:"numTables",type:"USHORT",value:0},{name:"searchRange",type:"USHORT",value:0},{name:"entrySelector",type:"USHORT",value:0},{name:"rangeShift",type:"USHORT",value:0}]);e.tables=n,e.numTables=n.length;const t=Math.pow(2,Ql(e.numTables));e.searchRange=16*t,e.entrySelector=Ql(t),e.rangeShift=e.numTables*16-e.searchRange;const i=[],r=[];let s=e.sizeOf()+ec().sizeOf()*e.numTables;for(;s%4!==0;)s+=1,r.push({name:"padding",type:"BYTE",value:0});for(let a=0;a<n.length;a+=1){const o=n[a];Ie.argument(o.tableName.length===4,"Table name"+o.tableName+" is invalid.");const l=o.sizeOf(),c=ec(o.tableName,Mo(o.encode()),s,l);for(i.push({name:c.tag+" Table Record",type:"RECORD",value:c}),r.push({name:o.tableName+" table",type:"RECORD",value:o}),s+=l,Ie.argument(!isNaN(s),"Something went wrong calculating the offset.");s%4!==0;)s+=1,r.push({name:"padding",type:"BYTE",value:0})}return i.sort(function(a,o){return a.value.tag>o.value.tag?1:-1}),e.fields=e.fields.concat(i),e.fields=e.fields.concat(r),e}function tc(n,e,t){for(let i=0;i<e.length;i+=1){const r=n.charToGlyphIndex(e[i]);if(r>0)return n.glyphs.get(r).getMetrics()}return t}function A_(n){let e=0;for(let t=0;t<n.length;t+=1)e+=n[t];return e/n.length}function C_(n){const e=[],t=[],i=[],r=[],s=[],a=[],o=[];let l,c=0,u=0,f=0,h=0,d=0;for(let J=0;J<n.glyphs.length;J+=1){const be=n.glyphs.get(J),Fe=be.unicode|0;if(isNaN(be.advanceWidth))throw new Error("Glyph "+be.name+" ("+J+"): advanceWidth is not a number.");(l>Fe||l===void 0)&&Fe>0&&(l=Fe),c<Fe&&(c=Fe);const Ue=Ja.getUnicodeRange(Fe);if(Ue<32)u|=1<<Ue;else if(Ue<64)f|=1<<Ue-32;else if(Ue<96)h|=1<<Ue-64;else if(Ue<123)d|=1<<Ue-96;else throw new Error("Unicode ranges bits > 123 are reserved for internal usage");if(be.name===".notdef")continue;const Ze=be.getMetrics();e.push(Ze.xMin),t.push(Ze.yMin),i.push(Ze.xMax),r.push(Ze.yMax),a.push(Ze.leftSideBearing),o.push(Ze.rightSideBearing),s.push(be.advanceWidth)}const p={xMin:Math.min.apply(null,e),yMin:Math.min.apply(null,t),xMax:Math.max.apply(null,i),yMax:Math.max.apply(null,r),advanceWidthMax:Math.max.apply(null,s),advanceWidthAvg:A_(s),minLeftSideBearing:Math.min.apply(null,a),maxLeftSideBearing:Math.max.apply(null,a),minRightSideBearing:Math.min.apply(null,o)};p.ascender=n.ascender,p.descender=n.descender;let v=0;n.weightClass>=600&&(v|=n.macStyleValues.BOLD),n.italicAngle<0&&(v|=n.macStyleValues.ITALIC);const m=Ou.make({flags:3,unitsPerEm:n.unitsPerEm,xMin:p.xMin,yMin:p.yMin,xMax:p.xMax,yMax:p.yMax,lowestRecPPEM:3,macStyle:v,createdTimestamp:n.createdTimestamp}),g=Nu.make({ascender:p.ascender,descender:p.descender,advanceWidthMax:p.advanceWidthMax,minLeftSideBearing:p.minLeftSideBearing,minRightSideBearing:p.minRightSideBearing,xMaxExtent:p.maxLeftSideBearing+(p.xMax-p.xMin),numberOfHMetrics:n.glyphs.length}),_=Gu.make(n.glyphs.length),S=Ja.make(Object.assign({xAvgCharWidth:Math.round(p.advanceWidthAvg),usFirstCharIndex:l,usLastCharIndex:c,ulUnicodeRange1:u,ulUnicodeRange2:f,ulUnicodeRange3:h,ulUnicodeRange4:d,sTypoAscender:p.ascender,sTypoDescender:p.descender,sTypoLineGap:0,usWinAscent:p.yMax,usWinDescent:Math.abs(p.yMin),ulCodePageRange1:1,sxHeight:tc(n,"xyvw",{yMax:Math.round(p.ascender/2)}).yMax,sCapHeight:tc(n,"HIKLEFJMNTZBDPRAGOQSUVWXY",p).yMax,usDefaultChar:n.hasChar(" ")?32:0,usBreakChar:n.hasChar(" ")?32:0},n.tables.os2)),b=Bu.make(n.glyphs),R=Mu.make(n.glyphs),T=n.getEnglishName("fontFamily"),w=n.getEnglishName("fontSubfamily"),y=T+" "+w;let A=n.getEnglishName("postScriptName");A||(A=T.replace(/\s/g,"")+"-"+w);const L={};for(let J in n.names)L[J]=n.names[J];L.unicode=L.unicode||{},L.macintosh=L.macintosh||{},L.windows=L.windows||{};const P=n.names.unicode||{},k=n.names.macintosh||{},F=n.names.windows||{};for(const J in L){if(L[J]=L[J]||{},!L[J].uniqueID){const be=n.getEnglishName("manufacturer")||"";L[J].uniqueID={en:`${be}: ${y}`}}L[J].postScriptName||(L[J].postScriptName={en:A})}L.unicode.preferredFamily||(L.unicode.preferredFamily=P.fontFamily||k.fontFamily||F.fontFamily),L.macintosh.preferredFamily||(L.macintosh.preferredFamily=k.fontFamily||P.fontFamily||F.fontFamily),L.windows.preferredFamily||(L.windows.preferredFamily=F.fontFamily||P.fontFamily||k.fontFamily),L.unicode.preferredSubfamily||(L.unicode.preferredSubfamily=P.fontSubfamily||k.fontSubfamily||F.fontSubfamily),L.macintosh.preferredSubfamily||(L.macintosh.preferredSubfamily=k.fontSubfamily||P.fontSubfamily||F.fontSubfamily),L.windows.preferredSubfamily||(L.windows.preferredSubfamily=F.fontSubfamily||P.fontSubfamily||k.fontSubfamily);const I=[],C=bu.make(L,I),G=I.length>0?ku.make(I):void 0,z=Vu.make(n),Q=Za.make(n.glyphs,{version:n.getEnglishName("version"),fullName:y,familyName:T,weightName:w,postScriptName:A,unitsPerEm:n.unitsPerEm,fontBBox:[0,p.yMin,p.ascender,p.advanceWidthMax],topDict:n.tables.cff&&n.tables.cff.topDict||{}}),te=n.metas&&Object.keys(n.metas).length>0?Hu.make(n.metas):void 0,le=[m,g,_,S,C,R,z,Q,b];G&&le.push(G);const ue={gsub:zu,cpal:wu,colr:Wu,stat:qu,avar:Yu,cvar:ju,fvar:Xu,gvar:$u,gasp:Zu,svg:Ku},Se={avar:[n.tables.fvar],fvar:[n.names]};for(let J in ue){const be=n.tables[J];if(be){const Fe=ue[J].make.call(n,be,...Se[J]||[]);Fe&&le.push(Fe)}}te&&le.push(te);const Be=Ju(le),Ye=Be.encode(),Oe=Mo(Ye),Y=Be.fields;let oe=!1;for(let J=0;J<Y.length;J+=1)if(Y[J].name==="head table"){Y[J].value.checkSumAdjustment=2981146554-Oe,oe=!0;break}if(!oe)throw new Error("Could not find head table with checkSum to adjust.");return Be}var R_={make:Ju,fontToTable:C_,computeCheckSum:Mo};function Aa(n,e){let t=0,i=n.length-1;for(;t<=i;){const r=t+i>>>1,s=n[r].tag;if(s===e)return r;s<e?t=r+1:i=r-1}return-t-1}function nc(n,e){let t=0,i=n.length-1;for(;t<=i;){const r=t+i>>>1,s=n[r];if(s===e)return r;s<e?t=r+1:i=r-1}return-t-1}function ic(n,e){let t,i=0,r=n.length-1;for(;i<=r;){const s=i+r>>>1;t=n[s];const a=t.start;if(a===e)return t;a<e?i=s+1:r=s-1}if(i>0)return t=n[i-1],e>t.end?0:t}function Qu(n,e){this.font=n,this.tableName=e}Qu.prototype={searchTag:Aa,binSearch:nc,getTable:function(n){let e=this.font.tables[this.tableName];return!e&&n&&(e=this.font.tables[this.tableName]=this.createDefaultTable()),e},getScriptNames:function(){let n=this.getTable();return n?n.scripts.map(function(e){return e.tag}):[]},getDefaultScriptName:function(){let n=this.getTable();if(!n)return;let e=!1;for(let t=0;t<n.scripts.length;t++){const i=n.scripts[t].tag;if(i==="DFLT")return i;i==="latn"&&(e=!0)}if(e)return"latn"},getScriptTable:function(n,e){const t=this.getTable(e);if(t){n=n||"DFLT";const i=t.scripts,r=Aa(t.scripts,n);if(r>=0)return i[r].script;if(e){const s={tag:n,script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}};return i.splice(-1-r,0,s),s.script}}},getLangSysTable:function(n,e,t){const i=this.getScriptTable(n,t);if(i){if(!e||e==="dflt"||e==="DFLT")return i.defaultLangSys;const r=Aa(i.langSysRecords,e);if(r>=0)return i.langSysRecords[r].langSys;if(t){const s={tag:e,langSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]}};return i.langSysRecords.splice(-1-r,0,s),s.langSys}}},getFeatureTable:function(n,e,t,i){const r=this.getLangSysTable(n,e,i);if(r){let s;const a=r.featureIndexes,o=this.font.tables[this.tableName].features;for(let l=0;l<a.length;l++)if(s=o[a[l]],s.tag===t)return s.feature;if(i){const l=o.length;return Ie.assert(l===0||t>=o[l-1].tag,"Features must be added in alphabetical order."),s={tag:t,feature:{params:0,lookupListIndexes:[]}},o.push(s),a.push(l),s.feature}}},getLookupTables:function(n,e,t,i,r){const s=this.getFeatureTable(n,e,t,r),a=[];if(s){let o;const l=s.lookupListIndexes,c=this.font.tables[this.tableName].lookups;for(let u=0;u<l.length;u++)o=c[l[u]],o.lookupType===i&&a.push(o);if(a.length===0&&r){o={lookupType:i,lookupFlag:0,subtables:[],markFilteringSet:void 0};const u=c.length;return c.push(o),l.push(u),[o]}}return a},getGlyphClass:function(n,e){switch(n.format){case 1:return n.startGlyph<=e&&e<n.startGlyph+n.classes.length?n.classes[e-n.startGlyph]:0;case 2:{const t=ic(n.ranges,e);return t?t.classId:0}}},getCoverageIndex:function(n,e){switch(n.format){case 1:{const t=nc(n.glyphs,e);return t>=0?t:-1}case 2:{const t=ic(n.ranges,e);return t?t.index+e-t.start:-1}}},expandCoverage:function(n){if(n.format===1)return n.glyphs;{const e=[],t=n.ranges;for(let i=0;i<t.length;i++){const r=t[i],s=r.start,a=r.end;for(let o=s;o<=a;o++)e.push(o)}return e}}};var Ns=Qu;function Pr(n){Ns.call(this,n,"gpos")}Pr.prototype=Ns.prototype;Pr.prototype.init=function(){const n=this.getDefaultScriptName();this.defaultKerningTables=this.getKerningTables(n)};Pr.prototype.getKerningValue=function(n,e,t){for(let i=0;i<n.length;i++){const r=n[i].subtables;for(let s=0;s<r.length;s++){const a=r[s],o=this.getCoverageIndex(a.coverage,e);if(!(o<0))switch(a.posFormat){case 1:{let l=a.pairSets[o];for(let c=0;c<l.length;c++){let u=l[c];if(u.secondGlyph===t)return u.value1&&u.value1.xAdvance||0}break}case 2:{const l=this.getGlyphClass(a.classDef1,e),c=this.getGlyphClass(a.classDef2,t),u=a.classRecords[l][c];return u.value1&&u.value1.xAdvance||0}}}}return 0};Pr.prototype.getKerningTables=function(n,e){if(this.font.tables.gpos)return this.getLookupTables(n,e,"kern",2)};var w_=Pr;function P_(n,e){const t=n.length;if(t!==e.length)return!1;for(let i=0;i<t;i++)if(n[i]!==e[i])return!1;return!0}function L_(n,e,t){let i=0,r=n.length-1,s=null;for(;i<=r;){const a=Math.floor((i+r)/2),o=n[a],l=o[e];if(l<t)i=a+1;else if(l>t)r=a-1;else{s=o;break}}return s}function D_(n,e,t){let i=0,r=n.length-1;for(;i<=r;){const s=Math.floor((i+r)/2),a=n[s];if(a[e]<t)i=s+1;else if(a[e]>t)r=s-1;else return s}return-1}function I_(n,e,t){let i=0,r=n.length;const s=(a,o)=>a[e]-o[e];for(;i<r;){const a=i+r>>>1;s(n[a],t)<0?i=a+1:r=a}return n.splice(i,0,t),i}function eh(n){return n[0]===31&&n[1]===139&&n[2]===8}function U_(n){const e=new DataView(n.buffer,n.byteOffset,n.byteLength);let t=10;const i=n.byteLength-8,r=e.getInt8(3);if(r&4&&(t+=2+e.getUint16(t,!0)),r&8)for(;t<i&&n[t++]!==0;);if(r&16)for(;t<i&&n[t++]!==0;);if(r&2&&(t+=2),t>=i)throw new Error("Can't find compressed blocks");const s=e.getUint32(e.byteLength-4,!0);return fu(n.subarray(t,i),new Uint8Array(s))}function rc(n){return{x:n.x,y:n.y,onCurve:n.onCurve,lastPointOfContour:n.lastPointOfContour}}function F_(n){return{glyphIndex:n.glyphIndex,xScale:n.xScale,scale01:n.scale01,scale10:n.scale10,yScale:n.yScale,dx:n.dx,dy:n.dy}}function Qt(n){Ns.call(this,n,"gsub")}function To(n,e,t){const i=n.subtables;for(let r=0;r<i.length;r++){const s=i[r];if(s.substFormat===e)return s}if(t)return i.push(t),t}Qt.prototype=Ns.prototype;Qt.prototype.createDefaultTable=function(){return{version:1,scripts:[{tag:"DFLT",script:{defaultLangSys:{reserved:0,reqFeatureIndex:65535,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]}};Qt.prototype.getSingle=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,1);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage);let u;if(l.substFormat===1){const f=l.deltaGlyphId;for(u=0;u<c.length;u++){const h=c[u];i.push({sub:h,by:h+f})}}else{const f=l.substitute;for(u=0;u<c.length;u++)i.push({sub:c[u],by:f[u]})}}}return i};Qt.prototype.getMultiple=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,2);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage);let u;for(u=0;u<c.length;u++){const f=c[u],h=l.sequences[u];i.push({sub:f,by:h})}}}return i};Qt.prototype.getAlternates=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,3);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage),u=l.alternateSets;for(let f=0;f<c.length;f++)i.push({sub:c[f],by:u[f]})}}return i};Qt.prototype.getLigatures=function(n,e,t){const i=[],r=this.getLookupTables(e,t,n,4);for(let s=0;s<r.length;s++){const a=r[s].subtables;for(let o=0;o<a.length;o++){const l=a[o],c=this.expandCoverage(l.coverage),u=l.ligatureSets;for(let f=0;f<c.length;f++){const h=c[f],d=u[f];for(let p=0;p<d.length;p++){const v=d[p];i.push({sub:[h].concat(v.components),by:v.ligGlyph})}}}}return i};Qt.prototype.addSingle=function(n,e,t,i){const r=this.getLookupTables(t,i,n,1,!0)[0],s=To(r,2,{substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});Ie.assert(s.coverage.format===1,"Single: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.substitute.splice(o,0,0)),s.substitute[o]=e.by};Qt.prototype.addMultiple=function(n,e,t,i){Ie.assert(e.by instanceof Array&&e.by.length>1,'Multiple: "by" must be an array of two or more ids');const r=this.getLookupTables(t,i,n,2,!0)[0],s=To(r,1,{substFormat:1,coverage:{format:1,glyphs:[]},sequences:[]});Ie.assert(s.coverage.format===1,"Multiple: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.sequences.splice(o,0,0)),s.sequences[o]=e.by};Qt.prototype.addAlternate=function(n,e,t,i){const r=this.getLookupTables(t,i,n,3,!0)[0],s=To(r,1,{substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});Ie.assert(s.coverage.format===1,"Alternate: unable to modify coverage table format "+s.coverage.format);const a=e.sub;let o=this.binSearch(s.coverage.glyphs,a);o<0&&(o=-1-o,s.coverage.glyphs.splice(o,0,a),s.alternateSets.splice(o,0,0)),s.alternateSets[o]=e.by};Qt.prototype.addLigature=function(n,e,t,i){const r=this.getLookupTables(t,i,n,4,!0)[0];let s=r.subtables[0];s||(s={substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]},r.subtables[0]=s),Ie.assert(s.coverage.format===1,"Ligature: unable to modify coverage table format "+s.coverage.format);const a=e.sub[0],o=e.sub.slice(1),l={ligGlyph:e.by,components:o};let c=this.binSearch(s.coverage.glyphs,a);if(c>=0){const u=s.ligatureSets[c];for(let f=0;f<u.length;f++)if(P_(u[f].components,o))return;u.push(l)}else c=-1-c,s.coverage.glyphs.splice(c,0,a),s.ligatureSets.splice(c,0,[l])};Qt.prototype.getFeature=function(n,e,t){if(/ss\d\d/.test(n))return this.getSingle(n,e,t);switch(n){case"aalt":case"salt":return this.getSingle(n,e,t).concat(this.getAlternates(n,e,t));case"dlig":case"liga":case"rlig":return this.getLigatures(n,e,t);case"ccmp":return this.getMultiple(n,e,t).concat(this.getLigatures(n,e,t));case"stch":return this.getMultiple(n,e,t)}};Qt.prototype.add=function(n,e,t,i){if(/ss\d\d/.test(n))return this.addSingle(n,e,t,i);switch(n){case"aalt":case"salt":return typeof e.by=="number"?this.addSingle(n,e,t,i):this.addAlternate(n,e,t,i);case"dlig":case"liga":case"rlig":return this.addLigature(n,e,t,i);case"ccmp":return e.by instanceof Array?this.addMultiple(n,e,t,i):this.addLigature(n,e,t,i)}};var O_=Qt,th=class{constructor(n){this.defaultValue=255,this.font=n}cpal(){return this.font.tables&&this.font.tables.cpal?this.font.tables.cpal:!1}getAll(n){const e=[],t=this.cpal();if(!t)return e;for(let i=0;i<t.colorRecordIndices.length;i++){const r=t.colorRecordIndices[i],s=[];for(let a=r;a<r+t.numPaletteEntries;a++)s.push(Ki(t.colorRecords[a],n||"hexa"));e.push(s)}return e}toCPALcolor(n){return Array.isArray(n)?n.map(e=>Rs(e,"raw")):Rs(n,"raw")}fillPalette(n,e=[],t=this.cpal().numPaletteEntries){return n=Number.isInteger(n)?this.get(n,"raw"):n,Object.assign(Array(t).fill(this.defaultValue),this.toCPALcolor(n).concat(this.toCPALcolor(e)))}extend(n){if(this.ensureCPAL(Array(n).fill(this.defaultValue)))return;const e=this.cpal(),t=e.numPaletteEntries+n,i=this.getAll().map(r=>this.fillPalette(r,[],t));e.numPaletteEntries=t,e.colorRecords=this.toCPALcolor(i.flat()),this.updateIndices()}get(n,e="hexa"){return this.getAll(e)[n]||null}getColor(n,e=0,t="hexa"){return _o(this.font,n,e,t)}setColor(n,e,t=0){n=parseInt(n),t=parseInt(t);let i=this.getAll("raw"),r=i[t];if(!r)throw Error(`paletteIndex ${t} out of range`);const s=this.cpal(),a=s.numPaletteEntries;Array.isArray(e)||(e=[e]),e.length+n>a&&(this.extend(e.length+n-a),i=this.getAll("raw"),r=i[t]);for(let o=0;o<e.length;o++)r[o+n]=this.toCPALcolor(e[o]);s.colorRecords=i.flat(),this.updateIndices()}add(n){if(this.ensureCPAL(n))return;const e=this.cpal(),t=e.numPaletteEntries;n&&n.length?(n=this.toCPALcolor(n),n.length>t?this.extend(n.length-t):n.length<t&&(n=this.fillPalette(n)),e.colorRecordIndices.push(e.colorRecords.length),e.colorRecords.push(...n)):(e.colorRecordIndices.push(e.colorRecords.length),e.colorRecords.push(...Array(t).fill(this.defaultValue)))}delete(n){const e=this.getAll("raw");delete e[n];const t=this.cpal();t.colorRecordIndices.pop(),t.colorRecords=e.flat()}deleteColor(n,e){if(n===e)throw Error("replacementIndex cannot be the same as colorIndex");const t=this.cpal(),i=this.getAll("raw"),r=[];if(e>t.numPaletteEntries-1)throw Error(`Replacement index out of range: numPaletteEntries after deletion: ${t.numPaletteEntries-1}, replacementIndex: ${e})`);for(let o=0;o<i.length;o++){const c=i[o].filter((u,f)=>f!==n);r.push(c)}const s=this.font.tables.colr;if(s){const o=s.layerRecords;for(let l=0;l<o.length;l++){const c=o[l].paletteIndex;if(c>n)o[l].paletteIndex-=1;else if(c===n){let u=0;for(let f=0;f<i.length;f++)if(e>n&&e<=n+i[f].length){u++;break}o[l].paletteIndex=e-u}}this.font.tables.colr={...s,layerRecords:o}}const a=r.flat();for(let o=0;o<i.length;o++)t.colorRecordIndices[o]-=o;t.numPaletteEntries=Math.max(0,t.numPaletteEntries-1),t.colorRecords=this.toCPALcolor(a)}ensureCPAL(n){return this.cpal()?!1:(!n||!n.length?n=[this.defaultValue]:n=this.toCPALcolor(n),this.font.tables.cpal={version:0,numPaletteEntries:n.length,colorRecords:n,colorRecordIndices:[0]},!0)}updateIndices(){const n=this.cpal(),e=Math.ceil(n.colorRecords.length/n.numPaletteEntries);n.colorRecordIndices=[];for(let t=0;t<e;t++)n.colorRecordIndices.push(t*n.numPaletteEntries)}},N_=class{constructor(n){this.font=n}ensureCOLR(){return this.font.tables.colr||(this.font.tables.colr={version:0,baseGlyphRecords:[],layerRecords:[]}),this.font}get(n){const e=this.font,t=[],i=e.tables.colr,r=e.tables.cpal;if(!i||!r)return t;const s=L_(i.baseGlyphRecords,"glyphID",n);if(!s)return t;const a=s.firstLayerIndex,o=s.numLayers;for(let l=0;l<o;l++){const c=i.layerRecords[a+l];t.push({glyph:e.glyphs.get(c.glyphID),paletteIndex:c.paletteIndex})}return t}add(n,e,t){const i=this.get(n);e=Array.isArray(e)?e:[e],t===void 0||t===1/0||t>i.length?t=i.length:t<0&&(t=i.length+1+t%(i.length+1),t>=i.length+1&&(t-=i.length+1));const r=[];for(let s=0;s<t;s++){const a=Number.isInteger(i[s].glyph)?i[s].glyph:i[s].glyph.index;r.push({glyphID:a,paletteIndex:i[s].paletteIndex})}for(const s of e){const a=Number.isInteger(s.glyph)?s.glyph:s.glyph.index;r.push({glyphID:a,paletteIndex:s.paletteIndex})}for(let s=t;s<i.length;s++){const a=Number.isInteger(i[s].glyph)?i[s].glyph:i[s].glyph.index;r.push({glyphID:a,paletteIndex:i[s].paletteIndex})}this.updateColrTable(n,r)}setPaletteIndex(n,e,t){let i=this.get(n);i[e]?(i=i.map((r,s)=>({glyphID:r.glyph.index,paletteIndex:s===e?t:r.paletteIndex})),this.updateColrTable(n,i)):console.error("Invalid layer index")}remove(n,e,t=e){let i=this.get(n);i=i.map(r=>({glyphID:r.glyph.index,paletteIndex:r.paletteIndex})),i.splice(e,t-e+1),this.updateColrTable(n,i)}updateColrTable(n,e){this.ensureCOLR();const i=this.font.tables.colr;let r=D_(i.baseGlyphRecords,"glyphID",n);if(r===-1){const u={glyphID:n,firstLayerIndex:i.layerRecords.length,numLayers:0};r=I_(i.baseGlyphRecords,"glyphID",u)}const a=i.baseGlyphRecords[r],o=a.numLayers,l=e.length,c=l-o;if(c>0){const u=e.slice(o).map(f=>({glyphID:f.glyphID,paletteIndex:f.paletteIndex}));i.layerRecords.splice(a.firstLayerIndex+o,0,...u)}else c<0&&i.layerRecords.splice(a.firstLayerIndex+l,-c);for(let u=0;u<Math.min(o,l);u++)i.layerRecords[a.firstLayerIndex+u]={glyphID:e[u].glyphID,paletteIndex:e[u].paletteIndex};if(a.numLayers=l,c!==0)for(let u=0;u<i.baseGlyphRecords.length;u++){const f=i.baseGlyphRecords[u];u===r||f.firstLayerIndex<a.firstLayerIndex||(i.baseGlyphRecords[u].firstLayerIndex+=c)}}},B_=class{constructor(n){this.font=n,this.cache=new WeakMap}get(n){const e=this.getOrCreateSvgImageCacheEntry(n);return e&&e.image}getAsync(n){const e=this.getOrCreateSvgImageCacheEntry(n);return e&&e.promise}getOrCreateSvgImageCacheEntry(n){const e=this.font.tables.svg;if(e===void 0)return;const t=e.get(n);if(t===void 0)return;let i=this.cache.get(t);i===void 0&&(i=k_(t),this.cache.set(t,i));let r=i.images.get(n);return r===void 0&&(r=G_(this.font,i.template,n),r.promise.then(s=>{if(r.image=s,typeof this.font.onGlyphUpdated=="function")try{this.font.onGlyphUpdated(n)}catch(a){console.error("font.onGlyphUpdated",n,a)}}),i.images.set(n,r)),r}};function k_(n){return{template:V_(n).then(W_),images:new Map}}function G_(n,e,t){return{promise:e.then(i=>{let r;typeof i=="string"?r=i:(i[4]=t,r=i.join(""));const s=X_(r,n.unitsPerEm);return s.image.decode().then(()=>s)}),image:void 0}}var V_=typeof DecompressionStream=="function"?H_:z_;function z_(n){try{return Promise.resolve(new TextDecoder().decode(eh(n)?U_(n):n))}catch(e){return Promise.reject(e)}}function H_(n){if(eh(n))return new Response(new Response(n).body.pipeThrough(new DecompressionStream("gzip"))).text();try{return Promise.resolve(new TextDecoder().decode(n))}catch(e){return Promise.reject(e)}}function W_(n){const e=n.indexOf("<svg"),t=n.indexOf(">",e+4)+1;if(/ id=['"]glyph\d+['"]/.test(n.substring(e,t)))return n;const i=n.lastIndexOf("</svg>");return[n.substring(0,t),"<defs>",n.substring(t,i),'</defs><use href="#glyph',"",'"/>',n.substring(i)]}function X_(n,e){const i=new DOMParser().parseFromString(n,"image/svg+xml").documentElement,r=i.viewBox.baseVal,s=i.width.baseVal,a=i.height.baseVal;let o=1,l=1;r.width>0&&r.height>0&&(s.unitType===1?(o=s.valueInSpecifiedUnits/r.width,l=a.unitType===1?a.valueInSpecifiedUnits/r.height:o):a.unitType===1?(l=a.valueInSpecifiedUnits/r.height,o=l):e&&(o=e/r.width,l=e/r.height));const c=document.createElement("div");c.style.position="fixed",c.style.visibility="hidden",c.appendChild(i),document.body.appendChild(c);const u=i.getBBox();document.body.removeChild(c);const f=(u.x-r.x)*o,h=(r.y-u.y)*l,d=u.width*o,p=u.height*l;i.setAttribute("viewBox",[u.x,u.y,u.width,u.height].join(" ")),o!==1&&i.setAttribute("width",d),l!==1&&i.setAttribute("height",p);const v=new Image(d,p);return v.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(i.outerHTML),{leftSideBearing:f,baseline:h,image:v}}var Ca=new WeakMap;function sc(n,e,t,i,r){let s;return(e&i)>0?(s=n.parseByte(),(e&r)===0&&(s=-s),s=t+s):(e&r)>0?s=t:s=t+n.parseShort(),s}function nh(n,e,t){const i=new _e.Parser(e,t);n._numberOfContours=i.parseShort(),n._xMin=i.parseShort(),n._yMin=i.parseShort(),n._xMax=i.parseShort(),n._yMax=i.parseShort();let r,s;if(n._numberOfContours>0){const a=n.endPointIndices=[];for(let l=0;l<n._numberOfContours;l+=1)a.push(i.parseUShort());n.instructionLength=i.parseUShort(),n.instructions=[];for(let l=0;l<n.instructionLength;l+=1)n.instructions.push(i.parseByte());const o=a[a.length-1]+1;r=[];for(let l=0;l<o;l+=1)if(s=i.parseByte(),r.push(s),(s&8)>0){const c=i.parseByte();for(let u=0;u<c;u+=1)r.push(s),l+=1}if(Ie.argument(r.length===o,"Bad flags."),a.length>0){const l=[];let c;if(o>0){for(let h=0;h<o;h+=1)s=r[h],c={},c.onCurve=!!(s&1),c.lastPointOfContour=a.indexOf(h)>=0,l.push(c);let u=0;for(let h=0;h<o;h+=1)s=r[h],c=l[h],c.x=sc(i,s,u,2,16),u=c.x;let f=0;for(let h=0;h<o;h+=1)s=r[h],c=l[h],c.y=sc(i,s,f,4,32),f=c.y}n.points=l}else n.points=[]}else if(n._numberOfContours===0)n.points=[];else{n.isComposite=!0,n.points=[],n.components=[];let a=!0;for(;a;){r=i.parseUShort();const o={glyphIndex:i.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};(r&1)>0?(r&2)>0?(o.dx=i.parseShort(),o.dy=i.parseShort()):o.matchedPoints=[i.parseUShort(),i.parseUShort()]:(r&2)>0?(o.dx=i.parseChar(),o.dy=i.parseChar()):o.matchedPoints=[i.parseByte(),i.parseByte()],(r&8)>0?o.xScale=o.yScale=i.parseF2Dot14():(r&64)>0?(o.xScale=i.parseF2Dot14(),o.yScale=i.parseF2Dot14()):(r&128)>0&&(o.xScale=i.parseF2Dot14(),o.scale01=i.parseF2Dot14(),o.scale10=i.parseF2Dot14(),o.yScale=i.parseF2Dot14()),n.components.push(o),a=!!(r&32)}if(r&256){n.instructionLength=i.parseUShort(),n.instructions=[];for(let o=0;o<n.instructionLength;o+=1)n.instructions.push(i.parseByte())}}}function ds(n,e){const t=[];for(let i=0;i<n.length;i+=1){const r=n[i],s={x:e.xScale*r.x+e.scale10*r.y+e.dx,y:e.scale01*r.x+e.yScale*r.y+e.dy,onCurve:r.onCurve,lastPointOfContour:r.lastPointOfContour};t.push(s)}return t}function q_(n){const e=[];let t=[];for(let i=0;i<n.length;i+=1){const r=n[i];t.push(r),r.lastPointOfContour&&(e.push(t),t=[])}return Ie.argument(t.length===0,"There are still points left in the current contour."),e}function Eo(n){const e=new Yi;if(!n)return e;const t=q_(n);for(let i=0;i<t.length;++i){const r=t[i];let s=r[r.length-1],a=r[0];if(s.onCurve)e.moveTo(s.x,s.y);else if(a.onCurve)e.moveTo(a.x,a.y);else{const o={x:(s.x+a.x)*.5,y:(s.y+a.y)*.5};e.moveTo(o.x,o.y)}for(let o=0;o<r.length;++o)if(s=a,a=r[(o+1)%r.length],s.onCurve)e.lineTo(s.x,s.y);else{let l=a;a.onCurve||(l={x:(s.x+a.x)*.5,y:(s.y+a.y)*.5}),e.quadraticCurveTo(s.x,s.y,l.x,l.y)}e.closePath()}return e}function ih(n,e){if(e.isComposite){Ca.has(n)||Ca.set(n,new Set);const t=Ca.get(n);t.add(e.index);try{for(let i=0;i<e.components.length;i+=1){const r=e.components[i];if(t.has(r.glyphIndex))continue;const s=n.get(r.glyphIndex);if(s.getPath(),s.points){let a;if(r.matchedPoints===void 0)a=ds(s.points,r);else{if(r.matchedPoints[0]>e.points.length-1||r.matchedPoints[1]>s.points.length-1)throw Error("Matched points out of range in "+e.name);const o=e.points[r.matchedPoints[0]];let l=s.points[r.matchedPoints[1]];const c={xScale:r.xScale,scale01:r.scale01,scale10:r.scale10,yScale:r.yScale,dx:0,dy:0};l=ds([l],c)[0],c.dx=o.x-l.x,c.dy=o.y-l.y,a=ds(s.points,c)}e.points=e.points.concat(a)}}}finally{t.delete(e.index)}}return Eo(e.points)}function Y_(n,e,t,i){const r=new Cn.GlyphSet(i);for(let s=0;s<t.length-1;s+=1){const a=t[s],o=t[s+1];a!==o?r.push(s,Cn.ttfGlyphLoader(i,s,nh,n,e+a,ih)):r.push(s,Cn.glyphLoader(i,s))}return r}function j_(n,e,t,i){const r=new Cn.GlyphSet(i);return i._push=function(s){const a=t[s],o=t[s+1];a!==o?r.push(s,Cn.ttfGlyphLoader(i,s,nh,n,e+a,ih)):r.push(s,Cn.glyphLoader(i,s))},r}function $_(n,e,t,i,r){return r.lowMemory?j_(n,e,t,i):Y_(n,e,t,i)}var rh={getPath:Eo,parse:$_},Z_=class{constructor(n){this.font=n}normalizeCoordTags(n){for(const e in n)if(e.length<4){const t=e.padEnd(4," ");n[t]===void 0&&(n[t]=n[e]),delete n[e]}}getNormalizedCoords(n){n||(n=this.font.variation.get());let e=[];this.normalizeCoordTags(n);for(let t=0;t<this.fvar().axes.length;t++){const i=this.fvar().axes[t];let r=n[i.tag];r===void 0&&(r=i.defaultValue),r<i.defaultValue?e.push((r-i.defaultValue+Number.EPSILON)/(i.defaultValue-i.minValue+Number.EPSILON)):e.push((r-i.defaultValue+Number.EPSILON)/(i.maxValue-i.defaultValue+Number.EPSILON))}if(this.avar())for(let t=0;t<this.avar().axisSegmentMaps.length;t++){let i=this.avar().axisSegmentMaps[t];for(let r=0;r<i.axisValueMaps.length;r++){let s=i.axisValueMaps[r];if(r>=1&&e[t]<s.fromCoordinate){let a=i.axisValueMaps[r-1];e[t]=((e[t]-a.fromCoordinate)*(s.toCoordinate-a.toCoordinate)+Number.EPSILON)/(s.fromCoordinate-a.fromCoordinate+Number.EPSILON)+a.toCoordinate;break}}}return e}interpolatePoints(n,e,t){if(n.length===0)return;let i=0;for(;i<n.length;){let r=i,s=i,a=n[s];for(;!a.lastPointOfContour;)a=n[++s];for(;i<=s&&!t[i];)i++;if(i>s)continue;let o=i,l=i;for(i++;i<=s;)t[i]&&(this.deltaInterpolate(l+1,i-1,l,i,e,n),l=i),i++;l===o?this.deltaShift(r,s,l,e,n):(this.deltaInterpolate(l+1,s,l,o,e,n),o>0&&this.deltaInterpolate(r,o-1,l,o,e,n)),i=s+1}}deltaInterpolate(n,e,t,i,r,s){if(n>e)return;let a=["x","y"];for(let l=0;l<a.length;l++){let c=a[l];if(r[t][c]>r[i][c]){var o=t;t=i,i=o}let u=r[t][c],f=r[i][c],h=s[t][c],d=s[i][c];if(u!==f||h===d){let p=u===f?0:(d-h)/(f-u);for(let v=n;v<=e;v++){let m=r[v][c];m<=u?m+=h-u:m>=f?m+=d-f:m=h+(m-u)*p,s[v][c]=m}}}}deltaShift(n,e,t,i,r){let s=r[t].x-i[t].x,a=r[t].y-i[t].y;if(!(s===0&&a===0))for(let o=n;o<=e;o++)o!==t&&(r[o].x+=s,r[o].y+=a)}transformComponents(n,e,t,i,r,s){let a=0;for(let o=0;o<n.components.length;o++){const l=n.components[o],c=this.font.glyphs.get(l.glyphIndex),u=F_(l),f=i.indexOf(o);f>-1&&(u.dx+=Math.round(r.deltas[f]*s),u.dy+=Math.round(r.deltasY[f]*s));const h=ds(this.getTransform(c,t).points,u);e.splice(a,h.length,...h),a+=c.points.length}}applyTupleVariationStore(n,e,t,i="gvar",r={}){t||(t=this.font.variation.get());const s=this.getNormalizedCoords(t),{headers:a,sharedPoints:o}=n,l=this.fvar().axes.length;let c;i==="gvar"?c=e.map(rc):i==="cvar"&&(c=[...e]);for(let u=0;u<a.length;u++){const f=a[u];let h=1;for(let p=0;p<l;p++){let v=[0];switch(i){case"gvar":v=f.peakTuple?f.peakTuple:this.gvar().sharedTuples[f.sharedTupleRecordsIndex];break;case"cvar":v=f.peakTuple;break}if(v[p]!==0){if(s[p]===0){h=0;break}if(f.intermediateStartTuple)if(s[p]<f.intermediateStartTuple[p]||s[p]>f.intermediateEndTuple[p]){h=0;break}else s[p]<v[p]?h=h*(s[p]-f.intermediateStartTuple[p]+Number.EPSILON)/(v[p]-f.intermediateStartTuple[p]+Number.EPSILON):h=h*(f.intermediateEndTuple[p]-s[p]+Number.EPSILON)/(f.intermediateEndTuple[p]-v[p]+Number.EPSILON);else{if(s[p]<Math.min(0,v[p])||s[p]>Math.max(0,v[p])){h=0;break}h=(h*s[p]+Number.EPSILON)/(v[p]+Number.EPSILON)}}}if(h===0)continue;const d=f.privatePoints.length?f.privatePoints:o;if(i==="gvar"&&r.glyph&&r.glyph.isComposite)this.transformComponents(r.glyph,c,t,d,f,h);else if(d.length===0)for(let p=0;p<c.length;p++){const v=c[p];i==="gvar"?c[p]={x:Math.round(v.x+f.deltas[p]*h),y:Math.round(v.y+f.deltasY[p]*h),onCurve:v.onCurve,lastPointOfContour:v.lastPointOfContour}:i==="cvar"&&(c[p]=Math.round(v+f.deltas[p]*h))}else{let p;i==="gvar"?p=c.map(rc):i==="cvar"&&(p=c);const v=Array(e.length).fill(!1);for(let m=0;m<d.length;m++){let g=d[m];if(g<e.length){let _=p[g];i==="gvar"?(v[g]=!0,_.x+=f.deltas[m]*h,_.y+=f.deltasY[m]*h):i==="cvar"&&(c[g]=Math.round(_+f.deltas[m]*h))}}if(i==="gvar"){this.interpolatePoints(p,c,v);for(let m=0;m<e.length;m++){let g=p[m].x-c[m].x,_=p[m].y-c[m].y;c[m].x=Math.round(c[m].x+g),c[m].y=Math.round(c[m].y+_)}}}}return c}getTransform(n,e){Number.isInteger(n)&&(n=this.font.glyphs.get(n));const t=n.getBlendPath,i=!!(n.points&&n.points.length);let r=n;if(t||i){if(e||(e=this.font.variation.get()),i){const s=this.gvar()&&this.gvar().glyphVariations[n.index];if(s){const a=n.points;let o=this.applyTupleVariationStore(s,a,e,"gvar",{glyph:n});r=new br(Object.assign({},n,{points:o,path:Eo(o)}))}}else if(t){const s=n.getBlendPath(e);r=new br(Object.assign({},n,{path:s}))}}return this.font.tables.hvar&&(n._advanceWidth=typeof n._advanceWidth<"u"?n._advanceWidth:n.advanceWidth,n.advanceWidth=r.advanceWidth=Math.round(n._advanceWidth+this.getVariableAdjustment(r.index,"hvar","advanceWidth",e)),n._leftSideBearing=typeof n._leftSideBearing<"u"?n._leftSideBearing:n.leftSideBearing,n.leftSideBearing=r.leftSideBearing=Math.round(n._leftSideBearing+this.getVariableAdjustment(r.index,"hvar","lsb",e))),r}getCvarTransform(n){const e=this.font.tables.cvt,t=this.cvar();return!e||!e.length||!t||!t.headers.length?e:this.applyTupleVariationStore(t,e,n,"cvar")}getVariableAdjustment(n,e,t,i){i=i||this.font.variation.get();let r,s;const a=this.font.tables[e];if(!a)throw Error(`trying to get variation adjustment from non-existent table "${a}"`);if(!a.itemVariationStore)throw Error(`trying to get variation adjustment from table "${a}" which does not have an itemVariationStore`);const o=a[t]&&a[t].map.length;if(o){let l=n;l>=o&&(l=o-1),{outerIndex:r,innerIndex:s}=a[t].map[l]}else r=0,s=n;return this.getDelta(a.itemVariationStore,r,s,i)}getDelta(n,e,t,i){if(e>=n.itemVariationSubtables.length)return 0;let r=n.itemVariationSubtables[e];if(t>=r.deltaSets.length)return 0;let s=r.deltaSets[t],a=this.getBlendVector(n,e,i),o=0;for(let l=0;l<r.regionIndexes.length;l++)o+=s[l]*a[l];return o}getBlendVector(n,e,t){t||(t=this.font.variation.get());let i=n.itemVariationSubtables[e];const r=this.getNormalizedCoords(t);let s=[];for(let a=0;a<i.regionIndexes.length;a++){let o=1,l=i.regionIndexes[a],c=n.variationRegions[l].regionAxes;for(let u=0;u<c.length;u++){let f=c[u],h;f.startCoord>f.peakCoord||f.peakCoord>f.endCoord||f.startCoord<0&&f.endCoord>0&&f.peakCoord!==0||f.peakCoord===0?h=1:r[u]<f.startCoord||r[u]>f.endCoord?h=0:r[u]===f.peakCoord?h=1:r[u]<f.peakCoord?h=(r[u]-f.startCoord+Number.EPSILON)/(f.peakCoord-f.startCoord+Number.EPSILON):h=(f.endCoord-r[u]+Number.EPSILON)/(f.endCoord-f.peakCoord+Number.EPSILON),o*=h}s[a]=o}return s}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},K_=class{constructor(n){this.font=n,this.process=new Z_(this.font),this.activateDefaultVariation(),this.getTransform=this.process.getTransform.bind(this.process)}activateDefaultVariation(){const n=this.getDefaultInstanceIndex();n>-1?this.set(n):this.set(this.getDefaultCoordinates())}getDefaultCoordinates(){return this.fvar().axes.reduce((n,e)=>(n[e.tag]=e.defaultValue,n),{})}getDefaultInstanceIndex(){const n=this.getDefaultCoordinates();let e=this.getInstanceIndex(n);return e<0&&(e=this.fvar().instances.findIndex(t=>t.name&&t.name.en==="Regular")),e}getInstanceIndex(n){return this.fvar().instances.findIndex(e=>Object.keys(n).every(t=>e.coordinates[t]===n[t]))}getInstance(n){return this.fvar().instances&&this.fvar().instances[n]}set(n){let e;if(Number.isInteger(n)){const t=this.getInstance(n);if(!t)throw Error(`Invalid instance index ${n}`);e={...t.coordinates}}else e=n,this.process.normalizeCoordTags(e);e=Object.assign({},this.font.defaultRenderOptions.variation,e),this.font.defaultRenderOptions=Object.assign({},this.font.defaultRenderOptions,{variation:e})}get(){return Object.assign({},this.font.defaultRenderOptions.variation)}avar(){return this.font.tables.avar}cvar(){return this.font.tables.cvar}fvar(){return this.font.tables.fvar}gvar(){return this.font.tables.gvar}hvar(){return this.font.tables.hvar}},ac=1e6,Ps=64,Ls=1e4,sh,mi,ah,Qa;function oh(n){this.font=n,this.getCommands=function(e){return rh.getPath(e).commands},this._fpgmState=this._prepState=void 0,this._errorState=0}function J_(n){return n}function lh(n){return Math.sign(n)*Math.round(Math.abs(n))}function Q_(n){return Math.sign(n)*Math.round(Math.abs(n*2))/2}function ey(n){return Math.sign(n)*(Math.round(Math.abs(n)+.5)-.5)}function ty(n){return Math.sign(n)*Math.ceil(Math.abs(n))}function ny(n){return Math.sign(n)*Math.floor(Math.abs(n))}var ch=function(n){const e=this.srPeriod;let t=this.srPhase;const i=this.srThreshold;let r=1;return n<0&&(n=-n,r=-1),n+=i-t,n=Math.trunc(n/e)*e,n+=t,n<0?t*r:n*r},Mn={x:1,y:0,axis:"x",distance:function(n,e,t,i){return(t?n.xo:n.x)-(i?e.xo:e.x)},interpolate:function(n,e,t,i){let r,s,a,o,l,c,u;if(!i||i===this){if(r=n.xo-e.xo,s=n.xo-t.xo,l=e.x-e.xo,c=t.x-t.xo,a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){n.x=n.xo+(l+c)/2;return}n.x=n.xo+(l*o+c*a)/u;return}if(r=i.distance(n,e,!0,!0),s=i.distance(n,t,!0,!0),l=i.distance(e,e,!1,!0),c=i.distance(t,t,!1,!0),a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){Mn.setRelative(n,n,(l+c)/2,i,!0);return}Mn.setRelative(n,n,(l*o+c*a)/u,i,!0)},normalSlope:Number.NEGATIVE_INFINITY,setRelative:function(n,e,t,i,r){if(!i||i===this){n.x=(r?e.xo:e.x)+t;return}const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y;n.x=o+(n.y-l)/i.normalSlope},slope:0,touch:function(n){n.xTouched=!0},touched:function(n){return n.xTouched},untouch:function(n){n.xTouched=!1}},On={x:0,y:1,axis:"y",distance:function(n,e,t,i){return(t?n.yo:n.y)-(i?e.yo:e.y)},interpolate:function(n,e,t,i){let r,s,a,o,l,c,u;if(!i||i===this){if(r=n.yo-e.yo,s=n.yo-t.yo,l=e.y-e.yo,c=t.y-t.yo,a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){n.y=n.yo+(l+c)/2;return}n.y=n.yo+(l*o+c*a)/u;return}if(r=i.distance(n,e,!0,!0),s=i.distance(n,t,!0,!0),l=i.distance(e,e,!1,!0),c=i.distance(t,t,!1,!0),a=Math.abs(r),o=Math.abs(s),u=a+o,u===0){On.setRelative(n,n,(l+c)/2,i,!0);return}On.setRelative(n,n,(l*o+c*a)/u,i,!0)},normalSlope:0,setRelative:function(n,e,t,i,r){if(!i||i===this){n.y=(r?e.yo:e.y)+t;return}const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y;n.y=l+i.normalSlope*(n.x-o)},slope:Number.POSITIVE_INFINITY,touch:function(n){n.yTouched=!0},touched:function(n){return n.yTouched},untouch:function(n){n.yTouched=!1}};Object.freeze(Mn);Object.freeze(On);function Lr(n,e){this.x=n,this.y=e,this.axis=void 0,this.slope=e/n,this.normalSlope=-n/e,Object.freeze(this)}Lr.prototype.distance=function(n,e,t,i){return this.x*Mn.distance(n,e,t,i)+this.y*On.distance(n,e,t,i)};Lr.prototype.interpolate=function(n,e,t,i){let r,s,a,o,l,c,u;if(a=i.distance(n,e,!0,!0),o=i.distance(n,t,!0,!0),r=i.distance(e,e,!1,!0),s=i.distance(t,t,!1,!0),l=Math.abs(a),c=Math.abs(o),u=l+c,u===0){this.setRelative(n,n,(r+s)/2,i,!0);return}this.setRelative(n,n,(r*c+s*l)/u,i,!0)};Lr.prototype.setRelative=function(n,e,t,i,r){i=i||this;const s=r?e.xo:e.x,a=r?e.yo:e.y,o=s+t*i.x,l=a+t*i.y,c=i.normalSlope,u=this.slope,f=n.x,h=n.y;n.x=(u*f-c*o+l-h)/(u-c),n.y=u*(n.x-f)+h};Lr.prototype.touch=function(n){n.xTouched=!0,n.yTouched=!0};function Dr(n,e){const t=Math.sqrt(n*n+e*e);return n/=t,e/=t,n===1&&e===0?Mn:n===0&&e===1?On:new Lr(n,e)}function Bn(n,e,t,i){this.x=this.xo=Math.round(n*64)/64,this.y=this.yo=Math.round(e*64)/64,this.lastPointOfContour=t,this.onCurve=i,this.prevPointOnContour=void 0,this.nextPointOnContour=void 0,this.xTouched=!1,this.yTouched=!1,Object.preventExtensions(this)}Bn.prototype.nextTouched=function(n){let e=this.nextPointOnContour;for(;!n.touched(e)&&e!==this;)e=e.nextPointOnContour;return e};Bn.prototype.prevTouched=function(n){let e=this.prevPointOnContour;for(;!n.touched(e)&&e!==this;)e=e.prevPointOnContour;return e};var Mr=Object.freeze(new Bn(0,0)),iy={cvCutIn:17/16,deltaBase:9,deltaShift:.125,loop:1,minDis:1,autoFlip:!0};function Jn(n,e){switch(this.env=n,this.stack=[],this.prog=e,n){case"glyf":this.zp0=this.zp1=this.zp2=1,this.rp0=this.rp1=this.rp2=0;case"prep":this.fv=this.pv=this.dpv=Mn,this.round=lh}}oh.prototype.exec=function(n,e){if(typeof e!="number")throw new Error("Point size is not a number!");if(this._errorState>2)return;const t=this.font;let i=this._prepState;if(!i||i.ppem!==e){let r=this._fpgmState;if(!r){Jn.prototype=iy,r=this._fpgmState=new Jn("fpgm",t.tables.fpgm),r.funcs=[],r.font=t,r.instructionCount=0,r.callDepth=0;try{mi(r)}catch(a){console.log("Hinting error in FPGM:"+a),this._errorState=3;return}}Jn.prototype=r,i=this._prepState=new Jn("prep",t.tables.prep),i.ppem=e,i.instructionCount=0,i.callDepth=0;const s=t.variation&&t.variation.process.getCvarTransform()||t.tables.cvt;if(s){const a=i.cvt=new Array(s.length),o=e/t.unitsPerEm;for(let l=0;l<s.length;l++)a[l]=s[l]*o}else i.cvt=[];try{mi(i)}catch(a){this._errorState<2&&console.log("Hinting error in PREP:"+a),this._errorState=2}}if(!(this._errorState>1))try{return ah(n,i)}catch(r){this._errorState<1&&(console.log("Hinting error:"+r),console.log("Note: further hinting errors are silenced")),this._errorState=1;return}};ah=function(n,e){const t=e.ppem/e.font.unitsPerEm,i=t;let r=n.components,s,a,o;if(Jn.prototype=e,!r)o=new Jn("glyf",n.instructions),o.instructionCount=0,o.callDepth=0,Qa(n,o,t,i),a=o.gZone;else{const l=e.font;a=[],s=[];for(let c=0;c<r.length;c++){const u=r[c],f=l.glyphs.get(u.glyphIndex);o=new Jn("glyf",f.instructions),o.instructionCount=0,o.callDepth=0,Qa(f,o,t,i);const h=Math.round(u.dx*t),d=Math.round(u.dy*i),p=o.gZone,v=o.contours;for(let g=0;g<p.length;g++){const _=p[g];_.xTouched=_.yTouched=!1,_.xo=_.x=_.x+h,_.yo=_.y=_.y+d}const m=a.length;a.push.apply(a,p);for(let g=0;g<v.length;g++)s.push(v[g]+m)}n.instructions&&!o.inhibitGridFit&&(o=new Jn("glyf",n.instructions),o.gZone=o.z0=o.z1=o.z2=a,o.contours=s,a.push(new Bn(0,0),new Bn(Math.round(n.advanceWidth*t),0)),mi(o),a.length-=2)}return a};Qa=function(n,e,t,i){const r=n.points||[],s=r.length,a=e.gZone=e.z0=e.z1=e.z2=[],o=e.contours=[];let l;for(let f=0;f<s;f++)l=r[f],a[f]=new Bn(l.x*t,l.y*i,l.lastPointOfContour,l.onCurve);let c,u;for(let f=0;f<s;f++)l=a[f],c||(c=l,o.push(f)),l.lastPointOfContour?(l.nextPointOnContour=c,c.prevPointOnContour=l,c=void 0):(u=a[f+1],l.nextPointOnContour=u,u.prevPointOnContour=l);e.inhibitGridFit||(a.push(new Bn(0,0),new Bn(Math.round(n.advanceWidth*t),0)),mi(e),a.length-=2)};mi=function(n){let e=n.prog;if(!e)return;const t=e.length;let i;for(n.ip=0;n.ip<t;n.ip++){if(++n.instructionCount>ac)throw new Error("Hinting instructions exceeded maximum of "+ac);if(i=sh[e[n.ip]],!i)throw new Error("unknown instruction: 0x"+Number(e[n.ip]).toString(16));i(n)}};function Bs(n){const e=n.tZone=new Array(n.gZone.length);for(let t=0;t<e.length;t++)e[t]=new Bn(0,0)}function uh(n,e){const t=n.prog;let i=n.ip,r=1,s;do if(s=t[++i],s===88)r++;else if(s===89)r--;else if(s===64)i+=t[i+1]+1;else if(s===65)i+=2*t[i+1]+1;else if(s>=176&&s<=183)i+=s-176+1;else if(s>=184&&s<=191)i+=(s-184+1)*2;else if(e&&r===1&&s===27)break;while(r>0);n.ip=i}function oc(n,e){e.fv=e.pv=e.dpv=n}function lc(n,e){e.pv=e.dpv=n}function cc(n,e){e.fv=n}function uc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.pv=e.dpv=Dr(o,l)}function hc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.fv=Dr(o,l)}function ry(n){const e=n.stack,t=e.pop(),i=e.pop();n.pv=n.dpv=Dr(i,t)}function sy(n){const e=n.stack,t=e.pop(),i=e.pop();n.fv=Dr(i,t)}function ay(n){const e=n.stack,t=n.pv;e.push(t.x*16384),e.push(t.y*16384)}function oy(n){const e=n.stack,t=n.fv;e.push(t.x*16384),e.push(t.y*16384)}function ly(n){n.fv=n.pv}function cy(n){const e=n.stack,t=e.pop(),i=e.pop(),r=e.pop(),s=e.pop(),a=e.pop(),o=n.z0,l=n.z1,c=o[t],u=o[i],f=l[r],h=l[s],d=n.z2[a],p=c.x,v=c.y,m=u.x,g=u.y,_=f.x,S=f.y,b=h.x,R=h.y,T=(p-m)*(S-R)-(v-g)*(_-b),w=p*g-v*m,y=_*R-S*b;d.x=(w*(_-b)-y*(p-m))/T,d.y=(w*(S-R)-y*(v-g))/T}function uy(n){n.rp0=n.stack.pop()}function hy(n){n.rp1=n.stack.pop()}function fy(n){n.rp2=n.stack.pop()}function dy(n){const e=n.stack.pop();switch(n.zp0=e,e){case 0:n.tZone||Bs(n),n.z0=n.tZone;break;case 1:n.z0=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function py(n){const e=n.stack.pop();switch(n.zp1=e,e){case 0:n.tZone||Bs(n),n.z1=n.tZone;break;case 1:n.z1=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function my(n){const e=n.stack.pop();switch(n.zp2=e,e){case 0:n.tZone||Bs(n),n.z2=n.tZone;break;case 1:n.z2=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function gy(n){const e=n.stack.pop();switch(n.zp0=n.zp1=n.zp2=e,e){case 0:n.tZone||Bs(n),n.z0=n.z1=n.z2=n.tZone;break;case 1:n.z0=n.z1=n.z2=n.gZone;break;default:throw new Error("Invalid zone pointer")}}function vy(n){n.loop=n.stack.pop(),n.loop>Ls&&(n.loop=Ls)}function xy(n){n.round=lh}function _y(n){n.round=ey}function yy(n){const e=n.stack.pop();n.minDis=e/64}function Sy(n){uh(n,!1)}function by(n){const e=n.stack.pop();n.ip+=e-1}function My(n){const e=n.stack.pop();n.cvCutIn=e/64}function Ty(n){const e=n.stack;e.push(e[e.length-1])}function Ra(n){n.stack.pop()}function Ey(n){n.stack.length=0}function Ay(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t),e.push(i)}function Cy(n){const e=n.stack;e.push(e.length)}function Ry(n){const e=n.stack,t=e.pop();let i=e.pop();if(i>Ls&&(i=Ls),++n.callDepth>Ps)throw new Error("Hinting call depth exceeded maximum of "+Ps);const r=n.ip,s=n.prog;n.prog=n.funcs[t];for(let a=0;a<i;a++)mi(n);n.ip=r,n.prog=s,n.callDepth--}function wy(n){const e=n.stack.pop();if(++n.callDepth>Ps)throw new Error("Hinting call depth exceeded maximum of "+Ps);const t=n.ip,i=n.prog;n.prog=n.funcs[e],mi(n),n.ip=t,n.prog=i,n.callDepth--}function Py(n){const e=n.stack,t=e.pop();e.push(e[e.length-t])}function Ly(n){const e=n.stack,t=e.pop();e.push(e.splice(e.length-t,1)[0])}function Dy(n){if(n.env!=="fpgm")throw new Error("FDEF not allowed here");const e=n.stack,t=n.prog;let i=n.ip;const r=e.pop(),s=i;for(;t[++i]!==45;);n.ip=i,n.funcs[r]=t.slice(s+1,i)}function fc(n,e){const t=e.stack.pop(),i=e.z0[t],r=e.fv,s=e.pv;let a=s.distance(i,Mr);n&&(a=e.round(a)),r.setRelative(i,Mr,a,s),r.touch(i),e.rp0=e.rp1=t}function dc(n,e){const t=e.z2,i=t.length-2;let r,s,a;for(let o=0;o<i;o++)r=t[o],!n.touched(r)&&(s=r.prevTouched(n),s!==r&&(a=r.nextTouched(n),s===a&&n.setRelative(r,r,n.distance(s,s,!1,!0),n,!0),n.interpolate(r,s,a,n)))}function pc(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv;let o=e.loop;const l=e.z2;for(;o--;){const c=t.pop(),u=l[c],f=a.distance(r,r,!1,!0);s.setRelative(u,u,f,a),s.touch(u)}e.loop=1}function mc(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv,o=t.pop(),l=e.z2[e.contours[o]];let c=l;const u=a.distance(r,r,!1,!0);do c!==r&&s.setRelative(c,c,u,a),c=c.nextPointOnContour;while(c!==l)}function gc(n,e){const t=e.stack,i=n?e.rp1:e.rp2,r=(n?e.z0:e.z1)[i],s=e.fv,a=e.pv,o=t.pop();let l;switch(o){case 0:l=e.tZone;break;case 1:l=e.gZone;break;default:throw new Error("Invalid zone")}let c;const u=a.distance(r,r,!1,!0),f=l.length-2;for(let h=0;h<f;h++)c=l[h],s.setRelative(c,c,u,a)}function Iy(n){const e=n.stack;let t=n.loop;const i=n.fv,r=e.pop()/64,s=n.z2;for(;t--;){const a=e.pop(),o=s[a];i.setRelative(o,o,r),i.touch(o)}n.loop=1}function Uy(n){const e=n.stack,t=n.rp1,i=n.rp2;let r=n.loop;const s=n.z0[t],a=n.z1[i],o=n.fv,l=n.dpv,c=n.z2;for(;r--;){const u=e.pop(),f=c[u];o.interpolate(f,s,a,l),o.touch(f)}n.loop=1}function vc(n,e){const t=e.stack,i=t.pop()/64,r=t.pop(),s=e.z1[r],a=e.z0[e.rp0],o=e.fv,l=e.pv;o.setRelative(s,a,i,l),o.touch(s),e.rp1=e.rp0,e.rp2=r,n&&(e.rp0=r)}function Fy(n){const e=n.stack,t=n.rp0,i=n.z0[t];let r=n.loop;const s=n.fv,a=n.pv,o=n.z1;for(;r--;){const l=e.pop(),c=o[l];s.setRelative(c,i,0,a),s.touch(c)}n.loop=1}function Oy(n){n.round=Q_}function xc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z0[r],a=e.fv,o=e.pv;let l=e.cvt[i],c=o.distance(s,Mr);n&&(Math.abs(c-l)<e.cvCutIn&&(c=l),c=e.round(c)),a.setRelative(s,Mr,c,o),e.zp0===0&&(s.xo=s.x,s.yo=s.y),a.touch(s),e.rp0=e.rp1=r}function Ny(n){const e=n.prog;let t=n.ip;const i=n.stack,r=e[++t];for(let s=0;s<r;s++)i.push(e[++t]);n.ip=t}function By(n){let e=n.ip;const t=n.prog,i=n.stack,r=t[++e];for(let s=0;s<r;s++){let a=t[++e]<<8|t[++e];a&32768&&(a=-((a^65535)+1)),i.push(a)}n.ip=e}function ky(n){const e=n.stack;let t=n.store;t||(t=n.store=[]);const i=e.pop(),r=e.pop();t[r]=i}function Gy(n){const e=n.stack,t=n.store,i=e.pop(),r=t&&t[i]||0;e.push(r)}function Vy(n){const e=n.stack,t=e.pop(),i=e.pop();n.cvt[i]=t/64}function zy(n){const e=n.stack,t=e.pop();e.push(n.cvt[t]*64)}function _c(n,e){const t=e.stack,i=t.pop(),r=e.z2[i];t.push(e.dpv.distance(r,Mr,n,!1)*64)}function yc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z1[i],a=e.z0[r],o=e.dpv.distance(a,s,n,n);e.stack.push(Math.round(o*64))}function Hy(n){n.stack.push(n.ppem)}function Wy(n){n.autoFlip=!0}function Xy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i<t?1:0)}function qy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i<=t?1:0)}function Yy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i>t?1:0)}function jy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i>=t?1:0)}function $y(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t===i?1:0)}function Zy(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t!==i?1:0)}function Ky(n){const e=n.stack,t=e.pop();e.push(Math.trunc(t)&1?1:0)}function Jy(n){const e=n.stack,t=e.pop();e.push(Math.trunc(t)&1?0:1)}function Qy(n){n.stack.pop()||uh(n,!0)}function eS(n){}function tS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t&&i?1:0)}function nS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(t||i?1:0)}function iS(n){const e=n.stack,t=e.pop();e.push(t?0:1)}function wa(n,e){const t=e.stack,i=t.pop(),r=e.fv,s=e.pv,a=e.ppem,o=e.deltaBase+(n-1)*16,l=e.deltaShift,c=e.z0;for(let u=0;u<i;u++){const f=t.pop(),h=t.pop();if(o+((h&240)>>4)!==a)continue;let p=(h&15)-8;p>=0&&p++;const v=c[f];r.setRelative(v,v,p*l,s)}}function rS(n){const t=n.stack.pop();n.deltaBase=t}function sS(n){const t=n.stack.pop();n.deltaShift=Math.pow(.5,t)}function aS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i+t)}function oS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i-t)}function lS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i*64/t)}function cS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(i*t/64)}function uS(n){const e=n.stack,t=e.pop();e.push(Math.abs(t))}function hS(n){const e=n.stack;let t=e.pop();e.push(-t)}function fS(n){const e=n.stack,t=e.pop();e.push(Math.floor(t/64)*64)}function dS(n){const e=n.stack,t=e.pop();e.push(Math.ceil(t/64)*64)}function cs(n,e){const t=e.stack,i=t.pop();t.push(e.round(i/64)*64)}function pS(n){const e=n.stack,t=e.pop(),i=e.pop();n.cvt[i]=t*n.ppem/n.font.unitsPerEm}function Pa(n,e){const t=e.stack,i=t.pop(),r=e.ppem,s=e.deltaBase+(n-1)*16,a=e.deltaShift;for(let o=0;o<i;o++){const l=t.pop(),c=t.pop();if(s+((c&240)>>4)!==r)continue;let f=(c&15)-8;f>=0&&f++;const h=f*a;e.cvt[l]+=h}}function mS(n){let e=n.stack.pop();n.round=ch;let t;switch(e&192){case 0:t=.5;break;case 64:t=1;break;case 128:t=2;break;default:throw new Error("invalid SROUND value")}switch(n.srPeriod=t,e&48){case 0:n.srPhase=0;break;case 16:n.srPhase=.25*t;break;case 32:n.srPhase=.5*t;break;case 48:n.srPhase=.75*t;break;default:throw new Error("invalid SROUND value")}e&=15,e===0?n.srThreshold=0:n.srThreshold=(e/8-.5)*t}function gS(n){let e=n.stack.pop();n.round=ch;let t;switch(e&192){case 0:t=Math.sqrt(2)/2;break;case 64:t=Math.sqrt(2);break;case 128:t=2*Math.sqrt(2);break;default:throw new Error("invalid S45ROUND value")}switch(n.srPeriod=t,e&48){case 0:n.srPhase=0;break;case 16:n.srPhase=.25*t;break;case 32:n.srPhase=.5*t;break;case 48:n.srPhase=.75*t;break;default:throw new Error("invalid S45ROUND value")}e&=15,e===0?n.srThreshold=0:n.srThreshold=(e/8-.5)*t}function vS(n){n.round=J_}function xS(n){n.round=ty}function _S(n){n.round=ny}function yS(n){n.stack.pop()}function Sc(n,e){const t=e.stack,i=t.pop(),r=t.pop(),s=e.z2[i],a=e.z1[r];let o,l;n?(o=s.y-a.y,l=a.x-s.x):(o=a.x-s.x,l=a.y-s.y),e.dpv=Dr(o,l)}function SS(n){const e=n.stack,t=e.pop();let i=0;t&1&&(i=35),t&32&&(i|=4096),e.push(i)}function bS(n){const e=n.stack,t=e.pop(),i=e.pop(),r=e.pop();e.push(i),e.push(t),e.push(r)}function MS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(Math.max(i,t))}function TS(n){const e=n.stack,t=e.pop(),i=e.pop();e.push(Math.min(i,t))}function ES(n){n.stack.pop()}function AS(n){const e=n.stack.pop();let t=n.stack.pop();switch(e){case 1:n.inhibitGridFit=!!t;return;case 2:n.ignoreCvt=!!t;return;default:throw new Error("invalid INSTCTRL[] selector")}}function jn(n,e){const t=e.stack,i=e.prog;let r=e.ip;for(let s=0;s<n;s++)t.push(i[++r]);e.ip=r}function $n(n,e){let t=e.ip;const i=e.prog,r=e.stack;for(let s=0;s<n;s++){let a=i[++t]<<8|i[++t];a&32768&&(a=-((a^65535)+1)),r.push(a)}e.ip=t}function De(n,e,t,i,r,s){const a=s.stack,o=n&&a.pop(),l=a.pop(),c=s.rp0,u=s.z0[c],f=s.z1[l],h=s.minDis,d=s.fv,p=s.dpv;let v,m,g;v=p.distance(f,u,!0,!0),m=v>=0?1:-1,v=Math.abs(v),n&&(g=s.cvt[o],i&&Math.abs(v-g)<s.cvCutIn&&(v=g)),t&&v<h&&(v=h),i&&(v=s.round(v)),d.setRelative(f,u,m*v,p),d.touch(f),s.rp1=s.rp0,s.rp2=l,e&&(s.rp0=l)}sh=[oc.bind(void 0,On),oc.bind(void 0,Mn),lc.bind(void 0,On),lc.bind(void 0,Mn),cc.bind(void 0,On),cc.bind(void 0,Mn),uc.bind(void 0,0),uc.bind(void 0,1),hc.bind(void 0,0),hc.bind(void 0,1),ry,sy,ay,oy,ly,cy,uy,hy,fy,dy,py,my,gy,vy,xy,_y,yy,Sy,by,My,void 0,void 0,Ty,Ra,Ey,Ay,Cy,Py,Ly,void 0,void 0,void 0,Ry,wy,Dy,void 0,fc.bind(void 0,0),fc.bind(void 0,1),dc.bind(void 0,On),dc.bind(void 0,Mn),pc.bind(void 0,0),pc.bind(void 0,1),mc.bind(void 0,0),mc.bind(void 0,1),gc.bind(void 0,0),gc.bind(void 0,1),Iy,Uy,vc.bind(void 0,0),vc.bind(void 0,1),Fy,Oy,xc.bind(void 0,0),xc.bind(void 0,1),Ny,By,ky,Gy,Vy,zy,_c.bind(void 0,0),_c.bind(void 0,1),void 0,yc.bind(void 0,0),yc.bind(void 0,1),Hy,void 0,Wy,void 0,void 0,Xy,qy,Yy,jy,$y,Zy,Ky,Jy,Qy,eS,tS,nS,iS,wa.bind(void 0,1),rS,sS,aS,oS,lS,cS,uS,hS,fS,dS,cs.bind(void 0,0),cs.bind(void 0,1),cs.bind(void 0,2),cs.bind(void 0,3),void 0,void 0,void 0,void 0,pS,wa.bind(void 0,2),wa.bind(void 0,3),Pa.bind(void 0,1),Pa.bind(void 0,2),Pa.bind(void 0,3),mS,gS,void 0,void 0,vS,void 0,xS,_S,Ra,Ra,void 0,void 0,void 0,void 0,void 0,yS,Sc.bind(void 0,0),Sc.bind(void 0,1),SS,void 0,bS,MS,TS,ES,AS,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,jn.bind(void 0,1),jn.bind(void 0,2),jn.bind(void 0,3),jn.bind(void 0,4),jn.bind(void 0,5),jn.bind(void 0,6),jn.bind(void 0,7),jn.bind(void 0,8),$n.bind(void 0,1),$n.bind(void 0,2),$n.bind(void 0,3),$n.bind(void 0,4),$n.bind(void 0,5),$n.bind(void 0,6),$n.bind(void 0,7),$n.bind(void 0,8),De.bind(void 0,0,0,0,0,0),De.bind(void 0,0,0,0,0,1),De.bind(void 0,0,0,0,0,2),De.bind(void 0,0,0,0,0,3),De.bind(void 0,0,0,0,1,0),De.bind(void 0,0,0,0,1,1),De.bind(void 0,0,0,0,1,2),De.bind(void 0,0,0,0,1,3),De.bind(void 0,0,0,1,0,0),De.bind(void 0,0,0,1,0,1),De.bind(void 0,0,0,1,0,2),De.bind(void 0,0,0,1,0,3),De.bind(void 0,0,0,1,1,0),De.bind(void 0,0,0,1,1,1),De.bind(void 0,0,0,1,1,2),De.bind(void 0,0,0,1,1,3),De.bind(void 0,0,1,0,0,0),De.bind(void 0,0,1,0,0,1),De.bind(void 0,0,1,0,0,2),De.bind(void 0,0,1,0,0,3),De.bind(void 0,0,1,0,1,0),De.bind(void 0,0,1,0,1,1),De.bind(void 0,0,1,0,1,2),De.bind(void 0,0,1,0,1,3),De.bind(void 0,0,1,1,0,0),De.bind(void 0,0,1,1,0,1),De.bind(void 0,0,1,1,0,2),De.bind(void 0,0,1,1,0,3),De.bind(void 0,0,1,1,1,0),De.bind(void 0,0,1,1,1,1),De.bind(void 0,0,1,1,1,2),De.bind(void 0,0,1,1,1,3),De.bind(void 0,1,0,0,0,0),De.bind(void 0,1,0,0,0,1),De.bind(void 0,1,0,0,0,2),De.bind(void 0,1,0,0,0,3),De.bind(void 0,1,0,0,1,0),De.bind(void 0,1,0,0,1,1),De.bind(void 0,1,0,0,1,2),De.bind(void 0,1,0,0,1,3),De.bind(void 0,1,0,1,0,0),De.bind(void 0,1,0,1,0,1),De.bind(void 0,1,0,1,0,2),De.bind(void 0,1,0,1,0,3),De.bind(void 0,1,0,1,1,0),De.bind(void 0,1,0,1,1,1),De.bind(void 0,1,0,1,1,2),De.bind(void 0,1,0,1,1,3),De.bind(void 0,1,1,0,0,0),De.bind(void 0,1,1,0,0,1),De.bind(void 0,1,1,0,0,2),De.bind(void 0,1,1,0,0,3),De.bind(void 0,1,1,0,1,0),De.bind(void 0,1,1,0,1,1),De.bind(void 0,1,1,0,1,2),De.bind(void 0,1,1,0,1,3),De.bind(void 0,1,1,1,0,0),De.bind(void 0,1,1,1,0,1),De.bind(void 0,1,1,1,0,2),De.bind(void 0,1,1,1,0,3),De.bind(void 0,1,1,1,1,0),De.bind(void 0,1,1,1,1,1),De.bind(void 0,1,1,1,1,2),De.bind(void 0,1,1,1,1,3)];var CS=oh;function er(n){this.char=n,this.state={},this.activeState=null}function Ao(n,e,t){this.contextName=t,this.startIndex=n,this.endOffset=e}function RS(n,e,t){this.contextName=n,this.openRange=null,this.ranges=[],this.checkStart=e,this.checkEnd=t}function Yt(n,e){this.context=n,this.index=e,this.length=n.length,this.current=n[e],this.backtrack=n.slice(0,e),this.lookahead=n.slice(e+1)}function ks(n){this.eventId=n,this.subscribers=[]}function wS(n){const e=["start","end","next","newToken","contextStart","contextEnd","insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD","updateContextsRanges"];for(let i=0;i<e.length;i++){const r=e[i];Object.defineProperty(this.events,r,{value:new ks(r)})}if(n)for(let i=0;i<e.length;i++){const r=e[i],s=n[r];typeof s=="function"&&this.events[r].subscribe(s)}const t=["insertToken","removeToken","removeRange","replaceToken","replaceRange","composeRUD"];for(let i=0;i<t.length;i++){const r=t[i];this.events[r].subscribe(this.updateContextsRanges)}}function Tt(n){this.tokens=[],this.registeredContexts={},this.contextCheckers=[],this.events={},this.registeredModifiers=[],wS.call(this,n)}er.prototype.setState=function(n,e){return this.state[n]=e,this.activeState={key:n,value:this.state[n]},this.activeState};er.prototype.getState=function(n){return this.state[n]||null};Tt.prototype.inboundIndex=function(n){return n>=0&&n<this.tokens.length};Tt.prototype.composeRUD=function(n){const t=n.map(r=>this[r[0]].apply(this,r.slice(1).concat(!0))),i=r=>typeof r=="object"&&Object.prototype.hasOwnProperty.call(r,"FAIL");if(t.every(i))return{FAIL:"composeRUD: one or more operations hasn't completed successfully",report:t.filter(i)};this.dispatch("composeRUD",[t.filter(r=>!i(r))])};Tt.prototype.replaceRange=function(n,e,t,i){e=e!==null?e:this.tokens.length;const r=t.every(s=>s instanceof er);if(!isNaN(n)&&this.inboundIndex(n)&&r){const s=this.tokens.splice.apply(this.tokens,[n,e].concat(t));return i||this.dispatch("replaceToken",[n,e,t]),[s,t]}else return{FAIL:"replaceRange: invalid tokens or startIndex."}};Tt.prototype.replaceToken=function(n,e,t){if(!isNaN(n)&&this.inboundIndex(n)&&e instanceof er){const i=this.tokens.splice(n,1,e);return t||this.dispatch("replaceToken",[n,e]),[i[0],e]}else return{FAIL:"replaceToken: invalid token or index."}};Tt.prototype.removeRange=function(n,e,t){e=isNaN(e)?this.tokens.length:e;const i=this.tokens.splice(n,e);return t||this.dispatch("removeRange",[i,n,e]),i};Tt.prototype.removeToken=function(n,e){if(!isNaN(n)&&this.inboundIndex(n)){const t=this.tokens.splice(n,1);return e||this.dispatch("removeToken",[t,n]),t}else return{FAIL:"removeToken: invalid token index."}};Tt.prototype.insertToken=function(n,e,t){return n.every(r=>r instanceof er)?(this.tokens.splice.apply(this.tokens,[e,0].concat(n)),t||this.dispatch("insertToken",[n,e]),n):{FAIL:"insertToken: invalid token(s)."}};Tt.prototype.registerModifier=function(n,e,t){this.events.newToken.subscribe(function(i,r){const s=[i,r],a=e===null||e.apply(this,s)===!0,o=[i,r];if(a){let l=t.apply(this,o);i.setState(n,l)}}),this.registeredModifiers.push(n)};ks.prototype.subscribe=function(n){return typeof n=="function"?this.subscribers.push(n)-1:{FAIL:`invalid '${this.eventId}' event handler`}};ks.prototype.unsubscribe=function(n){this.subscribers.splice(n,1)};Yt.prototype.setCurrentIndex=function(n){this.index=n,this.current=this.context[n],this.backtrack=this.context.slice(0,n),this.lookahead=this.context.slice(n+1)};Yt.prototype.get=function(n){switch(!0){case n===0:return this.current;case(n<0&&Math.abs(n)<=this.backtrack.length):return this.backtrack.slice(n)[0];case(n>0&&n<=this.lookahead.length):return this.lookahead[n-1];default:return null}};Tt.prototype.rangeToText=function(n){if(n instanceof Ao)return this.getRangeTokens(n).map(e=>e.char).join("")};Tt.prototype.getText=function(){return this.tokens.map(n=>n.char).join("")};Tt.prototype.getContext=function(n){let e=this.registeredContexts[n];return e||null};Tt.prototype.on=function(n,e){const t=this.events[n];return t?t.subscribe(e):null};Tt.prototype.dispatch=function(n,e){const t=this.events[n];if(t instanceof ks)for(let i=0;i<t.subscribers.length;i++)t.subscribers[i].apply(this,e||[])};Tt.prototype.registerContextChecker=function(n,e,t){if(this.getContext(n))return{FAIL:`context name '${n}' is already registered.`};if(typeof e!="function")return{FAIL:"missing context start check."};if(typeof t!="function")return{FAIL:"missing context end check."};const i=new RS(n,e,t);return this.registeredContexts[n]=i,this.contextCheckers.push(i),i};Tt.prototype.getRangeTokens=function(n){const e=n.startIndex+n.endOffset;return[].concat(this.tokens.slice(n.startIndex,e))};Tt.prototype.getContextRanges=function(n){const e=this.getContext(n);return e?e.ranges:{FAIL:`context checker '${n}' is not registered.`}};Tt.prototype.resetContextsRanges=function(){const n=this.registeredContexts;for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)){const t=n[e];t.ranges=[]}};Tt.prototype.updateContextsRanges=function(){this.resetContextsRanges();const n=this.tokens.map(e=>e.char);for(let e=0;e<n.length;e++){const t=new Yt(n,e);this.runContextCheck(t)}this.dispatch("updateContextsRanges",[this.registeredContexts])};Tt.prototype.setEndOffset=function(n,e){const t=this.getContext(e).openRange.startIndex;let i=new Ao(t,n,e);const r=this.getContext(e).ranges;return i.rangeId=`${e}.${r.length}`,r.push(i),this.getContext(e).openRange=null,i};Tt.prototype.runContextCheck=function(n){const e=n.index;for(let t=0;t<this.contextCheckers.length;t++){const i=this.contextCheckers[t];let r=i.contextName,s=this.getContext(r).openRange;if(!s&&i.checkStart(n)&&(s=new Ao(e,null,r),this.getContext(r).openRange=s,this.dispatch("contextStart",[r,e])),s&&i.checkEnd(n)){const a=e-s.startIndex+1,o=this.setEndOffset(a,r);this.dispatch("contextEnd",[r,o])}}};Tt.prototype.tokenize=function(n){this.tokens=[],this.resetContextsRanges();let e=Array.from(n);this.dispatch("start");for(let t=0;t<e.length;t++){const i=e[t],r=new Yt(e,t);this.dispatch("next",[r]),this.runContextCheck(r);let s=new er(i);this.tokens.push(s),this.dispatch("newToken",[s,r])}return this.dispatch("end",[this.tokens]),this.tokens};var PS=Tt;function Qn(n){return/[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(n)}function hh(n){return/[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(n)}function ti(n){return/[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(n)}function ps(n){return/[\u0E00-\u0E7F]/.test(n)}function ms(n){return/[A-z]/.test(n)}function LS(n){return/\s/.test(n)}function en(n){this.font=n,this.features={}}function Zn(n){this.id=n.id,this.tag=n.tag,this.substitution=n.substitution}function ni(n,e){if(!n)return-1;switch(e.format){case 1:return e.glyphs.indexOf(n);case 2:{let t=e.ranges;for(let i=0;i<t.length;i++){const r=t[i];if(n>=r.start&&n<=r.end){let s=n-r.start;return r.index+s}}break}default:return-1}return-1}function DS(n,e){return ni(n,e.coverage)===-1?null:n+e.deltaGlyphId}function IS(n,e){let t=ni(n,e.coverage);return t===-1?null:e.substitute[t]}function La(n,e){let t=[];for(let i=0;i<n.length;i++){const r=n[i];let s=e.current;s=Array.isArray(s)?s[0]:s;const a=ni(s,r);a!==-1&&t.push(a)}return t.length!==n.length?-1:t}function US(n,e){const t=e.inputCoverage.length+e.lookaheadCoverage.length+e.backtrackCoverage.length;if(n.context.length<t)return[];let i=La(e.inputCoverage,n);if(i===-1)return[];const r=e.inputCoverage.length-1;if(n.lookahead.length<e.lookaheadCoverage.length)return[];let s=n.lookahead.slice(r);for(;s.length&&ti(s[0].char);)s.shift();const a=new Yt(s,0);let o=La(e.lookaheadCoverage,a),l=[].concat(n.backtrack);for(l.reverse();l.length&&ti(l[0].char);)l.shift();if(l.length<e.backtrackCoverage.length)return[];const c=new Yt(l,0);let u=La(e.backtrackCoverage,c);const f=i.length===e.inputCoverage.length&&o.length===e.lookaheadCoverage.length&&u.length===e.backtrackCoverage.length;let h=[];if(f)for(let d=0;d<e.lookupRecords.length;d++){const p=e.lookupRecords[d],v=p.lookupListIndex,m=this.getLookupByIndex(v);for(let g=0;g<m.subtables.length;g++){let _=m.subtables[g],S,b=this.getSubstitutionType(m,_);if(b==="71"?(b=this.getSubstitutionType(_,_.extension),S=this.getLookupMethod(_,_.extension),_=_.extension):S=this.getLookupMethod(m,_),b==="12"){const R=n.get(p.sequenceIndex),T=S(R);T&&h.push(T)}else if(b==="21"){const R=n.get(p.sequenceIndex),T=S(R);T&&h.push(T)}else throw new Error(`Substitution type ${b} is not supported in chaining substitution`)}}return h}function FS(n,e){let t=n.current,i=ni(t,e.coverage);if(i===-1)return null;let r,s=e.ligatureSets[i];for(let a=0;a<s.length;a++){r=s[a];for(let o=0;o<r.components.length;o++){const l=n.lookahead[o],c=r.components[o];if(l!==c)break;if(o===r.components.length-1)return r}}return null}function OS(n,e){let t=n.current;if(ni(t,e.coverage)===-1)return null;for(const r of e.ruleSets)for(const s of r){let a=!0;for(let o=0;o<s.input.length;o++)if(n.lookahead[o]!==s.input[o]){a=!1;break}if(a){let o=[];o.push(t);for(let c=0;c<s.input.length;c++)o.push(s.input[c]);const l=(c,u)=>{const{lookupListIndex:f,sequenceIndex:h}=u,{subtables:d}=this.getLookupByIndex(f);for(const p of d)ni(c[h],p.coverage)!==-1&&(c[h]=p.deltaGlyphId)};for(let c=0;c<s.lookupRecords.length;c++){const u=s.lookupRecords[c];l(o,u)}return o}}return null}function NS(n,e){if(n.context.length<e.coverages.length)return[];for(let i=0;i<e.coverages.length;i++){let r=n.get(i);if(r=Array.isArray(r)?r[0]:r,ni(r,e.coverages[i])===-1)return[]}let t=[];for(let i=0;i<e.lookupRecords.length;i++){const r=e.lookupRecords[i],s=r.lookupListIndex,a=this.getLookupByIndex(s);for(let o=0;o<a.subtables.length;o++){let l=a.subtables[o],c,u=this.getSubstitutionType(a,l);if(u==="71"?(u=this.getSubstitutionType(l,l.extension),c=this.getLookupMethod(l,l.extension),l=l.extension):c=this.getLookupMethod(a,l),u==="12"){const f=n.get(r.sequenceIndex),h=c(f);h&&t.push(h)}else if(u==="21"){const f=n.get(r.sequenceIndex),h=c(f);h&&t.push(h)}}}return t}function BS(n,e){let t=ni(n,e.coverage);return t===-1?null:e.sequences[t]}en.prototype.getDefaultScriptFeaturesIndexes=function(){const n=this.font.tables.gsub.scripts;for(let e=0;e<n.length;e++){const t=n[e];if(t.tag==="DFLT")return t.script.defaultLangSys.featureIndexes}return[]};en.prototype.getScriptFeaturesIndexes=function(n){if(!this.font.tables.gsub)return[];if(!n)return this.getDefaultScriptFeaturesIndexes();const t=this.font.tables.gsub.scripts;for(let i=0;i<t.length;i++){const r=t[i];if(r.tag===n&&r.script.defaultLangSys)return r.script.defaultLangSys.featureIndexes;{let s=r.langSysRecords;if(s)for(let a=0;a<s.length;a++){const o=s[a];if(o.tag===n)return o.langSys.featureIndexes}}}return this.getDefaultScriptFeaturesIndexes()};en.prototype.mapTagsToFeatures=function(n,e){let t={};for(let i=0;i<n.length;i++){const r=n[i].tag,s=n[i].feature;t[r]=s}this.features[e].tags=t};en.prototype.getScriptFeatures=function(n){let e=this.features[n];if(Object.prototype.hasOwnProperty.call(this.features,n))return e;const t=this.getScriptFeaturesIndexes(n);if(!t)return null;const i=this.font.tables.gsub;return e=t.map(r=>i.features[r]),this.features[n]=e,this.mapTagsToFeatures(e,n),e};en.prototype.getSubstitutionType=function(n,e){const t=n.lookupType.toString(),i=e.substFormat.toString();return t+i};en.prototype.getLookupMethod=function(n,e){let t=this.getSubstitutionType(n,e);switch(t){case"11":return i=>DS.apply(this,[i,e]);case"12":return i=>IS.apply(this,[i,e]);case"63":return i=>US.apply(this,[i,e]);case"41":return i=>FS.apply(this,[i,e]);case"21":return i=>BS.apply(this,[i,e]);case"51":return i=>OS.apply(this,[i,e]);case"53":return i=>NS.apply(this,[i,e]);default:throw new Error(`substitutionType : ${t} lookupType: ${n.lookupType} - substFormat: ${e.substFormat} is not yet supported`)}};en.prototype.lookupFeature=function(n){let e=n.contextParams,t=e.index;const i=this.getFeature({tag:n.tag,script:n.script});if(!i)return new Error(`font '${(this.font.names.unicode||this.font.names.windows||this.font.names.macintosh).fullName.en}' doesn't support feature '${n.tag}' for script '${n.script}'.`);const r=this.getFeatureLookups(i),s=[].concat(e.context);for(let a=0;a<r.length;a++){const o=r[a],l=this.getLookupSubtables(o);for(let c=0;c<l.length;c++){let u=l[c],f=this.getSubstitutionType(o,u),h;f==="71"?(f=this.getSubstitutionType(u,u.extension),h=this.getLookupMethod(u,u.extension),u=u.extension):h=this.getLookupMethod(o,u);let d;switch(f){case"11":d=h(e.current),d&&s.splice(t,1,new Zn({id:11,tag:n.tag,substitution:d}));break;case"12":d=h(e.current),d&&s.splice(t,1,new Zn({id:12,tag:n.tag,substitution:d}));break;case"63":d=h(e),Array.isArray(d)&&d.length&&s.splice(t,1,new Zn({id:63,tag:n.tag,substitution:d}));break;case"41":d=h(e),d&&s.splice(t,1,new Zn({id:41,tag:n.tag,substitution:d}));break;case"21":d=h(e.current),d&&s.splice(t,1,new Zn({id:21,tag:n.tag,substitution:d}));break;case"51":case"53":d=h(e),Array.isArray(d)&&d.length&&s.splice(t,1,new Zn({id:parseInt(f),tag:n.tag,substitution:d}));break}e=new Yt(s,t),!(Array.isArray(d)&&!d.length)&&(d=null)}}return s.length?s:null};en.prototype.supports=function(n){if(!n.script)return!1;this.getScriptFeatures(n.script);const e=Object.prototype.hasOwnProperty.call(this.features,n.script);if(!n.tag)return e;const t=this.features[n.script].some(i=>i.tag===n.tag);return e&&t};en.prototype.getLookupSubtables=function(n){return n.subtables||null};en.prototype.getLookupByIndex=function(n){return this.font.tables.gsub.lookups[n]||null};en.prototype.getFeatureLookups=function(n){return n.lookupListIndexes.map(this.getLookupByIndex.bind(this))};en.prototype.getFeature=function(e){if(!this.font)return{FAIL:"No font was found"};Object.prototype.hasOwnProperty.call(this.features,e.script)||this.getScriptFeatures(e.script);const t=this.features[e.script];return t?t.tags[e.tag]?this.features[e.script].tags[e.tag]:null:{FAIL:`No feature for script ${e.script}`}};var kS=en;function GS(n){const e=n.current,t=n.get(-1);return t===null&&Qn(e)||!Qn(t)&&Qn(e)}function VS(n){const e=n.get(1);return e===null||!Qn(e)}var zS={startCheck:GS,endCheck:VS};function HS(n){const e=n.current,t=n.get(-1);return(Qn(e)||ti(e))&&!Qn(t)}function WS(n){const e=n.get(1);switch(!0){case e===null:return!0;case(!Qn(e)&&!ti(e)):{const t=LS(e);if(!t)return!0;if(t){let i=!1;if(i=n.lookahead.some(r=>Qn(r)||ti(r)),!i)return!0}break}default:return!1}}var XS={startCheck:HS,endCheck:WS};function qS(n,e,t){e[t].setState(n.tag,n.substitution)}function YS(n,e,t){e[t].setState(n.tag,n.substitution)}function Da(n,e,t){for(let i=0;i<n.substitution.length;i++){const r=n.substitution[i],s=e[t+i];if(Array.isArray(r)){r.length?s.setState(n.tag,r[0]):s.setState("deleted",!0);continue}s.setState(n.tag,r)}}function jS(n,e,t){let i=e[t];i.setState(n.tag,n.substitution.ligGlyph);const r=n.substitution.components.length;for(let s=0;s<r;s++)i=e[t+s+1],i.setState("deleted",!0)}var bc={11:qS,12:YS,63:Da,41:jS,51:Da,53:Da};function $S(n,e,t){n instanceof Zn&&bc[n.id]&&bc[n.id](n,e,t)}var Si=$S;function ZS(n){let e=[].concat(n.backtrack);for(let t=e.length-1;t>=0;t--){const i=e[t],r=hh(i),s=ti(i);if(!r&&!s)return!0;if(r)return!1}return!1}function KS(n){if(hh(n.current))return!1;for(let e=0;e<n.lookahead.length;e++){const t=n.lookahead[e];if(!ti(t))return!0}return!1}function JS(n){const e="arab",t=this.featuresTags[e],i=this.tokenizer.getRangeTokens(n);if(i.length===1)return;let r=new Yt(i.map(a=>a.getState("glyphIndex")),0);const s=new Yt(i.map(a=>a.char),0);for(let a=0;a<i.length;a++){const o=i[a];if(ti(o.char))continue;r.setCurrentIndex(a),s.setCurrentIndex(a);let l=0;ZS(s)&&(l|=1),KS(s)&&(l|=2);let c;switch(l){case 1:c="fina";break;case 2:c="init";break;case 3:c="medi";break}if(t.indexOf(c)===-1)continue;let u=this.query.lookupFeature({tag:c,script:e,contextParams:r});if(u instanceof Error){console.info(u.message);continue}for(let f=0;f<u.length;f++){const h=u[f];h instanceof Zn&&(Si(h,i,f),r.context[f]=h.substitution)}}}var QS=JS;function Mc(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,0)}function e1(n){const e="arab";let t=this.tokenizer.getRangeTokens(n),i=Mc(t);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"rlig",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Si(o,t,r)}i=Mc(t)}}}var t1=e1;function n1(n){return n.index===0&&n.context.length>1}function i1(n){return n.index===n.context.length-1}var r1={startCheck:n1,endCheck:i1};function Tc(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,0)}function s1(n){const e="delf",t="ccmp";let i=this.tokenizer.getRangeTokens(n),r=Tc(i);for(let s=0;s<r.context.length;s++){if(!this.query.getFeature({tag:t,script:e,contextParams:r}))continue;r.setCurrentIndex(s);let a=this.query.lookupFeature({tag:t,script:e,contextParams:r});if(a.length){for(let o=0;o<a.length;o++){const l=a[o];Si(l,i,s)}r=Tc(i)}}}var a1=s1;function o1(n){const e=n.current,t=n.get(-1);return t===null&&ms(e)||!ms(t)&&ms(e)}function l1(n){const e=n.get(1);return e===null||!ms(e)}var c1={startCheck:o1,endCheck:l1};function Ec(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,0)}function u1(n){const e="latn";let t=this.tokenizer.getRangeTokens(n),i=Ec(t);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"liga",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Si(o,t,r)}i=Ec(t)}}}var h1=u1;function f1(n){const e=n.current,t=n.get(-1);return t===null&&ps(e)||!ps(t)&&ps(e)}function d1(n){const e=n.get(1);return e===null||!ps(e)}var p1={startCheck:f1,endCheck:d1};function Ac(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,e||0)}function m1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Ac(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"ccmp",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Si(o,t,r)}i=Ac(t,r)}}}var g1=m1;function Cc(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,e||0)}function v1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Cc(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"liga",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Si(o,t,r)}i=Cc(t,r)}}}var x1=v1;function Rc(n,e){const t=n.map(i=>i.activeState.value);return new Yt(t,e||0)}function _1(n){const e="thai";let t=this.tokenizer.getRangeTokens(n),i=Rc(t,0);for(let r=0;r<i.context.length;r++){i.setCurrentIndex(r);let s=this.query.lookupFeature({tag:"rlig",script:e,contextParams:i});if(s.length){for(let a=0;a<s.length;a++){const o=s[a];Si(o,t,r)}i=Rc(t,r)}}}var y1=_1;function eo(n){if(n===null)return!1;const e=n.codePointAt(0);return e>=6155&&e<=6157||e>=65024&&e<=65039||e>=917760&&e<=917999}function S1(n){const e=n.current,t=n.get(1);return t===null&&eo(e)||eo(t)}function b1(n){const e=n.get(1);return e===null||!eo(e)}var M1={startCheck:S1,endCheck:b1};function T1(n){const e=this.query.font,t=this.tokenizer.getRangeTokens(n);if(t[1].setState("deleted",!0),e.tables.cmap&&e.tables.cmap.varSelectorList){const i=t[0].char.codePointAt(0),r=t[1].char.codePointAt(0),s=e.tables.cmap.varSelectorList[r];if(s!==void 0&&s.nonDefaultUVS){const a=s.nonDefaultUVS.uvsMappings;if(a[i]){const o=a[i].glyphID;e.glyphs.glyphs[o]!==void 0&&t[0].setState("glyphIndex",o)}}}}var E1=T1;function sn(n){this.baseDir=n||"ltr",this.tokenizer=new PS,this.featuresTags={}}sn.prototype.setText=function(n){this.text=n};sn.prototype.contextChecks={ccmpReplacementCheck:r1,latinWordCheck:c1,arabicWordCheck:zS,arabicSentenceCheck:XS,thaiWordCheck:p1,unicodeVariationSequenceCheck:M1};function Gi(n){const e=this.contextChecks[`${n}Check`];return this.tokenizer.registerContextChecker(n,e.startCheck,e.endCheck)}function A1(){return Gi.call(this,"ccmpReplacement"),Gi.call(this,"latinWord"),Gi.call(this,"arabicWord"),Gi.call(this,"arabicSentence"),Gi.call(this,"thaiWord"),Gi.call(this,"unicodeVariationSequence"),this.tokenizer.tokenize(this.text)}function C1(){const n=this.tokenizer.getContextRanges("arabicSentence");for(let e=0;e<n.length;e++){const t=n[e];let i=this.tokenizer.getRangeTokens(t);this.tokenizer.replaceRange(t.startIndex,t.endOffset,i.reverse())}}sn.prototype.registerFeatures=function(n,e){const t=e.filter(i=>this.query.supports({script:n,tag:i}));Object.prototype.hasOwnProperty.call(this.featuresTags,n)?this.featuresTags[n]=this.featuresTags[n].concat(t):this.featuresTags[n]=t};sn.prototype.applyFeatures=function(n,e){if(!n)throw new Error("No valid font was provided to apply features");this.query||(this.query=new kS(n));for(let t=0;t<e.length;t++){const i=e[t];this.query.supports({script:i.script})&&this.registerFeatures(i.script,i.tags)}};sn.prototype.registerModifier=function(n,e,t){this.tokenizer.registerModifier(n,e,t)};function Ir(){if(this.tokenizer.registeredModifiers.indexOf("glyphIndex")===-1)throw new Error("glyphIndex modifier is required to apply arabic presentation features.")}function R1(){if(!Object.prototype.hasOwnProperty.call(this.featuresTags,"arab"))return;Ir.call(this);const e=this.tokenizer.getContextRanges("arabicWord");for(let t=0;t<e.length;t++){const i=e[t];QS.call(this,i)}}function w1(){Ir.call(this);const n=this.tokenizer.getContextRanges("ccmpReplacement");for(let e=0;e<n.length;e++){const t=n[e];a1.call(this,t)}}function P1(){if(!this.hasFeatureEnabled("arab","rlig"))return;Ir.call(this);const n=this.tokenizer.getContextRanges("arabicWord");for(let e=0;e<n.length;e++){const t=n[e];t1.call(this,t)}}function L1(){if(!this.hasFeatureEnabled("latn","liga"))return;Ir.call(this);const n=this.tokenizer.getContextRanges("latinWord");for(let e=0;e<n.length;e++){const t=n[e];h1.call(this,t)}}function D1(){const n=this.tokenizer.getContextRanges("unicodeVariationSequence");for(let e=0;e<n.length;e++){const t=n[e];E1.call(this,t)}}function I1(){Ir.call(this);const n=this.tokenizer.getContextRanges("thaiWord");for(let e=0;e<n.length;e++){const t=n[e];this.hasFeatureEnabled("thai","liga")&&x1.call(this,t),this.hasFeatureEnabled("thai","rlig")&&y1.call(this,t),this.hasFeatureEnabled("thai","ccmp")&&g1.call(this,t)}}sn.prototype.checkContextReady=function(n){return!!this.tokenizer.getContext(n)};sn.prototype.applyFeaturesToContexts=function(){this.checkContextReady("ccmpReplacement")&&w1.call(this),this.checkContextReady("arabicWord")&&(R1.call(this),P1.call(this)),this.checkContextReady("latinWord")&&L1.call(this),this.checkContextReady("arabicSentence")&&C1.call(this),this.checkContextReady("thaiWord")&&I1.call(this),this.checkContextReady("unicodeVariationSequence")&&D1.call(this)};sn.prototype.hasFeatureEnabled=function(n,e){return(this.featuresTags[n]||[]).indexOf(e)!==-1};sn.prototype.processText=function(n){(!this.text||this.text!==n)&&(this.setText(n),A1.call(this),this.applyFeaturesToContexts())};sn.prototype.getBidiText=function(n){return this.processText(n),this.tokenizer.getText()};sn.prototype.getTextGlyphs=function(n){this.processText(n);let e=[];for(let t=0;t<this.tokenizer.tokens.length;t++){const i=this.tokenizer.tokens[t];if(i.state.deleted)continue;const r=i.activeState.value;e.push(Array.isArray(r)?r[0]:r)}return e};var U1=sn;function Ia(n){return{fontFamily:{en:n.familyName||" "},fontSubfamily:{en:n.styleName||" "},fullName:{en:n.fullName||n.familyName+" "+n.styleName},postScriptName:{en:n.postScriptName||(n.familyName+n.styleName).replace(/\s/g,"")},designer:{en:n.designer||" "},designerURL:{en:n.designerURL||" "},manufacturer:{en:n.manufacturer||" "},manufacturerURL:{en:n.manufacturerURL||" "},license:{en:n.license||" "},licenseURL:{en:n.licenseURL||" "},version:{en:n.version||"Version 0.1"},description:{en:n.description||" "},copyright:{en:n.copyright||" "},trademark:{en:n.trademark||" "}}}function dt(n){if(n=n||{},n.tables=n.tables||{},!n.empty){if(!n.familyName)throw new Error("When creating a new Font object, familyName is required.");if(!n.styleName)throw new Error("When creating a new Font object, styleName is required.");if(!n.unitsPerEm)throw new Error("When creating a new Font object, unitsPerEm is required.");if(!n.ascender)throw new Error("When creating a new Font object, ascender is required.");if(n.descender>0)throw new Error("When creating a new Font object, negative descender value is required.");this.names={},this.names.unicode=Ia(n),this.names.macintosh=Ia(n),this.names.windows=Ia(n),this.unitsPerEm=n.unitsPerEm||1e3,this.ascender=n.ascender,this.descender=n.descender,this.createdTimestamp=n.createdTimestamp,this.italicAngle=n.italicAngle||0,this.weightClass=n.weightClass||0;let e=0;n.fsSelection?e=n.fsSelection:(this.italicAngle<0?e|=this.fsSelectionValues.ITALIC:this.italicAngle>0&&(e|=this.fsSelectionValues.OBLIQUE),this.weightClass>=600&&(e|=this.fsSelectionValues.BOLD),e===0&&(e=this.fsSelectionValues.REGULAR)),(!n.panose||!Array.isArray(n.panose))&&(n.panose=[0,0,0,0,0,0,0,0,0]),this.tables=Object.assign(n.tables,{os2:Object.assign({usWeightClass:n.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:n.widthClass||this.usWidthClasses.MEDIUM,bFamilyType:n.panose[0]||0,bSerifStyle:n.panose[1]||0,bWeight:n.panose[2]||0,bProportion:n.panose[3]||0,bContrast:n.panose[4]||0,bStrokeVariation:n.panose[5]||0,bArmStyle:n.panose[6]||0,bLetterform:n.panose[7]||0,bMidline:n.panose[8]||0,bXHeight:n.panose[9]||0,fsSelection:e},n.tables.os2)})}this.supported=!0,this.glyphs=new Cn.GlyphSet(this,n.glyphs||[]),this.encoding=new Tu(this),this.position=new w_(this),this.substitution=new O_(this),this.tables=this.tables||{},this.tables=new Proxy(this.tables,{set:(e,t,i)=>(e[t]=i,e.fvar&&(e.gvar||e.cff2)&&!this.variation&&(this.variation=new K_(this)),!0)}),this.palettes=new th(this),this.layers=new N_(this),this.svgImages=new B_(this),this._push=null,this._hmtxTableData={},Object.defineProperty(this,"hinting",{get:function(){return this._hinting?this._hinting:this.outlinesFormat==="truetype"?this._hinting=new CS(this):null}})}dt.prototype.hasChar=function(n){return this.encoding.charToGlyphIndex(n)>0};dt.prototype.charToGlyphIndex=function(n){return this.encoding.charToGlyphIndex(n)};dt.prototype.charToGlyph=function(n){const e=this.charToGlyphIndex(n);let t=this.glyphs.get(e);return t||(t=this.glyphs.get(0)),t};dt.prototype.updateFeatures=function(n){return this.defaultRenderOptions.features.map(e=>e.script==="latn"?{script:"latn",tags:e.tags.filter(t=>n[t])}:e)};dt.prototype.stringToGlyphIndexes=function(n,e){const t=new U1,i=s=>this.charToGlyphIndex(s.char);t.registerModifier("glyphIndex",null,i);let r=e?this.updateFeatures(e.features):this.defaultRenderOptions.features;return t.applyFeatures(this,r),t.getTextGlyphs(n)};dt.prototype.stringToGlyphs=function(n,e){const t=this.stringToGlyphIndexes(n,e);let i=t.length;const r=new Array(i),s=this.glyphs.get(0);for(let a=0;a<i;a+=1)r[a]=this.glyphs.get(t[a])||s;return r};dt.prototype.nameToGlyphIndex=function(n){return this.glyphNames.nameToGlyphIndex(n)};dt.prototype.nameToGlyph=function(n){const e=this.nameToGlyphIndex(n);let t=this.glyphs.get(e);return t||(t=this.glyphs.get(0)),t};dt.prototype.glyphIndexToName=function(n){return this.glyphNames.glyphIndexToName?this.glyphNames.glyphIndexToName(n):""};dt.prototype.getKerningValue=function(n,e){n=n.index||n,e=e.index||e;const t=this.position.defaultKerningTables;return t?this.position.getKerningValue(t,n,e):this.kerningPairs[n+","+e]||0};dt.prototype.defaultRenderOptions={kerning:!0,features:[{script:"arab",tags:["init","medi","fina","rlig"]},{script:"latn",tags:["liga","rlig"]},{script:"thai",tags:["liga","rlig","ccmp"]}],hinting:!1,usePalette:0,drawLayers:!0,drawSVG:!0};dt.prototype.forEachGlyph=function(n,e,t,i,r,s){e=e!==void 0?e:0,t=t!==void 0?t:0,i=i!==void 0?i:72,r=Object.assign({},this.defaultRenderOptions,r);const a=1/this.unitsPerEm*i,o=this.stringToGlyphs(n,r);let l;if(r.kerning){const c=r.script||this.position.getDefaultScriptName();l=this.position.getKerningTables(c,r.language)}for(let c=0;c<o.length;c+=1){const u=o[c];if(s.call(this,u,e,t,i,r),u.advanceWidth&&(e+=u.advanceWidth*a),r.kerning&&c<o.length-1){const f=l?this.position.getKerningValue(l,u.index,o[c+1].index):this.getKerningValue(u,o[c+1]);e+=f*a}r.letterSpacing?e+=r.letterSpacing*i:r.tracking&&(e+=r.tracking/1e3*i)}return e};dt.prototype.getPath=function(n,e,t,i,r){r=Object.assign({},this.defaultRenderOptions,r);const s=new Yi;if(s._layers=[],Iu(this,s),s.stroke){const a=1/(s.unitsPerEm||1e3)*i;s.strokeWidth*=a}return this.forEachGlyph(n,e,t,i,r,(a,o,l,c)=>{const u=a.getPath(o,l,c,r,this);if(r.drawSVG||r.drawLayers){const f=u._layers;if(f&&f.length){for(let h=0;h<f.length;h++){const d=f[h];s._layers.push(d)}return}}s.extend(u)}),s};dt.prototype.getPaths=function(n,e,t,i,r){r=Object.assign({},this.defaultRenderOptions,r);const s=[];return this.forEachGlyph(n,e,t,i,r,function(a,o,l,c){const u=a.getPath(o,l,c,r,this);s.push(u)}),s};dt.prototype.getAdvanceWidth=function(n,e,t){return t=Object.assign({},this.defaultRenderOptions,t),this.forEachGlyph(n,0,0,e,t,function(){})};dt.prototype.draw=function(n,e,t,i,r,s){this.getPath(e,t,i,r,s).draw(n)};dt.prototype.drawPoints=function(n,e,t,i,r,s){s=Object.assign({},this.defaultRenderOptions,s),this.forEachGlyph(e,t,i,r,s,function(a,o,l,c){a.drawPoints(n,o,l,c,s,this)})};dt.prototype.drawMetrics=function(n,e,t,i,r,s){s=Object.assign({},this.defaultRenderOptions,s),this.forEachGlyph(e,t,i,r,s,function(a,o,l,c){a.drawMetrics(n,o,l,c)})};dt.prototype.getEnglishName=function(n){const e=(this.names.unicode||this.names.macintosh||this.names.windows)[n];if(e)return e.en};dt.prototype.validate=function(){const n=[],e=this;function t(r,s){r||(console.warn(`[opentype.js] ${s}`),n.push(s))}function i(r){const s=e.getEnglishName(r);t(s&&s.trim().length>0,"No English "+r+" specified.")}if(i("fontFamily"),i("weightName"),i("manufacturer"),i("copyright"),i("version"),t(this.unitsPerEm>0,"No unitsPerEm specified."),this.tables.colr){const r=this.tables.colr.baseGlyphRecords;let s=-1;for(let a=0;a<r.length;a++){const o=r[a].glyphID;if(t(s<r[a].glyphID,`baseGlyphs must be sorted by GlyphID in ascending order, but glyphID ${o} comes after ${s}`),s>r[a].glyphID)break;s=o}}return n};dt.prototype.toTables=function(){return R_.fontToTable(this)};dt.prototype.toBuffer=function(){return console.warn("Font.toBuffer is deprecated. Use Font.toArrayBuffer instead."),this.toArrayBuffer()};dt.prototype.toArrayBuffer=function(){const e=this.toTables().encode(),t=new ArrayBuffer(e.length),i=new Uint8Array(t);for(let r=0;r<e.length;r++)i[r]=e[r];return t};dt.prototype.download=function(){console.error("DEPRECATED: platform-specific actions are to be implemented on user-side")};dt.prototype.fsSelectionValues={ITALIC:1,UNDERSCORE:2,NEGATIVE:4,OUTLINED:8,STRIKEOUT:16,BOLD:32,REGULAR:64,USER_TYPO_METRICS:128,WWS:256,OBLIQUE:512};dt.prototype.macStyleValues={BOLD:1,ITALIC:2,UNDERLINE:4,OUTLINED:8,SHADOW:16,CONDENSED:32,EXTENDED:64};dt.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9};dt.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};var F1=dt;function O1(n,e){const t=new _e.Parser(n,e),i=t.parseUShort(),r=t.parseUShort();i!==1&&console.warn(`Unsupported hvar table version ${i}.${r}`);const s=[i,r],a=t.parsePointer32(function(){return this.parseItemVariationStore()}),o=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),l=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()}),c=t.parsePointer32(function(){return this.parseDeltaSetIndexMap()});return{version:s,itemVariationStore:a,advanceWidth:o,lsb:l,rsb:c}}function N1(){console.warn("Writing of hvar tables is not yet supported.")}var B1={make:N1,parse:O1},k1=function(){return{coverage:this.parsePointer(N.coverage),attachPoints:this.parseList(N.pointer(N.uShortList))}},G1=function(){var n=this.parseUShort();if(Ie.argument(n===1||n===2||n===3,"Unsupported CaretValue table version."),n===1)return{coordinate:this.parseShort()};if(n===2)return{pointindex:this.parseShort()};if(n===3)return{coordinate:this.parseShort()}},V1=function(){return this.parseList(N.pointer(G1))},z1=function(){return{coverage:this.parsePointer(N.coverage),ligGlyphs:this.parseList(N.pointer(V1))}},H1=function(){return this.parseUShort(),this.parseList(N.pointer(N.coverage))};function W1(n,e){e=e||0;const t=new N(n,e),i=t.parseVersion(1);Ie.argument(i===1||i===1.2||i===1.3,"Unsupported GDEF table version.");var r={version:i,classDef:t.parsePointer(N.classDef),attachList:t.parsePointer(k1),ligCaretList:t.parsePointer(z1),markAttachClassDef:t.parsePointer(N.classDef)};return i>=1.2&&(r.markGlyphSets=t.parsePointer(H1)),r}var X1={parse:W1},dn=new Array(10);dn[1]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();if(t===1)return{posFormat:1,coverage:this.parsePointer(N.coverage),value:this.parseValueRecord()};if(t===2)return{posFormat:2,coverage:this.parsePointer(N.coverage),values:this.parseValueRecordList()};Ie.assert(!1,"0x"+e.toString(16)+": GPOS lookup type 1 format must be 1 or 2.")};dn[2]=function(){const e=this.offset+this.relativeOffset,t=this.parseUShort();Ie.assert(t===1||t===2,"0x"+e.toString(16)+": GPOS lookup type 2 format must be 1 or 2.");const i=this.parsePointer(N.coverage),r=this.parseUShort(),s=this.parseUShort();if(t===1)return{posFormat:t,coverage:i,valueFormat1:r,valueFormat2:s,pairSets:this.parseList(N.pointer(N.list(function(){return{secondGlyph:this.parseUShort(),value1:this.parseValueRecord(r),value2:this.parseValueRecord(s)}})))};if(t===2){const a=this.parsePointer(N.classDef),o=this.parsePointer(N.classDef),l=this.parseUShort(),c=this.parseUShort();return{posFormat:t,coverage:i,valueFormat1:r,valueFormat2:s,classDef1:a,classDef2:o,class1Count:l,class2Count:c,classRecords:this.parseList(l,N.list(c,function(){return{value1:this.parseValueRecord(r),value2:this.parseValueRecord(s)}}))}}};dn[3]=function(){return{error:"GPOS Lookup 3 not supported"}};dn[4]=function(){return{error:"GPOS Lookup 4 not supported"}};dn[5]=function(){return{error:"GPOS Lookup 5 not supported"}};dn[6]=function(){return{error:"GPOS Lookup 6 not supported"}};dn[7]=function(){return{error:"GPOS Lookup 7 not supported"}};dn[8]=function(){return{error:"GPOS Lookup 8 not supported"}};dn[9]=function(){return{error:"GPOS Lookup 9 not supported"}};function q1(n,e){e=e||0;const t=new N(n,e),i=t.parseVersion(1);return Ie.argument(i===1||i===1.1,"Unsupported GPOS table version "+i),i===1?{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(dn)}:{version:i,scripts:t.parseScriptList(),features:t.parseFeatureList(),lookups:t.parseLookupList(dn),variations:t.parseFeatureVariationsList()}}var Y1=new Array(10);function j1(n){return new ae.Table("GPOS",[{name:"version",type:"ULONG",value:65536},{name:"scripts",type:"TABLE",value:new ae.ScriptList(n.scripts)},{name:"features",type:"TABLE",value:new ae.FeatureList(n.features)},{name:"lookups",type:"TABLE",value:new ae.LookupList(n.lookups,Y1)}])}var $1={parse:q1,make:j1};function Z1(n){const e={};n.skip("uShort");const t=n.parseUShort();Ie.argument(t===0,"Unsupported kern sub-table version."),n.skip("uShort",2);const i=n.parseUShort();n.skip("uShort",3);for(let r=0;r<i;r+=1){const s=n.parseUShort(),a=n.parseUShort(),o=n.parseShort();e[s+","+a]=o}return e}function K1(n){const e={};n.skip("uShort"),n.parseULong()>1&&console.warn("Only the first kern subtable is supported."),n.skip("uLong");const r=n.parseUShort()&255;if(n.skip("uShort"),r===0){const s=n.parseUShort();n.skip("uShort",3);for(let a=0;a<s;a+=1){const o=n.parseUShort(),l=n.parseUShort(),c=n.parseShort();e[o+","+l]=c}}return e}function J1(n,e){const t=new _e.Parser(n,e),i=t.parseUShort();if(i===0)return Z1(t);if(i===1)return K1(t);throw new Error("Unsupported kern table version ("+i+").")}var Q1={parse:J1};function eb(n,e,t,i){const r=new _e.Parser(n,e),s=i?r.parseUShort:r.parseULong,a=[];for(let o=0;o<t+1;o+=1){let l=s.call(r);i&&(l*=2),a.push(l)}return a}var tb={parse:eb};function wc(n,e){const t=[];let i=12;for(let r=0;r<e;r+=1){const s=_e.getTag(n,i),a=_e.getULong(n,i+4),o=_e.getULong(n,i+8),l=_e.getULong(n,i+12);t.push({tag:s,checksum:a,offset:o,length:l,compression:!1}),i+=16}return t}function nb(n,e){const t=[];let i=44;for(let r=0;r<e;r+=1){const s=_e.getTag(n,i),a=_e.getULong(n,i+4),o=_e.getULong(n,i+8),l=_e.getULong(n,i+12);let c;o<l?c="WOFF":c=!1,t.push({tag:s,offset:a,compression:c,compressedLength:o,length:l}),i+=20}return t}function ut(n,e){if(e.compression==="WOFF"){const t=new Uint8Array(n.buffer,e.offset+2,e.compressedLength-2),i=new Uint8Array(e.length);if(fu(t,i),i.byteLength!==e.length)throw new Error("Decompression error: "+e.tag+" decompressed length doesn't match recorded length");return{data:new DataView(i.buffer,0),offset:0}}else return{data:n,offset:e.offset}}function ib(n,e={}){let t,i;const r=new F1({empty:!0});n.constructor!==ArrayBuffer&&(n=new Uint8Array(n).buffer);const s=new DataView(n,0);let a,o=[];const l=_e.getTag(s,0);if(l==="\0\0\0"||l==="true"||l==="typ1")r.outlinesFormat="truetype",a=_e.getUShort(s,4),o=wc(s,a);else if(l==="OTTO")r.outlinesFormat="cff",a=_e.getUShort(s,4),o=wc(s,a);else if(l==="wOFF"){const F=_e.getTag(s,4);if(F==="\0\0\0")r.outlinesFormat="truetype";else if(F==="OTTO")r.outlinesFormat="cff";else throw new Error("Unsupported OpenType flavor "+l);a=_e.getUShort(s,12),o=nb(s,a)}else if(l==="wOF2"){const F="https://github.com/opentypejs/opentype.js/issues/183#issuecomment-1147228025";throw new Error("WOFF2 require an external decompressor library, see examples at: "+F)}else throw new Error("Unsupported OpenType signature "+l);let c,u,f,h,d,p,v,m,g,_,S,b,R,T,w,y,A,L;for(let F=0;F<a;F+=1){const I=o[F];let C;switch(I.tag){case"avar":v=I;break;case"cmap":C=ut(s,I),r.tables.cmap=Mu.parse(C.data,C.offset),r.encoding=new Eu(r.tables.cmap);break;case"cvt ":C=ut(s,I),L=new _e.Parser(C.data,C.offset),r.tables.cvt=L.parseShortList(I.length/2);break;case"fvar":f=I;break;case"STAT":h=I;break;case"gvar":d=I;break;case"cvar":p=I;break;case"fpgm":C=ut(s,I),L=new _e.Parser(C.data,C.offset),r.tables.fpgm=L.parseByteList(I.length);break;case"head":C=ut(s,I),r.tables.head=Ou.parse(C.data,C.offset),r.unitsPerEm=r.tables.head.unitsPerEm,t=r.tables.head.indexToLocFormat;break;case"hhea":C=ut(s,I),r.tables.hhea=Nu.parse(C.data,C.offset),r.ascender=r.tables.hhea.ascender,r.descender=r.tables.hhea.descender,r.numberOfHMetrics=r.tables.hhea.numberOfHMetrics;break;case"HVAR":R=I;break;case"hmtx":b=I;break;case"ltag":C=ut(s,I),i=ku.parse(C.data,C.offset);break;case"COLR":C=ut(s,I),r.tables.colr=Wu.parse(C.data,C.offset);break;case"CPAL":C=ut(s,I),r.tables.cpal=wu.parse(C.data,C.offset);break;case"maxp":C=ut(s,I),r.tables.maxp=Gu.parse(C.data,C.offset),r.numGlyphs=r.tables.maxp.numGlyphs;break;case"name":y=I;break;case"OS/2":C=ut(s,I),r.tables.os2=Ja.parse(C.data,C.offset);break;case"post":C=ut(s,I),r.tables.post=Vu.parse(C.data,C.offset),r.glyphNames=new xo(r.tables.post);break;case"prep":C=ut(s,I),L=new _e.Parser(C.data,C.offset),r.tables.prep=L.parseByteList(I.length);break;case"glyf":m=I;break;case"loca":w=I;break;case"CFF ":c=I;break;case"CFF2":u=I;break;case"kern":T=I;break;case"GDEF":g=I;break;case"GPOS":_=I;break;case"GSUB":S=I;break;case"meta":A=I;break;case"gasp":try{C=ut(s,I),r.tables.gasp=Zu.parse(C.data,C.offset)}catch(G){console.warn("Failed to parse gasp table, skipping."),console.warn(G)}break;case"SVG ":C=ut(s,I),r.tables.svg=Ku.parse(C.data,C.offset);break}}const P=ut(s,y);if(r.tables.name=bu.parse(P.data,P.offset,i),r.names=r.tables.name,m&&w){const F=t===0,I=ut(s,w),C=tb.parse(I.data,I.offset,r.numGlyphs,F),G=ut(s,m);r.glyphs=rh.parse(G.data,G.offset,C,r,e)}else if(c){const F=ut(s,c);Za.parse(F.data,F.offset,r,e)}else if(u){const F=ut(s,u);Za.parse(F.data,F.offset,r,e)}else throw new Error("Font doesn't contain TrueType, CFF or CFF2 outlines.");const k=ut(s,b);if(Bu.parse(r,k.data,k.offset,r.numberOfHMetrics,r.numGlyphs,r.glyphs,e),Jv(r,e),T){const F=ut(s,T);r.kerningPairs=Q1.parse(F.data,F.offset)}else r.kerningPairs={};if(g){const F=ut(s,g);r.tables.gdef=X1.parse(F.data,F.offset)}if(_){const F=ut(s,_);r.tables.gpos=$1.parse(F.data,F.offset),r.position.init()}if(S){const F=ut(s,S);r.tables.gsub=zu.parse(F.data,F.offset)}if(f){const F=ut(s,f);r.tables.fvar=Xu.parse(F.data,F.offset,r.names)}if(h){const F=ut(s,h);r.tables.stat=qu.parse(F.data,F.offset,r.tables.fvar)}if(d){f||console.warn("This font provides a gvar table, but no fvar table, which is required for variable fonts."),m||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");const F=ut(s,d);r.tables.gvar=$u.parse(F.data,F.offset,r.tables.fvar,r.glyphs)}if(p){f||console.warn("This font provides a cvar table, but no fvar table, which is required for variable fonts."),r.tables.cvt||console.warn("This font provides a cvar table, but no cvt table which could be made variable."),m||console.warn("This font provides a gvar table, but no glyf table. Glyph variation only works with TrueType outlines.");const F=ut(s,p);r.tables.cvar=ju.parse(F.data,F.offset,r.tables.fvar,r.tables.cvt||[])}if(v){f||console.warn("This font provides an avar table, but no fvar table, which is required for variable fonts.");const F=ut(s,v);r.tables.avar=Yu.parse(F.data,F.offset,r.tables.fvar)}if(R){f||console.warn("This font provides an HVAR table, but no fvar table, which is required for variable fonts."),b||console.warn("This font provides an HVAR table, but no hmtx table to vary.");const F=ut(s,R);r.tables.hvar=B1.parse(F.data,F.offset,r.tables.fvar)}if(A){const F=ut(s,A);r.tables.meta=Hu.parse(F.data,F.offset),r.metas=r.tables.meta}return r.palettes=new th(r),r}async function rb(){const n=()=>0,e=new Proxy({},{get:()=>n}),t=await fetch("/cmotion-render.wasm");if(!t.ok)throw new Error(`could not fetch /cmotion-render.wasm: ${t.status}`);const{instance:i}=await WebAssembly.instantiateStreaming(t,{wasi_snapshot_preview1:e});return i.exports}function fh(n,e,t){return new TextDecoder().decode(new Uint8Array(n.memory.buffer,e,t))}function sb(n){const t=n.cm_alloc(64),i=n.get_version(t,64),r=fh(n,t,i);return n.cm_free(t,64),r}function ab(n,e){const t=new TextEncoder().encode(e),i=n.cm_alloc(t.length);new Uint8Array(n.memory.buffer).set(t,i);const r=n.parse_eval(i,t.length);if(n.cm_free(i,t.length),r===0)throw new Error("parse_eval failed — fix syntax / eval errors in the source");return r}function ob(n,e,t){let i=65536;for(;i<=4*1024*1024;){const r=n.cm_alloc(i),s=BigInt(Math.floor(t*1e9)),a=n.sample_at(e,s,r,i);if(a===0)throw new Error(`sample_at returned 0 at t=${t}s`);const o=fh(n,r,a);return n.cm_free(r,i),JSON.parse(o)}throw new Error("sample_at output exceeded 4 MiB")}function Pt(n){const e={};for(const t of n.fields??[])t.name&&(e[t.name]=t.value);return e}function Ht(n){return(n.fields??[]).filter(e=>!e.name).map(e=>e.value)}function ot(n,e=0){return!n||n.kind!=="number"?e:n.value}function Ua(n,e=0){return!n||n.kind!=="number"?e:n.unit==="deg"?n.value*Math.PI/180:n.value}function Gs(n){return n&&n.kind==="array"?n.elems:[]}function lb(n,e,t){const i=t*Math.PI/180,r=e*Math.cos(i),s=e*Math.sin(i),a=n+.3963377774*r+.2158037573*s,o=n-.1055613458*r-.0638541728*s,l=n-.0894841775*r-1.291485548*s,c=a**3,u=o**3,f=l**3,h=4.0767416621*c-3.3077115913*u+.2309699292*f,d=-1.2684380046*c+2.6097574011*u-.3413193965*f,p=-.0041960863*c-.7034186147*u+1.707614701*f;return[Math.max(0,Math.min(1,h)),Math.max(0,Math.min(1,d)),Math.max(0,Math.min(1,p))]}function Tn(n){const e=new it;if(!n||n.kind!=="color")return e;switch(n.form){case"hex":{const t=String(n.digits||"ffffff");return e.setStyle(`#${t}`),e}case"rgb":return e.setRGB(ot(n.r),ot(n.g),ot(n.b)),e;case"oklch":{const[t,i,r]=lb(ot(n.l),ot(n.c),ot(n.h));return e.setRGB(t,i,r,mr),e}default:return e}}const Pc=new Map,cb=new id;function Vs(n){const e=Pc.get(n);if(e)return e;const t=cb.load(n);return t.colorSpace=jt,Pc.set(n,t),t}function zs(n){if(!n||n.kind!=="constructed")return null;if(n.name==="as_texture"||n.name==="fit")return zs(Ht(n)[0]);if(n.name==="image"){const e=Ht(n)[0];return!e||e.kind!=="string"?null:String(e.raw).replace(/^"|"$/g,"")}return null}const Lc=new Map;function ub(n,e,t,i){const r=`${n}|${e}x${t}|${i}`,s=Lc.get(r);if(s)return s;const a=Vs(n).clone();if(a.needsUpdate=!0,a.magFilter=1003,a.minFilter=1003,a.generateMipmaps=!1,a.wrapS=1001,a.wrapT=1001,e>1||t>1){a.repeat.set(1/e,1/t);const o=(i%e+e)%e,l=Math.floor(i/e)%t;a.offset.set(o/e,1-(l+1)/t)}return Lc.set(r,a),a}let Fa=null;function hb(){return Fa||(Fa=fetch("/DMSans-Bold.ttf").then(n=>{if(!n.ok)throw new Error(`font fetch failed: ${n.status}`);return n.arrayBuffer()}).then(n=>ib(n))),Fa}function fb(n,e){const t=new hd;let i=0;for(const r of e){const s=n.charToGlyph(r);for(const a of s.getPath(i,0,1).commands)switch(a.type){case"M":t.moveTo(a.x,-a.y);break;case"L":t.lineTo(a.x,-a.y);break;case"Q":t.quadraticCurveTo(a.x1,-a.y1,a.x,-a.y);break;case"C":t.bezierCurveTo(a.x1,-a.y1,a.x2,-a.y2,a.x,-a.y);break}i+=(s.advanceWidth??n.unitsPerEm)/n.unitsPerEm}return t.toShapes(!1)}const Co=6,Ro=28,Ds=2*Co*Math.tan(Ro*Math.PI/360);let Mt=Ds/1080;function db(n){return{font:n,lights:[],background:null,glyphScale:2.5,sceneAspect:16/9}}function pb(n){const e=Pt(n),t=ot(e.width)*Mt,i=ot(e.height)*Mt,r=new xi(t,i),s=new Ar({color:Tn(e.fill)});return new zt(r,s)}function mb(n){const e=Pt(n),t=ot(e.radius)*Mt,i=new so(t,64),r=new Ar({color:Tn(e.fill)});return new zt(i,r)}const Oa=new Map;function gb(n,e,t,i,r){if(!n||!n.width||!n.height)return null;const s=`${n.currentSrc||n.src}|${e}x${t}|${i}`;if(Oa.has(s))return Oa.get(s);const a=Math.floor(n.width/e),o=Math.floor(n.height/t),l=(i%e+e)%e,c=Math.floor(i/e)%t,u=document.createElement("canvas");u.width=a,u.height=o;const f=u.getContext("2d",{willReadFrequently:!0});if(!f)return null;f.drawImage(n,l*a,c*o,a,o,0,0,a,o);let h;try{h=f.getImageData(0,0,a,o).data}catch{return null}const d=r?r.r*255:0,p=r?r.g*255:0,v=r?r.b*255:0,m=3136;let g=a,_=o,S=-1,b=-1;for(let T=0;T<o;T++)for(let w=0;w<a;w++){const y=(T*a+w)*4;if(!(h[y+3]<10)){if(r){const A=h[y]-d,L=h[y+1]-p,P=h[y+2]-v;if(A*A+L*L+P*P<m)continue}w<g&&(g=w),w>S&&(S=w),T<_&&(_=T),T>b&&(b=T)}}let R=null;if(S>=0){const T=(g+S+1)/2/a,w=(_+b+1)/2/o;R={ox:T-.5,oyCenter:w-.5,oyBottom:(b+1)/o-.5}}return Oa.set(s,R),R}function vb(n){const e=Pt(n),t=zs(Ht(n)[0]??e.src??e.image);if(!t)return console.warn("[cmotion-viewer] sprite: no image source"),null;const i=Math.max(1,Math.floor(ot(e.cols,1))),r=Math.max(1,Math.floor(ot(e.rows,1))),s=Math.floor(ot(e.frame,0)),a=ub(t,i,r,s),o=e.width?.kind==="number",l=e.height?.kind==="number";let c=o?ot(e.width)*Mt:0,u=l?ot(e.height)*Mt:0;!o&&!l?(c=256*Mt,u=256*Mt):o?l||(u=c):c=u;const f=new xi(c,u),h=new Ar({map:a,transparent:!0,alphaTest:.01,side:2});if(h.opacity=ot(e.opacity,1),e.key?.kind==="color"){const v=Tn(e.key).convertSRGBToLinear();h.onBeforeCompile=m=>{m.uniforms.uSpriteKey={value:v},m.fragmentShader=`uniform vec3 uSpriteKey;
`+m.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
  if (distance(diffuseColor.rgb, uSpriteKey) < 0.22) discard;`)}}const d=new zt(f,h),p=e.anchor?.kind==="constructed"?e.anchor.name:null;if(p){const v=e.key?.kind==="color"?Tn(e.key):null,m=gb(Vs(t).image,i,r,s,v);m&&(d.position.x-=m.ox*c,d.position.y+=(p==="bottom"?m.oyBottom:m.oyCenter)*u)}return d}function xb(n){const e=Pt(n),t=Ht(n),r=ot(e.r??e.radius??t[0],50)*Mt,s=new lo(r,64,32),a=new xs({color:16777215,roughness:1}),o=new zt(s,a);return o.userData.radiusWorld=r,o}function _b(n,e){const t=Ht(n),i=wn(t[0],e);if(!i)return null;const r=t[1],s=r?.kind==="constructed"?r.name:null,a=yb(i),o=new fi;return s==="bottom"?i.position.y+=a:s==="top"?i.position.y-=a:s==="left"?i.position.x+=a:s==="right"&&(i.position.x-=a),o.add(i),o.userData.radiusWorld=a,o}function yb(n){if(typeof n.userData?.radiusWorld=="number")return n.userData.radiusWorld;let e=0;return n.traverse(t=>{if(t.isMesh&&t.geometry){t.geometry.computeBoundingSphere?.();const i=t.geometry.boundingSphere?.radius??0;i>e&&(e=i)}}),e}function Sb(n,e){const t=Ht(n),i=Pt(n),r=wn(t[0],e);if(!r)return null;const s=ot(i.factor??t[1],0),a=Math.max(.02,1-s),o=s>=0?Math.sqrt(1/a):1/Math.sqrt(Math.max(.02,1+s));return r.scale.x*=o,r.scale.y*=a,r.scale.z*=o,r}function bb(n,e){const t=Ht(n),i=Pt(n),r=wn(t[0],e);if(!r)return null;const s=a=>!a||a.kind!=="number"?0:a.unit==="px"?a.value*Mt:a.value;return r.position.x+=s(i.x),r.position.y+=s(i.y),r.position.z+=s(i.z),r}function Mb(n,e){const t=Ht(n),i=Pt(n),r=t[0];if(!r||r.kind!=="constructed"||r.name!=="text.glyph")return console.warn(`[cmotion-viewer] extrude: unsupported inner ${r?.name}`),null;const s=Ht(r),a=String(s[0]?.raw??'""').replace(/^"|"$/g,"")||"?",o=fb(e.font,a);if(o.length===0)return null;const l=ot(i.depth,16),c=Pt(r).size;if(c&&c.kind==="number"){const g=e.font.tables.hhea,_=e.font.unitsPerEm/(g.ascender-g.descender),S=c.value*_*Mt,b=l*Mt,R=b*.3,T=new vs(o,{depth:b,bevelEnabled:!0,bevelThickness:R,bevelSize:R/S,bevelSegments:4,curveSegments:32});return T.scale(S,S,1),T.center(),new zt(T,new xs({color:16777215}))}const u=l*.025,f=new vs(o,{depth:u,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:4,curveSegments:32});f.computeBoundingBox();const h=f.boundingBox,d=h.max.x-h.min.x,p=Ds*e.sceneAspect*.82,v=d*e.glyphScale>p?p/d:e.glyphScale;f.scale(v,v,1),f.center();const m=new xs({color:16777215});return new zt(f,m)}const Is=24,Tb=`
  varying vec3 vWorldPos;
  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Eb=`
  precision highp float;
  varying vec3 vWorldPos;
  uniform vec4 uBlobs[${Is}];   // xyz = centre (world), w = radius (world)
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
    for (int i = 0; i < ${Is}; i++) {
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
`;function Ab(n,e){const t=Pt(n),i=Ht(n),r=Gs(t.blobs??i[0]),s=[];for(const h of r){if(h?.kind!=="constructed"||h.name!=="blob")continue;const d=Pt(h),p=d.at?.kind==="constructed"&&d.at.name==="vec3"?wo(d.at):new O,v=ot(d.radius,100)*Mt;if(s.push(new _t(p.x*Mt,p.y*Mt,p.z*Mt,v)),s.length>=Is)break}if(s.length===0)return null;const a=s.slice();for(;a.length<Is;)a.push(new _t(0,0,0,0));const o=new hn({vertexShader:Tb,fragmentShader:Eb,uniforms:{uBlobs:{value:a},uCount:{value:s.length},uK:{value:ot(t.smoothing,80)*Mt},uAlbedo:{value:new it(.4,.035,.012)},uRim:{value:new it(1,.45,.1)},uSpecExp:{value:80},uKeyDir:{value:new O(-.45,.8,.5).normalize()},uKeyCol:{value:new it(1,.5,.22)},uFillDir:{value:new O(.6,-.3,.5).normalize()},uFillCol:{value:new it(.9,.25,.08)}}}),l=1,c=2*l*Math.tan(Ro*Math.PI/360),u=c*e.sceneAspect,f=new zt(new xi(u,c),o);return f.position.set(0,0,Co-l),f.frustumCulled=!1,f.renderOrder=1,f.userData.raymarch=!0,f}function Cb(n,e){const t=Ht(n),i=Pt(n),r=wn(t[0],e);if(!r)return null;if(r.userData?.raymarch&&r.material){const l=r.material.uniforms;return i.fill&&(l.uAlbedo.value=Tn(i.fill).convertSRGBToLinear()),i.emissive&&(l.uRim.value=Tn(i.emissive).convertSRGBToLinear()),i.roughness&&(l.uSpecExp.value=Vh.lerp(100,16,ot(i.roughness,.2))),r}const s=zs(i.fill),a={metalness:ot(i.metalness,0),roughness:ot(i.roughness,1),emissive:Tn(i.emissive),emissiveIntensity:ot(i.emissive_intensity,0)};s?(a.color=16777215,a.map=Vs(s)):a.color=Tn(i.fill);const o=new xs(a);return r.traverse(l=>{l.isMesh&&(l.material?.dispose?.(),l.material=o)}),r}function Rb(n,e){const t=Ht(n),i=Pt(n),r=wn(t[0],e);return r?(r.rotation.x=Ua(i.x),r.rotation.y=Ua(i.y),r.rotation.z=Ua(i.z),r):null}function wb(n,e){const t=Ht(n),i=wn(t[0],e);if(!i)return null;const r=ot(t[1],1);return i.scale.set(r,r,r),i}function wo(n){const e=Ht(n);return new O(ot(e[0]),ot(e[1]),ot(e[2]))}function Po(n){const e=Pt(n),t=e.color??e.tint;return t?Tn(t):new it(16777215)}function Pb(n){const e=Pt(n),t=ot(Ht(n)[0]??e.intensity,.3);return new ld(Po(n),t)}function Lb(n){const e=Pt(n),t=e.from?.kind==="constructed"&&e.from.name==="vec3"?wo(e.from):new O(0,1,0),i=ot(e.intensity,1),r=new od(Po(n),i);return r.position.copy(t),r}function Db(n){const e=Pt(n),t=(e.at??e.position)?.kind==="constructed"&&(e.at??e.position).name==="vec3"?wo(e.at??e.position):new O,i=ot(e.range,600)*Mt,r=new sd(Po(n),ot(e.intensity,1),i,2);return r.position.set(t.x*Mt,t.y*Mt,t.z*Mt),r}function Ib(n,e){const t=Ht(n),i=Pt(n),r=Gs(i.lights);for(const s of r)s?.kind==="constructed"&&(s.name==="ambient"?e.lights.push(Pb(s)):s.name==="directional"?e.lights.push(Lb(s)):(s.name==="spotlight"||s.name==="point")&&e.lights.push(Db(s)));return wn(t[0],e)}function wn(n,e){if(!n||n.kind!=="constructed")return null;switch(n.name){case"compose":{const t=new fi;for(const i of Gs(Pt(n).layers)){const r=wn(i,e);r&&t.add(r)}return t}case"rect":return pb(n);case"circle":return mb(n);case"sprite":return vb(n);case"sphere":return xb(n);case"metaballs":return Ab(n,e);case"render3d":return Ib(n,e);case"extrude":return Mb(n,e);case"material":return Cb(n,e);case"rotate":return Rb(n,e);case"scale":return wb(n,e);case"translate":return bb(n,e);case"pivot":return _b(n,e);case"squash":return Sb(n,e);case"image":case"fit":case"as_texture":return console.warn(`[cmotion-viewer] "${n.name}" only renders as a material fill or compose background`),null;default:return console.warn(`[cmotion-viewer] no translator for "${n.name}"`),null}}function Ub(n,e){const t=new fi,i=Gs(Pt(n).layers),r=i[0];if(r?.kind==="constructed"&&r.name==="rect"){const s=Pt(r),a=ot(s.width,1920),o=ot(s.height,1080);Mt=Ds/(o>0?o:1080),e.sceneAspect=o>0?a/o:16/9,e.background=Tn(s.fill)}else if(r?.kind==="constructed"&&(r.name==="fit"||r.name==="image")){const s=zs(r);s&&(Mt=Ds/1080,e.sceneAspect=16/9,e.background=Vs(s))}return i.forEach((s,a)=>{if(a===0&&e.background)return;const o=wn(s,e);o&&t.add(o)}),t}function Fb(n,e=6){const t=/\bduration\b\s*(?::\s*Duration)?\s*=\s*(\d+(?:\.\d+)?)\s*(s|ms|m)\b/i,i=n.match(t);if(!i)return e;const r=parseFloat(i[1]);switch(i[2].toLowerCase()){case"ms":return r/1e3;case"m":return r*60;default:return r}}async function Nb(n){const[e,t]=await Promise.all([rb(),hb()]),i=sb(e);let r=0,s=null,a=[],o=6,l=0,c=16/9;const u=new ov({canvas:n,antialias:!0,preserveDrawingBuffer:!0});u.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.outputColorSpace=jt;const f=new Jt(Ro,c,.1,100);f.position.set(0,0,Co),f.lookAt(0,0,0);const h=new tf;h.background=new it(0);function d(){const _=n.parentElement;if(!_)return;const S=getComputedStyle(_),b=(parseFloat(S.paddingLeft)||0)+(parseFloat(S.paddingRight)||0),R=(parseFloat(S.paddingTop)||0)+(parseFloat(S.paddingBottom)||0),T=_.clientWidth-b,w=_.clientHeight-R;if(T<=0||w<=0)return;let y=T,A=y/c;A>w&&(A=w,y=A*c),n.style.width=`${y}px`,n.style.height=`${A}px`,u.setSize(y,A,!1),f.aspect=c,f.updateProjectionMatrix(),r&&u.render(h,f)}const p=new ResizeObserver(d);n.parentElement&&p.observe(n.parentElement),d();function v(){s&&(h.remove(s),s.traverse(_=>{_.geometry?.dispose?.();const S=_.material;Array.isArray(S)?S.forEach(b=>b?.dispose?.()):S?.dispose?.()}),s=null);for(const _ of a)h.remove(_);a=[]}function m(_){if(!r)return;l=_;const S=ob(e,r,_),b=db(t);let R=null;S?.kind==="constructed"&&S.name==="compose"?R=Ub(S,b):R=wn(S,b),v(),b.background&&(h.background=b.background);for(const T of b.lights)h.add(T),a.push(T);R&&(h.add(R),s=R),Math.abs(b.sceneAspect-c)>1e-6&&(c=b.sceneAspect,d()),u.render(h,f)}function g(_){r&&(e.release(r),r=0),r=ab(e,_),o=Fb(_),m(0)}return{load:g,seek:m,resize:d,get durationSeconds(){return o},versions:{cmotion:i,three:"184"},captureFrame(){return m(l),new Promise(_=>n.toBlob(S=>_(S),"image/png"))},captureClip(_={}){const S=_.duration??o,b=_.fps??30,R=_.onProgress,y=(/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1?["video/mp4;codecs=avc1.42E01E","video/mp4;codecs=avc1","video/mp4"]:["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4;codecs=avc1.42E01E","video/mp4;codecs=avc1","video/mp4"]).find(I=>MediaRecorder.isTypeSupported(I));if(!y)return Promise.reject(new Error("no supported video codec in this browser"));const A=y.startsWith("video/mp4")?"mp4":"webm",L=y.split(";")[0],P=n.captureStream(b),k=new MediaRecorder(P,{mimeType:y,videoBitsPerSecond:8e6}),F=[];return k.ondataavailable=I=>I.data.size&&F.push(I.data),new Promise((I,C)=>{k.onerror=Q=>C(new Error(`MediaRecorder error: ${Q.error?.name??"unknown"}`)),k.onstop=()=>I({blob:new Blob(F,{type:L}),ext:A,mime:L}),k.start(250);const G=performance.now(),z=()=>{const Q=(performance.now()-G)/1e3;if(Q>=S){try{m(S),R?.(S)}catch{}setTimeout(()=>k.stop(),100);return}try{m(Q),R?.(Q)}catch(te){k.stop(),C(te);return}requestAnimationFrame(z)};requestAnimationFrame(z)})},destroy(){p.disconnect(),r&&(e.release(r),r=0),v(),u.dispose()}}}export{Nb as b};
