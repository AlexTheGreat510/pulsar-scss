/* VARIABLES */

let calcHistoryCount = 0;
const calcOperators = ['+', '-', '%', '*', '/', '(', ')'];

/* SELECTORS */

const root = document.documentElement;
const gruvbox = document.getElementById('gruvbox');
const calcInput = document.getElementById('calc-input');
const calcDarkMode = document.getElementById('calc-dark-mode');

const calcShowHelpBtn = document.getElementById('calc-help-btn');
const calcButtons = document.querySelectorAll('#calculator button');
const calcHistoryList = document.getElementById('calc-history-list');
const calcHistoryReset = document.getElementById('calc-history-reset');

/* KEY-BINDINGS */

root.addEventListener('keypress', (event) => {

	if (event.key === 'h') showCalcHelp();
	if (event.key === '=') evalCalcInput();
	if (event.key === 'b') backCalcInput();
	if (event.key === 'c') clearCalcInput();
	if (event.key === 'C') resetCalcHistory();
	if (event.key === 'd') toggleDarkTheme(true);
	if (!isNaN(event.key)) addCalcInput(event.key);

	calcOperators.forEach((operator) => {
		if (event.key === operator) addCalcInput(event.key);
	});
});

/* EVENTS */

calcInput.addEventListener('click', () => {
	copyInputText();
});

calcButtons.forEach((button) => {

	button.addEventListener('click', () => {
		addCalcInput(button.innerText);
	});
});

calcDarkMode.addEventListener('change', () => {
	toggleDarkTheme();
});

calcHistoryReset.addEventListener('click', () => {
	resetCalcHistory();
});

calcShowHelpBtn.addEventListener('click', () => {
	showCalcHelp();
});

/* FUCNTIONS */

function showCalcHelp() {

	const typeable = `TYPEABLE: \n[0-9] numbers and [${calcOperators}].`
	const keybindings = "KEYBINDINGS: \n\nh: show help.\nb: backspace.\nc: clear input.\nC: clear history.\nd: toggle dark mode.\n\n";
	alert(keybindings + typeable);
}

function copyInputText() {

	if (calcInput.value) {
		calcInput.select();
 		calcInput.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(calcInput.value);
 		alert("Copied the calculator input: " + calcInput.value);
 	}
}

function toggleDarkTheme(toggleCheck) {

	if (toggleCheck) {

		if (calcDarkMode.checked == true)
			calcDarkMode.checked = false

		else if (calcDarkMode.checked == false)
			calcDarkMode.checked = true
	}

	if (calcDarkMode.checked == true)
		gruvbox.setAttribute('href', 'styles/gruvbox-dark.css');

	else if (calcDarkMode.checked == false)
		gruvbox.setAttribute('href', 'styles/gruvbox-light.css');
}

function clearCalcInput() {
	calcInput.value = '';
}

function backCalcInput() {
	calcInput.value = calcInput.value.slice(0, -1);
}

function evalCalcInput() {
	if (calcInput.value)
		addCalcHistory();
		calcInput.value = eval(calcInput.value);
}

function resetCalcHistory() {
	calcHistoryCount = 0;
	calcHistoryList.innerHTML = '';
	calcHistoryList.style.display = "none";
}

function addCalcHistory() {

	if (calcInput.value && calcHistoryCount < 6) {
		calcHistoryCount += 1;
		calcHistoryList.style.display = "grid";
		calcHistoryList.innerHTML = `${calcHistoryList.innerHTML}
									 <button onclick="rewriteCalcInput('${calcInput.value}')">${calcInput.value}</button>`;
	}
}

function rewriteCalcInput(value) {
	calcInput.value = value;
}

function addCalcInput(value) {

	if (value == '+') {
		calcInput.value += ' + ';

	} else if (value == '-') {
		calcInput.value += ' - ';

	} else if (value == '*') {
		calcInput.value += ' * ';

	} else if (value == '%') {
		calcInput.value += ' % ';

	} else if (value == '/') {
		calcInput.value += ' / ';

	} else if (value == '(') {
		calcInput.value += ' ( ';

	} else if (value == ')') {
		calcInput.value += ' ) ';

	} else if (value == 'C') {
		clearCalcInput();

	} else if (value == 'B') {
		backCalcInput();

	} else if (value == '=') {
		evalCalcInput();

	} else {
		calcInput.value += value;
	}
}

// TODO: Smooth animations.