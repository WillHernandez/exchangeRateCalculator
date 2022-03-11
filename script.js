// could not find a free exchange api that would allow the base code to be changed so USD is the online option at the moment
const selectOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const swap = document.getElementById('btn');
const selectTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const calculate = async () => {
	if(selectOne.value !== selectTwo.value) {
		const optToId = {'USD': 1,'EUR': 2,'AUD': 3,'CAD': 4,'MXN': 5,'RUB': 6}
		try {
			const optToApiId = optToId[selectOne.value];
			const url = `http://127.0.0.1:8000/currencies/${optToApiId}`
			const res = await fetch(url);
			const data = await res.json();
			let secondRate = data[selectTwo.value];
			amountTwo.value = String((Number(amountOne.value) * secondRate).toFixed(2));
		} catch(err) {
			console.log(err);
		}
	} else {
		amountTwo.value = String(amountOne.value);	
		return;
	}
}

selectOne.addEventListener('change', calculate);    
amountOne.addEventListener('input', calculate);
selectTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  let temp = selectOne.value;
  selectOne.value = selectTwo.value;
  selectTwo.value = temp;
  calculate();
})

calculate();