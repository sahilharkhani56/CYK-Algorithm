var uniqueId1 = "cfgL";
var uniqueId2 = "cfgR";

var uniqueCounter = 2;

function addFn() {
  const divEle = document.getElementById("cfg0");
  const wrapper = document.createElement("div");
  const iFeild = document.createElement("input");
  const iFeild1 = document.createElement("input");

  iFeild.setAttribute("type", "text");
  iFeild.classList.add("cfgs");
  iFeild.style.width = "40px";
  iFeild1.setAttribute("type", "text");
  iFeild1.classList.add("cfgs");
  var uID1 = uniqueId1;
  var uID2 = uniqueId2;
  console.log(
    uID1.concat(uniqueCounter.toString()),
    uID2.concat(uniqueCounter.toString())
  );

  iFeild.setAttribute("id", uID1.concat(uniqueCounter.toString()));
  iFeild1.setAttribute("id", uID2.concat(uniqueCounter.toString()));
  wrapper.classList.add("group")
  wrapper.appendChild(iFeild);
  wrapper.appendChild(iFeild1);
  divEle.appendChild(wrapper);
  uniqueCounter++;
}

let CFGs = {};
let inputString = "";
function submit() {
  var valueCounter = 1;
  for (var i = 1; i < uniqueCounter; i++) {
    let vec = [];
    var uID1 = "cfgL";
    var uID2 = "cfgR";
    // console.log(uID1.concat(valueCounter.toString()));
    var val2 = document.getElementById(
      uID1.concat(valueCounter.toString())
    ).value;
    var val1 = document.getElementById(
      uID2.concat(valueCounter.toString())
    ).value;
    valueCounter++;
    // val = toString(val)
    // console.log(typeof val1.split("|"));
    CFGs[val2] = val1.split("|");
    // console.log(typeof CFGs);
  }
    console.log(CFGs);
}
var CFGTable;
function addString() {
  inputString = document.getElementById("inputS").value.toString();
  //   console.log(inputString);
  CFGTable = Array.from({ length: inputString.length }, () =>
    Array.from({ length: inputString.length }, () =>
      Array.from(inputString.length).fill(0)
    )
  );
}
function computeValues() {
  //   console.log(inputString.length);

  // console.log(CFGTable)

  for (let ind = 0; ind < inputString.length; ind++) {
    let s = inputString.substring(ind, ind + 1);
    let ans = new Set();
    // console.log(s);
    for (const outerKey in CFGs) {
      if (Object.prototype.hasOwnProperty.call(CFGs, outerKey)) {
        const innerObject = CFGs[outerKey];
        // console.log(`Outer Key: ${outerKey}`);

        for (const innerKey in innerObject) {
          if (Object.prototype.hasOwnProperty.call(innerObject, innerKey)) {
            const value = innerObject[innerKey];
            if (value === s) {
              ans.add(outerKey);
              break;
            }
            // console.log(`Inner Key: ${innerKey}, Value: ${value}`);
          }
        }
      }
    }
    // console.log(ans);
    if (ans.size > 0) {
      CFGTable[0][ind] = Array.from(ans);
    }
  }
  //   console.log(CFGTable);

  for (let len = 2; len <= inputString.length; len++) {
    for (let ind = 0; ind < inputString.length - len
        +1; ind++) {
      let ans = new Set();
      let s = inputString.substring(ind, ind + len);
      //   console.log(s);
      for (let i = 0; i < s.length - 1; i++) {
        let p = s.substring(0, i + 1);
        let q = s.substring(i + 1);
        // console.log(ind , ind+p.length);
        // console.log(CFGTable[p.length-1][ind])
        var v1 = new Array();
        v1 = CFGTable[p.length - 1][ind];
        var v2 = new Array();
        v2 = CFGTable[q.length - 1][ind + p.length];
        console.log(v1, v2);
        console.log(s);
        console.log(p,q);

        console.log(p.length-1 , ind);
        console.log(q.length-1 , ind+p.length);
        if (v1.length != 0 && v2.length != 0) {
          for (var j = 0; j < v1.length; j++) {
            for (var k = 0; k < v2.length; k++) {
              var ss = v1[j] + v2[k];
              for (const outerKey in CFGs) {
                if (Object.prototype.hasOwnProperty.call(CFGs, outerKey)) {
                  const innerObject = CFGs[outerKey];
                  // console.log(`Outer Key: ${outerKey}`);
                  for (const innerKey in innerObject) {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        innerObject,
                        innerKey
                      )
                    ) {
                      const value = innerObject[innerKey];
                      if (value === ss) {
                        ans.add(outerKey);
                        break;
                      }
                      // console.log(`Inner Key: ${innerKey}, Value: ${value}`);
                    }
                  }
                }
              }
            }
          }
        }
      }


        CFGTable[len - 1][ind] = Array.from(ans);
      
    }
  }
    console.log(CFGTable);
  displayTable();
}
function displayTable() {
    
  const table = document.getElementById("arrayTable");

  // Iterate through the 2D array and populate the table
  let counter = inputString.length;
  CFGTable.forEach((rowArr) => {
    const row = document.createElement("tr");
    let p = counter;
    counter--;
    rowArr.forEach((value) => {
      if (p) {
        const cell = document.createElement("td");
        var s = "{ ";
        value.forEach((val) => {
          s += val;
          s += " ";
        });
        s += "}";
        cell.textContent = s;
        row.appendChild(cell);
        p--;
      }
    });
    table.appendChild(row);
  });
}
