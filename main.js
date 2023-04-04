


document.querySelector('.join-btn').addEventListener('click', enterLobby);

function enterLobby() {  
  document.querySelector('.container').style.display = 'none';
  createLobby();
}

function createLobby() {
  const lobbyDiv = document.createElement('div');
  lobbyDiv.classList.add('lobby');
  lobbyDiv.innerHTML = `
  <div class="game-options">
    <div class="game-option">
      <input type="text" placeholder="Importo $DRP" class="drip-input" />
      <button class="game-btn play">PLAY SESSION</button>
    </div>
    <button class="game-btn 1v1 bet-btn">1v1 BET</button>
    <button class="game-btn shop-btn">SHOP</button>
    <button class="game-btn customize-btn">CUSTOMIZE</button>
    <button class="game-btn swap-btn">SWAP SOON</button>
   
  </div>
    <div class="balance-info">
   <div id="sui-balance">$SUI Balance: SOON</div>
    <div id="drip-balance">$DRP Balance: 0$</div>
    <button id="faucet-btn">$DRP TEST TOKEN</button>
  </div>

  <div class="right-menu">
    <button class="profile-btn">PROFILE TBA</button>
    <button class="leaderboard-btn">LEADERBOARD TBA</button>
    <button class="settings-btn">SETTINGS TBA</button>
    <button class="game-btn back-btn">← BACK</button>
  </div>
  `;
  document.body.appendChild(lobbyDiv);
  setupLobbyButtons();
}

function createUnityGame() {
  const unityGameDiv = document.createElement('div');
  unityGameDiv.classList.add('unity-game');
  unityGameDiv.style.display = 'flex';
  unityGameDiv.style.justifyContent = 'center';
  unityGameDiv.style.alignItems = 'center';
  unityGameDiv.style.width = '500%';
  unityGameDiv.style.height = '500%';

  const unityIframe = document.createElement('iframe');
  unityIframe.src = 'unity-game/index.html'; // Sostituisci con l'URL del tuo gioco Unity
  unityIframe.width = '400%';
  unityIframe.height = '400%';

  const exitBtn = document.createElement('button');
  exitBtn.textContent = 'EXIT GAME';
  exitBtn.classList.add('game-btn');
  exitBtn.style.position = 'absolute';
  exitBtn.style.top = '10px';
  exitBtn.style.right = '10px';
  exitBtn.addEventListener('click', () => {
    unityGameDiv.remove();
    goBackToStart();
  });

  unityGameDiv.appendChild(exitBtn);
  unityGameDiv.appendChild(unityIframe);
  return unityGameDiv;
}




function createSwapInterface() {
  const swapInterfaceDiv = document.createElement('div');
  swapInterfaceDiv.classList.add('swap-interface');
  swapInterfaceDiv.innerHTML = `
    <h2>Drip n Swap</h2>
    <div class="swap-row">
      <label for="drip-amount">Importo $DRIP:</label>
      <input type="number" id="drip-amount" min="0" step="0.01" />
    </div>
    <div class="swap-row">
      <label for="token-select">Seleziona token:</label>
      <select id="token-select">
        <option value="token1">$SUI</option>
        <option value="token2">$APT</option>
        <!-- Aggiungi altre opzioni per i token qui -->
      </select>
    </div>
    <div class="swap-row">
      <label for="token-amount">Riceverai:</label>
      <input type="number" id="token-amount" min="0" step="0.01" readonly />
    </div>
    <button class="swap-btn">Scambia</button>

    <!-- Interfaccia di scambio SUI a DRIP -->
<div class="swap-interface sui-to-drip">
  <h2>Swap $SUI to $DRP</h2>
  <div class="swap-row">
    <label for="suiAmount">SUI:</label>
    <input type="number" id="suiAmount" placeholder="0" />
  </div>
  <div class="swap-row">
    <label for="dripAmount">DRIP:</label>
    <input type="number" id="dripAmount" placeholder="0" disabled />
  </div>
  <button class="swap-btn">Swap SUI to DRIP</button>
</div>

  `;
  
  return swapInterfaceDiv;
}

const faucetBtn = document.getElementById('faucet-btn');
faucetBtn.addEventListener('click', claimFaucet);


function claimFaucet() {
  const dripBalance = document.getElementById('drip-balance');
  let balance = parseFloat(dripBalance.textContent.replace('$DRP Balance: ', '$'));
  balance += 1;
  dripBalance.textContent = `$DRP Balance: ${balance.toFixed(2)}$`;
}




  



function setupLobbyButtons() {
  document.querySelector('.back-btn').addEventListener('click', goBackToStart);
  document.querySelector('.shop-btn').addEventListener('click', () => createMiniLobby('Shop', [
    [
      {title: "", price: '$DRIP 10'},
      {title: '', price: '$DRIP 10'},
      {title: '', price: '$DRIP 10'}
    ],
    [
      {title: 'Accessory 1', price: '$5'},
      {title: 'Accessory 2', price: '$8'},
      {title: 'Accessory 3', price: '$12'}
    ],
    // ...
  ], ['Buckets', 'Accessories']));

  document.querySelector('.customize-btn').addEventListener('click', () => createMiniLobby('Customize', [
    [
      {title: 'Profile Option 1', price: '$0'},
      {title: 'Profile Option 2', price: '$0'},
      {title: 'Profile Option 3', price: '$0'}
    ],
    // ...
  ], ['Options']));

  // ...

  document.querySelector('.swap-btn').addEventListener('click', () => {
    const swapInterface = createSwapInterface();
    createMiniLobby('Swap', [], []);
    document.querySelector('.mini-lobby').appendChild(swapInterface);
  });
  document.querySelector('.profile-btn').addEventListener('click', () => createMiniLobby('Profile', [
    {title: 'Profile Option 1', price: '$0'},
    {title: 'Profile Option 2', price: '$0'},
    {title: 'Profile Option 3', price: '$0'}
  ]));
  document.querySelector('.leaderboard-btn').addEventListener('click', () => createMiniLobby('Leaderboard'))

  
  document.querySelector('.settings-btn').addEventListener('click', () => createMiniLobby('Settings'))
  
  document.querySelector('.game-btn.play').addEventListener('click', () => {
    const inputField = document.querySelector('.drip-input');
    const amount = parseFloat(inputField.value);
    const dripBalanceElement = document.getElementById('drip-balance');
    
    if (isNaN(amount) || amount < 10) {
      alert('Minimum amount to play is $DRP 10');
    } else if (amount > parseFloat(dripBalanceElement.textContent.slice(13))) {
      alert('Insufficient $DRP balance');
    } else {
      const newBalance = parseFloat(dripBalanceElement.textContent.slice(13)) - amount;
      dripBalanceElement.textContent = `$DRP Balance: ${newBalance.toFixed(2)}`;
      const unityGame = createUnityGame();
      createMiniLobby('Play', [], []);
      document.querySelector('.mini-lobby').appendChild(unityGame);
    }
  });
  
  document.querySelector('.game-btn.bet-btn').addEventListener('click', () => createMiniLobby('1v1 bet', [
    
  ]));

   // Add event listener to faucet button
   document.getElementById('faucet-btn').addEventListener('click', () => {
    const dripBalance = document.getElementById('drip-balance');
    const currentBalance = parseFloat(dripBalance.innerText.split(':')[1]);
    const newBalance = currentBalance + 100;
    dripBalance.innerText = `$DRP Balance: ${newBalance}`;
  });
}

function goBackToStart() {
  const miniLobby = document.querySelector('.mini-lobby');
  if (miniLobby) {
    miniLobby.remove();
    document.querySelector('.lobby').classList.remove('hide-back-btn');
  } else {
    document.querySelector('.lobby').remove();
    document.querySelector('.container').style.display = 'flex';
  }
}

function createMiniLobby(title, items, categories) {
  const existingMiniLobby = document.querySelector('.mini-lobby');
  
  if (existingMiniLobby) {
    existingMiniLobby.remove();
  }
  

  const miniLobbyDiv = document.createElement('div');
  miniLobbyDiv.classList.add('mini-lobby');
  miniLobbyDiv.innerHTML = `
  <div class="shop-btns">
  </div>
  <div class="shop-items">
  </div>
  `;
  document.body.appendChild(miniLobbyDiv);
  
  document.querySelector('.lobby').classList.add('hide-back-btn');

  // Add category buttons
  const shopBtnsContainer = miniLobbyDiv.querySelector('.shop-btns');
  categories.forEach(category => {
    const shopCategoryBtn = document.createElement('button');
    shopCategoryBtn.classList.add('shop-btn');
    shopCategoryBtn.textContent = category.toUpperCase();
    shopBtnsContainer.appendChild(shopCategoryBtn);
  });

  const shopBtns = miniLobbyDiv.querySelectorAll('.shop-btn');
  shopBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      shopBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      const shopItems = miniLobbyDiv.querySelector('.shop-items');
      shopItems.innerHTML = '';
      items[index].forEach(item => {
        const shopItem = document.createElement('div');
        shopItem.classList.add('shop-item');
        shopItem.innerHTML = `
          <div class="item-img"><img src="img/bucket1.png" alt="${item.title}"></div>
          <div class="item-title">${item.title}</div>
          <div class="item-price">${item.price}</div>
          <button class="buy-btn">Buy</button>
        `;
        shopItems.appendChild(shopItem);
      });
    });
    if (index === 0) {
      btn.click();
    }
  });

  


}

    







