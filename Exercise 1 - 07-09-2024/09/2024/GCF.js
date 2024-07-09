function calculateGCF(num1, num2){
    let gcf = 1;
    const num1Factors = [];
    const num2Factors = [];

    for(let i=1; i<=num1; i++){
        if(num1%i === 0){
            num1Factors.push(i);
        }
    }

    for(let i=1; i<=num2; i++){
        if(num1%i === 0){
            num2Factors.push(i);
        }
    }

    for(let i=0; i<num1Factors.length; i++){
        for(let j=0; j<num2Factors.length; j++){
            if(num1Factors[i] === num2Factors[j]){
                gcf = num1Factors[i];
            }
        }
    }
    console.log(gcf);
    
}

calculateGCF(27,9);