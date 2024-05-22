const container = document.getElementById("levelButtonContainer");
const buttonCollection = container.children;

function test(inp) {
  console.log("input variable: ", inp);
}

for (let i = 0; i < buttonCollection.length; i++) {
  buttonCollection[i].addEventListener("click", () => {
    //add logic here
    test(i + 1);
  });
}
