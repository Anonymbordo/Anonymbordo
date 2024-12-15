// Basit doğrusal regresyon tahmini için gerekli veri
const data = [
    { price: 88.38, rating: 3.81 },
    { price: 982.62, rating: 4.23 },
    { price: 143.25, rating: 5.00 },
    { price: 529.69, rating: 5.00 },
    { price: 247.38, rating: 4.93 },
    // Daha fazla veri eklenebilir
];

// Regresyon modeli için katsayıları hesaplama
function calculateLinearRegression(data) {
    const n = data.length;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    data.forEach(({ price, rating }) => {
        sumX += price;
        sumY += rating;
        sumXY += price * rating;
        sumX2 += price * price;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}

// Modelden tahmini değerlendirme puanı döndüren fonksiyon
function predictRating(price, model) {
    const predictedRating = model.slope * price + model.intercept;
    return Math.max(predictedRating, 0); // 0'ın altına düşmeyi engelle
}

// Hesaplama fonksiyonunu tetikleyen event handler
function calculateResult() {
    const inputValue = document.getElementById("input-value").value;
    const resultElement = document.getElementById("result");

    if (!inputValue || isNaN(inputValue) || inputValue <= 0) {
        resultElement.textContent = "Lütfen geçerli bir fiyat girin:";
        return;
    }

    const model = calculateLinearRegression(data);
    const predictedRating = predictRating(parseFloat(inputValue), model);

    resultElement.textContent = `Tahmini Değerlendirme Puanı: ${predictedRating.toFixed(2)}`;
}

// DOM yüklendikten sonra gerekli event handler'ları bağlama
document.addEventListener("DOMContentLoaded", () => {
    const calculateButton = document.querySelector(".sidebar button");
    calculateButton.addEventListener("click", calculateResult);
});
