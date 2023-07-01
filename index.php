<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="dist/style.css">
    
</head>
<body>
    <header class="header">
        <a href="index.php">
            <h3>KINCOIN</h3>
        </a>
        <nav>
            <ul>
                <li>Home</li>
                <li>Documentation</li>
                <li>Contact</li>
                <li>About</li>
            </ul>
        </nav>
        
        <?php
        session_start(); // Start the session

        // Check if the user is logged in
        if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            echo '<a class="btnlink" href="logout.php">Logout</a>';
        } else {
            echo '<a class="btnlink" href="login.html">Login</a>';
        }
        ?>
        
    </header>
    <main>
        <h1>payment system using blockchain/ main page</h1>
        
        <?php
        // Display welcome message
        if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            echo "<p>Welcome, " . $username . "!</p>";
        } else {
            echo "<p>Please log in to view this page.</p>";
        }
        ?>

      <div id="connectWallet">
            <?php
                // Check if the user is logged in
                if (isset($_SESSION['username'])) {
                 echo '<button type="button" id="connectButton">Connect Wallet</button>';
                }
             ?>
      </div>

      <div class="wallet" id="walletSection" style="display: none;">
        <div class="wallet__header">
          <h4>My Wallet</h4>
          <p>My account: This is a public key</p>
        </div>
        <div class="wallet__body">
          <h2>Balance: 0.00 USD</h2>
          <div class="wallet__body__operations">
            <div id="myBuyButton" class="wallet__body__operations__operation">
              <img src="./images/buy.png" alt="buy crypto image">
              <p>Buy</p>
            </div>
      
            <div id="mySendButton" class="wallet__body__operations__operation">
              <img src="./images/send.png" alt="send crypto image">
              <p>Send</p>
            </div>
          </div>
      
          <div id="container">
            <script>
              // Select the button and container elements
              const connectButton = document.getElementById('connectButton');
              const walletSection = document.getElementById('walletSection');
              const mySendButton = document.getElementById('mySendButton');
              const container = document.getElementById('container');
      
              // Event listener for connect button click
              connectButton.addEventListener('click', function() {
                // Show the wallet section
                walletSection.style.display = 'block';
                // Remove the event listener after the first click
                connectButton.removeEventListener('click', arguments.callee);
              });
      
              // Event listener for send button click
              mySendButton.addEventListener('click', function() {
                // Create the HTML code you want to add
                const formCode = `
                  <div class="container__SendForm">
                    <form action="" method="post">
                      <label for="myaddress">My Address</label>
                      <!--sender address= my public key-->
                      <input type="text" name="sender">
      
                      <label for="reciever">Receiver Address</label>
                      <!--sender address= receiver public key-->
                      <input type="text" name="receiver">
      
                      <label for="amount">Amount</label>
                      <input type="text" name="amount">
                      <input type="submit" name="submit" value="SEND">
                    </form>
                  </div>
                `;
      
                // Append the form code to the container
                container.insertAdjacentHTML('beforeend', formCode);
                // Remove the event listener after the first click
                mySendButton.removeEventListener('click', arguments.callee);
              });
            </script>
          </div>
        </div>
      </div>
        
    </main>

<button id="createWalletButton">Create Wallet</button>
<p id="mnemonic">mnemonic:</p>
<div id="mnemonicContainer"></div>

<script src="dist/bundle.js"></script>
<script>
const createWalletButton = document.getElementById("createWalletButton");
const mnemonicElement = document.getElementById("mnemonic");
const mnemonicContainer = document.getElementById("mnemonicContainer");

createWalletButton.addEventListener('click', async () => {
  const wallet = new Wallet("<?php echo isset($_SESSION['username']) ? $_SESSION['username'] : ''; ?>");
  
  await wallet.initialize();

  const mnemonic = wallet.mnemonic;
  console.log("Wallet creation from index.php - mnemonic phrase is:", mnemonic);

  // Display the mnemonic
  mnemonicElement.textContent = `Mnemonic: ${mnemonic}`;

  // Split the mnemonic into an array of words
  const words = mnemonic.split(" ");

  // Update the HTML with the generated mnemonic
  mnemonicContainer.innerHTML = "";
  words.forEach((word, index) => {
    const label = document.createElement("label");
    label.textContent = `Word ${index + 1}`;

    const input = document.createElement("input");
    input.type = "text";
    input.value = word;
    input.disabled = true;

    const div = document.createElement("div");
    div.appendChild(label);
    div.appendChild(input);

    mnemonicContainer.appendChild(div);
  });
});

</script>
  <h4>enter your mnemonic to connect to wallet</h4>
   <!-- retrieve master seed form:-->
   <form id="mnemonicForm">
  <label for="mnemonicWord1">Word 1:</label>
  <input type="text" id="mnemonicWord1" required>
  <br>
  
  <label for="mnemonicWord2">Word 2:</label>
  <input type="text" id="mnemonicWord2" required>
  <br>
  
  <label for="mnemonicWord3">Word 3:</label>
  <input type="text" id="mnemonicWord3" required>
  <br>
  
  <label for="mnemonicWord4">Word 4:</label>
  <input type="text" id="mnemonicWord4" required>
  <br>
  
  <label for="mnemonicWord5">Word 5:</label>
  <input type="text" id="mnemonicWord5" required>
  <br>
  
  <label for="mnemonicWord6">Word 6:</label>
  <input type="text" id="mnemonicWord6" required>
  <br>
  
  <label for="mnemonicWord7">Word 7:</label>
  <input type="text" id="mnemonicWord7" required>
  <br>
  
  <label for="mnemonicWord8">Word 8:</label>
  <input type="text" id="mnemonicWord8" required>
  <br>
  
  <label for="mnemonicWord9">Word 9:</label>
  <input type="text" id="mnemonicWord9" required>
  <br>
  
  <label for="mnemonicWord10">Word 10:</label>
  <input type="text" id="mnemonicWord10" required>
  <br>
  
  <label for="mnemonicWord11">Word 11:</label>
  <input type="text" id="mnemonicWord11" required>
  <br>
  
  <label for="mnemonicWord12">Word 12:</label>
  <input type="text" id="mnemonicWord12" required>
  <br>
  
  <button type="submit">Generate master seed</button>
</form>

<script>
document.getElementById('mnemonicForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the values of each input field
  const mnemonicWords = [];
  for (let i = 1; i <= 12; i++) {
    const inputId = `mnemonicWord${i}`;
    const inputField = document.getElementById(inputId);
    mnemonicWords.push(inputField.value);
  }

  // Concatenate the entered words to form the mnemonic
  const userMnemonic = mnemonicWords.join(' ');

  // Generate the master seed from the user-entered mnemonic
  const wallet = new Wallet('', userMnemonic); // Pass an empty string as username
  const userMasterSeed = await wallet.generateMasterSeedFromMnemonic(userMnemonic);
  console.log('User master seed from mnemonic is:', userMasterSeed);

  // Use the master seed as needed
});
</script>



      <script src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"></script>
      <script src="app.js"></script>
      
    
</body>
</html>
