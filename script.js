const howToPlay = `How to Play:  
1. Click on any two cards to flip them over and reveal the letters on their back 
sides.  
2. If the letters on the two flipped cards match, those cards will remain face up, 
indicating they have been successfully matched.  
3. If the letters do not match, the cards will flip back over to their face-down 
position after a short delay.  
4. Continue flipping pairs of cards until all matching pairs have been found. 
Rules:  
1. Only two cards can be flipped at a time.  
2. If two flipped cards do not match, they will be flipped back over after 1 
second.  
3. The game ends when all pairs have been successfully matched.  
 `
const video = document.getElementById("loadingVideo");
const overlay = document.getElementById("videoOverlay");
const background = document.querySelector(".blurred-background");
const gameSpace = document.querySelector(".game-space")
video.addEventListener("ended", () => {
    overlay.classList.add("fade-out");

    setTimeout(() => {
    background.style.display = "none";
    overlay.style.display = "none";
    }, 600); 
    

  });
  document.querySelector(".how-to-play").addEventListener("click",()=>{
    alert(howToPlay)
  })


 let cards =[]
 let resetTimeout ;
 function getShuffledCards(array){
    for (let i = 0; i < 8; i++) {
        const letter = String.fromCharCode(65 + i).toUpperCase(); 
        array.push(letter, letter); 
      }
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
 }
 cards = getShuffledCards(cards);
 let selectedCards = []
 let totalScore = 0
 function playGame(cards){
    gameSpace.innerHTML = "";
    for(let i = 0;i<cards.length;i++){
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("card-id", i);
        card.innerHTML= ` <p class="letter">(CLICK HERE TO FLIP CARD)</p>`
        gameSpace.appendChild(card)
    }
    document.querySelectorAll(".card").forEach((card)=>{

        card.addEventListener("click",()=>{
            const index = parseInt(card.getAttribute("card-id"));
            if (selectedCards.includes(index) || !canClick) return;
            card.innerHTML = `<p class="letter">${cards[index]}</p>`; 
            card.style.background = "red";
            card.style.color = "white";
            card.style.fontSize = "4rem";
            checkPair(index)         
        })
    });

    
 }
 let canClick = true;

function checkPair(index) {
  if (!canClick) return;

  selectedCards.push(index);

  if (selectedCards.length === 2) {
    const [firstIdx, secondIdx] = selectedCards;
    
    if (cards[firstIdx] === cards[secondIdx]) {
      totalScore++;
      selectedCards = [];

      if (totalScore === 8) {
        setTimeout(() => {
          alert("CONGRATULATIONS! You matched all the cards.");
        }, 300);
      }

    } else {
      canClick = false; 

      resetTimeout = setTimeout(() => {
        document.querySelectorAll(".card").forEach((card) => {
          const cardId = parseInt(card.getAttribute("card-id"));
          if (cardId === firstIdx || cardId === secondIdx) {
            card.style.background = "white";
            card.style.color = "red";
            card.style.fontSize = "0.5rem";
            card.innerHTML = `<p class="letter">(CLICK HERE TO FLIP CARD)</p>`;
          }
        });

        selectedCards = [];
        canClick = true; 
      }, 1000);
    }
  }
}

 playGame(cards);