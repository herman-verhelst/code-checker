import './styles/style.scss';

const app: HTMLElement = document.getElementById('app') as HTMLElement;
const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inputs input') as NodeListOf<HTMLInputElement>;
const resetButton: HTMLButtonElement = document.getElementById('reset-button') as HTMLButtonElement;
const submitButton: HTMLButtonElement = document.getElementById('submit-button') as HTMLButtonElement;

inputs[0].focus();
checkEnabled()

function checkEnabled(): void {
    let code: string = '';
    inputs.forEach(input => code += input.value);
    if (code.length === inputs.length) submitButton.disabled = false
    else submitButton.disabled = true;
}

function handleInput(e: any): void {
    const input = e.target;

    checkEnabled();

    if (input.nextElementSibling && input.value) {
        input.nextElementSibling.focus();
    } else if (input.value) {
        submitButton.focus();
    }
}

function handlePaste(e: any): void {
    const pasteData = e.clipboardData.getData('text');

    inputs.forEach((input, i) => {
        input.value = pasteData[i] || '';
    });

    checkEnabled();
    handleSubmit();
}

function handleKeyPress(e: any): void {
    let code: string = '';
    inputs.forEach(input => code += input.value);
    if (e.key === "Backspace") {
        if (!e.target.value && e.target.previousElementSibling) {
            e.target.previousElementSibling.focus();
        }
    } else if (e.key === "Enter" && code.length === inputs.length) {
        handleSubmit();
    }
}

function handleSubmit(): void {
    let code: string = '';
    inputs.forEach(input => code += input.value);
    if (code.length !== inputs.length) throw new Error('Mismatch in code size...');
    if (code !== '123456') {
        app.classList.remove('shake');
        app.offsetWidth;
        app.classList.add('shake');

        let audio: HTMLAudioElement = new Audio('/error.mp3');
        audio.play();
    }
}

function resetForm(): void {
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
    checkEnabled();
}

inputs.forEach(input => input.addEventListener('paste', handlePaste));
inputs.forEach(input => input.addEventListener('keydown', handleKeyPress));
inputs.forEach(input => input.addEventListener('input', handleInput));
resetButton.addEventListener('click', resetForm)
submitButton.addEventListener('click', handleSubmit)
