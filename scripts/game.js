// script.js

document.getElementById("submit-code").addEventListener("click", checkCode);

function checkCode() {
    // Get the user's code from the textarea
    let userCode = document.getElementById("code-input").value.trim();
    
    // Check if the user wrote a valid for loop counting down from 10 to 1
    let correctCode = "for (let i = 10; i >= 1; i--) { console.log(i); }";
    
    if (userCode === correctCode) {
        document.getElementById("feedback").innerHTML = "<span style='color: green;'>Great job! You've completed the challenge!</span>";
        nextMission(); // Move to the next mission (planet)
    } else {
        document.getElementById("feedback").innerHTML = "<span style='color: red;'>Oops! Try again. Make sure your loop counts down from 10 to 1.</span>";
    }
}

function nextMission() {
    // After the user completes the task, we could display the next mission (next planet).
    setTimeout(function() {
        document.getElementById("planet-info").innerHTML = "<h2>Next Mission: Planet Conditionis</h2><p>Decode the alien messages using conditionals!</p>";
        document.getElementById("coding-challenge").innerHTML = "<p><strong>Task:</strong> Use an if/else statement to decode a secret message.</p><textarea id='code-input' placeholder='Write your code here...'></textarea><button id='submit-code'>Submit Code</button><div id='feedback'></div>";
        
        // Rebind the event listener to the new button
        document.getElementById("submit-code").addEventListener("click", checkCode);
    }, 2000); // Transition to the next mission after 2 seconds
}

document.getElementById("submit-code").addEventListener("click", () => {
  const userCode = document.getElementById("code-input").value;
  let output = [];
  const originalConsoleLog = console.log;

  // Clear feedback
  document.getElementById("feedback").textContent = "";

  // Redirect console.log output to a local array
  console.log = (...args) => output.push(...args);

  try {
    // Create a sandboxed function with only console available
    const sandboxedCode = new Function("console", `
      "use strict";
      
      // Prevent access to these
      const print = undefined;
      const alert = undefined;
      const confirm = undefined;
      const prompt = undefined;
      const open = undefined;
      const close = undefined;
      const document = undefined;
      const window = undefined;

      // User code
      ${userCode}
    `);

    sandboxedCode({ log: console.log });

    // Restore console.log
    console.log = originalConsoleLog;

    // Expected output: [10, 9, ..., 1]
    const expected = Array.from({ length: 10 }, (_, i) => 10 - i);
    const isCorrect = JSON.stringify(output) === JSON.stringify(expected);

    document.getElementById("feedback").textContent = isCorrect
      ? "✅ Mission accomplished! You're ready for the next planet."
      : `❌ Incorrect.\nExpected output:\n${expected.join("\n")}\n\nYour output:\n${output.join("\n")}`;

  } catch (err) {
    console.log = originalConsoleLog;
    document.getElementById("feedback").textContent = `⚠️ Error in your code:\n${err}`;
  }
});

function toggleFullscreen() {
  const container = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
  } else {
    document.exitFullscreen();
  }
}
