"use client";

import {useState} from "react";


export default function TTSInput(){

const [text,setText]=useState("");



async function speak(){


const response =
await fetch(
"/api/tts",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
text:text
})
}
);



const blob =
await response.blob();



const url =
URL.createObjectURL(blob);



const audio =
new Audio();


audio.src=url;

audio.preload="auto";



const context =
new AudioContext();



await context.resume();



const source =
context.createMediaElementSource(
audio
);



const analyser =
context.createAnalyser();


analyser.fftSize=256;



source.connect(
analyser
);


analyser.connect(
context.destination
);



const data =
new Uint8Array(
analyser.frequencyBinCount
);



function analyze(){


analyser.getByteFrequencyData(
data
);



let sum=0;


for(
let i=0;
i<data.length;
i++
){

sum += data[i];

}



let level =
sum /
data.length /
255;



(window as any).audioLevel =
Math.min(level*5,1);



requestAnimationFrame(
analyze
);


}



audio.onended=()=>{

(window as any).audioLevel=0;

};



audio.play();



analyze();



}



return (

<div
style={{
position:"absolute",
top:20,
left:20,
zIndex:100
}}
>


<input

style={{
width:300
}}

value={text}

onChange={
e=>setText(e.target.value)
}

placeholder="Type something..."



/>



<button
onClick={speak}
>

Speak

</button>


</div>

);


}
