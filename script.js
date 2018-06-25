var OSName = "by Boge";
var context = 0;
var compressor = 0;
var reverb = 0;
var source3 = 0;
var lowpassFilter = 0;
var waveShaper = 0;
var panner = 0;
var dry3 = 0;
var wet3 = 0;
var masterDry = 0;
var masterWet = 0;
context = new AudioContext();
var HDD;
var stato=0;

window.onload = function detectOS()
{
	//console.log(window.navigator);
	if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) 
		OSName="Windows 10";
	else if(window.navigator.userAgent.indexOf("Ubuntu")!= -1)
		OSName="Ubuntu 16.04.1";

	if(OSName=="by Boge")
		{
			alert("You are not running Windows 10 or Ubuntu! It isn't going to work.");
			document.getElementById("btnFreeze").disabled = true;
		}
}


function generaFreq()
{
	var HDDs = document.getElementsByName("HDD");

	if(HDDs[0].checked)
		HDD=HDDs[0].value;
	else
		HDD=HDDs[1].value;

	if(HDD == 0)
		generaFreqDELL();
	else
		generaFreqHP();
}


function generaFreqDELL()
{
	var freq = whichOS();
	startFreq(freq);
}

function generaFreqHP()
{
	if(OSName == "Windows 10")
		startFreq(4600);
	else
		{
			alert("Don't know what will happen!");
			document.getElementById("btnFreeze").disabled = true;
		}
}

function whichOS()
{
	if(OSName == "Windows 10")
		return 7830;
	else if (OSName == "Ubuntu 16.04.1")
		return 7950;
	else
		{
			alert("Don't know what will happen!");
			document.getElementById("btnFreeze").disabled=true;
		}
}

function stopFreq(){
	source3.stop(0);
	stato=0;
}

function startFreq (fr) {

    // Create the effects nodes.
    lowpassFilter = context.createBiquadFilter();
    waveShaper = context.createWaveShaper();
    panner = context.createPanner();
    compressor = context.createDynamicsCompressor();
    reverb = context.createConvolver();

    // Create master wet and dry.
    masterDry = context.createGain();
    masterWet = context.createGain();

    // Connect final compressor to final destination.
    compressor.connect(context.destination);

	// Connect master dry and wet to compressor.
    masterDry.connect(compressor);
    masterWet.connect(compressor);

    // Connect reverb to master wet.
    reverb.connect(masterWet);

    // Create a source
    source3 = context.createOscillator();
    source3.frequency.value = fr;

    // Connect source3
    dry3 = context.createGain();
    wet3 = context.createGain();
    source3.connect(panner);
    panner.connect(dry3);
    panner.connect(wet3);
    dry3.connect(masterDry);
    wet3.connect(reverb);

	// Start the frequence
    source3.start(0);
}
