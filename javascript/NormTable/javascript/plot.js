// plot.js
//
// Author: Calvin Feng
// All rights reserved.
//
//-------------------------------------------------------------------
var zTable=[0.5, 0.508, 0.516, 0.5239, 0.5319, 0.5398, 0.5478, 0.5557, 0.5636, 0.5714, 0.5793, 0.5871, 0.5948, 0.6026, 0.6103, 0.6179, 0.6255, 0.6331, 0.6406, 0.648, 0.6554, 0.6628, 0.67, 0.6772, 0.6844, 0.6915, 0.6985, 0.7054, 0.7123, 0.719, 0.7258, 0.7324, 0.7389, 0.7454, 0.7518, 0.758, 0.7642, 0.7704, 0.7764, 0.7823, 0.7882, 0.7939, 0.7996, 0.8051, 0.8106, 0.8159, 0.8212, 0.8264, 0.8315, 0.8365, 0.8414, 0.8461, 0.8508, 0.8554, 0.8599, 0.8643, 0.8687, 0.8729, 0.877, 0.881, 0.8849, 0.8888, 0.8925, 0.8962, 0.8997, 0.9032, 0.9066, 0.9099, 0.9131, 0.9162, 0.9193, 0.9222, 0.9251, 0.9279, 0.9306, 0.9332, 0.9358, 0.9382, 0.9406, 0.943, 0.9452, 0.9474, 0.9495, 0.9516, 0.9535, 0.9554, 0.9573, 0.9591, 0.9608, 0.9625, 0.9641, 0.9656, 0.9671, 0.9686, 0.97, 0.9713, 0.9726, 0.9738, 0.975, 0.9762, 0.9773, 0.9783, 0.9793, 0.9803, 0.9813, 0.9822, 0.983, 0.9838, 0.9846, 0.9854, 0.9861, 0.9868, 0.9875, 0.9881, 0.9887, 0.9893, 0.9898, 0.9904, 0.9909, 0.9914, 0.9918, 0.9923, 0.9927, 0.9931, 0.9934, 0.9938, 0.9942, 0.9945, 0.9948, 0.9951, 0.9954, 0.9956, 0.9959, 0.9961, 0.9963, 0.9966, 0.9968, 0.9969, 0.9971, 0.9973, 0.9975, 0.9976, 0.9978, 0.9979, 0.998, 0.9982, 0.9983, 0.9984, 0.9985, 0.9986, 0.9987, 0.9988, 0.9988, 0.9989, 0.999, 0.9991, 0.9991, 0.9992, 0.9992, 0.9993, 0.9993, 0.9994, 0.9994, 0.9995, 0.9995, 0.9995, 0.9996, 0.9996, 0.9996, 0.9997, 0.9997, 0.9997, 0.9997, 0.9997, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];



var zleft = 0;
var zright = 0;
var lz = 0;
var rz = 0;
var scale = 0.0;

function getTableValue(zValue){
    var isNegative = false;
    var vZ = zValue;
    if (zValue < 0){
        vZ = -zValue;
        isNegative = true;
    }
    
    var intSteps = Math.trunc(vZ/0.02);
    
    zleft = intSteps*0.02;
    zright = zleft + 0.02;
        
    lz = zTable[intSteps];
    if (intSteps < 199){
        rz = zTable[intSteps + 1];
    } else {
        rz = 1.0;
    }
    scale = (vZ-intSteps*0.02)/0.02;
    
    var ret = lz + (rz-lz)*scale;
    
    if (isNegative){
        zleft = -zleft;
        zright = -zright;
        lz = 1-lz;
        rz = 1-rz;
        ret = 1-ret;
    }
    return ret;
}

function getCPvalue(zValue){
    var cpValue = 0.0;
    
    if (zValue <= -4.0){
        cpValue = 0;
        zleft = -4.0;
        zright = -3.98;
        scale = 0;
        lz = 0.0;
        rz = 0.0;
        
    } else if (zValue >= 4.0){
        zleft = 3.98;
        zright = 4.0;
        scale = 1;
        lz = 1.0;
        rz = 1.0;
        cpValue = 1.0;
    }else if (zValue == 0){
        cpValue = 0.5;
        zleft = 0;
        zright = 0.02;
        scale = 0;
        lz = 0.5;
        rz = 0.508;
    } else {
        cpValue = getTableValue(zValue);
    }
    
    zright = zright.toFixed(2);
    zleft = zleft.toFixed(2);
    lz = lz.toFixed(4);
    rz = rz.toFixed(4);
    cpValue = cpValue.toFixed(5);
    return cpValue;
}

function normDist(x) {
    var pi = 3.1415;
    return (1/Math.sqrt(2*pi))*Math.exp(-0.5*x*x);
}

function draw(zMin, zMax, cpMin, cpMax){
    var canvas = document.getElementById('plotCanvas');
    var ctx = canvas.getContext('2d');
    var cw = canvas.width;
    var ch = canvas.height;
    var edgeH = 25;
    var edgeV = 37;
    var xY = edgeV + 237;
    var vScale = 236/0.3989;
    var hScale = (cw/2 - edgeH)/5;
    
    var sigmaW = (cw-2*edgeH)/10;
    
    var xStart = zMin*hScale + cw/2;
    var yStart = xY-normDist(zMin)*vScale;
    
    
    var xEnd = zMax*hScale + cw/2;
    var yEnd = xY-normDist(zMax)*vScale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.beginPath();
    ctx.moveTo(xStart, xY);
    ctx.lineTo(xStart, yStart);
                  
    var delta = 0.1;
    var zTmp = zMin;
                  
    while(zTmp < zMax){
        var tmpStart = zTmp*hScale + cw/2;
        var tmpEnd = xY - normDist(zTmp)*vScale;
        ctx.moveTo(tmpStart, xY);
        ctx.lineTo(tmpStart, tmpEnd);
        
        zTmp += delta;
    }
                  
    ctx.moveTo(xEnd, xY);
    ctx.lineTo(xEnd, yEnd);
    var resu = cpMax -cpMin;
    resu = resu.toFixed(4);
    var str = "Cumulative Probability: " + resu.toString();
    ctx.fillText(str, cw/2+100, 37);
    //ctx.moveTo(cw/2, edgeV);
    //ctx.lineTo(cw/2+sigmaW, xY);
    ctx.strokeStyle = '#dddddd';
    ctx.stroke();
    
}

function lookupZtable(){
    var Zmin = parseFloat(document.getElementById('xmin').value);
    var Zmax = parseFloat(document.getElementById('xmax').value);
    
    var cpMin = getCPvalue(Zmin);


    document.getElementById('zmin').value = cpMin.toString();
    document.getElementById('leftzmin').innerHTML = zleft.toString();
    document.getElementById('zminleft').value = lz.toString();
    document.getElementById('zminright').value = rz.toString();
    document.getElementById('rightzmin').innerHTML = zright.toString();
    document.getElementById('minRange').value = scale.toString();
    
    var cpMax = getCPvalue(Zmax);

    document.getElementById('zmax').value = cpMax.toString();
    document.getElementById('leftzmax').innerHTML = zleft.toString();
    document.getElementById('zmaxleft').value = lz.toString();
    document.getElementById('zmaxright').value = rz.toString();
    document.getElementById('rightzmax').innerHTML = zright.toString();
    document.getElementById('maxRange').value = scale;
    
    draw(Zmin, Zmax, cpMin, cpMax);
    
    return;
}


