// HTML'de class'ı "table" olan elementi seçer ve board değişkenine atar.
const board = document.querySelector(".table")

// HTML'de h1 etiketini seçer ve infoLabel değişkenine atar.
const infoLabel = document.querySelector("h1")

// Oyunun sırasını belirleyen flip değişkeni, başlangıçta false olarak ayarlanır.
let flip = false;

// Hamle sayısını takip eden count değişkeni, başlangıçta 0 olarak ayarlanır.
let count = 0;

// Oyunu başlatan fonksiyon.
let startGame = () => {
    // Oyun tahtasını ve bilgi etiketini temizler.
    board.innerHTML = "";
    infoLabel.textContent = "";
    // Hamle sayısını sıfırlar.
    count = 0;
    // Oyun tahtasının tüm karelerine tıklama etkinliğini ekler.
    board.style.pointerEvents = "all";

    // 3x3'lük oyun tahtasını oluşturur.
    for (let i = 1; i <= 9; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        board.appendChild(square);
    }

    // Tüm kareler için tıklama olaylarını ekler.
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(item => {
        item.addEventListener("click", (e) => {
            if (!flip) {
                // Sıra kesişte olduğunda "X" işareti ekler.
                let sign = document.createElement("div");
                sign.classList.add("cross");

                // Tıklanan kareye başka bir tıklamayı engeller.
                e.target.style.pointerEvents = "none";

                e.target.appendChild(sign);
                // Kazananı kontrol eder.
                check();
                flip = !flip;
            } else {
                // Sıra dairede olduğunda "O" işareti ekler.
                let sign = document.createElement("div");

                sign.classList.add("circle");
                // Tıklanan kareye başka bir tıklamayı engeller.
                e.target.style.pointerEvents = "none";

                e.target.appendChild(sign);
                // Kazananı kontrol eder.
                check();
                flip = !flip;
            }
        })
    })
};

// Kazananı kontrol eden fonksiyon.
const check = () => {
    // Tüm kareleri seçer.
    const allSquares = document.querySelectorAll(".square");
    // Kazanma kombinasyonlarını tanımlar.
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Hamle sayısını arttırır.
    count++;

    // Her bir kazanma kombinasyonu için kontrol yapar.
    winningCombinations.forEach((pair) => {
        // "X" işareti kazanırsa.
        let crossWin = pair.every((item) => allSquares[item].firstChild?.classList.contains("cross"));

        // "O" işareti kazanırsa.
        let circleWin = pair.every((item) => allSquares[item].firstChild?.classList.contains("circle"));

        // "X" kazanırsa.
        if (crossWin) {
            infoLabel.textContent = "Cross Won The Game!"
            // Oyun tahtasına tıklama etkinliğini kapatır.
            board.style.pointerEvents = "none";
            // Oyunu yeniden başlatır.
            setTimeout(() => {
                startGame()
            }, 3000);
        }
        // "O" kazanırsa.
        else if (circleWin) {
            infoLabel.textContent = "Circle win!"
            // Oyun tahtasına tıklama etkinliğini kapatır.
            board.style.pointerEvents = "none";
            // Oyunu yeniden başlatır.
            setTimeout(() => {
                startGame()
            }, 3000);
        }

        // Berabere durumu.
        if (count === 9) {
            infoLabel.textContent = "It's a tie!"
            // Oyun tahtasına tıklama etkinliğini kapatır.
            board.style.pointerEvents = "none";
            // Oyunu yeniden başlatır.
            setTimeout(() => {
                startGame()
            }, 3000);
        }
    })
}

// Oyunu başlatır.
startGame();
