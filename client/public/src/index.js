const calculatePayment = (duration, isPremium) => {
    const basePrices = { 30: 2000, 45: 3000, 60: 4000 };
    let total = basePrices[duration] || 0;
    if (isPremium) total += 1000; // Example premium fee
    return total;
};

