export function formatCurrency(number){
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(number);
}

  
console.log(formatCurrency(2500)); /* $2,500.00 */